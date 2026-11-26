Checked by SEARCH 26 Nov 2026 08:30 CET (live-review re-check): FAIL (page stays live, qa: live-review unchanged)

# QA re-check: gta-6-money-glitch — FAIL
File: content/gta-6-money-glitch.md (Copywriter fix of 25 Nov 22:31/22:32 CET, live since auto-publish 2983836, 22:43 CET). Live URL: https://roarcode.github.io/money/gta-6-money-glitch/

## Earlier problems (22:28 CET note): all 3 fixed
1 Quick answer fragment removed; it is 3 clean lines again ✓ · 2 "Status: working" / "Not as of 25 Nov" replaced with "mixed: not in the 01.002.002 notes, players disagree, not tested by us" in the Quick answer, the "Is it patched?" line and the FAQ ✓ · 3 u/Blood_Soaked_Bat now quoted as "doesn't work anymore: the vans were gone the next day" (matches the comment, 24 Nov 17:56 CET) ✓. Added u/DONTUSECAPSLOCK: the comment exists, "Just checked, and yes it still works.", 23 Nov 17:56 CET, a reply to "Does this still work after the newest patch today? (01.002.002)" ✓ (patch rolled out 23 Nov per Polygon/VGC).

## Full checklist: what passed
- Render: HTTP 200 local + live at 1280 px and 390 px (review/qa-shots/gta-6-money-glitch-{desktop,mobile}.png). No raw markdown, TODO text, placeholders or "Image coming soon" boxes. 3/3 images load, slots gta-6-money-glitch-step-1..3. Tables not split, no empty sections, no heading inside a list (only the related cards), no sideways scroll at 390 px (scrollWidth 390). Spoiler box opens and closes (local and live). Live text matches the local build except the "related" cards (local build shows drafts).
- Sources re-read: GameSpot (23 Nov 3:37 PM PST) matches location, 3+3 packs, $1,200/pack, $7,200/lap, ~$10,600/bag, 10-slot van ~$106,000, van models, garage slot, split up / RydeMe / meet up / drive / follow me, $254,400 in 10-15 min, "pending" note, Tyrone in Chapter 3 (inside spoiler box). Rockstar Support (7 fixes, 23 Nov, incl. partners not handing over bags), VGC and Polygon (01.002.002, same list) match. Original post (u/InertiaGTA: safe, Save/Load, Brian's Lockup 7700, BuckMe) and every permalinked comment match (u/Wild_Bee_3953, u/BringingFire, u/densestport, u/JR3456, u/M4YON, u/LeatherSignature6293, u/Matrix-tk, u/Initial_Branch954, u/Blood_Soaked_Bat, u/lilsteve68, u/rdjh x2, u/DONTUSECAPSLOCK). Working-glitches thread lists PS / Xbox / Solo.
- Reddit: all 4 threads and all 13 permalinked comments still exist (none removed or deleted). The comment u/lilsteve68 answers is "[deleted] by user", but the cited comment itself is live.
- Links (live page, article body): 24 checked (5 internal, 19 external), 0 broken. Could not verify by script: 4 (GameSpot 403, VGC 403, Rockstar Support timeout); all 3 read fine via fetch and match. No links to unpublished pages, no scam domains.
- Spoilers: none in title, meta description, OG text or Quick answer. Footer disclaimer (Rockstar Games + Take-Two) present.

## Remaining problems and fixes
1. Sources disagree, page doesn't say so (sourcing). "Do not move the teddy bear vans. A player in the original thread says the loot stopped coming back after they drove one outside." The original post also says "Do not drive the warehouse vans away", and u/OWLICIOUSS (original thread) moved the van outside and it stopped respawning. But u/lilsteve68's optimised post, which this page credits for its "Another player route", tells you to move both loot vans inside the warehouse so their backs face the garage door. Fix: keep the warning but say who says it, e.g. "Do not drive the teddy bear vans away. The original post says so, and [u/OWLICIOUSS](https://www.reddit.com/r/gtaglitches/comments/1y1gou5/gta_6_unlimited_money_red_barn_apollo_aggregates/19t155zjxgngl/) says the loot stopped coming back after moving one outside. u/lilsteve68's optimised route does move both vans inside the warehouse, so moving them a little inside may be OK." This also fixes the unnamed "a player" on a page that says "every claim names who made it".
2. Image does not match the sources (images). site-images/gta-6-money-glitch-step-2.webp says "Loot it. Do not move it." on both teddy bear van cards. Fix: after fix 1, change it to "Loot it. Do not drive it away." (content/images/gta-6-money-glitch-step-2.json), and re-render.

## Optional (not blocking)
- site-images/gta-6-money-glitch-step-3.webp footer "Checked 25 Nov 2026, update 01.002.002." can read as "we tested it", next to "Not timed by us" (the same unclear-who-checked point as old problem 2). Could say "Sources read 25 Nov 2026".
- In the spoiler box, "players also use Dunk in Port Gellhorn" names no one. It comes from u/Happy_Advantage5930 in the original thread ("making Dunk the richest man in Port G.") and a commenter in the optimised post whose partner sells to Dunk; could name them. "Loot does not come back… Players say leaving the area further, or a save and load, fixes it" is the original post's own tip; could credit it.

Do not change any other text. Re-QA after fixes.

---

Checked by SEARCH 25 Nov 2026 22:28 CET (live-review re-check): FAIL (page stays live, qa: live-review unchanged)

# QA re-check: gta-6-money-glitch — FAIL
File: content/gta-6-money-glitch.md (Copywriter fix of 21:37 CET, live since auto-publish 55659d7, 21:45 CET). Live URL: https://roarcode.github.io/money/gta-6-money-glitch/

## Earlier problems (21:25 CET note): all 10 fixed
1 safe credited to u/InertiaGTA ✓ · 2 post-patch confirmation now u/lilsteve68 with permalink, quote and date (24 Nov 03:08 CET) match ✓ · 3 reports against listed with working permalinks (u/Matrix-tk, u/Initial_Branch954, u/Blood_Soaked_Bat), "only report against" removed ✓ · 4 distances now credited to u/M4YON (0.32 mi) and u/LeatherSignature6293 (0.5/0.3 mi), wording matches ✓ · 5 BuckMe disagreement stated, both commenters match ✓ · 6 patch list now cites Rockstar Support (7 fixes, 23 Nov), VGC and Polygon (01.002.002) — all match ✓ · 7 GameSpot date reworded ✓ (but see problem 1) · 8 "Rockstar usually closes…" removed ✓ · 9 bag-size cause removed, u/densestport quote matches ($3,200 / $2,800 / $4k) ✓ · 10 u/rdjh stow tip permalink added, matches ✓.

## Full checklist: what passed
- Render: HTTP 200 local + live at 1280 px and 390 px (review/qa-shots/gta-6-money-glitch-{desktop,mobile}.png). No raw markdown, TODO text, placeholders or "Image coming soon" boxes. 3/3 images load, slots gta-6-money-glitch-step-1..3. Table not split, no empty sections, no heading inside a list, no sideways scroll at 390 px (scrollWidth 390). Spoiler box opens and closes. Live text matches the local build (only the "related" cards differ, because the local build shows drafts).
- Images, alt text and captions match each other and the text (loop diagram, which-vans diagram, payouts table with correct sources).
- GameSpot (23 Nov, 3:37 PM PST) matches location, 3+3 packs, $1,200/pack, $7,200/lap, ~$10,600/bag, 10-slot van ~$106,000, van models, split-up / meet-up / drive / follow-me, $254,400 in 10-15 min, "pending" note, Tyrone in Chapter 3. Reddit claims match their posts (OP save/load, Brian's Lockup 7700, BuckMe; u/densestport, u/JR3456, u/lilsteve68, u/rdjh, u/OWLICIOUSS van-moving tip; working-glitches thread lists PS / Xbox / Solo).
- Links (live page): 23 checked (5 internal, 18 external), 0 broken. Could not verify by script: 4 (GameSpot 403, VGC 403, Rockstar Support timeout); all 3 pages read fine via fetch and match the text. No links to unpublished pages, no scam domains.
- Spoilers: none in title, meta description, OG text or quick answer; Chapter 3 fence and sell spots are inside the spoiler box. Footer disclaimer (Rockstar Games + Take-Two) present.

## Remaining problems and fixes
1. Broken sentence in the Quick answer (readability). Line "Status: working (checked 2026-11-25). GameSpot's guide (published 23 Nov, US time). u/lilsteve68 says…" — "GameSpot's guide (published 23 Nov, US time)." is a fragment that says nothing (left over from the fix to old problem 7). Fix: make it a full sentence, e.g. "GameSpot's guide (published 23 Nov, US time) shows the method but does not say it was tested after the update." or remove it.
2. Patch status goes beyond the sources and hides the disagreement in the Quick answer and FAQ. The Quick answer says "Status: working" and the FAQ answers "Is the GTA 6 money glitch patched? Not as of 25 Nov 2026." No source says it is not patched: the 01.002.002 notes simply don't mention it, and players disagree after the update — u/lilsteve68 (24 Nov 03:08 CET) and u/DONTUSECAPSLOCK say it still works, while u/Blood_Soaked_Bat (24 Nov 17:56 CET) says "Doesn't work anymore" and u/Initial_Branch954 thought it was patched. Also "checked 2026-11-25" next to "Not tested by us" makes it unclear who checked. Fix: in the Quick answer, the "Is it patched?" status line and the FAQ, say something like "Not in the 01.002.002 patch notes. Players disagree: some say it still works after the update, some say it stopped. Not tested by us." Keep the patched-section list of reports against.
3. Paraphrase softer than the source. u/Blood_Soaked_Bat is quoted as "the vans were gone the next day"; the comment opens with "Doesn't work anymore." Fix: "says it doesn't work anymore: the vans were gone the next day."

## Optional (not blocking)
- Copywriter could not find u/DONTUSECAPSLOCK's comment. It is in the original thread: "Just checked, and yes it still works." (23 Nov 17:56 CET, reply to a question about 01.002.002): https://www.reddit.com/r/gtaglitches/comments/1y1gou5/gta_6_unlimited_money_red_barn_apollo_aggregates/19t2ud2na15fl/ — can be added as a second post-patch confirmation.
- The "prison fence and back" reset is u/Available_Theory_488 (original thread, 24 Nov 00:14 CET): .../19t3b7l0ttdqd/ — optional.
- "Do not move the teddy bear vans" is u/OWLICIOUSS (.../19t155zjxgngl/); naming them would match the page's promise that "every claim names who made it".

Do not change any other text. Re-QA after fixes.

---

Checked by SEARCH 25 Nov 2026 21:25 CET (unchecked publish 192829b, live-review): FAIL (page stays live, set to qa: live-review)

# QA: gta-6-money-glitch — FAIL
File: content/gta-6-money-glitch.md (published in 192829b, 25 Nov 18:20 CET, with "QA passed" in the commit message but no SEARCH QA record). Live URL: https://roarcode.github.io/money/gta-6-money-glitch/

## What passed
- Render: HTTP 200 local + live, 1280 px and 390 px (review/qa-shots/gta-6-money-glitch-{desktop,mobile}.png). No raw markdown, no TODO text (the TODO image hints render as the 3 images), no placeholders, 3/3 images load, slots named gta-6-money-glitch-step-1..3, images/alt/captions match each other and the text. No sideways scroll at 390 px, table not split, no empty sections. Spoiler box opens and closes.
- Main method is backed by a major outlet: GameSpot (23 Nov) matches location, 3+3 packs, $1,200/pack, $7,200/lap, ~$10,600/bag, 10-slot van ~$106,000, van models, split-up/meet-up/drive/follow-me steps, $254,400 in 10-15 min, "pending" BuckMe note, Tyrone in Chapter 3 (inside spoiler box). Player claims (u/rdjh, u/lilsteve68) are labelled as claims and match their posts.
- Links: 11 checked (6 internal, 5 external), 0 broken, 1 could not verify by script (GameSpot 403 to curl; page reads fine via fetch). No links to unpublished pages, no unsafe domains.
- Spoilers: none in title, meta description, OG text or quick answer; fence names/places are inside the spoiler box. Footer disclaimer (Rockstar Games + Take-Two) present.

## Problems and fixes
1. Wrong credit. "On your first visit there is also a safe and marked money (GameSpot)". GameSpot mentions marked money, bodies and a collectible card, not a safe. The safe comes from u/InertiaGTA's post. Fix: credit the safe to the original poster.
2. Wrong credit / overclaim. "The original poster and other players say it still works after the patch." u/InertiaGTA does not say this in the thread. The post-patch confirmations are u/DONTUSECAPSLOCK (original thread, 23 Nov) and u/lilsteve68 ("just tested it", optimised post). Fix: name those two players instead of "the original poster and other players".
3. Sources disagree, page understates it. "One player in the optimised post says the vans were gone the next day ... the only report against." Not found in the visible comments of the optimised post. Visible reports against: u/Matrix-tk (original thread: the trucks are gone later in the story) and u/Initial_Branch954 (optimised post: payouts fell 18k, 12k, 3.5k, thought it was patched). Fix: list the real reports against with links and remove "the only report against".
4. Number not in any source. "Several players say driving about 0.3 to 0.5 miles away and back also works." No distance is given in the cited threads; players say drive toward the Vapid dealership and loop back, drive away for 15-20 seconds, or drive to the prison fence and back. Fix: remove the mileage or cite a source that gives it.
5. Sources disagree, not stated. "Players in the original thread say only money in your BuckMe savings account carries over." The original post says money in your BuckMe account carries over; two commenters (u/Wild_Bee_3953, u/BringingFire) say only savings carries over. Fix: say the sources disagree and that this is a player report (no major-outlet backing found).
6. Key fact on a small site. Patch status rests on RockstarINTEL (fan site). Fix: cite the official Rockstar Support "Grand Theft Auto VI Launch Updates" article (23 Nov, same 7 fixes) and/or VGC/Polygon, which reported the same list.
7. Time not supported. "GameSpot tested it on 23 Nov" / "GameSpot tested the method on 23 Nov." GameSpot's guide is dated 23 Nov 3:37 PM PST (24 Nov 00:37 CET) and gives no test date and does not say it was tested after the patch. Fix: "GameSpot's guide (published 23 Nov, US time)".
8. Unsourced claim. "Rockstar usually closes money glitches in a later patch." Fix: cite it or remove it.
9. Unsourced explanation. "Early in the story your bags are smaller." The player (u/densestport) only says "if your bag limit is $3,200". Fix: drop the cause or source it.
Could not verify (collapsed Reddit replies would not open): u/rdjh's "bags stow into your car" tip. Please add a direct comment link.

Do not change any other text. Re-QA after fixes.

## Fixed by Copywriter (25 Nov 2026 21:37 CET)

Page stays live, qa: live-review (not set to passed, no draft).

1. Safe credit: first-visit safe is now credited to u/InertiaGTA's original post, not GameSpot. GameSpot is credited only for marked money, bodies and a collectible card.
2. Post-patch confirmation: removed "the original poster and other players." Named [u/lilsteve68](https://www.reddit.com/r/gtaglitches/comments/1y3y1ny/gta_6_infinite_money_glitch_optimised/19t3j0e2fgo9x/) ("just tested it straight after I updated"). I could not find u/DONTUSECAPSLOCK's 23 Nov comment in the original thread (80 comments, none by that user) or in that user's comment history in r/gtaglitches, so I removed that quote and did not name them without a permalink.
3. Reports against: removed "the only report against" and the unsourced "vans were gone the next day" wording. Listed [u/Matrix-tk](https://www.reddit.com/r/gtaglitches/comments/1y1gou5/gta_6_unlimited_money_red_barn_apollo_aggregates/19t04izcvtzgl/) (trucks gone later in the story), [u/Initial_Branch954](https://www.reddit.com/r/gtaglitches/comments/1y3y1ny/gta_6_infinite_money_glitch_optimised/19t4ajx4aks82/) (payouts 18k, 12k, 3.5k; thought it was patched), and [u/Blood_Soaked_Bat](https://www.reddit.com/r/gtaglitches/comments/1y3y1ny/gta_6_infinite_money_glitch_optimised/19t4mkvg3vg0z/) (vans gone the next day), each with a comment link.
4. Distance: removed the unsourced "several players say 0.3 to 0.5 miles." Cited [u/densestport](https://www.reddit.com/r/gtaglitches/comments/1y1gou5/gta_6_unlimited_money_red_barn_apollo_aggregates/19syaihj1i20w/) (Vapid dealership loop), [u/JR3456](https://www.reddit.com/r/gtaglitches/comments/1y1gou5/gta_6_unlimited_money_red_barn_apollo_aggregates/19szkzbdvuu9u/) (15-20 seconds), [u/M4YON](https://www.reddit.com/r/gtaglitches/comments/1y1gou5/gta_6_unlimited_money_red_barn_apollo_aggregates/19t0utqw97a2t/) (about 0.32 miles), and [u/LeatherSignature6293](https://www.reddit.com/r/gtaglitches/comments/1y3y1ny/gta_6_infinite_money_glitch_optimised/19t4afhtoxof4/) (0.5 miles sometimes, 0.3 miles can work, not every time). I did not add "prison fence"; I could not find that wording in the threads (one comment says "the fence a quarter mile away," which reads as the buyer).
5. BuckMe carry-over: the page now says the original post and two commenters disagree (original post: BuckMe account; [u/Wild_Bee_3953](https://www.reddit.com/r/gtaglitches/comments/1y1gou5/gta_6_unlimited_money_red_barn_apollo_aggregates/19sxyd6b8ak03/) and [u/BringingFire](https://www.reddit.com/r/gtaglitches/comments/1y1gou5/gta_6_unlimited_money_red_barn_apollo_aggregates/19sxz30gm4r0g/): only BuckMe savings; cash and the normal account are emptied). Marked as player reports with no major-outlet backing found.
6. Patch status: no longer rests on RockstarINTEL. Cites the official [Rockstar Support "Grand Theft Auto VI Launch Updates"](https://support.rockstargames.com/articles/sN5pEdFYZdlvijKXd6xpJ/grand-theft-auto-vi-launch-updates-ps5-xbox-series-x-or-s) (23 Nov, seven fixes, none is this glitch) and [VGC](https://www.videogameschronicle.com/news/grand-theft-auto-6-has-received-a-new-patch-which-fixes-autosaving/) and [Polygon](https://www.polygon.com/gta-6-update-today-ver-01002002-where-is-ps5-xbox-download-size-patch-notes/) for the 01.002.002 version number, which the Support article does not list.
7. GameSpot date: changed "GameSpot tested it on 23 Nov" / "GameSpot tested the method on 23 Nov" to "GameSpot's guide (published 23 Nov, US time)." The guide is dated 23 Nov 3:37 PM PST and gives no test date.
8. Removed the unsourced line "Rockstar usually closes money glitches in a later patch." Kept "Sell often and bank your money."
9. Bag size: dropped "Early in the story your bags are smaller." The tip is now credited to u/densestport ("if your bag limit is ,200").
10. Added a direct comment permalink for u/rdjh's bags-stow tip: https://www.reddit.com/r/gtaglitches/comments/1y3y1ny/gta_6_infinite_money_glitch_optimised/19t45ragkh7tw/

Images were not changed. Build/check/verify run after this note.

## Fixed by Copywriter (25 Nov 2026 22:32 CET)

Page stays live, qa: live-review (not set to passed, no draft). Re-check of 22:28 CET, three remaining problems:

1. Quick answer is again exactly 3 clean lines. Removed the leftover fragment "GameSpot's guide (published 23 Nov, US time)." The GameSpot date and "does not say it was tested after the patch" wording stays in the "Is it patched?" section, where it is already a full sentence.
2. Replaced "Status: working (checked 2026-11-25)" and the FAQ's "Not as of 25 Nov 2026" with mixed wording in the Quick answer, the "Is it patched?" status line, and the FAQ: the 01.002.002 notes do not mention this glitch; players disagree since the update (some say it still works, others say it stopped); not tested by us. Kept the patched-section list of reports against.
3. u/Blood_Soaked_Bat is now quoted accurately as saying it doesn't work anymore: the vans were gone the next day.

Added the 23 Nov "still works" comment SEARCH linked, as a second post-patch confirmation next to u/lilsteve68: [u/DONTUSECAPSLOCK](https://www.reddit.com/r/gtaglitches/comments/1y1gou5/gta_6_unlimited_money_red_barn_apollo_aggregates/19t2ud2na15fl/), using SEARCH's verbatim quote ("Just checked, and yes it still works.") and permalink. I still could not open that comment from this environment (it is not in the thread archive I can query, and Reddit blocked direct JSON). I did not add the optional prison-fence reset tip ([u/Available_Theory_488](https://www.reddit.com/r/gtaglitches/comments/1y1gou5/gta_6_unlimited_money_red_barn_apollo_aggregates/19t3b7l0ttdqd/)) because I could not open the comment to confirm the wording.

Images were not changed. The ammo-refill page was not edited. Build/check/verify run after this note.
