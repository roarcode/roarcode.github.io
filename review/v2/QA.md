# Live QA — redesign v2 (commit 468d975, https://roarcode.github.io/)

Checked with headless Chrome at 360, 390, 768, 1280, 1440 and 1600 CSS pixels. Guide page used: `/launch-hub/release-time/` (spoiler-free). Raw metrics: `qa-raw.json`.

## Items 1–8

### 1. Home H1 is the site-level SEO line — PASS
The home `<h1 class="hero-feature__title" id="hero-title">` is “Every GTA VI guide, sourced and kept current.” It is not a featured-guide title. Same at every width. Shot: `home-1280.png`, `home-360.png`.

### 2. Spoiler switch is icon-only below 90rem, with an accessible label — PASS
- 1280 and 1439: `.spoiler-toggle__label` is clipped (`position:absolute`, 1×1px). Control is a 58×44 icon switch. Shot: `spoiler-1280.png`.
- 1440 and 1600 (90rem+): label “SHOW ALL SPOILERS” is visible, control grows to 208×44. Shot: `spoiler-1440.png`.
- Accessible name is present at every width: visually-hidden `.spoiler-toggle__label` text “Show all spoilers”, plus `title="Show all spoilers"`, `role="switch"`, `aria-checked`.
- Nit (not a fail): the also-hidden `.spoiler-toggle__state` (“Off”/“On”) is in the accessibility tree, so the computed name is “Show all spoilers Off”. `aria-checked` already exposes state. Fix if you want a cleaner name: add `aria-hidden="true"` to `.spoiler-toggle__state` in `partials/header.njk`.

### 3. Card art rotates through the 8 crops by slug hash — PASS
All eight `design/img/crop-*` files appear on the home page: water(7), boat(6), cash(5), window(4), skyline(4), car(3), palms(3), map(2). The All Guides grid shows clearly different art per card. Shot: `home-1280-all-guides.png`.

### 4. Trending and Popular are hidden, no empty gaps — PASS
No `.trending` / `.popular` nodes in the DOM. After the hero + ranked “Latest updates” wire, the next sections are “Guides by category” and “All guides”. No empty band. Shot: `home-1280.png`, `home-360.png`.

### 5. Guide pages have no hero image — PASS
No `.hero`, `.hero-feature`, `.article-hero` or similar on the guide page. The first content images are in-article figures, below the byline. Shot: `guide-1280.png`, `guide-390.png`.

### 6. Mobile ToC is a sticky compact bar that works — PASS, with one required fix
- Closed bar is 48px, labelled “ON THIS PAGE”, full-bleed, chevron. Shot: `guide-390-toc-element-closed.png` and the bottom of `guide-390.png`.
- It is `position: sticky; top: 56px` (under the 56–57px header). After scrolling it stays at `top: 56`, height 48. Shot: `guide-390-toc-stuck-viewport.png`.
- Opens (8 links). Shot: `guide-390-toc-element-open.png`.
- Links do jump, and when the bar is **closed** the heading lands clear of it (`headingTop: 144`, bar bottom 104; `.prose h2` has `scroll-margin-top: calc(var(--header-h) + 1rem)`).
- **Required fix:** the `<details class="toc">` stays open after a tap, so the 339px panel covers the heading (heading at 144px, open panel occupies 56–395). Shot: `guide-390-toc-after-jump.png`. Close the details on in-page clicks, mobile only. In `src/js/ui.js`, after the ToC scroll-spy setup:

```js
$$('.toc a[href^="#"]').forEach((a) => {
  a.addEventListener('click', () => {
    if (matchMedia('(max-width: 63.99rem)').matches) {
      a.closest('details.toc')?.removeAttribute('open');
    }
  });
});
```

### 7. OG wordmark tracking in Anton — PASS for LEONIDA, FAIL for GUIDES
Fetched live `og/default.jpg`, `og/launch-hub-release-time.jpg`, `og/launch-hub-is-gta-6-out.jpg`, `og/launch-hub-editions-prices.jpg`. Crops: `og-default-wordmark.png`, `og-release-time-wordmark.png` (and matching `-letters.png`).

- “LEONIDA” is Anton, tracking looks right (letter gaps ~5px on ~25px-wide caps).
- “GUIDES” underneath is still the old Inter-style wide tracking (~29–30px gaps on ~8–9px letters, about `0.42em`). On Anton that looks sparse and disconnected from the word above.

**Fix:** rebuild the OG template’s GUIDES path with Anton tracking of `0.08` (or `0.035` to match the header) and optionally bump the size slightly so it still sits under LEONIDA. The new header-style lockups in `design/logo/` are the target look. `design/src/build_assets.py` still writes this lockup with `text_path(INTER, sub, 20, …, 0.42)` — point that at Anton and drop the track.

### 8. At 360px: logo icon hidden, CTA wraps, no horizontal overflow — PASS
- `.site-header__logo { display: none }` at `max-width: 22.5rem`. Hidden at 360, visible (26px) at 390. Shot: `home-360-header.png` vs `home-390` header.
- The header pill CTA (`.site-header__cta`, “Unlock time”) is `display: none` below `75rem` (1200px) by design, so it does not wrap in the 360 header. The hero CTAs do wrap cleanly: `.hero-feature__actions { flex-wrap: wrap }` and `.hero-feature__actions .btn { white-space: normal }`. Shot: `home-360.png`.
- `document.scrollWidth === 360` on home and the guide. Ticker/marquee tracks are supposed to overflow. Guide tables live in `.table-wrap { overflow-x: auto }` with `.table { min-width: 28rem }` (and `min-width: 0` below 39.99rem), so they scroll inside the wrap and do not widen the page.

## Other regressions vs the mockups

No broken fonts (Anton + Inter both `document.fonts` status `loaded`), no raw TODO / `image:slug` text, no missing images (`naturalWidth > 0` on every content img).

1. **Mobile ToC stays open on jump** — see item 6. Selector: `.toc a[href^="#"]`. JS fix above.
2. **OG “GUIDES” tracking too open** — see item 7.
3. **Spoiler accessible name includes “Off”** — optional, see item 2.
4. **Home section kickers can tuck under the sticky header** when an in-page scroll aligns “All guides” to the top (`NEWEST FIRST` is clipped in `home-1280-all-guides.png`). If you want a polish pass: `.section { scroll-margin-top: calc(var(--header-h) + 0.5rem); }`.

## Wordmarks (Task B)

Rebuilt in Anton, all caps, letter-spacing `0.035em` (same as `.site-header__wordmark`). “LEONIDA” is `#F4F1FA`, “GUIDES” uses the sunset gradient. Text is outlined (fontTools `SVGPathPen` + `design/fonts/Anton-Regular-static.ttf`); SVGs do not depend on fonts. The sun+L icon is reused from `logo/icon.svg`. Anton is narrower, so viewBoxes shrank rather than leaving empty space:

| File | New | Was |
| --- | --- | --- |
| `design/logo/wordmark-horizontal.svg` | 595×132, one line (header lockup) | 869×132, Syne + Inter tagline |
| `design/logo/wordmark-stacked.svg` | 338×296 | 719×318 |
| Previews | `design/logo/wordmark-horizontal.png`, `design/logo/wordmark-stacked.png` | |

Builder: `design/src/build_wordmarks.py`. Backups also copied to `/workspace/gta6-design-work/design/logo/`. Comparison of the old Syne lockups: `review/v2/wordmark-*-syne-old.png`. Nothing committed or pushed; Lead Engineer owns git.

## SpaceMono

**Deleted** `design/src/SpaceMono-Regular.ttf` (unused leftover). `rg` only found `SpaceMono-Regular.ttf` used by `design/pipeline/lib.mjs`, which loads it from `design/pipeline/fonts/` (and `/workspace/gta6-design-work/fonts/`). That copy was left in place.
