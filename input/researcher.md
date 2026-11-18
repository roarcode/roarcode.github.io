# What players are asking and struggling with (researcher input)

Compiled Wed 18 Nov 2026, about 12:00-13:00 CET (Europe/Ljubljana). NZ unlocked about 12:00 CET; Europe unlocks 00:00 CET tonight.
Method: research only; no accounts, no logins, no blocks bypassed. Gameplay and technical topics only. **No story spoilers in this file.** Two items touch spoiler-adjacent material (trophies, spoiler avoidance); they are marked with a warning and contain no story content.

## 0. Evidence quality and limits (read first)

Note on links: X links were all checked against the collected data. Reddit, ResetEra, Push Square and Sportskeeda URLs come from search results and return 403/405 to scripted fetches from this box, so I could not open them directly; verify before citing on the site.

| Platform | What I did | What I could and could not see |
|---|---|---|
| **X** | 13 searches via the X connector (`search_posts_all`), windows from 15 Nov 12:00 UTC to 18 Nov 11:10 UTC, plus earlier handle lookups. | **311 unique posts collected, 305 mention GTA VI.** The connector returns at most 25 posts per call, so this is a sample, not a census. Raw data: `/workspace/gta6-guides/input/raw/x_posts_all.json`. By day (UTC): 15 Nov 14, 16 Nov 47, 17 Nov 78, 18 Nov 166; 44 of them after the NZ unlock (11:00 UTC). |
| **Reddit** | 5 Google-style searches (`site:reddit.com`) plus one public page fetch of r/GTA6 (confirms the subreddit exists, shows a pinned "Release Day Plan Regarding Spoilers/NSFW" post). Direct Reddit access from this box returns 403 "Blocked"; I did not try to get around it. | **9 GTA VI threads seen, all from search snippets and dated Apr-Oct 2026, none from the last 72 h.** So Reddit is thin for "right now". Threads: r/GTA6 (3), r/GTA6unmoderated (2), r/playstation (2), r/PS5pro (1), r/GTA (1). |
| **ResetEra** | 5 search results; 1 thread opened (2 Nov, PS5 firmware requirement raised to 14.22). | Newest threads are not indexed by search yet. |
| **GTAForums** | 5 search results; 1 page fetch failed (404). | Search summary only; one summary says preload "midnight local on 12 Nov", which **conflicts with the official 10 Nov** (PlayStation Blog), so I ignored it. |
| **PlayStation** | Opened PlayStation's GTA VI support page (official). Read Push Square, Polygon, Kotaku, The Big Lead, playstationinfo.de, Vice, IGN SEA (via search results). | PlayStation Community forum threads: none surfaced by search. |
| **Xbox** | Xbox Wire and Xbox Support results via search (service-outage help page, cloud gaming post). | Xbox forum/Microsoft Answers threads: none surfaced by search. |
| **Rockstar Support** | Search only. Direct fetches of support.rockstargames.com return HTTP 500 for me. | Used the r/GTA6 mirror of Rockstar's purchase-support FAQ instead. |
| **YouTube comments** | Searched; no comment pages accessible. | **Blocker: no YouTube comment data.** |
| **Steam** | Not applicable: no PC release. | n/a |

**How to read the counts.** "X keyword hits" = posts in my 305-post sample matching a keyword pattern for that topic (approximate, not hand-classified; one post can count in several topics). "Asks" = hits that contain a question mark and are from individual accounts. Many hits are **templated "how to be ready" posts from content accounts**; they show what people are being told to worry about (supply), not necessarily independent questions (demand). I flag which is which in the notes. Impressions shown are X's public numbers at pull time.

---

## 1. Top 15 pain points / questions

Coverage key: **YES** = a page on the site (live or in `content/`) answers it; **PARTIAL** = mentioned but not answered fully; **NO** = gap. I checked `/workspace/gta6-guides/content/` and the live sitemap (https://roarcode.github.io/sitemap.xml lists 16 URLs; several files in `content/` are not yet in the sitemap, e.g. `gta-6-download-stuck`, `gta-6-error-codes`, `gta-6-not-working`, `gta-6-ps5-fixes`, `gta-6-xbox-fixes`, `is-gta-6-out`).

### 1. "Do I need a PS5 system update to play?" (mandatory firmware 26.07-14.23.00)
- **What:** PlayStation Support US (X, 17 Nov 8:25 pm ET) says a PS5 system update is **required before playing GTA VI**; install before midnight on 19 Nov. Version 26.07-14.23.00, about 1.27-1.3 GB, released 17 Nov. Preloading does **not** replace it. Earlier (2 Nov) the requirement was raised to 14.22 for preload. Sony's changelog says only "security fixes".
- **Frequency:** 22 X keyword hits in the sample (5 asks), almost all in the last 24 h, e.g. a Polygon post at 11:00 UTC today. Strongest "new today" signal I found.
- **Sources:** https://www.playstation.com/en-us/support/games/gta-vi-support/ (official: "Update PS5 console system software"), https://www.pushsquare.com/news/2026/11/gta-6-requires-new-ps5-firmware-update-to-play, https://kotaku.com/ps5-gets-last-minute-software-update-thats-required-to-play-gta-6-2000757868 ; also https://www.polygon.com/gta-6-grand-theft-auto-playstation-mandatory-ps5-update/ (headline frames it as an anti-piracy update; that framing is Polygon's, Sony says "security fixes"), https://www.theverge.com/games/1036395/if-you-want-to-play-gta-vi-on-ps5-tonight-download-yesterdays-firmware-update-first and https://www.resetera.com/threads/after-sony-set-the-firmware-requirement-for-gta-6-on-ps5-to-14-10-they-raised-it-again-pre-release-to-firmware-14-22-which-just-released-today.1676426/
- **Caveat:** The Big Lead quotes dataminer Lance McDonald saying older firmware loses all PSN access immediately (no 14-day grace). Single source; label as reported (https://www.thebiglead.com/ps5-update-gta-6-launch/). Several X accounts add that the game "won't launch" without it; PlayStation's wording is "required before playing".
- **Site coverage: PARTIAL.** Pages tell people to run "System Software Update and Settings" as a generic fix (e.g. `gta-6-ps5-fixes.md` line 40, `launch-night-checklist.md` line 64), but **none mentions version 14.23 or says it is mandatory** (`grep 14.23` returns nothing).

### 2. Unlock time / "is it out yet" in my time zone
- **What:** Midnight local on 19 Nov, NZ first. Many posts ask or explain "what time", "NZ first", "ET is 06:00 CET".
- **Frequency:** 84 X keyword hits (27 asks). Highest volume of any topic.
- **Sources:** https://x.com/davesteele71/status/2122390461268553817 , https://x.com/ScarH5200/status/2122743183637356818 , https://x.com/zpersonss/status/2123008062000607737 ; official: https://www.playstation.com/en-us/support/games/gta-vi-support/ , https://blog.playstation.com/2026/11/10/pre-load-grand-theft-auto-vi-on-ps5-starting-today/
- **Site coverage: YES** (`release-time.md`, `is-gta-6-out.md`, `launch-night-checklist.md`).

### 3. Preload: size (212 GB), free space, how long, did it finish
- **What:** "up to 212 GB", clear space, auto-install in Rest Mode, how long at X Mbps; Xbox patch sizes add more (see 10).
- **Frequency:** 81 X keyword hits (26 asks); most are templated "how to be ready" posts from content accounts, e.g. https://x.com/IAMTHECLIPPER1/status/2123008323398017029 , https://x.com/viceplugdotcom/status/2122077210999767392 .
- **Sources:** official https://www.playstation.com/en-us/support/games/gta-vi-support/ ; Vice patch article https://www.vice.com/en/article/gta-6-second-day-one-patch-ps5-xbox/ ; https://gtaforums.com (search summary, unverified).
- **Site coverage: YES** (`preload-size.md`, `launch-night-checklist.md`, `gta-6-preload-not-starting.md`).

### 4. Download stuck / not starting / slow
- **What:** PlayStation's official fix: Downloads/Uploads > select GTAVI > Pause > Resume; else Cancel and Delete and re-download from Game Library; check account, internet, storage and system software. Reddit-style folk fixes (restart, DNS, Safe Mode cache) come from older GTA threads.
- **Frequency:** only 13 X hits (1 ask) in the sample; real demand will spike from tonight. Reddit evidence is older games' threads (GTA V 2014/2022), not GTA VI.
- **Sources:** https://www.playstation.com/en-us/support/games/gta-vi-support/ , https://x.com/cjai_gta/status/2122118252293705953 (relays the PlayStation steps), https://www.reddit.com/r/GrandTheftAutoV/comments/2mi6y6/gta_v_preload_stuck/ (old precedent)
- **Site coverage: YES** (`gta-6-download-stuck.md`, `gta-6-preload-not-starting.md`, `gta-6-ps5-fixes.md`).

### 5. Physical edition = code-in-box, no disc: redeeming, unreadable/used codes, import codes, retailer refunds
- **What:** Box has a download code only (PlayStation page: "A disc will not be included"). Posts say some boxes had unreadable, missing or already-used codes (**reported, not confirmed by Rockstar**); retailers reportedly refunded or redirected buyers. India post says an imported box may not redeem on a local PSN account. Strong #NoDiscNoBuy petition noise.
- **Frequency:** 49 X keyword hits (16 asks); 3 posts specifically about bad/missing/used codes. Reddit pre-launch threads (r/GTA6 "How will the physical edition work?", 57+ comments by June).
- **Sources:** https://x.com/thyGeekdom/status/2122362810227388677 (reported used/missing codes, Rockstar not confirmed), https://x.com/WantedLevelgg/status/2122342041992798409 , https://x.com/letstalkgizmo/status/2122691234342805531 ; official https://www.playstation.com/en-us/support/games/gta-vi-support/ ("If your code is missing or unreadable, please contact the retailer"); Rockstar purchase FAQ (mirrored) https://www.reddit.com/r/GTA6/comments/1ugfufg/grand_theft_auto_vi_preorder_purchase_support_faq/ (Rockstar Store orders: Xsolla support)
- **Site coverage: PARTIAL.** `gta-6-preload-not-starting.md` line 42 and `launch-night-checklist.md` line 105 give one-line advice; no page on redeeming, bad codes, region locks, or who refunds.

### 6. 30 fps, no performance mode, does PS5 Pro help? ("should I cancel?")
- **What:** Widely repeated that Rockstar targets 30 fps on all consoles including PS5 Pro (Pro gets PSSR and ray-traced shadows per several posts). Heated debate; no 60 fps mode announced per posts. One of the highest-reach items: Pure_PS poll-style post.
- **Frequency:** 29 X hits (9 asks). Reddit: at least 5 GTA VI threads asking about modes (Apr-Oct 2026), consensus "30 fps, CPU bound, no performance mode".
- **Sources:** https://x.com/Pure_PS/status/2122348821019775397 (about 12.0k impressions), https://x.com/WantedLevelgg/status/2122130221734469666 , https://www.reddit.com/r/playstation/comments/1x7aqou/will_gta_6_run_at_30_fps_on_the_base_ps5_even_on/ , https://www.reddit.com/r/PS5pro/comments/1w0b5qt/gta_6_is_running_30fps_on_ps5_confirmed_there_is/
- **Note:** Reddit replies are opinion; the **source for "targeting 30 fps"** must be Rockstar's own statement (the site already cites one).
- **Site coverage: YES** (`platforms.md`, `ps5-settings.md`).

### 7. PC version: when, is there a date?
- **What:** "gta 6 pc" leads platform searches. Posts: not announced; unverified rumour of Q1 2027 (via Men's Journal citing The Verge).
- **Frequency:** 32 X hits (7 asks).
- **Sources:** https://x.com/gtasixguide/status/2122736534960980215 , https://x.com/MyGTA6Map/status/2123005043137757585 (**rumour only**), https://x.com/ethic_CS/status/2123006170814128527
- **Site coverage: PARTIAL.** `platforms.md` states there is no PC date, but there is no dedicated "GTA 6 PC release date" page for a head term.

### 8. New Zealand trick: change region to play early, and the ban risk
- **What:** Hundreds of impressions on posts explaining an Xbox region change and "NZ PSN account". Coverage says Xbox console-region change is low-risk but affects store/payments for a period; **creating a fake-region PSN account breaks Sony's residence rules and can be suspended**; some ban claims are unconfirmed.
- **Frequency:** 19 X hits (4 asks), including a MetroUK how-to and a "banned using the NZ method" post.
- **Sources:** https://x.com/MetroUK/status/2123002517235605661 , https://x.com/novaraszn/status/2123010204308779138 (ban claim, unverified), https://www.sportskeeda.com/gta/can-get-banned-using-new-zealand-trick-play-gta-6-early ; https://www.purexbox.com/news/2026/11/heres-what-xbox-owners-need-to-know-about-moving-to-new-zealand-for-gta-6 , https://gtasnaps.com/can-you-get-banned-for-the-gta-6-new-zealand-trick/ , PlayStation Terms of Service (account country must match residence): https://www.playstation.com/content/dam/global_pdc/en/corporate/legal/tosua/march-2026/TOS-2026-EN.pdf (Sportskeeda, Pure Xbox, GTA Snaps: read from search summaries, not opened in full; Xbox: "no known ban history" per summaries)
- **Time-bound:** useful until Europe unlocks at 00:00 CET (about 11 hours from now); afterwards the "ban/penalty" question persists.
- **Site coverage: PARTIAL.** `is-gta-6-out.md` line 78 warns in one paragraph; an inbox note exists (`content/inbox/20261118-1212-settings-xbox-nz-region-trick.md`). No dedicated page.

### 9. Xbox: "service outage" message at unlock, cloud streaming on Xbox One, preload visibility
- **What:** At NZ unlock, two accounts posted about Xbox errors: one asks "anyone else getting a service outage message", another says "Xbox servers died". Microsoft's official help page covers the "service outage message when you try to play a game". As of 18 Nov search summaries report Xbox services operational (not confirmed as a wide outage). Cloud streaming for Xbox One is from 1 AM ET on 19 Nov (Xbox Wire).
- **Frequency:** 2 posts on the outage message in the first minutes after unlock (unverified, single reports); 15 asks in the Xbox bucket overall (mostly cloud/Xbox One).
- **Sources:** https://x.com/HarryAyy_/status/2123008728513552863 , https://x.com/xGarbett/status/2123008700092698678 , https://support.xbox.com/en-HK/help/games-apps/troubleshooting/serviceoutage , https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/
- **Site coverage: PARTIAL.** `gta-6-xbox-fixes.md` and `platforms.md` cover cloud timing and generic fixes; **no page for the "service outage" message** (an inbox candidate exists). 

### 10. Day-one patches: versions, sizes, "do I need them?"
- **What:** Two pre-launch patches: 01.002.000 (13 Nov, about 1 GB PS5) and 01.002.001 (16 Nov; about 602.5 MB PS5, about 1.6 GB Xbox; staged PS5 rollout, all users by 17 Nov 2 AM PT). **No patch notes from Rockstar.** Check via Options > Check for Update on PS5.
- **Frequency:** only 3 X hits in the sample (reporting, not questions) but press coverage in 4 outlets.
- **Sources:** https://www.vice.com/en/article/gta-6-second-day-one-patch-ps5-xbox/ , https://sea.ign.com/grand-theft-auto-vi-rumored-title/252007/gta-6-gets-another-day-one-patch-and-its-1gb-bigger-on-xbox , https://kotaku.com/ps5-gets-last-minute-software-update-thats-required-to-play-gta-6-2000757868 ; X: https://x.com/fieldreportgta/status/2123006256373719408
- **Site coverage: NO.** Only in `_facts.md` (line 85); no published page.

### 11. "Is GTA 6 down?" / launch-night server load
- **What:** Lots of jokes and predictions of crashes at launch; a few concrete status-like posts. GTA VI is single-player at launch, so most "down" problems will be PSN/Xbox/Rockstar sign-in, store or download issues, not game servers.
- **Frequency:** 22 X hits (3 asks); 2 early "Xbox servers died" posts.
- **Sources:** https://x.com/xGarbett/status/2123008700092698678 , https://x.com/mrSolarCactus/status/2123006991266439654 ; status pages: https://status.playstation.com , https://support.xbox.com/en-US/xbox-live-status
- **Site coverage: YES** (`gta-6-not-working.md`, `gta-6-error-codes.md`).

### 12. Controls, settings, accessibility, photo mode
- **What:** "Photo mode" is a frequent hope/question (many posts). One post says sprint defaults to L3 on a streamer's PS5 Pro setup screen (**unverified**, from a YouTube timestamp). Haptic/adaptive trigger options are confirmed as adjustable in accessibility settings (PlayStation Blog). PlayStation lists in-game languages: English voice and text; text in 11 more.
- **Frequency:** 27 X hits (3 asks).
- **Sources:** https://x.com/LeonidaGlint/status/2123009263240941785 , https://x.com/nomlagrey/status/2122699172126335015 , https://blog.playstation.com/2026/11/10/pre-load-grand-theft-auto-vi-on-ps5-starting-today/ , https://www.playstation.com/en-us/support/games/gta-vi-support/ (languages)
- **Site coverage: PARTIAL.** `ps5-settings.md` and `beginner-tips.md` cover haptics; `_queue.md` row 34 plans "GTA 6 controls" but no page yet; nothing on languages or photo mode.

### 13. Editions, pre-order bonus, Ultimate upgrade
- **What:** Standard vs Ultimate; Vintage Vice City Pack pre-order bonus; Ultimate upgrades from digital Standard or code-in-box are **only from PlayStation Store** (PlayStation page). One post claims a Game Pass/Rewards discount on Ultimate (unverified).
- **Frequency:** 26 X hits (6 asks).
- **Sources:** https://x.com/realTuckFrumper/status/2122328124599791804 , https://x.com/chikocash/status/2122764460829888672 , https://www.playstation.com/en-us/support/games/gta-vi-support/
- **Site coverage: YES** (`editions-prices.md`, `vintage-vice-city-pack.md`).

### 14. Purchase errors, payment failures, refunds
- **What:** A Turkish PSN user reports being charged without the game after a pre-order error; an Xbox user reports payment failing; physical-order delivery questions (Rockstar Store orders via Xsolla). Refund routes: PlayStation for digital PSN, Xbox for Xbox, Rockstar Store via Xsolla, otherwise the retailer.
- **Frequency:** 7 X hits (1 ask); 2 concrete user problems + 2 Reddit threads on pre-order support.
- **Sources:** https://x.com/agaapoov/status/2122734620772876497 , https://x.com/sumeet_khaire/status/2122998697076363599 , https://www.reddit.com/r/GTA6/comments/1ugfufg/grand_theft_auto_vi_preorder_purchase_support_faq/ , https://www.playstation.com/en-us/support/games/gta-vi-support/
- **Site coverage: NO** (`grep refund` returns nothing in content).

### 15. Spoiler avoidance (**warning: topic is spoiler-adjacent; this entry contains no story content**)
- **What:** People ask how to mute the game on X now that NZ players are streaming; accounts urge muting keywords. r/GTA6 pinned a "Release Day Plan Regarding Spoilers/NSFW". Trophy lists appear in this thread type: **one X post claims an "official" trophy list is live (55 trophies, with names)**, which conflicts with reporting that only the count is known; treat as unverified.
- **Frequency:** 8 X hits (2 asks) with the spoiler theme; 1 post on the trophy claim.
- **Sources:** https://x.com/ViceBeatHQ/status/2122351487841960328 , https://x.com/monstraem/status/2123010199761871018 , https://www.reddit.com/r/GTA6/new/ (public page showing the pinned spoiler plan); trophy count reporting: https://gtasnaps.com/gta-6-trophy-list-and-achievements/ (summary says the circulating 55-name list is considered probably fake)
- **Site coverage: NO** (a trophy/"no official list" fact is in `_facts.md` only).

### Also seen (lower signal)
- **GTA Online / online mode:** 11 X hits (1 ask), mostly "single-player at launch, nothing official". **YES** (`gta-6-online.md`).
- **Parental controls/age limits:** 1 X hit; PlayStation page has a parental-controls section. **NO** page; low signal.
- **Trophies:** 1 X hit; GTAForums/PowerPyx-style demand will rise after launch. **PARTIAL** (`_facts.md`, `gta-6-cheats.md`).
- **Cheats:** held page (`gta-6-cheats.md`, `publish: false`), correct to hold.

### Coverage summary
- Fully covered: **6** (items 2, 3, 4, 6, 11, 13).
- Partial: **6** (items 1, 5, 7, 8, 9, 12).
- Not covered: **3** (items 10, 14, 15).
- Of 15: 6 YES, 6 PARTIAL, 3 NO.

---

## 2. Ten pages to write next (ranked)

Ranking: how time-sensitive the question is tonight x signal strength x site gap x verifiability. All must follow site rules (verified facts only; label rumour; no story content).

| # | Working title | Target keyword | Why now | Sources |
|---|---|---|---|---|
| 1 | **GTA 6 on PS5: The Required System Update (14.23.00) and How to Install It Before Midnight** | `gta 6 ps5 update required` / `gta 6 firmware 14.23` | Mandatory, announced yesterday evening, 22 X hits, official PlayStation Support statement; existing pages never name the version. Include: version 26.07-14.23.00, about 1.27 GB, menu path, "preload does not replace it", check version, what is **reported** (PSN cut-off for old firmware, single source) vs official. | PlayStation GTA VI support page; Push Square; Kotaku; Polygon; The Big Lead; ResetEra 14.22 thread (links in item 1) |
| 2 | **GTA 6 Physical Edition (Code-in-Box): How to Redeem, and What to Do If the Code Is Missing, Unreadable or Used** | `gta 6 code in box not working` / `gta 6 physical edition` | 49 X hits, reports of bad codes, no disc confusion, real refund questions; current site has two one-liners. Include redeem steps (PlayStation menu path), retailer-first support rule, Rockstar Store orders via Xsolla, region note for imports (**unverified**), Ultimate upgrade only via PlayStation Store. | PlayStation support page; Rockstar FAQ via r/GTA6; thyGeekdom and WantedLevelgg posts |
| 3 | **GTA 6 New Zealand Trick: Does It Work, and Can You Get Banned?** | `gta 6 new zealand trick` | Time-bound (until about 00:00 CET) and high-reach; strongest safety angle: PSN fake-region account risk vs Xbox console region setting; advise against ToS-breaking actions. Mark ban claims **unverified**. | MetroUK X post; Sportskeeda; Pure Xbox; GTA Snaps (open each in full and verify before publishing); Pure Xbox; PlayStation ToS |
| 4 | **GTA 6 Day-One Patches: Versions 01.002.000 and 01.002.001, Sizes and How to Check** | `gta 6 update 1.002.001` / `gta 6 day one patch` | Gap; every preloader is asked to check; no patch notes yet, so a short evergreen page that is updated when notes appear. PS5 path: Options > Check for Update. | Vice; IGN SEA; Kotaku; fieldreportgta X post |
| 5 | **GTA 6 Xbox "Service Outage" Message: What It Means and What to Do** | `xbox service outage message gta 6` | Reports within minutes of NZ unlock; Microsoft has an official help page; Europe will hit the same wall tonight. Keep it factual: single reports only until Xbox confirms; link Xbox status; "go offline" suggestion is **from a search summary, verify against Xbox Support before publishing**. | HarryAyy_ and xGarbett posts; Xbox Support service-outage page; Xbox status |
| 6 | **GTA 6 PC Release Date: Is There a PC Version? (Official vs Rumour)** | `gta 6 pc release date` | Biggest unmet platform query before launch ("gta 6 pc" about 40.5k US/month in the earlier strategy data); 32 X hits; a rumour of Q1 2027 is circulating (via Men's Journal citing The Verge) and must be labelled as rumour. | gtasixguide, MyGTA6Map, ethic_CS X posts; official: no announcement per platforms page |
| 7 | **GTA 6 Controls on PS5 and Xbox: Default Layout, Sprint, and How to Change Them** | `gta 6 controls` | In `_queue.md` (#34), 27 X hits on settings; **wait for first-hand verification** of defaults. Currently only one unverified post about sprint on L3. | LeonidaGlint X post (unverified); PlayStation Blog for haptics; own capture after unlock |
| 8 | **GTA 6 Purchase Failed or Pre-Order Error: Where to Get a Refund (PlayStation, Xbox, Rockstar Store, Retailers)** | `gta 6 refund` / `gta 6 pre-order error` | Gap; real posts of charged-but-no-game and payment failures; clear official routing exists. | PlayStation support page; Rockstar FAQ via r/GTA6; agaapoov and sumeet_khaire X posts |
| 9 | **How to Avoid GTA 6 Spoilers: Mute Words, Subreddit Tools and Streamer Settings** | `avoid gta 6 spoilers` | NZ unlock means spoilers all day; people ask how to mute; spoiler-safe by design (no spoilers on the page, no trophy names). Include: X muted words, platform mute settings. **Do not name trophies or story items.** | ViceBeatHQ, monstraem X posts; r/GTA6 pinned release-day spoiler plan |
| 10 | **GTA 6 Performance Mode: Does It Exist? Frame Rate and PS5 Pro Explained** | `gta 6 performance mode` / `gta 6 30 fps ps5 pro` | Highest-reach debate (Pure_PS about 12.0k impressions); site covers it inside platform pages but there is no single head-term answer page ("should I cancel?" intent). Cite Rockstar's statement; label forum claims as opinion. | Pure_PS, WantedLevelgg X posts; r/playstation and r/PS5pro threads; site `platforms.md` sources |

**Also worth a quick update (not new pages):**
- `gta-6-ps5-fixes.md`, `launch-night-checklist.md`, `gta-6-preload-not-starting.md`: add "install PS5 system software 26.07-14.23.00 first (required per PlayStation Support)".
- Publish the six files in `content/` missing from the sitemap if intended to be live.

## 3. Data hygiene notes
- Several X "how to be ready" posts are near-identical templated content from many small accounts; I counted them as signals, not as independent users.
- Ignore a GTAForums search summary that says preload opened 12 Nov (official: 10 Nov).
- A few X posts claim things not supported by any source I found (e.g., an "official trophy list" with names, a Game Pass discount); they are listed as unverified and should not be used as facts.
- Rockstar Support, YouTube comments, PlayStation Community and Xbox forum threads were not reachable or not surfaced; see section 0.

## Appendix: raw data
- `/workspace/gta6-guides/input/raw/x_posts_all.json`: 311 unique X posts with text, time and public metrics.
- `/workspace/gta6-guides/input/raw/pain_counts.json`: keyword-bucket counts and post ids per topic.
