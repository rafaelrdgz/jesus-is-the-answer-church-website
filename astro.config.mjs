// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import decapCmsOauth from 'astro-decap-cms-oauth';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',
  output: 'server',
  trailingSlash: 'always',
  adapter: vercel(),
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => {
        const url = new URL(page);
        const path = url.pathname;
        // Only include localized pages (/es/* and /en/*)
        // Exclude redirect pages, admin, and oauth routes
        return (path.startsWith('/es/') || path.startsWith('/en/')) &&
               !path.includes('/admin') &&
               !path.includes('/oauth');
      },
    }),
    decapCmsOauth({
      decapCMSVersion: "3.3.3",
      oauthDisabled: false,
      adminDisabled: false,
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  }
});