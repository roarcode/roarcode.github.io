# STRIPDOWN.md — v3 "Newsroom" (proposal only; nothing here is shipped)

Unofficial fan site, not affiliated with Rockstar Games. All mockup text is placeholder; no GTA VI content appears anywhere in these files.
Owner verdict on v2: "smells vibe coded". Direction (final rules from God Bot): editorial restraint after Rockstar Newswire, Iron Theory (ref-04), T&J (ref-07), numerals (ref-08).
Audit date: Wed 18 Nov 2026, live site at commit 468d975 (CSS bundle `site.f90f067ad2.css`; the live bundle hash changed to `site.7afcb6f075.css` during this task, so Lead has shipped something since: re-run `/workspace/gta6-design-work/strip-audit.mjs` if needed). Nothing in `src/` or git was touched.

Files: `design/tokens-v3.css`, `design/fonts-v3.css`, `design/components-v3.css` (standalone replacement for components.css), `design/mockup-home-v3.html`, `design/mockup-guide-v3.html`, `design/logo/wordmark-v3.svg` (+ `-preview.png`), screenshots in `design/screenshots/v3-*.png`, audit evidence in `review/strip/` (live screenshots at 390 and 1440, `audit-live.json`, `audit-v3.json`). Generators: `/workspace/gta6-design-work/strip-audit.mjs`, `build_v3.py`, `shoot_v3.mjs`; Lighthouse: `design/src/lighthouse-v3.mjs`.

---

## 0. The decisions (read this first)

| Decision | Choice | Why |
|---|---|---|
| Accent | **Orange `#ff8a3d`**, the only chromatic colour | 8.4:1 on the page background, so 12px labels and 16px links pass AA and AAA; dark text on an orange fill is 8.4:1 too. Pink is 5.9:1 (white text on it fails, and neon pink is the loudest "template" signal). Cyan has the highest raw contrast (12.9:1), but it is already link, focus ring, status and 4 of 8 category colours, it collides with the teal water in half of the card art, and cyan on indigo is the AI-neon look the owner rejected. Orange is the one hue the art only uses at the horizon, so it reads as a quiet editorial link colour. |
| Surfaces | Neutral near-black (`#0b0b0f`…), not violet-tinted | One accent on an indigo ground looks muddy; neutral lets the photos carry colour. **Judgement call**: revert by changing 7 `--bg-*/--line-*` values if Rok wants the indigo back. |
| Type | **Newsreader** (display serif: headlines, dek, numerals, wordmark) + **Inter** (quiet sans: nav, meta, prose) | Two files, ~70 KB total (Newsreader 39 KB woff2, opsz pinned at 40, wght 400-700, Latin + Latin-Ext-A; Inter 31 KB, already shipped). Anton is dropped (-18 KB) and all-caps headlines go with it. |
| Components | No pills, chips, badges, icons, ticker, marquee, boxes, glows, shadows, clip-paths. Structure = type + whitespace + 1px hairlines | Per final rules. Only gradient left: one text scrim under the lead headline. |
| Category / date | One metadata line: `LAUNCH HUB · 18 NOV 2026 · 3 MIN` (`.meta`), small uppercase Inter, muted; the category link is the only coloured part | Per rules. |
| Spoiler level | `.spoiler-line`: bold text label + a hairline above and below. Minor/major change the wording, major also turns the rules and label orange. In lists/cards it appears **only when not spoiler-free** ("Minor spoilers"), as plain muted text. | Clear but plain. Spoiler-free is the default state, so it need not be repeated 34 times. **Judgement call**: if Rok wants "Spoiler-free" shown everywhere, add it as a 4th item in `.rows__note`. |
| Section markers | `01`, `02` numerals (muted serif) on home sections; auto-numbered `01…` above each article h2 and in the ToC (CSS counters, no markup) | Per rules (ref-08). |
| Hover | Underline only. No lift, glow, fill or colour-box | Per rules. |
| Nav | Six plain words: Launch hub, Missions, Money, Collectibles, Cars, Fixes. Beginner tips and Leaks move to the footer and the home topic index | Per rules (5-6 words). |
| Wordmark | `Leonida` off-white + `Guides` orange, Newsreader 650, no gradient, no icon. `logo/wordmark-v3.svg` has the text as paths (336x50, 21 KB); the header itself uses live text in the same face | Per rules. |

---

## 1. Inventory of ornamental elements (live v2)

Counts are from `review/strip/audit-live.json` (Playwright on the live site; "vis" = rendered at 1440). H = home, G = guide (`/launch-hub/release-time/`), Hub = `/launch-hub/`, S = search. Lines refer to `design/components.css` unless a file is named; `70-site.css` = `src/css/70-site.css`.

| # | Element | Selector (file:line) | Where / how often | Verdict |
|---|---|---|---|---|
| 1 | **Ticker** (scrolling strip, NEW label, pause button, duplicated list) | `.ticker*` (cc:98-111); `partials/ticker.njk`; ui.js ticker pause | H: 1 (47 nodes, always animating) | **Remove** (+ JS) |
| 2 | **Marquee** (decorative word loop) | `.marquee*` (cc:157-160); `index.njk` end | H: 1 (18 nodes, `aria-hidden`) | **Remove** |
| 3 | Spoiler **badge** (pill with dot, green/yellow/red) | `.badge--spoiler*` (cc:137-145); macro `spoilerBadge` | H: 34, Hub: 23, G: 4 (head + 3 related) | **Convert**: card/list: plain text only when not spoiler-free; article: `.spoiler-line` |
| 4 | "Updated" badge with clock icon (green) | `.badge--updated` (cc:136); `index.njk` hero, `guide.njk` head | H: 1, G: 1 | **Convert** to the date inside `.meta` |
| 5 | "Official sources" badge with tick icon | `.badge--official` (cc:136); `guide.njk` | G: 1 | **Convert**: a plain "Official" label on the source line (see #26) |
| 6 | Rumour / placeholder / draft badges | `.badge--rumour` (cc:136); `guide.njk`, `macros.njk` | 0 today, template-reachable | **Convert** to a one-line `.spoiler-line`-style note ("Unconfirmed: ...") |
| 7 | Category **chip** (slanted, filled, per-category colour) on every card image | `.guide-card__chip.chip` (cc:126, 262); `macros.njk` | H: 34, Hub: 23 (and it repeats #8 right below it) | **Remove** |
| 8 | Category text in card meta | `.guide-card__cat` (cc:270) | H: 34, Hub: 23 | **Keep, restyle** as first item of `.meta` |
| 9 | Hero chip "Unofficial GTA VI guides" + hero tag row | `.hero-feature__tags` (cc:181), `.chip` | H: 1 row, 2 pills | **Remove** (zero hero badges) |
| 10 | Article tag row: spoiler pill + category chip + updated pill + official pill | `.article-head__tags` (cc:304); `guide.njk` | G: 1 row, 4 pills (6 with rumour/draft) | **Remove row**; replace by `.meta` + `.spoiler-line` |
| 11 | Filter chips (All / Launch hub / ...) | `.chip--filter`, `.chip-row` (cc:129-132); ui.js `data-filter-*` | H: 5 | **Remove** (+ JS); the header nav and topic index do the job |
| 12 | "Explore other hubs" ghost chips | `.chip--ghost` (cc:128); `category.njk` | Hub: 7 | **Convert** to the `.index` text list |
| 13 | Source-kind tags (OFFICIAL / PRESS / COMMUNITY pills) | `.sources__kind*` (70-site) | G: 17 | **Convert** to a small muted caps word in column 1 of `.sources li` |
| 14 | Pagefind "Updated: 2026-11-18" tag pill, bordered filter panel, glyph markers on sub-results, yellow underlined marks | `src/css/50-pagefind.css` + pagefind default UI | S: 1 per result, panel always visible | **Remove tag**, flatten panel, accent marks (see §3) |
| 15 | **Icons**: search, menu, close, clock, tick, flame, pause/play, spoiler switch track, 8 category icons | `svg` ×11-15 per page; `macros.njk catIcon/clock`; `.icon`, `.icon-btn`, `.quick-access__icon` (cc:36, 53-66, 226) | H: 11-12, G: 3-4 | **Remove all**: search and menu become the words "Search" and "Menu" |
| 16 | Quick Access tiles (notched, top colour bar, icon, count) | `.quick-access__*` (cc:220-230); `index.njk` | H: 8 tiles, 53 nodes | **Replace** with `.index` (text list, counts muted) |
| 17 | Trending strip, Popular tiles (flag-gated) | `.trending*`, `.tile*` (cc:207-246) | 0 today (hidden until front-matter flags) | **Delete** CSS + template blocks |
| 18 | Gradient CTA button, ghost button, header CTA | `.btn`, `.btn--cta`, `.btn--ghost`, `.site-header__cta` (cc:119-124) | H: 5, G/Hub/S: 1 (header "Unlock time") | **Remove all buttons**; the one CTA is a text link |
| 19 | **Gradients** (sunset header underline, wordmark text gradient, wire head, hero overlay, article-head radial, card overlay, hub overlay, progress bar) | `--gradient-*`, `--overlay-*` (tokens), cc:46, 51, 191, 178, 302, 594, 319 | H: 11 elements, G: 4, Hub: 3 | **Remove**, keep one scrim (`.lead__text`) |
| 20 | **Glows / shadows** (hover glow, button glow, status dot glow, hub title square, nav dropdown shadow) | `--glow-*`, `--shadow-*`; cc:122, 194, 460 | tokens + 8 rules | **Remove** |
| 21 | **Clip-path shapes** (slanted chips, notched cards, notched hero, cut-bottom) | `--clip-*`; cc:126, 253-262, 295, 329 | H: 88 elements at 1440, Hub: 53 | **Remove** |
| 22 | Live pulse dot "Newest first" + "Latest updates" header band | `.wire__head`, `.wire__live` (cc:191-194) | H: 1 | **Remove**; becomes `01 Latest guides` section head |
| 23 | Ranked wire list (01-06 numerals in category colours, boxed) | `.wire*` (cc:190-204); `index.njk`, `category.njk` (x2) | H: 1, Hub: 1, empty hubs: 1 | **Simplify** to `.rows` (hairline list, no box, no numerals in colour) |
| 24 | Eyebrow kickers ("Browse", "Newest first", "Most read", "Live now") + underlined section titles with accent bar | `.section__kicker` (cc:146), `.section__head` | H: 2, Hub: 1 | **Remove** kickers; section head = numeral + title + hairline |
| 25 | Hero: image-under-text with overlay, big all-caps Anton H1 with gradient `em`, lede, 2 buttons | `.hero-feature*` (cc:174-187); `index.njk` | H: 1 | **Replace**: `.intro` (H1 + dek + one text link) then ONE `.lead` story |
| 26 | Article head: radial glow bg, avatar ring, green "Last updated", AI line | `.article-head`, `.byline*` (cc:302-315) | G: 1 | **Simplify**: `.meta`, H1, dek, one byline line, spoiler line |
| 27 | Sticky ToC box (accent top border, numerals in box, hover fills) + mobile sticky bar | `.toc*` (cc:332-344) | G: 1 | **Simplify**: unboxed hairline list, 01 numerals, "+" on phones |
| 28 | Related guides side-card with 3 image cards + badges, and the empty ad slot below it | `.guide-layout__aside`, `.side-card`, `.related` (cc:359-362, 469) | G: 1 (46 nodes) | **Remove boxed sidebar**; replace by "More in ..." `.rows` at the foot |
| 29 | Reading-progress bar (gradient) | `.read-progress` (cc:319); ui.js | G: 1 | **Remove** (+ JS) |
| 30 | Key-answer / callout / notice boxes (tinted bg, coloured left bar, cyan) | `.key-answer`, `.notice*`, `.callout*` (70-site) | G: 0-1; callouts 0 live | **Simplify** to hairline `.answer` / 1px rule note |
| 31 | Spoiler reveal block (yellow border, 4px bar, tinted bg) | `.spoiler*` (cc:365-379) | 0 live, markdown-reachable | **Simplify** to `details.spoiler` (two hairlines, orange "Spoiler." word, +/-) |
| 32 | Header spoiler **switch** (pill + track + knob + "Off") | `.spoiler-toggle*` (cc:71-82) | every page | **Convert** to the text button "Spoilers: hidden / shown" (same `lg-spoilers` key) |
| 33 | Header: glass blur, sunset underline, logo icon, icon buttons, search dropdown, hamburger | `.site-header*`, `.nav*` (cc:44-97) | every page | **Simplify**: plain bar, wordmark, 6 words, "Search", "Menu" (a `<details>`, no JS) |
| 34 | Disclaimer bar | `.disclaimer-bar` (cc:39) | every page | **Keep** (legal), restyled as one muted line |
| 35 | Footer: 3 boxes, gradient wordmark | `.site-footer*` (cc:381-395) | every page | **Keep, simplify** (hairline, plain columns) |
| 36 | Card art tint by category colour + duplicated crops | `.guide-card__art` overlay (cc:258-262) | H: 34 | **Remove tint**; keep 8-crop rotation |
| 37 | Dead CSS (not in any built page, JS or lib): map-embed (10 classes), step-badge/kbd/do-dont/legend kit (20), gallery+lightbox (9), embed-post (8), progress-card, search panel, hub-toolbar/pagination/side-list/result-list, ad-slot (6, rendered only if a slot is set) | cc:397-433, 435-545, 562-583 | 0 | **Delete** (keep `.figure`, `.table`, `.faq`, checklist if markdown still emits them: see §3) |
| 38 | **Colours**: live pages use 6 hues in chrome (pink, orange, cyan, green, blue, violet) plus yellow/red states and 8 category accents | `--brand-*`, `--accent-*`, `--status-*`, `.cat-*` | H: pink 8, cyan 32, green 30, orange 15, blue 6, violet 1; G: cyan 40, blue 19, green 6 | **One accent** (orange). Delete `.cat-*`, `--cat-*`, `--accent-*`, `--status-*` |
| 39 | **Emoji in content**: ✅ ⚠️ 🔶 in a status table and key | markdown in `content/` (guide `/launch-hub/release-time/`: 25 glyphs) | G: 25 | **Convert** to words (Confirmed / Calculated / Sources disagree). **Content change for Copywriter**, not a template change |

Not ornamental, kept as is: breadcrumbs (restyled with slashes), FAQ details, tables, figures, checklist ticks, X embeds, pagefind engine.

---

## 2. Proposed token changes (diff against `design/tokens.css`)

Generated from `diff -u tokens.css tokens-v3.css`. Names kept where a token survives (`--bg-*`, `--line-*`, `--text-*`, `--accent`, `--space-*`, `--fs-*`, `--container`...). `--accent` is now one fixed value, not a per-category variable.

```diff
--- tokens.css	2026-11-18 13:19:46.261701661 +0100
+++ tokens.css (v3)	2026-11-18 13:53:45.816055640 +0100
@@ -1,133 +1,68 @@
 /* ==========================================================================
-   Leonida Guides — design tokens  (SOURCE OF TRUTH; tokens.json is generated from this by src/build_tokens_json.py)
-   v2 "Dusk Wire" redesign: Anton display + Inter body, slanted/notched shapes, pink→orange CTA, restrained glow.
+   Leonida Guides — design tokens  v3 "Newsroom" (DRAFT — editorial strip-down; see STRIPDOWN.md)
+   One accent (orange). Neutral near-black. Two faces: Newsreader (display serif) + Inter (quiet sans). No gradients, glows, shadows or clip shapes.
    Unofficial fan site — not affiliated with Rockstar Games.
-   Mobile-first. Dark-only. Import once:  <link rel="stylesheet" href="/tokens.css">
-   Contrast (WCAG 2.2): --text-1/2 on any --bg-* >= 9:1; --text-3 >= 5.1:1 on --bg-3 (AA 4.5:1).
+   Contrast (WCAG 2.2): --text-1/2 on any --bg-* >= 9.9:1; --text-3 >= 5.9:1; --accent on --bg-0..3 >= 7.0:1; --text-on-accent on --accent 8.4:1.
    ========================================================================== */
 :root {
   color-scheme: dark;
 
-  /* ---- Surfaces (violet-tinted near-black; Vercel-style tiers with fixed jobs) ---- */
-  --bg-0: #06050d;   /* page */
-  --bg-1: #0c0a1a;   /* header, footer, inset areas */
-  --bg-2: #141030;   /* cards, panels */
-  --bg-3: #1d1745;   /* hover / raised / inputs */
-  --line-1: #2a2446; /* default 1px border */
-  --line-2: #3b3462; /* hover border */
-  --line-3: #54497f; /* active / strong border */
+  /* ---- Surfaces: neutral, four steps, each with one job ---- */
+  --bg-0: #0b0b0f;   /* page */
+  --bg-1: #111116;   /* footer, inset areas */
+  --bg-2: #17171d;   /* inputs, table header, code */
+  --bg-3: #1f1f27;   /* hover */
+  --line-1: #26262f; /* hairline: the default separator */
+  --line-2: #34343f; /* hover / input border */
+  --line-3: #4a4a58; /* strong border */
 
   /* ---- Text ---- */
-  --text-1: #f4f1fa; /* headings, primary body (18:1 on bg-0) */
-  --text-2: #c4bdda; /* body secondary, article prose (11:1) */
-  --text-3: #9189ae; /* meta, captions (6.1:1 on bg-0, 5.1:1 on bg-3) — never smaller than 12px */
-  --text-on-accent: #06050d; /* dark text on pink/orange/cyan fills (>= 5.8:1) */
-
-  /* ---- Brand neons ---- */
-  --brand-pink: #ff2e93;
-  --brand-cyan: #19e3f5;
-  --brand-orange: #ff8a3d;
-  --brand-yellow: #ffc857;
-  --brand-violet: #8b5cf6;
-  --focus-ring: #19e3f5;
-
-  /* ---- Category accents (all >= 6:1 on --bg-2; chip text >= 5:1 on its tinted bg) ---- */
-  --accent-missions: #ff4fa3;
-  --accent-money: #4ade80;
-  --accent-collectibles: #c084fc;
-  --accent-vehicles: #4da3ff;
-  --accent-weapons: #ff6b3d;
-  --accent-glitches: #facc15;   /* glitches & fixes */
-  --accent-beginner: #5eead4;   /* beginner tips */
-  --accent-ps5: #a5b4fc;        /* PS5 settings */
-  --accent: var(--brand-pink);  /* current accent — overridden by .cat-* helper classes */
-
-  /* ---- Status ---- */
-  --status-official: #19e3f5;   /* official-source badge */
-  --status-rumour: #ffc857;     /* rumour / unverified badge */
-  --status-updated: #4ade80;
-  --status-danger: #ff6b6b;
-
-  /* ---- Shape language (clip-path): slanted chips, notched cards ---- */
-  --clip-slant: polygon(7px 0, 100% 0, calc(100% - 7px) 100%, 0 100%);
-  --clip-notch: polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 22px 100%, 0 calc(100% - 22px));
-  --clip-notch-sm: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
-  --clip-cut-bottom: polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 32px) 100%, 0 100%);
-
-  /* ---- Gradients ---- */
-  --gradient-cta: linear-gradient(95deg, #ff8a3d 0%, #ff2e93 100%);
-  --gradient-sunset: linear-gradient(135deg, #ffc857 0%, #ff8a3d 35%, #ff2e93 70%, #8b5cf6 100%);
-  --gradient-sunset-h: linear-gradient(90deg, #ff8a3d, #ff2e93);
-  --gradient-sky: linear-gradient(180deg, #1a0b3a 0%, #5a1a6e 38%, #c2275f 66%, #ff8a3d 88%, #ffc857 100%);
-  --overlay-hero: linear-gradient(90deg, rgb(6 5 13 / .95) 0%, rgb(6 5 13 / .82) 50%, rgb(6 5 13 / .3) 100%),
-                  linear-gradient(0deg, rgb(6 5 13 / 1) 0%, rgb(6 5 13 / 0) 38%);
-  --overlay-hero-mobile: linear-gradient(0deg, rgb(6 5 13 / .97) 0%, rgb(6 5 13 / .9) 52%, rgb(6 5 13 / 0) 80%);
-  --overlay-card: linear-gradient(0deg, rgb(6 5 13 / .85) 0%, rgb(6 5 13 / 0) 60%);
+  --text-1: #f5f5f7; /* headings, strong */
+  --text-2: #c9c9d2; /* body, prose */
+  --text-3: #9a9aa8; /* meta, dates, captions — never below 12px */
+  --text-on-accent: #0b0b0f;
+
+  /* ---- THE accent (the only chromatic colour on the site) ---- */
+  --accent: #ff8a3d;  /* category labels, links on hover, the one button, focus ring, thin rules */
+  --focus-ring: var(--accent);
 
   /* ---- Typography ---- */
-  --font-display: "Anton", "Anton Fallback", Impact, "Arial Narrow", sans-serif;   /* OFL — HEAVY condensed, ALL-CAPS headlines (400 only) */
-  --font-body: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;     /* OFL — UI + prose (400–800) */
-  --font-mono: var(--font-body);   /* alias kept for compatibility: labels are Inter 800 uppercase tabular-nums */
-  --fw-regular: 400; --fw-medium: 500; --fw-semibold: 600; --fw-bold: 700; --fw-extrabold: 800; --fw-display: 400; --fw-display-heavy: 400; /* Anton ships one weight: never ask for bold */
-
-  /* Fluid type scale (mobile -> desktop, ~1.2 -> 1.25 ratio) */
-  --fs-100: .75rem;                                          /* 12 caption / badge / mono label */
-  --fs-200: .8125rem;                                        /* 13 meta */
-  --fs-300: .9375rem;                                        /* 15 UI text, card excerpt */
+  --font-display: "Newsreader", "Newsreader Fallback", Georgia, "Times New Roman", serif;   /* headlines, dek, numerals, wordmark: Newsreader 600, sentence case */
+  --font-body: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;           /* quiet sans: nav, meta, prose */
+  --fw-regular: 400; --fw-medium: 500; --fw-semibold: 600; --fw-bold: 700; --fw-extrabold: 800;
+
+  --fs-100: .75rem;                                          /* 12 label / date */
+  --fs-200: .875rem;                                         /* 14 meta, captions */
+  --fs-300: 1rem;                                            /* 16 UI text, card excerpt */
   --fs-400: 1.0625rem;                                       /* 17 article body */
-  --fs-500: clamp(1.1875rem, 1.12rem + .35vw, 1.375rem);     /* 19–22 lead, h4 */
-  --fs-600: clamp(1.375rem, 1.2rem + .8vw, 1.75rem);         /* 22–28 h3 */
-  --fs-700: clamp(1.75rem, 1.35rem + 1.6vw, 2.5rem);        /* 28–40 h2 */
-  --fs-800: clamp(2.375rem, 1.5rem + 3.6vw, 4rem);          /* 38–64 h1 (Anton is condensed: go big) */
-  --fs-900: clamp(2.75rem, 1.4rem + 6vw, 5.75rem);          /* 44–92 hero */
+  --fs-500: clamp(1.125rem, 1.07rem + .3vw, 1.3125rem);      /* 18–21 lede, card title (lead) */
+  --fs-600: clamp(1.25rem, 1.15rem + .5vw, 1.5rem);          /* 20–24 h3 */
+  --fs-700: clamp(1.5rem, 1.3rem + 1vw, 2rem);               /* 24–32 h2 */
+  --fs-800: clamp(2rem, 1.4rem + 3vw, 3.5rem);               /* 32–56 h1 */
   --lh-tight: 1.1; --lh-snug: 1.25; --lh-normal: 1.5; --lh-prose: 1.7;
-  --ls-display: .012em; --ls-caps: .14em; --ls-mono: .08em;
-  --measure: 68ch; /* max article line length */
+  --ls-head: -.015em; --ls-caps: .08em;
+  --measure: 68ch;
 
   /* ---- Spacing (4px base) ---- */
   --space-1: .25rem; --space-2: .5rem; --space-3: .75rem; --space-4: 1rem; --space-5: 1.5rem;
-  --space-6: 2rem;   --space-7: 3rem;  --space-8: 4rem;  --space-9: 6rem;  --space-10: 7rem;
-  --space-section: clamp(2.5rem, 1.75rem + 3vw, 4.5rem);   /* vertical rhythm between page sections */
+  --space-6: 2rem;   --space-7: 3rem;  --space-8: 4rem;
+  --space-section: clamp(2.5rem, 1.75rem + 3vw, 4rem);
   --gutter: clamp(1rem, .5rem + 2.2vw, 2rem);
 
   /* ---- Layout ---- */
-  --container: 80rem;       /* 1280 */
+  --container: 76rem;       /* 1216 */
   --container-narrow: 48rem;
   --header-h: 3.5rem;
-  --ticker-h: 2.25rem;
-  --sidebar-w: 18rem;
 
-  /* ---- Radii ---- */
-  --radius-xs: 3px; --radius-sm: 6px; --radius-md: 10px; --radius-lg: 14px; --radius-pill: 999px;
+  /* ---- Radii: almost square ---- */
+  --radius-xs: 2px; --radius-sm: 4px; --radius-md: 4px; --radius-lg: 6px;
 
-  /* ---- Shadows / glows (translucent only — never opaque grey halos) ---- */
-  --glow-hover: 0 0 0 1px color-mix(in srgb, var(--accent) 60%, transparent), 0 10px 36px -10px color-mix(in srgb, var(--accent) 55%, transparent);
-  --shadow-1: 0 1px 0 rgb(255 255 255 / .04) inset, 0 8px 24px -12px rgb(0 0 0 / .7);
-  --shadow-2: 0 1px 0 rgb(255 255 255 / .06) inset, 0 18px 40px -16px rgb(0 0 0 / .8);
-  --glow-pink: 0 0 0 1px rgb(255 46 147 / .45), 0 0 24px -2px rgb(255 46 147 / .45);
-  --glow-cyan: 0 0 0 1px rgb(25 227 245 / .45), 0 0 24px -2px rgb(25 227 245 / .4);
-  --glow-accent: 0 0 0 1px color-mix(in srgb, var(--accent) 55%, transparent), 0 0 28px -6px color-mix(in srgb, var(--accent) 60%, transparent);
-
-  /* ---- Motion (subtle; all disabled under prefers-reduced-motion in components.css) ---- */
-  --ease: cubic-bezier(.2, .7, .2, 1);
-  --dur-fast: 150ms; --dur: 220ms; --dur-slow: 500ms;
+  /* ---- Motion: colour/opacity only ---- */
+  --dur-fast: 120ms;
 
   /* ---- z-index ---- */
-  --z-header: 50; --z-dropdown: 60; --z-nav: 55; --z-toast: 80;
+  --z-header: 50; --z-dropdown: 60;
 
-  /* ---- Breakpoints (documentation values; CSS vars can't be used inside @media) ---- */
-  --bp-sm: 30rem;   /* 480  */
-  --bp-md: 48rem;   /* 768  */
-  --bp-lg: 64rem;   /* 1024 — inline nav + sticky ToC sidebar */
-  --bp-xl: 80rem;   /* 1280 */
+  /* ---- Breakpoints (documentation values) ---- */
+  --bp-md: 48rem; --bp-lg: 64rem;
 }
-
-/* Category theme helpers: put on any element, children use var(--accent) */
-.cat-missions { --accent: var(--accent-missions); }
-.cat-money { --accent: var(--accent-money); }
-.cat-collectibles { --accent: var(--accent-collectibles); }
-.cat-vehicles { --accent: var(--accent-vehicles); }
-.cat-weapons { --accent: var(--accent-weapons); }
-.cat-glitches { --accent: var(--accent-glitches); }
-.cat-beginner { --accent: var(--accent-beginner); }
-.cat-ps5 { --accent: var(--accent-ps5); }
```

Also: `fonts.css` is replaced by `fonts-v3.css` (Newsreader + Inter; Anton files can be deleted after the OG renderer moves, see §4). `design/fonts/Newsreader-SemiBold-static.ttf` is provided for resvg (OG images), `Newsreader-OFL.txt` is the licence.

---

## 3. Components to delete or simplify

Everything lives in `components-v3.css` (18 KB source, **3.6 KB brotli** minified with tokens and fonts.css, against 10.5 KB for v2). Drop-in strategy: swap the three kit files in `lib/css.js` (`fonts-v3.css`, `tokens-v3.css`, `components-v3.css`); `src/css/02-categories.css` is deleted; `src/css/70-site.css` and `50-pagefind.css` need the edits below.

**Delete outright** (class, then template that emits it):
`.ticker*` (ticker.njk, ui.js) · `.marquee*` (index.njk) · `.badge`, `.badge--*` (macros `badge`, `spoilerBadge`, `clock`) · `.chip`, `.chip--ghost`, `.chip--filter`, `.chip-row`, `.guide-card__chip` · `.hero-feature*` (all) · `.wire*` (all; `.wire--wide` too) · `.trending*`, `.tile*`, `.tile-row*` · `.quick-access*` · `.btn*` (all variants) · `.icon`, `.icon-btn*`, `.site-header__toggle`, `.site-header__search*`, `.search__*` dropdown · `.spoiler-toggle__track`, `__label`, `__state` · `.read-progress` · `.side-card*`, `.guide-layout__aside`, `.related`, `.hub-filters`, `.hub-toolbar`, `.hub-layout`, `.side-list*`, `.pagination*`, `.result*` · `.byline__avatar`, `.byline--compact` · `.article-head__tags` · `.article__hero` · `.stat*` · `.section__kicker`, `.page-header__kicker` · `.cat-*` helper classes, `--cat-*` in 02-categories.css · `.sources__kind*` (70-site) · `.notice__title` pill-style caps variants · `.map-embed*`, `.step-badge*`, `.kbd-*`, `.do-dont*`, `.legend-item*`, `.pin-inline`, `.gallery*`, `.lightbox*`, `.embed-post*`, `.progress-card*` (dead; restore only if a guide needs one) · `.ad-slot*` unless a slot is configured · every `clip-path`, `box-shadow`, `backdrop-filter`, `animation` rule.

**Simplify (same class name, new rules; see components-v3.css)**:
| Class | v2 | v3 |
|---|---|---|
| `.site-header`, `.nav`, `.nav__link` | glass bar, gradient line, icon buttons, 48px boxed links | plain hairline bar; 6 text links; current page = 2px accent underline; mobile = `<details class="menu">` |
| `.spoiler-toggle` | pill switch | `.textbtn[aria-pressed]` "Spoilers: hidden/shown" (ui.js only flips `aria-pressed`, text and `details.spoiler[open]`) |
| `.guide-card` → `.card` / `.grid__item` | 15 nodes, notched, chip, excerpt, 2-3 badges | 9 nodes: image, `.meta`, title. No excerpt (the lead keeps its dek). Phones: 6.5rem thumb left, text right |
| `.hero-feature` → `.intro` + `.lead` | image bg + overlay + buttons | H1 (stays the site-level SEO line, one accent word) + dek + one text link; then ONE lead story (image 21:9, scrim only under text from 48rem; below the image on phones) |
| `.section__head` | kicker + title + accent underline | numeral + title + `All guides` link under a 1px rule |
| `.wire__list` → `.rows` | boxed, numbered in colour | hairline rows: date / title (serif) / note |
| `.article-head` | glow, tag row, avatar | `.meta`, H1 (serif up to 64px), dek, byline line, `.spoiler-line` |
| `.toc` | boxed, hover fill, sticky bar on phones | unboxed list, 01 numerals, sticky in the left margin ≥64rem, collapsible "On this page +" on phones |
| `.key-answer` | tinted box + bar | `.answer`: hairlines, caps label, serif sentence |
| `.prose h2` | Anton caps + accent bar | serif 600 sentence case, hairline above, `01` counter above |
| `.prose a` | cyan | orange, underlined at rest in a 55% tint (hover = full) |
| `.spoiler`, `.faq` | boxed | two hairlines, "+/-" |
| `.table` | boxed, tinted header | hairline rows, caps muted header |
| `.site-footer` | notched grid | `bg-1`, hairline legal block, plain columns |

**Pagefind / search page** (no mockup; recipe for `50-pagefind.css`): `--pagefind-ui-primary: var(--accent); --pagefind-ui-background: transparent; --pagefind-ui-border: var(--line-2); --pagefind-ui-border-radius: 0; --pagefind-ui-tag: transparent;` then hide `.pagefind-ui__result-tags` (the "Updated" pill; the date can go in the result as plain text via a `data-pagefind-meta`), drop the filter panel border (hairline top rule per filter group), `.pagefind-ui__result-title` in the serif at `--fs-500`, `mark` = accent colour + underline (not yellow), `.pagefind-ui__result-nested::before` marker glyph `content: none`. Search H1 in the display serif. Verify in browser; pagefind UI class names are version-specific.

---

## 4. Template changes for Lead Engineer

No git or `src/` edits were made. In priority order:

1. **`lib/css.js`**: kit lists become `KIT_BEFORE = ["fonts-v3.css","tokens-v3.css"]`, `KIT_AFTER = ["components-v3.css"]`; remove `02-categories.css` from `FILES`; copy `design/fonts/Newsreader-Variable.woff2` into `assets/fonts` (the existing font-copy step in `eleventy.after`), delete `Anton-Regular.woff2`. `assets.preloadFonts` → preload `Newsreader-Variable.woff2` and `Inter-Variable.woff2` only.
2. **`partials/header.njk`**: drop logo img, `site-header__brand` becomes `<a class="wordmark">Leonida <span>Guides</span></a>`; nav = `library.navCategories | take(6)` (Launch hub, Missions, Money, Collectibles, Cars, Fixes; needs `short` labels, "Glitches" shown as "Fixes"); remove `.btn--cta` "Unlock time", search dropdown + `svg`s, hamburger; add `.site-header__tools` ("Search" link to `/search/`, `button.textbtn[data-spoilers]`) and the `<details class="menu">` duplicate for phones (markup in `mockup-home-v3.html`). Remove the `<noscript>` block in base.njk (menu and search no longer need JS).
3. **`partials/ticker.njk`**: delete file and its `{% include %}` in `layouts/base.njk`.
4. **`layouts/base.njk`**: `.disclaimer-bar` → `.disclaimer` (same text); `theme-color` `#0b0b0f`.
5. **`partials/macros.njk`**: delete `badge`, `spoilerBadge`, `clock`, `catIcon`. New `guideCard(g)` = `<li class="grid__item"><a class="card" href=...><img class="card__img" ...><span class="card__body"><span class="meta"><span>{{cat}}</span><span>{{date}}</span><span>{{min}} min</span></span><h3 class="card__title">{{title}}</h3></span></a></li>`, dropping the stretched inner link pattern (the whole card is the link). New `metaLine(g)` helper = `.meta` with the category as a link where it is not already inside a link. New `spoilerLine(level, label)` returns `<p class="spoiler-line spoiler-line--{level}"><strong>…</strong> <span>…</span></p>` (wording: none → "Spoilers: none." + "Safe to read before you play."; minor → "Minor spoilers." + one-line scope; major → "Major spoilers." + same, with `--major`). In list/row contexts print a plain `<span>Minor spoilers</span>` only when level ≠ none.
6. **`index.njk`**: replace the hero grid, wire, trending, quick-access, popular, filter chips, marquee and promo with the structure in `mockup-home-v3.html`: `.intro` (keep the H1 text verbatim), `a.lead` for `library.latest[0]`, `ul.grid` for items 2-5, `section 01 Latest guides` as `ol.rows` for items 6-17 plus an "All guides" link to the Launch Hub (the other ~17 stop being on the home page; the hub already lists everything), `section 02 Browse by topic` as `ul.index` from `library.navCategories` (counts, or "Soon"). The promo becomes a single `.intro__link`-style link or is dropped. The lead image is the existing LCP hero (`hero-768/1280.webp`; keep `fetchpriority=high`). Home gets one gradient (the scrim).
7. **`guide.njk`**: head = `.meta` (category link, "Updated {{date}}", "{{min}} min"), H1, `.article-head__dek`, `.byline` (author + AI-disclosure sentence + "How we work" in one paragraph), `spoilerLine`. Remove the tag row, official/rumour/placeholder/draft badges (rumour/placeholder become a `.spoiler-line`-styled note, wording unchanged), avatar, `read-progress`. Optional `figure.article-figure` under the head when the guide has an image (guides have no hero today; this is optional). Layout wrapper `.container--read`, `.article-layout` with `details.toc` left and `.article-layout__main` right; remove `guide-layout__aside` and move related guides to a final `section` with `ol.rows` ("More in {{category}}"). `key-answer` → `.answer`. Sources: `li > span (kind label) + span (link — publisher)`. FAQ unchanged except classes. ToC open state: ui.js keeps "open ≥64rem, closed below" (the mockup does it inline).
8. **`category.njk`**: header = breadcrumbs, H1 (serif), one-line dek, one `.meta` line ("23 guides · Last updated 18 Nov 2026"); remove the hub header image + title square; drop the "Latest updates" wire block (it duplicates the grid); list = `ul.grid` for the first 4, `ol.rows` for the rest (or all `.rows` for hubs with more than 12); "Explore other hubs" → `ul.index`; empty hub keeps `.empty` copy as plain text.
9. **`search.njk`**: drop `.page-header__kicker` if present; H1 serif; pagefind recipe from §3.
10. **`footer.njk`**: classes → `.site-footer__grid` / `__cols` / `__legal`, wordmark as text; disclaimer text unchanged and verbatim.
11. **`src/js/ui.js`** (3.4 KB min → ~1 KB): delete menu/search dropdown, card filters, read-progress, ticker pause; keep spoiler toggle (rewrite to set text + `aria-pressed`, same `lg-spoilers` key), ToC scroll-spy (`aria-current="true"` on `.toc a`), ToC open/close on resize. `checklist.js`, `x-embed.js`, `search.js` unchanged.
12. **OG + brand**: `og-template.svg` title font Anton → Newsreader (use `design/fonts/Newsreader-SemiBold-static.ttf` in resvg `fontFiles`; headline sentence case, off-white on `#0b0b0f`, orange wordmark word, no gradient). Replace `logo/wordmark-horizontal.svg` and `wordmark-stacked.svg` (still Syne) with `logo/wordmark-v3.svg`. Delete `design/src/SpaceMono-Regular.ttf` leftover. Favicon / apple-touch / manifest icons still carry the pink-cyan artwork: regenerate later in orange/off-white (not part of this pass, no page shows them large).
13. **Content (Copywriter)**: replace ✅ ⚠️ 🔶 in guide tables/keys with words; avoid decorative emoji in markdown.

Kept from v2: heading hierarchy, `data-pagefind-*` attributes, the `lg-spoilers` localStorage key and the "nothing hidden in meta/OG/feed/cards/search" spoiler rules, breadcrumb JSON-LD, the "not affiliated with Rockstar Games" disclaimer (top bar and footer, verbatim).

---

## 5. Before / after counts

Measured with the same script on the live pages (`audit-live.json`) and the mockups (`audit-v3.json`), 1440 and 390 px. The mockups hold less repeating content than the live pages (the home mockup lists 1 lead + 4 grid + 8 list rows; live lists 34 cards), so the **per-component** rows are the fair comparison; page totals are shown for scale only.

| Measure | v2 live | v3 mockup |
|---|---|---|
| Pills / chips / badges / tags on home (1440) | 75 badges+chips (+1 switch, 5 buttons) | **0** |
| Same on a guide page | 6 badges + 4 chips + 17 source tags = 27 | **0** |
| Same on a hub page | 23 badges + 30 chips | **0** |
| Elements with `border-radius ≥ 99px` (home / guide) | 11 / 19 | **0 / 0** |
| Elements with `clip-path` (home / hub, 1440) | 88 / 53 | **0** |
| Elements with a gradient background (home / guide) | 11 / 4 | **1 / 0** (the lead scrim) |
| Inline SVG icons (home / guide) | 11 / 3 | **0 / 0** |
| Ticker + marquee (nodes) | 47 + 18 | **0** |
| Chromatic hues in chrome on home | 6 (pink, cyan, green, orange, blue, violet) | **1** (orange) |
| Animated elements | ticker, marquee, live dot | **0** |
| Buttons on home | 5 (3 gradient) | **0** (1 text link) |
| One guide card (nodes) | 15 | **9** |
| Hero + wire + category tiles (nodes) | 64 + 53 | intro 5 + lead 11 + index 25 |
| Article head (nodes) | 30 | **13** |
| Sidebar / related (nodes) | 46 boxed with 3 images | **17** unboxed text rows (at the foot) |
| Sources block (nodes) | 56 | **17** |
| Header (nodes) | 47 | 41 (includes the duplicate phone menu) |
| Page totals, home desktop (DOM / rendered) | 795 / 749 | 227 / 206 |
| Page totals, guide desktop | 611 / 592 | 239 / 218 |
| CSS (source / minified / brotli, kit + fonts + tokens) | kit source 69 KB components + 7.5 KB tokens; whole live bundle (kit + site + pagefind CSS) 75.9 KB min / 12.7 KB br | kit source 18.8 KB components + 3.4 KB tokens + fonts-v3; kit min 16.7 KB / **3.6 KB br** (70-site.css and pagefind CSS still to be slimmed on top) |
| Font files | Anton 18 KB + Inter 31 KB | Newsreader 39 KB + Inter 31 KB |
| `ui.js` | 3.4 KB min (live) | not needed by the mockups; ~1 KB target |

**Lighthouse mobile (production-like: minified CSS, brotli, immutable cache; `src/lighthouse-v3.mjs`)**: home 100/100/100/100 (LCP 1.8 s, CLS 0), guide 100/100/100/100 (LCP 1.5 s, CLS 0). Logged in `screenshots/.lighthouse-v3-last.txt`. The live site's own numbers (home 97, guide 96) should rise after the swap: no Anton preload, no ticker, far fewer nodes. The live site adds pagefind and analytics, so confirm after shipping.

---

## 6. Screenshots

- Mockups (new): `design/screenshots/v3-home-desktop.png`, `v3-home-mobile.png`, `v3-guide-desktop.png`, `v3-guide-mobile.png` (full page; `-fold` variants show the first screen), plus `v3-menu-mobile.png` (menu open) and `v3-spoiler-mobile.png` (spoiler block open).
- Live audit (v2, for comparison): `review/strip/live-{home,guide,hub,hub-empty,search}-{mobile,desktop}.png`, `live-guide2-checklist-{mobile,desktop}.png`.
- Ref studies: `design/refs-v2/`.

## 7. Open points for the owner

1. Neutral grey-black instead of indigo-black (reversible, 7 values).
2. Orange accent. Cyan is the fallback if orange feels too warm against the sunset art; swap one token.
3. Sentence-case serif headlines (no all-caps Anton). The old look is one token (`--font-display`) away but would need Anton back.
4. Home shows 13 stories, not 34; the full list is on the Launch Hub. Say if the home should stay a long page.
5. Status colours are gone: rumour/unconfirmed is carried by wording and a rule, not yellow.
