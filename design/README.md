# Leonida Guides — design kit

Unofficial fan site — not affiliated with Rockstar Games. Working name **Leonida Guides** (alternatives in `tokens.md`).
Stack target: Eleventy + plain CSS custom properties, mobile-first, dark-only, no JS framework, ~5 KB (min) of enhancement script.

## Originality & licensing
- Art direction is original: night-neon (pink / cyan / sunset orange) on near-black with a sunset-gradient feel. No Rockstar logos, GTA VI logo, fonts (Pricedown or look-alikes), official/ripped art, characters, or competitor design.
- **Hero, category headers and the OG background are AI-generated originals** (`art/*-raw.jpg`, exported to `img/`). They contain no Rockstar assets, logos or characters. A CSS-only fallback hero (`.hero__art`) shows if the image is slow or blocked.
- Fonts are free OFL fonts: Anton (display) and Inter (body) (`fonts/LICENSES.md`). Nothing paid, nothing bought.
- Mockup copy is generic placeholder text only (no story, mission, character or secret content).
- Every visible brand surface carries "Unofficial fan site — not affiliated with Rockstar Games": disclaimer bar (every page), hero note, footer, OG images.

## Files
| Path | What |
|---|---|
| `tokens.css` | **Source of truth.** `:root` vars: colours, category accents (`--accent-missions`…), type scale, spacing, radii, glows, breakpoints, motion. |
| `tokens.json`, `brand.json` | Generated tokens for build-time use; `brand.json` holds name/tagline/disclaimer for regeneration. |
| `tokens.md` | Palette, fonts + licences, contrast numbers, name + alternatives. |
| `fonts.css`, `fonts/` | Self-hosted woff2, Latin + Latin Extended-A (č š ž): `Anton-Regular` 18 KB, `Inter-Variable` 31 KB. `*-static.ttf` for the OG renderer (still Syne — see UPGRADE.md). `fonts/legacy/` = retired fonts. |
| `components.css` | All components (BEM). `components.md` = copy-paste HTML per component. |
| `ui.js` | Menu, search dropdown, spoiler switch, card filters, ToC collapse + scroll-spy, read-progress, checklist trackers, gallery lightbox, ticker pause. Demo hash states `#demo-menu`, `#demo-search`. |
| `mockup-home.html`, `mockup-guide.html`, `mockup-collectibles.html`, `mockup-hub.html`, `mockup-search.html` | Static mockups (v2 "Dusk Wire" redesign; open directly in a browser). Guide page = byline + ToC + steps + spoiler blocks + sources. |
| `UPGRADE.md` | **Hand-off for Lead Engineer**: class renames, template mapping, front matter, priority order. |
| `legacy/` | v1 CSS/JS/tokens (reference only). |
| `src/build_pages.py`, `build_crops.py`, `test_redesign.mjs`, `lighthouse.mjs`, `shoot_redesign*.mjs` | Mockup generator, art crops, 61 checks (axe, a11y, layout, JS), production-like mobile Lighthouse, screenshots. |
| `screenshots/` | `mockup-*-mobile.png` (390 px @2x) and `-desktop.png` (1280 px); plus `mockup-home-search-*` / `-menu-mobile`. |
| `logo/` | `wordmark-horizontal.svg`, `wordmark-stacked.svg`, `icon.svg` (square), `monogram-sun.svg` (no tile). Text is outlined. |
| `favicon.svg`, `favicon.ico`, `favicon-32.png`, `apple-touch-icon-180.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest` | Favicon set (root of `design/`; copy to site root). |
| `og/` | `og-default.png` (1200×630), `og-default.svg`, `og-template.svg`, `og-template-2line.svg`, samples. |
| `img/` | Optimised hero (768/1280/1920) and category (640/1280) AVIF + WebP, each < 150 KB; `lqip.json` = dominant colour + 24-px blurred placeholder. |
| `art/` | Raw AI source images. |
| `article-assets/` | Step callouts, map pins, controller glyphs, diagram templates, contact sheet — see its README. |
| `inspiration.md`, `images.md` | Reference study and image style guide. |
| `src/` | Build scripts. `src/build_all.sh` regenerates everything. |

## `<head>` for Lead Engineer
```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="apple-touch-icon" href="/apple-touch-icon-180.png"><link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#07060c">
<meta property="og:image" content="https://SITE/og/og-default.png"> <!-- per guide: /og/<slug>.png -->
```

## Per-guide OG images
`og/og-template.svg` has one `<text>` node with the literal `{{title}}` (and `{{category}}`); the 2-line variant has `{{title_line1}}`/`{{title_line2}}`. Disclaimer, wordmark and the AI background are baked in (self-contained SVG, ~160 KB).
```js
import { renderOg } from './src/render_og.mjs';      // npm i @resvg/resvg-js
fs.writeFileSync(`_site/og/${slug}.png`, renderOg({ title: guide.title, category: guide.category }));
```
`renderOg` picks the 1-line template for titles ≤ 22 characters, otherwise wraps to two lines (≤ 28 chars each, ellipsis). Or do it yourself: `svg.replace('{{title}}', escapeXml(title))` → `new Resvg(svg,{font:{fontFiles:['fonts/Syne-ExtraBold-static.ttf','fonts/Inter-SemiBold-static.ttf'],loadSystemFonts:false}}).render().asPng()`. Escape `& < >`. With sharp: `sharp(Buffer.from(svg))` works only if the fonts are installed system-wide, so resvg is preferred.

## Performance notes
Hero is the only eager image (`fetchpriority="high"`, AVIF/WebP `srcset` 768/1280/1920); everything else `loading="lazy"` with width/height. Header/footer SVG logos < 12 KB. No web-font beyond 4 files, `font-display: swap`. No JS dependencies; motion is CSS only and disabled under `prefers-reduced-motion`; hero image hidden under `prefers-reduced-data`.

## Regenerate
`npm i` (resvg + playwright-core; uses system `google-chrome`), Python venv with `fonttools cairosvg pillow brotli`, then `PY=.venv/bin/python bash src/build_all.sh`.
