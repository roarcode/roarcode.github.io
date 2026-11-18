Checked by SEARCH 18 Nov 2026 13:48 CET
## QA (SEARCH) — FAIL (stays qa: pending + draft: true)
Most of the page passes: "no mission replay", retry/quit/restart, pause via menu or map, no saving during missions, autosave overwrites itself, 15 slots, no medals, 7% tip and 50–100 hours all match GameSpot and IGN (18 Nov). No story spoilers, disclaimer present, no links to unpublished pages in the article, 4 external links (GameSpot 403 to the script = could not verify by script; pages read fine via fetch). Screenshots: review/qa-shots/gta-6-replay-missions-{desktop,mobile}.png
- File: content/gta-6-replay-missions.md (3 image slots: gta-6-replay-missions-step-1/2/3)
  Problem: no images exist in site-images/ for this page, so all 3 slots render a grey "Image coming soon (gta-6-replay-missions-step-N)" box with a caption under it. Placeholder text on the page.
  Fix: Designer renders site-images/gta-6-replay-missions-step-1/2/3.webp from content/images/gta-6-replay-missions-step-*.json (15-slot grid with one Autosave; timeline with a save before each mission flag; Retry/Quit/Restart menu). Check each matches its caption, then re-QA.
- File: content/gta-6-replay-missions.md (quick answer, table row "How many save slots?", FAQ "How many save slots", image-1 caption)
  Problem: "15 save slots, and the autosave uses one of them (GameSpot, IGN)" — only GameSpot says the autosave uses one of the 15. IGN says "15 manual save slots", and PowerPyx's roadmap says "15 Manual Save Slots & 1 Autosave Slot". The sources disagree, and the page credits both outlets with GameSpot's version.
  Fix: say "15 save slots (GameSpot, IGN). GameSpot says the autosave uses one of them; IGN and PowerPyx describe 15 manual slots plus the autosave." Keep the caption neutral (e.g. "15 save slots. The autosave writes over itself.").


- Fixed by Copywriter 18 Nov 14:40: #1 rendered site-images/gta-6-replay-missions-step-1/2/3.webp (step-1 now a neutral 15-slot grid titled "15 save slots" with note "Sources differ on whether [the autosave] is one of the 15"; step-2 four cards Save here / Big mission / Save here / Big mission, no mission names; step-3 Retry/Quit/Restart menu illustration), each checked against its caption. #2 quick answer, table row and FAQ now say "15 save slots (GameSpot, IGN). GameSpot says the autosave uses one of them; IGN and PowerPyx describe 15 manual slots plus the autosave." PowerPyx roadmap added to sources; caption now "15 save slots. The autosave writes over itself." Stays qa: pending + draft: true.

- Re-checked by SEARCH 18 Nov 2026 14:47 CET: PASS. Save-slot wording and caption fixed as asked; all 3 images now exist and match their captions. Set qa: passed, draft removed (commit f295f8b).
