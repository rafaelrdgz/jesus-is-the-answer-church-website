import { ui, defaultLang, routes, showDefaultLang, languages, type Lang } from './ui';

/**
 * Detect the language from the current URL.
 * If the first path segment is a known locale (other than default), return it.
 * Otherwise return the default language.
 */
export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

/**
 * Returns a `t()` function that looks up translation keys in the `ui` dictionary.
 * Falls back to the default language if the key is missing for the requested language.
 */
export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    // Try the requested language first, fall back to default
    return (ui[lang] as Record<string, string>)?.[key] ?? ui[defaultLang][key] ?? key;
  };
}

/**
 * Build a reverse map: EN filename -> ES key (e.g. 'about-us' -> 'nosotros').
 */
const enToEsMap: Record<string, string> = {};
for (const [esKey, enVal] of Object.entries(routes['en'] || {})) {
  enToEsMap[enVal] = esKey;
}

/**
 * Resolve any route segment (ES key or EN filename) to the English/filename equivalent.
 * This is the canonical segment used in actual page file paths.
 *
 * Examples:
 *   'nosotros' -> 'about-us'
 *   'about-us' -> 'about-us'   (already English)
 *   'blog'     -> 'blog'       (same in both languages)
 */
function resolveToFilename(segment: string): string {
  // If the segment is a known ES key, return its EN equivalent
  const enRoutes = routes['en'] || {};
  if (segment in enRoutes) {
    return enRoutes[segment];
  }
  // Already an EN filename or has no mapping (e.g. 'blog')
  return segment;
}

/**
 * Returns a function that translates a path to the correct language version.
 *
 * ALL URLs use English/filename-based route segments with a /{lang}/ prefix.
 * The routes map in ui.ts is used to resolve Spanish keys to English filenames.
 *
 * Examples:
 *   translatePath('/nosotros')  with lang='es' -> '/es/about-us'
 *   translatePath('/nosotros')  with lang='en' -> '/en/about-us'
 *   translatePath('/about-us')  with lang='es' -> '/es/about-us'
 *   translatePath('/')          with lang='en' -> '/en/'
 *   translatePath('/')          with lang='es' -> '/es/'
 */
export function useTranslatedPath(lang: Lang) {
  return function translatePath(path: string, targetLang: Lang = lang): string {
    // Normalize: remove trailing slash (except for root)
    const normalizedPath = path === '/' ? '/' : path.replace(/\/$/, '');

    // Split the path and get the first meaningful segment
    const segments = normalizedPath.split('/').filter(Boolean);

    // Remove existing language prefix if present
    let pathSegments = [...segments];
    if (pathSegments[0] && pathSegments[0] in languages) {
      pathSegments = pathSegments.slice(1);
    }

    // Resolve the first segment (route key) to its English/filename equivalent
    const routeKey = pathSegments[0] || '';
    const restSegments = pathSegments.slice(1);
    const resolvedRoute = routeKey ? resolveToFilename(routeKey) : '';

    // Build the final path
    const allSegments = resolvedRoute ? [resolvedRoute, ...restSegments] : restSegments;
    const basePath = allSegments.length > 0 ? `/${allSegments.join('/')}` : '/';

    // Always add language prefix (showDefaultLang is now true)
    return `/${targetLang}${basePath}`;
  };
}

/**
 * Given a URL, extract the route key (in default language / ES terms) for language switching.
 * This is used by the LanguagePicker to figure out the equivalent page in the other language.
 *
 * Since all URLs now use English/filename-based segments, we reverse-map back to ES keys.
 *
 * Example:
 *   /en/about-us       -> '/nosotros'       (ES route key)
 *   /es/about-us       -> '/nosotros'        (EN filename -> ES key)
 *   /en/sermons/my-slug -> '/sermones/my-slug'
 *   /es/                -> '/'
 */
export function getRouteFromUrl(url: URL): string {
  const pathname = url.pathname.replace(/\/$/, '') || '/';
  const segments = pathname.split('/').filter(Boolean);

  // Remove language prefix if present (works for /en/, /es/, etc.)
  let pathSegments = [...segments];
  if (pathSegments[0] && pathSegments[0] in languages) {
    pathSegments = pathSegments.slice(1);
  }

  if (pathSegments.length === 0) return '/';

  const routeSegment = pathSegments[0];
  const restSegments = pathSegments.slice(1);

  // Reverse-map English filename back to ES key (default language)
  let defaultRouteSegment = routeSegment;
  if (routeSegment in enToEsMap) {
    defaultRouteSegment = enToEsMap[routeSegment];
  }

  // Return the full path in default-language terms
  const allSegments = [defaultRouteSegment, ...restSegments];
  return `/${allSegments.join('/')}`;
}

/**
 * Get the alternate URL for the given page in the target language.
 * Used by the LanguagePicker and hreflang tags.
 */
export function getAlternateUrl(url: URL, targetLang: Lang): string {
  const defaultRoute = getRouteFromUrl(url);
  const translatePath = useTranslatedPath(targetLang);
  return translatePath(defaultRoute, targetLang);
}

/**
 * Filter content collection entries by locale.
 * Content files are stored in subfolders: content/blog/es/post.md, content/blog/en/post.md
 * The entry.id will be "es/post" or "en/post".
 */
export function filterByLocale<T extends { id: string }>(entries: T[], lang: Lang): T[] {
  return entries.filter((entry) => entry.id.startsWith(`${lang}/`));
}

/**
 * Strip the locale prefix from a content entry id to get the slug.
 * "en/my-post" -> "my-post"
 * "es/mi-publicacion" -> "mi-publicacion"
 * "es/power-of-worship.md" -> "power-of-worship"
 */
export function getSlugFromId(id: string): string {
  let slug = id;
  
  // Remove the file extension if present
  slug = slug.replace(/\.(md|mdx)$/, '');
  
  const parts = slug.split('/');
  // Remove the first segment if it's a known locale
  if (parts[0] in ui) {
    return parts.slice(1).join('/');
  }
  return slug;
}

/**
 * Resolve a localized field to a plain string for the given language.
 *
 * Content collection fields processed by localizedString() Zod transform
 * become `{ es?: string; en?: string }` objects. Some markdown files may
 * still have plain strings (or the transform might produce a string).
 *
 * This helper normalises both cases so components can always render a string.
 *
 * Fallback order: requested lang -> default lang -> any available key -> ''.
 */
type LocalizedField = Record<string, string | undefined> | string | undefined | null;

export function localizedField(field: LocalizedField, lang: Lang): string {
  if (field == null) return '';
  if (typeof field === 'string') return field;
  return field[lang] || field[defaultLang] || field['es'] || field['en'] || '';
}
