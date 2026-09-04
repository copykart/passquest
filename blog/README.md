# PassQuest Blog

SEO blog for [passquest.app](https://passquest.app) — exam guides, comparisons,
scholarship deadlines and relocation news. Static site, built with
[Astro](https://astro.build), deployed to **Vercel** at
**`https://blog.passquest.app`**.

The marketing site (`passquest.app`) stays on GoHighLevel — its source is in
`../site/`. This blog is a separate project on a subdomain; the two share a
visual design system so they read as one site.

## Commands

```bash
npm install        # once
npm run dev        # local dev at http://localhost:4321
npm run build      # production build to ./dist
npm run preview    # serve ./dist locally
```

## Adding a post

See **[PUBLISHING.md](./PUBLISHING.md)**. Short version: add a Markdown file to
`src/content/blog/`, commit, push — Vercel deploys.

## Project layout

```
src/
  site.config.ts          # URLs, nav, categories, authors, socials — edit here
  content.config.ts       # frontmatter schema (validates every post at build)
  content/blog/*.md        # the posts
  styles/global.css        # ported design system (dark default) + all blog styles
  components/
    BaseHead.astro         # <title>, meta, canonical, OG/Twitter, JSON feed link, theme FOUC
    Nav.astro / Footer.astro
    BlogCard.astro         # grid card
    CategoryPills.astro    # topic filter row
    Toc.astro              # sticky table of contents (desktop, 3+ headings)
    Faq.astro              # FAQ accordion (from frontmatter `faqs`)
    ShareRow.astro         # X / LinkedIn / WhatsApp / copy-link
    Newsletter.astro       # GoHighLevel form — see "Newsletter" below
    JsonLd.astro           # structured-data injector
  layouts/
    BaseLayout.astro       # <html> shell + nav + footer
    PostLayout.astro       # full article template + BlogPosting/Breadcrumb/FAQ schema
  lib/posts.ts             # collection queries, reading time, related posts
  pages/
    index.astro            # blog home (featured + grid)
    [slug].astro           # a post
    topic/[topic].astro    # a category archive
    rss.xml.js             # /rss.xml
    404.astro
public/
  images/blog/             # hero images (replace the placeholder SVGs)
  images/authors/          # author avatars
  robots.txt
```

## SEO baseline (already wired)

- Per-page `<title>`, meta description, `<link rel="canonical">`, Open Graph +
  Twitter Card.
- `BlogPosting` + `BreadcrumbList` (+ `FAQPage` when a post has `faqs`) as one
  `@graph` JSON-LD block per post. `Blog` schema on the home page.
- `sitemap-index.xml` (via `@astrojs/sitemap`), `/rss.xml`, `robots.txt`.
- Heading anchor IDs, semantic `<article>` / `<time datetime>` / breadcrumb nav.
- No client JS except the theme toggle, nav, TOC scroll-spy and copy-link.

**Still to do by hand:** add a real 512×512 `public/images/passquest-logo-512.png`
(referenced as the publisher logo in `site.config.ts`) and a
`public/images/og-default.png` (1200×630 fallback social image).

## Newsletter

`src/components/Newsletter.astro` posts to a GoHighLevel form. Replace
`GHL_FORM_ACTION` with your form's POST URL (GHL form → **Integrate → raw HTML**),
or swap the whole `<form>` for GHL's iframe embed snippet.

## Deploy

### 1. Vercel

1. Push the `passquest` repo to GitHub (this project lives in its `blog/` folder;
   `site/` holds the GHL landing-page source).
2. Vercel → **Add New → Project** → import the repo.
3. Set **Root Directory** to `blog`. Framework preset: Astro (auto-detected).
   Build `npm run build`, output `dist`.
4. Deploy. You get a `*.vercel.app` URL.

### 2. Domain

1. Vercel → Project → **Settings → Domains** → add `blog.passquest.app`.
2. Vercel shows a target (a `cname.vercel-dns.com` value).
3. Cloudflare DNS for `passquest.app` → add a **CNAME**: name `blog`, target the
   Vercel value, **Proxy status: DNS only (grey cloud)**.
4. Wait for Vercel to verify + issue the cert (a few minutes).

`astro.config.mjs` `site` is already `https://blog.passquest.app` — update it
there and in `site.config.ts` if the subdomain ever changes.

### 3. After first deploy

- Google Search Console: add `blog.passquest.app` as a property, submit
  `https://blog.passquest.app/sitemap-index.xml`.
- Add Vercel Web Analytics (or Plausible) if you want traffic numbers.
