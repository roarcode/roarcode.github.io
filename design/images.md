# Image style guide (short)

**Sources, in order of preference**
1. Original graphics we make: step cards, annotated maps, diagrams, comparison tables → `article-assets/` + `img/`. Spoiler-free by construction.
2. Credited screenshots players posted publicly (with permission/licence noted) or official press screenshots with credit. Keep few and small (≤ 1280 px wide, WebP/AVIF ≤ 150 KB). Always add a visible credit line (`.figure__caption`) and a link to the source.
3. Never: Rockstar logos, leaked or story/mission/ending/character imagery, anything revealing a spoiler, ripped textures, competitor graphics.

**Spoiler rule** — if a frame shows story, a late-game area, a character reveal or a mission outcome, don't use it. When in doubt, use a diagram.

**Look** — dark `--bg-2` frame, 1px `--line-1` border, `--radius-lg`, neon accents from the category (`--accent-*`). Max 2 accent colours per image. Annotation = numbered pins (`pins/pin-number-NN.svg`), step badges (`steps/`), route arrows (`diagrams/route-arrow.svg`). Text in images ≥ 24 px at 1200 px width, `--text-1` on dark; never put essential text only in an image — repeat it in the caption/alt.

**Slots** — Copywriter marks `image:<slug>-step-N` + a note. Pick the closest asset: map → route-arrow / pins; compare → before-after; decision → flowchart; timing → timer-cooldown; rules → do-dont; steps → `.step-badge` + figure. Export diagrams with `node src/render_article_png.mjs` (fills `{{placeholders}}`; for real text, string-replace the placeholders in the SVG then render with resvg using `fonts/*-static.ttf`).

**Formats** — hero/category art: AVIF + WebP via `<picture>`, `loading="lazy"` (eager + `fetchpriority="high"` for the hero only), always `width`/`height`. Diagrams: SVG inline or PNG/WebP. `alt` describes the information, not the decoration.

**OG per guide** — `og/og-template.svg` / `og-template-2line.svg` (see README). 1200×630, disclaimer baked in.
