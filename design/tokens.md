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
| Page | `--bg-0` | `#07060C` |
| Header/footer | `--bg-1` | `#0D0B16` |
| Cards/panels | `--bg-2` | `#151226` |
| Hover/raised | `--bg-3` | `#1E1A36` |
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

## Contrast (WCAG 2.2 AA, measured)
- `--text-1` on `--bg-0…3`: 15.0–18.1:1 (AAA). `--text-2`: 9.3–11.2:1 (AAA). `--text-3`: 5.1–6.1:1 (AA) — use only for meta ≥ 12px.
- Article body = `--text-2` on `--bg-0` (11.2:1). Links = cyan on `--bg-0` (12.8:1).
- Accent chip text on its 14 % tinted background: min 4.6:1 (pink brand) / 5.0:1 (missions), all others ≥ 5.4:1.
- Primary button: `--text-on-accent` `#07060C` on `#FF2E93` = 5.8:1.
- Hero text sits on the AI image under `--overlay-hero` (≥768px) / `--overlay-hero-mobile`. Measured on the brightest background pixel behind each text block (390 / 768 / 1280 px): kicker ≥ 9.4:1, H1 ≥ 5.5:1, lede ≥ 8.5:1, note ≥ 17:1. The CSS-only fallback art (`.hero__art`) is darker still.
- Focus ring: 2px cyan outline, 3px offset, on every interactive element.

## Typography (all OFL — see `fonts/LICENSES.md`)
| Role | Font | Weights | Token |
|---|---|---|---|
| Display / headings / wordmark | **Syne** (Google Fonts, OFL 1.1) | 700–800 | `--font-display` |
| UI + body | **Inter** (OFL 1.1) | 400–700 | `--font-body` |
| Labels, dates, badges | **Space Mono** (OFL 1.1) | 400/700 | `--font-mono` |
Self-hosted Latin-subset woff2 (≈ 85 KB total, `font-display: swap`, 2 preloads). Syne is very wide: keep H1/H2 short, `text-wrap: balance`.
Scale (fluid): `--fs-100` 12 · `-200` 13 · `-300` 15 · `-400` 17 (article body) · `-500` 19–22 · `-600` 22–28 · `-700` 26–36 · `-800` 30–52 (H1) · `-900` 36–72 (hero). Line heights `--lh-tight 1.1`, `-snug 1.25`, `-normal 1.5`, `-prose 1.7`. Max prose width `--measure: 68ch`.

## Spacing, radii, shadows
4 px base: `--space-1…10` = 4 8 12 16 24 32 48 64 96 112 px. Section rhythm `--space-section` (48→104 px). Gutter `--gutter` (16→32 px). Container `--container: 76rem`.
Radii: `--radius-xs/sm/md/lg/pill` = 4 / 8 / 12 / 18 / 999.
Shadows: `--shadow-1/2` (translucent only), glows `--glow-pink`, `--glow-cyan`, `--glow-accent` (follows `--accent`).
Motion: `--dur-fast 150ms`, `--dur 220ms`, `--dur-slow 500ms`, `--ease`. Everything animated is disabled under `prefers-reduced-motion`.

## Breakpoints (mobile-first, `min-width`)
`30rem` (480) · `40rem` (640, 2-col grids) · `48rem` (768, desktop logo, hero shade) · `64rem` (1024, inline nav, sticky ToC + sidebar) · `80rem` (1280). `--bp-*` vars are documentation only (CSS can't use vars in `@media`).

## Design decisions from the reference study
See `inspiration.md`. In short: Vercel-style tiered surfaces/text tokens, Geist-like named type scale, Game8/IGN ToC-first guide pages with an "updated" stamp, Fextralife = what we avoid (≤ 1 ad above the fold, reserved ad heights, no sticky mobile ads), Awwwards neon palettes but with real AA contrast.
