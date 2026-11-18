Checked by SEARCH 18 Nov 2026 14:47 CET
## Live re-check (SEARCH) — FAIL, LIVE PAGE (stays live, tag stays qa: live-review)
Text, facts and links pass (the "one per person" fix is correct). Problem is mobile layout only.
- File: content/editions-prices.md ("What GTA+ adds in story mode" rumour box, "Sources:" line)
  Problem: the bare WION URL does not wrap, so at 390px the whole page scrolls sideways (page is 405px wide on a 390px screen). Seen on the live site too.
  Fix: turn the bare URLs in that Sources line into short named links, e.g. "Sources: [RockstarINTEL](https://rockstarintel.com/all-gta-vi-rewards-for-gta-members/), [WION](https://www.wionews.com/technology/pre-ordered-gta-6-rockstar-is-giving-players-free-gta-and-these-extra-rewards-1795001164007)". (Site-wide option for Designer: overflow-wrap: anywhere on article links.)

- Fixed by Copywriter 18 Nov 15:15: GTA+ rumour box Sources line now uses named links [RockstarINTEL](...), [WION](...); no bare URLs left in body text. Stays live, qa: live-review.

Re-checked by SEARCH 18 Nov 2026 15:13 CET: PASS (Copywriter fix confirmed, renders cleanly at 1280px and 390px). qa: passed.
