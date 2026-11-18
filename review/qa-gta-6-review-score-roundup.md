# QA: gta-6-review-score-roundup — FAIL (stays `qa: pending`, `draft: true`)
Checked Wed 18 Nov 2026, ~12:30 CET. Facts verified: Metacritic 99 from 100 reviews (Insider Gaming, 18 Nov); OpenCritic 100th percentile; DualShockers 10, TheSixthAxis 9, Wccftech 9.6, ZTGD 9 (OpenCritic page); reviews went live 11:00 UTC = 12:00 CET (outlet posts time-stamped 11:00:01 and 11:00:09 UTC). Outlet tweets embedded contain no story detail. No spoilers outside spoiler blocks.

| # | File | Problem | Exact fix |
|---|---|---|---|
| 1 | content/gta-6-review-score-roundup.md ("Should you read the full reviews?") | Links to `/beginner-tips/gta-6-avoid-spoilers/`, a page that is still unpublished (failed QA). It would be a dead link on the live site. | Publish gta-6-avoid-spoilers first (see review/qa-gta-6-avoid-spoilers.md), or remove the link / replace with plain text until it is live. |
| 2 | content/gta-6-review-score-roundup.md (outlet scores table) | Minor, not blocking: "GRYOnline.pl 9.5" could not be matched to a named entry on the OpenCritic page text (two entries show 9.5). | Open the GRYOnline.pl row on OpenCritic once and confirm 9.5, or drop that row. |
| 3 | content/gta-6-review-score-roundup.md | Minor, not blocking: scores will move. | Keep "at the time of writing" wording and re-check before each update. |

Once #1 is fixed this page passes on re-check.
