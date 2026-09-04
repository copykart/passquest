// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Production URL of the blog. Update if the subdomain ever changes.
export default defineConfig({
  site: 'https://blog.passquest.app',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // Weekly-ish news cadence; individual <lastmod> comes from each post.
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
  markdown: {
    shikiConfig: { theme: 'css-variables', wrap: true },
  },
});
