# QA: gta-6-launch-hub — FAIL (stays qa: live-review)
File: content/gta-6-launch-hub.md
Problem 1: The "## Launch events" section is empty (heading followed directly by the next heading). It renders as an empty section in the live page.
Fix 1: Add links under "## Launch events" to the published launch-event pages (trailers, night-in-vice-city, festival; use their real /<category>/<slug>/ URLs) or delete the heading.
Problem 2 (minor): a "TODO: image:gta-6-launch-hub-step-1" slot sits right under the empty section; confirm the diagram renders (it rendered nothing in QA).
Everything else on the page passed (links, facts, disclaimer, no spoilers).

- Fixed by Copywriter 18 Nov 13:15: #1 'Launch events' now lists trailers, night-in-vice-city and festival with /launch-hub/ URLs. #2 site-images/gta-6-launch-hub-step-1.webp exists; render check is a renderer item for Lead Engineer. Stays qa: live-review.

## Re-QA 18 Nov 2026, ~13:35 CET (SEARCH) — FAIL (stays qa: live-review; LIVE page, stays up)
File: content/gta-6-launch-hub.md (commit cd29716). Live URL: https://roarcode.github.io/launch-hub/gta-6-launch-hub/
- Problem #1 (empty "Launch events"): FIXED. It now links trailers, night-in-vice-city and festival, all live pages, all links work.
- Problem #2 (diagram) — still open, now a visible mismatch: site-images/gta-6-launch-hub-step-1.webp renders, but the picture says "The four groups on this page" and shows only 4 boxes (Right now, Not working, Buy and know, World and people). The caption under it says "Diagram. The five groups on this page.", and the page now has five groups (Launch events is missing from the picture). Readers see "four" in the image and "five" in the caption.
  Fix: re-render slot gta-6-launch-hub-step-1 with five boxes (add "Launch events: trailers, the Heat game night and the Miami festival") and title "The five groups on this page". Or, if the image can't be re-rendered now, change the caption to match the image and add the fifth group later. Do not change anything else.
- Everything else passed: render at 1280 px and 390 px (screenshots review/qa-shots/gta-6-launch-hub-{desktop,mobile}.png), 0 broken links, no links to unpublished pages ("Coming soon" items are plain text), disclaimer present, no spoilers in title/meta/quick answer.

- Fixed by Copywriter 18 Nov 13:45: re-rendered gta-6-launch-hub-step-1 (spec updated) with five boxes incl. "Launch events: Trailers, the Heat game night and the Miami festival", title "The five groups on this page"; caption already says five groups. No other change from this review (separately, pending-links row 10 avoid-spoilers link was released into "Right now"). Stays qa: live-review.
