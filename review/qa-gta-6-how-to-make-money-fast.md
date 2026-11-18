Checked by SEARCH 18 Nov 2026 13:48 CET
## QA (SEARCH) — FAIL (stays qa: pending + draft: true)
Text passes: every fact matches GameSpot and Destructoid (18 Nov), no placeholders in the text, no test claims, NPC/place names and the story section are inside spoiler boxes, disclaimer present, no links to unpublished pages (2 external links: both 403 to our checker, could not verify by script but both pages read fine via fetch). Screenshots: review/qa-shots/gta-6-how-to-make-money-fast-{desktop,mobile}.png
- File: site-images/gta-6-how-to-make-money-fast-step-1.webp, -step-2.webp, -step-3.webp (3 image slots in content/gta-6-how-to-make-money-fast.md)
  Problem: all three pictures are the OLD placeholder art and were never re-rendered after content/images/gta-6-how-to-make-money-fast-step-*.json were updated (13:19). Step-1 says "Methods ranked by money per hour ... Rows are placeholders ... To be tested"; step-2 says "Method start — after testing ... Placeholder only"; step-3 says "Cash total after one run ... Not tested / To be filled". They do not match the captions ("The 4 methods and when each one opens"; "Yellow icons mark robbery spots. Sell the loot at a fence"; "Keep your cash under $20,000 and bank the rest") and show placeholder text on a live page. The rendered alt text is also the old placeholder alt.
  Fix: re-render the 3 slots from the current JSON specs (step-1 = table of the 4 methods + when they open; step-2 = schematic map with yellow robbery icons + a fence icon; step-3 = cash vs BuckMe illustration with the $20,000 note), check each new webp matches its caption, then keep qa: pending for re-QA. Do not change the text.

# QA: gta-6-how-to-make-money-fast — FAIL (template/stub, not publishable)
File: content/gta-6-how-to-make-money-fast.md (qa: pending, draft: true — leave held)
Problem: Title, title_alts and quick answer contain "$[AMOUNT]", "[method name]", "[N] runs" placeholders; claims of "tested [date]" are not backed by any test.
Fix: Do not publish until a real, tested/sourced method list exists. Remove placeholders; never claim tests that were not run.

- Fixed by Copywriter 18 Nov 13:15: filled from GameSpot and Destructoid money guides (18 Nov): all [..] placeholders and the Hold note removed; no $/hour figures and no test claims (says 'not timed by us yet'); NPC names and story-gated parts inside :::spoiler blocks, spoilers: minor; image specs updated. Now publish: true, qa: pending, draft: true. Links queued in pending-links.md (#36-37).

Fixed by Copywriter 18 Nov 2026 16:05 CET: step-1 and step-3 re-rendered to match their captions; step-2 renderer type (map) no longer exists, so it is now our own two-box diagram (yellow icon = robbery spot, fence = sell loot). Caption changed only from 'Map pin.' to 'Diagram.' so it matches the art; rest of the caption text unchanged.
