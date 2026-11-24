Checked by SEARCH 2026-11-24 09:28 CET

# QA: gta-6-controls (live page, commit 8e15f22) — FAIL (stays live, set to qa: live-review)

Rok approved this page himself on 24 Nov 2026 (09:24 CET), so the old controls-page hold is lifted. Checked the live page at https://roarcode.github.io/beginner-tips/gta-6-controls/ (desktop 1280 px and mobile 390 px, Playwright) and every source.

## What passed
- Renders: HTTP 200, no JS errors, no failed requests, no raw markdown or TODO text in the rendered page (the TODO image hints in the source render as the three images).
- Mobile 390 px: no sideways scrolling (scrollWidth 390); all 5 tables fit their wrappers.
- Images: all 3 load; alt text matches what each image shows.
- Links: 30 links, 0 broken (GameSpot gives 403 to curl but all 3 GameSpot pages load in a normal fetch). The embedded X post still exists (IGN, 17 Nov 2026).
- Sources: Shacknews, PC Gamer, GameSpot and Game Informer are major outlets; none of the small-site list is used. Every button in the Driving, On-foot, Fighting and Other-buttons tables matches the Shacknews default-layout table. Disagreements already stated: car push (Square vs L3), shouting at a driver (L2+R3 vs R3), headphone prices ($119/$200 vs about $150).
- Spoilers: none in body, title, alternate titles, meta description or OG text. The Focus unlock is described vaguely without naming the mission.
- Dates: all real and in the past; Updated table ends 2026-11-24.
- Footer disclaimer present. About 2,040 words of real content, so not thin.

## What failed: fixes needed (Copywriter)

1. **Classic layout menu path is a guess, and it is wrong.** The page says "Settings, then Controls" and "our best guess". A guessed path written as numbered steps is not acceptable on a live page. Major outlets now give the real path, so replace it with a sourced one:
   - Pause with **Options** (Xbox: **Menu**) > **Settings** > the first tab, **Control Scheme** > change **Default** to **Classic** (or **Left-Handed**), then back out to save. Sources: Engadget, 20 Nov 2026 (https://www.engadget.com/2323542/change-these-settings-if-you-want-gta-6-to-feel-like-old-gta/) and GamesRadar+, 19 Nov 2026 (https://www.gamesradar.com/games/grand-theft-auto/gta-6-classic-controls/).
   - Delete the sentence "The exact menu path is our best guess and will be checked in game."
   - Add a short "What Classic changes" table: Run = Cross / A, Jump or climb = Square / X, Melee = Circle / B, Crouch = L3 / LS; everything else stays the same (GamesRadar+; Engadget lists run, jump and crouch).
   - FAQ "Can I change the controls?": say there are three presets and Engadget says there is no full button remapping.
   - Add Engadget and GamesRadar+ to the frontmatter sources and the Sources list.
2. **Focus claim cites an article that is not in the sources.** "GameSpot points to calm activities such as fishing and pool" comes from GameSpot's tips article (20 Nov 2026), not from any listed GameSpot page. Add https://www.gamespot.com/articles/gta-6-tips-everything-i-wish-i-knew-before-i-started-playing/ to frontmatter and Sources. That article also says Focus gains are permanent, which you may add.
3. **Unstated source disagreements** (rule: say where sources disagree):
   - Rest on a railing: GameSpot says press L3 / LS; PC Gamer says hold Circle / B near a rail to lean. Say both.
   - Switch aiming shoulder: Shacknews and GameSpot say **hold** D-pad left; PC Gamer says **press** it. Say both.
   - Pause button: Shacknews lists Pause as "Select"; the page says Options / Menu. Back Options / Menu with GamesRadar+ or Engadget and note that Shacknews writes "Select".
   - Auto-drive: GameSpot says press "Start" for cinematic view; the page says Options / Menu. Add "(GameSpot calls it Start)".
4. **Unsourced FAQ line:** "A single press gets you out and turns the engine off" is not stated by any source. Change it to: a single press just gets you out (GameSpot says a single press also leaves the door open).
5. **Images (God Bot's checks):**
   - All three images carry a "PS5 SETTINGS" pill. Wrong label: these are controls for PS5 and Xbox. Change it to "CONTROLS" (or "PS5 + XBOX").
   - Images 1 and 2: the table header reads "J0B" (the O is drawn like a zero). Redraw it as "JOB" (or "ACTION").
   - The images show only 6 rows; the page tables have 17 (driving) and 16 (on foot). Change the captions to say this, for example "Table. The six main driving buttons (full list below)." and "Table. The six main on-foot buttons: run, jump, crouch, cover, aim and shoot (full list below)."
   - Image 3: the "ILLUSTRATION — NOT AN IN-GAME SCREENSHOT" pill overflows its border on the left; fix the width. Its mock title says "Controls"; once fix 1 is made, rename it to "Control Scheme" to match the real tab.
6. **Embedded X post section:** it is headed "What players are saying" with "Player tips", but the post is IGN's pre-launch PS5 features video (17 Nov). Move it under "Controller vibration on PS5" with a label such as "IGN video (17 Nov 2026, before launch)", or rename the section.

## Decision on the best-guess path
Not acceptable. Labelling it as a guess is honest, but a guessed path written as steps is still an unsourced fact, and here it is also wrong (the tab is "Control Scheme", not "Controls"). Two major outlets now print the path, so source it (fix 1). Do not leave a best-guess label on a live page when a source exists.

## Status
- content/gta-6-controls.md frontmatter set to `qa: live-review`; the page stays live.
- Re-check after Copywriter adds a "Fixed by Copywriter" note here.
