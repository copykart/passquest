# PassQuest — web

Website work for the PassQuest exam-prep app. Two projects:

| Folder | What | Hosting |
|---|---|---|
| [`blog/`](./blog) | SEO blog — Astro static site | Vercel → `blog.passquest.app` |
| [`site/`](./site) | Marketing landing page + legal pages (source) | GoHighLevel (`passquest.app`) — pasted HTML |

## blog/

Astro project. `cd blog && npm install && npm run dev`. Publishing a post and the
full SEO/deploy notes are in [`blog/README.md`](./blog/README.md) and
[`blog/PUBLISHING.md`](./blog/PUBLISHING.md).

Deploy: Vercel project with **Root Directory = `blog`**, then a `blog` CNAME in
Cloudflare pointing at Vercel (DNS-only).

## site/

Self-contained HTML — no build step. `passquest.html` + `passquest.css` is the
landing page; `passquest-privacy/terms/disclaimer.html` are the legal pages
(CSS inlined). Live copies are hosted on GoHighLevel; this folder is the source
of truth. Legal URLs are fixed at `passquest.app/{privacy,terms,disclaimer}/`
(registered in the Google Play console). Images on the live pages load from the
GHL/filesafe CDN; `site/assets/` and `site/exam-logos/` keep the originals.

## Repo scope

This repo lives at the root of a large local PassQuest workspace. The root
`.gitignore` allowlists only `blog/`, `site/`, `README.md` and `.gitignore` —
everything else in the folder (brand assets, training data, contracts, keys,
video) is intentionally untracked.
