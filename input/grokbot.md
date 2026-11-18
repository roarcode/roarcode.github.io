# Leonida Guides: growth and early traffic (Grok Bot)

Prepared: Wednesday 18 Nov 2026, about 12:10 CET (Europe/Ljubljana).  
Site inspected: [https://roarcode.github.io/](https://roarcode.github.io/) (live HTML, `robots.txt`, `sitemap.xml`, `feed.xml`, headers, OG images). Local repo and `_site` build also checked.  
Scope: research only. No posts, sign-ups, emails, or purchases.  
Spoiler rule: this document has **no GTA VI story, mission, character-arc, ending, or secret details**.

**Evidence labels.** **[A]** official docs or the live site. **[B]** third-party measured or archived publisher output I opened. **[C]** secondary or vendor estimates. **[D]** inference, labelled as such. I found **no first-party week-1 traffic breakdown** for Elden Ring, RDR2, Hogwarts Legacy, or Baldur's Gate 3. Do not treat “what big sites published” as proof of their traffic mix.

---

## 0. Site snapshot (live, 18 Nov 2026)

Live origin is GitHub Pages at `https://roarcode.github.io/` (no custom domain). Brand: **Leonida Guides**. Last-Modified on the homepage: **18 Nov 2026 11:00:24 GMT (12:00 CET)**.

| Item | What I saw |
|---|---|
| HTML pages live | **26** (home, 13 guides, about, search, 404, 9 category hubs) |
| `sitemap.xml` | **17** indexable URLs: home, `/launch-hub/`, `/beginner-tips/`, 13 guides, `/about/`. All `lastmod` 2026-11-18. [A] https://roarcode.github.io/sitemap.xml |
| `robots.txt` | `Allow: /`, `Disallow: /search/`, sitemap line present and correct. [A] https://roarcode.github.io/robots.txt |
| Live guides | 13, almost all under `/launch-hub/` (release time, editions, preload, platforms, map, and similar logistics). The only gameplay-adjacent live guide is beginner tips. Mission, money, collectible, car, and glitch **guides are not live**. |
| Empty hubs | `/missions/`, `/money/`, `/cars/`, `/collectibles/`, `/glitches/`, `/leaks/`, `/ps5-settings/` all say “0 guides” and carry `noindex, follow` (correctly omitted from the sitemap). |
| Meta / Discover hooks | `index, follow, max-image-preview:large, max-snippet:-1` on indexable pages. Canonical, OG, Twitter `summary_large_image`, Atom feed at `/feed.xml` (13 entries). |
| Schema | `WebSite` + `SearchAction` on home; `Article` + `BreadcrumbList` on guides. No FAQPage or HowTo. |
| Images | OG/default and per-page OG are **1200×630** PNGs (~756,000 pixels). Homepage hero is **1280×720**. **Guide bodies have no real `<img>` figures** — raw `![...](TODO: image:...)` markdown is printed as text. |
| Speed | Existing Lighthouse JSON in the repo: home mobile/desktop **100** performance; one guide mobile **95**. [B, local reports] |
| Search Console | No `google-site-verification` meta and no HTML verification file on the live host. Indexation is **unverified**. A `site:roarcode.github.io` web search in this environment returned no hits; that is not proof Google has not crawled it. |
| Already written, not live | Local `_site` (rebuilt after the 12:00 CET deploy) already contains finished launch pages that **404 on the live host**: `is-gta-6-out`, `gta-6-not-working`, `gta-6-download-stuck`, `gta-6-preload-not-starting`, `gta-6-ps5-fixes`, `gta-6-xbox-fixes`, `gta-6-map-size`, plus a second launch-hub index slug. Draft placeholders (first-mission, money, early-car, cheats, error-codes) must **not** be shipped. |

Timing context for this week: Rockstar’s preload post and press tables describe a **midnight-local** unlock on 19 Nov 2026, so New Zealand is already in the launch window (00:00 NZDT 19 Nov = **12:00 CET today**). CET/Slovenia unlock is **00:00 CET Thursday 19 Nov**. The “publish before launch” window is now hours, not days. [B] https://www.pcgamer.com/games/grand-theft-auto/gta-6-release-time-date/ and [A] https://blog.playstation.com/2026/11/10/pre-load-grand-theft-auto-vi-on-ps5-starting-today/

---

## 1. Evidence: what actually worked at past launches

Each point has a source. Traffic numbers for “our week-1 spike” were not published by the sites themselves.

1. **Logistics pages are the pre-launch and day-one demand, not walkthroughs.** For GTA VI, US average monthly searches (Google Keyword Planner via seodata, pulled 17 Nov 2026; volumes are bucketed estimates) are dominated by timing: “gta 6 release date” 1,220,000, “when is gta 6 coming out” 201,000, “is gta 6 out” 49,500 (those three ≈ 1.5M), plus “gta 6 pre order” 301,000, “gta 6 price” and “gta 6 map” 110,000 each. [B] https://www.seodata.dev/blog/gta-6-search-trends

2. **Established guide publishers ship a dense pack of practical pages the day before, or on, launch** — launch time/preload, beginner tips, then specific “how/where” pages. Windows Central’s February 2022 archive shows a large Elden Ring batch on **24 Feb** (the day before the 25 Feb 2022 launch), including “Elden Ring launch time: When you can play, preload, download size, and more”, “10 things every new Elden Ring player should know”, class choice, co-op, respec, crafting, and many location/collectible guides. [B] https://www.windowscentral.com/how-to/archive/2022/02  
   This is **supply evidence**, not a traffic report.

3. **After launch, search demand shifts to named systems, locations, and “where/how” problems.** Google’s 2018 US gaming charts, as reported by DualShockers, put Red Dead Redemption 2 at #2; related queries cited were legendary animals, the trapper, chapters, and the fence — practical world/system help, not news. [B] https://www.dualshockers.com/google-trends-2018-fortnite-red-dead-redemption-2-fallout-76/  
   I opened Game8’s Hogwarts Legacy ranking URL this visit, but the “popular articles” list was behind a login wall, so I **cannot verify** specific top-URL titles. Game8 does maintain a large logistics + location + map wiki for that game. [B, partial] https://game8.co/games/Hogwarts-Legacy/ranking

4. **Interactive maps and deep wikis became the long-term magnets**, but that is years-later authority, not a documented week-1 tactic for a new domain. Semrush’s public Fextralife overview (October 2026 snapshot on the page) lists ~33.21M visits that month, with organic keywords such as “elden ring wiki” (pos. 1, vol. 33,100) and “elden ring map” (pos. 2, vol. 40,500) — Semrush estimates, not Google Analytics. [C] https://www.semrush.com/website/fextralife.com/overview/  
   Players have long noted that Fextralife’s SEO makes it hard for smaller wikis to be found, and that lighter map tools (e.g. Map Genie) win when someone only needs a pin. [B] https://steamcommunity.com/app/1245620/discussions/0/3468361193675467444/

5. **For a brand-new gaming site, Google is usually too slow to be the week-1 growth engine.** In r/SEO, a new gaming site with a sitemap in Search Console still reported zero impressions after a month; commenters called the niche saturated and said wait times of months are normal. An older r/SEO thread on starting a gaming site is blunt: do not expect to rank against incumbents soon; early traffic has to come from communities and social. [B] https://www.reddit.com/r/SEO/comments/1l36pfi/new_gaming_site_online_for_1_month_50_backlinks/ and https://www.reddit.com/r/SEO/comments/8b97et/just_started_a_gaming_website_what_do_i_need_to/  
   Launch hype also spikes and then drops unless evergreen “how to” guides remain. [B] https://www.reddit.com/r/SEO/comments/1sxe18e/my_first_4_digit_ads_revenaue/

6. **Timely, updated problem/fix pages are a recurring launch pattern** (preload stuck, won’t start, known issues). Windows Central published “Dying Light 2: Known bugs, launch issues, and how to fix them” in the same Feb 2022 archive as its Elden Ring pack. [B] https://www.windowscentral.com/how-to/archive/2022/02  
   Google Discover guidance also favours content that is timely and useful, but **eligibility is not a placement guarantee**, and Discover traffic is described as less predictable than search. [A] https://developers.google.com/search/docs/appearance/google-discover

7. **Reddit can send a first wave, and it can also get the account or domain banned.** Official Reddit policy forbids repeated or unsolicited mass engagement; if most of an account’s contributions are links to a site the author benefits from, frequency must stay thoughtful. Moderators apply extra rules. [A] https://support.reddithelp.com/hc/en-us/articles/360043504051-Spam  
   r/Games **removes Guides/Walkthroughs/Tutorials as submissions** (Rule 1) and caps self-promotion: no more than 10% of *sitewide* submissions may go to one domain; accounts with under 10 submissions may have only one; comments can still be actioned if used to dodge the cap. [A] https://www.reddit.com/r/Games/wiki/rules  
   I could not load r/GTAVI’s live rules (the about/rules page returned HTTP 500). **Check that sub’s rules before any post.**

8. **Steam Guides are not a this-week channel.** GTA VI has no announced PC/Steam launch, so there is no Steam community to post in today. (Steam guide ranking is largely helpful-votes; cited only so this is not treated as a missed free win.) [B] https://steamcommunity.com/sharedfiles/filedetails/?id=837385938

9. **Scaled, unoriginal, or AI-only page factories are a ranking risk, not a growth tactic.** Google’s March 2024 core update and spam policies define *scaled content abuse* (many low-value pages made to manipulate rankings, whether by AI, humans, or both) and *site reputation abuse*. The helpful-content guidance is now part of core ranking: people-first, original, experience-based pages. [A] https://developers.google.com/search/blog/2024/03/core-update-spam-policies , https://developers.google.com/search/docs/essentials/spam-policies , https://developers.google.com/search/docs/fundamentals/creating-helpful-content

---

## 2. Ten concrete tactics for THIS WEEK (free)

GTA VI unlocks tonight in CET. Do 1–4 today, before or as New Zealand / Australia traffic is already live; do 5–8 through launch night; do 9–10 as soon as something is verified in-game. Expected effects are directional. I did not invent traffic percentages.

### 1. Verify Search Console and Bing, submit the sitemap, request indexing  
**Steps.** In Google Search Console, add a URL-prefix property for `https://roarcode.github.io/`. On GitHub Pages the practical methods are an HTML file at the site root or a meta tag (there is no verification file or meta on the live site now). Submit `https://roarcode.github.io/sitemap.xml`. Then use URL Inspection on home, `/launch-hub/release-time/`, `/launch-hub/preload-size/`, `/launch-hub/editions-prices/`, `/launch-hub/platforms/`, `/launch-hub/map/`, and `/beginner-tips/beginner-tips/` (until that slug is fixed). Repeat in [Bing Webmaster Tools](https://www.bing.com/webmasters) and, if wanted, enable [IndexNow](https://www.indexnow.org/documentation) for later deploys. Recrawl is not instant and is not a ranking guarantee.  
**Expected effect.** Gives Google and Bing a discovery path on a site that may not be indexed yet; without this, launch-day updates are easy to miss.  
**Source.** [A] https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl and https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

### 2. Deploy the already-written launch-status and fix pages today — not the placeholder drafts  
**Steps.** Ship the local pages that already have real copy (~700–900 words each) and currently 404 live:  
`/launch-hub/is-gta-6-out/`, `/glitches/gta-6-not-working/`, `/glitches/gta-6-download-stuck/`, `/glitches/gta-6-preload-not-starting/`, `/glitches/gta-6-ps5-fixes/`, `/glitches/gta-6-xbox-fixes/`, and if the facts are tight, `/launch-hub/gta-6-map-size/`.  
Keep **draft: true** pages offline (first-mission, money-fast, early-car, cheats, error-codes) until every placeholder is replaced with verified steps. Differentiate `is-gta-6-out` (live yes/no + “what to check on the console”) from the existing `/launch-hub/release-time/` table so the two URLs do not cannibalise each other. After deploy, ping the sitemap / IndexNow again. Shipping them also flushes `/glitches/` out of empty-`noindex` so that hub can enter the sitemap.  
**Expected effect.** Covers the query class that already has the most pre-launch search demand, and the “won’t start / download stuck” class that historically appears at unlock.  
**Source.** [B] https://www.seodata.dev/blog/gta-6-search-trends and the pre-launch pack pattern in [B] https://www.windowscentral.com/how-to/archive/2022/02

### 3. Clean the live pages before they get indexed  
**Steps.** On all 13 live guides (and the Atom feed): remove or replace every raw `![...](TODO: image:...)` string — CommonMark leaves it as visible unfinished text, and Pagefind indexes it. Rewrite the seven internal links that still point at `preload-size.md`, `ps5-settings.md`, `release-time.md`, `map.md`, `leonida.md` so they go to the real permalinks. Optionally add a markdown rewrite in `lib/markdown.js` so this cannot regress. Fix `/beginner-tips/beginner-tips/` *before* it ranks: give the guide a distinct slug (for example `/beginner-tips/start-strong/`) and leave a canonical (GitHub Pages cannot send a proper 301; a stub with a canonical + meta refresh is the practical fallback).  
**Expected effect.** Stops Google, Discover, and social unfurls from seeing an unfinished site; recovers internal PageRank that currently dies on `.md` 404s.  
**Source.** Live HTML [A]; Google’s people-first standard [A] https://developers.google.com/search/docs/fundamentals/creating-helpful-content

### 4. Put the high-demand URLs on the homepage, not only in “latest 9”  
**Steps.** The homepage “New & updated” list is `guides.slice(0, 9)` and **does not currently link** to `/launch-hub/release-time/` at all (confirmed in the live HTML). Add a persistent launch strip: Is it out? Unlock times. Pre-load / 212 GB. Download stuck. Won’t start. Editions. Map. Keep that strip through the weekend, then retarget it to the first verified gameplay guides.  
**Expected effect.** Humans and crawlers reach the pages that match the biggest queries, instead of depending on recency sort.  
**Source.** Demand [B] https://www.seodata.dev/blog/gta-6-search-trends ; site structure [A]

### 5. Add real in-article images that meet Discover’s size bar  
**Steps.** `max-image-preview:large` is already set — good. What is missing is a large, relevant image *in the article*, not only a text-heavy 1200×630 title-card OG. Google recommends ≥1200 px wide, >300,000 pixels, 16:9, specified via `og:image` or schema `image`, and warns against generic logos and text-heavy thumbnails. Shoot console menus Rok already has (Storage, Downloads, the locked-game tile) and original diagrams; do not rip official key art. Aim for 1280×720 (the homepage hero already is). After images ship, request a recrawl of those URLs.  
**Expected effect.** Makes pages *eligible* for large Discover/Search previews. It does **not** guarantee Discover: the site is new, on a `github.io` host, and Google notes Discover may filter things like code repositories (whether project Pages are treated that way is **unverified**). Treat Discover as a bonus.  
**Source.** [A] https://developers.google.com/search/docs/appearance/google-discover

### 6. Run the status and fix pages as a living launch-night log  
**Steps.** From this afternoon through Friday, update `/launch-hub/is-gta-6-out/` and the glitch-fix pages when a *real* change happens (a region unlocks, a status-page incident, a confirmed workaround). Change `dateModified` / “Last updated” only then — Google’s helpful-content doc warns against fake freshness. Lead with the answer (yes/no, first fix). Credit Rockstar, PlayStation, and Xbox status pages. After each meaningful update, request indexing on that URL only (there is a quota; repeating the same URL does not speed it up).  
**Expected effect.** Matches the “timely, useful” pattern Discover and news-style search want, and gives social posts a URL that is actually current.  
**Source.** [A] https://developers.google.com/search/docs/appearance/google-discover , https://developers.google.com/search/docs/fundamentals/creating-helpful-content ; launch-issue pattern [B] https://www.windowscentral.com/how-to/archive/2022/02

### 7. Reddit: answer first, link rarely, read the rules every time  
**Steps.** Use an existing personal account with history if Rok has one; a brand-new account that only drops site links is a ban magnet. Today/tomorrow, *comment* with the actual unlock time, storage number, or fix steps in threads that already exist. Add the Leonida URL only when the comment needs the table or checklist. Do **not** submit guide/walkthrough link posts to r/Games (Rule 1 forbids them) and stay inside Rule 8’s 10% cap if you post there at all. I could not load r/GTAVI rules; read r/GTAVI, r/GTA6, r/PS5, and the relevant Xbox subreddit rules before posting, including flair and spoiler-tag requirements. No identical comments across subs, no Discord mention-spam, no affiliate links.  
**Expected effect.** This is the realistic week-1 referral channel for a new site (see r/SEO above). The upside is a few threads that take off; the downside is a board-wide or account ban if it looks like spam.  
**Source.** [A] https://support.reddithelp.com/hc/en-us/articles/360043504051-Spam and https://www.reddit.com/r/Games/wiki/rules ; [B] https://www.reddit.com/r/SEO/comments/8b97et/just_started_a_gaming_website_what_do_i_need_to/

### 8. One useful X thread, and wire the handle into the site  
**Steps.** I am not inventing X impression numbers. The free, evidenced play is: post a single, factual unlock-time thread (table + “what if it’s still locked”) and, later, a “download stuck / won’t start” thread, each with a real screenshot and a link to the matching guide. Create the handle only if Rok wants it (I did not sign up). Then set `TWITTER_HANDLE` so pages emit `twitter:site` (currently blank) and so unfurls use the existing large-image cards. Do not spray the same link hourly.  
**Expected effect.** Referral clicks during the 12-hour rolling unlock; possible quote-tweets if the table is clearer than official pages. Unverified.  
**Source.** Social as the early lever for new gaming sites [B] https://www.reddit.com/r/SEO/comments/8b97et/just_started_a_gaming_website_what_do_i_need_to/ ; card markup already on the site [A]

### 9. Ship one sharable utility, not a cloned interactive map  
**Steps.** Full interactive map tiles this week are the wrong bet: they take time, and copying someone else’s tiles is a copyright and trust risk. Use what the site can already do: a clean unlock-time table (exists), a 212 GB download-time estimator on the preload page (improve and surface it), and after launch a **credited checklist** of collectible or shop locations (your own screenshots + source links), not a scraped Map Genie. A real interactive map can come later if Rok wants it; that is how Map Genie / Fextralife / IGN held traffic *after* week 1, not how a 24-hour-old GitHub Pages site wins tonight.  
**Expected effect.** Something people actually bookmark or link, which is how new sites earn the few first referring domains.  
**Source.** Map demand and long-term wiki/map magnets [B/C] https://www.seodata.dev/blog/gta-6-search-trends and https://www.semrush.com/website/fextralife.com/overview/ ; player preference for a lightweight map vs a heavy wiki [B] https://steamcommunity.com/app/1245620/discussions/0/3468361193675467444/

### 10. Thursday–Sunday: first *verified* gameplay guides, no invented steps  
**Steps.** Once Rok (or a clearly credited player) has actually played, update beginner tips with real menu names, then publish the first money method, the first early vehicle, and the first mission walkthrough **only when the mission name and steps are confirmed in-game**. Leave story, endings, and secrets out of titles, meta, OG, and the feed (the site already redacts spoiler blocks in the feed — keep that). Credit the finder and the clip or post. Do not auto-generate a mission or collectible page for every search query. This is the Game8 / Windows Central / Fextralife playbook: specific “how/where” pages, published fast, from real play or review access. Rok likely does not have review-code access; wait for real play.  
**Expected effect.** Builds the library Google can still be ranking in week 2–4, when logistics queries fade and “how do I…?” queries take over (RDR2 related-query pattern).  
**Source.** [B] https://www.windowscentral.com/how-to/archive/2022/02 and https://www.dualshockers.com/google-trends-2018-fortnite-red-dead-redemption-2-fallout-76/ ; quality bar [A] https://developers.google.com/search/docs/fundamentals/creating-helpful-content

**Not this week (on purpose).** Steam Guides (no PC). Google News / Publisher Center (a new unofficial `github.io` fan site is a poor fit; I did not see a path to News eligibility this week). Buying a custom domain (the project brief forbids spend without Rok’s explicit yes). A custom domain later would help branding and remove any `github.io` Discover/trust question, but it is a migration, not a tonight task.

---

## 3. Technical SEO fixes spotted on this site

Already in good shape (do not spend the night here): valid XML sitemap with only indexable URLs; robots sitemap line; canonicals on content pages; Article + Breadcrumb JSON-LD that parses; `max-image-preview:large`; 1200×630 OG images on every guide; empty hubs correctly `noindex`; official “unofficial / not affiliated” footer; Lighthouse performance 95–100; fonts preloaded; homepage hero already meets the 1200 px / 16:9 size bar.

Fix now:

1. **Search Console / Bing not verified, sitemap not submitted (as far as the public site shows).** Do tactic 1 today. [A]
2. **Visible `TODO: image` markdown on every live guide and in `/feed.xml`.** Looks unfinished; pollutes search excerpts and the feed. Strip or replace before recrawl. [A, live HTML]
3. **Seven broken internal links** to `*.md` filenames instead of permalinks, including from beginner tips, preload, map, and the launch-night checklist. [A, live HTML]
4. **Awkward slug `/beginner-tips/beginner-tips/`** already in the sitemap and the feed. Rename before it accrues any index. GitHub Pages will not 301; keep a canonical stub. [A]
5. **Homepage does not link `/launch-hub/release-time/`** (or the not-yet-live “is it out” / “not working” pages). High-demand URLs must be in the first screen, not only in `/launch-hub/`. [A]
6. **`robots.txt` disallows `/search/` while the page also has `noindex`.** Google cannot see a noindex on a URL it is told not to crawl. Prefer: allow crawl + `noindex, follow`, or keep Disallow and drop the meta. [A] https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag  
7. **Guide bodies have no content images.** OG title-cards are text-heavy, which Google’s Discover doc says to avoid as the preferred thumbnail. Add real 1280×720 (or similar) in-article photos and point `og:image` / schema `image` at a representative one. [A] https://developers.google.com/search/docs/appearance/google-discover
8. **PS5 settings IA split.** The live PS5 guide sits at `/launch-hub/ps5-settings/` while `/ps5-settings/` is an empty noindex hub. Either recategorise the guide or drop the empty hub from nav until it has a real settings guide. [A]
9. **`_headers` is ignored on GitHub Pages** and is publicly downloadable at `https://roarcode.github.io/_headers`. Harmless, but the 10-minute HTML cache is GitHub’s, not yours. After a launch-night content push, allow a few minutes for the CDN and, if a page looks stale, wait out `max-age=600` or cache-bust. [A]
10. **No `twitter:site`, Organization-only authors, date-only `lastmod`.** Minor. A named human byline helps E-E-A-T once Rok is publishing play-verified guides. [A] https://developers.google.com/search/docs/fundamentals/creating-helpful-content
11. **WebSite `SearchAction` points at a noindex (and robots-disallowed) `/search/` URL.** Sitelinks searchbox is not a priority; removing `potentialAction` is cleaner. [A]
12. **`/leaks/` is linked from global nav** despite being empty and despite the project brief saying not to chase leak pages. Hide it from nav until there is a clearly labelled, policy-safe page — or drop it. [A]
13. **Optional later, not tonight:** an image sitemap once real figures exist; a custom domain (only with Rok’s yes); Cloudflare Pages if you want the `_headers` file honoured.

---

## 4. Risks to avoid

- **Reddit / Discord / X spam and bans.** Repeated unsolicited links, copy-paste comments, new accounts that only self-promote, or guide submissions to subs that forbid them (r/Games Rule 1). Official policy: https://support.reddithelp.com/hc/en-us/articles/360043504051-Spam
- **Google scaled-content / helpful-content hits.** Do not mass-generate mission, collectible, or “best X” pages with AI or scraped text to cover every keyword. Quality over volume. https://developers.google.com/search/blog/2024/03/core-update-spam-policies
- **Indexing unfinished pages.** TODO image text, `.md` 404 links, and draft titles like “First Mission Walkthrough: [MISSION NAME FROM MENU]” must not go live.
- **Story spoilers in titles, descriptions, OG, schema, or the feed.** Keep the existing feed redaction. Mark rumour vs confirmed.
- **Fake freshness.** Do not bump “Last updated” without a real change.
- **Clickbait Discover titles** or withheld information in the headline. That is a Discover policy problem, not a growth hack. https://developers.google.com/search/docs/appearance/google-discover
- **Copyright and ToS.** No ripped official maps, logos, or unreleased paid assets. Credit screenshots. Do not host piracy or leak dumps.
- **Query cannibalisation.** `release-time`, `is-gta-6-out`, and `gta-6-launch-hub` should have distinct jobs, or be merged.
- **Spending or domains.** No paid ads, tools, or domain purchase unless Rok explicitly agrees.
- **Steam this week.** There is no PC product page to attach a guide to; posting off-topic on other games’ hubs will look like spam.

---

## Source list (opened or confirmed this visit)

- Live site: https://roarcode.github.io/ , https://roarcode.github.io/robots.txt , https://roarcode.github.io/sitemap.xml , https://roarcode.github.io/feed.xml
- Google Discover: https://developers.google.com/search/docs/appearance/google-discover
- Ask Google to recrawl / URL Inspection: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- Sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Helpful, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- March 2024 core update and spam policies: https://developers.google.com/search/blog/2024/03/core-update-spam-policies
- Spam policies (scaled content abuse): https://developers.google.com/search/docs/essentials/spam-policies
- IndexNow: https://www.indexnow.org/documentation
- seodata GTA VI search demand (Keyword Planner, 17 Nov 2026): https://www.seodata.dev/blog/gta-6-search-trends
- Windows Central How-To archive, Feb 2022 (Elden Ring pre-launch pack): https://www.windowscentral.com/how-to/archive/2022/02
- DualShockers on Google Trends 2018 (RDR2 related queries): https://www.dualshockers.com/google-trends-2018-fortnite-red-dead-redemption-2-fallout-76/
- Semrush Fextralife overview (estimates): https://www.semrush.com/website/fextralife.com/overview/
- Steam thread on Fextralife SEO vs smaller wikis / Map Genie: https://steamcommunity.com/app/1245620/discussions/0/3468361193675467444/
- r/SEO, new gaming site, zero impressions: https://www.reddit.com/r/SEO/comments/1l36pfi/new_gaming_site_online_for_1_month_50_backlinks/
- r/SEO, starting a gaming website (social over early SEO): https://www.reddit.com/r/SEO/comments/8b97et/just_started_a_gaming_website_what_do_i_need_to/
- r/SEO, launch-spike then drop: https://www.reddit.com/r/SEO/comments/1sxe18e/my_first_4_digit_ads_revenaue/
- Reddit spam policy: https://support.reddithelp.com/hc/en-us/articles/360043504051-Spam
- r/Games rules (no guide submissions; 10% promo cap): https://www.reddit.com/r/Games/wiki/rules
- PlayStation preload post: https://blog.playstation.com/2026/11/10/pre-load-grand-theft-auto-vi-on-ps5-starting-today/
- PC Gamer unlock-time table: https://www.pcgamer.com/games/grand-theft-auto/gta-6-release-time-date/
