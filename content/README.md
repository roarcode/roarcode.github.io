# GTA VI guides: content rules for agents

This folder holds one markdown file per page. Pages are published by the site build. Read this file before you write or edit anything.

**The site is an unofficial fan site. Every page ends with:** `Unofficial fan site, not affiliated with Rockstar Games or Take-Two.`

Files that start with `_` (`_facts.md`, `_queue.md`) are Researcher's working files. They are not published.

## 1. Front-matter (top of every page)

```yaml
---
title: "GTA 6 Release Time: Unlock Times by Time Zone (2026)"   # under about 60 characters
title_alts:                       # 2-3 alternatives for A/B tests (every top page; templates keep a placeholder)
  - "..."
slug: release-time                # lowercase, hyphens, unique
category: pre-launch              # pre-launch | beginner | walkthrough | money | collectibles | vehicles | glitches
description: "..."                # SEO meta, 155 characters or fewer, spoiler-free, with a hook
sources:                          # every URL used for a fact on the page
  - https://...
updated: 2026-11-18               # date of the last real change
status: prelaunch                 # prelaunch | template | live
spoilers: none                    # none | minor | major
---
```

- `status: template` means the page still has `[PLACEHOLDER]` fields and must not be published.
- `spoilers`: `none` = nothing about story, characters, places or secrets. `minor` = only marketing-level names, hidden inside spoiler blocks. `major` = story, mission or secret details (all walkthroughs).
- Every factual claim must be traceable to a URL in `sources`. If you tested it yourself, write the date, platform and number of tests on the page.

## 2. Titles (search and clicks)

1. **Lead with the exact phrase people search:** "GTA 6 Release Time", "GTA 6 Pre-Load", "GTA 6 Best Money Method", "GTA 6 [Mission Name] Walkthrough".
2. **Add one click hook:** a number, "how to", "fastest", "all locations", "tips nobody tells you".
3. **Add `2026` or `(Updated)`** where it fits.
4. **Under about 60 characters.**
5. **Spoiler-free.** Name the mission, the reward or the problem. Never the twist or the ending. Mission names shown in the game's own menus are fine.
6. **`title_alts`:** write 2 or 3 alternative titles for A/B tests.

Formulas (examples are in each template's comments):
- Walkthrough: `GTA 6 [Mission Name] Walkthrough: [Reward / Problem]`
- Money: `GTA 6 Best Money Method: $[Amount]/Hour`
- Collectible: `GTA 6 [Collectible] Locations: All [N] on the Map`
- Vehicle: `GTA 6 [Vehicle Name]: How to Get It, Price, Location`
- Fix: `GTA 6 [Problem] Fix: [N] Ways to Solve It`

## 3. Spoilers: hide them, keep the page interesting

- The **title, Quick answer and description** never reveal what happens. They hook the reader with stakes, difficulty, rewards and tips.
- Every **story beat, character reveal, ending, secret location or mission twist** goes inside a block:

```
:::spoiler How to unlock it (reveals a late-game location)
Hidden content here.
:::
```

- The line starts with `:::spoiler`, then a short **teaser label**. Make it enticing but non-revealing. Put what kind of spoiler it is in brackets.
- `:::` must be alone on its own line to close the block. Blocks do not nest.
- **Spoiler-free tips stay visible** around the blocks, so the page reads well with everything collapsed.
- Pre-launch pages that use only marketing information are `none` or `minor`. Even trailer-revealed character and story details go inside blocks (see `jason-lucia.md`, `map.md`, `leonida.md`).
- Walkthrough pages are `spoilers: major` and also carry a visible warning under the Quick answer.

## 4. Writing style: for an 8-year-old

- Short sentences. Simple words.
- **One action per numbered step.**
- **Explain every game term the first time** it appears. Example: "pre-load (downloading the game early so it is ready at unlock)". Use the "Words used on this page" line.
- **Buttons and menus for PS5 and Xbox Series X|S, written exactly.** Example: "PS5: press the Options button > Download." If a menu path comes from a source, use its exact names. If it is a general console path, label it "(general Xbox menu path, check on your console)". If a button is not announced, write "not announced". Do not guess.
- **Exact times, amounts and requirements.** Never filler like "explore the map". If a number is not confirmed, leave the page in the queue instead of padding it.
- Original wording only. Never copy text from gta6communitywiki.com or any other site.

## 5. Quick answer box: exactly 3 lines

Directly under the H1, every page has a 3-bullet blockquote. The first bullet starts with **Quick answer:**.

```
> - **Quick answer:** [the main answer with exact numbers]
> - [the key detail or requirement]
> - [the one warning, risk or best tip]
```

## 6. Images

- Use at least **3 image placeholders per guide**, one per main step.
- Format (copy it exactly):

```
![alt text](TODO: image:slug-step-1 — what to show)
*Caption: One line, with the type first, e.g. "Menu screen. The PS5 storage screen showing free space."*
```

- Name the type in the "what to show" text: **map pin**, **menu screen**, **step screenshot** or **diagram**.
- **Until real footage exists, images must be our own diagrams or Designer's original art. Never use Rockstar screenshots or ripped assets without credit.** Fair-use screenshots, once we have them, must be credited to Rockstar Games in the caption.
- Designer and Lead Engineer find placeholders by searching for `TODO: image:`. The id after `image:` is the file name to create.

## 7. Source rules

Allowed sources, best first:
1. Official Rockstar material (rockstargames.com, Newswire, trailers), and PlayStation and Xbox store, support and blog pages.
2. Reputable outlets: IGN, GameSpot, Eurogamer, Polygon, Kotaku, VGC, The Verge, PC Gamer, GamesRadar, Game Informer, Bloomberg, AP.
3. Your own hands-on test (write date, platform and number of runs).

Secondary or fan sites can be used only with a second source, or with a hedge ("reported by..."). Never use: leaks, leaked assets, piracy links, or unreleased paid content.

## 8. Marking rumours

Anything unconfirmed goes in its own block, with a source:

```
> **Rumour / unconfirmed:** [what is claimed]. Source: [URL]
```

Use "not announced" for things nobody has said. Do not name unnamed weapons or vehicles as if they were official. Do not publish money glitches, exploits or cheat codes that are copied from GTA 5.

## 9. Page structure

1. H1 title (same as `title`)
2. Quick answer (3 bullets)
3. "Words used on this page" line
4. H2 and H3 sections with numbered steps, tables and images
5. `## FAQ` with `### Question?` headings (used for schema.org FAQ)
6. For live guides: `## Updated` changelog table (date, what changed)
7. Footer line

## 10. How to fill a template

1. Copy `template-*.md` to a new file with the final slug, for example `mission-name.md`.
2. Replace every `[PLACEHOLDER]`. Delete all `<!-- -->` guidance comments.
3. Set `status: live` only when nothing in brackets is left and every fact has a source.
4. Set `spoilers` honestly and move story details into `:::spoiler` blocks.
5. Check the title length and write 2 or 3 `title_alts`.
6. Check there are at least 3 image placeholders with captions.
7. Add a row to the `## Updated` table. Change `updated` in the front-matter.
8. Re-check the facts when a patch lands. Say what changed in the table.

## 11. Pages in this folder

Hub: `gta-6-launch-hub` (links every published launch page; add a link here whenever you publish a page).

Pre-launch: `is-gta-6-out`, `release-time`, `preload-size`, `launch-night-checklist`, `editions-prices`, `vintage-vice-city-pack`, `platforms`, `ps5-settings`, `map`, `gta-6-map-size`, `leonida`, `jason-lucia`, `gta-6-online`, `radio-stations`, `beginner-tips`.

Launch-problem pages (category `glitches`): `gta-6-not-working`, `gta-6-download-stuck`, `gta-6-preload-not-starting`, `gta-6-ps5-fixes`, `gta-6-xbox-fixes`.

Held stubs (`publish: false` + `draft: true`, not built): `gta-6-error-codes`, `gta-6-first-mission`, `gta-6-how-to-make-money-fast`, `gta-6-best-car-early`, `gta-6-cheats`.

Templates: `template-mission-walkthrough`, `template-money-method`, `template-collectible-map`, `template-vehicle`, `template-glitch-fix`, `template-leak`.

Files are flat in `content/`. If Lead Engineer prefers the sub-folders (`missions/`, `money/`, `glitches/`, `pages/`, `launch-hub/`), move live guides there and keep the slug the same.

## 12. Checklist before you finish a page

- [ ] Title leads with the search phrase, under about 60 characters, spoiler-free, with `title_alts`
- [ ] Description 155 characters or fewer, spoiler-free
- [ ] Quick answer: exactly 3 bullets
- [ ] 3 or more image placeholders with captions and types
- [ ] PS5 and Xbox buttons and menus written exactly (or "not announced")
- [ ] Exact numbers: times, prices, amounts, requirements
- [ ] Rumours in `> **Rumour / unconfirmed:**` blocks with a source
- [ ] Story, secrets and twists only inside `:::spoiler` blocks
- [ ] FAQ and footer line present
- [ ] "What players are saying" section added, or the HTML comment placeholder left in (see section 13)
- [ ] Linked from `gta-6-launch-hub` and `updated:` bumped

## 13. What players are saying

Real public reactions, tips and fixes from X and forums, shown on launch pages.

**Rules**
1. **Public posts only.** No private groups, DMs or screenshots of private chats.
2. **Short quotes** (one or two sentences). Always show the **@handle** and a **link** to the post.
3. **Never invent or reword a quote.** If you cannot open the post, do not use it.
4. **No personal info.** No real names unless the account is public and the person is the author, no addresses, phone numbers, emails, ages, faces of minors or account details.
5. **Prefer posts that add something:** a fix that worked, a tip with exact steps, a number, or a genuine reaction. Skip insults, rage-bait, ads and spam.
6. **Check the claim.** A player tip is not a fact. Say "a player reports" and do not copy it into the guide body as confirmed unless a source or our own test confirms it.
7. **Spoilers and leaks:** a post that shows story, secrets, mission twists or leaks goes inside a `:::spoiler` block with a warning label, and the page is `spoilers: major` (see the leak template). Never use a post that links to leaked files, piracy or downloads.
8. **X posts use the official embed**, never a cropped screenshot. The site turns this exact block into an embed:

```
<blockquote class="twitter-tweet"><a href="https://x.com/HANDLE/status/POST_ID"></a></blockquote>
```

   Only `x.com` or `twitter.com` status links in this exact shape embed. Anything else is shown as plain text.
9. **Forum posts** (Reddit, Resetera and similar): quote one or two sentences in a blockquote, then the author's handle and the link. Do not embed screenshots.

**Section shape** (on the page, before `## FAQ`):

```
## What players are saying

*Public posts, quoted with a link. Player tips are not confirmed facts.*

<blockquote class="twitter-tweet"><a href="https://x.com/HANDLE/status/POST_ID"></a></blockquote>

> "Short quote." – u/handle on Reddit ([link](https://...))
```

**No real posts yet?** Leave only this comment so nothing empty shows. Replace it when real posts exist in `content/inbox/`:

```
<!-- What players are saying: add real embeds from content/inbox/ -->
```

## 14. Stubs, holds and the hub

- `status: stub` means a quick page that will be expanded later.
- `publish: true` means the facts are confirmed and the page may go live. `publish: false` means held. **The build reads `draft: true`, not `publish`,** so every held page also carries `draft: true`. To release a held page, set `publish: true` and `qa: pending`, and leave `draft: true` in place. SEARCH removes `draft: true` once the page passes QA (see section 15).
- Held pages are never linked. The hub lists them as plain text under "Coming soon". Add the link when you publish.
- Use absolute links to other pages, for example `/launch-hub/release-time/`. Links like `release-time.md` break on the built site.
- Category folders on the built site: `pre-launch` pages live at `/launch-hub/<slug>/`, `glitches` at `/glitches/<slug>/`, `beginner` at `/beginner-tips/<slug>/`.

## 15. QA gate (Rok's rule, 18 Nov 2026)

- Nothing gets published without a QA check.
- Brand-new pages, and changes to pages that are not live yet, get `qa: pending` AND `draft: true`. They stay offline until SEARCH passes them.
- Changes to a page that is already live get `qa: live-review` (no draft). The page stays up and SEARCH reviews it first. Never take a live page offline.
- SEARCH is the QA gate. It renders each page in a browser, then either sets `qa: passed` and removes `draft: true`, or writes `review/qa-<slug>.md` with fixes.
- Writers apply those fixes, keep `qa: pending` and note the fix at the bottom of the review file. Writers never set `qa: passed` or remove `draft: true` themselves.
