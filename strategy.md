# GTA VI guides site: launch strategy (research)

Prepared Wed 18 Nov 2026 (Europe/Ljubljana). Research only: no accounts, no signups, no purchases, no blocks bypassed.
Spoiler policy: this document contains NO GTA VI story, mission, character-arc, ending or secret information. Where search data refers to protagonist names, they are described generically ("protagonist-name queries").

## 0. Read this first

### 0.1 Evidence-quality legend
- **[A]** Primary or official (Google docs, Rockstar/PlayStation posts, the platform's own data via API). Strongest.
- **[B]** Third-party measured data (Semrush/Similarweb pages, Google Keyword Planner via a data vendor, archived publisher output). Good, but they are estimates.
- **[C]** Vendor/promotional or secondary claims (SEO vendor briefs, company press releases, search-summary snippets I did not open). Treat as directional.
- **[D]** My inference. Labelled as such. Not data.

I found **no published week-1 to week-4 page-type traffic breakdown** for GTA V, RDR2, Elden Ring, Hogwarts Legacy, Starfield or BG3. Publishers do not release it. The "which page types win" conclusions in section 2 therefore combine (a) GTA VI's own pre-launch search demand [B], (b) what winners published and how they structured it [B], (c) Google Trends related-query observations reported by press [B/C], and (d) inference [D]. Where I say "evidence", check the tag.

### 0.2 Five findings that change the plan (action-relevant)
1. **Unlock is rolling midnight LOCAL time, not one global moment.** NZ unlocks first (00:00 NZDT Thu 19 Nov = 11:00 UTC Wed 18 Nov = **12:00 CET today**). Slovenia/CET unlocks **00:00 CET Thu 19 Nov**. The "06:00 CET" in the brief equals midnight US Eastern. PC Gamer's table (updated 17 Nov) lists CET as 12 h behind NZ, GMT 13 h behind, EST 18 h behind; it also notes PlayStation unlock screens grouped US players at midnight Eastern [A/B]. Source: https://www.pcgamer.com/games/grand-theft-auto/gta-6-release-time-date/ and https://blog.playstation.com/2026/11/10/pre-load-grand-theft-auto-vi-on-ps5-starting-today/ . **Implication:** the site has first-mover value only if live and indexed *before* ~12:00 CET today / 00:00 CET tonight, not at 06:00. Going live at 06:00 CET catches the US wave but misses the earliest UK/EU/AU English searchers. (Decision for Rok/God Bot.)
2. **Timing queries dominate GTA VI demand** (release date / "is it out" / "when"). They add to almost 1.5M US searches per month, about 5x the next topic [B, seodata.dev, Google Keyword Planner, pulled 17 Nov 2026]. After launch these flip from "when" to "is it out / unlock time / preload / download size / server or sign-in problems".
3. **FAQ rich results are gone, HowTo is gone.** Do not spend effort on FAQ/HowTo schema for SERP features (section 3).
4. **AI-generated pages at scale are a ranking risk**, not a growth lever (Google "scaled content abuse", section 3). The differentiator must be verified, original, fast, named-author content.
5. **Reddit blocks this box (HTTP 403 "Blocked") and Reddit's API terms bar commercial use without a written agreement.** Do not build a Reddit scraper; see section 5.

---

## 1. Demand evidence

### 1.1 GTA VI's own search demand (best available evidence) [B]
Source: https://www.seodata.dev/blog/gta-6-search-trends (published 2026-11-18; Google Keyword Planner data pulled 17 Nov 2026; 12-month average Nov 2025 to Oct 2026; Google rounds into buckets, treat as order-of-magnitude).

| Query (US, avg monthly) | Searches |
|---|---|
| gta 6 release date | 1,220,000 (all-time high 3.35M in Oct 2026) |
| gta 6 pre order | 301,000 |
| when is gta 6 coming out | 201,000 |
| gta 6 leaks | 165,000 |
| gta 6 price | 110,000 |
| **gta 6 map** | **110,000** (peak 170,000 US in Jun 2026 per kwstrends via search summary [C]) |
| gta 6 delayed | 74,000 |
| gta 6 trailer | 60,500 |
| is gta 6 out | 49,500 (110,000 in Jun 2026) |
| **gta 6 pc** | **40,500** (110,000 in Aug and Oct 2026; no PC date announced) |
| gta 6 news | 33,100 |
| protagonist-name queries | 22,200 (one protagonist) vs 3,600 (the other) |
| gta 6 online | 22,200 (60,500 in Oct 2026) |
| gta 6 ps5 / gameplay / countdown | 18,100 each |
| gta 6 xbox | 12,100 |
| gta 6 characters | 9,900 |

Also from the same source: "gta 6" itself averaged 9.14M worldwide searches/month; Europe is the most GTA-curious per capita (France 12.1, UK 10.3, Germany 9.6, Poland 9.3 per 1,000 people/month); "gta 6 pc" is as searched as "gta 6 ps5" in France and Germany.
Other measured points: Ahrefs "gta 6 release date" about 1.01M global/month (17 Aug 2026) [B, via Surfshark https://surfshark.com/research/chart/gta-6-scam-wave]; about 7,500/month search for a mobile/APK version that does not exist [B, same source].
ListeningMind's read: pre-launch "category entry points" are logistics, not gameplay: pre-order, day-one access, Standard vs Ultimate, and preload size/speed [C, https://www.linkedin.com/posts/listeningmind_gta-6-pulls-137m-searches-a-month-24547-activity-7495491879380180993-L8zd].

**Official launch facts relevant to page types [A]**
- Preload began 10 Nov; PC Gamer/Game8 report 212 GB install size [B]. https://blog.playstation.com/2026/11/10/pre-load-grand-theft-auto-vi-on-ps5-starting-today/
- Rolling midnight-local launch, NZ first [A, same post].
- PS5 / PS5 Pro and Xbox Series X|S only; no PC date announced (Game8 FAQ "PC Version: Unconfirmed", https://game8.co/games/GTA-6) [B].
- Rockstar Support says there is no separate service-status entry for a GTA VI online mode at launch (single-player at launch) per a search summary of the status page [C]; the status page itself returned HTTP 500 to me, so unverified.

### 1.2 Past launches: what we can actually say [B/C]

| Launch | Observable evidence | Page types it supports | Quality |
|---|---|---|---|
| **GTA V (Sep 2013)** | #1 US "Video Games" trending search of 2013 in Google Zeitgeist (https://www.gamespot.com/articles/ps4-gta-5-top-google-gaming-searches-for-2013/1100-6416767/). "gta 5 cheat" was the #2 cheat query in NZ's 2013 list (https://blog.google/intl/en-nz/products/2013_12_google-reveals-new-zealands-top/, via search summary). Within days publishers posted stock-market/money guides: Unigamesity 18 Sep 2013 (https://www.unigamesity.com/gta-5-stock-market-tips-cheats/), IBTimes UK 5 Oct 2013 (https://www.ibtimes.co.uk/gta5-stocks-market-money-cheats-investment-tips-511593). | money, cheats, collectibles-by-supply | Demand = B (trending rank). Page-type ranking = **supply evidence only, not traffic**. |
| **GTA V PC (Apr 2015)** | Launch-week PC problem content: PC Gamer fix list (https://www.pcgamer.com/gta-5-pc-fix-list/), GameSkinny fixes, NVIDIA graphics/performance guide, Digital Foundry 1080p60 article. Those are the pages top publishers produced (search summary, pages not individually opened). | fixes/crash, system requirements, best settings | C |
| **RDR2 (Oct 2018)** | Google's 2018 US gaming charts: RDR2 #2; related queries cited were legendary animals, the trapper, chapters, the fence (https://www.dualshockers.com/google-trends-2018-fortnite-red-dead-redemption-2-fallout-76/). Pre-load how-tos also surfaced (search summary). | collectible/hunting guides, early-game chapter/vendor help, preload | B (press reading of Trends) |
| **Elden Ring (Feb 2022)** | Windows Central archive shows 19 Elden Ring guides published on 24 Feb (the day *before* launch, review-code era) incl. launch time/preload, beginner tips, class choice, map fragments, Sacred Tears, Golden Seeds, respec, co-op, crafting, first bosses (https://www.windowscentral.com/how-to/archive/2022/02). Uswitch counted about 171,840 searches in 2022 combining the title with "tips/walkthrough/how to play/explained" (https://www.cbr.com/elden-ring-most-confusing-game-2022/). Google Trends rising queries in the first weeks were character/boss/location names (e.g. great rune, bell bearing; Trends page snapshot). Today Semrush shows Fextralife ranking #1 for "elden ring wiki" (33,100), "bell bearings" (27,100), #2 for "elden ring map" (40,500) (https://www.semrush.com/website/fextralife.com/overview/). | beginner tips, release/preload time, collectible locations, boss guides, map | B for volumes; Windows Central = observed output |
| **Hogwarts Legacy (Feb 2023)** | Game8's own "most accessed" ranking is dominated by location/puzzle/side-quest pages ("Where to Find the Boiler Door", puzzle room solutions, side-quest walkthroughs, collectible keys), plus choices/endings explainers (https://game8.co/games/Hogwarts-Legacy/ranking). Trends-related queries in Feb 2023 clustered on early access, house/wand choice, walkthrough (search summary). PowerPyx trophy guide exists at launch. | long-tail "where/how" location and puzzle pages, collectibles, side quests, early-access/edition info | B (first-party ranking, undated cumulative) |
| **Starfield (Sep 2023)** | Trends comparison page shows early-access/preload, traits/"best traits", ship-building queries (search summary) and console-command pages published by Gameranx/GamerGuides. 10M players within a week (Sensor Tower/AKQA). | character-creation/"best X", early access/preload, cheats/console commands on PC | C |
| **Baldur's Gate 3 (Aug 2023)** | Trends related queries at launch: specific encounters/locations and builds (search summary). | builds, locations, romance/choices | C |

**What I could not find:** week-by-week Similarweb/Ahrefs breakdowns per page type for any of these launches. If anyone claims "money guides = X% of week-1 traffic", it is not from a source I could open.

### 1.3 Page-type ranking for GTA VI weeks 1-4 [D, built on 1.1 + 1.2]
Ranked by combined evidence strength (demand data > observed publisher behaviour > inference). Higher = ship first.

| Rank | Page type | Why (evidence tag) | Caveat |
|---|---|---|---|
| 1 | **Unlock/release time, "is it out", preload & download size, launch-day problems** | Timing queries about 1.5M US/month pre-launch [B]; PS Blog/PC Gamer/Game8 all lead with it [A/B]; Elden Ring/RDR2 launch-time and preload pages published first [B] | Short-lived. Post-unlock demand shifts to "problems", so keep the URL and rewrite in place. Heaviest competition. |
| 2 | **Map** (full map, regions, fast travel/locations as discovered) | "gta 6 map" 110k US/month [B]; "elden ring map" 40.5k today [B]; maps are what wikis monetise (Fextralife) | Needs original assets. Do not copy or re-host others' map tiles. Interactive maps are expensive; start with annotated static screenshots + tables. |
| 3 | **Editions/price/pre-order bonuses/"what's in Ultimate"** | pre-order 301k, price 110k [B]; editions are logistics-intent [C] | Demand will fall once launch passes; capture the "worth it/difference" tail. Facts come from Rockstar/PlayStation Store pages only. |
| 4 | **Platform/PC/online answer pages** ("PC version?", "online mode?", "PS5 vs Xbox", "PS5 Pro differences") | "gta 6 pc" 40.5k; "gta 6 online" 22.2k [B]; Game8 uses an FAQ for exactly these | Must stay accurate: today the official answer to PC is "no date announced". Never publish rumours as fact. |
| 5 | **Beginner tips / early-game / "what to do first"** and **money** | Observed first-week staples for Elden Ring (beginner tips), GTA V (money/cheats) [B/C] | Only publish what the team has verified in play. Money/cheats pages are the highest-risk for rumour/hoax content. No cheat or exploit instructions without verification and without Rockstar-policy review. |
| 6 | **Collectibles / locations / puzzles (long tail)** | Game8 Hogwarts top-accessed list [B]; Elden Ring Windows Central output [B] | Needs gameplay time to produce; wins weeks 2-8 more than day 1. |
| 7 | **Trophies / achievements** | PowerPyx's whole model [B/C]; Hogwarts trophy roadmap at launch | Check official trophy list presence first. A search summary says no list was public pre-launch [C]. |
| 8 | **Console settings** (performance vs fidelity modes, HDR, controller/accessibility, PS5 Pro) | GTA V PC settings content was a staple [C]; this launch is console only [A] | PC "best settings" pages are moot unless a PC release is announced. Keep to what the console actually exposes. |
| 9 | **Mission/story list, game length** | Hogwarts choices/endings pages rank on Game8 [B] | Spoiler-heavy and ethically fraught; list titles only behind spoiler gates, and do it later. Not for pre-launch. |
| 10 | **Fixes and error pages** (sign-in, download stalls, crashes) | GTA V PC launch fix lists [C] | Only as verified from official support or reproducible tests. |

Also note: the biggest "named-entity" interest in this data is protagonist-name queries (about 6:1 skew toward one protagonist) [B]. This favours guide titles that name that entity where the facts are official.

---

## 2. Formats that rank (and what has changed)

### 2.1 On-page format rules [A where cited, else D]
1. **Answer first, then depth.** Put a 1-3 sentence answer or table at the top, then detail. This is the Game8/IGN house pattern (hub + table-of-contents + "Q&A-style" titles such as "Can you respec?", "How to fix [bug]?" visible on https://game8.co/games/Hogwarts-Legacy) [B]. Google's own guidance asks for substantial, complete, non-obvious content and clear sourcing/author info (https://developers.google.com/search/docs/fundamentals/creating-helpful-content) [A].
2. **Visible "Updated" timestamps with timezone, matched in structured data.** Google: add a user-visible "Last updated" date and matching `Article`/`BlogPosting` `datePublished`/`dateModified`; do not specify future dates; dates must reflect page publication/update, not the event (https://developers.google.com/search/docs/appearance/publication-dates) [A]. Only change `dateModified` when content is materially changed.
3. **Tables for lists** (editions, unlock times, controls, collectibles). Plain HTML tables, not images.
4. **Topic hubs and internal links**: one hub per cluster (Launch & Access, Map, Editions, Platforms, Beginner, Money, Collectibles, Trophies, Fixes). Game8's wiki page is a hub grouped by guide type ("Early Game Guides", "Game Mechanics Guides", "Story Guides") [B]. PowerPyx used a persistent left menu per game wiki to link every guide [B, https://www.powerpyx.com/introducing-powerpyx-wikis/].
5. **Original screenshots/video credited to the site**. Embed official trailers/videos from the publisher's YouTube channel; do not re-host. (PowerPyx explicitly allows only original-player embeds of its videos, an example of the norm [B, https://www.powerpyx.com/about/].)
6. **Named authors + an About / "how we make this site" page** with disclosure of AI assistance. Google lists AI-automation disclosure as a "how" signal (people-first doc above) [A]. Raptive's data also says named authors and genuine voice correlate with Discover performance [C].
7. **Images for Discover**: at least 1200 px wide, 16:9, `max-image-preview:large`, relevant (not logo) `og:image`. Discover docs: https://developers.google.com/search/docs/appearance/google-discover [A].
8. **Core Web Vitals, mobile first.** Raptive says CWV was among the strongest predictors of Discover inclusion in its network analysis (vendor claim) [C].

### 2.2 Schema status
- **FAQPage rich results:** reduced to "well-known, authoritative government and health" sites on 8 Aug 2023 [A, https://developers.google.com/search/blog/2023/08/howto-faq-changes]. Search Engine Journal reports Google then **stopped showing FAQ rich results entirely on 7 May 2026**, with the Search Console report and Rich Results Test support removed in June 2026 and API support in August 2026 [C, https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/]. Google says leaving the markup does no harm but has no visible effect.
- **HowTo rich results:** mobile removed Aug 2023; desktop deprecated 13 Sep 2023 [A, same Google post].
- **Recommendation [D]:** keep a visible on-page Q&A section (users like it; People Also Ask is not driven by markup) but do not invest in FAQ/HowTo markup. Use `Article`/`NewsArticle` (+ `datePublished`/`dateModified`, author, image) and `BreadcrumbList`. Do not rely on rich-result expansion for CTR.

### 2.3 Discover, Top Stories, AI Overviews
- **Discover:** no special markup; automatic eligibility if indexed and policy-compliant [A]. Raptive says tech/gaming sites get about 50% of Google traffic from Discover on its network; Discover content half-life about 12-36 hours; a 5 Feb 2026 Discover core update broadened the sites included (about 20% more sites receiving Discover traffic in early data) [C, vendor: https://investgame.net/wp-content/uploads/2026/03/2026-03-10-raptive_researchbrief_googlediscovergaming_wp.pdf]. Raptive also says high-volume low-differentiation content was hit in the Aug 2025 spam update [C]. A brand-new domain has no history, so treat Discover as upside, not plan.
- **Top Stories:** Google says news content is considered automatically; Publisher Center is not required; need bylines, dates, publisher info and original timely reporting (https://support.google.com/news/publisher-center/answer/9607026, via search summary [C]). A fresh fan site is unlikely to appear in Top Stories for head terms within days [D].
- **AI Overviews:** Raptive says answer-type queries ("release dates", "patch notes", "best builds") can be resolved without a click and cites Chartbeat showing Google Search referrals down about 35% YoY by end-2025 for 800 US media sites [C]. Player Driven's panel discussion calls walkthrough clicks "gone" (opinion/anecdote, not measurement) [C, https://playerdriven.io/live/games-media-after-ai-search]. **Implication [D]:** pure fact answers ("release time") are the most exposed; maps, interactive tools, original screenshots and verified lists are the most defensible.

### 2.4 Google quality policies that matter for a new, agent-written site [A]
- **Scaled content abuse**: "using generative AI tools or other similar tools to generate many pages without adding value for users", "scraping feeds... to generate many pages", "stitching or combining content from different web pages without adding value" are all listed (https://developers.google.com/search/docs/essentials/spam-policies, last updated 2026-08-28). The competitor-aggregator model (collect finds from Reddit/X/YouTube and republish) is the pattern this policy names. Every page must add verified, first-hand value.
- **Expired domain abuse**: do not buy an expired domain to borrow authority.
- **Site reputation abuse / free subdomains**: a new site on a free host subdomain starts with no authority of its own [D]; own domain later is better, but only with Rok's go-ahead.
- **Helpful-content self-assessment** (original info, complete coverage, sourcing, avoid mass-produced) is the checklist to apply to each page [A].
- **Scam environment**: Surfshark counted 212 GTA 6-themed domains by mid-Aug 2026, about 57 apparently built to scam (fake pre-orders, "free"/"mobile" downloads, crypto), projecting 750+ by launch [B]. A new GTA site must look clearly legitimate: disclaimer, About, contact, no downloads, no "free GTA 6" copy.
- **Rockstar fan-material policy:** a search summary says Take-Two allows fan use of its material for non-commercial purposes, requests no deliberate plot spoilers, can request removal at any time [C, https://support.rockstargames.com/articles/7bNaeoMFTV0iUDGhStTXvz/policy-on-posting-copyrighted-rockstar-games-material]. I could not open the page (HTTP 500). **The brief plans ad/affiliate monetisation; check the policy text manually before adding ads.**

### 2.5 Realistic expectations for a brand-new domain [A/C/D]
- No Google "sandbox" timer exists; rankings depend on available signals; indexing in days-to-weeks; stable ranking can take months (Mueller statements via SEJ search summary [C]: https://www.searchenginejournal.com/google-new-site-ranking-algorithm/345342/ ).
- Google does not support IndexNow (Bing/Yandex only) [C]. For Google: sitemap in Search Console + a small number of "Request indexing" calls for priority URLs; quota is unpublished [C].
- **I found no benchmark for week-1 traffic of a new fan site.** Estimate [D]: for head terms (release time, map, editions) the site is competing with IGN, Game8, PC Gamer, Polygon, Rockstar itself, plus dozens of new GTA 6 domains (e.g., gtaplaybook.com, vicedex.app, leonidaplaybook.com, leonidaunlocked.com, gtasixzone.com, consolyte.gg, gta6communitywiki.com were all surfaced by search this session). Expect negligible Google Search traffic on head terms in week 1; plausible wins are long-tail, high-specificity pages and any Discover/social pickup. Treat anything more optimistic as unevidenced.
- Competitor state today: Game8's GTA 6 wiki was last updated 17 Nov and had only news/characters/about (no walkthroughs yet) [B, https://game8.co/games/GTA-6]; Beebom and Insider Gaming pages were "coming soon" per search summary [C]; IGN has a wiki at ign.com/wikis/gta-6 per search summary [C]. The big sites' deep guide content appears to land after unlock, so day-1 depth is not fully locked up.

---

## 3. Publishing speed and how winners did it

### 3.1 What winners did [B/C]
- **Pre-launch encyclopedic pages first.** IGN's guides editor (2011 interview, old but explicit) said IGN's wiki system let it "gather encyclopedic information early" because "people will want to know... when the game is scheduled to be released, info about upcoming betas and where the best preorder deals are", and that guides publish the moment an editor hits save [B, https://www.strategyguidereviews.com/2011/08/strategy-guides-wikis-interview-igns-mark-ryan-sallee/].
- **Review/early copies:** PowerPyx: "Sometimes the developers / publishers are nice enough to provide me with an early copy... you get full trophy guides etc. on release day" [B, https://www.powerpyx.com/about/]. The Windows Central Elden Ring archive shows 19 Elden Ring guides dated the day before launch (24 Feb 2022) and only about 3-6 per day in the days after [B, https://www.windowscentral.com/how-to/archive/2022/02]. So **the winners' day-1 volume came from pre-launch access we do not have.**
- **Wiki = incremental publishing.** Game8's Hogwarts hub is built from many small question pages (dozens of mechanics questions alone are listed on the hub) [B]. PowerPyx 2017: wiki team of five added so "none of their articles will ever go live without my say-so"; the About page now lists 16 team members [B].
- **Update cadence inside a page:** Game8 keeps old guides updated (e.g., "What to Buy First" last updated years after launch) [B]. IGN: editors "looking at the wikis daily" [B].

### 3.2 How the winners are structured and sized
| Site | Evidence | Relevance to us |
|---|---|---|
| **Game8** | Semrush Oct 2026: 78.07M visits, #470 worldwide, 38.91% of desktop traffic from Google, 39.89% Direct [B, https://www.semrush.com/website/game8.co/overview/]. Company press release (JP): founded 2014, reported peaks of 500M PV/month and 42M UU in Japan; Similarweb-based #1 in Japan Q4 2024 [C, https://prtimes.jp/main/html/rd/p/000000042.000058021.html]. LinkedIn (search summary, unopened): about 90 staff, mostly Philippines [C]. | Team-and-process model; unrealistic to copy. Take the structure (hub, small pages, tables). |
| **Fextralife** | Oct 2026: 33.21M visits, 42.6% Google organic, 35.4% direct [B]. Wiki-first, search-first homepage; a front-end designer's case study claims a 30% traffic lift after a homepage redesign (self-reported) [C, https://www.jonathanchabert.com/case-study/fextralife]. | Players want to jump from "I need X" to the exact page: site search is a core feature. |
| **PowerPyx** | Similarweb Oct 2026: global rank 20,276; 54.73% of desktop visits from Organic Search; YouTube/Reddit/X top social sources [B, https://www.similarweb.com/website/powerpyx.com/]. Founded 2008, YouTube-first (GTA V video passed 2M views in June 2014), 16-person site team [B]. | Video + text companion pages, trophy/collectible focus, trust via named editors. |
| **IGN** | Wiki guides since 2011 (Mark Ryan Sallee interview) [B]. IGN policy: no embargoes beyond legal availability [C]. | Corporate scale, early builds. |
| **Sportskeeda** | Only weak evidence found (editorial team page, job posts, trade-press blurb) [C]. Nothing I can cite about its game-guide process. | Not usable as evidence. |
| **Eurogamer / GameRant / Dexerto / Polygon** | Polygon published "beginner's guide" at 10:13 ET the day before Elden Ring launch [B, https://www.polygon.com/elden-ring-guide-walkthrough/22948876/beginners-tips-tricks-class-leveling-stats-open-world-grace-light-wolves/]. | Beginner guides are a day-before-launch standard; we cannot match them. |

### 3.3 What's realistic for a small new site [D]
- Win on **speed after unlock + verification + specificity**, not volume. Fewer, deeper, regularly refreshed pages beat hundreds of thin ones (see scaled content abuse).
- Pick 25-40 pages for week 1 [D], each with at least one original screenshot or table nobody else has.
- Treat Discover/social as upside.

---

## 4. Ranked information sources to poll (every 30 minutes) with access, reliability, spoiler risk

**General rules:** poll politely (identify the bot, no more than needed), respect robots.txt and ToS, do not bypass blocks. **Spoiler quarantine:** every item goes into `content/inbox/` for review; no raw titles are surfaced in status messages to Rok. Anything tagged "story/ending/mission" is held, not summarized.

| # | Source | Verified? | Access method | Rate/limits | Reliability | Spoiler risk |
|---|---|---|---|---|---|---|
| 1 | **X @RockstarGames** (user id 29758446; 23.7M followers; verified business) | Yes, via X API user lookup. Last posts checked: 10-13 Nov (pre-load, "one week away", GTA Online event) | X connector `get_users_posts` with `since_id`, `exclude replies/retweets`. Post URL form https://x.com/RockstarGames/status/{id} | This connection reported **30 reads/min and 1,000/day**. One account every 30 min = 48 reads/day. | Highest (official) | Low (marketing); replies are unmoderated and high-risk |
| 2 | **X @RockstarSupport** (id 147776954; 1.09M; "service and support announcements") | Yes | Same as above | Same | Highest for outages/patch notes | Low |
| 3 | **Rockstar Newswire** https://www.rockstargames.com/newswire (GTA VI tag appears as `?tag=729` in hreflang links) | Page loads (200). **No RSS found**: /newswire/rss, /newswire/rss.xml, /feed all returned 404. The newswire page is a client-rendered shell (about 4 KB HTML). | No feed; watch @RockstarGames/@RockstarSupport for newswire links, or fetch the page with a real browser at low frequency. robots.txt disallows named AI crawlers (ia_archiver, Applebot-Extended, CCBot, cohere, ClaudeBot, GPTBot, Meta-ExternalAgent); other agents are not disallowed, but don't masquerade or fingerprint-evade. Rockstar sitemap.xml: 404. | Poll max every 30 min | Highest (official) | Low |
| 4 | **Rockstar YouTube channel** (UC6VcWc1rAoWdBCM0JxrRQ3A) | Yes. RSS returned latest "Grand Theft Auto VI: Pre-Load Now" published 2026-11-10 | `https://www.youtube.com/feeds/videos.xml?channel_id=UC6VcWc1rAoWdBCM0JxrRQ3A` (no key). Note YouTube's robots.txt lists /feeds/videos.xml as disallowed for generic crawlers though feeds are normally consumed by readers; keep to one low-frequency fetch. Alternative: YouTube Data API `playlistItems.list` costs 1 unit of a default 10,000/day quota [A, https://developers.google.com/youtube/v3/determine_quota_cost]. | Fine at 48/day | Official | Low |
| 5 | **Rockstar Support service status** https://support.rockstargames.com/servicestatus | Exists per search result (said "All services operational" on 17 Nov [C]). My fetches: WebFetch HTTP 500; curl no connection. **Unverified from this box.** | Retry with a browser; otherwise rely on @RockstarSupport | n/a | Official when reachable | None |
| 6 | **Platform status**: https://status.playstation.com and https://support.xbox.com/en-US/xbox-live-status | Both load (200) | Page fetch; check for "sign-in/PSN down" banners | Low | Official | None |
| 7 | **PlayStation Blog / PlayStation X (@PlayStation id 10671602) / Xbox Support (@XBOXSupport id 59804598)** | Yes | Blog HTML; X user timelines as in #1 | Same as #1 | Official | Low |
| 8 | **Outlets**: @IGN (id 18927441), @eurogamer (14799177), @GameSpot (7157132), @DualShockers (68396833); YouTube feeds verified: Digital Foundry UC9PBzalIcEQCsiIkq36PyUA, Eurogamer UCciKycgzURdymx-GRSY2_dA, GameSpot UCbu2SsF-Or3Rsn3NxqODImw | Yes (handles + RSS) | X API/YouTube RSS | Same | High for reported facts; Digital Foundry for technical analysis | **Medium-high** after unlock: they will publish story/secret content |
| 9 | **Journalists/insiders (verified handles, human-confirmed by profile text)**: @jasonschreier (Bloomberg reporter), @tomwarren (The Verge senior correspondent), @_Tom_Henderson_ (CEO/co-owner Insider Gaming; "DMs open") | Yes | X API | Same | Mixed: treat leak claims as unverified until Rockstar confirms | Medium |
| 10 | **Fan-news accounts**: @GTAonlineNews (id 1691478445, "GTA News / RockstarINTEL.com", 420k) and @RockstarINTEL (id 862758478724702209, "Not associated with Take-Two/R* Games") | Yes | X API | Same | Medium; fan-run; rumours possible | Medium-high |
| 11 | **YouTube creators**: MrBossFTW (UC0PMQXAwF6O6aeTpv962miA; verified feed; latest items about GTA 6 countdown), PowerPyx (UCWBA1-H9A5IldSb3tNwQmtQ, trophy/collectible guides) | Yes (RSS live) | RSS as above | Fine | Creators: opinionated; use as leads, not facts. | **High** after unlock |
| 12 | **Reddit**: r/GTA6 (~1.70M members at 16 Nov 2026 per third-party stats), r/GTA (~3.6M), r/gtaonline (~1.8M), r/rockstar (~173k), r/gaming (~47M) | **Existence confirmed only via third-party stats sites** (submouse, redditli.st, redpulse). From this box reddit.com returned **403 "Blocked"** for every request, so I could not verify directly. I did not try to evade it. | Official Reddit Data API: OAuth, descriptive UA, **100 queries/min** on the free tier; **commercial use needs Reddit's written permission**; new API access requires approval (self-service closed Nov 2025) [C, via search summary of https://support.reddithelp.com/hc/en-us/articles/16160319875092-Reddit-Data-API-Wiki and https://redditinc.com/policies/data-api-terms]. Site is slated to monetise, so **do not build this on the free tier.** Human reading is fine. | n/a | Low-medium (rumour/hoax heavy) | **Very high** |
| 13 | **TikTok tags** (e.g., #gta6, #gtavi) | **Not verified.** I did not access TikTok. | No open public API I could confirm for this use; scraping is not recommended. Use for human trend-watching only. | n/a | Low | Very high |
| 14 | **Public Discord servers** | **Not verified.** | Reading requires joining; automated reading by non-bot accounts is not something I confirmed as allowed. Recommend skip. | n/a | Low | Very high |

### 4.1 Suggested X search queries (use `search_posts_all` with `start_time`; X reads are quota-limited: this connection showed 30/min, 1,000/day)
Run at most 4-6 queries per cycle (8-12 reads/hour at 30-min cadence, about 200-300/day leaves headroom):
1. `from:RockstarGames OR from:RockstarSupport -is:reply` (official)
2. `("GTA 6" OR "GTA VI") (outage OR "can't sign in" OR "not downloading" OR "stuck") lang:en -is:retweet min_faves:50` (problem signals for fix pages)
3. `("GTA 6" OR "GTA VI") ("title update" OR patch OR "day one update") lang:en -is:retweet is:verified`
4. `("GTA 6" OR "GTA VI") (map OR "how to" OR tips) has:images lang:en -is:retweet min_faves:500` (lead discovery; hold for spoiler review)
5. Use `get_posts_counts_recent` for volume spikes on "GTA 6 down" to trigger a status-page check.
Watch for **impersonators**: e.g., @askplaystation (lower-case) resolved to a spam account and @TEZ2/@vgc/@gtavi are unrelated low-follower accounts, so always match accounts by the numeric ids listed above.

---

## 5. Action plan

### 5.1 Right now to launch (today, Wed 18 Nov) [D]
- **Decision needed:** go live before NZ/UK/EU unlocks, not at 06:00 CET (finding 0.2-1). NZ unlock about 12:00 CET today; CET at 00:00 tonight; UK at 01:00 CET; US Eastern at 06:00 CET.
- Pre-launch pages (official facts only; label rumours): **Launch & unlock time by timezone**, **editions/price/bonuses (from the PlayStation/Rockstar store pages)**, **preload size and how to preload (212 GB per PC Gamer/Game8)**, **platforms (PS5/PS5 Pro/Xbox Series X|S; PC: no date announced)**, **GTA Online status (single-player at launch; check official wording)**, **Is it out yet? tracker**, **"Is GTA 6 down?" with links to Rockstar Support, PSN, Xbox**.
- Technical must-haves: sitemap + Search Console verification, `Article` schema with visible dates, `max-image-preview:large`, 1200 px 16:9 og images, Core Web Vitals pass, fast static hosting, internal hubs, About/Disclaimer ("not affiliated with Rockstar Games"), AI-assistance disclosure, named editor.
- Request indexing for **only** the 10-15 priority URLs; submit sitemap. Do not spam.

### 5.2 First 24 hours after unlock
- **Hours 0-6 (from first confirmed unlock):** update the unlock/"is it out" page in place; add an "Updated hh:mm CET" line; check status pages every 30 min; publish **verified** answers to first-hour questions (does it unlock on time, download/preload behaviour, sign-in issues, default settings/modes, first-load experience, controls). Each item needs first-hand verification or an official link.
- **Hours 6-24:** ship Map v1 (static, annotated, original screenshots), Beginner tips v1, Settings/display modes v1 (no spoilers), Trophies/achievements page if an official list is visible. Move first problem/fix pages only from verified reproduction or official support.
- Poll sources every 30 min (section 4); triage inbox: promote only items with an official source or first-hand repro.
- Do not publish a cheat/exploit page until proven; flag any "money glitch" as unverified.

### 5.3 Week 1
- Daily cadence [D]: 2-4 updates to hubs + 5-10 new long-tail pages/day, each ≥ 1 original asset. Prioritise by Search Console impressions (queries start appearing in 2-3 days) and by section 1.3 ranking.
- Add **site search** (Fextralife's search-first lesson) and a "Start here" hub on the homepage.
- Publish collectible/location pages as they are verified (batch to avoid thin pages; use tables with locations and screenshots).
- Add video embeds (official trailers; any original captured clips) to the map and tips hubs.
- Watch Search Console: "Discover" report, Core Web Vitals, indexing coverage, manual actions/spam warnings.
- Review Rockstar's fan-material policy text and any monetisation constraints before enabling ads.

### 5.4 Weeks 2-4
- Move from "answers" to "assets": better maps, completion checklists, trophy roadmaps, comparison pages (e.g., difficulty/modes), "best X" lists backed by tested criteria.
- Refresh old pages after patches (visible change log; only then update `dateModified`).
- Pursue **Discover**: longer descriptive headlines, strong 16:9 images, named authors with photos, no clickbait (Discover docs) [A/C]. Publish more on weekends only if Search Console Discover data shows weekend lift [C].
- Consolidate thin pages; noindex or merge pages that never get impressions (reduces scaled-content risk).
- Build **non-Google audience**: newsletter, YouTube Shorts/short clips (original), community posts. Evidence that Google dependence is risky: AI Overviews and algorithm volatility (Raptive/Player Driven/Game Business) [C].
- Re-check Rockstar's official statements about PC, GTA Online and DLC; keep those pages as living FAQs.

### 5.5 What not to do
- Do not copy competitor text, tiles or lists.
- Do not publish leaked or pre-release paid content; do not use "free GTA 6", APK or "download" language (scam-adjacent).
- Do not mark up FAQ/HowTo for SERP gain; do not fake `dateModified`.
- Do not scrape Reddit or bypass its block; do not use Discord/TikTok scrapers.
- Do not publish rumours as facts; mark and date them.

---

## Appendix A: verification log (what I actually tested, 18 Nov 2026 ~11:35-12:00 CET)
- `curl` Rockstar: /newswire/rss, /newswire/rss.xml, /feed → 404; /sitemap.xml → 404; /VI → 200; robots.txt shows only the listed AI-crawler disallows. `support.rockstargames.com` → no connection from curl; WebFetch → HTTP 500.
- `curl` reddit.com (r/GTA6, r/GTA, r/gaming, r/rockstar, r/GTAOnline, others, and robots.txt) → 403 "Blocked". No evasion attempted.
- YouTube RSS: Rockstar, PowerPyx, GameSpot, Digital Foundry, Eurogamer, MrBossFTW returned feeds; IGN `user=IGN` returned a feed header (channel id 5YfR2K_rXeIy7bseOKky6Q) but no latest item parsed.
- X user lookups (read-only): RockstarGames, RockstarSupport, _Tom_Henderson_, jasonschreier, IGN, XBOXSupport, PlayStation, RockstarINTEL, GTAonlineNews, tomwarren, eurogamer, GameSpot, DualShockers, PowerPyx, Fextralife: all returned real accounts. `RockstarNewswire` is 16 characters, which exceeds X's 15-character handle limit, so no such handle exists. `PlayStationSupp` is suspended. `Game8_Official` not found. `askplaystation`, `TEZ2`, `vgc`, `gtavi` resolved to unrelated/spam low-follower accounts.
- X read quota shown by the tool: 30/min, 1,000/day for this connection.

## Appendix B: items I did not fully verify
- Search-synthesis facts marked [C] where I did not open the underlying page (Mueller statements, SEL 42% AI Overviews figure, Google Trends related queries for Starfield/BG3/Hogwarts, GTA V PC fix articles, Rockstar fan-material policy, Reddit API terms, Game8 headcount, IGN wiki URL).
- Trophy/achievement list and exact "single-player-only at launch" wording: confirm from Rockstar/PlayStation Store pages.
- TikTok and Discord sections: no testing done.
