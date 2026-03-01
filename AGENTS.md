# AGENTS.md - Development Guidelines for Agents

## Project Overview

This is an **Astro** church website starter with **Tailwind CSS**. It uses Astro's content collections for managing staff, events, sermons, ministries, blog posts, and site info.

## Build Commands

```bash
# Install dependencies (uses pnpm)
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

No explicit lint or test commands are configured. Run `pnpm build` to verify code compiles correctly.

## Code Style Guidelines

### General
- This is an Astro project using `.astro` files (component-based architecture)
- Use **Tailwind CSS** for all styling (no custom CSS unless necessary)
- Use **TypeScript** for props interfaces and content schemas
- No ESLint or Prettier config in project - follow existing patterns

### Imports
- Relative imports: `../components/Button.astro` for same-level, `../../utils/dateUtils.js` for deeper paths
- Astro built-ins: `import { getCollection } from 'astro:content'`
- Order: external imports first, then relative imports

### Naming Conventions
- **Components**: PascalCase (e.g., `HeroSection.astro`, `Button.astro`)
- **Files/Folders**: kebab-case for pages/directories (e.g., `staff.astro`, `sermons/`)
- **Props interfaces**: `Props` with TypeScript (e.g., `export interface Props { title?: string }`)
- **CSS Classes**: Tailwind utility classes (kebab-case in strings)

### TypeScript
- Use strict TypeScript (tsconfig extends `astro/tsconfigs/strict`)
- Define props with interface:
  ```astro
  ---
  export interface Props {
    title?: string;
    variant?: "primary" | "secondary";
  }
  const { title = "Default" } = Astro.props;
  ---
  ```

### Content Collections (src/content/config.ts)
- Use **Zod** schemas for validation
- Use `z.string()`, `z.number()`, `z.date()`, `z.boolean()`, `z.array()`, `z.object()`, `z.enum()`
- Optional fields: `.optional()` - always use, never `undefined`
- Default values: `.default(value)`

### Tailwind Usage
- Use **primary**, **secondary**, **accent** color palette (already configured in tailwind.config.cjs)
- Font families: `font-serif` (Playfair Display), `font-sans` (Source Sans Pro)
- Use `container` class for section wrappers
- Mobile-first: design for mobile, use `md:`/`lg:` breakpoints for larger screens

### Astro Components
- Props in frontmatter (`---` block at top)
- Template in HTML below frontmatter
- Scoped styles in `<style>` block if needed
- Use `<slot />` for children
- Use `Astro.props` to destructure props

### Error Handling
- Content collection queries: check for empty arrays before mapping
- Use optional chaining: `item?.field`
- Images: always provide alt text

### File Organization
```
src/
├── assets/          # Images, fonts, global CSS
├── components/      # Reusable UI components
│   ├── Global/      # Header, Footer, Navigation
│   ├── Sections/    # Page sections (Hero, EventList, etc.)
│   └── UI/          # Buttons, Cards, SEO
├── content/         # Content collections (markdown/MDX)
│   ├── blog/
│   ├── events/
│   ├── ministries/
│   ├── sermons/
│   ├── staff/
│   └── siteInfo/
├── layouts/         # Page layouts (BaseLayout, PostLayout)
├── pages/           # Routes (index.astro, about-us.astro, [...slug].astro)
└── utils/           # Helper functions
```

### Adding New Content
1. Add schema in `src/content/config.ts`
2. Create markdown file in appropriate `src/content/[type]/` folder
3. Set `draft: false` to publish

### Accessibility
- Include `alt` on all images
- Use semantic HTML (`<main>`, `<section>`, `<header>`, `<footer>`)
- Minimum touch target 44x44px for buttons
- Use `aria-label` on icon-only buttons
