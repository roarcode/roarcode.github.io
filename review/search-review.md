# SEARCH quality and risk review — GTA 6 / Leonida Guides

**Reviewer:** SEARCH (independent second check)  
**Checked:** Wednesday 18 November 2026, about 11:50–12:00 Europe/Ljubljana (CET, UTC+1)  
**Live site:** https://roarcode.github.io/ (GitHub Pages; `Last-Modified` 18 Nov 2026 10:52 UTC = **11:52 CET**)  
**Content tree:** `/workspace/gta6-guides/content/`  
**This file only.** Content files were not edited.

Method: every markdown file under `content/` was listed and read. Claims were checked against official Rockstar, PlayStation and Xbox pages and against reputable outlets opened this session. Every distinct `http(s)` URL found in content (first pass) was tested with `curl -sIL` and a browser UA, then GET if HEAD was not 2xx/3xx. 404/410/DNS = dead; 403, 402, 454, 500 and timeouts = could not verify, not dead. The live site was crawled from the homepage, the sitemap, and discovered internal links; footer disclaimers, `<title>`, meta description, Open Graph/Twitter tags and `og:image` files were inspected. Workspace content continued to change at 11:55–11:57 CET, after the live deploy; mismatches are called out in the Live site section.

---

## Files reviewed

### Published or publishable pages (15)

| File | Slug / role | `status` |
|---|---|---|
| `beginner-tips.md` | beginner-tips | prelaunch |
| `editions-prices.md` | editions-prices | prelaunch |
| `gta-6-online.md` | gta-6-online | prelaunch |
| `jason-lucia.md` | jason-lucia | prelaunch |
| `launch-night-checklist.md` | launch-night-checklist | prelaunch |
| `leonida.md` | leonida | prelaunch |
| `map.md` | map | prelaunch |
| `pages/about.md` | about | page |
| `platforms.md` | platforms | prelaunch |
| `preload-size.md` | preload-size | prelaunch |
| `ps5-settings.md` | ps5-settings | prelaunch |
| `radio-stations.md` | radio-stations | prelaunch |
| `release-time.md` | release-time | prelaunch |
| `vintage-vice-city-pack.md` | vintage-vice-city-pack | prelaunch |

Plus the built category/hub/search/404/home pages on the live site (not separate markdown guides).

### Templates (6, not published)

`template-collectible-map.md`, `template-glitch-fix.md`, `template-mission-walkthrough.md`, `template-money-method.md`, `template-vehicle.md`, and **`template-leak.md`** (added ~11:57 CET, during this review).

### Working / staging files (not published)

- `README.md`, `_facts.md`, `_queue.md` (authoring rules and research notes).
- `content/inbox/` — 37 `status: queue` stubs (Newswire, YouTube, PSN status). `lib/content.js` skips `inbox/` and `status: queue`. Listed, not treated as live pages. Not fully link-checked.

Empty dirs at first pass: `content/inbox/` (later filled) and `content/launch-hub/` (guides are flat files; the live site puts most of them under `/launch-hub/`).

---

## Summary counts

### By category (finding rows below)

| Category | Count |
|---|---|
| 1. False or unverified claims | 14 |
| 2. Broken or dead source links | 4 |
| 3. Legal / IP risk | 9 |
| 4. Generic or AI-spammy writing | 2 |
| 5. Readability | 3 |
| 6. Live site (structure, render, meta, mismatch) | 9 |
| **Total finding rows** | **41** |

Category counts use the primary label on each row (the first category where a row is tagged as more than one). Rows 3–4 and 41 are counted under Live site even though they also affect links or unfinished copy.

Some rows cover more than one file. A few issues appear in both a content row and a live-site row when the live page still shows a bug that the workspace copy has started to fix.

### By severity

| Severity | Count |
|---|---|
| High | 5 |
| Medium | 21 |
| Low | 15 |

### Content source links (first-pass unique `http(s)` URLs in content, excluding a placeholder `https://` in `README.md`)

| | Count |
|---|---|
| Unique URLs tested | 60 |
| OK (HTTP 2xx/3xx) | 52 |
| Dead (404/410/DNS) | **0** |
| Could not verify | **8** |

Unverifiable (not dead): Take-Two press release (403), Forbes (403), GameSpot (403), Push Square (403), USA Today (402), two VGC articles (403), and `https://gta6news.gg/gta-6-cheats/` (454, **working file `_queue.md` / `_facts.md` only**). Of the 8, **7 appear on published pages**.

The HTTPS forms of official and most reputable URLs resolved. `https://www.playstation.com/GTAVIfeatures` redirects (200) to a locale-specific PlayStation page. `https://www.rockstargames.com/VI/lucia` redirects (200) to `https://www.rockstargames.com/VI/only-in-leonida/lucia`.

### Live site links

Crawled homepage, `/sitemap.xml`, `/robots.txt`, `/feed.xml`, `/search/`, `/404.html`, all sitemap URLs, nav category hubs, and every internal link and asset discovered (including `og:image` and icons, which are only in meta tags).

| | Count |
|---|---|
| Unique live URLs checked (internal + external) | **132** |
| Internal unique (HTML + static + OG/icons) | 86 |
| External unique | 46 (43 https + 3 bare `http://`) |
| **Dead** | **7** (all internal: unpublished `.md` relative links, HTTP 404) |
| **Could not verify** | **10** (7 https sources: 403/402 as above; 3 bare `http://` autolinks: HTTP 500, no HTTPS redirect) |
| Internal assets, OG images, icons, fonts, CSS, JS | all 200 |

---

## Findings

Columns: file, category, problem, suggested fix, severity.

| # | File | Category | Problem | Suggested fix | Severity |
|---|---|---|---|---|---|
| 1 | `release-time.md` (live page still wrong; workspace copy edited 11:55 CET) | False / unverified | **Live table and live prose disagree** on Brisbane and Perth unlock times. Live table: local midnight Thu 19 Nov (Brisbane 14:00 UTC, Perth 16:00 UTC). Live prose says the table shows the Sydney-grouped case (Brisbane 11 PM, Perth 9 PM on 18 Nov). Those cannot both be true. | The workspace file already uses 11:00 PM / 9:00 PM and matching UTC (13:00). Re-read once, then redeploy. Keep the hedge that this is store-listed, not a named Rockstar figure, and tell readers to trust the console countdown. | High |
| 2 | `release-time.md` (live HTML) | Live site | Unescaped `\|` in `XBOX Series X\|S` inside a markdown table splits the official-quote cell. Live HTML ends one cell at “XBOX Series X” and starts the next with `S" (as quoted by PC Gamer…)`. | Write `X\|S` in table cells, or say “Xbox Series X and Series S”. Rebuild and confirm the conflict table is one cell again. | High |
| 3 | `beginner-tips.md`, `launch-night-checklist.md`, `leonida.md`, `map.md`, `gta-6-online.md`, `preload-size.md` | Live site / dead links | Internal links are written as `preload-size.md`, `ps5-settings.md`, `map.md`, `leonida.md`, `release-time.md`. The live build does not rewrite them, so they 404 as paths like `/launch-hub/preload-size/release-time.md`. **Seven unique dead URLs** on the live site. | Point at the published paths (`/launch-hub/preload-size/` and so on), or fix the markdown pipeline so relative `.md` links become the final permalinks. Add a build test that fails on leftover `.md` hrefs. | High |
| 4 | All live guide pages | Live site / AI-spammy | Image placeholders are published as raw markdown: `![…](TODO: image:… — …)`. Visible “TODO” on every guide. No `<img>` for those figures (only the site logo). | Hide or replace placeholders before launch: use designer diagrams already in `design/article-assets/`, or omit the figure until the asset exists. Do not ship `TODO: image:` in HTML or in the Atom feed (the feed repeats the same raw placeholders). | High |
| 5 | `template-leak.md` | Legal / IP | New unpublished template for “leak / datamine / early-player find” pages, with clickbait titles (“Players Just Found Something Huge…”, “The GTA 6 Secret Everyone Is Talking About”). `content/README.md` still says never to use leaks or leaked assets. The template does ban file hosts, torrents and leaked media, and it hides details in spoiler blocks, but it still sets up a `leaks` category and leak-chasing SEO. | Either delete it or rewrite the charter so leak pages are allowed only under the existing “rumour / unconfirmed” rules, with no clickbait, no datamine invitations, and no `leaks` nav item. Do not publish the template. | High |
| 6 | `radio-stations.md` (title, `title_alts`, description, live `<title>` and OG/Twitter) | False / unverified | Title and social tags say “All 6 Stations”. The body correctly says six stations were *previewed* on 8 Oct 2026 and that the full in-game list is not announced. Game Informer matches the six names and hosts, and also calls them a preview. | Rename to something like “GTA 6 Radio Stations: The 6 Previewed Stations and Podcasts”. Say “previewed” in the description and OG text too. | Medium |
| 7 | `beginner-tips.md` | False / unverified | A carry-limit claim (2 sidearms and 2 long guns) sits in the “what previews confirm” table, sourced only to GTA Boom and Hudwire (secondary), with a note that it is “not yet confirmed in play”. Those URLs are not in the page `sources:` list. | Move it to a `> **Rumour / unconfirmed:**` block with the URLs, or drop it until a reputable or official source exists. Add any remaining preview sources to front-matter. | Medium |
| 8 | `platforms.md` | False / unverified | FAQ “Does GTA 6 run at 60 FPS?” is answered “No.” Official wording, via Game Informer / PlayStation, is that Rockstar is *targeting* 30 FPS and that no 60 FPS or performance mode has been announced. | Answer: “Rockstar is targeting 30 FPS on current consoles. No 60 FPS or performance mode has been announced.” | Medium |
| 9 | `pages/about.md` | False / unverified | The page says “Before launch we publish only confirmed facts”, but several live guides include labelled rumours and a “based on previous GTA games” section. | Soften to: pre-launch pages prefer official and reputable sources; rumours are labelled; some tips are flagged as carry-overs from earlier games. | Medium |
| 10 | `gta-6-online.md` | False / unverified | “GTA 5 is also part of the GTA+ games library, per Rockstar's press release.” The Take-Two/Rockstar press URL is not in this page’s `sources:` list, and that URL returned 403 in this check. | Add a working official or store source, or hedge / remove until it can be opened. | Medium |
| 11 | `vintage-vice-city-pack.md`, `editions-prices.md` | False / unverified | PS5 GTA+ claim-by date (31 March 2027) is covered. Xbox-specific terms reported by Technobezz (purchase before 19 Nov 23:59:59, redeem within 180 days) are not. Readers could miss the Xbox deadline. | Open the Xbox offer text, quote the official wording, and add the Xbox window next to the PlayStation one. | Medium |
| 12 | `release-time.md` | False / unverified | “Mexico and Central America (UTC-6)” is marked ✅ as if it were a single midnight-local moment. Mexico has more than one zone; Central America is not one zone. Store data is per country, not one regional row. | Split or hedge: name the countries actually listed, or mark ⚠️ and tell people to check their own store/console countdown. | Medium |
| 13 | `beginner-tips.md`, `jason-lucia.md`, `gta-6-online.md`, `vintage-vice-city-pack.md` | False / unverified | Body claims cite outlets that are missing from `sources:` (for example GameSpot, VGC, GTA Boom, Hudwire on beginner tips; PlayStation FAQ / PC Gamer on the characters page; the press release on the online page; Technobezz on the bonus pack). The live “Sources & credits” list is built from front-matter only, so those citations never appear at the bottom. | Put every URL used for a fact into `sources:`. Remove or hedge any fact that still has no URL. | Medium |
| 14 | `map.md`, `leonida.md` | False / unverified | The 170+ species figure is also mentioned by Game Informer. The 60+ birds / 30+ land-animal split is attributed to a Forbes article that returned 403 in this check, so that split could not be re-verified. | Re-open Forbes or cite Game Informer’s own wildlife piece for any number you keep. If only “170+” is confirmed, drop the extra split or mark it clearly. | Low |
| 15 | `jason-lucia.md` | False / unverified | Jason’s background in a spoiler block is sourced to `https://www.rockstargames.com/VI/lucia`, which redirects to the Lucia character path. | Confirm the Jason text is actually on that page (or on a Jason URL). Switch the link to the canonical path `/VI/only-in-leonida/lucia` or the correct Jason page. | Low |
| 16 | `radio-stations.md` | False / unverified | Album (34 tracks, 19 Nov), “Original Score by Justice” (11 Dec), and the launch-trailer song are cited via `gta6record.com` and Wikipedia. The claims match that fan Newswire index, but they are not linked to the official Newswire posts. | Link the official Rockstar Newswire items (now also sitting as queue stubs in `content/inbox/`). Keep Wikipedia as a secondary mention only. | Low |
| 17 | Several published pages | Broken / unverifiable links | Seven published-page source URLs could not be verified this session (403/402), including the Take-Two pre-order release, Forbes, GameSpot, Push Square, USA Today, and two VGC articles. None of these were 404/410/DNS. | Retry from another network, add a cached archive link, or pair each one with a second source that does open. Do not treat 403 as “dead”. | Medium |
| 18 | `_queue.md`, `_facts.md` | Broken / unverifiable links | `https://gta6news.gg/gta-6-cheats/` returned HTTP 454. Not published, but it is a cheats-topic URL in the research notes. | Drop or replace it. Do not promote a cheats URL into a live page. | Low |
| 19 | `radio-stations.md`, `release-time.md`, `map.md` (live HTML and feed) | Broken / unverifiable links | Bare hostnames in body copy (`gta6record.com`, `gtasix.org`, `rockstargames.com/VI`) are autolinked as **`http://`**, not `https://`. Those three `http://` URLs returned HTTP 500 here and did not redirect to the working HTTPS pages. | Write full `https://` URLs in the markdown (for the official site: `https://www.rockstargames.com/VI`). | Medium |
| 20 | `pages/about.md`, site footer, article footer, OG images | Legal / IP | Every live footer *does* show an unofficial disclaimer, but the affiliation clause is only “Not affiliated with Rockstar Games.” Take-Two appears later as trademark owner, not in the affiliation sentence. Workspace `pages/about.md` body has the full “Rockstar Games or Take-Two Interactive” line. `lib/site.js` and the OG badge omit Take-Two. Markdown page footers include Take-Two, but the rendered `site.disclaimer` overwrites the short form at the bottom of articles. | Change `site.disclaimer` (and the OG badge) to “Unofficial fan site. Not affiliated with Rockstar Games or Take-Two.” Keep the separate trademark sentence. Redeploy so every footer matches. | Medium |
| 21 | Site-wide (`lib/site.js`, `design/brand.json`, live chrome) | Legal / IP | The brand is “Leonida Guides”, using the official setting name. Titles and the homepage say “Unofficial”. This is typical for a fan site, but it is still trademark-adjacent. | Keep “Unofficial” in the `<title>` and header. Do not use Rockstar marks or logo-like lettering (current wordmark and sun/“L” icon look original; no Rockstar logo was found). | Medium |
| 22 | `pages/about.md` (live vs workspace) | Legal / IP | Live About still says a contact route “will be published on this page” and that “Every article names its author or byline.” Workspace About now uses a `[CONTACT]` placeholder and says the site does *not* publish named bylines (live guides use the default “Leonida Guides Team”). There is still no real contact address. | Put a real contact method on About, and redeploy so the byline policy matches the live byline. Do not leave `[CONTACT]` in production. | Medium |
| 23 | `_queue.md` | Legal / IP | Research notes link a “GTA 6 cheats” URL (unverifiable, see row 18). Not on the live site. | Keep cheats/piracy/leak URLs out of anything that could be published. | Low |
| 24 | Live OG images, logos, hero, icons | Legal / IP | Inspected `og/default.png`, guide OG images (sample: characters page), `icon-512.png`, and the header wordmark. Art is an original neon-coast cityscape plus the site wordmark. No Rockstar or GTA logo, no official key art, no story stills. OG images include “Unofficial fan site — not affiliated with Rockstar Games” (Take-Two still missing). Meta titles/descriptions on crawled pages did not reveal story, mission or ending details. Character names in marketing-level titles are hidden behind spoiler blocks in the body. | Keep using original art. Add Take-Two to the OG badge. Continue to keep spoilers out of `<title>`, description and `og:image` text. Compress OG PNGs (~650–690 KB is heavy for a 1200×630 share image). | Low |
| 25 | Templates `template-glitch-fix.md`, `template-money-method.md` | Legal / IP | Templates correctly ban exploit steps, GTA 5 money-glitch copy, and ban-risk tricks. The public “Glitch Fixes” and “Money Methods” hubs already exist (empty). | Keep the “fixes only / no exploit steps” rule when those hubs are filled. | Low |
| 26 | Multiple `title_alts` | AI-spammy | Several pages reuse the stock hook “Tips Nobody Tells You”. | Write page-specific alternatives. | Low |
| 27 | Category hubs: `/cars/`, `/collectibles/`, `/glitches/`, `/missions/`, `/money/`, `/ps5-settings/` | AI-spammy / live | Hubs say “No guides here yet” but meta descriptions already promise “exactly how to get them”, “fixes and workarounds that actually work”, gold-medal walkthroughs, and so on. Most of these are `noindex` (good). They are still in the main nav. | Until there is a real guide, use a short “coming after launch” description, or hide empty hubs from the nav. | Medium |
| 28 | `release-time.md` | Readability | The unlock table, status key (✅⚠️🔶), UTC/CET conversions and the US grouping note are accurate in intent but dense. An eight-year-old (and many adults) will struggle. | Lead with “check the countdown on your console”, then a short CET/UK/US box, and move the full table under a heading such as “Full time-zone table”. | Medium |
| 29 | `beginner-tips.md`, `ps5-settings.md`, `editions-prices.md`, `platforms.md` | Readability | Terms used without a simple first explanation: “slim jim”, “key cloner”, “VRR”, “VAT”, “SSD”, “Tempest 3D Audio”. Some others (FPS, HDR, haptics, pre-load, CET) are already explained. | Add one short phrase the first time, or add them to “Words used on this page.” | Medium |
| 30 | `launch-night-checklist.md` | Readability | “do not search for” a 60 FPS mode is slightly scolding and easy to misread. | “No 60 FPS mode is announced, so you will not find one in the settings.” | Low |
| 31 | Live `/beginner-tips/beginner-tips/` | Live site | The beginner guide is nested at `/beginner-tips/beginner-tips/` because the category slug and the page slug are the same. The sitemap lists both `/beginner-tips/` (hub) and the nested guide. Awkward URL and easy to get wrong when fixing the `.md` links. | Give the guide a unique path (for example `/beginner-tips/start-strong/`) or serve the single guide at `/beginner-tips/` and drop the extra hub. | Medium |
| 32 | Live `/ps5-settings/` vs `/launch-hub/ps5-settings/` | Live site | Nav includes a “PS5 Settings” *category* at `/ps5-settings/` with **0 guides** and `noindex`. The real guide is `/launch-hub/ps5-settings/` (category: pre-launch / Launch Hub). Easy to click the empty hub. | Remove the extra category, or make `/ps5-settings/` redirect to the real guide. | Medium |
| 33 | Live sitemap / IA vs `content/` | Live site | Live sitemap has 17 URLs. Guides except the beginner page live under `/launch-hub/`. Markdown files are flat in `content/`. Not a content error, but it is why relative `.md` links break (row 3). | Document the permalink rule in `content/README.md` and generate links from slugs, not filenames. | Low |
| 34 | Live vs workspace (post-11:52 CET) | Live site | Live `Last-Modified` is 11:52 CET. Workspace updates at 11:55–11:57 CET already change: Brisbane/Perth rows in `release-time.md`; About byline policy and `[CONTACT]`; plus other small guide edits. A new `template-leak.md` and 37 inbox stubs also appeared after the crawl. | Redeploy only after the high-severity fixes (rows 1–4) are in the build. Re-crawl `/launch-hub/release-time/` and `/about/` after deploy. | Medium |
| 35 | `pages/about.md` (workspace) | Legal / IP | About’s opening disclaimer is good, but the meta description still says only “Not affiliated with Rockstar Games” (no Take-Two). | Align the meta description with the full affiliation sentence. | Low |
| 36 | Content source list vs live “Sources & credits” | Live site | Front-matter URLs do appear at the bottom of live guides (good). Labels are usually just the hostname. Missing front-matter sources (row 13) therefore also go missing on the live page. | Same fix as row 13. Prefer human labels (“PlayStation Support”, “Rockstar Newswire”) over raw hostnames. | Low |
| 37 | `https://www.playstation.com/GTAVIfeatures` | Broken links | Short link works (200) but the destination locale depends on the client (this box landed on `sl-si`; a US fetch landed on the US game page). | Prefer a stable `en-us` (or regional) PlayStation URL so every reader gets the same text. | Low |
| 38 | Empty `leaks` category risk | Legal / IP | `template-leak.md` uses `category: leaks`, which is not in `categories.seed.json`. If a leak page were published, the build might create a new public hub. | Do not add a leaks category to the nav. See row 5. | Medium |
| 39 | `beginner-tips.md` | False / unverified | Quick answer states “heavy Vice City traffic” and “six-star wanted levels” as facts. Six stars are widely reported in previews (GameSpot and others); “heavy” traffic is a preview paraphrase, a bit stronger than a sourced quote. | Keep six stars if the preview source is in `sources:`. Soften traffic to “previews describe busy Vice City roads.” | Low |
| 40 | `launch-night-checklist.md` FAQ | False / unverified | “Sony and Microsoft both say pre-orders were record-breaking” is fair: PlayStation Blog calls it the most pre-ordered game in PlayStation Store history; Xbox Wire calls it the most pre-ordered title of all time on the Microsoft Store. Not a correction; included so it is not re-litigated. | Optional: quote the official phrases and link both posts. | Low |
| 41 | Feed `/feed.xml` | Live site | The Atom feed repeats the broken `.md` hrefs, raw `TODO: image:` lines, and bare `http://` autolinks. | Fixing rows 3, 4 and 19 and rebuilding the feed clears this. | Medium |

---

## Live site

**URL:** https://roarcode.github.io/  
**Crawl starting points:** `/`, `/sitemap.xml` (17 locs), `/robots.txt`, `/feed.xml`, plus category hubs linked from the header/footer.

### Pages found (HTML, 200)

Home, Search (`noindex`), 404, About, Launch Hub (12 guides), Beginner Tips hub (1 guide), empty hubs for Missions, Money, Collectibles, Cars, Glitches, and PS5 Settings, the nested beginner guide, and 12 Launch Hub guides (editions, characters, launch-night, setting, map, online, platforms, pre-load, PS5 settings, radio, release time, bonus pack).

Templates and `_` / inbox files are **not** on the live site.

### Disclaimer (every live HTML page)

A site footer is present on every crawled HTML page, including Search, 404 and empty hubs, with this wording:

> Unofficial fan site. **Not affiliated with Rockstar Games.** Grand Theft Auto and GTA VI are trademarks of Take-Two Interactive Software, Inc.

Guide and About articles also repeat the short `site.disclaimer` under the body. **Take-Two is not in the affiliation clause** on the live footer, article line, or OG badge (see row 20). About’s *body* still has the fuller sentence on both live and workspace copies.

### Titles, meta, Open Graph, Twitter

- All crawled HTML pages have `<title>`, meta description, canonical, `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description`, `twitter:image`.
- Homepage title: “Leonida Guides: Unofficial GTA VI Guides”. Guide titles follow the markdown `title` plus “| Leonida Guides”.
- No live `<title>` or description claimed the site was official. “Officially announced stations” on the radio page refers to Rockstar’s preview, not to the site.
- No mission, ending or secret-reveal wording was found in titles or descriptions. The characters guide title includes “No Spoilers”. Region names are not in the map/setting meta.
- `og:image` / `twitter:image` files all returned 200. Samples were opened: original neon cityscape, site wordmark, unofficial badge, no Rockstar logos or official artwork. Guide OG images are title cards on that same background. Files are large (~668–689 KB).
- Empty hubs that should stay out of Google are `noindex, follow`. Launch Hub, About, home, and the actual guides are `index, follow`.

### Dead and unverifiable live links

**Dead (7), all 404, all leftover `.md` links:**

- `/beginner-tips/beginner-tips/preload-size.md`
- `/beginner-tips/beginner-tips/ps5-settings.md`
- `/launch-hub/launch-night-checklist/preload-size.md`
- `/launch-hub/leonida/map.md`
- `/launch-hub/map/leonida.md`
- `/launch-hub/gta-6-online/release-time.md`
- `/launch-hub/preload-size/release-time.md`

**Unverifiable (10):** the seven 403/402 reputable/official sources listed in the summary, plus `http://gta6record.com`, `http://gtasix.org`, `http://rockstargames.com/VI` (HTTP 500, no HTTPS redirect). The `https://` versions of those hosts were 200.

### Live vs `/workspace/gta6-guides/content/`

| Item | Workspace content | Live site (11:52 CET deploy) |
|---|---|---|
| Brisbane / Perth unlock rows | Updated 11:55 CET to 11:00 PM / 9:00 PM with UTC 13:00 | Still shows local midnight and old prose that claims the table already shows 11 PM / 9 PM |
| About bylines | “We do not publish named author bylines.” | Old text: “Every article names its author or byline.” |
| About contact | `[CONTACT]` placeholder | “A contact route will be published on this page.” |
| Affiliation in markdown footer | Includes Take-Two | Rendered disclaimer omits Take-Two from the affiliation clause |
| Internal cross-links | Still written as `*.md` | 404 on the live paths above |
| Image placeholders | `TODO: image:` in markdown | Published as visible raw markdown |
| `template-leak.md` and `inbox/*` | Present in the tree after 11:57 CET | Not published (correct) |

Otherwise, live guide copy matched the pre-11:55 workspace text that was reviewed in full.

---

## What looks sound

- Release date **19 Nov 2026**, midnight-local framing, pre-load **10 Nov**, “up to / at least **212 GB**”, code-in-box / no disc, PS4 no, PC not announced, Xbox Cloud from **1 AM ET on 19 Nov** at Series S settings, 30 FPS target, PS5 Pro PSSR and ray-traced shadows, languages, Ultimate item list, Vintage pack hedge (19 vs 20 Nov), GTA+ month renews until cancelled, and “single-player experience” all matched official or reputable pages opened this session.
- Rumour blocks are used for online-mode leaks, a fan map-size figure, Forbes’ own square-mile sum, a Wikipedia PC date, and Vice’s datamined patch sizes. Linking a news article about patches is not the same as linking leaked files.
- Story and character background on the pre-launch pages sits in `:::spoiler` blocks. Templates tell writers to keep exploit steps out.
- Every live page has an unofficial footer. No Rockstar logo or ripped official artwork was found in content or in the live chrome/OG set.
- Empty post-launch hubs are `noindex`. `content/inbox/` and `template-*.md` are not in the sitemap.

---

## Top fixes (priority order)

1. Redeploy after fixing the **Brisbane/Perth** table (workspace already started this) and escaping **`X|S` in tables**.
2. Rewrite **internal links** to live permalinks so the seven `.md` 404s go away; keep raw **`TODO: image:`** out of HTML and the feed.
3. Put **Take-Two in the affiliation disclaimer** used by the footer, article line and OG badge.
4. Soften over-claims: radio “all 6 stations”, 60 FPS FAQ, About’s “only confirmed facts”, and the secondary carry-limit row.
5. Add missing **sources to front-matter**, fill About **contact**, resolve the **beginner-tips URL** and the empty **PS5 Settings** nav hub.
6. Reconsider or tightly fence **`template-leak.md`** so it does not fight the “no leaks” rule.

---

## Link check appendix

### Content URLs that could not be verified (not dead)

| URL | Result | Where |
|---|---|---|
| https://taketwointeractivesoftwareinc.gcs-web.com/news-releases/news-release-details/rockstar-games-announces-pre-orders-grand-theft-auto-vi/ | 403 | editions, characters, bonus pack |
| https://www.forbes.com/sites/brianmazique/2026/10/06/gta-6s-map-is-about-twice-the-size-of-gta-5-with-hurricanes-and-170-animal-species/ | 403 | beginner tips, map, setting |
| https://www.gamespot.com/articles/gta-6s-big-reveal-all-the-things-we-learned/ | 403 | several guides |
| https://www.pushsquare.com/guides/gta-6-release-times-and-preload-when-can-you-start-playing | 403 | release time |
| https://www.usatoday.com/story/tech/gaming/2026/11/09/gta-6-preload-consoles-release-date-file-size/92640419007/ | 402 | several guides |
| https://www.videogameschronicle.com/news/rockstar-details-grand-theft-auto-6-pre-load-date-and-time-and-file-size/ | 403 | pre-load, map, facts |
| https://www.videogameschronicle.com/news/rockstar-reveals-a-swathe-of-new-gta-6-details-ahead-of-the-netflix-extended-look/ | 403 | characters, facts |
| https://gta6news.gg/gta-6-cheats/ | 454 | `_queue.md` / `_facts.md` only |

### Live-only extra failures

The three bare `http://` autolinks listed in row 19 (HTTP 500). The seven `.md` 404s listed in the Live site section.

