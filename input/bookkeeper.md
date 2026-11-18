# Real numbers from gaming / guide-site owners — and the corrected money model
Author: Bookkeeper · Written Wed 18 Nov 2026 (Europe/Ljubljana) · Research only: nothing signed up, nothing posted, nothing bought.
No GTA VI story, mission or character details are used anywhere in this file (the site is treated as "a big-launch game guide site").

**Status codes in the table**
- **L** = I loaded the page this session and read the numbers myself.
- **S** = seen only in WebSearch result text. For Reddit this is mostly an AI-written summary of the thread, not a verbatim quote (a few results gave verbatim excerpts; marked "excerpt"). I could not open these threads myself — see §1.
- **M** = modelled/estimated by a vendor or aggregator, not a real site's own number.
- **SR** = self-reported by the site owner (anecdotal, unaudited, survivorship-biased). **3P** = third-party tool estimate (Similarweb etc.). **B** = broker-verified listing. **V** = vendor marketing.
- "derived" = I computed the RPM/other figure from the numbers shown; the author did not state it.
- RPM is **per 1,000 pageviews** unless it says "sessions" or "visits".

---
## 0. Summary (read this first)
1. **56 table rows** (§2) from about 45 distinct sources. 19 rows are pages I loaded and read myself; the rest are search-result sightings (mostly Reddit, which I could not open). About 20 distinct owner/site reports are self-reported numbers; the rest are third-party tool estimates, vendor material, broker listings or modelled figures (rows marked M or V are not real site data).
2. **Real RPMs are lower and slower than my first model.** A brand-new domain can only use AdSense (or Journey after approval and a ~60–90-day ramp). Real AdSense gaming figures are mostly **$0.1–2**, not $3–6. Journey-class networks show **$2.5–3 in the first months, $6–8 only after the ramp and clean ad code**. The $13–25 Mediavine and "high-$20s" Raptive numbers come from 2020–21 owner posts and vendor testimonials; they need months of history and 25k+ pageviews.
3. **Launch spikes decay fast, and RPM falls during the spike.** Demand proxy: Palworld Steam concurrents fell **−64% in 14 days**; one guide site lost **−47% of users in 2 months** after a demand shock; Mediavine itself says RPM drops on spikes (mobile, non-US, short pages). A new domain mostly **misses** the first-week peak and ramps later.
4. **Google risk is real and measured:** AI Overviews / HCU cut search clicks by −42% (64-site portfolio, Q4 2025), −50% (Minecraft.fr, with ad revenue −58% YoY), −85% (Retro Dodo after the Sept 2023 HCU), and **−97%** (a one-person gaming site, 155k to 4.5k users). Raptive says about 50% of Google traffic to gaming media now comes from **Discover**, not search.
5. **Model correction (details §7):** 6-month gross, old vs new — Conservative **€75 → €25**, Base **€966 → €500**, Viral **€8,253 → €5,541**. Break-even PV/month with an s.p. in place, base case: **29k → about 35k** (Journey-level RPM) or **about 59k** if stuck on AdSense.
6. **Cash timing:** Journey pays **Net 65** (about 2–3 months after the revenue month), so month-1 money arrives around February 2027.

---
## 1. Method and access limits (be honest about what I could and could not read)
- **Reddit is blocked from the box:** `curl` with a normal User-Agent, to `www.reddit.com/*.json` and `old.reddit.com`, returned HTTP 403 "You've been blocked by network security"; the WebFetch tool returned HTTP 500 or "post deleted" for the threads I tried. I did not use any proxy or scraper to get around this. So every Reddit row is **S** (search result text only). Treat those numbers as "reported in a summary of the thread".
- **X (x MCP, `search_posts_all`, public reads):** 4 searches (gaming RPM, guide-site traffic loss, AI Overviews). Nothing usable came back: the hits were generic SEO/publisher posts, with no gaming-site traffic or RPM numbers from an identifiable owner. One non-gaming post showed monthly Journey/Raptive/Ezoic payouts, and one thread was about wikis (no numbers). **No X data points are used.**
- **Forums:** BlackHatWorld, Warrior Forum, Indie Hackers, Mediavine/Raptive publisher communities: nothing surfaced in search with usable gaming numbers (Hacker News and Indie Hackers search also returned nothing with first-week traffic/AdSense earnings for a game fan site). **Gap.**
- **Marketplaces (Empire Flippers / Flippa) listings** were seen only through search results and aggregators (Acquisiteur, TheWebsiteFlip).
- **Not found at all:** week-by-week guide-site traffic curves for named launches (Elden Ring, BG3, Starfield, Hogwarts Legacy, Cyberpunk, RDR2, Black Myth Wukong, Monster Hunter Wilds) from a small site owner. The best I could find are the demand proxies and big-site numbers in §2C.

---
## 2. Data points
### A. RPM and earnings (self-reported unless stated)

| # | Who / site type | Network | Traffic | RPM | Earnings | Date | Status | URL |
|---|---|---|---|---|---|---|---|---|
| A1 | Solo gaming blog, "top 10" lists, 334 posts, 2 yrs old | Mediavine (first payout Sept) | 186k–329k PV/mo in the last 7 months (≈1.64M PV; ≈1.96M incl. the author's April prediction) | **≈$8.7–10.4** (derived: $17,071 ÷ PV) | $17,071 Mediavine over 8 months + $440 Amazon + $500 guest posts | ~Apr 2019 (post later deleted) | S excerpt, SR | https://www.reddit.com/r/juststart/comments/be65dw/case_study_update_gaming_blog_2_years_in_20003000/ |
| A2 | Video-game site, case study series (month 12) | Ezoic → AdThrive | users 211k (Apr 2020, COVID peak) → 112,766 (Jun 2020) | Ezoic **< $2** → AdThrive **≈ $7–8** | First full AdThrive month **$734.97** after expenses | Jul 2020 | S summary, SR | https://www.reddit.com/r/juststart/comments/hjolrr/video_game_website_i_love_adthrive_month_12/ |
| A3 | Same series, month 5 | Ezoic | ≈36k sessions / ≈41.5k PV | **≈ $3.9/1k PV** (derived; $4.5/1k sessions) | $163 | ~Dec 2019 | S summary, SR | https://www.reddit.com/r/juststart/comments/e5psqf/case_study_video_game_website_month_5/ |
| A4 | Same series, month 7 (new theme, 3 writers hired) | Ezoic/display (network not named in the summary) | 34,375 users / 41,072 sessions / 46,744 PV, bounce 91% | **≈ $1.75** (derived) | $81.74 | ~Feb 2020 | S summary, SR | https://www.reddit.com/r/juststart/comments/ey02yf/case_study_video_game_website_new_theme_writers/ |
| A5 | Same series, month 2 | AdSense | 43,377 sessions / 52,570 PV, bounce 83% | **≈ $0.48** (derived) | ≈ $25 AdSense; Ezoic and Mediavine had **rejected** the site | ~Sep 2019 | S summary, SR | https://www.reddit.com/r/juststart/comments/cy1jel/case_study_video_game_website_month_2/ |
| A6 | "Video game site", month 2 ("Pay my rent by February") | AdSense | 10–15k PV | **≈ $0.75–1.1** (derived) | ≈ $11; Ezoic and Mediavine rejected (traffic judged unreliable) | ~Oct 2019 | S summary, SR | https://www.reddit.com/r/juststart/comments/dbv3cy/case_study_video_game_site_month_2_aka_pay_my/ |
| A7 | "Video game site", month 4 (may be a different author from A2–A5; do not chain) | AdSense → Ezoic | 26,235 sessions (7,399 organic) | Ezoic-reported avg RPM **$14.56** vs AdSense ≈ $7 (Ezoic's number is likely per visit; derived total ≈ $8.6 per 1k sessions) | $226.45 (vs ≈ $24 the previous month) | ~Dec 2019 | S summary, SR | https://www.reddit.com/r/juststart/comments/e5mz5m/case_study_month_4_video_game_site_22645400/ |
| A8 | Gaming blog, thread "Gaming Blog RPMs With Ad Networks" | Ezoic / Mediavine / Nitro (replies) | Ezoic ≈100k PV; Mediavine ≈135k PV | Ezoic **$5–7 per 1k visits** (one $13–15 outlier); Mediavine **$11–15**; Nitro said **$1–9** | n/s | 5 Mar 2021 | S summary + fragments, SR | https://www.reddit.com/r/juststart/comments/lxmfan/gaming_blog_rpms_with_ad_networks/ |
| A9 | "Mediavine RPM for gaming site" | Mediavine vs AdThrive | n/s | Mediavine **$13–25** (seasonal); AdThrive **$7–10**; gaming content on a mixed tech site **$5–8** | n/s | ~2021 (date not shown) | S summary, SR | https://www.reddit.com/r/juststart/comments/o2ccnw/mediavine_rpm_for_gaming_site/ |
| A10 | "Gaming and other niches RPM?" | AdSense / premium gaming net | various | Generic PC/console gaming **$1–2** (range $1–12 by layout); premium gaming net **$1.50–2**; Italian gaming site **€0.10–0.35**; an entertainment site $10 at 100k PV | n/s | ~Jul 2022 | S summary, SR | https://www.reddit.com/r/juststart/comments/w6wspr/gaming_and_other_niches_rpm/ |
| A11 | Gaming blog "doing 10k PV/month — how do I scale?" | n/s (replies: Ezoic, AdThrive) | 10k PV | ≈ $15 (derived; flagged unusually high by repliers) | ≈ $150/mo | ~2021 (date not shown) | S summary, SR | https://www.reddit.com/r/juststart/comments/npsbyr/gaming_blog_doing_10k_page_views_per_month_how_do/ |
| A12 | **Two gaming sites built from zero in ~4 months** (income report) | **Mediavine Journey** | Site 1: 77,521 → 103,244 PV (Mar → Apr); Site 2 (launched 10 Mar): 13,070 → 16,519 PV | Site 1 **$3.05 → $6.01**; Site 2 **$2.46 → $8.01** (the author says the March figure was partly a broken ad script) | Site 1 $236 → $620; Site 2 $32 → $132; combined Apr **$752** | 5 May 2026 | **L**, SR | https://deanitgl.com/blog/april-2026-income-report-752-across-two-gaming-sites/ |
| A13 | Gaming guides site on Journey ("Raptive or Mediavine for gaming?") | Journey vs AdSense | ≈30,000 sessions/mo (commenter); poster: 2.27 PV/session, 10-min sessions, 75% Tier 1 | "a lot better than AdSense" (no figure) | n/s | 12 Jun 2026 | S excerpt, SR | https://www.reddit.com/r/Blogging/comments/1u3ui0c/raptive_or_mediavine_which_is_better_suited_for/ |
| A14 | Gaming site on Journey (r/adops sentiment snapshot) | Journey | n/s | **$1.75 per 1k sessions** (weak source, one comment in an aggregator snapshot) | n/s | Apr 2026 | S summary only, SR | https://reddit.sentinel-team.org/subreddits/adops/snapshots/2026-04-29T05%3A20%3A47.712275Z |
| A15 | New game site, first 2.5 weeks | Playwire | n/s ("≈80% fill") | **≈ $4.50 PV RPM** | n/s | 2026 (id 1ug4h00) | S summary, SR | https://www.reddit.com/r/adops/comments/1ug4h00/solid_experience_with_playwire_so_far_on_a_brand/ |
| A16 | Gaming guide site asking about offers, >50% US | Playwire / Publift / NitroPay quotes | 1.4M PV/mo | Playwire est. **$3–6 net** (derived $2.9–4.3); Publift quote $4k–10k/mo (derived $2.9–7.1) | quotes, not earnings | 2026 (id 1wp5uz8) | S summary, SR (quotes) | https://www.reddit.com/r/adops/comments/1wp5uz8/completely_new_to_ads_been_approached_by_nitropay/ |
| A17 | Gaming site with 600k PV, ~1M impressions | network not stated in the result | 600k PV | **≈ $0.22** (derived; gross CPM $0.23) | **$133**/mo | 2026 (id 1vep1yo) | S summary, SR | https://www.reddit.com/r/adops/comments/1vep1yo/gaming_site_getting_133_ad_revenue_despite_600k/ |
| A18 | Competitive-gaming site (2.28M PV) | Venatus | 2.28M PV (only ~250k impressions served) | **≈ $0.086** (derived; partial tagging) | $197 | ~2021 | S summary, SR | https://www.reddit.com/r/webdev/comments/lsg7sa/2_mil_page_view_website_earning_200_in_ads_100/ |
| A19 | Gaming how-to site launched 2019 (author's Substack) | Ads + affiliate, later Mediavine | 30k users → peak 155k users/mo | Early ≈ **$100 per 1,000 users** (ads + affiliate); later about **1/5** of that; 155k users ≈ $3.5k/mo ≈ **$22.6 per 1,000 users** | ≈ $3,000/mo at 30k users; ≈ $3,500/mo at 155k | 9 Sep 2025 (post) | **L**, SR | https://nicksinclair2310.substack.com/p/how-my-gaming-website-went-from-155000 |
| A20 | Mediavine publishers generally (not gaming-specific) | Mediavine | n/s | RPMs **−10–40% YoY** in Oct 2025; one drop from mid-$30s to $12 | n/s | Oct 2025 | S summary, SR | https://www.reddit.com/r/Blogging/comments/1o77wim/mediavine_rpms_through_the_floor/ |
| A21 | Spanish/LATAM gaming guide site, 8M+ PV | via Refinery89 (fixed RPM) | 8M+ PV/mo | n/s | revenue **+20%** after switching | n/d | **L** (vendor case study), V | https://refinery89.com/eliteguias-success-story-refinery89/ |

### B. How fast new sites grow (ranking / ramp)

| # | Who / site type | Network | Traffic by month | RPM | Earnings | Date | Status | URL |
|---|---|---|---|---|---|---|---|---|
| B1 | Solo gaming blog, first 6 months (same author as A1) | AdSense/none | PV months 1–6: **2.2k, 4.6k, 3.7k, 4.6k, 9.1k, 13.5k**; month 12 ≈ 63k; month 24 ≈ 263k | n/s | first Mediavine payout only in month ~17 | ~Apr 2019 | S excerpt, SR | https://www.reddit.com/r/juststart/comments/be65dw/case_study_update_gaming_blog_2_years_in_20003000/ |
| B2 | Video-game site series (A2–A5) | AdSense → Ezoic → AdThrive | PV months 2 / 5 / 7: **52.6k / 41.5k / 46.7k**; accepted by AdThrive at month 11 | see A | see A | 2019–20 | S summary, SR | month 2: .../comments/cy1jel/ · month 5: .../comments/e5psqf/ · month 7: .../comments/ey02yf/ (full URLs in A3–A5); AdThrive-approval post (month 11, not read): https://www.reddit.com/r/juststart/comments/guxw8k/case_study_video_game_website_approved_by/ |
| B3 | Dean Fleming's two sites (from A12) | Journey | Site 2: **13k PV in its first ~3 weeks, 16.5k in month 2**; Site 1: 77.5k in month ~3, 103k in month ~4 | see A12 | see A12 | Mar–Apr 2026 | **L**, SR | https://deanitgl.com/blog/april-2026-income-report-752-across-two-gaming-sites/ |
| B4 | "Old gaming website" restart, month 6 (counter-example) | AdSense | 1,641 users / 4,323 PV, 38 posts, traffic spikes only from Reddit links | ≈ €0.10 (derived) | **€0.45** | ~Jul 2022 | S summary, SR | https://www.reddit.com/r/juststart/comments/vowyno/old_gaming_website_case_study_month_6/ |
| B5 | Journey/Mediavine ramp talk | Journey | n/a | RPM learning "~30–45 days" (practitioners); Journey itself needs 1,000 sessions/30 days and shows "60+ days of consistent traffic" improvements (A12) | n/a | Sep 2026 | S summary (thread), SR | https://www.reddit.com/r/Blogging/comments/1wd6v2a/is_there_really_a_90day_rampup_period_for/ |

### C. Launch spike and decay

| # | What | Numbers | Date | Status | URL |
|---|---|---|---|---|---|
| C1 | Palworld Steam concurrent players (demand proxy, not guide traffic) | Peak **2,101,867** (27 Jan 2024) → **757,508** (10 Feb 2024): **−64% in 14 days** | Feb 2024 | **L** | https://www.pcgamesn.com/palworld/steam-player-drop |
| C2 | Palworld Steam average players | **1.15M (Jan 2024) → 440k (Feb 2024)**, about −62% month on month | 2024 | S (search summary of playercount.gg) | https://playercount.gg/palworld |
| C3 | paldb.cc (Palworld database) | Similarweb: 872.4k visits, **−57.17% vs prior month**; global rank 26,013 → 54,730 in 3 months | Oct 2026 | **L**, 3P | https://www.similarweb.com/website/paldb.cc/ |
| C4 | bg3.wiki (3+ years after launch) | Similarweb: 3.1M visits, **−19.57% vs prior month**; rank 10,955 → 15,529 in 3 months. Long tail of millions of visits for a reference wiki 3 years on | Oct 2026 | **L**, 3P | https://www.similarweb.com/website/bg3.wiki/ |
| C5 | bg3.wiki founder on ads | Expected traffic to decline and revenue to be uncertain; example math of $15k/mo split among ~115 people | n/d | **L** | https://bg3.wiki/wiki/bg3wiki:Ads_Announcement_2 |
| C6 | hollowknight.wiki (year after Silksong launch, 4 Sep 2025) | ≈1.2M visits, −14.17% vs prior month | Oct 2026 | S (Similarweb via search) | https://www.similarweb.com/website/hollowknight.wiki/ |
| C7 | PC Gamer, Elden Ring quest-guide | **5.2M+ readers**; stayed in the top stories "for months after release". A separate TV-tie-in page had almost no readers for 2 years, then 1M+ in 2 months | Feb 2022 (guide); Nov 2023 (article) | **L**, first-party | https://www.pcgamer.com/12-of-the-most-read-articles-in-pc-gamers-website-history/ |
| C8 | Enthusiast Gaming network, Elden Ring month | US views **1.1B in Mar 2022, +44% YoY** (Comscore) — a huge network got +44%, not +400% | Apr 2022 | S | https://www.sec.gov/Archives/edgar/data/1854233/000153949722000910/exh99-1.htm |
| C9 | WePC (small publisher), Elden Ring hub | **550k+ web views**, avg time-on-page 5:40, 25M TikTok views | 2022 | S | https://www.agencygmr.com/blog/blog/the-power-of-tiktok-elden-ring-x-wepc-gaming/ |
| C10 | Hogwarts Legacy official site | monthly visits **1.7M → 4.3M (+153%)** (Similarweb, via a marketing case study) | Feb–Mar 2023 | S, 3P | https://everydaymarketing.co/business-and-marketing-case-study/hogwarts-legacy-lead-hp-return/ |
| C11 | Mediavine help page: "Why did my RPM drop during a traffic spike?" | Spikes bring mobile / non-US / short-page traffic with fewer ad slots, so **RPM falls**; a US decline or a rise in India/Thailand/Brazil traffic pulls RPM down | n/d | S (page text in the search result), V | https://help.mediavine.com/why-did-my-rpm-drop-during-a-traffic-spike |
| C12 | Monetific, gaming niche page | Opinion, **no measured data** ("not enough data yet"): traffic arrives faster than advertiser demand; "a million pageviews in a weekend can earn barely more than a normal week"; Q4 is the peak, January the trough | 29 Jul 2026 | **L**, opinion | https://monetific.com/niche/gaming |

### D. Google HCU / AI Overviews / publisher collapse

| # | What | Numbers | Date | Status | URL |
|---|---|---|---|---|---|
| D1 | Retro Dodo (retro-gaming guides, ~6 staff) | About 2M readers at peak; **lost ≈85% of traffic** after the Sept 2023 HCU; still profitable but "nowhere near" before; pivoting to video and memberships | Feb 2025 | **L** | https://searchengineland.com/retro-dodo-seo-google-kagi-451169 |
| D2 | GGRecon (UK gaming publisher) | Record traffic Aug 2023; HCU Sept 2023; updated/removed 10,000+ articles; **closed 18 Oct 2024** | Oct 2024 | **L** | https://ppc.land/googles-algorithm-changes-lead-to-shutdown-of-uk-gaming-publisher/ |
| D3 | Search-visibility (Sistrix via Lily Ray) | Gamerant **−67.3%**, Game Informer **−62.9%**, Kotaku **−64%** (visibility, not traffic), Sept 2023–Apr 2024 | May 2024 | **L** | https://aftermath.site/google-seo-kotaku-game-informer-dexerto-change/ |
| D4 | Define Media Group, 64-site portfolio (not gaming-specific) | Organic search clicks **−42%** from the pre-AI-Overviews baseline by Q4 2025 (−16% immediately); Discover +30% and now ≈ equal to search | Mar 2026 | **L** | https://searchengineland.com/google-ai-overviews-cut-search-clicks-report-471497 |
| D5 | Raptive research brief (197 gaming sites; Chartbeat 800 US media sites) | Google Search to media sites **≈ −35% YoY** by end 2025; gaming "answer-type" queries (release dates, patch notes, builds) are hit hardest; **≈50% of Google traffic to gaming media is Discover**; Aug 2025 spam update sent some sites from millions of Discover clicks to near zero | Mar 2026 | **L**, V | https://investgame.net/wp-content/uploads/2026/03/2026-03-10-raptive_researchbrief_googlediscovergaming_wp.pdf |
| D6 | Minecraft.fr (French gaming site) | Google organic clicks **−50%** over 16 months with stable impressions; **ad revenue −58% YoY** within 3 months (fewer impressions + collapsing CPM) | May 2026 | **L** (secondary report) | https://rabbitrank.com/blog/minecraft-fr-google-clicks-halved-by-ai |
| D7 | Reuters Institute on games journalism | ICO Partners: European specialist games sites **1,511 → 406 (−73%)** 2021–2023; 349 games journalists left in H1 2026 | 17 Nov 2026 | **L** | https://reutersinstitute.politics.ox.ac.uk/news/grand-theft-auto-vi-breaks-records-games-journalism-reinvents-itself-survive |
| D8 | Fandom (Semrush, all wikis) | 938.99M visits Oct 2026, **−13.45% vs Sept**, below Aug's 1.17B (cause not isolated) | Oct 2026 | S, 3P | https://www.semrush.com/website/fandom.com/overview/ |
| D9 | Game8 and Game Rant (aggregator snapshots) | Game8 −7.62% m/m (Sept 2026); Game Rant +3.32% m/m (Sept) / +22.8% m/m (Oct); Game Rant organic −14.8% m/m (Jun) — mixed, no clean AI attribution | 2026 | S, 3P | https://onelittleweb.com/digital-market-intelligence/popular-websites/entertainment/ |

### E. Marketplace listings (broker-verified revenue) and modelled/vendor numbers (NOT self-reported site data)

| # | What | Numbers | Date | Status | URL |
|---|---|---|---|---|---|
| E1 | Empire Flippers: gaming-guides WordPress site (created Jun 2018), Ezoic + Amazon + AdSense | **$2,193/mo profit**, $26,580 annual revenue, 170 posts, 91% organic, US 57%; sold for **$72.4k (2.75x)**. Listed as having a freelance writer | Sep 2026 | S, B | https://acquisiteur.com/deal/2-2k-per-month-amazon-associates-site-in-the-gaming-niche-47346 |
| E2 | Empire Flippers: 7-year-old gaming guides/walkthrough blog, display ads | **$3,091/mo**, asking **$105,079 (34x)**; "resilient during recent algorithm updates" | Jun 2026 | S, B | https://thewebsiteflip.com/analysis/deal-flow/jun-24-2026/ |
| E3 | Flippa: 16-year-old gaming site, mostly non-US traffic | **$1,006/mo**, asking $40,000; traffic and revenue stable | Jul 2026 | S | https://thewebsiteflip.com/analysis/deal-flow/jul-22-2026/ |
| E4 | Revenue By AdApp benchmark: gaming | Tier-1 gaming RPM **Mediavine $11.90 / Raptive $12.60 / Ezoic $6.65 / AdSense ≈ $4.90**; "50k sessions = $560/mo Mediavine, $592 Raptive, $314 Ezoic, $232 AdSense"; says "not a quote from any network" | Oct 2026 | S, **M** | https://www.revenuebyadapp.com/estimates/mediavine/gaming |
| E5 | Raptive for Gaming page (vendor) | "+47% RPM lift on average in the first 3 months for switchers since 2025"; one publisher "RPMs in the high twenties… in Q1" after a month; guarantee of +15% RPM lift; 197+ gaming properties; entry bar now 25k PV | Apr 2026 | **L**, V | https://raptive.com/gaming/ |
| E6 | pubsleuth: Journey page | Journey: **70% share, Net 65, $100 minimum, 1,000 sessions/30 days to apply, ad exclusivity (no other programmatic)**; gaming Journey sites: typical 7k visits → **$58–78/mo (≈ $8–11 per 1k visits, ±15%)**; modelled | 18 Nov 2026 | **L**, **M** | https://pubsleuth.com/ad-networks/journey |
| E7 | Yolla Media (ad-tech agency blog) | Blended gaming page RPM **$4–10**; US display $6–15 (all-format $10–25); Eastern Europe $1–3; SE Asia $0.40–1.50; India $0.25–1 | 2026 | S, **M**, V | https://yollamedia.com/blog/rpm-benchmarks-gaming-sites-2027 |
| E8 | Mediavine revenue-share page | Sites launched after 1 Jan 2026: **75%** to publisher under $100k/yr | 2026 | S (page text), V | https://help.mediavine.com/revenue-share |
| E9 | Hypestat estimate for palworld.gg | 2.32M visits and "$661/day" are an algorithmic guess, **not used** | n/d | S, **M** (ignore) | https://hypestat.com/compare/paldex.io/palworld.gg |

Count: A 21 + B 5 + C 12 + D 9 + E 9 = **56 rows**; 19 are marked L (loaded by me). Rows C5, C11, C12, A21 and E4–E9 are context, percent-only, vendor or modelled figures rather than real traffic/RPM data, which leaves about 46 rows with real numbers (several rows repeat the same site, e.g. A1/B1, A2–A5/B2, A12/B3).

---
## 3. Real RPM by network (what the owners actually said)
| Network | Real self-reported RPM range | Notes |
|---|---|---|
| **Google AdSense** | **$0.1–2 typical** (A5 $0.48, A6 ≈$0.9, A10 $1–2, B4 ≈€0.10, A10 Italian €0.10–0.35); one 2019 anecdote ≈ $7 (A7) | Vendor models say ≈$4.90 for Tier-1-heavy traffic (E4); real small-site numbers are well below that. Traffic mix is the driver. |
| **Ezoic** | **<$2 (2020) to ≈$3.9 (2019)**; $5–7 per 1k *visits* at 100k PV (A8); Ezoic's own metric once showed $14.56 (A7, ePMV is per visit) | Ezoic and Mediavine **rejected** two of the new sites at 50k PV (A5, A6). |
| **Mediavine Journey** | **$2.5–3 in the first month(s)** → **$6–8 after 60+ days and a fixed script** (A12); one weak report $1.75/1k sessions (A14) | Needs 1,000 sessions/30 days, 70% share, Net 65, ad exclusivity (E6). |
| **Mediavine (full)** | **≈ $8.7–10.4 derived (A1, 2019)**, owner-reported $11–25 (A8, A9, 2020–21) | Needs about $5,000/yr revenue to enter; RPMs for publishers fell 10–40% YoY in Oct 2025 (A20). |
| **Raptive / AdThrive** | **$7–10 (A2, A9; 2020–21)**; "high twenties" is vendor-selected marketing (E5) | Entry 25k PV; the newest self-report I could see had no number. |
| **Playwire** | **$3–6** (A15 ≈$4.50 early; A16 estimate) | Quote-based figures. |
| **NitroPay** | **$1–9** (Nitro's own range in A8); **≈$0.22** on poor traffic (A17, network not stated) | Weak data. |
| **Venatus** | **≈ $0.086** in one partial-tag case (A18) | Venatus case studies show only % uplifts. |
| **Snigel / Publisher Collective** | **No real owner numbers found** | Entry bar is far above this site's reach (see monetization.md §1). |

Other patterns: (1) RPM-per-**session** is roughly 2× RPM-per-pageview on gaming sites (2.3 PV/session in A13), so compare like with like. (2) 2019–21 numbers are older and RPMs were higher; Oct 2025 reports show −10–40% YoY (A20). (3) Revenue per visitor includes affiliate in A19 and is therefore not comparable with ad-only RPM.

## 4. Launch spike / decay pattern (what the data supports)
- **Demand decays quickly:** −64% in 14 days (C1), −62% month on month (C2), −47% in 2 months for a demand-shock peak (A2), −57% month on month for a database site (C3). A reference site can still hold millions of visits years later (C4, −20% m/m at year 3).
- **The peak earns less per view:** Mediavine's own help page (C11) says spikes lower RPM; Monetific (C12, opinion, unmeasured) says a launch weekend can earn barely more than a normal week. Supporting evidence from owners: A2/A12 show RPM only reaching $6–8 after the ramp, with launch-era traffic below that.
- **Network-level lift is smaller than the hype:** Enthusiast Gaming +44% YoY in the Elden Ring month (C8); a big-title guide can still reach 5.2M readers (C7) — but that is PC Gamer's established domain.
- **A new domain mostly misses week 1:** new-site first-6-month PV from real cases: 2.2k–13.5k per month (B1), 13k–16.5k (B3 site 2), 52k at month 2 as the best self-reported case (B2), 4.3k at month 6 as a failure (B4). Journey needs 1,000 sessions to start; the AdSense-only phase lasts at least until traffic and approvals arrive.
- **Seasonality:** Q4 peak and January trough (C12, plus the earlier model), so months 3–6 are partly Q1.

## 5. How fast new domains rank
No single reliable number. Real cases: a domain reached ≈13k PV in 3 weeks and 77k PV by month 3–4 with technical cleanup and steady posting (B3); another case sat at 2.2–4.6k PV for four months before climbing (B1); one recorded 4.3k PV at month 6 with 38 posts (B4). A fast start needs many posts quickly, not one hero page. Raptive says Discover is now the largest Google source for gaming media (D5), which favours editorial voice and fresh posts over pure answer pages.

## 6. Google AI Overviews / HCU 2024–2026 (gaming guide sites)
- Sept 2023 HCU: Retro Dodo −85% (D1), GGRecon closed (D2), a solo site 155k → 4.5k users (A19), visibility −63% to −67% at big names (D3).
- 2024–2026 AI Overviews: portfolio search clicks −42% (D4); Minecraft.fr clicks −50% and ad revenue −58% (D6); Raptive says gaming answer-queries are most exposed and Discover now matters most (D5).
- Practical read for this site: the traffic that survives is (a) Discover/social, (b) guides with original screenshots/testing, (c) email/direct. Thin AI-drafted answer pages are exactly what both HCU and AI Overviews punish (A19, D5).

---
## 7. Old model vs corrected model
Old model = /workspace/gta6-guides/monetization.md §5–6 (RPM $3 / $5 / $6 per 1k PV; affiliate €0.30 / €0.80 / €1.20 per 1k PV; ads live from mid-M1 in base/viral (50% of M1 PV monetised) and from M2 in conservative; FX 1 € = $1.096). I re-ran the old numbers: they reproduce exactly (75 / 966 / 8,253). All "new" figures are **[E]** and use the real data above.

### 7.1 What changed and why
| Input | Old | New | Evidence |
|---|---|---|---|
| Conservative ad RPM | $3 | **$0.80** flat (AdSense only) | A5, A6, B4, A10 |
| Base ad RPM | $5 flat | **$2.0 (M1–2, AdSense) → $3.0 (M3, Journey ramp) → $4.0 (M4–6)** | A12 ($3→$6 over the ramp), A20 (−10–40% YoY), C12/E6 (Q1 dip) |
| Viral ad RPM | $6 flat | **$2.5 (M1), $3 (M2), $4 (M3–6)** | C11, C12 (spikes dilute RPM) |
| Base PV (k) M1–M6 | 35 / 40 / 30 / 25 / 30 / 35 (195k) | **20 / 30 / 25 / 20 / 22 / 25 (142k)** | B1–B3: new domains rarely start above ~20k PV in month 1; D4–D6 (AI Overviews risk) |
| Conservative PV (k) | 6 / 5 / 4 / 4 / 5 / 6 (30k) | **3 / 4 / 4 / 4 / 5 / 6 (26k)** | B1, B4 |
| Viral PV | 350 / 300 / 200 / 150 / 180 / 200 (1.38M) | unchanged (keeps the old scale to isolate RPM) | no evidence either way; likelihood **below 10%** |
| Affiliate per 1k PV | €0.30 / €0.80 / €1.20 | unchanged (no real gaming-site affiliate data found; Monetific says hardware affiliate is where gaming money is) | — |
| Cash timing | not modelled | Journey **Net 65** (revenue of month N paid ~start of N+3) | E6 |
| Network access | "AdSense + Journey if ≥1,000 premium sessions" | AdSense only until Journey approval; Journey is **ad-exclusive** (cannot also run AdSense) | E6 |

### 7.2 Months 1–6 (€, gross revenue, ads + affiliate)
| Month | Cons. old | Cons. **new** | Base old | Base **new** | Viral old | Viral **new** |
|---|---|---|---|---|---|---|
| 1 | 2 | **1** | 108 | **34** | 1,378 | **819** |
| 2 | 15 | **4** | 214 | **79** | 2,002 | **1,181** |
| 3 | 12 | **4** | 161 | **88** | 1,335 | **970** |
| 4 | 12 | **4** | 134 | **89** | 1,001 | **727** |
| 5 | 15 | **5** | 161 | **98** | 1,201 | **873** |
| 6 | 18 | **6** | 188 | **111** | 1,335 | **970** |
| **Σ M6** | **75** | **25** | **966** | **500** | **8,253** | **5,541** |

Change: Conservative −67%, Base −48%, Viral −33%. The base case now earns about **€83/month on average**, and €111 by month 6.

### 7.3 Break-even (monthly PV needed; lean cost €35/month; with s.p. add €113.01/month contributions + 4% normirani tax)
| Scenario | Blended RPM old (ad+aff, €) | Blended RPM new (steady state) | PV/month old (with s.p.) | PV/month **new** (with s.p.) | Without s.p., new |
|---|---|---|---|---|---|
| Conservative | 3.04 | 1.03 (AdSense $0.80) | ≈ 51k | **≈ 150k** | ≈ 34k |
| Base, AdSense only (no Journey) | — | 2.62 (AdSense $2) | — | **≈ 59k** | ≈ 13k |
| Base, Journey at $4 | 5.36 | 4.45 | ≈ 29k | **≈ 35k** | ≈ 7.9k |
| Journey at $6 (A12 best case) | — | 6.27 | — | ≈ 25k | ≈ 5.6k |
| Viral | 6.67 | 4.85 | ≈ 23k | **≈ 32k** | ≈ 7.2k |

### 7.4 Six-month net (gross − €210 lean costs − s.p. €678 contributions − 4% tax)
| Scenario | Old, no s.p. | Old, with s.p. | New, no s.p. | New, with s.p. |
|---|---|---|---|---|
| Conservative | −135 | −816 | **−185** | **−864** |
| Base | +756 | +39 | **+290** | **−408** |
| Viral | +8,043 | +7,035 | **+5,331** | **+4,431** |

### 7.5 Decision rule update (recommendation to Rok; he decides)
1. Still **no s.p. before the traffic proves itself.** The old trigger of "25–30k PV/month sustained" was too low: on real RPMs it only breaks even if Journey RPM reaches about $4+. **New trigger: ≥ 35–40k PV/month for 2 consecutive months, with at least 1,000 Tier-1 sessions per 30 days (Journey-eligible)** — or an offer that clears the €113/month contribution. Below that, the s.p. loses money in the base case.
2. **Keep expectations to roughly €500 gross in the base 6-month case.** Plan for the conservative €25 outcome as the more likely one; my subjective odds shift to about 60% conservative / 32% base / 8% viral [E].
3. **Do not count on week-1 money.** The launch peak will mostly be gone before a new domain ranks or gets approved; do not build revenue plans on week 1.
4. **Journey cash arrives about 65 days after each month.** Plan for no payout before about February 2027.
5. **Affiliate (hardware/peripherals) is likely better than display for gaming** (Monetific, vendor opinion), but I found no real gaming-site affiliate numbers; keep the old €0.3–1.2 per 1k PV estimate with low confidence.
6. **Protect against Google:** diversify to Discover, email and direct; avoid thin AI answer pages (A19, D1, D5).

## 8. Caveats
- Small, biased sample: owners who post income reports skew to winners; the failures (A19, D1, D2) are in the data too, but not proportionally.
- Most Reddit rows are search-summary only; before relying on any single figure, someone should open the thread in a normal browser (Reddit blocks the box).
- RPM definitions differ (pageview vs session vs visit/user). I flagged which is which; **derived** values are mine.
- No GTA VI-specific data exists yet (the game launches 19 Nov 2026), so nothing here is GTA-specific. All numbers are for other games and general gaming sites.
