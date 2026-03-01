// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import decapCmsOauth from 'astro-decap-cms-oauth';

// https://astro.build/config
export default defineConfig({
  site: 'https://jesus-is-the-answer-church-website.vercel.app', // Replace with your Vercel URL
  output: 'static',
  adapter: vercel(),
  integrations: [
    tailwind(),
    sitemap(),
    decapCmsOauth({
      decapCMSVersion: "3.3.3",
      oauthDisabled: false, // Enable OAuth in production
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