// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import decapCmsOauth from 'astro-decap-cms-oauth';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com', // Replace with your site URL
  output: 'static',
  adapter: vercel(),
  integrations: [
    tailwind(),
    sitemap(),
    decapCmsOauth({
      decapCMSVersion: "3.3.3",
      oauthDisabled: true, // Disable OAuth in dev, enable in Vercel with env vars
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