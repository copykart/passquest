import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORIES } from './site.config';

const categorySlugs = CATEGORIES.map((c) => c.slug) as [string, ...string[]];

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    /* SEO: keep ~55 chars so it doesn't truncate in search results */
    title: z.string().min(10).max(75),
    /* SEO: meta description — 50-160 chars, unique per post */
    description: z.string().min(50).max(165),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(categorySlugs),
    /* references an id in AUTHORS (site.config.ts) */
    author: z.string().default('passquest-team'),
    /* hero image: a path under /public (e.g. /images/blog/my-post.webp)
       — pre-compress to WebP, ~1600px wide, and set a real alt below */
    heroImage: z.string(),
    heroAlt: z.string().min(4),
    /* optional 1200x630 social image; falls back to heroImage */
    ogImage: z.string().optional(),
    /* required credit when heroImage is a stock photo (e.g. Unsplash) */
    heroCredit: z
      .object({ name: z.string(), url: z.string() })
      .optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    /* renders the FAQ block + FAQPage structured data */
    faqs: z
      .array(z.object({ q: z.string(), a: z.string() }))
      .default([]),
    /* optional explicit tags for internal search / future use */
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
