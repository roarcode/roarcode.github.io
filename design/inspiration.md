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

## 6. Top-tier guide sites — pass 2 (18 Nov 2026): IGN wiki, Eurogamer guides, Polygon guides, GameSpot
Method: WebFetch for page text (IGN GTA 5 wiki hub, Eurogamer guides archive, GameSpot) plus headless Chromium at 1280 and 390 px (Polygon guides hub, IGN wiki hub and a collectible article, a Eurogamer guide article), with each site's cookie wall hidden by CSS only so the layout was visible. Screenshots stayed in `/tmp` for study and are **not** in this repo. Polygon's `/gta-6/` URL returned 404, and GameSpot's hub blocked a useful fetch, so GameSpot is "fetched byline text only". Nothing below copies a layout, logo, wording or image; each line is a pattern we re-implemented in our own tokens. I read no spoiler content and recorded none (study pages were non-GTA guides plus hub navigation).

| Pattern | What the leaders do (observed) | What we build (class) |
|---|---|---|
| **Density** | Hubs are lists of short thumbnail + two-line-title rows. Metadata is one muted line (date, author). Few words, many entry points. | `.latest-grid` / `.latest-card`: title max 3 lines, no excerpt except the featured card, meta = one mono line. |
| **Grid** | One large feature, then an even grid of equal cards. Polygon: 1 big + 1 large card, then rows. Eurogamer: a "Highlights" row of 4 equal cards, then per-game groups of 4 with a "See more" link. | 2 cols on mobile → 4 on desktop; `.latest-card--feature` spans 2×2 (desktop) / full width (mobile). Per-section "View all →". |
| **Thumbnails** | Always 16:9, rounded 8–12 px, category kicker in the accent colour. Titles sit *below* the image in the grid; the overlay-title treatment is kept for the hero/feature only. | `.latest-card__media` 16:9 + chip overlay; title below. Overlay title only on `--feature`. Placeholder media has a gradient + pattern so blank slots never look broken. |
| **Trending strip** | Eurogamer puts a one-line "hot topics" ticker above the masthead; Polygon a row of topic chips under the logo. Both are plain text links, no images. | `.trending`: label + numbered pill rail directly under the header; snap-scroll with an edge fade on mobile; 6 pills fit on desktop. |
| **Hero** | A single big image, a headline with a category kicker, and a small rail of "top stories" beside or below it. No carousel. | `.hero-feature`: image + overlay + one featured guide + `.hero-feature__side` top-4 list. No auto-rotating carousel (bad for CLS and a11y). |
| **ToC behaviour** | IGN wiki: persistent left sidebar with a collapsible tree and a "Find in guide" action; on mobile it becomes a sticky tab strip (Guide / Contents / Checklists). The Eurogamer article I captured showed no ToC above the fold (only breadcrumb, centred title, dek, hero image), so a visible ToC is a differentiator. | Desktop: sticky left `.toc` with scroll-spy. Mobile: a sticky 48 px bar "On this page · *current section*" that opens a dropdown; closes on pick. Thin sunset read-progress bar in the header. |
| **Author / date** | IGN: breadcrumbs above the H1, then an uppercase small byline row ("BY names · UPDATED date"). Polygon: "By NAME" under the title, mono-uppercase. GameSpot: names + date + time in one sentence. | `.byline`: team avatar, author, *Published* and *Updated* dates, reading-time pill. Compact variant for cards/hero. |
| **Related modules** | Polygon/Eurogamer end articles with more guides of the same game; IGN uses the sidebar tree as its "related". | `.related` at the bottom: 4 `.latest-card`s (snap rail on mobile) plus a short list in the desktop sidebar. |
| **Checklists** | IGN offers a first-class "Checklists" tab per game (progress saved per account). We can't do accounts, so we save locally. | `.checklist`: localStorage, progress bar, filter (All / To find / Found), two-tap reset, sticky header; `.progress-card` in the sidebar sums all lists. |
| **Mobile patterns** | IGN: bottom icon bar (home, menu, video, puzzle, search) plus a top tab strip. Polygon: single column of full-bleed rounded images with a kicker above the title. Eurogamer: simply scaled desktop (cramped); a negative example. | `.tabbar` (Home, Guides, Checklists, Search), snap rails for trending/related/3-up groups, 2-col dense grid, 44 px targets. |
| **Ads & consent** | Every one of them opens with a cookie wall and a large leaderboard before content; half of the first viewport was empty or covered. A negative example. | Keep: max one ad above the fold, reserved height, no sticky ads. Our embeds are static cards, so no extra consent wall is needed. |

Extra takeaways
1. A **breadcrumb above the H1** (Home › Category › Guide) is universal on guides, and it is the best place to show category context. We truncate the last crumb with an ellipsis on mobile.
2. The leaders show **"Updated" dates more prominently than publish dates**. We show both, with the update date highlighted by the green badge.
3. Image-led sites keep **text tiny and numerous**; we stay at 15–17 px for titles so we remain legible at 390 px with 2 columns.
4. **Do not copy:** no sidebar tree, no "Add us on Google" button, no ad-first layouts, no wordmarks or typefaces. Our identity stays sunset gradient + Syne headings.
