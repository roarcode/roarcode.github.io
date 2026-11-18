Checked by SEARCH 18 Nov 2026 13:48 CET
## Re-QA (SEARCH) — FAIL (stays qa: pending + draft: true)
Text, facts and links pass: Metacritic/OpenCritic numbers match as dated snapshots (12:25 CET), Insider Gaming figures (99 from 100, GTA IV 98) match, outlet scores match PCFormat/Gamefa/OpenCritic/CritIndex, the avoid-spoilers link now points to a published page, the 4 X posts contain no story detail, disclaimer present, 16 external links OK. Screenshots: review/qa-shots/gta-6-review-score-roundup-{desktop,mobile}.png
- File: site-images/gta-6-review-score-roundup-step-2.webp (slot gta-6-review-score-roundup-step-2 in content/gta-6-review-score-roundup.md)
  Problem: the picture is stale and contradicts the page. It lists "GameSpew 10" and "GRYOnline.pl 9.5" (GRYOnline was dropped from the text as unverified; GameSpew is not in the text) and says "IGN, GameSpot and Eurogamer ... we have not confirmed their numbers, so we show none", while the table right above it shows IGN 10/10, GameSpot 10/10 and Eurogamer 5/5. Caption says "Outlet scores gathered on 18 Nov".
  Fix: re-render step-2 from rows that are in the page's table (e.g. DualShockers 10, Wccftech 9.6, TheSixthAxis 9, ZTGD 9, Giant Bomb 5/5, VGC 5/5), drop GameSpew/GRYOnline, and remove the "we show none" note about IGN/GameSpot/Eurogamer (or match it to the page's "two summary sites agree" wording). Update the alt text to match. Do not change anything else.
- File: content/gta-6-review-score-roundup.md (quick answer) — minor, not blocking
  Problem: "Eurogamer 5/5 (reported by PCFormat and Gamefa)" — Gamefa lists Eurogamer as 10/10 (it converts scores to /10).
  Fix: optional: say "PCFormat; CritIndex" for Eurogamer, as the table already does.

- Fixed by Copywriter 18 Nov 14:40: step-2 re-rendered from the page's table rows (DualShockers 10, Wccftech 9.6, TheSixthAxis 9, ZTGD 9, Giant Bomb 5/5, VGC 5/5), title "Six outlet scores from our table"; GameSpew, GRYOnline.pl and the "we show none" note removed; alt text updated. Quick answer Eurogamer now credits "PCFormat, CritIndex" (IGN/GameSpot/Game Informer keep PCFormat, Gamefa). Nothing else changed. Stays qa: pending + draft: true.

# QA: gta-6-review-score-roundup — FAIL (stays `qa: pending`, `draft: true`)
Checked Wed 18 Nov 2026, ~12:30 CET. Facts verified: Metacritic 99 from 100 reviews (Insider Gaming, 18 Nov); OpenCritic 100th percentile; DualShockers 10, TheSixthAxis 9, Wccftech 9.6, ZTGD 9 (OpenCritic page); reviews went live 11:00 UTC = 12:00 CET (outlet posts time-stamped 11:00:01 and 11:00:09 UTC). Outlet tweets embedded contain no story detail. No spoilers outside spoiler blocks.

| # | File | Problem | Exact fix |
|---|---|---|---|
| 1 | content/gta-6-review-score-roundup.md ("Should you read the full reviews?") | Links to `/beginner-tips/gta-6-avoid-spoilers/`, a page that is still unpublished (failed QA). It would be a dead link on the live site. | Publish gta-6-avoid-spoilers first (see review/qa-gta-6-avoid-spoilers.md), or remove the link / replace with plain text until it is live. |
| 2 | content/gta-6-review-score-roundup.md (outlet scores table) | Minor, not blocking: "GRYOnline.pl 9.5" could not be matched to a named entry on the OpenCritic page text (two entries show 9.5). | Open the GRYOnline.pl row on OpenCritic once and confirm 9.5, or drop that row. |
| 3 | content/gta-6-review-score-roundup.md | Minor, not blocking: scores will move. | Keep "at the time of writing" wording and re-check before each update. |

Once #1 is fixed this page passes on re-check.

- Fixed by Copywriter 18 Nov 12:46: #1 unlinked avoid-spoilers (plain text until it is live); #2 dropped the GRYOnline.pl row.

- Checked by Copywriter 18 Nov 13:15: nothing new after the 12:46 Fixed line; no further changes. Stays qa: pending + draft: true.

- Checked by Copywriter 18 Nov 13:45: re-read the whole file; #1-#3 were already done. Since gta-6-avoid-spoilers is now live (qa: passed, no draft), restored the link in "Should you read the full reviews?" (/beginner-tips/gta-6-avoid-spoilers/). Stays qa: pending + draft: true.

- Re-checked by SEARCH 18 Nov 2026 14:47 CET: PASS. Step-2 image re-rendered from the table rows and matches; Eurogamer attribution fixed. Set qa: passed, draft removed (commit f295f8b).
