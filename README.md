# Leonida Guides — static site engine (GTA VI guides)

Unofficial fan site. Not affiliated with Rockstar Games. Eleventy 3 + Pagefind + plain CSS (tokens from `design/tokens.css`). Zero client JS except search and the optional spoiler toggle.

## Commands

| Task | Command |
|---|---|
| Production build (clean → Eleventy → Pagefind) | `npm run build`  (or `./build.sh`) |
| Sanity-check the build (SEO tags, JSON-LD, sitemap, search index, OG files, one H1) | `npm run check` |
| Preview the built site | `npm run preview` → http://localhost:8080 |
| Live-reload dev server (rebuilds on content/design/code changes) | `npm run dev` → http://localhost:8080 |
| Auto-rebuild `_site/` whenever `content/` changes (box daemon) | `npm run watch`  (`POST_BUILD_CMD="./deploy.sh"` runs a hook after each good build) |
| Build for a real URL | `SITE_URL=https://guides.example.com npm run build` |

## Publishing a guide (agents)

1. Create `content/<anything>/<slug>.md` (or directly `content/<slug>.md`) with the front-matter below.
2. Run `npm run build` (or let `npm run watch` / CI do it). The page appears at `/<category-slug>/<slug>/`, in its category page, the sitemap, the feed and the search index.
3. **Never published:** anything in `content/inbox/`, `draft: true`, `status: template|queue|draft`, `template-*.md`, files starting with `_` and `README.md`. `SHOW_DRAFTS=1` shows drafts/templates locally.
4. Standalone pages (About etc.): put them in `content/pages/` (URL `/<slug>/`) or set `type: page`.
5. Images: put files in `content/media/` and reference `![alt](/media/file.jpg "optional caption")` (dimensions are read at build, lazy-loaded, no layout shift).

### Front-matter schema

```yaml
title: "GTA 6 Release Time: Unlock Times by Time Zone"   # required
slug: release-time                                      # default: file name
category: pre-launch                                    # required (or put the file in a folder named after it). See categories below.
updated: 2026-11-18                                     # required, YYYY-MM-DD or ISO. Shown as "Last updated", used for sitemap lastmod.
sources:                                                # required for real guides (credited at the bottom + JSON-LD citation)
  - https://www.rockstargames.com/VI                    #   plain URL
  - "IGN | https://ign.com/..."                         #   "Label | URL"
  - { title: "Rockstar Newswire", url: "https://…", publisher: "Rockstar Games", note: "official" }
description: "≤155 chars, no spoilers"                  # meta/OG description (fallback: first paragraph OUTSIDE spoiler blocks)
spoilers: none                                          # none | minor | major (default none) -> badge at top of article + on cards
rumour: false                                           # true -> "Rumour — unconfirmed" badge + notice
placeholder: false                                      # true -> banner + noindex + excluded from sitemap/feed
draft: false                                            # true -> not built
published: 2026-11-18                                   # optional first-publish date (default = updated)
tags: [ps5, performance]                                # optional (JSON-LD keywords, article:tag)
author: "Name"                                          # optional byline (default "Leonida Guides Team", env SITE_BYLINE) -> shown + Article.author
answer: "One or two sentences: the direct answer."       # optional but expected: shown as the "Quick answer" block above the fold (answer-first)
featured: true                                          # optional: shown in "Featured" on the home page
schema: TechArticle                                     # optional (default Article)
image: /media/custom-og.png                             # optional OG image override
faq:                                                    # optional -> visible FAQ section (NO FAQPage schema: dead rich result)
  - q: "What time does it unlock?"
    a: "Midnight local time."
```

Extra keys (e.g. `title_alts`, `status`) are ignored. Invalid files are skipped with a warning (`STRICT=1` fails the build instead).

**Categories** are data-driven from `category:`. Seeds live in `lib/categories.seed.json` (slug, name, description, aliases, image). Aliases mean `pre-launch`, `beginner`, `ps5`, `vehicles`, `money-methods`… all resolve to the seeded category; an unknown value auto-creates a new category (with a build warning). Seeded: Launch Hub, Mission Walkthroughs, Money Methods, Collectibles & Maps, Best Cars, Glitch Fixes, Beginner Tips, PS5 Settings.

### Markdown extras

- Callouts: `> [!TIP]`, `> [!NOTE]`, `> [!WARNING]`, `> [!RUMOUR]`.
- **Spoiler blocks:** `:::spoiler Label` … `:::` → `<details class="spoiler">` (hidden until clicked, works without JS; no label → "Spoiler — tap to reveal").
- Raw HTML is disabled on purpose (content may come from untrusted finds). One H1 per page: a leading `# Title` in the body is dropped (the template renders the title).

## Spoiler system

- `spoilers: none|minor|major` → colour-coded badge ("Spoiler-free" green / "Minor spoilers" amber / "Major spoilers" red) first in every article and on every card/listing.
- **Spoiler text never leaks:** description, OG/Twitter text, JSON-LD, cards, Atom feed and search excerpts are built from the HTML with every `:::spoiler` block removed (feed shows "Spoiler section hidden: <label>"); spoiler bodies are `data-pagefind-ignore`; headings inside spoilers are kept out of the table of contents. An invalid `spoilers:` value is treated as `major`.
- Header **Show all spoilers** button (appears only with JS): off by default, remembered in `localStorage` (`lg-spoilers`), opens/closes every `details.spoiler`. Code: `src/js/spoilers.js`, styles: `src/css/45-spoilers.css`.

## Leak coverage (early-player finds, datamines)

Template: `content/template-leak.md` (never published; copy it, set `status: live`, remove `publish: false`).

- **Front-matter:** `spoilers: major`, `unconfirmed: true|false` (plus `rumour: true` while unconfirmed so the badge shows), `category: leaks`.
- **All leak content goes inside one `:::spoiler` block.** Directly before the block put the warning line: `> ⚠️ **LEAK / MAJOR SPOILER: tap only if you want to know**`.
- **Inside the block, always:** a visible "UNCONFIRMED" label (or "Confirmed by [source], date" once confirmed) and one source credit line: who found it, the date, and a link to the PUBLIC post or article.
- **Title, `title_alts`, description and Quick answer may be clickbait** ("Players Just Found Something Huge in GTA 6", "The GTA 6 Secret Everyone Is Talking About") but must NOT reveal the leak: no names, places, features, dates or numbers from it.
- **Hard bans:** no piracy, no leaked files, no download links, no mirrors or torrents, and no links to file hosts (Mega, Google Drive, Dropbox, Discord CDN, MediaFire and the like). Link only to the public post or article. No leaked screenshots or clips; use our own art.
- Mark anything unconfirmed as unconfirmed. Never state a rumour as fact. Never copy another site's text.
- All other house rules still apply: `title_alts` (2-3), exactly 3-line Quick answer, at least 3 `TODO: image:` placeholders with captions (our own art only), 8-year-old readability, FAQ, footer line.

## SEO, OG, search, sitemap

- Every page: `<title>`, description, canonical, Open Graph, Twitter card, robots, JSON-LD `@graph` limited to Article/TechArticle (+ author, publisher, citations), BreadcrumbList on every page and WebSite+SearchAction on home. **No FAQPage / HowTo / other types.** `dateModified`/`datePublished` use exactly the same value as the visible `<time datetime>` (front-matter `updated`/`published`). Each article shows a byline + the AI disclosure from `site.aiDisclosure` ("Written with AI help and fact-checked against the cited sources."). Code: `lib/seo.js`.
- **Last updated** is visible on guides, pages, category pages, the home "New & updated" block and the footer.
- **OG images:** `lib/og.js` fills `design/og/og-template.svg` (`{{title}}` auto-wrapped/shrunk, `{{category}}`) and renders 1200×630 PNGs with resvg → `/og/<category>-<slug>.png` (cached in `.cache/og/`). `design/og/og-default.png` → `/og/default.png` for home/search/404. Template lookup also tries `design/og-template.svg`; without a template a built-in placeholder (`lib/og-placeholder.svg`) is used. Fonts for rendering: static TTFs in `design/fonts/` + Space Mono.
- **Sitemap/robots/feed:** `/sitemap.xml` (indexable pages only, with `lastmod`), `/robots.txt`, `/feed.xml` (Atom, latest 40 guides). Placeholder/draft pages are `noindex` and omitted.
- **Search:** Pagefind runs over `_site/` after the build (`npm run index:search`). Only guides/pages (`data-pagefind-body`) are indexed, filtered by category and spoiler level. Header search box = plain GET form to `/search/?q=…` (works without JS); the search page loads Pagefind UI.
- **SITE_URL** (default `https://REPLACE-ME.example`) drives canonical/OG/sitemap/feed. While it is the placeholder, every page is `noindex` and robots disallows everything. A sub-path (`https://user.github.io/repo`) is supported: all links, CSS-relative fonts, Pagefind and the manifest are prefixed. Switching to the real domain = change `SITE_URL`, rebuild.
- Optional env: `SITE_NAME`, `TWITTER_HANDLE`, `NOINDEX=1`, `STRICT=1`.

## Analytics (GoatCounter, free, cookie-less) — OFF until a code is set

1. Create a free site at https://www.goatcounter.com/signup (the "code" is the subdomain: `https://<code>.goatcounter.com`).
2. GitHub repo → Settings → Secrets and variables → Actions → **Variables** → New variable `GOATCOUNTER_CODE` = `<code>`. Re-run the deploy workflow (or push). Locally: `GOATCOUNTER_CODE=<code> npm run build`.
3. The build then adds one `<script data-goatcounter="https://<code>.goatcounter.com/count" async src="//gc.zgo.at/count.js">` at the end of `<body>`. **Unset (or invalid) = nothing is emitted: no script, no network calls.** It is also suppressed on noindex/placeholder-URL builds. Config: `site.analytics.goatcounter` in `lib/site.js`.

## Ads / affiliate placeholder — OFF by default

`ADS_ENABLED=1` (repo Actions variable `ADS_ENABLED=1`, or env locally) renders empty, labelled, fixed-height `<aside class="ad-slot" data-ad-slot="…">` regions via `src/_includes/partials/ad-slot.njk` (one after each article, one at the end of each category page). Unset = the partial outputs nothing at all. Placeholder only: no ad-network or affiliate code. Paste network markup into the partial's comment spot when approved. Config: `site.ads.enabled` in `lib/site.js`.

## Sources poller (`scripts/poll-sources.mjs`) — not scheduled by the repo

`node scripts/poll-sources.mjs` (`--dry-run`, `--only=newswire,youtube,psn,xbox`) checks Rockstar Newswire (title + link only, rendered once in headless Chrome because the page is client-side), the Rockstar YouTube RSS feed, PlayStation status and Xbox status (last two only when NOT all-green) and writes NEW items to `content/inbox/*.md` with `status: queue`, `source`, `source_url`, `fetched_at`. The build never publishes `content/inbox/`. De-dupe state: `.sources-state.json` (gitignored). robots.txt is fetched and honoured for page fetches (Newswire) with the UA `LeonidaGuidesBot/1.0 (+https://roarcode.github.io)`; the explicitly advertised feeds (YouTube RSS, status JSON/XML) are read like a feed reader (YouTube's robots.txt disallows `/feeds/videos.xml` for generic crawlers; set `ROBOTS_STRICT_FEEDS=1` to enforce it, which skips YouTube). One data request per source per run, 15 s timeouts, per-source try/catch, no Reddit. Schedule it externally, e.g. every 30 minutes.

## Deploy

- **GitHub Pages (CI):** `.github/workflows/deploy.yml` builds on push to `main` (content/design/src changes) and deploys. In the repo: Settings → Pages → Source = GitHub Actions. Optional repo variable `SITE_URL` for a custom domain; otherwise `https://<owner>.github.io/<repo>`. Custom domain: add it in Settings → Pages (+ DNS CNAME), set `SITE_URL`, re-run.
- **Cloudflare Pages:** `wrangler.toml` + `docs/CLOUDFLARE-PAGES.md` (build `npm run build`, output `_site`, `NODE_VERSION=22`, `SITE_URL`). `_headers` (cache/security) is honoured there and on Netlify.
- Nothing here deploys by itself; no domain is bought.

## Layout

```
content/            markdown guides (+ inbox/ staging, never published; _facts.md etc. ignored)
design/             Designer kit: tokens.css (source of truth), fonts/, img/, logo/, og/, favicons
src/                templates (Nunjucks): index, category, guide, page, search, 404, sitemap, feed, robots, css
src/css/            site CSS (bundled with design/tokens.css into one hashed /assets/site.<hash>.css)
src/js/             search.js (Pagefind UI boot), spoilers.js (toggle)
lib/                content loader, markdown, seo, og, css, assets, site config
scripts/            preview.mjs, watch.mjs, check.mjs
```

`design/components.css` / `ui.js` / `fonts.css` from the kit are NOT bundled yet: `src/css/*` implements the same tokens and BEM names (`.site-header`, `.guide-card`, `.article`, `.site-footer`, `.badge`…) and will be reconciled with the kit's `preview.html` when it lands.
