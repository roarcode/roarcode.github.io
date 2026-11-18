# GTA 6 guides site — finance-view monetization plan
Author: Bookkeeper · Written: Wed 18 Nov 2026 (Europe/Ljubljana) · All URLs checked 18 Nov 2026 unless stated.
Research only: nothing signed up, nothing bought. Currency: € (1 € ≈ $1.096, ECB 12 Nov 2026 as quoted by pubsleuth.com/ad-networks/snigel).

Labels: **[V]** = read on the official/primary page this session · **[S]** = secondary source (blog/aggregator), treat with care · **[E]** = my estimate/assumption, not a fact.

---
## 0. Bottom line (read this first)
1. **Realistic money in the first 6 months is small.** Base case ≈ **€970 gross over 6 months** (≈ €160/month), conservative ≈ **€75**, viral ≈ **€8,250** [E]. A new domain with AI-assisted guides, launching into a market where Google AI Overviews and established gaming sites take most clicks, is more likely conservative-to-base than viral.
2. **Only AdSense (and, if ≥1,000 premium sessions/month, Mediavine Journey) are reachable now.** Ezoic (250k users), Raptive (25k PV + domain ≥6 months old), Nitro (300k PV / 100k visitors), Playwire (500k PV), Freestar (~1M PV typical), Snigel/Publisher Collective (~€300/day) are out of reach for months.
3. **Affiliate pays far less than ads at this scale** (Amazon video games/consoles are 1% in the US store; 5% games / ~1% PS-consoles in the DE store). Treat affiliate as ≈ €0.3–1.2 per 1,000 PV [E].
4. **Tax/registration is the real cost driver.** FURS says *continuous* earning from web content/ads is business income (dejavnost) and must be registered; "other income/25% advance" is only for one-off/occasional work. A popoldanski s.p. costs ≈ €113.01/month in contributions — that is **more than the base-case monthly revenue**. So: do **not** turn on ads/affiliate until Rok has (a) confirmed with SPOT/FURS that he can open a popoldanski s.p. and (b) decided traffic justifies it (trigger in §7).
5. **Top risks:** (i) Google "scaled content abuse"/low-value rejection of AI-heavy pages; (ii) Take-Two/Rockstar IP — policy is non-commercial-only, and Take-Two has won UDRP cases against "GTA…" domain names; (iii) tax non-registration ("delo na črno"); (iv) grey-market key sellers.

---
## 1. Ad networks and real entry thresholds (2026)

| Network | Entry threshold (verified wording) | Reachable by this site in 6 months? | Source |
|---|---|---|---|
| **Google AdSense** | No published minimum traffic/pages/domain age. Need own site/HTML access, 18+, original content that follows program policies. Review "usually days, can be 2–4 weeks" [S]. *github.io is on the Public Suffix List so can be added; Cloudflare `*.pages.dev` reportedly cannot — own domain needed* [S]. | **Yes**, but needs own domain (≈ $10–15/yr [S]) for Cloudflare Pages. Risk: "low value content" rejection for AI/thin pages. | [V] support.google.com/adsense/answer/91205 ; [V] support.google.com/adsense/answer/81904 ; [S] ideatotraffic.com/adsense-low-value-content-github-pages-blog ; [S] dev.to/morinaga/why-google-adsense-will-not-approve-a-vercelapp-site-110b |
| **Mediavine Journey** | **1,000 premium sessions in 30 days** (US/CA/UK/AU), GA4 connected, original brand-safe content, frequently updated. **Automatic disqualifiers include "excessive use of AI"**, incompatible CMS, <1,000 premium sessions. One unified application; Journey auto-evaluated for full Mediavine at $5k annual ad revenue. | **Possible** in base/viral if ≥1k Tier-1 sessions; AI-content rule is the main risk. | [V] journeymv.zendesk.com/hc/en-us/articles/24633185741723-Journey-Minimum-Requirements ; [S] thetrafficletter.com/blog/make-money-online/journey-by-mediavine/ |
| **Raptive** | **25,000 PV/month**; 50% of traffic from US/UK/CA/AU/NZ (25k–99k PV) or 40% (100k+); long-form original content with "meaningful human involvement"; GA4; **domain ≥6 months old**. | **No** before ~month 6 (domain age) even if traffic is there. | [V] help.raptive.com/hc/en-us/articles/360032840891-Who-is-eligible-for-Raptive (updated 26 Sep 2026) |
| **Ezoic** | **250,000+ monthly active users** (from Feb 2026). **"Access Now"/no-minimum no longer available to new sites.** Alternative: Incubator, 20 sites/month selected, selective. Also bans "automatically generated content". | **No** (Incubator is a lottery). Old guides saying "no minimum" are outdated. | [V] support.ezoic.com/kb/article/getting-started-ezoics-requirements ; [V] ezoic.com/incubator |
| **NitroPay** (gaming-focused) | Published minimum 100k monthly visitors or 300k monthly PV. | No unless viral. | [S] blog.nitropay.com/how-to-switch-from-your-current-ad-network-into-nitro-without-losing-revenue/ |
| **Playwire** | 500,000 PV/month, GA, IVT <7%, English-speaking footprint. | No. | [V] playwire.com/faq |
| **Freestar** | No fixed minimum but "average publisher ≥ 1M PV/month"; 50% traffic from US/UK/CA/NZ/AU; **explicitly rejects "low quality AI-generated" content**; 50% organic traffic. | No. | [V] freestar.com/publisher-quality-requirements/ |
| **Snigel / Publisher Collective** | Evaluates sites earning ≈ €300/day (smaller sites with strong growth/content may be considered); gaming is core niche; exclusive sales rep. | No. | [V] publisher-collective.com/faq ; [S] pubsleuth.com/ad-networks/snigel |
| **Venatus** | No minimum published; human brand-safety review; net-90 payment, $100 minimum. | Unlikely. | [S] pubsleuth.com/best-ad-networks-for-gaming-websites |

Practical order: **AdSense first → Journey when 1,000 premium sessions/month → Raptive from month 6+ if ≥25k PV and ≥50% Tier-1 traffic.** Note ~50% of Tier-1 traffic is required by Raptive/Freestar; GTA 6 search interest is strongly European/Brazilian/Indian (France, Germany, Poland are highest per capita; seodata.dev), which will pull RPM down.

## 2. RPM benchmarks (gaming vs other niches)
Sources disagree widely — **plan on the low end**.

| Benchmark | Figure | Type | Source |
|---|---|---|---|
| Gaming **page RPM, US traffic** | $5–12 (finance $15–40, tech $10–25, lifestyle $8–18, news $5–10) | [S] vendor blog | weforads.com/blog/ad-revenue-benchmarks-2026/ (Apr 2026) |
| Gaming AdSense RPM, worldwide | $4–10 (modelled from CTR 1.2% × CPC $1 × 0.6 niche multiplier; "new sites sit at bottom or below") | [S] modelled | adstimate.com/blog/niche/gaming-adsense-rpm.html |
| Country multipliers (same content) | US ≈ 1.0×, UK/AU/DE 0.7–0.9×, FR/ES/IT 0.5–0.7×, Brazil 0.2–0.4×, India 0.05–0.15× | [S] | weforads (above) |
| Gaming **session** RPM (US) | ≈ $2–6 | [S] | monetizationguy.com/minis/so-what-exactly-is-session-rpm ; toolsignal.site/articles/blog-display-ad-rpm-by-niche-2026 |
| Gaming on Mediavine-class networks | ≈ $23 per 1,000 sessions typical "Western audience" synthesis; one calculator $8–25 | [S] weak | pubsleuth.com/ad-networks/pubnation ; nextaipulse.com/mediavine-rpm-calculator-by-niche |
| Worldwide AdSense gaming estimate | ≈ $0.93 per 1,000 pageviews | [S] | pubsleuth.com/best-ad-networks-for-gaming-websites (quoted via search summary; not re-verified in page text) |
| Seasonality | Q4 +20–50% vs average; Q1 −20–30% | [S] | weforads ; adstimate (Q4 ≈ +35%, Q1 ≈ −18%) |
| Raptive claim | Gaming sites moving to Raptive see "on average 89% RPM uplift" vs prior solution; ≈50% of Google traffic to gaming sites comes from **Discover** | [V] vendor marketing | investgame.net/wp-content/uploads/2026/03/2026-03-10-raptive_researchbrief_googlediscovergaming_wp.pdf |

**Model inputs [E]:** blended page RPM after ad-blockers and a ~45% Tier-1 mix = **$3 (conservative) / $5 (base) / $6 (viral)** per 1,000 PV = €2.74 / €4.56 / €5.47. Gaming RPM is structurally lower than finance/home (gaming advertisers skew app-install CPI and a younger audience — weforads).
Note the unusual Q4 tailwind: Nov–Dec CPMs are seasonally higher; January will drop.

## 3. Affiliates

### 3.1 Amazon Associates
| Store | Video games | Consoles | Headsets/audio | Books | Source |
|---|---|---|---|---|---|
| Amazon.com (US) | 1.0% physical games & consoles; 2.0% digital games | 1.0% | 3.0% (Headphones) | 4.5% | [S, copied from Amazon schedule, checked Aug 2026] amawp.com/amazon-associates-commission-rates/ |
| Amazon.de | **5.0%** Video-Games; Games-Downloads 10% | table lists "PS4 consoles 1.0%" (PS5 not named — confirm in your rate card) ; Electronics 3% | Electronics 3% | 7% | [V] partnernet.amazon.de/help/operating/scheduleoct1 ("EU Fee Statement Appendix") |
| Amazon.co.uk | 3.0% (Computer/Electronics/Video Games) ; 5% Digital Video Games | Home Entertainment 1.0% | 3% | 5% | [V] same page |

- **Rules to note:** 3 qualifying sales within 180 days or the application is withdrawn [V via Amazon Help search result]; each marketplace needs its own Associates account; OneLink can redirect visitors between stores [S]. **No Slovenian Amazon storefront**; Slovenia residents can apply on Amazon.de PartnerNet per search summary [S] — **confirm** account approval/payout (bank/tax) before relying on it. Since 14 Apr 2026 sales via paid/boosted ads linking to Amazon are excluded [S, amawp].
- **Unit economics [E]:** console €500 × 1% = €5/sale; headset €80 × 3% = €2.40; guide book €30 × 7% = €2.10. With ≈ 0.4% of guide PV clicking out and ≈ 6% converting at ≈ €2 average commission, affiliate ≈ **€0.3–1.2 per 1,000 PV** (model). Ad RPM beats it ~5:1.
- Official/strategy guidebook: GTA 6 strategy guide existence/ASIN not verified; don't promise it in plans.
- Also: Amazon gift cards 0% in US, 3% in UK/DE; PS-store gift cards would be a poor fit.

### 3.2 Humble Bundle
Runs on Impact; **commission not published** (the "5%/15%" numbers on older pages are legacy). Cashback/loyalty/coupon affiliates not accepted. Humble sells PC keys — GTA 6 is not on PC (seodata.dev: "no PC date announced"), so low relevance now. [S] bestaffiliateprograms.cc/programs/humble-bundle (terms verified 26 Oct 2026) ; [S] developer.humblebundle.com/post/155648719646.

### 3.3 Key sellers (CDKeys, Eneba, Kinguin, G2A, Gamivo) — **flagged high-risk**
| Program | Published rate | Cookie | Source |
|---|---|---|---|
| Eneba | 2–5% standard, can grow | 30 days | [V] eneba.com/become-affiliate |
| Kinguin (Awin) | 5–10% (6% games / 10% software on Awin) | 30 days | [S] ui.awin.com/merchant-profile/32217/commission-groups ; kinguin.net/news/gaming-and-software/155/kinguin-affiliate |
| G2A Goldmine | up to ~5% | 24 h | [S] g2a.com/goldmine/ |
| Gamivo | up to ~8% | 24 h | [S] gamivo.com/affiliate |
| CDKeys | ~6% | 30 days | [S] search summary |

Risks: G2A admitted selling stolen keys and paid $40k to Factorio devs; tried to pay for undisclosed positive coverage (Ars Technica 2020, Polygon 2019 via search). Freestar/Mediavine-type partners and many readers regard key resellers as reputationally toxic; console GTA 6 is a PS5/Xbox title, so cheap-key demand is for PC/other games, not this game. **Recommendation: exclude key-seller affiliate links at launch.** If ever used, always disclose affiliate links (EU/Slovenian disclosure rules; FTC if US readers) — [E] general compliance, not researched here.

### 3.4 Merch / print-on-demand
**Don't.** Rockstar/Take-Two own GTA / "Grand Theft Auto" / Rockstar marks; selling shirts with GTA branding is commercial trademark use outside the fan-use policy (see §8). Only original designs with no GTA marks/logos; revenue not modelled.

## 4. Email list and sponsorships
| Tool | Free tier (2026) | Source |
|---|---|---|
| beehiiv | Free plan up to **2,500 subscribers**, unlimited sends | [S] beehiiv.com/pricing ; beehiiv.com/blog/beehiiv-pricing-2026 |
| MailerLite | Free up to **250 active subscribers** and 2,500 emails/month (sending pauses above) | [S] mailerlite.com/pricing ; mailerlite.com/help/free-plan-update-faq |

- Recommendation: beehiiv free (more headroom). Email adds repeat traffic (Mediavine Journey notes email traffic monetizes well [V journeymv best-practices]) but **no email revenue in the 6-month model**.
- **Sponsorships:** no sourced benchmark for a new site under ~100k PV; assume **€0** in months 1–6 [E]. Realistic first deals: a gaming-gear/peripheral brand, a VPN/streaming service — flat fee per newsletter/month — only after 5–10k engaged subs or ~100k PV [E]. Don't count on it.

## 5. Traffic scenarios, months 1–6 (all **estimates [E]**)
Month 1 = 19 Nov–18 Dec 2026 … Month 6 = 19 Apr–18 May 2027.

**Market context (verified):** "gta 6" ≈ 9.14M Google searches/month worldwide (1.83M US); "gta 6 map" 110k US/mo; "gta 6 release date" 1.22M US/mo; interest peaked June 2026 (20.4M worldwide) [V-ish, seodata.dev/blog/gta-6-search-trends, 18 Nov 2026, Google Keyword Planner]. Demand is huge, but supply of guides is too: Raptive says AI Overviews cut clicks on informational queries and gaming media gets ~50% of Google traffic from Discover [Raptive brief]; Search Engine Land reports AI Overviews cutting clicks ~42% across 64 publishers (search summary); Reuters Institute (17 Nov 2026) says guide pages are losing traffic/dwell/ad revenue. **A new domain has no documented "sandbox" but commonly takes months to rank; "Discovered – currently not indexed" is normal early** [S seerix.ai/blog/new-website-zero-traffic].

Assumptions: ads go live mid-month 1 in base/viral (50% of M1 PV monetised) and month 2 in conservative (approval delay/rejection); costs excluded here.

| Month | Cons. PV | Cons. € | Base PV | Base € | Viral PV | Viral € |
|---|---|---|---|---|---|---|
| 1 | 6k | 2 | 35k | 108 | 350k | 1,378 |
| 2 | 5k | 15 | 40k | 214 | 300k | 2,002 |
| 3 | 4k | 12 | 30k | 161 | 200k | 1,335 |
| 4 | 4k | 12 | 25k | 134 | 150k | 1,001 |
| 5 | 5k | 15 | 30k | 161 | 180k | 1,201 |
| 6 | 6k | 18 | 35k | 188 | 200k | 1,335 |
| **Σ gross (cum. M6)** | 30k | **€75** | 195k | **€966** | 1.38M | **€8,253** |
Cumulative by month — Conservative: 2 / 17 / 29 / 41 / 56 / 75 · Base: 108 / 322 / 483 / 617 / 778 / 966 · Viral: 1,378 / 3,380 / 4,715 / 5,716 / 6,918 / 8,253.

Inputs [E]: page RPM €2.74 / €4.56 / €5.47 (ads) + affiliate €0.30 / €0.80 / €1.20 per 1,000 PV. My subjective odds: conservative ~55%, base ~35%, viral ~10%.
Sensitivities: ±1 € RPM moves base total by ≈ €195; Tier-1 share is the swing factor; Q1 2027 CPMs fall 18–30% (months 3–6 are partly Q1 — already roughly reflected by lower traffic but not by RPM, so treat M3–M6 as optimistic by ~10–20%).
Journey check [E]: base ≈ 35k PV ≈ 25k sessions × ~35% Tier-1 ≈ 8k premium sessions → clears 1,000; conservative ≈ 6k PV ≈ 4k sessions × 30% ≈ 1.3k → borderline.

## 6. Costs and break-even
| Item | Cost | Notes |
|---|---|---|
| Domain (.com) | ≈ $10–15/year ≈ €1/month [S ideatotraffic] | **Needs Rok's yes before buying** |
| Hosting | €0 (GitHub Pages / Cloudflare Pages free) [E — free-tier limits not re-verified this run] | Cloudflare `*.pages.dev` can't be used for AdSense [S] |
| Analytics / GSC / GA4 | €0 | needed for Journey/Raptive |
| Email | €0 (beehiiv ≤2,500 subs) [S] | |
| AI usage (agents drafting/updating) | **€30/month lean, €100+ if heavy** [E — depends entirely on model/token use; not researched] | the biggest variable cost |
| Misc (images/tools) | ≈ €4 [E] | |
| **Lean total** | **≈ €35/month ≈ €210 over 6 months** [E] | |
| Popoldanski s.p. contributions | **€113.01/month (≈ €1,356/yr)** [V mladipodjetnik.si, 16 Nov 2026] — payable even with zero revenue; no "pause" | only if registered |
| s.p. income tax (normirani) | ≈ 4% of revenue up to €12.5k [V] | |

Break-even [E from model]:
| Scenario | Blended RPM (ad+aff) | Monthly PV to cover lean €35/mo (no s.p.) | Monthly PV to cover €35 + €113 s.p. + 4% tax |
|---|---|---|---|
| Conservative | €3.04 | ≈ 12k | ≈ **51k** |
| Base | €5.36 | ≈ 7k | ≈ **29k** |
| Viral | €6.67 | ≈ 5k | ≈ **23k** |

6-month net [E]: Conservative −€135 before s.p. (≈ −€816 with s.p.); Base +€756 before s.p. (≈ **+€39** with s.p.: contributions €678 + tax €39 absorb almost all of it); Viral +€8,043 (≈ +€7,035 with s.p.).
Read: **with an s.p. in place from day one, only the viral case clearly pays; the base case roughly breaks even.** Hence the staged plan in §7.

## 7. Slovenian tax and registration (Rok: UL EF student + full-time manufacturing job)

### 7.1 Correction to earlier notes
Earlier I (and the Make $ room notes) assumed ad income from abroad would be "drugi dohodki (other income) with 25% advance tax". **That is not what FURS says for ongoing online earnings.** FURS page "Zaslužki preko spleta" [V, fu.gov.si/zivljenjski_dogodki_prebivalci/obcasni_zasluzki_preko_spleta]:
- Online business is "as a rule" a pridobitna dejavnost → income from dejavnost (ZDoh-2 ch. III.3), or ZDDPO-2 if a d.o.o.
- It **must be registered** (s.p. or d.o.o.); otherwise it is **"delo na črno" prohibited by Art. 3 ZPDZC-1**.
- Exception only for **one-off/occasional** jobs: then "dohodek iz drugega pogodbenega razmerja" — 10% normirani costs, contributions where not insured elsewhere (6.36% health, 15.5% pension), **25% advance**, self-declared by the 15th of the next month via eDavki for foreign payers.
- Creators publishing content (incl. advertising) "permanently/continuously and independently" → income from dejavnost.
A Slovenian forum thread (slo-tech.com/forum/t828115, 2024, anecdotal) describes people raising the payout threshold and self-reporting once a year — **not official, and I would not recommend it**; FURS wording points to registration.
So, for a site that will earn every month, **plan on registration**; "occasional income" is only defensible for a tiny/one-off event.

### 7.2 Student status
- "Študentsko delo" (student work via agency) doesn't fit ad/affiliate income (it's a dependent-work arrangement).
- The old "študentski s.p." was **abolished 1 Jan 2013** [V mladipodjetnik.si/podjetniski-koticek/ustanovitev-podjetja/popoldanski-s-p]. A popoldanski s.p. is available to anyone **employed full-time (40h/week) by another employer**, who is insured via that job; a student can open one **only if they meet those same conditions**. → Rok's manufacturing job must be a **full-time employment contract**. **Needs SPOT confirmation** (open question from earlier).
- If the job is not full-time: a regular s.p. has full social contributions (several times higher per the same page) — not worth it for this site.

### 7.3 Popoldanski normirani s.p. (2026 rules) [V mladipodjetnik.si/podjetniski-koticek/racunovodstvo/normirana-obdavcitev, 16 Nov 2026]
- Contributions: **€113.01/month flat** (due by the 20th, every month, even with no revenue).
- Normirani expenses (popoldanski): **80% of revenue up to €12,500; 40% from €12,500–30,000; 0% from €30,000–50,000**; status ends if average revenue over 2 consecutive years > €50,000.
- Tax on the remaining base at **20%** (35% above a high base) ⇒ effective **4%** on first €12.5k, 12% on €12.5–30k, 20% on €30–50k. No bookkeeping, only simplified records; no personal/activity reliefs for normirani.
- Example: €6,000/yr revenue → tax base €1,200 → €240 tax + €1,356 contributions = €1,596 total (≈ 27% of revenue).

### 7.4 VAT
- Slovenia's small-business (SME) VAT exemption threshold: **€60,000** turnover in the calendar year; up to 10% over (≤ €66k) keeps exemption to year-end [V sme-vat-rules.ec.europa.eu/national-vat-rules/slovenia-sme-rules_en]. Invoices carry the Art. 94(1) ZDDV-1 clause.
- Ad revenue is a B2B service to Google (EU entity/Irish for EU publishers, per Google's setup — [E]); place of supply is outside Slovenia and the buyer self-accounts (reverse charge). **To confirm with FURS:** whether an exempt, unregistered s.p. needs a VAT ID/notification for EU B2B services or Amazon/affiliate-network payments (the EU cross-border SME scheme exists but a search summary says it doesn't help with *purchases* from Google etc.; racuna.si/vodnik/ddv-pri-nakupu-storitev-iz-tujine/ — not read in full).
- Affiliate programs (Amazon EU, Awin, Impact) may also be foreign B2B; same question.

### 7.5 Other items to confirm with FURS/SPOT
1. Is the Rok's job a qualifying "full-time employment" for popoldanski s.p.? (SPOT)
2. Is a hobby-sized site with a few € per month still "dejavnost"? FURS page says "as a rule yes"; get an informal written opinion from FURS (they issue "pojasnila") before ads go live.
3. Registration route and any fees at SPOT (e-VEM) — I believe it is free but did not verify.
4. Google/AdSense payment details, tax info (US-source revenue withholding forms), AdSense payment threshold (a forum post says €70 — verify in AdSense).
5. Whether normirani vs actual expenses is better: if real costs (AI, domain) stay at ~€35/month = €420/yr, 80% normirani on small revenue is far better than actual (revenue < €12.5k).

### 7.6 When does an s.p. become worthwhile?
- Fixed cost ≈ €148/month (s.p. + lean costs) ⇒ need **≈ €155/month revenue** to break even ⇒ **≈ 29k PV/month at €5.36 blended RPM** (§6).
- **Recommended staged plan [E]:**
  1. **Launch with no ads/affiliate at all** (launch-day traffic is the most valuable for audience and indexing; zero income = no registration obligation). Collect email list. Costs: domain + AI only.
  2. Ask SPOT/FURS (free) about eligibility.
  3. **Register popoldanski normirani s.p. and switch on AdSense when sustained traffic ≥ ~25–30k PV/month for 2–4 weeks, or the site is Journey-eligible (≥1,000 premium sessions).** Register first, then apply (AdSense review takes days to ~4 weeks), so no income arrives before registration.
  4. Re-test after 3 months of numbers; if revenue stays < ~€150/month, either close the s.p. (note contributions can't be paused) or stay un-monetised.
- Caveat: I am not a lawyer/tax adviser; ask a Slovenian accountant (≈ €30–60/month for normirani is common but unsourced).

## 8. Policy and IP risk

### 8.1 Google/AdSense policies and AI content
- Google does **not ban AI content**; it bans **scaled content abuse** — "many pages generated primarily to manipulate rankings, regardless of how created" (examples: using generative AI to generate many pages without adding value; scraping/stitching content). [V developers.google.com/search/docs/essentials/spam-policies, updated 28 Aug 2026]
- Google's gen-AI guidance: fact-check/review all AI output, add context on how it was created. [V developers.google.com/search/docs/fundamentals/using-gen-ai-content, 1 Oct 2026]
- AdSense won't place ads on "auto-generated pages or pages with little to no original content"; affiliate content should be "only a minor part" without added value; ads on screens with replicated content without added value are not allowed. [V support.google.com/adsense/answer/81904 ; support.google.com/adsense/answer/10502938]
- Publisher policies apply Search spam policies to ad eligibility. [V support.google.com/publisherpolicies/answer/11035931]
- Mature-game themes alone are not a "dangerous/derogatory" violation, but pages can get **restricted ad serving** (fewer advertisers, lower fill) [S via Google Help search summary — support.google.com/adsense/answer/10008391]. For GTA content with violence/crime this may depress RPM [E].
- **Mediavine Journey:** auto-disqualifier "extreme brand safety concerns or **excessive use of AI**"; wants original content and checks image attribution/permissions. [V journeymv…Journey-Minimum-Requirements]
- **Raptive/Freestar:** "meaningful human involvement"; Freestar excludes "low quality AI-generated" and "copyright-risk" content. [V help.raptive.com ; freestar.com/publisher-quality-requirements]
- **Ezoic:** no "automatically generated content," no copied content. [V support.ezoic.com]
- Mitigations: human editor review of every launch guide; original tests/screenshots/maps; named author + About/Contact/Privacy pages; avoid mass near-duplicate pages (e.g., one thin page per car/weapon); `noindex` thin pages; disclose AI assistance; cap publishing at what a human can verify; keep guides updated with "last verified" dates.

### 8.2 Rockstar / Take-Two IP
- **Rockstar's "Policy on posting copyrighted Rockstar Games material"** (support.rockstargames.com, last updated 10 Jan 2025; page returned a server error to me, so I rely on secondary summaries): Take-Two generally does not object to **non-commercial** fan use of game material if plot isn't deliberately spoiled; it can take down content at any time; **commercial/advertising/publishing uses need a licence** (copyright@take2games.com). "Non-commercial" = not making money from the footage nor using it to promote a product/service. [S nano-crea.com/gta6/guides/rockstar-rules (2 Nov 2026) ; openworlddaily.com/guides/gta-6-footage-streaming-policy/ ; wantedstate.com/gta-6-clips-monetization-rules/]
  → An **ad- and affiliate-monetised site using Rockstar screenshots/art is outside the written fan-use policy**; in practice GTA V stream monetisation has been tolerated, but that's tolerance, not permission. Text guides with minimal/own captured images are lower-risk than image-heavy ones.
- **Takedown/enforcement history:** OpenIV shut down after a Take-Two cease-and-desist (2017) [PC Gamer]; DMCA takedowns on re3/reVC repos (2021, github/dmca) and LibertyCity mods (Kotaku); Take-Two's re3/reVC lawsuit was dismissed with prejudice in 2023 (search summary). [S pcgamer.com/gta-modding-tool-openiv-shuts-down-claiming-cease-and-desist-from-take-two/ ; github.com/github/dmca/blob/master/2021/02/2021-02-19-take-two.md ; kotaku.com/take-two-goes-on-another-grand-theft-auto-mod-killing-s-1847467984]
- **Domain-name risk (verified pattern):** Take-Two has won multiple WIPO UDRP cases forcing transfer of "GTA…" domains, including fan-flavoured ones (gtarevolution.com, gtaextreme.com, gtatv.com, grandtheftautovideos.com, grandtheftautoonline.com) [S hlc.com Hogan Lovells note; rightsy.io/documents/udrp_decision/D2013-0489; WIPO cases D2013-0787, D2013-0955]. Those cases mostly involved beta-key/cheat-code sites, but **a "gta"-in-domain fan site with ads is the profile that gets disputed**. Mitigation: don't put "GTA", "Grand Theft Auto" or "Rockstar" in the domain; use "6" or Vice-City-flavoured generic name; say "GTA VI" only descriptively in page text.
- Other fan sites' practice (descriptive only): use "GTA"/"Rockstar Games" only to identify the game, state "independent fan site, not affiliated with Rockstar Games or Take-Two", no Rockstar logos as site identity. [S gtaready.com/disclaimer ; gtavibes.com/copyright ; gtasix.org/en/disclaimer/]
- **Mitigations checklist:** disclaimer in footer; own wordmark (no GTA logo/typeface lookalike); own screenshots, credited, minimum number, edited for value (annotated maps) rather than raw art; no leaked/pre-release material; no cheats/mod/dup glitches that harm online play (Rockstar policy lists these as takedown triggers); no isolated cutscenes/ending videos; no music; DMCA/contact page and fast removal; consider emailing copyright@take2games.com for written confirmation — **an external message, needs Rok's approval; I have not sent anything.** Keep affiliate/key-seller links off.

---
## 9. Recommended sequencing for Rok (money view)
1. **Now (launch week):** publish with no ads/affiliate; build email list (beehiiv free); use free hosting (GitHub Pages `github.io` is AdSense-eligible; Cloudflare Pages needs own domain). Human-review every page.
2. **Rok decisions needed:** domain purchase (~€12/yr), and whether to start SPOT/FURS enquiries now.
3. **Trigger to monetise:** sustained ≥ ~25–30k PV/month (or Journey eligibility) AND SPOT confirms popoldanski s.p. → register → apply AdSense/Journey (Amazon.de PartnerNet afterwards).
4. **Month 6+:** Raptive if ≥25k PV and ≥50% Tier-1 traffic and domain ≥6 months.
5. **Do not do:** key-seller affiliates, GTA-branded merch, "gta" in the domain, monetised image-heavy Rockstar art, tax-avoidance by delaying payouts.

## 10. Open items / not verified
- Rockstar's policy page itself (HTTP 500 on fetch) — verify text.
- Whether Amazon.de PartnerNet pays Slovenian residents without issues; PS5 console commission category on .de.
- AI usage cost, hosting free-tier limits, sponsorship rates: assumptions only.
- RPM figures are vendor-blog benchmarks (low reliability); actual first-month AdSense data will replace them.
- All Slovenian tax conclusions: confirm with FURS/SPOT or an accountant.
