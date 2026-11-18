# Competitive SEO research: unofficial GTA 6 guides site (roarcode.github.io)

**Author:** SEARCH (for Rok) · **Checked:** Wed 18 Nov 2026, about 11:55 to 12:15 CET (Europe/Ljubljana) · **Spoiler status:** none. This file holds launch-window logistics, mechanics names and page titles only. No story, mission, character-arc, ending or secret content. Competitor page titles that were spoiler-flavoured are described generically and left out.

## 0. Method and honest limits (read first)

| Item | What was actually done | Limit |
|---|---|---|
| SERP data | `WebSearch` tool, 20 queries. **It is NOT Google.** It is an AI-summarised search layer over a web index. It returned the **top 5 results per query, not 10**. Order = the order the tool returned. | Rank positions are indicative only. YouTube and Reddit videos/threads did not appear in these core results. That does not prove they are absent on Google. |
| Google SERP | Tried `google.com/search` from the box: redirected to a consent wall (HTTP 302), no results. | No real Google rankings. Nothing here is a Google ranking. |
| Demand signals | **Real Google Autocomplete** (suggestqueries.google.com) for 24 seed phrases, run 18 Nov. Plus secondhand Keyword Planner figures already in `content/_queue.md` (E1, from Beebom, 17 Nov). | Autocomplete shows what people type, not volume. **Google Trends and Ahrefs/Semrush: not accessible, not used.** |
| Competitor pages | Fetched directly: GameSpot hub, Polygon release-day explainer, Dexerto launch guides, PowerPyx upcoming guides, gta6communitywiki.com, gta.wiki, PC Gamer GTA Wiki story, Kotaku GTA Wiki story, GameSpot spoiler guide. Raw HTML probe (curl) of 12 URLs. | **IGN: not verified** (its wiki URL guess returned 404 and my WebSearch for it returned no IGN pages; the one IGN claim below is from a third-party summary). **Fandom GTA page: curl got 403**, status taken from news coverage. GameSpot curl returned 403 but WebFetch worked. |
| Sentiment | Reddit thread titles/OP text (WebFetch only returned the title and original post, **comment bodies were not retrievable**), X search (`search_posts_all`, read only), news articles quoting editors. | Reddit praise quotes could not be verified. They are marked as such. |
| Time | Everything is as of launch day. New Zealand unlocked at 12:00 CET today. Slovenia unlocks 00:00 CET Thu 19 Nov. | Rankings will shift within hours. Re-run after 19 Nov. |

## 1. Demand signals (Google Autocomplete, 18 Nov 2026)

Raw suggestions, verbatim from Google Autocomplete. Top generic: `gta 6 release date`, `gta 6 pc release date`, `gta 6 price`, `gta 6 map`, `gta 6 leaks`, `gta 6 pre order`, `gta 6 pc`, `gta 6 release`, `gta 6 controller`.

| Seed | Notable suggestions | Reading |
|---|---|---|
| gta 6 release time | uk, australia, in india, est, nz, and date, zone, **europe** | Per-country intent. Europe is a suggestion; **a Slovenia seed returns no suggestions** (Slovenia only appears for `gta 6 slovenia` / `gta 6 preorder slovenia`). |
| gta 6 release | date, date pc, date ps5, date and price, date and time, date **europe**, platforms, date uk | Release-date family is the biggest head cluster. |
| gta 6 preload | date, meaning, ps5, size, countdown, time, xbox | Pre-load window is over (opened 10 Nov), so this decays now. |
| gta 6 cheats | ps5, codes, ps4, xbox, xbox one, series x, reddit | Platform-specific "codes" intent. Note `ps4` and `xbox one` are not launch platforms. |
| gta 6 map | mapping project, size, vs gta 5, compared to gta 5, leak reddit, comparison, cities, based on what city | Size and comparison intent beats "interactive". |
| gta 6 tips | tips and tricks, things you can do, things to do, ways to make money | Beginner and money overlap. |
| gta 6 how to | play, buy, pre order, download, **play on pc**, make money, buy for someone else | Buying, gifting and PC are hot. |
| gta 6 ultimate | edition vs standard, pre order, price, benefits, upgrade | Comparison + price. |
| gta 6 new zealand | trick, release time, price, reddit, ps5 | Spike query, expires tonight. |
| gta 6 how long | how long to beat, is the story, to complete | Length intent. |
| gta 6 cars | list, pictures, wiki, reddit, run out of gas, need gas | List intent. |
| gta 6 trophies | leaked, ps5, trophy list, trophy guide, all trophies | List + guide. |
| gta 6 xbox | series s, one, cloud gaming, series x fps | Xbox cloud / One angle exists. |
| gta 6 ps5 | pro, fps, vs ps5 pro, or ps5 pro, size | PS5 vs Pro is a head phrase. |
| gta 6 download | size, size ps5, size xbox series x, time | Size and time. |
| gta 6 online | release date, crossplay, price, subscription, mode | Mostly "when". |
| gta 6 for kids | good for kids, ok for kids, bad for kids, kids can t play | **Parent intent exists.** |
| gta 6 age rating | australia, uk, nz, us, esrb, **pegi**, saudi arabia, uae | **Rating by country exists.** |
| gta 6 not working | on ps5, preorder not working, 60fps, website not working | Mostly pre-launch noise. Real launch-day variants unseen yet. |

Secondhand volume (from `content/_queue.md`, Keyword Planner via Beebom/Action Network, 17 Nov, unverified by me): US about 3.07 M/month, Germany about 1.16 M, UK about 1.02 M, Poland about 523 k, Italy about 518 k, Austria about 111 k, Croatia about 35.7 k, Slovenia about 13.2 k.

## 2. Query table: 20 queries, top 5 results each (100 results)

Legend: **O** = official (Rockstar, PlayStation, Take-Two). **M** = major outlet. **F** = fan/niche site. Freshness is what the snippet or page showed (checked 18 Nov).

| # | Query | Results returned (in order) | Mix | Format and freshness | Notes |
|---|---|---|---|---|---|
| 1 | gta 6 release time | 1 [PC Gamer](https://www.pcgamer.com/games/grand-theft-auto/gta-6-release-time-date/) · 2 [Polygon](https://www.polygon.com/gta-6-grand-theft-auto-release-time-pdt-edt/) · 3 [Rockstar newswire](https://www.rockstargames.com/newswire/article/ak3ak31a49a221/grand-theft-auto-vi-is-now-set-to-launch-november-19-2026) · 4 [GamesRadar](https://www.gamesradar.com/games/grand-theft-auto/gta-6-release-time/) · 5 [BBC live](https://www.bbc.com/news/live/c60rkg21dl22t) | 1 O, 4 M | Table/explainer, updated this week | PC Gamer says its PS5 unlock screens show the whole US unlocking at midnight Eastern, "despite what Rockstar's official support page says". Readers are confused. |
| 2 | gta 6 preload size | 1 [PlayStation](https://www.playstation.com/en-us/games/grand-theft-auto-vi/) · 2 [thegtazone](https://thegtazone.com/articles/gta-6-preload-live-file-size-datamine) · 3 [gameluster](https://gameluster.com/gta-6-212gb-download-size-preload/) · 4 [The Verge](https://www.theverge.com/games/1025271/gta-vi-storage-space-rockstar-games) · 5 [TheGamer](https://www.thegamer.com/rockstar-officially-confirms-gta-6-pre-load-and-file-size-details/) | 1 O, 2 M, 2 F | News + explainer, 3 to 10 Nov | Sizes differ by source (209.8 GB PS5 download, up to 212 GB, about 225 GB Xbox store figure). |
| 3 | gta 6 pc release | 1 [thetechhacker](https://thetechhacker.com/2026/11/17/gta-6-pc-release-date/) · 2 [Just Jared](https://www.justjared.com/2026/11/15/gta-6-pc-release-date-grand-theft-auto-vi-coming-to-pc/) · 3 [Polygon (report)](https://www.polygon.com/gta-6-pc-release-q1-2027-rumor/) · 4 [Ulti (PT)](https://ulti.com.br/noticias/gta-6-no-pc-relato-gamesbeat-2027/) · 5 [Polygon](https://www.polygon.com/gta-6-pc-release-date-cloud-streaming-rockstar-news-xbox-mods/) | 2 M, 3 F | Q&A explainers, 15 to 17 Nov | All say no official PC date. Only source for Q1 2027 is an anonymous-sources report (GamesBeat). |
| 4 | gta 6 beginner tips | 1 [games.gg](https://games.gg/grand-theft-auto-vi/guides/grand-theft-auto-6-beginner-tips-what-to-do-first/) · 2 [grandtheft.gg](https://grandtheft.gg/gta-6-beginner-guide) · 3 [gamer.org](https://www.gamer.org/grand-theft-auto-6-officially-confirms-how-police-wanted-systems-work/) · 4 [leonidaverse](https://leonidaverse.com/en/codex/gta-6-tips) · 5 [gta6loop](https://gta6loop.com/guides/beginner) | 5 F | Listicles | Big outlets absent from these 5. Some pages mix pre-launch "we do not yet know" with confident tips. |
| 5 | gta 6 map | 1 [gta6nerd](https://gta6nerd.com/articles/map) · 2 [gta6companion](https://gta6companion.com/guides/gta-6-map-all-regions) · 3 [gta-6-map.org](https://gta-6-map.org/) · 4 [GTAInfinity](https://www.gtainfinity.com/map) · 5 [Mobalytics](https://mobalytics.gg/gamebase/guides/grand-theft-auto-6-interactive-map) | 5 F | Region lists + interactive maps | Interactive maps are community reconstructions. Mobalytics (updated 17 Nov) states the map is "three times larger than Red Dead Redemption 2's and twice the size of GTA 5" as fact; other pages call it an estimate. |
| 6 | gta 6 cheats | 1 [Vice Game](https://vicegame.net/gta-6-cheat-code-status-for-ps5-and-xbox-series-xs) · 2 [GTA Mods Zone](https://gtamodszone.com/news/207-gta-6-cheats-are-there-any-codes-yet-everything-we-know-before-launch) · 3 [GTA6Guide.io](https://gta6guide.io/guides/gta-6-cheat-codes-status) · 4 [GTA Culture](https://gtaculture.com/guides/gta-6-cheats) · 5 [gtacheatcodes.net "Community Verified"](https://gtacheatcodes.net/community-verified) | 5 F | "No codes yet" status pages | Tool summary: no verified codes exist. Result 5 is branded "community verified", which I could not check. Treat as untrustworthy. |
| 7 | gta 6 money guide | 1 [gtasix.org](https://gtasix.org/en/guide/money/) · 2 [GrindMap](https://grindmap.com/guides/gta-6-launch-day-money) · 3 [gta6-game.wiki](https://www.gta6-game.wiki/guides/making-money) · 4 [GameSpot](https://www.gamespot.com/articles/how-to-make-money-in-gta-6/) · 5 [games.gg](https://games.gg/grand-theft-auto-vi/guides/grand-theft-auto-6-money-guide-best-ways-to-make-money-early/) | 1 M, 4 F | How-to listicles | Only GameSpot is a major. Tool summary says no tested "fastest" method or payout ranking existed pre-launch. |
| 8 | gta 6 best settings ps5 | 1 [The Verge](https://www.theverge.com/games/1030749/rockstar-gta-6-30fps-ps5-pro-pssr-ray-tracing) · 2 [GamesRadar](https://www.gamesradar.com/games/grand-theft-auto/gta-6-wont-run-at-60fps-even-on-ps5-pro-but-sonys-console-does-have-an-exclusive-ray-traced-shadows-and-pssr/) · 3 [Beebom TV settings](https://beebom.com/gta-6-best-tv-settings/) · 4 [digitbin](https://www.digitbin.com/best-ps5-settings-gta-6/) · 5 [Engadget](https://www.engadget.com/2302290/playstation-5-settings-change-before-gta-6/) | 3 M, 2 F | News + how-to | 30 fps target on every console, no performance mode announced. Actual TV/console settings pages exist (Beebom, digitbin, Engadget). |
| 9 | gta 6 online release | 1 [Vice](https://www.vice.com/en/article/gta-6-online-release-date/) · 2 [trtc.io](https://trtc.io/blog/details/gta-online-release-date) · 3 [The Verge](https://www.theverge.com/games/997116/twitch-ceo-gta-vi-multiplayer-is-coming-in-2027) · 4 [Push Square](https://www.pushsquare.com/news/2026/11/psa-gta-6-does-not-have-online-multiplayer-at-launch) · 5 [NME](https://www.nme.com/news/gaming-news/grand-theft-auto-6-online-multiplayer-release-date-2027-3969508) | 4 M, 1 F | News | No official online date. Result 2 is an off-topic blog. |
| 10 | gta 6 price editions | 1 [Take-Two IR](https://taketwointeractivesoftwareinc.gcs-web.com/news-releases/news-release-details/rockstar-games-announces-pre-orders-grand-theft-auto-vi/) · 2 [whathetech](https://whathetech.net/gta-6-price-editions) · 3 [VGC](https://www.videogameschronicle.com/guide/gta-6-ultimate-edition-vs-standard-edition-all-ultimate-edition-pre-order-benefits/) · 4 [USA Today](https://www.usatoday.com/story/tech/gaming/2026/11/16/gta-6-everything-to-know-preorder-story-actors-cost/92711409007/) · 5 [Polygon](https://www.polygon.com/gta-6-price-confirmed-ultimate-edition-rockstar-games/) | 1 O, 3 M, 1 F | Comparison explainers | USD-first. Euro and GBP lines are usually secondary. |
| 11 | gta 6 controls | 1 [gta6everything](https://www.gta6everything.com/guides/gta-6-controls) · 2 [gta-top](https://gta-top.com/en/gta-6/controls) · 3 [WikiGTAVI](https://www.wikigtavi.com/guides/gta-6-controls-guide) · 4 [gta.media](https://gta.media/gta-6-controls/) · 5 [GTABase](https://www.gtabase.com/articles/gta-6/gta-6-controls-guide-ps5-xbox-button-layout) | 5 F | Button tables | Pre-launch pages say "not published yet" or "reported". **No official layout. No major outlet in top 5.** |
| 12 | gta 6 trophies list | 1 [gta6everything](https://www.gta6everything.com/guides/gta-6-trophy-and-achievement-list) · 2 [PlayStation](https://www.playstation.com/en-us/games/grand-theft-auto-vi/) · 3 [gta6help](https://gta6help.com/trophies/gta-6-trophies-achievements/) · 4 [thegta6news](https://thegta6news.com/news/gta-6-55-achievements-trophies-rumour) · 5 [Rockstar](https://www.rockstargames.com/VI) | 2 O, 3 F | Rumour/status pages | "55 trophies" is unconfirmed. PowerPyx scheduled its trophy guide for 19 Nov. |
| 13 | gta 6 download stuck not working fix | 1 [PlayStation support](https://www.playstation.com/en-us/support/games/gta-vi-support/) · 2 [PlayStation troubleshooting](https://www.playstation.com/en-sk/support/games/gta-vi-game/) · 3 [PlayStation downloads](https://www.playstation.com/en-my/support/games/troubleshoot-downloaded-playstation-game/) · 4 [fpsgen](https://fpsgen.com/guides/gta-6-download-stuck-slow-fix) · 5 [totalgta](https://totalgta.com/gta-6-preload-not-downloading-or-stuck-ps5-xbox-fixes/) | 3 O, 2 F | Support pages + step lists | **No major outlet. Official support pages are generic.** |
| 14 | gta 6 walkthrough | 1 [GTA6Kings](https://gta6kings.com/gta-6-walkthrough/) · 2 [leonidaverse](https://leonidaverse.com/en/codex/gta-6-missions) · 3 [VGN](https://vaultlockgames.com/gta6/walkthroughs) · 4 [GTABase](https://www.gtabase.com/gta-6/guides/) · 5 [Insider Gaming](https://insider-gaming.com/gta-6-guides-walkthroughs/) | 1 M, 4 F | Hubs, "from launch day" | Index pages promising launch-day content. This is where PowerPyx, IGN, GameSpot will land hardest. |
| 15 | gta 6 new zealand trick | 1 [GamesRadar](https://www.gamesradar.com/games/grand-theft-auto/gta-6-play-early-new-zealand-trick/) · 2 [Polygon](https://www.polygon.com/gta-6-grand-theft-auto-new-zealand-trick-how-to-play-early/) · 3 [Pure Xbox](https://www.purexbox.com/news/2026/11/heres-what-xbox-owners-need-to-know-about-moving-to-new-zealand-for-gta-6) · 4 [Pure Xbox](https://www.purexbox.com/news/2026/11/xbox-fans-urge-caution-over-new-zealand-trick-for-gta-6-while-others-say-its-a-non-issue) · 5 [VGC](https://www.videogameschronicle.com/guide/gta-6-new-zealand-trick-how-to-play-gta-6-early/) | 5 M | How-to + caution | Coverage warns it may break platform terms. Demand ends when each local midnight passes. |
| 16 | gta 6 cars list vehicles | 1 [leonidaexplorer](https://leonidaexplorer.com/gta-6-vehicles) · 2 [PlayStation UK](https://www.playstation.com/en-gb/games/grand-theft-auto-vi/) · 3 [GameSpot](https://www.gamespot.com/articles/prewrite-preorders-are-live-for-grand-theft-auto-vi/1100-6539953/) · 4 [gtaplaybook](https://gtaplaybook.com/gta6/answers/ultimate-edition-vehicles/) · 5 [TheGamer](https://www.thegamer.com/grand-theft-auto-6-gta-car-confirmed-list/) | 1 O, 2 M, 2 F | Lists | Rockstar has named 7 vehicles; larger lists come from trailer spotting. |
| 17 | gta 6 how long to beat | 1 [Insider Gaming](https://insider-gaming.com/how-long-to-complete-gta/) · 2 [games.gg](https://games.gg/grand-theft-auto-vi/guides/how-long-to-complete-gta-6/) · 3 [Polygon](https://www.polygon.com/gta-6-platinum-trophy-mythic-achievement-time-to-get/) · 4 [Dexerto wiki](https://www.dexerto.com/wikis/gta-6/time-to-beat/) · 5 [esports.gg](https://esports.gg/guides/grand-theft-auto-6/how-long-does-it-take-to-beat-gta-6-story-length-explained/) | 3 M, 2 F | Estimate explainers | Numbers are estimates and vary (about 50 h main, about 80 h with optional, about 200 h completion). |
| 18 | gta 6 ps5 pro performance | 1 [The Verge](https://www.theverge.com/games/1030749/rockstar-gta-6-30fps-ps5-pro-pssr-ray-tracing) · 2 [GamesRadar](https://www.gamesradar.com/games/grand-theft-auto/gta-6-wont-run-at-60fps-even-on-ps5-pro-but-sonys-console-does-have-an-exclusive-ray-traced-shadows-and-pssr/) · 3 [Engadget](https://www.engadget.com/2312120/gta-6-is-targeting-30-fps-and-has-ray-tracing-support-on-ps5-pro/) · 4 [TweakTown (DF)](https://www.tweaktown.com/news/114744/digital-foundry-says-gta-vis-cpu-demands-make-a-40-fps-mode-on-ps5-pro-too-difficult/index.html) · 5 [TweakTown](https://www.tweaktown.com/news/114598/rockstar-confirms-gta-6-targets-30-fps-on-ps5-pro-with-pssr-and-ray-traced-shadows/index.html) | 5 M | News | Majors own this. Same two facts repeated. |
| 19 | gta 6 release time Europe CET Germany | 1 [PlayStation DE support](https://www.playstation.com/de-de/support/games/gta-vi-support/) · 2 [gta6db.io Germany](https://gta6db.io/countries/germany) · 3 [GIGA (DE)](https://www.giga.de/games/ab-wann-kann-man-gta-6-in-deutschland-spielen-alle-uhrzeiten-zum-release--01M7Q2N67XH1TQCE3VTG4V8ZQ0) · 4 [GTABuddy](https://www.gtabuddy.com/gta-6/release-time/) · 5 [leonidaunlocked.com Germany](https://leonidaunlocked.com/release-time/germany/) | 1 O, 1 M, 3 F | Country pages (programmatic) | All agree: 00:00 CET Thu 19 Nov = 23:00 UTC Wed 18 Nov. Country-by-country template pages are a pattern. |
| 20 | gta 6 ura izida Slovenija | 1 [techzona.sk (SK)](https://www.techzona.sk/gta-6-cena-datum-vydania/) · 2 [TechWiser](https://techwiser.com/gta-6-worldwide-release-times/) · 3 [GTAVice.net](https://www.gtavice.net/news/gta-6-playstation-worldwide-release-countdown) · 4 [IGN Adria (SL)](https://adria.ign.com/sl/grand-theft-auto-vi/6664/gta-6-ima-potrjen-datum-izida) · 5 [Gameblog (FR)](https://www.gameblog.fr/jeu-video/ed/news/gta-6-heures-sortie-comment-jouer-avant-722435) | 2 M, 3 F | Mixed languages | **Only one Slovenian-language result, and it is about the date announcement (older), not tonight's unlock time.** Weakest SERP of all 20. |

**Cross-query pattern.** Official pages and big outlets own the head terms: release time, price, PC, online, PS5 Pro, how long, NZ trick. Small fan sites own the **practical, list or "status" queries**: controls, cheats, beginner tips, map, download fixes, walkthrough hubs. Only 3 of 20 queries (controls, download fixes, cheats) have no major outlet in the top 5.

## 3. Competitor overview (18 profiled)

Direct fetch = I opened the page. Search-only = profiled from search snippets, so lower confidence.

| # | Competitor | What they publish now (launch day) | Structure | Update cadence / freshness | Evidence |
|---|---|---|---|---|---|
| 1 | **GameSpot** | Guides hub with about 40 entries, dated 18 Nov 03:01 PST by a named guides editor: wanted levels, car stealing, map, activities, soundtrack, "what to do first", how long to beat, Ultimate Edition unlocks, offline play, difficulty, inventory, healing, money, spoiler-avoidance, PC release, cutscene skipping, plus a few story-choice and Easter-egg guides (not described here). | One hub page that links to individual guides, grouped by theme. Bylined. | Says "updated regularly". Hub dated launch morning. Its spoiler guide (17 Nov) promises to hide spoilers and to be "really careful". | Direct fetch: [hub](https://www.gamespot.com/articles/gta-6-guides-hub-how-to-do-everything-in-grand-theft-auto-6/), [spoiler guide](https://www.gamespot.com/articles/how-to-avoid-gta-6-spoilers-on-your-social-media-feeds/) |
| 2 | **Polygon** | Release-day explainer (14 Nov), release-time page, price, PC report coverage. | Q&A style with big image galleries. | Dated. The release-day explainer was last visible as 14 Nov and has a reader comment (15 Nov) saying its Ultimate price is wrong. | Direct fetch: [release day](https://www.polygon.com/gta-6-when-does-it-come-out-ps5-pro-crossplay-countdown-preorder-preload/) |
| 3 | **Dexerto** | "Best guides for launch" roundup (18 Nov, 07:24): criminal profile, wanted system, all locations, real-life locations. Also a GTA 6 wiki with "time to beat". | Short roundup linking to topic guides + wiki. | Says guides "will continue to be updated" during launch. | Direct fetch: [roundup](https://www.dexerto.com/gta/gta-6-best-guides-for-launch-3429247/); [wiki](https://www.dexerto.com/wikis/gta-6/time-to-beat/) (search only) |
| 4 | **Game Rant** | Guides hub in its database; mechanics explainers (police/heat, money economy, relationship system). | News-flavoured feature explainers. | Pre-launch features (not verified post-launch). | Search-only: [hub](https://gamerant.com/db/video-game/grand-theft-auto-6/guides/) |
| 5 | **Eurogamer** | Localised guides: car stealing, escaping the police, map overview, weapons (Spanish and Polish editions shown). | Per-country editions with local-language slugs. | Not dated in what I saw. | Search-only: [ES steal cars](https://www.eurogamer.es/gta-6-como-robar-coches), [PL pre-buy](https://www.eurogamer.pl/gta-6-co-warto-wiedziec-przed-zakupem) |
| 6 | **IGN** | A GTA 6 wiki with location entries (via third-party summary only). | Wiki. | **Unverified.** My fetch of an IGN wiki URL returned 404 and no IGN page appeared in SERPs I pulled. Treat IGN as not checked. | Search-only (indirect) |
| 7 | **PowerPyx** | **Nothing yet.** Upcoming Guides page lists a GTA VI trophy guide **and** a GTA VI wiki, both for **19 Nov 2026**. | Long, image-heavy guide pages (their house style) plus wiki. | Scheduled drop on launch day. | Direct fetch: [upcoming](https://www.powerpyx.com/upcoming-guides/) |
| 8 | **GTA Wiki (gta.wiki)** | Independent wiki. Main page has a launch countdown banner, a GTA VI featured article, and links for wanted level, weather, criminal profile, relationship status, the protagonists and the setting. | Classic wiki, stubs, "verification needed" categories. | Live editor community. Left Fandom on 15 to 16 Mar 2026. Over 20,000 articles (Kotaku). | Direct fetch: [gta.wiki](https://gta.wiki/) |
| 9 | **Fandom GTA Wiki** | Old GTA VI page still exists and still ranks in search. Editors say it is no longer the maintained home. | Wiki. | Stale by design. | Search-only + Kotaku. Fandom curl got 403. |
| 10 | **gta6communitywiki.com** | Fan wiki aggregating Reddit/X/YouTube/TikTok/Instagram finds, each linking to the source. States updates land "about every 15 minutes after launch". Sections: characters, vehicles, weapons, secrets and glitches, clips. | Aggregator with "Latest finds" feed. Lightweight page (65 KB HTML). | An AGI Hunt item says it is meant to be run by an automated bot. **Unverified secondhand claim.** | Direct fetch: [site](https://gta6communitywiki.com/); [AGI Hunt](https://agihunt.info/p/1a1ed21e8155246d30664bae434) (search-only) |
| 11 | **games.gg** | Beginner tips, money guide, how-long guide. | Listicles, ordinary article format. | Dated pre-launch ("we do not yet know" language). | Search-only: [beginner](https://games.gg/grand-theft-auto-vi/guides/grand-theft-auto-6-beginner-tips-what-to-do-first/) |
| 12 | **grandtheft.gg** | 8-tip beginner guide, first-person voice, says the free Rockstar map goes up on the official site on 19 Nov (claim not verified by me). | Numbered tips. | Pre-launch. | Search-only: [guide](https://grandtheft.gg/gta-6-beginner-guide) |
| 13 | **gta6loop** | Beginner guide with a "before launch / day one" table. | Checklist + tips. | Pre-launch (2026). | Search-only: [guide](https://gta6loop.com/guides/beginner) |
| 14 | **Leonida Verse** | Tips, mission-order pages. | "Codex" structure. | Pre-launch. | Search-only: [tips](https://leonidaverse.com/en/codex/gta-6-tips) |
| 15 | **GTABase** | Controls guide, wanted-level explainer, guides hub. | Article hub. | Pre-launch. | Search-only: [hub](https://www.gtabase.com/gta-6/guides/) |
| 16 | **GTA6Kings / VGN** | Walkthrough index pages promising "updated daily" / launch-day content. | Hub pages. | Not yet populated. | Search-only: [GTA6Kings](https://gta6kings.com/gta-6-walkthrough/), [VGN](https://vaultlockgames.com/gta6/walkthroughs) |
| 17 | **Insider Gaming** | "All GTA 6 guides" hub, how-long and trophy-count reports. | Hub + reports. | Pre-launch. | Search-only: [hub](https://insider-gaming.com/gta-6-guides-walkthroughs/) |
| 18 | **Country unlock-time sites** (gta6db.io, leonidaunlocked.com, GTABuddy, gta6everything, GTAVice.net) | One programmatic page per country for release time. | Template pages. | Auto-style. | Search-only |

### Page-weight probe (objective, partial)
Raw HTML bytes fetched with curl by a plain browser UA, 18 Nov. **HTML only, not full page weight, and it does not render ads or video.** Ad-tech markers are strings found in the HTML.

| Page | HTML size | Ad / video tech strings found |
|---|---|---|
| [GamesRadar release time](https://www.gamesradar.com/games/grand-theft-auto/gta-6-release-time/) | 2.17 MB | doubleclick, googletag, taboola (14 hits) |
| [PC Gamer release time](https://www.pcgamer.com/games/grand-theft-auto/gta-6-release-time-date/) | 1.80 MB | doubleclick, googletag, taboola (14 hits) |
| [PowerPyx home](https://www.powerpyx.com/) | 717 KB | connatix, mediavine, googletag |
| [Polygon release-day](https://www.polygon.com/gta-6-when-does-it-come-out-ps5-pro-crossplay-countdown-preorder-preload/) | 539 KB | googletag |
| [Eurogamer](https://www.eurogamer.net/games/grand-theft-auto-vi) | 361 KB | doubleclick, googletag, prebid, primis (35 hits) |
| [Game Rant hub](https://gamerant.com/db/video-game/grand-theft-auto-6/guides/) | 328 KB | googletag |
| [Dexerto](https://www.dexerto.com/gta/gta-6-best-guides-for-launch-3429247/) | 300 KB | doubleclick, googletag |
| [gta6communitywiki](https://gta6communitywiki.com/) | 65 KB | none |
| [roarcode.github.io](https://roarcode.github.io/) | 24 KB | none |
| GameSpot, IGN, Fandom | n/a | blocked for curl (403 / 404) |

## 4. Gap analysis

### 4a. What roarcode already has
- **Live now (17 URLs in the live sitemap):** home, launch hub, beginner tips (two URLs), editions and prices, protagonists page, launch-night checklist, regions page, map page, online, platforms, pre-load size, PS5 settings, radio stations, release time, vintage pack, about. Category pages for missions, money, cars, collectibles, glitches and leaks also answer 200.
- **In `/workspace/gta6-guides/content/` but NOT live (checked: 404 on the live site):** is-gta-6-out, gta-6-launch-hub (marked live), map-size, not-working, download-stuck, preload-not-starting, ps5-fixes, xbox-fixes (all marked stub but publish true). The site is behind its own content. **Redeploy before the Slovenia unlock at 00:00 CET.**
- **Held stubs (publish false):** cheats, money, best early car, first mission, error codes.
- **Structural strengths seen on the live site:** 24 KB homepage, no ad tech, per-page "Words used on this page" boxes, a quick-answer block at the top of each page, source links, `robots.txt` and a sitemap on the right domain.
- **Weaknesses seen:** the live homepage meta description promises "missions, money methods, collectibles, cars and fixes", which are not real pages yet (they are placeholders or stubs). The release-time page covers Slovenia but, per its own text, says Slovenia and Croatia are "not listed by name in the sources we found". No language other than English. No age-rating or parent page found in content (grep for kid/parent found templates only). No page for the pre-launch release-time conflict between Rockstar's wording and PC Gamer's observation, except as a note.

### 4b. Gap list (20) with priority

**P1: do first (launch week, low competition, real demand)**

| # | Gap / angle | Evidence | What the site can do |
|---|---|---|---|
| P1-1 | **Slovenia / Croatia / Central Europe unlock time, in plain words** | Query 20 shows only one Slovenian-language result and it is not about the unlock time. Autocomplete returned nothing for "release time slovenia". Country-template sites exist for Germany but each is generic. | Keep the release-time page and `is-gta-6-out` live and updated. Add a "Slovenia (CET): 00:00 Thu 19 Nov" line near the top. Add the countdown or 'check your store' note that the competitor PC Gamer found for US consoles. |
| P1-2 | **Slovenian-language mini-pages** | Same SERP. IGN Adria is the only Slovenian result. | 3 short pages: ura izida, cena (€79,99 / €99,99), velikost prenosa (212 GB). Needs a native check from Rok before publishing. |
| P1-3 | **Launch-week fixes: not working / stuck / pre-load / servers** | Query 13: 3 of 5 are generic official support pages and 2 small fan sites. No major outlet. The repo already has 6 pages. | Redeploy them. Keep each page to confirmed official steps. Do **not** publish invented error codes. Hold the error-codes page until real codes exist. |
| P1-4 | **Real controller layouts (PS5, Xbox) once confirmed in play** | Query 11: all 5 results are fan pages, none official, several are "reported". Autocomplete suggests "controller" more than "controls", so intent is partly hardware. | After launch, post a tested button table with date and "tested on" tag. Also: how to remap, accessibility options. Needs hands-on from Rok. |
| P1-5 | **Honest "are there cheats?" status page** | Query 6: five near-identical "no codes yet" pages; one claims "community verified". Stub already written. | Publish the stub as a status page with "last checked" in CET. Add a scam warning. Update only with video-verified codes. |
| P1-6 | **Parents: age rating, content descriptors, parental controls** | Autocomplete: `gta 6 for kids`, `good for kids`, `ok for kids`, `age rating pegi/esrb`. **I did not run a SERP check for these, so competition is unverified.** | A plain-language page: rating by country, what the descriptors say (Rockstar's own list is already in `_facts.md`), how to set PS5 and Xbox parental limits, spending limits. Verify the PEGI rating from an official source before writing it. |

**P2: next 1 to 2 weeks (some competition, or needs hands-on)**

| # | Gap / angle | Evidence | What the site can do |
|---|---|---|---|
| P2-1 | **Best settings PS5 / PS5 Pro / Series S, tested** | Query 8: Verge/GamesRadar own the news, Beebom/digitbin/Engadget own the setting steps. | Replace "what is confirmed" with a tested checklist: HDR calibration, game mode, VRR, motion smoothing. Add the "PS5 vs PS5 Pro" phrase (autocomplete head term). |
| P2-2 | **Free printable map: where it is and how to print it** | Rockstar's free map reportedly goes up on 19 Nov (grandtheft.gg; also in `_queue.md` row 6). Interactive map SERP is saturated by 5 community map projects. | Do not build an interactive map. Write the "where to get the official map and how to print it" page once the link is live. |
| P2-3 | **Early-game money without glitches** | Query 7: GameSpot is the only major. Competitor claims are untested at the time of the search. | Wait for hands-on. Publish "safe, no glitch, no ban risk" with tested dates. The template exists. |
| P2-4 | **Xbox One / Xbox cloud and Series S** | Autocomplete: `xbox one`, `xbox cloud gaming`, `xbox series x fps`. Major coverage exists but no dedicated how-to in the top results I pulled. | One page: what Xbox One owners can and cannot do, bandwidth needed (check official figures), Series S settings note. Unverified competition. |
| P2-5 | **PS5 vs PS5 Pro, plain language** | Autocomplete: `ps5 vs ps5 pro`, `ps5 or ps5 pro`. Query 18 top 5 are all majors. | Do not fight majors for the news. Rewrite for a buyer: "Is the Pro worth it for this game?" with sourced facts only. |
| P2-6 | **Reframe pre-load pages after launch** | Autocomplete pre-load family will decay tomorrow. | Retitle toward "GTA 6 file size on PS5 / Xbox after the day-one patch" and "free up space". |

**P3: do not chase (high competition, short window, spoiler-risk or off-brand)**

| # | Angle | Why |
|---|---|---|
| P3-1 | Full mission walkthroughs | PowerPyx, GameSpot, IGN and the walkthrough hub sites will dominate. Conflicts with the spoiler-free rule. |
| P3-2 | Trophy / achievement list and roadmap | PowerPyx is scheduled for 19 Nov. Trophy names and descriptions are spoiler-prone. |
| P3-3 | New Zealand trick | All 5 results are majors. Window closes tonight. Account-risk topic. |
| P3-4 | Interactive map | 5 map projects already rank, one lists 858 places. |
| P3-5 | PC release | Rumour-driven. All majors cover it. Keep the platforms page accurate and move on. |
| P3-6 | Online / multiplayer | Majors own it. Keep the existing page. |
| P3-7 | How long to beat | Estimates only. Majors rank. |
| P3-8 | Standard vs Ultimate price | Majors rank. Keep it accurate, with euro prices up front. See the sentiment note on a competitor price error. |

### 4c. Differentiators (not keyword gaps)
1. **No ads, no autoplay, small pages.** Competitor HTML is 12x to 90x heavier than roarcode's 24 KB (see page-weight table). This matches the loudest reader complaint in section 5. State it plainly on the About page.
2. **Spoiler labelling.** GameSpot and GTAForums both signal that spoiler safety is something readers look for. Roarcode's "spoilers stay inside collapsed boxes" rule is the same promise and costs nothing.
3. **"Last checked" stamp in CET plus a corrections log.** Competitors have visible errors (Polygon's price, PC Gamer's own US-time conflict). Dated, sourced pages with a short corrections list can win trust.

## 5. User sentiment (citations on every item)

**Retrieval limits:** Reddit comment bodies could not be loaded; only thread titles and original-post text came back. X data comes from `search_posts_all` on 18 Nov and is noisy, because many results are promotional accounts. Items marked *(editors)* are from the wiki's own editors, not ordinary readers.

### 5a. Hate / pain points (14)

| # | Theme | Quote or fact | Source |
|---|---|---|---|
| H1 | Ads | GTA Wiki editors said Fandom's ads are "Intrusive, unavoidable for most viewers, and huge" and that "60%+ of our viewers ... are logged-out mobile visitors" *(editors, 17 Mar 2026)* | [PC Gamer](https://www.pcgamer.com/games/gta-wiki-goes-indie-as-it-slams-terrible-fandom-ad-plague-intrusive-unavoidable-for-most-viewers-and-huge/) |
| H2 | Pop-ups, huge videos | Editors list "ads above the main page header, pop-ups, and humungous videos" that "take up like, half of the display" *(editors)* | [PC Gamer](https://www.pcgamer.com/games/gta-wiki-goes-indie-as-it-slams-terrible-fandom-ad-plague-intrusive-unavoidable-for-most-viewers-and-huge/) |
| H3 | Inaccurate video | Kotaku: top-of-page videos "often ... contain inaccurate or out-of-date information", and editors "have no control over what videos appear" *(Kotaku's wording of editors' complaint, 16 Mar 2026)* | [Kotaku](https://kotaku.com/gta-wiki-leaving-fandom-rules-censorship-ads-videos-ditching-2000679115) |
| H4 | Over-censoring | Editors say Fandom's policy "even affects images of in-game adverts and audio clips of character quotes" *(editors)* | [Kotaku](https://kotaku.com/gta-wiki-leaving-fandom-rules-censorship-ads-videos-ditching-2000679115) |
| H5 | Community reaction | r/Games thread: "The GTA Wiki leaves Fandom to a new independent wiki ... citing issues such as excessive advertisements and Fandom-imposed censorship" (title only; comments not retrievable) | [r/Games](https://www.reddit.com/r/Games/comments/1runbq2/the_gta_wiki_leaves_fandom_to_a_new_independent/) |
| H6 | Content copying | r/gtaonline thread title: "Fandom's paid staff are plagiarizing GTA Online pages from the new GTA Wiki to the old one" (title only; claim unverified) | [r/gtaonline](https://www.reddit.com/r/gtaonline/comments/1v10g43/fandoms_paid_staff_are_plagiarizing_gta_online/) |
| H7 | Clickbait | r/GTA6, about 3 months old: "Clickbait articles like these should genuinely be banned. Also, youtubers with clickbait thumbnails as well." | [r/GTA6](https://www.reddit.com/r/GTA6/comments/1vqy8ql/clickbait_articles_like_these_should_genuinely_be/) |
| H8 | Clickbait (older) | r/GTA6 title (about 2 years old): "Anyone else getting tired of the endlessly clickbaitey articles about gta 6?" | [r/GTA6](https://www.reddit.com/r/GTA6/comments/1gckugv/anyone_else_getting_tired_of_the_endlessly/) |
| H9 | AI filler / fake guides | Destructoid bought a $2.99 to $5.74 "Ultimate Guide" book and found "no legitimate information about GTA 6 in it"; it contained leftover AI prompt text. The book's only low review called it "AI nonse". (Mar 2025) | [Destructoid](https://www.destructoid.com/i-actually-bought-this-fake-gta-6-guidebook-and-its-somehow-worse-than-i-expected/) |
| H10 | Guide scams | r/GTA6 (about 6 months old): "Amazon has multiple online stores selling GTA6 guides ... Are these ripoff or mistakes?" | [r/GTA6](https://www.reddit.com/r/GTA6/comments/1tgb0yx/gta6_game_guide/) |
| H11 | Spoilers from guides | X user, 3 Nov: "social media platforms need to add a setting where we can filter out all GTA 6 content so we don't get spoilers from streamers and walkthrough content" | [X: @BoiGigga](https://x.com/BoiGigga/status/2117504095737270550) |
| H12 | Spoilers from walkthroughs | X, 17 Nov: "Not everyone needs to watch your walkthrough. Some of us actually want to experience GTA 6 ourselves." | [X: @TheGTAVIRadar](https://x.com/TheGTAVIRadar/status/2122760893369143755) |
| H13 | Inaccuracy | Reader comment under Polygon's release-day explainer, 15 Nov: "You have price wrong for Ultimate edition....it's $99.99" (the article text lists both editions at $79.99) | [Polygon](https://www.polygon.com/gta-6-when-does-it-come-out-ps5-pro-crossplay-countdown-preorder-preload/) |
| H14 | Confusing unlock times | PC Gamer notes its PS5 unlock screens contradict "what Rockstar's official support page says" for US zones. An X user asks on launch day: "I live in Colorado what time is GTA 6 releasing for me on the Xbox?" | [PC Gamer](https://www.pcgamer.com/games/grand-theft-auto/gta-6-release-time-date/) · [X: @NeonReaperXVX](https://x.com/NeonReaperXVX/status/2122897910652375387) |

Also found but older and not GTA 6 specific: a 2021 r/assholedesign thread titled "You must create an account to disable autoplay... - IGN" ([link](https://www.reddit.com/r/assholedesign/comments/ozgygp/you_must_create_an_account_to_disable_autoplay_ign/)). It is a title only, so it is **not counted** in the 14 above.

### 5b. Love / what people value (8)

| # | Theme | Quote or fact | Source |
|---|---|---|---|
| L1 | Fewer ads, better mobile | GTA Wiki's own announcement of its move: "significantly fewer ads, an improved front page, and a better overall mobile experience!" *(editors, 15 Mar 2026)* | [Kotaku](https://kotaku.com/gta-wiki-leaving-fandom-rules-censorship-ads-videos-ditching-2000679115) |
| L2 | Independent sites | PC Gamer writer: non-Fandom wikis "almost always seem to be better-maintained and nicer to browse" *(a journalist's opinion)* | [PC Gamer](https://www.pcgamer.com/games/gta-wiki-goes-indie-as-it-slams-terrible-fandom-ad-plague-intrusive-unavoidable-for-most-viewers-and-huge/) |
| L3 | Community still points to the independent wiki | r/GTA6 reminders: "GTA Wiki moved from Fandom to gta.wiki" (two threads; titles only). The tool's summary says readers praised it as cleaner and ad-free, but **I could not verify any reader quote** | [thread 1](https://www.reddit.com/r/GTA6/comments/1vz2gh7/reminder_gta_wiki_moved_from_fandom_to_gtawiki/) · [thread 2](https://www.reddit.com/r/GTA6/comments/1runi6m/the_gta_wiki_has_moved_from_fandom_to_gtawiki/) |
| L4 | Going in blind | r/GTA6 PSA (28 days old): "Go in completely blind and experience and find out those new things for YOURSELF first." and "stay away from those Youtube videos that say 'Here are all the secrets within XYZ area!'" | [r/GTA6](https://www.reddit.com/r/GTA6/comments/1xbr02a/just_a_psa_be_careful_when_watching_reviews_and/) |
| L5 | Spoiler firewalls | GameSpot publishes a keyword-mute guide and says its guides will be "really careful about hiding anything that could be considered a potential spoiler" *(competitor positioning, not a reader quote)* | [GameSpot](https://www.gamespot.com/articles/how-to-avoid-gta-6-spoilers-on-your-social-media-feeds/) |
| L6 | Muting words | X, 17 Nov: a post telling followers which words to mute before launch, and a 9 Nov guide post from GTA Community. Shows people want spoiler control. | [X: @ImLosingAura](https://x.com/ImLosingAura/status/2122713802479144987) · [X: @gtacommunitynet](https://x.com/gtacommunitynet/status/2119891484560314610) |
| L7 | Labelled spoilers | GTAForums has a separate, clearly labelled GTA VI Spoilers forum; ResetEra's launch thread enforces no story spoilers until global launch (from the tool's summary and forum listings, **thread bodies not opened**) | [GTAForums](https://gtaforums.com/forum/522-gta-vi-spoilers/) · [ResetEra OT](https://www.resetera.com/threads/grand-theft-auto-vi-ot-miami-vice.1689615/) |
| L8 | Free, no-account maps | Competitors market this directly. Explore Theft Auto calls itself free, ad-free, no-account and spoiler-safe (self-description via the tool's summary; page not opened by me) | [Explore Theft Auto](https://exploretheftauto.com/about) · [Hundo Maps](https://hundomaps.com/) |

**Reading of the sentiment.** The pain points repeat four themes: (1) ads, pop-ups and autoplay video, (2) clickbait and AI filler, (3) spoilers inside guides and walkthroughs, (4) wrong or conflicting numbers. The "love" side is weaker evidence, mostly competitors' positioning and editors' statements rather than reader praise. It still points the same way: clean, fast, honest, spoiler-safe pages.

## 6. Recommendations (in order)

1. **Redeploy now.** Eight pages exist in the repo but 404 on the live site, including `is-gta-6-out` and the whole fix cluster. The Slovenia unlock is 00:00 CET tonight, so this is the single biggest win available.
2. **Fix the homepage meta description** so it does not promise missions, money, cars and collectibles that are not real pages yet.
3. **Own the CET / Slovenia / Croatia unlock time** with a short top-of-page answer, a "last checked" stamp in CET, and both Rockstar's wording and PC Gamer's US observation, labelled as such.
4. **Publish the honest cheats-status page** and the confirmed-only fixes. Do not publish invented codes or error numbers.
5. **Write the parents page** (age rating, descriptors, parental controls). First run a real SERP check, because this one is based on autocomplete only.
6. **Add three Slovenian-language mini-pages**, after Rok checks the wording.
7. **After hands-on play:** controller layouts, tested PS5 settings, early money without glitches, official-map download page.
8. **Do not chase** full walkthroughs, trophy rosters, the NZ trick, interactive maps, or PC speculation.
9. **State the "no ads, no autoplay, spoilers labelled" promise on the About page**, and keep a short corrections log.
10. **Re-run this audit on 21 Nov** with Google-based tooling if Rok has Search Console or a rank tracker, since this report has no real Google rankings.

## 7. Counts

| Metric | Count |
|---|---|
| Key queries checked (full SERP read) | 20 |
| Results analysed in those queries | 100 (5 per query; tool returns 5, not 10) |
| Google Autocomplete seeds run | 24 |
| Extra competitor-probe search results read | 41 |
| Competitors profiled | 18 (6 pages fetched directly, the rest from search snippets; IGN unverified) |
| Pages probed for HTML weight | 12 (9 returned data, 3 blocked) |
| Gaps found | 20: P1 = 6, P2 = 6, P3 = 8 (plus 3 differentiators) |
| Sentiment items | 14 hate/pain, 8 love/value (22 total; 1 further item noted but not counted) |
| Blocked or unverified data points | Google SERP (consent wall), Google Trends, Ahrefs/Semrush, IGN, Fandom, Reddit comment bodies, YouTube |
