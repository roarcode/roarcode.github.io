# Reader angle: Leonida Guides (https://roarcode.github.io/)

**For:** Rok, via God Bot  
**Date:** 18 Nov 2026 (Europe/Ljubljana, CET) — GTA VI unlocks ~19 Nov 2026  
**Scope:** Visit the site as a player, then research what launch-week guide readers want and what drives them away. Recommend the 10 changes most likely to make someone bookmark this site.  
**Hard rule:** No GTA VI story, mission, character, ending, or secret spoilers appear below. Guide pages are referred to generically.

**Method notes.** Site pages were fetched with `curl` and parsed from HTML on 18 Nov 2026 around 12:07 CET. Reddit `.json` and old.reddit.com returned HTTP 403 (login wall). Quoted Reddit comments were retrieved from the public Arctic Shift archive (`arctic-shift.photon-reddit.com`) and are linked to their reddit.com permalinks. Two threads could not be archived (r/IGN `1fu5saq` and r/Trophies `1g9jfpw`, HTTP 422); they are not quoted. ResetEra search did not yield a quotable, on-topic thread. X posts were retrieved through the public X search API.

---

## TL;DR

The bones of a bookmarkable launch-week guide site are already here: dark, fast, ad-free HTML, source lists, “last updated” dates, spoiler badges and a site-wide spoiler toggle, a “Quick answer” at the top of every guide, and a table of contents that stays out of the way on a phone. That is the opposite of what players complain about on IGN and similar sites.

What will stop someone bookmarking it *tonight* is that it still looks unfinished and over-promises. Every one of the 13 guide articles leaves raw `![alt](TODO: image:…)` placeholders in the page. The hero and primary nav advertise mission walkthroughs, money methods, collectible maps with checklists, cars, glitch fixes and PS5 settings — but six of those hubs say “0 guides,” and the real PS5 settings guide is hiding under Launch Hub while `/ps5-settings/` says there is nothing yet. The “launch night checklist” and “collectible map” pages are static text: no tick-boxes, no actual map image, no progress memory.

Players in Reddit, GTAForums and on X consistently want: text they can Ctrl+F and jump via a TOC; pictures or an interactive map so they can orient themselves; a checklist that remembers what they have done (without a paywall); a page that stays up on a phone beside the TV; no ads, pop-ups or reloads; spoilers gated; and answers that are short, sourced, and updated when patches land. If this site ships images, fixes the empty/wrong nav, adds local checklists, and keeps ads off, it has a real shot at being the tab people leave open on launch night. The interactive map can follow in week one — that is what gets the long-term bookmark.

---

## Site audit findings (as a player)

Visited: home, About, Search, all 9 category hubs, all 13 guide articles, `robots.txt`, `sitemap.xml`, `feed.xml`, `site.webmanifest`, 404, Pagefind assets, and social/OG images. HTML responses were 200 except a test of `/guides/` and missing search-index paths, which correctly served the 404 page.

### What already works

- **Speed.** HTML documents are 8–38 KB and downloaded in about 0.04–0.21 s from this network. A typical guide, plus CSS (29 KB), two preloaded variable fonts (Inter 26 KB, Syne 31 KB), spoiler script (1.8 KB) and logos, is on the order of 130 KB before optional Space Mono (~29 KB more). No third-party ad or analytics scripts were found in the HTML. This is a genuine advantage against IGN-class sites.
- **Dark, mobile viewport, PWA basics.** Every page has `viewport` (`width=device-width, initial-scale=1, viewport-fit=cover`), `color-scheme: dark`, `theme-color`, a skip link, favicons, apple-touch-icon, and `site.webmanifest`. There is no light-mode toggle and no `prefers-color-scheme` switch; for couch / night play, dark-only is the right default.
- **Search.** Header search submits `GET /search/?q=`. Search is noindexed and disallowed in `robots.txt` (correct). It boots Pagefind UI from `/pagefind/` (index reports version 1.6.0, 14 English pages). Without JavaScript the page says “Search needs JavaScript. You can browse by category instead.”
- **Spoiler handling.** A “Show all spoilers” control (default off, remembered in `localStorage`) and `<details class="spoiler">` blocks that still work with JS disabled. Guides carry a “Spoiler-free” or “Minor spoilers” badge. Some pages tuck sensitive names into spoiler boxes. This is already better than most commercial guides.
- **Freshness, sources, honesty about AI.** Every guide shows “Last updated 18 Nov 2026” and “Published 18 Nov 2026,” a “Sources & credits” section with outbound links, a disclaimer, and the byline “Written with AI help and fact-checked against the cited sources,” linking to About. Rumours are labelled. About explains the sourcing rules.
- **Scannable text.** Every guide starts with a “Quick answer,” has a table of contents (collapsed on small screens, opened and sticky from the `64rem` breakpoint), uses tables and numbered steps, and often ends with an FAQ. Related guide cards appear at the bottom.
- **Feed and sitemap exist.** Atom feed at `/feed.xml` (99,756 bytes). Sitemap lists 17 URLs, all `lastmod` 2026-11-18. 404 page is human (“That page took a wrong turn”) with links to home and search.

### Concrete problems (with URLs)

**1. Unrendered image TODOs on every guide.**  
All 13 articles dump raw Markdown into the rendered page, for example `![…](TODO: image:… — step screenshot…)`. Counts: most guides have 3 placeholders; the launch-night checklist, pre-load, and release-time pages have 4 — **42 TODOs in total**. There are **zero** real content images (`<img>` in the article body) on any guide, including the map page. Players will see production notes, not screenshots. That is the single most “this site isn’t ready” moment on a first visit.

**2. Nav and hero promise content that is not there — and hide content that is.**  
Home hero: “Mission walkthroughs, money methods, collectible maps, the best cars, glitch fixes and PS5 settings.” Category cards then admit the truth:

| Nav / card | URL | What a player actually gets |
|---|---|---|
| Launch Hub | https://roarcode.github.io/launch-hub/ | 12 guides (the real library) |
| Beginner Tips | https://roarcode.github.io/beginner-tips/ | 1 guide |
| Mission Walkthroughs | https://roarcode.github.io/missions/ | “0 guides · No guides here yet.” |
| Money Methods | https://roarcode.github.io/money/ | empty |
| Collectibles & Maps | https://roarcode.github.io/collectibles/ | empty — even though a map article exists under Launch Hub |
| Best Cars | https://roarcode.github.io/cars/ | empty |
| Glitch Fixes | https://roarcode.github.io/glitches/ | empty |
| **PS5 Settings** | **https://roarcode.github.io/ps5-settings/** | **empty, despite a full PS5 settings guide at https://roarcode.github.io/launch-hub/ps5-settings/** |
| Leaks & Rumors | https://roarcode.github.io/leaks/ | empty |

The empty hubs are correctly `noindex, follow`. That does not help the player who taps “PS5 Settings” or “Collectibles & Maps” in the top nav and hits a dead end. The header label “PS5 Settings” should not point at an empty category when a guide already exists.

**3. “Checklist” and “map” pages are not those tools yet.**  
- https://roarcode.github.io/launch-hub/launch-night-checklist/ is a well-structured static list (`<ol>` / `<ul>`). There is no `<input type="checkbox">`, no local progress, no print stylesheet. CSS has no `.checklist` component.  
- https://roarcode.github.io/launch-hub/map/ has a “free printable map” section that tells the reader to go to `http://rockstargames.com/VI` on launch day. There is no hosted image, PDF, or interactive map on this site. The collectibles hub still advertises “checklists and credited finds.”

**4. Awkward and inconsistent URLs.**  
- The only beginner guide lives at https://roarcode.github.io/beginner-tips/beginner-tips/ (category slug repeated).  
- The same topic is split across `/ps5-settings/` (empty hub) and `/launch-hub/ps5-settings/` (the article).  
- Titles mix “GTA 6” and “GTA VI” (home/categories use VI; article titles mostly use 6) and often append “(2026).”  
- Several in-article links are plain `http://` (not https): `http://rockstargames.com/VI` (map page, twice), `http://gta6record.com` (radio page, twice), `http://gtasix.org` (release-time page).  
- The 404 document’s canonical is `https://roarcode.github.io/404.html`, so a missing URL can advertise the 404 file as the canonical page.  
- “New & updated” on the home page lists 9 of 13 articles; it omits the radio, release-time, vintage-pack, and PS5 settings guides.  
- Sitemap omits the empty category hubs (reasonable) but also does not give those hubs a “coming after launch” landing that search engines or players can trust as a placeholder.

**5. Social images are huge; on-page images are missing.**  
24 unique Open Graph PNGs, each 1200×630 and **666–689 KB** (e.g. `/og/default.png` is 667,818 bytes). These are not needed for first paint, but they will make every Slack/Discord/X share slow and may be fetched by some browsers/crawlers. They should be JPEG or WebP at a fraction of the size. Meanwhile the article body, where a 50 KB screenshot would help, has none.

**6. SEO / metadata is mostly solid, with a few gaps.**  
Each guide has a unique title, meta description, canonical, `og:type=article`, per-page OG image, Twitter card, and JSON-LD `Article` + `BreadcrumbList` (`datePublished` / `dateModified` 2026-11-18, publisher “Leonida Guides”). FAQ headings exist on all guides but there is no `FAQPage` schema. Dates are date-only, so on launch night “updated 18 Nov 2026” will not tell a player whether the page was checked at 14:00 or 23:00 CET. The host is still `roarcode.github.io` — fine for a fan site, slightly weaker for trust and for typing the name aloud.

**7. Ads are not on the page — but the CSS is already reserved.**  
No ad iframes or ad networks in HTML. The stylesheet already defines `.ad-slot { min-height: 250px; … }` and `.ad-slot__label`. Shipping that later, especially on a phone used as a second screen, would throw away the site’s main competitive edge.

**8. Small second-screen misses.**  
- `viewport-fit=cover` is set, but CSS does not use `env(safe-area-inset-*)`, so a notched phone may tuck the header or spoiler toggle under the status bar.  
- No `@media print` stylesheet (players still print or “print to PDF” checklists).  
- TOC is excellent on desktop; on a phone it stays collapsed, which is right, but there is no compact “now playing this step” or sticky mini-progress.  
- Search depends on JS (acceptable if category browse stays obvious). Pagefind’s search JS/WASM bundle is ~240 KB extra — only on `/search/`, which is fine.

**9. Other notes, not blockers.**  
HTTP `Last-Modified` on the homepage was 18 Nov 2026, 11:00:24 GMT (12:00 CET). Space Mono is declared as `--font-mono` and will download if any mono text renders. The search JS error string still mentions `npm run build` if the index is missing (developer leak, only if Pagefind fails). `/guides/` 404s; nothing important links there.

---

## What players want, and what annoys them

Patterns below come from GTA V / RDR2 analogue threads (the closest launch-week models), plus general guide-site threads from r/pcgaming, r/truegaming, r/patientgamers, r/Eldenring, r/BG3Builds, r/Gaming4Gamers, r/retrogaming, GTAForums, and X. Direct quotes are only from sources that were successfully fetched.

### They want text they can scan, with a TOC — not a video they have to scrub

Written guides win when the reader is stuck mid-session and needs one fact, repeatedly, on a second screen.

> “Text makes it easy to find exactly what I'm looking for, with videos it's usually picking through 5-30 minutes of video, or even longer… With text on a website I can simply control+f and keyword search, or use a table of contents. Much, much faster. Videos have their place… all's the better if they have a written guide linked along with them.”  
> — u/Chew-Magna, 7 Mar 2022, [r/patientgamers](https://www.reddit.com/r/patientgamers/comments/t8sfpy/do_you_enjoy_written_guideswalkthroughs_more_over/hzqu8ic/)

> “Gamefaqs and Neoseeker are the best, often they have a perma-index on the right hand side while you use the walkthrough so you can always jump to where you need to be.”  
> — u/daninthemix, 11 Sep 2023, [r/pcgaming](https://www.reddit.com/r/pcgaming/comments/16fr3cl/where_do_you_go_nowadays_for_game/k04n961/)

> “Many walkthroughs are spoiler-free, and the entire game is on one page so you can just CTRL+F to find what you are looking for!”  
> — u/Dreyfus2006, 22 Nov 2025, [r/truegaming](https://www.reddit.com/r/truegaming/comments/1p3qmgb/how_do_you_actually_search_for_game_info_when/)

> Re-checking a guide mid-session (“I tried that and it didn’t work… What was the next step again?… Last week I stopped at that point”) “could easily be resolved by having a written guide in an open tab… With video, there is not only the ads that pop up if you skip through… No quick glance at the next paragraph.”  
> — u/cold_reverie, 10 Jan 2023, [r/patientgamers](https://www.reddit.com/r/patientgamers/comments/zvtd13/i_hate_how_game_guides_are_all_videos_now/j3qbsf3/)

Leonida already has Quick answers, TOC, and short articles. Keep that. Offer optional timestamped clips later; do not replace the text.

### They want maps and pictures, not only prose

> “The thing I miss the most are stage or level maps… I could look and see what stupid thing I'm missing without having to find it in the text, or these days, scrolling through the video and still not having a clear idea of where to go.”  
> — u/essidus, 20 Jun 2021, [r/Gaming4Gamers](https://www.reddit.com/r/Gaming4Gamers/comments/o45ye7/i_miss_old_school_players_guides_what_would_be/)

> “The Map Genie one is 100x better” (vs a slow official-adjacent interactive map).  
> — u/ZoidDev, 4 Aug 2024, [r/Eldenring](https://www.reddit.com/r/Eldenring/comments/1ek3vyy/why_do_some_people_hate_fextralife/)

A map page without a map image fails this test on day one.

### They want a checklist that remembers progress — and they resent being charged to tick boxes

RDR2 / GTA V players treat interactive maps and 100% checklists as the bookmarkable tools.

> “The IGN one is free, you just need to create an account so they can log your progress. It’s very good too.”  
> — u/MJLDat, 10 Jul 2023, [r/reddeadredemption2](https://www.reddit.com/r/reddeadredemption2/comments/14vncgh/is_there_a_free_rdr2_interactive_map/)

> Thread title and premise: players looking for a map “where I can actually track all the collectables I found… Without having to upgrade to pro on GenieMap.”  
> — u/OperatorGhost123, 4 Aug 2022, [r/RDR2](https://www.reddit.com/r/RDR2/comments/wfxyi3/does_anyone_know_of_any_good_rdr2_maps_where_i/)

> “the premium subscription gives you unlimited item tracking and removes the ads… I just used a notes app on my ipad/phone for it.”  
> — u/binocular_gems, 5 Nov 2025, [r/reddeadredemption2](https://www.reddit.com/r/reddeadredemption2/comments/1ooyqut/is_the_mapgenie_interactive_map_a_legit_accurate/nn9nhbd/)

On GTAForums, Fidzy’s “GTA V 100% Interactive Checklist” exists specifically because “I haven’t seen anywhere that properly keeps track of your progress without it somehow deleting or missing items. I used to follow the interactive maps but they tend to miss quite a lot of things.” The sheet’s selling points are tick-boxes, missable warnings, and a view you can keep beside the tracker ([GTAForums, 13 Nov 2022](https://gtaforums.com/topic/986911-gta-v-100-interactive-checklist-v112/)). Replies call it “incredible work.”

A local-storage checklist on this site, with no account and no Pro tier, would be a reason to stay.

### They use a phone or second screen while the game is on the TV

This is the default launch-night posture for a console game. r/SBCGaming and similar threads treat “guide on the other screen” as a normal setup; one post notes commercial guide pages are “so stuffed with ads they are hardly useable” on a small screen ([r/SBCGaming, Oct 2025](https://www.reddit.com/r/SBCGaming/comments/1o26op2/whats_your_tricks_for_viewing_guides_on_the/)). binocular_gems above tracked items with a notes app “on my ipad/phone.” Pages must stay readable in one hand, without layout shifts, and should work if printed or saved offline.

### They hate ads, pop-ups, reloads, and SEO fluff — and they notice AI

> “SEO is such a cancer. Damn near impossible to find search results written by actual humans these days.”  
> — u/Echo127, 11 Sep 2023, [r/pcgaming](https://www.reddit.com/r/pcgaming/comments/16fr3cl/where_do_you_go_nowadays_for_game/k046td7/)

> “You can easily tell when the article is written for SEO, not just by being filled with useless words, but by how much they're dragging on coming to the actual answer to what you were googling for.”  
> — u/ConsistencyWelder, 11 Sep 2023, [r/pcgaming](https://www.reddit.com/r/pcgaming/comments/16fr3cl/where_do_you_go_nowadays_for_game/k04fwfk/)

> “I used to use sites like IGN for the guides, but I can’t support the AI usage, the ad load, and the forced videos anymore. I avoid them at all cost now.”  
> — u/Big-Night-3648, 22 Nov 2025, [r/truegaming](https://www.reddit.com/r/truegaming/comments/1p3qmgb/how_do_you_actually_search_for_game_info_when/)

Recent X posts, not just old Reddit:

> “@IGN your website sucks i can’t even read it cause of the ads”  
> — @sleepyyenby, 20 Oct 2026, [x.com/sleepyyenby/status/2112419641448599841](https://x.com/sleepyyenby/status/2112419641448599841)

> “I couldn’t view anything with all the ads popping up every five seconds, and then the whole page just randomly reloaded and lost where I was at in my reading. So I closed the page, and now I’m blocking you forever.”  
> — @jonathanplumb, 14 Nov 2026, [x.com/jonathanplumb/status/2121474286393409866](https://x.com/jonathanplumb/status/2121474286393409866)

Accuracy and abandonment also came up for SEO-first wikis: “Its often wrong and misleading especially when it comes anything more complicated than item locations” (u/Reason7322, [r/Eldenring](https://www.reddit.com/r/Eldenring/comments/1ek3vyy/why_do_some_people_hate_fextralife/)); a BG3 community discussion described the pattern as “Optimize the hell out of SEO… copy / paste generic crap… then abandon the site” (u/Xgatt, [r/BG3Builds](https://www.reddit.com/r/BG3Builds/comments/15wtlh7/update_fextralife_links_likely_to_be_blacklisted/)).

Leonida’s AI disclosure and source list are the right counter, *if* the pages stay short, fact-checked, and visibly maintained after launch. The unused `.ad-slot` CSS is a future risk.

### They want spoilers gated, and launch-week pages they can trust

Trophy and walkthrough readers look up missables, glitches, and time commitment *before* story beats, and they expect spoiler barriers (this came up in r/Trophies discussions; the full thread could not be fetched this run). Leonida’s badges, default-closed spoiler blocks, and “rumour / unconfirmed” labels already match that habit. What is missing on launch week is the content those players will search next: missable warnings (behind a spoiler gate), glitch fixes, money methods, and a first-session checklist that does not leak later plot.

---

## Top 10 changes that would make players bookmark the site

Ranked by launch-week impact, then effort (S = hours, M = a day or two, L = a week-plus / ongoing). Each change is tied to a site observation and to sources above.

### 1. Replace every `TODO: image` placeholder with a real figure — or hide the slot until the asset exists
**Why.** 42 raw Markdown TODOs across all 13 guides, and zero content images, including on the map page. Players use pictures to orient themselves (u/essidus; video fans also said they need to *see* the place). On 18 Nov this is the thing that makes the site look unshipped.  
**Source.** Site audit of every guide URL; u/essidus, [r/Gaming4Gamers](https://www.reddit.com/r/Gaming4Gamers/comments/o45ye7/i_miss_old_school_players_guides_what_would_be/).  
**Effort:** S if you strip TODOs tonight and add a handful of original diagrams / official-store screenshots with credit; M to fill all 42 slots properly (no ripped Rockstar art).

### 2. Stop sending players to empty hubs — point “PS5 Settings” and “Collectibles & Maps” at the guides you already have
**Why.** Header “PS5 Settings” goes to https://roarcode.github.io/ps5-settings/ (“0 guides”) while https://roarcode.github.io/launch-hub/ps5-settings/ is a complete article. The collectibles hub is also empty even though a map article exists. The home hero still leads with walkthroughs, money, cars and glitches that are not published. Empty states are honest *after* a click; the click itself feels like a broken site.  
**Source.** Audit of nav vs https://roarcode.github.io/launch-hub/ps5-settings/ and category cards on the home page.  
**Effort:** S (redirect or list the existing guide in the hub; tone down hero copy; badge empty nav items as “after launch” or hide them until the first article ships).

### 3. Make the launch-night checklist a real checklist (tick boxes, remembered locally, no account)
**Why.** The page is named and structured as a checklist but is static HTML. Players bookmark tools that remember progress; they will use a phone beside the TV and hate creating an account or paying just to tick a box (IGN account maps, MapGenie Pro complaints, binocular_gems using a notes app instead, Fidzy’s GTA V sheet). `localStorage` checkboxes on this one page would be used tonight. The same component then powers collectible lists after launch.  
**Source.** https://roarcode.github.io/launch-hub/launch-night-checklist/ (no `input[type=checkbox]`); [r/reddeadredemption2 free map thread](https://www.reddit.com/r/reddeadredemption2/comments/14vncgh/is_there_a_free_rdr2_interactive_map/); [MapGenie tracking comment](https://www.reddit.com/r/reddeadredemption2/comments/1ooyqut/is_the_mapgenie_interactive_map_a_legit_accurate/nn9nhbd/); [GTAForums interactive checklist](https://gtaforums.com/topic/986911-gta-v-100-interactive-checklist-v112/).  
**Effort:** M.

### 4. Ship a free interactive (or at least visual) map and collectible checklist in week one — do not paywall ticking
**Why.** For GTA V and RDR2, the bookmark people actually kept was the map + tracker, not the lore article. Today’s map page only points at an official poster to download on 19 Nov, and the Collectibles hub is empty. A simple zoomable image with pins and a local checklist beats a 2,000-word size comparison. Never charge to mark an item found; that is the exact MapGenie grievance.  
**Source.** Map page audit; u/MJLDat, u/OperatorGhost123, u/binocular_gems, u/ZoidDev, Fidzy on GTAForums (links above).  
**Effort:** L (start with a credited still map + checklist on 19–20 Nov; iterate toward a real interactive map).

### 5. Keep ads off, and remove the unused `.ad-slot` CSS so it is never a tempting one-line add
**Why.** Ads, pop-ups and mid-read reloads are the #1 stated reason people close IGN, including in X posts from 20 Oct and 14 Nov 2026. A fast, dark, ad-free tab on a phone is this site’s opening. The stylesheet already reserves a 250 px `.ad-slot`. Do not ship it on launch week; if money is needed later, a discreet, static, non-reloading unit or a donation link is less damaging than a network pack.  
**Source.** @sleepyyenby, @jonathanplumb (X, links above); u/Big-Night-3648; CSS `.ad-slot` in `/assets/site.5f6db02e41.css` vs no ad markup in HTML.  
**Effort:** S.

### 6. Treat every page as a second screen: print/PDF style, safe-area padding, large typography, sticky step/TOC on a phone
**Why.** Launch-week use is “game on the TV, guide on the phone.” Current TOC behaviour (collapsed on small screens, sticky sidebar on desktop) is thoughtful, but there is no print CSS, no `safe-area-inset` despite `viewport-fit=cover`, and no compact in-progress state. A “Print / save this checklist” view also copies the “print this recipe” escape hatch people already use to dodge fluff (u/Slizzet in the r/pcgaming thread).  
**Source.** Audit of CSS media queries; [r/SBCGaming small-screen guide thread](https://www.reddit.com/r/SBCGaming/comments/1o26op2/whats_your_tricks_for_viewing_guides_on_the/); u/cold_reverie on leaving a written tab open; u/Slizzet, [r/pcgaming](https://www.reddit.com/r/pcgaming/comments/16fr3cl/where_do_you_go_nowadays_for_game/k045kuw/).  
**Effort:** S–M.

### 7. Clean up URLs, https, and the home index so the site feels finished
**Why.** `/beginner-tips/beginner-tips/` looks like a CMS accident. `/ps5-settings/` vs `/launch-hub/ps5-settings/` is a real miss. Home “New & updated” hides 4 of 13 articles (radio, release time, vintage pack, PS5 settings). Several source links are `http://`. The 404 canonical points at `/404.html`. These are the details players and crawlers trip on, and they are quick to fix.  
**Source.** Sitemap and URL audit (see table above).  
**Effort:** S.

### 8. Stay this fast — and shrink the 670 KB OG PNGs
**Why.** Speed is already a reason to stay. Do not add heavy embeds, autoplay, or the ad slot. Compress 24 social images from ~670 KB PNG to JPEG/WebP (~50–80 KB). Optional: only load Space Mono when mono text is visible. Keep HTML this small. Fextra-style slow maps and IGN-style ad weight are what people bounce from (u/ZoidDev; X quotes above).  
**Source.** `curl` timings and OG byte sizes in the audit (e.g. `/og/default.png` 667,818 bytes; guide HTML 21–38 KB in 0.04–0.21 s).  
**Effort:** S.

### 9. Make “kept current” visible on launch night: time-of-day stamps, a corrections hook, and a “checked in-game” mark
**Why.** Every guide currently says only “18 Nov 2026.” During launch week, two updates on the same day matter (preload stall, a settings patch, a wrong store time). Players already distrust AI-assisted and stale guides (u/Big-Night-3648; Fextralife accuracy complaints). You already disclose AI help and cite sources — add a clock time in CET, a one-click “report a correction” (email or form), and after unlock a badge that distinguishes pre-release sourcing from in-game verification.  
**Source.** Article `time` / JSON-LD dates; About → Corrections; u/Big-Night-3648; u/Reason7322.  
**Effort:** S (stamps + corrections link); M to operationalise in-game verification.

### 10. Fill the empty hubs in the order players will actually search, text-first, spoilers still gated
**Why.** The empty nav items *are* the launch-week query list: settings (already written — surface it), beginner first-session flow, glitch/workaround log, money methods, missable warnings behind spoiler boxes, then mission walkthroughs with a TOC and optional timestamped video. Do not pad for SEO; keep the Quick answer first (u/ConsistencyWelder, u/The1stHorsemanX). When a walkthrough needs a visual, link a short clip with timestamps rather than replacing the page (u/Chew-Magna).  
**Source.** Empty category URLs; player-want quotes in the previous section.  
**Effort:** M for the first post-launch glitch/money/missable pages; L to cover a full walkthrough set (do it incrementally, one mission page at a time).

---

## Quick wins before midnight 19 Nov 2026 (CET)

Do these even if the bigger map/checklist work slips:

1. Strip or comment out every `TODO: image` so players never see production notes. Put in any diagrams you already have.  
2. Redirect https://roarcode.github.io/ps5-settings/ to the real guide, or list that guide as the first card in the hub.  
3. Put the existing map article on the Collectibles & Maps hub so that card is not “0 guides.”  
4. Soften the home hero so it does not advertise walkthroughs, cars, and glitch fixes as if they are live.  
5. Change `http://` source links to `https://`.  
6. Add the four missing articles to “New & updated” (or link “all 13 guides”).  
7. Add `localStorage` checkboxes to the launch-night checklist only.  
8. Add a minimal `@media print` stylesheet and `env(safe-area-inset-*)` padding on the header.  
9. Compress OG PNGs; leave ads and `.ad-slot` unused.  
10. Show update *times* (CET) on any page you touch after this afternoon.

Leave in place: dark theme, spoiler toggle, source lists, AI disclosure, Quick answers, TOC, no third-party scripts.

---

## Sources

### This site (fetched 18 Nov 2026, ~12:07 CET)

- Home: https://roarcode.github.io/  
- About: https://roarcode.github.io/about/  
- Search: https://roarcode.github.io/search/  
- Sitemap / robots / feed: https://roarcode.github.io/sitemap.xml , https://roarcode.github.io/robots.txt , https://roarcode.github.io/feed.xml  
- Category hubs: `/launch-hub/`, `/beginner-tips/`, `/missions/`, `/money/`, `/collectibles/`, `/cars/`, `/glitches/`, `/ps5-settings/`, `/leaks/`  
- Guides: `/beginner-tips/beginner-tips/`, `/launch-hub/editions-prices/`, `/launch-hub/jason-lucia/`, `/launch-hub/launch-night-checklist/`, `/launch-hub/leonida/`, `/launch-hub/map/`, `/launch-hub/gta-6-online/`, `/launch-hub/platforms/`, `/launch-hub/preload-size/`, `/launch-hub/ps5-settings/`, `/launch-hub/radio-stations/`, `/launch-hub/release-time/`, `/launch-hub/vintage-vice-city-pack/`  
- CSS / JS: `/assets/site.5f6db02e41.css`, `/assets/js/spoilers.js`, `/assets/js/search.js`, `/pagefind/pagefind-entry.json`

### Reddit (comments via Arctic Shift archive; permalinks on reddit.com)

- [Where do you go nowadays for game guides that aren't SEO? — r/pcgaming](https://www.reddit.com/r/pcgaming/comments/16fr3cl/where_do_you_go_nowadays_for_game/)  
- [How do you actually search for game info when you’re stuck? — r/truegaming](https://www.reddit.com/r/truegaming/comments/1p3qmgb/how_do_you_actually_search_for_game_info_when/)  
- [I hate how game guides are all videos now — r/patientgamers](https://www.reddit.com/r/patientgamers/comments/zvtd13/i_hate_how_game_guides_are_all_videos_now/)  
- [Do you enjoy written guides more than video ones? — r/patientgamers](https://www.reddit.com/r/patientgamers/comments/t8sfpy/do_you_enjoy_written_guideswalkthroughs_more_over/)  
- [I miss old school Player’s Guides — r/Gaming4Gamers](https://www.reddit.com/r/Gaming4Gamers/comments/o45ye7/i_miss_old_school_players_guides_what_would_be/)  
- [Why do some people hate Fextralife? — r/Eldenring](https://www.reddit.com/r/Eldenring/comments/1ek3vyy/why_do_some_people_hate_fextralife/)  
- [Fextralife links likely to be blacklisted — r/BG3Builds](https://www.reddit.com/r/BG3Builds/comments/15wtlh7/update_fextralife_links_likely_to_be_blacklisted/)  
- [Is there a free RDR2 interactive map? — r/reddeadredemption2](https://www.reddit.com/r/reddeadredemption2/comments/14vncgh/is_there_a_free_rdr2_interactive_map/)  
- [Interactive map — r/reddeadredemption2](https://www.reddit.com/r/reddeadredemption2/comments/lk4nuv/interactive_map/)  
- [RDR2 maps without MapGenie Pro — r/RDR2](https://www.reddit.com/r/RDR2/comments/wfxyi3/does_anyone_know_of_any_good_rdr2_maps_where_i/)  
- [Is MapGenie accurate? — r/reddeadredemption2](https://www.reddit.com/r/reddeadredemption2/comments/1ooyqut/is_the_mapgenie_interactive_map_a_legit_accurate/)  
- [Viewing guides on a small second screen — r/SBCGaming](https://www.reddit.com/r/SBCGaming/comments/1o26op2/whats_your_tricks_for_viewing_guides_on_the/)

Could not fetch (not quoted): r/IGN thread on the IGN website (`1fu5saq`, 422); r/Trophies guide-before-starting thread (`1g9jfpw`, 422); live Reddit JSON / old.reddit (403).

### Forums and X

- [GTA V 100% Interactive Checklist v1.1.2 — GTAForums](https://gtaforums.com/topic/986911-gta-v-100-interactive-checklist-v112/)  
- [X: @sleepyyenby on IGN ads, 20 Oct 2026](https://x.com/sleepyyenby/status/2112419641448599841)  
- [X: @jonathanplumb on IGN ads and a mid-read reload, 14 Nov 2026](https://x.com/jonathanplumb/status/2121474286393409866)

ResetEra was searched; no clean, quotable thread on guide-site UX was fetched.
