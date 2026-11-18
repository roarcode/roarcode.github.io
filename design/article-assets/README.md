# Article asset kit

Original SVG, drawn from the design tokens. Text is converted to outlines (no font needed) except the `{{placeholders}}` in `diagrams/`. No Rockstar/Sony/Microsoft logos, wordmarks or characters. Controller glyphs are **generic**: monochrome with a single cyan accent ring (no colour-coded face buttons). Preview: `index.html` (screenshot `contact-sheet.png`). CSS: `../components.css` §16.

All paths are relative to `design/article-assets/` (copy the folder to e.g. `/assets/article/`).

| Folder | Files | Notes |
|---|---|---|
| `steps/` | `step-01.svg … step-20.svg` (ring) and `step-NN-solid.svg` (sunset fill) | 96×96. Use the ring on dark panels, solid on photos. For 21+ or inline text use the CSS `.step-badge`. |
| `pins/` | `pin-missions|money|collect|vehicle|weapon|danger|start|finish.svg`, `pin-number-01…10.svg`, `legend-<kind>.svg`, `legend-sheet.svg` | 48×68, anchor = bottom-centre tip. Colours = category accents. |
| `buttons/` | PS-style: `ps-triangle|circle|cross|square`, `ps-l1 l2 l3 r1 r2 r3`, `ps-options`, `ps-touchpad`. Xbox-style: `xbox-a b x y`, `xbox-lb lt ls rb rt rs`, `xbox-menu`, `xbox-view`. Shared: `dpad`, `dpad-up|down|left|right`, `stick-left`, `stick-right`, `stick-left-rotate`, `stick-right-rotate` | 64×64 (pills 88×44). Always give the `<img>` an `alt` ("R2", "Cross", "A"). |
| `diagrams/` | `route-arrow`, `before-after`, `flowchart`, `timer-cooldown`, `do-dont` `.svg` | 1200×675 templates with `{{placeholders}}` (see below). |
| `png/` | `png/<folder>/*.png` (2× for icons) and `png/diagrams/*.png|.webp` sample renders | Fallbacks for emails/social/RSS. Diagram samples are filled with dummy text. |

## Usage snippets
```html
<!-- steps -->
<img src="/assets/article/steps/step-03.svg" width="48" height="48" alt="Step 3">
<span class="step-badge">3</span>  <span class="step-badge step-badge--solid step-badge--lg">12</span>

<!-- inline controller prompts (text version is preferred for accessibility + SEO) -->
Hold <kbd class="kbd-btn">R2</kbd>, press <kbd class="kbd-btn kbd-btn--round">A</kbd>, or on PC <kbd class="kbd-btn kbd-btn--key">E</kbd>.
<!-- icon version -->
Hold <img class="kbd-icon" src="/assets/article/buttons/ps-r2.svg" alt="R2"> then <img class="kbd-icon" src="/assets/article/buttons/ps-cross.svg" alt="Cross">

<!-- map pins + legend -->
<img class="pin-inline" src="/assets/article/pins/pin-number-02.svg" alt="Location 2">
<ul class="legend"><li class="legend-item cat-money">Money</li><li class="legend-item legend-item--danger">Danger</li></ul>

<!-- diagram figure -->
<figure class="figure"><img src="/assets/article/png/diagrams/flowchart.webp" width="1200" height="675" loading="lazy" alt="Flow chart: …"><figcaption class="figure__caption">Caption. Credit: …</figcaption></figure>
```

## Diagrams: filling the templates
Each template is a standalone SVG with `{{placeholder}}` tokens inside `<text>`; string-replace (XML-escape values) then either inline it in the page (inherits Inter/Syne from the page) or render with resvg using `fonts/Syne-ExtraBold-static.ttf` + `fonts/Inter-SemiBold-static.ttf`:

| Template | Placeholders |
|---|---|
| `route-arrow.svg` | `title`, `caption` (waypoints 1–3 are fixed; edit the path `d` for real routes) |
| `before-after.svg` | `title`, `before_caption`, `after_caption`, `credit` (swap the mountain shapes for `<image>` screenshots) |
| `flowchart.svg` | `title`, `start`, `question`, `yes_action`, `no_action` |
| `timer-cooldown.svg` | `title`, `time`, `unit`, `event`, `note`, `max` (ring = 70 %; change the arc end point for other values) |
| `do-dont.svg` | `title`, `do_1…3`, `dont_1…3` |

```js
import { Resvg } from '@resvg/resvg-js'; import fs from 'node:fs';
const svg = fs.readFileSync('diagrams/flowchart.svg','utf8').replace('{{title}}','Should you retry?').replace('{{start}}','Start') /* … */;
const png = new Resvg(svg,{font:{fontFiles:['../fonts/Syne-ExtraBold-static.ttf','../fonts/Inter-SemiBold-static.ttf'],loadSystemFonts:false},fitTo:{mode:'width',value:1200}}).render().asPng();
```
For simple lists inside text, prefer the live HTML `.do-dont` component (components.md §Do/Don't) — it's accessible and selectable.

## Regenerate
`python src/build_article_assets.py && node src/render_article_png.mjs && python src/optimise_png.py` (from `design/`).
