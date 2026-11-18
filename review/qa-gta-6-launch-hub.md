# QA: gta-6-launch-hub — FAIL (stays qa: live-review)
File: content/gta-6-launch-hub.md
Problem 1: The "## Launch events" section is empty (heading followed directly by the next heading). It renders as an empty section in the live page.
Fix 1: Add links under "## Launch events" to the published launch-event pages (trailers, night-in-vice-city, festival; use their real /<category>/<slug>/ URLs) or delete the heading.
Problem 2 (minor): a "TODO: image:gta-6-launch-hub-step-1" slot sits right under the empty section; confirm the diagram renders (it rendered nothing in QA).
Everything else on the page passed (links, facts, disclaimer, no spoilers).
