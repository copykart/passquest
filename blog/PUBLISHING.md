# Publishing a post

The normal workflow: **hand Claude the content** (draft, notes, or a link) and it
creates the `.md` file, wires the frontmatter, drops in the hero image, adds
internal links + FAQ, commits and pushes. Vercel deploys in ~30s.

This file documents what Claude does so anyone can do it by hand.

---

## 1. Create the file

`src/content/blog/<slug>.md` — the filename **is** the URL:
`src/content/blog/ielts-vs-celpip.md` → `https://blog.passquest.app/ielts-vs-celpip/`

Slug rules: lowercase, words separated by hyphens, no dates, keep it short and
keyword-led. Once published, **don't rename it** (it breaks the URL). If you must,
add a redirect in `vercel.json`.

## 2. Frontmatter

```yaml
---
title: "IELTS vs CELPIP: which should you take?"   # 10–75 chars, the <h1> + <title>
description: "A side-by-side look at IELTS and CELPIP..."  # 50–165 chars, meta description + lede + card excerpt
pubDate: 2026-09-03                                 # YYYY-MM-DD
updatedDate: 2026-10-01                             # optional — set when you revise; shows "updated" + bumps schema
category: comparisons                               # one slug from the list below
author: passquest-team                              # id from src/site.config.ts AUTHORS
heroImage: /images/blog/ielts-vs-celpip.webp        # path under /public — see image rules
heroAlt: "Two overlapping purple circles labelled IELTS and CELPIP"  # real alt text, not the title
ogImage: /images/blog/ielts-vs-celpip-og.png        # optional 1200×630 social image; defaults to heroImage
featured: true                                      # optional — pins it to the top of the home page
draft: false                                        # true = builds locally, hidden in production
tags: ["ielts", "celpip", "canada"]                 # optional, internal
faqs:                                               # optional — renders the FAQ block + FAQPage schema
  - q: "Is CELPIP easier than IELTS?"
    a: "Neither is objectively easier. <strong>HTML is allowed here.</strong>"
---
```

**Categories** (`slug` → label): `ielts` · `celpip` · `sat` · `gre` · `toefl` ·
`comparisons` · `scholarships` · `japa` (Japa / Relocation) · `exam-news` ·
`travel` (Travel Updates). Edit the list in `src/site.config.ts`.

## 3. Body

Plain Markdown. `##` and `###` headings auto-get anchor IDs and feed the
table-of-contents (shown as a sticky rail on desktop when a post has 3+ headings).

### Reusable components (paste raw HTML into the Markdown)

**TL;DR / key-takeaways box** — put it right after the intro paragraph:

```html
<div class="tldr">
  <strong>The short version</strong>
  <ul>
    <li>First takeaway.</li>
    <li>Second takeaway.</li>
  </ul>
</div>
```

**Callout / note box:**

```html
<div class="callout">
  <strong>Watch out</strong>
  <p>Something worth flagging mid-article.</p>
</div>
```

**Comparison table** — wrap a normal Markdown table so it scrolls on mobile:

```html
<div class="table-wrap">

| | IELTS | CELPIP |
|---|---|---|
| Delivery | Paper or computer | Computer only |

</div>
```

(The blank lines inside the `<div>` are required for Markdown to parse the table.)

**In-content image:** `![alt text](/images/blog/<slug>-1.webp)` — always write real
alt text.

## 4. Hero image

- Drop the file in `public/images/blog/`.
- **Pre-compress**: WebP, ~1600px wide, aim for < 200 KB. (No build-time
  optimisation is wired in — what you commit is what ships.)
- Aspect ratio ~16:9. The card crops to 16:9, the post hero shows it ~16:9.
- For best social sharing also export a 1200×630 PNG/JPG and set `ogImage`.
- Placeholder SVGs are in `public/images/blog/` — replace them.

## 5. Ship it

```bash
npm run build   # sanity check — must pass
git add -A && git commit -m "post: <slug>" && git push
```

Vercel builds `main` automatically. Preview deploys run on every other branch.

## 6. Per-post SEO checklist

- [ ] `title` leads with the keyword, reads naturally, ≤ 60 chars
- [ ] `description` is unique, 120–160 chars, includes the keyword
- [ ] `heroAlt` describes the image (not a keyword dump)
- [ ] one `<h1>` (the title — automatic), logical `##` / `###` below it
- [ ] TL;DR box near the top
- [ ] 2–4 `faqs` (feeds FAQ rich results + AI answers)
- [ ] 2–3 internal links — to other posts and to `https://passquest.app`
- [ ] links to any official source (test board, embassy, scholarship body)
- [ ] `updatedDate` set whenever facts change after publish

## 7. After publishing (once)

- Submit `https://blog.passquest.app/sitemap-index.xml` in Google Search Console
  and Bing Webmaster Tools.
- Google Search Console → URL Inspection → "Request indexing" for the new URL.
