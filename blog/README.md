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
  favicon.svg               # brand mark — see "Brand icon" below
  images/blog/               # hero images (replace the placeholder SVGs)
  images/authors/            # author avatars
  images/passquest-logo-512.png  # JSON-LD publisher logo (square raster)
  images/og-default.jpg      # fallback social-share card (1200x630)
  robots.txt
```

## Brand icon

Everything icon-shaped on the blog derives from one source file — the current
one lives at `Brand Materials/New Fav Logo 2026 .svg` in the wider PassQuest
workspace (not in this repo; it's brand source, not web source). To update it
site-wide when a new mark is issued, replace all of these together so nothing
drifts out of sync:

| Where | File / component | Notes |
|---|---|---|
| Browser tab icon | `public/favicon.svg` | referenced from `BaseHead.astro` |
| Nav bar logo | inline `<svg class="brand-mark">` in `Nav.astro` | has its own gradient `id` (`pq-mark-nav`) |
| Footer logo | inline `<svg class="brand-mark">` in `Footer.astro` | own gradient `id` (`pq-mark-footer`) — inline SVG `id`s must stay unique per component or gradients can collide |
| Author avatar (placeholder) | `public/images/authors/passquest-team.svg`, path set in `site.config.ts` → `AUTHORS['passquest-team'].avatar` | swap for a real photo once a named author is assigned to posts |
| JSON-LD publisher logo | `public/images/passquest-logo-512.png`, path in `site.config.ts` → `SITE.publisher.logo` | square raster (Google's structured-data guidance prefers non-SVG here); regenerate at 512×512 |
| Default social-share card | `public/images/og-default.jpg`, path in `site.config.ts` → `SITE.defaultOgImage` | 1200×630, icon + wordmark on the dark brand background; only used when a post has no `ogImage`/`heroImage` |

## SEO baseline (already wired)

- Per-page `<title>`, meta description, `<link rel="canonical">`, Open Graph +
  Twitter Card.
- `BlogPosting` + `BreadcrumbList` (+ `FAQPage` when a post has `faqs`) as one
  `@graph` JSON-LD block per post. `Blog` schema on the home page.
- `sitemap-index.xml` (via `@astrojs/sitemap`), `/rss.xml`, `robots.txt`.
- Heading anchor IDs, semantic `<article>` / `<time datetime>` / breadcrumb nav.
- No client JS except the theme toggle, nav, TOC scroll-spy and copy-link.

Brand assets (favicon, nav/footer mark, publisher logo, default social card,
author placeholder) all derive from the one brand SVG — see "Brand icon" below.

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
