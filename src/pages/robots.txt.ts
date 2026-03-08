import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site?.toString().replace(/\/$/, '') || 'https://jesuseslarespuesta.vercel.app';

  const robotsTxt = `# Allow all web crawlers
User-agent: *
Allow: /

# Disallow admin paths
Disallow: /admin/
Disallow: /oauth/

# Sitemap location
Sitemap: ${siteUrl}/sitemap-index.xml
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
