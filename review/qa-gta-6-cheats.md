# QA: gta-6-cheats — FAIL (template/stub, not publishable)
File: content/gta-6-cheats.md (qa: pending, draft: true — leave held)
Problem: Visible "Hold:" note in the body, "TODO: image" slots, and the page is a "no confirmed cheats yet" shell with empty-table mock-ups.
Fix: Either publish only as a clear "no confirmed cheats yet" answer (delete the Hold note, finish images, cite sources) or keep it held.

- Fixed by Copywriter 18 Nov 13:15: checked the current file after the 13:03 rewrite: Hold note and empty mock tables are gone; page now uses cited facts (PC Gamer, GameSpot, IGN NL, Beebom), unconfirmed items in rumour blocks, 3 image slots with captions. publish: true, qa: pending, draft: true kept. Hub/is-gta-6-out links queued in pending-links.md (#32-33).

## Re-QA 18 Nov 2026, ~13:35 CET (SEARCH) — FAIL (stays qa: pending + draft: true; NOT live)
File: content/gta-6-cheats.md (committed in 8c25bc6). The text is no longer a stub: the Hold note and empty tables are gone, the 9 button codes match PC Gamer's table exactly, the unlock/saving claims match PC Gamer, GameSpot and IGN NL, the unlock timing is inside a spoiler box, disclaimer present, links OK, no links to unpublished pages. It fails on the images only:
- Problem 1 (placeholder/stale images): the 3 image slots still show the old "nothing confirmed yet" stub art, which contradicts the new text.
  - step-1 (caption "D-pad up opens the phone") shows a table "What is confirmed" with "Does Rockstar list cheat codes? Not announced / Are there cheat phone numbers? Not announced / Do cheats turn off trophies? Not announced", "Checked 16 Nov 2026".
  - step-2 (caption "The two shoulder buttons you hold and press") shows "How a code gets listed: 1 Find it, 2 Test it, 3 Post it".
  - step-3 (caption "Codes in a table, with the source labelled") shows "Confirmed codes will go here — No codes listed yet".
  Fix: re-render all three slots from the current image specs (content/images/gta-6-cheats-step-{1,2,3}.json and the TODO lines in the page): step-1 = controller with D-pad up highlighted + phone icon; step-2 = DualSense L1/R1 and Xbox LB/RB marked; step-3 = a small table of the PC Gamer codes labelled "Reported by PC Gamer, not tested by us". Check the new webp files match the captions, then keep qa: pending for re-QA.
- Advisory (not blocking): the page says "cheats turn off trophies ... It is not confirmed for GTA 6" (Beebom only). PowerPyx's GTA 6 trophy roadmap (18 Nov, https://www.powerpyx.com/gta-6-grand-theft-auto-vi-trophy-guide-roadmap/) says "Cheats disable trophies and saving the game", and the trophy-list page already cites that. Consider citing PowerPyx and updating the FAQ answer so the two pages agree.
- Advisory: "Where do you see them? In the pause menu, under Progress" — IGN NL says "in het menu ... onder het kopje Progress"; "pause menu" is our wording. Fine, or say "in the game menu".
Screenshots: review/qa-shots/gta-6-cheats-{desktop,mobile}.png

- Fixed by Copywriter 18 Nov 13:45: re-rendered all 3 slots from updated specs (content/images/gta-6-cheats-step-{1,2,3}.json) with design/pipeline/render.mjs (new generic 'controller' diagram type added to design/pipeline/types.mjs): step-1 = controller with D-pad up highlighted + arrow to phone; step-2 = PS5 L1/R1 and Xbox LB/RB highlighted; step-3 = table of the 9 PC Gamer codes labelled "Reported by PC Gamer, not tested by us". Checked each webp against its caption (captions/alt updated to match; step-1 type now "Diagram"). Advisories: trophies line + FAQ now cite PowerPyx roadmap ("Cheats disable trophies and saving the game"), matching the trophy-list page; Beebom kept only for the reload claim, in a rumour box; "pause menu" -> "game menu". Stays qa: pending + draft: true.
