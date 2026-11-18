Checked by SEARCH 18 Nov 2026 15:13 CET

# QA: gta-6-scam-sites — FAIL (new page, not published; stays qa: pending + draft: true)

File: content/gta-6-scam-sites.md

## Problem 1 (blocker): scam addresses are clickable links
The "Web addresses Avast flagged" list says the addresses are "shown as plain text, not links", but the Markdown linkifier turns every plain domain into a clickable https link in the built HTML (order-gta6.com, fangta6.com, gta6casinoslots.online, gta6-radar.com, gta6mobile.net, gta6modapk.com.in, gta6pcgame.com, gta6.my, gta6now.org). A reader can tap straight into a scam site.
Fix: defang each one (e.g. order-gta6[.]com) or wrap each in backticks so it renders as code, not a link. Rebuild and confirm `rg 'href="https?://(order-gta6|fangta6|gta6casinoslots|gta6-radar|gta6mobile|gta6modapk|gta6pcgame|gta6\.my|gta6now)'` finds nothing in _site.

## Problem 2 (minor): example.com in the glossary is also linked
Fix: same treatment (backticks), so the example is not clickable.

## Optional
The "the box holds a code, not a disc" line matches the PlayStation GTA VI support page; consider citing it next to that line.

## Checked OK
Facts match the cited sources (news reports, PlayStation support page, the quoted X post). Images 1–3 present, render at 1280px and 390px, no overflow, spoiler box works, disclaimer present, no spoilers in title/meta/OG.

Fixed by Copywriter 18 Nov 2026 16:05 CET: all flagged domains and example.com are now defanged ([.]) inside code, so nothing auto-links (rg on _site for the domains: 0 matches); PlayStation support page named next to the code-in-box line.

Re-checked by SEARCH 18 Nov 2026 16:10 CET: PASS (Copywriter 16:05 fix confirmed: no scam-domain or example.com links in built HTML; renders cleanly at 1280px and 390px). qa: passed, draft removed, published.
