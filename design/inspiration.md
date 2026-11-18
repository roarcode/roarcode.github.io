# Inspiration / moodboard — Leonida Guides

Studied 18 Nov 2026. "Fetched" = I read the live page text this session; "from experience" = general knowledge of the site's look, not verified this session (the page fetcher returns text, not pixels). Nothing here is copied; these are principles only.

## 1. Mood (look at, don't copy)

### Rockstar — GTA VI site · https://www.rockstargames.com/VI  (mood only)
Fetched: trailer-first page, very little copy: a release-date line, a platform line, edition cards, a gallery section and a short teaser blurb. No dense text anywhere. (No story or character content is recorded here on purpose.)
From experience: saturated sunset pinks/oranges, hazy gradients, sun-bleached 80s Florida nostalgia, big confident whitespace around a few elements.
Takeaways
1. One hero idea per screen. We use one sun + grid + skyline hero, then quickly get functional.
2. Sunset gradient (magenta → orange → yellow) is the signature; neon cyan is the cool counterpoint. Keep the palette to 3 hues plus neutrals.
3. Short copy, big type. Their headings are two to four words — our H1s stay short (under ~8 words).
Do NOT take: logo, fonts, key art, photography, wording, any story content.

## 2. Guide usability (what to do)

### IGN GTA 5 wiki · https://www.ign.com/wikis/grand-theft-auto-5  (fetched)
Structure: byline + "Updated:" timestamp up top, short intro, then themed blocks: Cheats, Interactive Map, 100% Checklist, Walkthrough, Tips, Collectibles, Vehicles (class grid), Weapons.
1. Hub = a table of contents of the whole game. Our homepage + category hubs copy the *information architecture* (not the layout): every major task (missions, money, collectibles, cars) gets a labelled block.
2. Collectibles table with "Amount" and "Related side quest" columns is great scanning; we make a `.table` component with a count column and sticky first column on mobile.
3. Authorship + updated date near the title builds trust → our "Updated" badge + byline sit directly under H1.

### Game8 GTA 6 hub · https://game8.co/games/GTA-6  (fetched)
Structure: "Last updated on" stamp, a "List of Contents" box right after the intro, news first, FAQ table, spec table (price, platforms), account features (interactive map pins saved, checklists).
1. ToC immediately after the intro, before anything else; on mobile it's a collapsed box. We do the same (`<details>` on mobile, sticky sidebar on ≥1024px).
2. A "quick facts" key/value table beats prose for price/platform/edition answers (also good for featured snippets).
3. Checklists/map progress are their retention feature. We leave a hook in the map block (`data-progress`) for later; no accounts at launch.

## 3. What to avoid

### Fextralife wikis · https://eldenring.wiki.fextralife.com/Elden+Ring+Wiki  (fetched text; ad behaviour from experience)
Fetched: very long page-top wall of text (news, release history, requirements, marketing copy) before any navigation by task.
From experience: heavy ad density, sticky video/sidebar units, layout shift, tiny dense link lists.
1. Never put more than one ad unit above the fold; reserve fixed-height slots (`min-height`) so nothing shifts (CLS).
2. Don't paste marketing copy or release history on the hub; get the reader to a task link within one screen.
3. Don't use sticky ads on mobile. Ad slots are labelled "Advertisement", sit between sections, never between steps of a walkthrough.

## 4. Craft (type, spacing, motion, dark UI)

### Linear · https://linear.app  (fetched)
1. Product UI *is* the hero (live issue list, diffs). For us the hero shows real guide cards, not stock art alone.
2. Small numbered figure labels ("Fig 0.1") and dated changelog entries → our monospace micro-labels (`Space Mono`, uppercase, tracked) for dates/section kickers.
3. Restraint: one accent per surface, thin 1px borders, low-contrast surfaces. Neon only on key accents so it doesn't feel like a casino.

### Vercel Geist · https://vercel.com/geist/typography and /colors  (fetched)
1. Named type roles (heading-72…14, label-14, copy-16, mono) with size+line-height+tracking baked in. → our `--fs-*` scale and `.h1…`, `.label`, `.mono` classes.
2. Colour scale has *defined jobs per step* (100 bg, 200 hover, 300 active, 400/500/600 borders, 900 secondary text, 1000 primary text). → our surface/border/text token tiers: `--bg-0..3`, `--line-1..3`, `--text-1..3`.
3. "Draw each border once; shadows stay translucent" → we use 1px alpha borders and tinted translucent glows, never opaque grey halos.

### Stripe · https://stripe.com/payments  (fetched)
1. Each section = short benefit headline + 1–2 lines + live component demo. → hub blocks use headline + one-line promise + cards.
2. Big stat call-outs ("2x average payment growth") → our "Quick facts" stat row.
3. Gradient used as signature, but on a clean surface with generous spacing; text stays dark-on-light/plain. We invert it: gradient only on hero/rules/underlines.

### Apple (apple.com product pages)  (from experience, not fetched)
1. Huge type contrast between display and body, centered hero, lots of vertical rhythm → `--space-section` is 64px mobile / 112px desktop.
2. Scroll-triggered reveals are subtle (opacity + 8–16px translate). Ours: 200ms fade/translate on cards only, off under `prefers-reduced-motion`.
3. Sticky translucent nav with blur → `.site-header` uses `backdrop-filter` with a solid fallback.

### Awwwards neon/gaming winners (fetched palettes)
- Sunset Race · https://www.awwwards.com/sites/sunset-race — palette `#e62ffa` + `#2fd8fa` (magenta + cyan). Confirms our hot-pink/cyan pairing; keep it to two neon hues plus orange for sunset.
- XOX · https://www.awwwards.com/sites/xox — `#FF34FF` vs deep blue `#204A78`. Neon on deep *blue-black*, not pure black, gives the glow depth → our bg is `#07060C`/`#0D0B16` with a violet cast.
- NARS · https://www.awwwards.com/sites/nars-play-your-power and Darkstar Fury · https://www.awwwards.com/sites/darkstar-fury-evo-i — their Developer-Award accessibility scores were only 6.8 and 6.6 out of 10 (fetched). Neon sites typically fail contrast and perf. Our edge: AA contrast everywhere, no WebGL, ≤ 1 small font file per role.
Godly (godly.website) not reviewed this round.

## 5. How this drives the tokens (summary)
| Finding | Token / decision |
|---|---|
| Vercel step-based scales | `--bg-0..3`, `--line-1..3`, `--text-1..3` tiers with defined jobs |
| Geist named type roles | `--fs-*`, `--lh-*`, `.h1…`, `.label`, `.mono` classes |
| Game8/IGN ToC + updated date | `.toc`, `.badge-updated` right under H1 |
| Fextralife = ad clutter | max 1 ad above fold, fixed-height `.ad-slot`, no sticky ads on mobile |
| Awwwards neon on blue-black | near-black with violet cast, 2 neons + sunset orange |
| Apple/Linear restraint | 1px borders, soft glows only on accents, motion 150–250ms, reduced-motion respected |
