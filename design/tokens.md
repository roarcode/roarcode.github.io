# Tokens — Leonida Guides

Source of truth: **`tokens.css`** (`:root` custom properties). `tokens.json` is generated from it (`python src/build_tokens_json.py`) for build-time use (OG, etc.). Unofficial fan site — not affiliated with Rockstar Games.

## Name (change in one place)
Working name: **Leonida Guides** (wordmark `LEONIDA` + `GUIDES`). "GTA" is deliberately not in the wordmark.
Alternatives: **VI Guides** · **Neon Coast Guides** · **Sunstate Guides**.
To rename: edit `brand.json` (`main`, `sub`, `name`), then run `src/build_all.sh` (logos, favicons, manifest, OG templates + `og-default.png`, mockups). The header/footer/title text in the mockups also comes from `src/build_pages.py`.
(Check availability/trademark of the final name before buying a domain; "Leonida" is a fictional place name used in official marketing, not a registered brand of ours.)

## Palette
| Role | Token | Hex |
|---|---|---|
| Page | `--bg-0` | `#06050D` |
| Header/footer | `--bg-1` | `#0C0A1A` |
| Cards/panels | `--bg-2` | `#141030` |
| Hover/raised | `--bg-3` | `#1D1745` |
| Borders | `--line-1/2/3` | `#2A2446` `#3B3462` `#54497F` |
| Text primary | `--text-1` | `#F4F1FA` |
| Text secondary | `--text-2` | `#C4BDDA` |
| Text meta | `--text-3` | `#9189AE` |
| Hot pink | `--brand-pink` | `#FF2E93` |
| Cyan | `--brand-cyan` | `#19E3F5` |
| Sunset orange | `--brand-orange` | `#FF8A3D` |
| Sun yellow | `--brand-yellow` | `#FFC857` |
| Violet | `--brand-violet` | `#8B5CF6` |

### Category accents (`--accent-*`; theme any block with `.cat-<name>`)
| Category | Token | Hex | Contrast on `--bg-2` |
|---|---|---|---|
| Missions | `--accent-missions` | `#FF4FA3` | 6.0 |
| Money | `--accent-money` | `#4ADE80` | 10.5 |
| Collectibles | `--accent-collectibles` | `#C084FC` | 6.9 |
| Vehicles | `--accent-vehicles` | `#4DA3FF` | 7.0 |
| Weapons | `--accent-weapons` | `#FF6B3D` | 6.5 |
| Glitches & fixes | `--accent-glitches` | `#FACC15` | 12.0 |
| Beginner tips | `--accent-beginner` | `#5EEAD4` | 12.4 |
| PS5 settings | `--accent-ps5` | `#A5B4FC` | 9.2 |
Status: `--status-official` cyan `#19E3F5`, `--status-rumour` amber `#FFC857` (dashed border), `--status-updated` green `#4ADE80`, `--status-danger` `#FF6B6B`.
**Never use colour alone**: every chip/badge also has a text label (and badges an icon).

## Contrast (WCAG 2.2 AA, measured for v2)
- `--text-1` on `--bg-0…3`: 14.9–18.2:1 (AAA). `--text-2`: 9.2–11.2:1 (AAA). `--text-3`: 5.1–6.2:1 (AA) — meta only, never below 12px.
- Article body = `--text-2` on `--bg-0` (11.2:1). Links = cyan `#19E3F5` on `--bg-0` (12.9:1).
- Category accent text on `--bg-2`: missions 6.0 · money 10.5 · collectibles 6.9 · vehicles 7.0 · weapons 6.5 · glitches 12.0 · beginner 12.4 · ps5 9.2 · brand pink 5.3 (all ≥ 4.5).
- Dark text (`--text-on-accent` `#06050D`) on accent fills (chips, CTA, rank tags): 5.9 (pink) – 13.7. CTA gradient pink→orange: ≥ 5.9:1 at both ends.
- Hero/tile text sits on a dark scrim (≥ .74 black behind text blocks); axe cannot measure text over images, so scrim values were checked by eye on the screenshots.
- Focus ring: 2px cyan outline, 3px offset, on every interactive element. Touch targets ≥ 44px (icon buttons, CTA, filter chips ≥ 40px).

## Typography (all OFL — see `fonts/LICENSES.md`)
| Role | Font | Weights | Token |
|---|---|---|---|
| Display / headlines / wordmark / rank numbers | **Anton** (OFL 1.1) — ALL CAPS | 400 only | `--font-display` |
| UI + body + labels | **Inter** variable (OFL 1.1), opsz pinned to 14 | 400–800 | `--font-body` (`--font-mono` is an alias) |
Two files, ≈ 49 KB total (`fonts/Anton-Regular.woff2` 18 KB, `fonts/Inter-Variable.woff2` 31 KB), subset to Basic Latin + Latin-1 + **Latin Extended-A (č š ž ć đ)**. Preload **only** Anton. `Anton Fallback` (size-adjusted Impact/Arial Narrow) prevents layout shift. Labels = Inter 800 uppercase tabular-nums (replaces Space Mono). Headings are `text-transform: uppercase`; never request bold Anton (`--fw-display` = 400).
Scale (fluid): `--fs-100` 12 · `-200` 13 · `-300` 15 · `-400` 17 (article body) · `-500` 19–22 · `-600` 22–28 · `-700` 28–40 (H2) · `-800` 38–64 (H1) · `-900` 44–92. Line heights `--lh-tight 1.1`, `-snug 1.25`, `-normal 1.5`, `-prose 1.7`. Max prose width `--measure: 68ch`.

## Spacing, radii, shadows
4 px base: `--space-1…10` = 4 8 12 16 24 32 48 64 96 112 px. Section rhythm `--space-section` (40→72 px). Gutter `--gutter` (16→32 px). Container `--container: 80rem`.
Radii: `--radius-xs/sm/md/lg/pill` = 3 / 6 / 10 / 14 / 999. Shape tokens: `--clip-slant` (chips), `--clip-notch`, `--clip-notch-sm` (hero, tiles, promo), `--clip-cut-bottom` (card media) — clip-path clips box-shadow, so hover glows sit on unclipped wrappers (`.guide-card`, `.tile-row__item`).
Shadows: `--shadow-1/2` (translucent only), glows `--glow-pink`, `--glow-cyan`, `--glow-accent`, `--glow-hover` (follow `--accent`). CTA gradient `--gradient-cta` (orange→pink).
Motion: `--dur-fast 150ms`, `--dur 220ms`, `--dur-slow 500ms`, `--ease`. Everything animated is disabled under `prefers-reduced-motion`.

## Breakpoints (mobile-first, `min-width`)
`30rem` (480) · `40rem` (640, 2-col grids) · `48rem` (768, hero lede, 4-col tiles) · `64rem` (1024, inline nav, sticky ToC + sidebar) · `80rem` (1280). `--bp-*` vars are documentation only (CSS can't use vars in `@media`).

## Design decisions from the reference study
See `inspiration.md`. In short: Vercel-style tiered surfaces/text tokens, Geist-like named type scale, Game8/IGN ToC-first guide pages with an "updated" stamp, Fextralife = what we avoid (≤ 1 ad above the fold, reserved ad heights, no sticky mobile ads), Awwwards neon palettes but with real AA contrast.
