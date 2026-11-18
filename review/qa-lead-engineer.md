# Technical QA: live site https://roarcode.github.io/ (Lead Engineer)

- Run: Wed 18 Nov 2026, 11:55-12:05 CET (Europe/Ljubljana). READ-ONLY: no tracked file edited, nothing committed or pushed, deploy untouched.
- Method: full crawl of live site from `/` plus every sitemap URL (26 HTML pages, 78 assets, 46 external URLs listed), header/JSON-LD/canonical/OG parse of every page, feed parse, Pagefind fragment inspection, Lighthouse 13.6 (mobile preset, headless Chrome), headless Chrome at 320 and 360 px width, 14 OG images viewed.
- Spoiler rule: this report quotes no GTA VI content. Pages are referred to by path.
- Note: the working tree has ~30 uncommitted modified files (content + `design/src/render_og.mjs`). Some findings below may already be fixed there but are not deployed. Findings describe LIVE.
- Reviews folded in (attributed): Researcher `facts-review.md` (R), SEARCH `search-review.md` (S), Designer `design-review.md` (D). `needs-screenshot.md` only lists 8 image slots without a source; it is context for B1.

## Counts (de-duplicated)

| Severity | Count |
|---|---|
| Blocker | 1 |
| Major | 14 |
| Minor | 18 |
| Nit | 6 |

**Spoiler leakage: NO.** No spoiler-block text appears in any `<head>`, meta/OG/Twitter text, JSON-LD, card/listing text, Atom feed (blocks are redacted to a one-line notice) or the Pagefind index (`data-pagefind-ignore` works). Details under "Spoiler safety". Two judgement calls on badge accuracy are in M11.

## Lighthouse (mobile, live, my run)

| Page | Perf | A11y | Best-practices | SEO | FCP / LCP / TBT / CLS | Weight / requests |
|---|---|---|---|---|---|---|
| `/` | 100 | 100 | 100 | 100 | 0.8 s / 1.4 s / 40 ms / 0.001 | 371 KiB / 17 |
| `/launch-hub/release-time/` | 100 | 100 | 100 | 100 | 1.0 s / 1.0 s / 40 ms / 0.001 | 111 KiB / 12 |
| `/launch-hub/` | 100 | 98 | 100 | 100 | 0.9 s / 0.9 s / 40 ms / 0.001 | 106 KiB / 12 |

Designer's run of the guide page scored Perf 95 (TBT 270 ms); that is run-to-run variance on a long article. Raw JSON: `/tmp/lh-home.json`, `/tmp/lh-guide.json`, `/tmp/lh-hub.json`. Top opportunities: short cache lifetimes (GitHub Pages sends 10 min; `_headers` is ignored), hero image 87 KiB over-delivered (AVIF 768 px used for a smaller slot), one small render-blocking CSS file (6.7 KB, acceptable), heading order on hubs.

---

## BLOCKER

### B1. Raw `![alt](TODO: image:...)` text is published on every guide, in the Atom feed (42 occurrences) and in search excerpts
- URLs: all 13 guides, e.g. `/launch-hub/release-time/` (4 slots), `/beginner-tips/beginner-tips/` (3), `/launch-hub/map/` (3); `/feed.xml`; `/search/?q=preload`. Source files: `content/*.md`; renderer `lib/markdown.js`. (Also D B1, S #4.)
- Problem: CommonMark rejects a link destination containing spaces, so the custom `image` renderer never runs and the literal markdown shows inside a `<p>`. Looks unfinished and Pagefind indexes it.
- Fix: in `lib/markdown.js` add a core rule (or pre-pass regex) that matches `!\[(.*?)\]\(TODO:\s*image:([^\s—)]+)[^)]*\)` and either (a) drops the slot entirely until the asset exists (fastest, safest for launch) or (b) emits `<figure class="figure figure--pending" data-pagefind-ignore>` with CSS placeholder. Also strip from the feed. Add a build check in `scripts/` that fails if the built HTML or `feed.xml` contains `TODO:`.

---

## MAJOR

### M1. Seven internal links 404 (relative `.md` hrefs), also in the feed
- Pages -> dead target: `/beginner-tips/beginner-tips/` -> `preload-size.md`, `ps5-settings.md`; `/launch-hub/launch-night-checklist/` -> `preload-size.md`; `/launch-hub/leonida/` -> `map.md`; `/launch-hub/map/` -> `leonida.md`; `/launch-hub/gta-6-online/` -> `release-time.md`; `/launch-hub/preload-size/` -> `release-time.md`. (Also S #3.)
- Source lines: `content/beginner-tips.md:31,35`, `launch-night-checklist.md:46`, `leonida.md:33`, `map.md:73`, `gta-6-online.md:50`, `preload-size.md:32`.
- Fix (robust): in `lib/markdown.js` `link_open`, rewrite hrefs ending in `.md` (optionally with `#frag`) to the target guide's permalink via the content index (`lib/content.js`), and fail the build when no match. Quick fix: edit the 7 links to `/launch-hub/<slug>/` (`/launch-hub/ps5-settings/` for PS5 settings). Add a post-build link check to `npm run check`: no `href` ending `.md`.

### M2. Unescaped `|` in `Xbox Series X|S` splits a table cell on `/launch-hub/release-time/`
- Live cell starts with `S" (as quoted by PC Gamer...`. Source: `content/release-time.md` conflict table. (S #2.)
- Fix: write `X\|S` inside table rows, or "Xbox Series X and Series S".

### M3. `/launch-hub/release-time/`: Brisbane and Perth rows contradict the note under the table
- Table shows each city's own midnight; the prose says the table is the store-listed Australian time. (R #2, S #1.)
- Fix: working tree reportedly already corrected (Brisbane 23:00 AEST / 13:00 UTC, Perth 21:00 AWST). Verify and redeploy; keep the "check your console countdown" hedge.

### M4. `/launch-hub/release-time/` still uses relative wording ("today", "Europe tonight")
- Becomes wrong after 00:00 CET tonight. (R #3.)
- Fix: "New Zealand went first: 12:00 CET on Wed 18 Nov." / "Central Europe unlocks at 00:00 CET on Thu 19 Nov." Remove "today/tonight" site-wide (grep content). Needed before midnight.

### M5. OG image title text is clipped at the right edge
- `https://roarcode.github.io/og/launch-hub-jason-lucia.png`: line 1 "...: Who" is cut off ("Who" runs past 1200 px). `launch-hub-release-time.png` line 1 touches the edge with no margin. Other 12 OG images are fine.
- Cause: line-wrap width in `src/render_og.mjs` / `design/src/render_og.mjs` is too wide for Syne at the title size.
- Fix: reduce the max line width (about 18-20 chars at current size, or measure text and wrap at <= 1040 px from x=56), or auto-shrink font on overflow; then re-render and republish `/og/*.png`. The working tree has an uncommitted edit to `design/src/render_og.mjs`: verify it fixes these two, then regenerate.

### M6. Slug collision: guide lives at `/beginner-tips/beginner-tips/`; PS5 settings guide is under `/launch-hub/` while `/ps5-settings/` is an empty category
- Ugly doubled URL; two sitemap entries for near-same topic (`/beginner-tips/` has 1 guide). `/ps5-settings/` nav hub is empty while the PS5 guide sits elsewhere. (S top-fix 5.)
- Fix before Google indexes it: give the guide an explicit permalink (e.g. `/beginner-tips/start-strong/`, or move the guide to `/launch-hub/beginner-tips/`) and set the PS5 guide's `category: ps5-settings` or remove the empty hub. Because both URLs are already public, add a meta-refresh redirect stub at the old path (GitHub Pages cannot do 301s) with `<link rel="canonical">` to the new URL.

### M7. "Leaks & Rumors" hub is live and in the main nav (`/leaks/`)
- Linked from `/` and every page header; empty, noindex. BRIEF.md and `content/README.md:104` say never publish leaks; `content/template-leak.md` sets up leak-chasing pages with clickbait titles. (S #5, #38.)
- Fix (owner decision): remove `leaks` from `categories.seed.json`/nav for now, or rename to "Rumours" and bar leak/datamine content. Delete or rewrite `template-leak.md`.

### M8. Researcher fact/source majors still live (see `facts-review.md` for exact wording)
- R #1 `release-time.md`: says Slovenia/Croatia are not named in sources though gta6everything.com/unlock-times lists them (PlayStation Store only). Live now says "Europe (CET, incl. Slovenia): 00:00 CET": re-check the sourcing sentence.
- R #35 `leonida.md` FAQ: "Is Vice City the only city? No." treats regions as cities.
- R #39 `map.md`: "3x RDR2" claim attributed to a secondary source; GameSpot states it directly.
- R #46 `beginner-tips.md`: traffic/police tip shown as confirmed; source says "reported". Quick answer needs the hedge.
- (R #49 About byline claim is already fixed on live.)

### M9. Spoiler-level badges understate / one arc detail outside a spoiler block (judgement call, Rok's core rule)
- R #21 `editions-prices` and #24 `vintage-vice-city-pack` are `spoilers: none` but name characters/places from store marketing copy; R #47 `beginner-tips` (already `minor` in working tree, live still "Spoiler-free"); R #31 `jason-lucia.md:35` states an arc/choice detail outside a spoiler block; R #29 meta description phrase "one risky plan" (live meta description and og:description still contain it).
- Also: the same official store text is hidden inside a spoiler on `/launch-hub/leonida/` and `/launch-hub/map/` but shown openly on `/launch-hub/editions-prices/` and `/launch-hub/vintage-vice-city-pack/` (and indexed by Pagefind there). Inconsistent: either hide it everywhere or set `spoilers: minor`.
- Fix: set `spoilers: minor` on those pages (or reword), move `jason-lucia.md:35` into a `:::spoiler`, replace the description with R's suggested text.

### M10. No official/rumour/"unverified" labelling visible anywhere (D M1)
- BRIEF requires marking. Templates support `badge--rumour`/`notice--rumour` but no live page uses them and there is no "official source" badge. Fix: add `badge--official`, tag each source Official/Preview/Other, and add the "How we label facts" block on `/`.

### M11. Mobile: wide tables clip cell text with no scroll cue (D M4)
- e.g. `/launch-hub/release-time/` at 390 px. No page-level overflow was found by my check (scrollWidth == viewport at 320/360 on all 26 pages), only inside `.table-wrap`. Fix: right-edge fade/inset shadow while scrollable or stack rows as cards under 40 rem.

### M12. Mobile: category nav strip clips, no hamburger or scroll hint (D M3)
- At 320-390 px roughly half of the 9 nav items are off-screen (nav is an `overflow-x` strip). Fix: ship the kit hamburger (`design/components.css`, `ui.js`) below 64 rem or add an edge fade.

### M13. Card media incomplete (D M2)
- 4 of 8 category cards have art; guide cards have no thumbnails. Fix: shared fallback art for every category card, add `guide-card__media`.

### M14. Atom feed repeats M1 and B1 defects and uses relative links
- `/feed.xml`: 6 relative `href`s (the `.md` links) and 42 `TODO: image` lines inside `<content>`. Fix: clears with B1/M1; additionally set `xml:base="https://roarcode.github.io/"` on `<feed>` so relative links resolve.

---

## MINOR

1. Titles over 60 chars on 12 pages (66-74 chars incl. " | Leonida Guides"), e.g. `/launch-hub/vintage-vice-city-pack/` (74). Likely truncated in SERP. Fix: shorten page titles to <= 52 chars + brand, or drop the brand suffix on long ones.
2. `robots.txt` has `Disallow: /search/` while `/search/` carries `noindex`. Google cannot see a noindex on a blocked URL. Fix: keep `noindex,follow` and remove the Disallow (or keep Disallow and drop the meta, not both).
3. WebSite JSON-LD `SearchAction` target is `/search/?q={search_term_string}` (noindex/disallowed). Sitelinks searchbox is deprecated: remove `potentialAction` or leave (harmless).
4. Heading order: hub pages jump h1 -> h3 (`/launch-hub/`, `/beginner-tips/`, every category page; Lighthouse a11y 98). Fix: card titles as h2 or an h2 section heading above cards.
5. Six noindex empty category hubs (`/missions/ /money/ /collectibles/ /cars/ /glitches/ /ps5-settings/` plus `/leaks/`) are linked from the nav, home grid and footer; they show "Last updated" (D m5). Fix: hide empty categories from nav/home until they have a guide, or label "Coming soon"; drop the date on empty hubs.
6. Bare hostnames autolinked as `http://` (`http://gtasix.org`, `http://gta6record.com`, `http://rockstargames.com/VI`) in `radio-stations.md`, `release-time.md`, `map.md` and the feed. Fix: write full `https://` URLs (official: `https://www.rockstargames.com/VI`). (S #19)
7. Cache lifetimes 10 min for all assets on GitHub Pages (`_headers` is not honoured; Lighthouse "cache" insight). Accepted trade-off on the free host; Cloudflare Pages would honour `_headers`. CSS is content-hashed already; hash `assets/js/spoilers.js` too (currently unhashed, so a stale copy can pair with new HTML).
8. Hero `hero-768.avif` and category stills are over-delivered (87 KiB savings on mobile). Fix: add a 480/640 w candidate and tighten `sizes`.
9. "Show all spoilers" toggle shows on pages with no spoiler block (D m2). Fix: in `assets/js/spoilers.js` only unhide when `document.querySelector("details.spoiler")`.
10. Footer disclaimer and `site.disclaimer` say only "Not affiliated with Rockstar Games"; the footer second sentence adds Take-Two trademark text, but the visible short disclaimer and the OG badge do not name Take-Two (S top-fix 3, About does). Fix: "Unofficial fan site. Not affiliated with Rockstar Games or Take-Two Interactive." everywhere (`site.disclaimer`, OG template).
11. Tap targets under 44 px: search button 36 px, brand logo 34 px, footer links ~30 px, ToC summary 38 px (D m1). Lighthouse passes at 24 px.
12. Breadcrumb separator wraps onto the next line on long titles (D m3).
13. Mobile hero H1 wraps to 3 tight lines (D m4).
14. No persistent "unofficial" strip in the header (D m6); footer only. Acceptable but BRIEF says clearly unofficial.
15. Search UI/article-assets only partly follow the design kit (D m7); `design/article-assets/` is not copied into `_site`.
16. Facts: many R minors (44) including R #45, #48, #51 (secondary-source claims without a second source) and S medium rows. Do them in one content pass from `facts-review.md` / `search-review.md`.
17. `/search/`: Pagefind index covers 14 guides/pages only; hubs are not indexed (fine) but search excerpts show raw `TODO` text until B1 is fixed.
18. HTTP->HTTPS: could not verify `http://roarcode.github.io` redirect from this box (box egress returns a proxy 500 for any plain-http URL; WebFetch reached the http URL fine). Confirm in repo Settings -> Pages that "Enforce HTTPS" is ticked.

## NITS

1. `/404.html` carries a canonical to itself (`/404.html`) plus noindex: drop the canonical on the 404 template.
2. `<time datetime>` formats are mixed: date-only (`2026-11-18`) in cards and full `2026-11-18T00:00:00.000Z` in one spot; `dateModified`/`datePublished` are date-only. Valid, but prefer full ISO with timezone (`2026-11-18T12:00:00+01:00`) and keep all `<time>` consistent.
3. `og:locale` is `en_US` while the site audience is global English: optional `en`.
4. All feed entries have `updated` = `T00:00:00.000Z`; feed readers will not see same-day updates. Use the real modified time.
5. `Article.author` is the Organization only (valid for Google; a named Person helps E-E-A-T but About says team byline).
6. `theme-color #07050f` vs token `--bg-0 #07060c` (D P3).

---

## Detailed results per requested check

1. **Links/404s:** 26 pages and 78 assets crawled. Every asset (CSS, JS, fonts, AVIF/WebP, SVG, icons, manifest, OG PNGs, Pagefind files) returns 200. Internal 404s: only the 7 `.md` links (M1). 46 distinct external URLs found (not fetched for status: S already did `search-review.md` link appendix). Unknown path (`/does-not-exist`, `/nonexistent-xyz/`) returns HTTP 404 with the custom branded 404 page (nav, disclaimer, noindex). Trailing-slash redirects (`/launch-hub` -> `/launch-hub/`) are 301.
2. **Sitemap/robots:** `sitemap.xml` has 17 URLs, all `https://roarcode.github.io/...`, all 200, with `lastmod`. Excluded correctly: `/search/`, `/404.html`, 7 empty categories (noindex). `/beginner-tips/` (category with 1 guide) is included. `robots.txt`: `Allow: /`, `Disallow: /search/`, `Sitemap:` line correct. See minor 2.
3. **Canonicals:** exactly one `rel=canonical` per page on all 26 pages, self-referencing, correct origin, no placeholder. (404 has one: nit 1.)
4. **Meta/OG/Twitter:** every page has `<title>`, description (25-155 chars; all unique, no duplicate titles), `og:title/description/image/url/type`, `og:image:width/height/alt`, `twitter:card=summary_large_image` + image + alt. All og:image URLs return 200 (default.png and 14 per-guide PNGs). `robots` meta correct (`index,follow` on content, `noindex,follow` on search/404/empty hubs). Clipped OG text: M5.
5. **Schema:** every JSON-LD block parses (0 errors). Types found: `WebSite` (home only), `BreadcrumbList` (every page), `Article` (13 guides). No FAQPage, no HowTo, no TechArticle. Every Article has headline (41-57 chars, <110), datePublished, dateModified, author (Organization), image, publisher, mainEntityOfPage, description. `dateModified` = 2026-11-18 = visible "Updated 18 Nov 2026" on all guides.
6. **Disclaimer:** "Unofficial fan site. Not affiliated with Rockstar Games." is present in the footer on all 26 pages including `/`, 13 guides, `/about/`, `/search/`, `/404.html`, and all category hubs. Also in the OG image badge. See minor 10 for the Take-Two wording.
7. **Lighthouse:** see table; ran fine with `/usr/bin/google-chrome`.
8. **Mobile/static:** viewport meta on all pages (`width=device-width, initial-scale=1, viewport-fit=cover`). Home images use AVIF `srcset` with width/height (hero `fetchpriority=high`, others `loading=lazy`); no `<img>` without `alt`. CSS has only `min-width`/`max-width` rem media queries and no fixed pixel widths >= 100 px. Headless Chrome at 320 and 360 px: no page-level horizontal overflow on any of 26 pages; the only scrolling regions are the nav strip and `.table-wrap` (M11, M12). Guide pages ship a collapsed ToC on mobile.
9. **Spoiler system (static):** 8 `<details class="spoiler">` blocks live on 3 pages: `/launch-hub/jason-lucia/` (4), `/launch-hub/leonida/` (2), `/launch-hub/map/` (2). Rendered as `details.spoiler > summary.spoiler__summary + div.spoiler__body[data-pagefind-ignore]`: native `<details>`, works without JS, closed by default. The toggle `button[data-spoiler-toggle][aria-pressed=false]` ("Show all spoilers") is present on every page, hidden until JS runs, remembers state in `localStorage["lg-spoilers"]`, default off. Spoiler headings are excluded from the ToC by `lib/markdown.js` (`stripSpoilers` filter); none of the current blocks contain headings, so this is unproven live: add a test block with an `###` heading before relying on it. Badges: 10 guides Spoiler-free, 3 guides Minor spoilers (live); no page is Major, so the "major" badge style is untested. Interactive reveal can be tested live on `/launch-hub/map/`. Note: `:::spoiler` label text is itself visible (summary): authors must keep labels spoiler-safe.
10. **Other reviews folded in:** done above (R: M8, M9 + minors; S: B1/M1/M2/M3/M7/M14 + minors 2, 6, 10, 16; D: M10-M13 + minors 5, 9, 11-15).

## Spoiler safety (check 4 detail)
- Method: extracted every `details.spoiler` text (8 blocks), built 5-word shingles, and searched all `<head>` content, JSON-LD, all non-spoiler body text on all 26 pages, `feed.xml`, and all 14 Pagefind fragments.
- Result: 0 hits in head/meta/OG/Twitter/JSON-LD; feed shows only "Spoiler section hidden: <label>" notices; Pagefind fragments for the three spoiler guides contain no block text. The only overlaps are (a) public source URLs inside JSON-LD, (b) a product name, and (c) a short official-store description appearing both inside spoiler blocks and openly on the editions/pack pages (see M9, a consistency issue, not a leak of story text).
- Residual risks: M9 (badge level and `jason-lucia.md:35`, meta description phrase), and spoiler summary labels are always visible.

## Suggested fix order for the single pass
B1, M1, M2, M14 (same renderer work), then M3/M4/M5 (before midnight), M6/M7/M9 (policy and URLs, decide now), then M10-M13 and the minors.
