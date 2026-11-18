# QA advisories on pages that PASSED (non-blocking)
1. content/jason-lucia.md and content/gta-6-online.md: "PlayStation's FAQ says 'Grand Theft Auto VI is a single-player experience'". True, but the quote is on https://www.playstation.com/en-us/games/grand-theft-auto-vi/ (and the PS Store pages), NOT on the cited https://www.playstation.com/en-us/support/games/gta-vi-support/. Fix: swap that URL in sources.
2. content/editions-prices.md: "one per person" for the $399.99 collector's box could not be verified in the Rockstar Newswire text (only "arrives on November 19... while supplies last" was found). Fix: cite the exact line or drop "one per person".
3. content/beginner-tips.md: "key cloner" and "six-star wanted" are GameSpot-sourced and were verified in GameSpot's Extended Look recap. The gun-limit rumour box cites gtaboom.com (low quality, but clearly labelled rumour).
4. content/gta-6-not-working.md: the "Rockstar status page (stamped 17 Nov) has no row for GTA VI" note is a dated snapshot; support.rockstargames.com is unreachable from the QA box. Re-check before leaving it in.

- Fixed by Copywriter 18 Nov 13:15: checked all 4 on the current files. #1 jason-lucia and gta-6-online cite https://www.playstation.com/en-us/games/grand-theft-auto-vi/ for the single-player quote; #2 editions-prices cites the Store FAQ 'one per person' via RockstarINTEL and GAME MODE; #3 no action needed; #4 not-working status note is a dated 12:50 CET snapshot with 'check it yourself' (Rockstar status page still unreachable from our box; @RockstarSupport re-checked, no GTA VI known-issues post). Pages stay qa: live-review.

## QA run 18 Nov 2026, ~13:35 CET (SEARCH) — new non-blocking advisories on pages that PASSED
5. content/gta-6-night-in-vice-city.md, table row "More info": [HEAT.com/ViceCity](https://HEAT.com/ViceCity) redirects to http://www.nba.com/heat/ViceCity, which returns HTTP 500 (could not verify; browser shows an error). https://www.nba.com/heat/ViceCity (https) currently lands on the Heat Vice City uniform page. Fix: link https://www.nba.com/heat/ViceCity directly, or the ESPN story already cited.
6. content/editions-prices.md, "Collector's merch": "The Rockstar Store's FAQ limits it to one per person" — RockstarINTEL says "limited to one per customer from the Rockstar Games store" and GAME MODE says "one box per person"; neither mentions an FAQ. Fix: "is limited to one per person at the Rockstar Store (RockstarINTEL, GAME MODE)".
7. Earlier advisories #1, #2 and #4 are resolved in the current files (checked this run).

- Fixed by Copywriter 18 Nov 13:45: #5 night-in-vice-city "More info" now links https://www.nba.com/heat/ViceCity directly (added to sources; ESPN story still cited). #6 editions-prices now reads "It is limited to one per person at the Rockstar Store (RockstarINTEL, GAME MODE)", no FAQ claim. Both live pages set to qa: live-review.

## QA run 18 Nov 2026, ~14:47 CET (SEARCH) — new non-blocking advisory on a page that PASSED
8. content/gta-6-night-in-vice-city.md, "More info" row: the plain text "HEAT.com/ViceCity" in the Source cell is auto-linked by the site and goes to http://www.nba.com/heat/ViceCity (HTTP 500, could not verify). Fix: write it as `HEAT.com/ViceCity` in backticks or reword ("the HEAT.com Vice City link") so it is not turned into a link.

- Fixed by Copywriter 18 Nov 15:15: #8 night-in-vice-city Source cell now reads "Rockstar YouTube (the HEAT.com Vice City link leads here)", so nothing auto-links to the http URL. Live page set to qa: live-review.
