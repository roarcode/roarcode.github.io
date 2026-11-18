# Design review — Leonida Guides (live)

- **Target (primary):** https://roarcode.github.io/
- **Reviewed:** 18 Nov 2026, 11:56 CET (Europe/Ljubljana, UTC+1)
- **Also compared:** local `_site` (byte-identical to live for HTML, CSS, wordmark and hero), design kit in `design/`, mockups in `design/screenshots/mockup-*.png`
- **Method:** headless Chromium (390×844 and 1280×800, full-page screenshots), computed contrast, overflow, tap-target and spoiler checks, Lighthouse against the live URL
- **Constraint:** no GTA VI story, mission, character or secret text is quoted. Pages are referred to by URL path only.
- **Repo:** this review writes only under `/workspace/gta6-guides/review/`. Site code and design files were not edited.

## Severity counts

| Severity | Count |
|---|---|
| Blocker | 1 |
| Major | 4 |
| Minor | 7 |
| Polish | 5 |
| **Total** | **17** |

## Verdict

The live site **already uses the current design kit’s look**, not an older pre-kit theme: bundled `design/tokens.css` (violet-black surfaces, neon accents, Syne / Inter / Space Mono), the Leonida Guides wordmark, the original neon hero and four category stills, and the unofficial footer disclaimer. It does **not** yet use the later `design/components.css` (hamburger, search panel, chips, `guide-card__media`) that landed at 11:51 CET, after the 11:49 CET site CSS and the 11:52 CET GitHub Pages deploy.

Against the mockups the live site is a solid dark UI with a cheap-looking content layer: every guide still prints raw `![…](TODO: image:…)` slots, fact-label badges from the mockups are missing, and half the category tiles have no art. Tokens, type, contrast and the 404 are premium; the guides and card grids are not launch-ready.

**Live vs `_site`:** homepage, guide HTML, `assets/site.5d53a37f0a.css`, wordmark and hero hash-match. The only behavioural difference is hosting: GitHub Pages serves the custom `404.html` for unknown paths (confirmed at `/this-page-does-not-exist/`). A local `python3 -m http.server` of `_site` would not.

## Lighthouse (live)

| Page | Form | Perf | A11y | Best practices | SEO |
|---|---|---:|---:|---:|---:|
| `/` | mobile | 100 | 100 | 100 | 100 |
| `/` | desktop | 100 | 100 | 100 | 100 |
| `/launch-hub/release-time/` | mobile | 95 | 100 | 100 | 100 |

Home mobile: LCP 1.6 s, TBT 40 ms, CLS 0, page weight 371 KiB. The guide’s 95 is mostly TBT 270 ms on a long article. Lighthouse `target-size` passes (WCAG 2.2’s 24 px). Findings below still use the requested 44 px minimum. Raw JSON: `review/lighthouse/`.

---

## Findings

### Blocker

#### B1. Raw `TODO: image:` markdown is visible in every guide — and in search excerpts

- **Pages:** all 13 guides, e.g. `/launch-hub/release-time/`, `/beginner-tips/beginner-tips/`, `/launch-hub/map/` (3–4 slots each). Also `/search/?q=preload`.
- **Viewports:** mobile and desktop
- **Screenshots:** `review/shots/guide-release-time--mobile-image-slots.png`, `review/shots/guide-release-time--mobile.png`, `review/shots/search-q--desktop.png`
- **Issue:** Copywriter slots are written as `![alt](TODO: image:slug-step-N — notes)`. CommonMark will not parse a destination that contains spaces, so `lib/markdown.js`’s custom `image` renderer never runs and the literal `![…](TODO:…)` string is left inside a `<p>`. Captions sit next to the raw syntax. Pagefind then indexes that text, so search hits for “preload” show `[TODO: image:preload-size-step-1 — …]` in the excerpt. No in-article `<img>`, figure, or styled placeholder is rendered. `design/article-assets/` (step numerals, pins, button icons) is not copied into `_site` / the live root.
- **Fix:** In `lib/markdown.js` (before `md.render`, or as a core ruler), match `![alt](TODO: image:SLUG — …)` and emit a `<figure class="figure figure--pending">` (alt, slug, optional dashed CSS placeholder using `--line-2` / `--bg-2`). Do not leave raw markdown in the HTML. Exclude pending figures from the Pagefind body (`data-pagefind-ignore` on the figure, or strip before indexing). Copy `design/article-assets/` to `/assets/article-assets/` and swap in generated art when a slot is ready. Do not put `TODO:` in a plain link destination if it has spaces — use a plugin, or a space-free form such as `![alt](todo:slug)`.

### Major

#### M1. Official / rumour labelling from the brief and the mockups is not on the live site

- **Pages:** `/`, all category hubs, all guides, `/search/`
- **Viewports:** both
- **Screenshots:** `review/shots/home--desktop.png`, `review/shots/home--mobile.png`, `review/shots/guide-release-time--mobile.png`; compare `design/screenshots/mockup-home-desktop.png` and `mockup-hub-desktop.png`
- **Issue:** The brief requires official facts and rumours to be marked. The mockups show `Official source`, `Unverified` / rumour chips on cards, plus a homepage “How we label facts” block. Live templates already support `badge--rumour`, `notice--rumour` and a `rumour` front-matter flag (`src/guide.njk`, `src/css/30-components.css`), but **no live page** uses `badge--rumour`, `badge--official`, or `notice--rumour`. Cards only show spoiler-level + category. “Last updated 18 Nov 2026” is present and consistent (green `.article__updated`, 11.58:1). There is no official-source badge component at all.
- **Fix:** Add `badge--official` (cyan, `--status-official`, with a text label — never colour alone). Set `rumour: true` (or per-source flags) in front matter where needed and render the existing rumour badge + `notice--rumour`. Tag sources in `.sources__list` as Official / Preview / Other. Port the mockup “How we label facts” section onto `/`.

#### M2. Card media is incomplete — grids look half-finished next to the mockups

- **Pages:** `/` (category + guide cards), `/launch-hub/`, empty hubs such as `/missions/`
- **Viewports:** both (more obvious at 1280, where Launch Hub sits in a 4-column row with three imaged tiles)
- **Screenshots:** `review/shots/home--desktop.png`, `review/shots/home--mobile.png`; compare `design/screenshots/mockup-home-desktop.png`, `mockup-hub-desktop.png`
- **Issue:** Only 4 of 8 `.category-card`s have `.category-card__media` (missions, money, collectibles, vehicles). Launch Hub, glitches, beginner-tips and ps5-settings are text-only, so heights jump (mobile: ~403 px with art vs ~193–238 px without). `.guide-card` has no `.guide-card__media` / thumbnail at all (the kit and mockups do). Empty hubs use a decent dashed `.empty` state, which is fine pre-launch; the homepage grid is what looks cheap.
- **Fix:** Add category stills for the four missing hubs (or a shared CSS/SVG fallback so every `.category-card` has a 16:9 `.category-card__media`). Add `guide-card__media` to `macros.njk` / `.guide-card__link` — OG still or category art — so the latest-guides grid matches the mockup.

#### M3. No kit hamburger; mobile category nav clips with no scroll hint

- **Pages:** all (header)
- **Viewports:** 390×844 (at 1280 all eight links fit)
- **Screenshots:** `review/shots/home--mobile.png`, `review/shots/404--mobile.png`; compare `design/screenshots/mockup-home-menu-mobile.png`
- **Issue:** `design/components.css` and the mockups use `.site-header__toggle` (hamburger + overlay list) and a search icon-button. Live uses a second-row `.site-nav__list { overflow-x: auto }` with no fade, peek, or “More”. On 390 px the list is 878 px wide in a 357 px viewport; Launch Hub / Missions / Money are visible and the next item is cut off mid-icon. Document `scrollWidth` equals `innerWidth` (no page-level overflow — the scroller works), but nothing tells the user there are five more categories. There is no hamburger. A site-wide eye button (`.spoiler-toggle`, 44×44, correctly revealed by JS) occupies the corner the kit uses for Menu.
- **Fix:** Port `.site-header__toggle` / the overlay from `design/components.css` + `design/ui.js` below 64 rem. If the scroller is kept as an interim, add a right-edge fade on `.site-nav` (`mask-image` or a `::after` gradient) and `aria-label` text that the list is scrollable. Consider hiding `.spoiler-toggle` unless `details.spoiler` exists on the page.

#### M4. Wide tables clip cell text on mobile, with no scroll affordance

- **Pages:** guides that contain markdown tables, e.g. `/launch-hub/release-time/`
- **Viewports:** 390×844
- **Screenshots:** `review/shots/guide-release-time--mobile-table-clip.png`, `review/shots/guide-release-time--mobile.png`
- **Issue:** `.table-wrap { overflow-x: auto }` plus `th, td:first-child { position: sticky; left: 0 }` lets the second column run off the right edge. On the release-time FAQ-style table the last visible characters of an answer are cut mid-word, and there is no shadow, fade, or “swipe” hint. The wrap is a keyboard-focusable region, but it does not look interactive.
- **Fix:** On small screens, either stack the table (display rows as cards: `thead { display: none }` + `td { display: block }`) or keep horizontal scroll and add a right fade / inset shadow on `.table-wrap` while it can still scroll (`scrollWidth > clientWidth`). Ensure the sticky first column keeps an opaque `background` (already `var(--bg-2)`).

### Minor

#### m1. Several chrome controls are under the requested 44 px tap target

- **Pages:** all
- **Viewports:** both (more important on 390)
- **Screenshots:** `review/shots/home--mobile.png`
- **Issue:** `.site-search__button` is 36×36 (absolute, inside a 44 px input). `.brand` / logo images are 34 px tall. Footer `.site-footer__list a` is ~30.5 px tall (`padding: 4px 0`). `.toc__summary` is 38.4 px. Some byline / prose links are line-height only. Nav links and the spoiler toggle already meet 44 px. Lighthouse `target-size` still scores 100 at the 24 px threshold.
- **Fix:** `.site-search__button { width: 44px; height: 44px; right: 0; }`. Give footer links `min-height: 44px; display: inline-flex; align-items: center;`. Increase `.brand__logo` hit area with padding, not a larger glyph. `.toc__summary { min-height: 44px; }`.

#### m2. “Show all spoilers” is in the header on pages that have no spoiler boxes

- **Pages:** `/`, `/missions/`, `/search/`, `/about/`, `/this-page-does-not-exist/`, etc. (every template that includes `header.njk`)
- **Viewports:** both
- **Screenshots:** `review/shots/home--desktop.png`, `review/shots/404--mobile.png`
- **Issue:** `spoilers.js` unhides `[data-spoiler-toggle]` everywhere. On pages without `details.spoiler` the control does nothing. It crowds the header and is not in the mockups.
- **Fix:** Only `btn.hidden = false` when `document.querySelectorAll("details.spoiler").length > 0`.

#### m3. Long breadcrumbs wrap with a leading slash on the next line

- **Pages:** long-title guides, e.g. `/launch-hub/release-time/`
- **Viewports:** 390
- **Screenshots:** `review/shots/guide-release-time--mobile.png`
- **Issue:** `.breadcrumbs__item + .breadcrumbs__item::before { content: "/"; }` stays with the current item title. When the last crumb wraps, the line starts with `/`.
- **Fix:** Put the separator on the previous item, or `overflow-wrap: anywhere` / truncate the current-page crumb (`text-overflow: ellipsis; max-width: 100%`) and keep `aria-current` on the full title.

#### m4. Mobile hero title wraps tightly over three lines

- **Pages:** `/`
- **Viewports:** 390 (desktop is fine: “and kept current.” sits on the gradient in one line)
- **Screenshots:** `review/shots/home--mobile.png` vs `review/shots/home--desktop.png` and `design/screenshots/mockup-home-mobile.png`
- **Issue:** Live H1 is “Every GTA VI guide, sourced and kept current.” at 38 px / 41.8 px (line-height 1.1, `--lh-tight`, `.hero__title` `max-width: 16ch`). It breaks as “Every GTA VI / guide, sourced / and kept current.” The mockup used the shorter “Every guide, from day one.” Tokens already warn that Syne is wide and H1s should stay short.
- **Fix:** Shorten the H1, or at 390 use a slightly smaller fluid step / `--lh-snug` (1.25) on `.hero__title`, and `text-wrap: balance`.

#### m5. Empty category hubs show a last-updated date

- **Pages:** `/missions/`, `/money/`, `/cars/`, `/collectibles/`, `/glitches/`, `/ps5-settings/`
- **Viewports:** both
- **Screenshots:** `review/shots/hub-missions--mobile.png`
- **Issue:** The empty state itself is clear (“No guides here yet.” + links). The kicker still says “0 guides · Last updated 18 Nov 2026” even when there are no guides.
- **Fix:** In the category template, omit the last-updated fragment when `count === 0`.

#### m6. No persistent unofficial strip in the header (footer only)

- **Pages:** all
- **Viewports:** both
- **Screenshots:** live `review/shots/home--desktop.png` vs `design/screenshots/mockup-home-desktop.png`
- **Issue:** Mockups have a slim top bar, “Unofficial fan site — not affiliated with Rockstar Games.” Live puts that wording only in `.site-footer__disclaimer` (and on guide pages in `.article__disclaimer`). The footer wording is present, clear, and sufficient for the brief — this is a kit-gap, not a missing disclaimer.
- **Fix:** Optional: add a one-line `.site-banner` above `.site-header` using the mockup copy, `font-size: var(--fs-100)`, `--text-3`.

#### m7. Search UI and article-asset set do not match the kit

- **Pages:** `/search/`, `/search/?q=preload`; all guides
- **Viewports:** both
- **Screenshots:** `review/shots/search-q--desktop.png` vs `design/screenshots/mockup-search-desktop.png`
- **Issue:** Live search is themed Pagefind (usable, with Category / Spoilers filters) rather than the kit’s result cards, official chips and `/` shortcut. Independently, `design/article-assets/` never reaches `/assets/`, so templates cannot use the step / pin / button SVGs.
- **Fix:** After B1, `passthroughCopy` `design/article-assets` → `assets/article-assets` and document paths for the article template. Search visual parity with the mockup can follow; first stop indexing TODO strings (B1).

### Polish

#### P1. GitHub Pages cache lifetimes are short
Lighthouse “efficient cache lifetimes” (home desktop, ~407 KiB). `_headers` already sets long cache for hashed CSS and fonts, but GitHub Pages ignores `_headers` (the file itself says so). Not a visual bug; Cloudflare/Netlify, or hashed image URLs, would pick this up.

#### P2. Hero / category image delivery
Lighthouse “improve image delivery” (~227 KiB desktop, ~87 KiB mobile). The `<picture>` AVIF/WebP set is in place; some stills can be compressed further or sized more tightly with `sizes`.

#### P3. `theme-color` is `#07050f`, tokens use `--bg-0: #07060c`
Minor chrome mismatch in `base.njk` / meta. Use `#07060c`.

#### P4. Footer IA differs from the mockups
Live: Guides + Site (About, Search, Feed, Sitemap). Mockups also show Corrections, Privacy, Contact. Fine to defer; don’t invent policy pages for launch.

#### P5. Hub filters, sort, and reserved ad slot from the mockups are absent
Expected pre-launch (and the brief wants reserved ad height only when ads exist). No action required for 19 Nov.

---

## Gaps vs mockups (`design/screenshots/mockup-*.png`)

The live site is clearly the same brand (wordmark, neon skyline, tokens, type). It is not a pixel-complete implementation of the kit. Outstanding vs the mockups:

| Mockup | Live |
|---|---|
| Hamburger + overlay (`mockup-home-menu-mobile.png`) | Horizontal scrolling `.site-nav` |
| Header search icon / expand, `/` kbd, instant results panel | Always-on search `<form>` posting to `/search/` |
| Top unofficial strip | Footer (and article) disclaimer only |
| Hero CTAs “Browse all guides” + “How we label facts” | Large search field + “Search” pill |
| Shorter hero “Every guide, from day one.” | Longer “Every GTA VI guide, sourced and kept current.” |
| All category tiles consistent; guide cards have media | 4/8 category tiles have art; guide cards are text-only |
| Official / Unverified chips; “How we label facts” | Spoiler + category badges only |
| Hub filter chips, sort, pagination, reserved ad well | Plain guide list or `.empty` |
| Guide page: step cards, annotated map, two sidebars | Prose + compact ToC; no step/map components yet |
| Custom search result cards | Themed Pagefind UI |
| Footer: Corrections / Privacy / Contact | About, Search, Feed, Sitemap |

Nav labels also differ slightly (live has Launch Hub and PS5 Settings; mockups show Weapons / More). That matches the live IA, not a regression.

## What already works

- Unofficial disclaimer is in `.site-footer__disclaimer` on every reviewed page, including the custom 404. No Rockstar logos or ripped brand marks in images, CSS or SVG wordmarks (original Leonida monogram + wordmark only). Hero and category stills are original neon art with empty `alt` on decorative images; the home brand link has `aria-label="Leonida Guides — home"`.
- Spoiler boxes on `/launch-hub/map/` (and the same pattern on the other spoiler guides): `details.spoiler` is **closed by default**, a summary click opens one box, and “Show all spoilers” opens all then closes all. Preference is stored. No open-spoiler screenshots were taken.
- No page-level horizontal overflow at 390 or 1280 (`document.scrollWidth === innerWidth`). No broken images, no missing `alt` attributes, no console errors on 200 pages. The 404 “Failed to load resource” is the missing document itself.
- Custom 404 at `/this-page-does-not-exist/` (“That page took a wrong turn.”) is on-brand, with Back to home + Search, and the footer disclaimer.
- Readability: article body 17 px / 1.7 (Inter, `--text-2`) at ~643 px on desktop; badges and meta stay at 12 px. Contrast is comfortably above AA (hero title 18.08:1, prose 11.19:1, footer meta 5.94:1, spoiler-free badge 10.51:1, updated stamp 11.58:1). ToC is collapsed on mobile and opened by JS from 64 rem up.
- Last-updated is shown consistently as 18 Nov 2026 on guides, cards and the footer.

## Premium vs cheap

**Premium:** the tokenised dark surfaces, Syne headings, sunset gradient on the hero accent and footer rule, original skyline, sticky frosted header, typography scale, sources block, AI-assisted byline, and the 404. Desktop home, at a glance, looks like a real product.

**Cheap / unfinished:** raw `TODO` markdown in the body and in search; half-empty category tiles; text-only guide cards; no official/rumour chips; a clipped mobile nav and clipped mobile tables. Those are the things that stop it looking launch-grade.

## Top 5 fixes

1. Parse `![alt](TODO: image:slug — …)` in `lib/markdown.js` into styled placeholders (and strip them from Pagefind) so no raw markdown ships.
2. Wire `badge--official` / existing `badge--rumour` from front matter and sources, and add the homepage “How we label facts” block.
3. Give every `.category-card` a 16:9 media slot and add `guide-card__media` thumbnails so the grids match the mockups.
4. Ship the kit hamburger below 64 rem (or a fade on `.site-nav__list`) so off-screen categories are discoverable at 390 px.
5. Stop clipping `.table-wrap` cells on mobile (stack or show a scroll hint) and bump `.site-search__button` plus footer links to 44 px.

## Screenshot index

Live captures (390×844 and 1280×800, full page) are in `review/shots/`:

- Homepage: `home--mobile.png`, `home--desktop.png`
- Hubs: `hub-launch--*.png`, `hub-missions--*.png`
- Guides: `guide-release-time--*.png`, `guide-beginner--*.png`, `guide-map--*.png` (spoilers closed)
- Search: `search--*.png`, `search-q--*.png`
- 404: `404--mobile.png`, `404--desktop.png` (unknown path, custom page)
- About: `about--*.png`
- Detail crops: `guide-release-time--mobile-image-slots.png`, `guide-release-time--mobile-table-clip.png`

Supporting measurements: `review/audit-data.json`. Lighthouse: `review/lighthouse/home-mobile.json`, `home-desktop.json`, `guide-release-time-mobile.json`.
