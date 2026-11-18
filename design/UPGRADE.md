# Leonida Guides — redesign hand-off for Lead Engineer (v2 "Dusk Wire")

*Unofficial fan site — not affiliated with Rockstar Games.* Rebuilt 18 Nov 2026 (Europe/Ljubljana) after the repo re-clone; the master copy now lives **outside the repo** at `/workspace/gta6-design-work/design/` (see §9).
All mockup content is placeholder-only (no spoilers, no Rockstar/GTA VI logos or art, no competitor artwork/text).

Source of truth: `design/tokens.css` → `design/components.css` (+ `fonts.css`, `ui.js`). Mockups mirror the BEM names 1:1: `mockup-home.html`, `mockup-guide.html` (also `-collectibles`, `-hub`, `-search`). Full markup per component: `components.md`.

## 0. What changed (one paragraph)
Near-black indigo base, sunset pink `--accent` / orange / cyan accents, restrained glow. Display type is **Anton** (OFL, 400 only, ALL-CAPS) replacing Syne; body **Inter** variable (400–800, opsz pinned to 14); Space Mono removed (`--font-mono` is an alias of `--font-body`; labels = Inter 800 uppercase tabular-nums). Shape language: pill = button/CTA, slanted parallelogram = chip, notched corner = hero/tiles/promo, diagonal cut = card media. Layout: ticker → slim nav (one pill CTA) → **hero beside a ranked "Latest" wire** (below on mobile) → Trending strip → Quick Access grid → Popular tiles → filterable guide grid → marquee/promo. Guide page follows the IGN pattern (breadcrumbs, byline + updated date, sidebar ToC with scroll-spy, quick facts, related). Patterns borrowed from the reference set (layout only, never artwork/text): RAVEX (ticker, condensed caps, ranked wire, filter chips), Good Game (popular tiles + grid), Farlight (diagonal cuts, marquee), Cayo Kings (dusk palette, neon), IGN (guide page), Game8 (Quick Access).

## 1. Files to take (exact paths, all under `/workspace/gta6-guides/design/`)
| Purpose | Path |
|---|---|
| Tokens (single source) | `tokens.css` (+ generated `tokens.json`, doc `tokens.md`) |
| Components | `components.css` (sections 0–14, map in the header) |
| Fonts | `fonts.css`, `fonts/Anton-Regular.woff2` (18 KB), `fonts/Inter-Variable.woff2` (31 KB), `fonts/LICENSES.md` |
| JS (progressive) | `ui.js` (4.7 KB minified) |
| Art | `img/crop-*.webp` (8), `img/tall-*.webp` (6), `img/hero-768.{avif,webp}`, `img/cat-missions-768.{avif,webp}` (+ existing `img/*`); generator `src/build_crops.py` |
| Docs | `components.md`, this file, `tokens.md`, `README.md` |
| Mockups | `mockup-home.html`, `mockup-guide.html` (+ collectibles, hub, search) |
| Screenshots | `screenshots/redesign-{home,guide}-{desktop,mobile}.png`, `screenshots/redesign-home-old-vs-new.png`, state shots |
| Tests / tooling | `src/test_redesign.mjs` (61 checks), `src/lighthouse.mjs`, `src/shoot_redesign*.mjs`, `src/build_pages.py` |
| Old kit (reference only) | `legacy/` — do not ship |

**Fonts.** Both subset (pyftsubset) to Basic Latin + Latin-1 + **Latin Extended-A (č š ž ć đ)** + general punctuation, woff2. **Preload only Anton:** `<link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/Anton-Regular.woff2">`. Inter loads on demand (`font-display: swap`); `Anton Fallback` (size-adjusted) avoids CLS. The old `Syne-var`, `Inter-var`, `SpaceMono-*` woff2 files are intentionally LEFT in `design/fonts/` because live `src/css/01-fonts.css` still points at them; delete them (and that file's Syne/Space Mono faces) when you port the redesign. Follow-ups outside the kit: the OG-image and article-image renderers still use `fonts/*-static.ttf` (Syne) — re-point them to Anton; regenerate the `logo/` wordmark SVGs in Anton (the header/footer now use a live-text wordmark `.site-header__wordmark` / `.site-footer__wordmark`, so the SVGs are only for OG/social).

## 2. Mapping: live class names → v2 kit
The live Eleventy templates use older names; port by replacing these (or add the alias selector in the bundle):
| Live (src/) | v2 kit | Template |
|---|---|---|
| `.hero*` (home hero + `hero__search`) | `.hero-grid` > `.hero-feature*` + `.wire*` (search moves to the header dropdown) | `index.njk` |
| `.update-list*` (`__item/__link/__cat/__meta/__time`) | `.wire*` (`__item/__link/__cat/__meta`; rank is a CSS counter) | `index.njk` |
| `.grid--cards` + `guideCard` macro | `.guide-grid` + `.guide-card*` | `macros.njk`, `index.njk`, `category.njk` |
| `.grid--categories` + `categoryCard` macro | `.quick-access*` (home) | `macros.njk`, `index.njk` |
| `.section__header/__meta/__kicker/__title` | `.section__head/__link/__kicker/__title` | all |
| `.site-search*` | `.site-header__search` dropdown + `.search*` | `partials/header.njk` |
| `.badge--category` | `.chip` (`--ghost`, `--filter`) | macros |
| `spoilerBadge` → `badge badge--spoiler badge--spoiler-{level}` | **unchanged names**, restyled | macros |
| `.article__header/__title/__lead/__badges` | `.article-head*` (`__inner/__tags/__title/__lede`) | `guide.njk` |
| `.article__byline/__author/__published/__updated/__meta` | `.byline*` (`__avatar/__body/__author/__dates/__updated`) | `guide.njk` |
| `.article__layout/__toc/__main` (+ `--single`) | `.guide-layout*` (`__toc/__main/__aside`) | `guide.njk` |
| `.article__toc.toc` / `.toc__details[data-toc]` / `.toc__item a` | `.toc` details (`__summary/__list/__item/__link`); `.toc__item a` is styled too | `guide.njk` |
| `.article__body.prose`, `.faq*`, `.sources`, `.key-answer` | `.prose`, `.faq*` (unchanged), `.source-credit*`, `.callout--tip` (restyle `.key-answer` the same way) | `guide.njk` |
| `details.spoiler`, `[data-spoiler-toggle]`, `lg-spoilers` | **unchanged hooks**; markup in `components.md` §11 | `45-spoilers.css`, `spoilers.js` |
| `[data-checklist]` (checklist.js) | `.checklist*` + `.progress-card*` (kit uses `data-tracker`; keep one — see §5) | `guide.njk` |
Kit-internal renames vs the pre-redesign v1 kit (only matters if you already ported v1): `.latest-grid/.latest-card*` → `.guide-grid/.guide-card*` (`--row` → `--compact`); `.hero__*` removed; `.trending__rail/__now` → `.trending__list`; `.nav__link` category dot removed; `.site-header__logo--wordmark` → text wordmark; header search is a dropdown at all sizes; `.btn--primary` kept as alias of `.btn--cta`; `.section__more` → `.section__link`; Syne/Space Mono tokens → Anton / alias.

## 3. New components → template mapping
| Component (BEM root) | Where | Template / partial | Data needed |
|---|---|---|---|
| `.ticker` | below header (home) | `base.njk` or `index.njk` (new `partials/ticker.njk`) | `_data/ticker.json` or guides with `ticker: "short line"`; ≤6; CSS-only; duplicate group `aria-hidden`, links `tabindex="-1"` |
| `.site-header` (+`__wordmark`, `__cta`, `.nav`, `.spoiler-toggle`) | all pages | `partials/header.njk` | nav from `_data/nav`; ONE CTA |
| `.site-footer` + disclaimer | all pages | `partials/footer.njk` | disclaimer string verbatim |
| `.hero-grid` > `.hero-feature` + `.wire` | home | `index.njk` | hero = newest `featured: true`; wire = 6 most recent by `updated` |
| `.trending` | home | `index.njk` | `trending: true` (cap 6–8) |
| `.quick-access` | home | `index.njk` | `_data/quickAccess.json` (label, href, icon id, category, count) |
| `.tile-row` | home | `index.njk` | `popular: true` (cap 4) |
| `.guide-grid` + `.guide-card` + `.chip--filter` | home, category, search, related | `macros.njk` → `guideCard(g, opts)` | see below |
| `.marquee`, `.promo` | home bottom | `index.njk` | static text |
| `.breadcrumbs`, `.article-head`, `.byline`, `.read-progress` | guide | `guide.njk` | `author`, `published`, `updated`, `readingMinutes` |
| `.guide-layout` + `.toc` + `.side-card` + `.related` | guide | `guide.njk` | headings (ToC), auto related (3 per category) |
| `.spoiler*`, `.spoiler-toggle*`, `badge--spoiler-*` | guide + cards | `macros.njk` / shortcode `{% spoiler %}` | `spoilers` level |
| `.checklist`, `.progress-card`, `.gallery`/`.lightbox`, `.embed-post` | opt-in | partials | §4 |

### guideCard macro (data)
`title, url, category (name + slug → `cat-{slug}`), cardImage (pipeline image path), focus (optional `object-position`), spoiler level, updated, readingMinutes, excerpt`. Card art = category art crops / pipeline images; **do not** use the text-heavy `site-images/` infographics as card art (unreadable at card size) — keep them in-article. Fallback when a guide has no image: `img/crop-{category}.webp` (accent-tinted by CSS), never an empty box. Modifiers: `--feature` (one per grid), `--compact` (sidebar/related), `.is-flip` (alternate every second card for rhythm).

## 4. Front-matter fields
```yaml
author: Leonida Guides Team          # byline (default if absent)
published: 2026-11-14                # byline "Published"
updated: 2026-11-18                  # byline "Updated" + <time datetime> + wire sort + badge--updated
# reading time: existing auto `readingMinutes`; `reading_time: 6` optional override
featured: true                       # one guide → hero
trending: true                       # Trending strip (+ ticker if `ticker:` set)
ticker: "Short ticker line"          # optional, ≤ 60 chars
popular: true                        # Popular tiles (≤ 4)
spoilers: none | minor | major       # → badge--spoiler-{level}; already used by spoilerBadge
cardImage: /img/guides/slug.webp     # optional; fallback = category crop
focus: "50% 40%"                     # optional object-position
quickFacts: [{k: "Reward", v: "…"}]  # optional → .quick-facts
related: [slug-a, slug-b, slug-c]    # optional override; default = auto 3 per category
checklist: true                      # live `[data-checklist]`, or checklistItems: [{id, label}] for the kit tracker
gallery: [{src, alt, caption, credit}]   # → .gallery (+ lightbox)
```
`updated` drives everything "freshness" (wire order, badge, byline, sitemap lastmod) — the design leans on it visibly.

## 5. JS (`ui.js`) vs live JS
Everything works without JS: ticker/marquee are CSS, ToC and spoilers are `<details>`, filters leave all cards visible; the spoiler switch and ticker pause button are hidden via `<noscript>`/`hidden`. `ui.js` adds: mobile menu, search dropdown (client filter — swap for Pagefind), card filters (`[data-filter-group]` buttons ↔ `[data-cat]` cards inside `data-filter-scope`), ToC scroll-spy, read-progress bar, checklist trackers, gallery lightbox (native `<dialog>`), ticker pause.
- **Spoilers:** keep live `src/js/spoilers.js` (same key `lg-spoilers`, same `[data-spoiler-toggle]`). The kit's `ui.js` implementation is equivalent (`on`/`off` values, `role="switch"` + `aria-checked`, opens/closes every `details.spoiler`) — ship one, not both. If the live script stores different values, change the two strings in `ui.js`.
- **Checklists:** kit uses `data-tracker` / `data-tracker-progress`; live uses `[data-checklist]`. One attribute selector to change; don't ship both.
- Reduced motion: ticker + marquee stop (static scroll rows), hover lifts off.

## 6. CSS delivery (keeps mobile Lighthouse 95+)
`lib/css.js` should bundle `tokens.css` + `components.css` (or the ported `src/css/*.css`) into **one minified file, brotli-compressed, immutable cache**. Measured: `kit.min.css` 62.7 KB raw / **10.5 KB br**, `ui.min.js` 4.7 KB. Unminified/uncompressed multi-file CSS costs ~8–10 Lighthouse points on mobile (transport, not design). Hero LCP image: AVIF/WebP `hero-768` (≈14 KB AVIF / 26 KB WebP), `fetchpriority="high"`, explicit width/height; below-fold images `loading="lazy"`.

## 7. Verification (run from `design/`)
- `LH_DIR=/tmp/lh node src/lighthouse.mjs` — mobile, production-like (single minified CSS, brotli, immutable cache). Result on this build: **home 100 / a11y 100 / BP 100 / SEO 100** (FCP 0.8 s, LCP 1.9 s, TBT 0, CLS 0.000); **guide 100 / 100 / 100 / 100** (FCP 0.9 s, LCP 0.9 s, TBT 0, CLS 0.039).
- `LH_DIR=/tmp/lh node src/test_redesign.mjs` — 61 checks: BEM/structure, hero↔wire placement desktop/mobile, no horizontal overflow 390–1280, fonts (Anton h1, preload only Anton, č š ž covered), filters, search, menu, ToC scroll-spy + collapse, spoiler block (Enter/Space, localStorage persistence, switch), no-JS behaviour, checklist/lightbox, reduced motion, axe WCAG 2.2 AA on home/guide/collectibles/hub, no console errors.
- Tooling install (box was reset): `npm i lighthouse esbuild axe-core playwright-core chrome-launcher` into `/tmp/lh`, `pip install --target /tmp/pylib brotli` (`PYTHONPATH=/tmp/pylib`) for the font subsetter.

## 8. Priority order
1. **Tokens + fonts** — `tokens.css`, `fonts.css`, Anton/Inter woff2, preload Anton only. Sitewide retheme in one commit.
2. **Global chrome** — header/nav (one CTA), ticker, footer + disclaimer, buttons/chips/badges (`components.css` §0–4). Spoiler badge restyle comes with it.
3. **Home** — `hero-grid` (hero + wire), trending, quick access, popular tiles, `guideCard` macro, filters. The visible win.
4. **Guide page (IGN pattern)** — breadcrumbs, `article-head`, byline with **updated date**, 3-column layout with sticky ToC + scroll-spy, restyled spoiler block + page toggle, quick facts, related.
5. **Category/hub/search** with `guide-card` + crops; then opt-ins: checklist/progress, gallery/lightbox, embed-post, marquee/promo.
6. Follow-ups: OG/article renderers → Anton; wordmark SVGs; remove legacy fonts; single minified brotli CSS if not already.

### Top 5 ship-first (impact ÷ effort)
1. Tokens + Anton/Inter fonts (+ preload Anton only) — biggest "no longer generic" change, zero template work.
2. Header / ticker / footer / buttons / chips / badges — every page changes.
3. Home hero + ranked Latest wire + `guideCard` macro — the main redesign moment.
4. Guide page header / byline (updated date) / ToC / spoiler UI — core pages, IGN-style trust.
5. Single minified brotli CSS + `ui.js` filters/scroll-spy — keeps mobile Lighthouse ≥ 95.

## 9. Backup / master copy
Master: `/workspace/gta6-design-work/design/` (outside the repo — a re-clone cannot wipe it). Tarball: `/workspace/gta6-design-work/redesign-<timestamp>.tar.gz`. Not part of v2 (dropped from v1/upgrade kits): `.category-tile`, `.tabbar`, `.rank-list`, `.split`.
