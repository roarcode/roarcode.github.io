"""Generates mockup-*.html (static HTML; Lead Engineer mirrors the markup/classes 1:1 in Eleventy). Placeholder text only — no spoilers."""
import pathlib
D = pathlib.Path(__file__).resolve().parent.parent
DISC = 'Unofficial fan site — not affiliated with Rockstar Games'
def svg(d, cls='icon'): return f'<svg class="{cls}" viewBox="0 0 24 24" aria-hidden="true">{d}</svg>'
IC = {
 'search': '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
 'menu': '<path d="M4 7h16M4 12h16M4 17h16"/>', 'close': '<path d="M6 6l12 12M18 6 6 18"/>',
 'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', 'check': '<path d="m5 12 5 5 9-10"/>',
 'alert': '<path d="M12 8v5M12 17h.01"/><path d="M10.3 4.2 2.8 17.5A2 2 0 0 0 4.5 20.5h15a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0z"/>',
 'flame': '<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 .3 1.2 1 2 2 2 0-3-1-5 1-8z"/>',
 'missions': '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>', 'money': '<circle cx="12" cy="12" r="9"/><path d="M14.5 9c-.5-1-1.5-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2 0 3 5 1.5 5 4.500 0 1.200-1 2-2.500 2-1.100 0-2.100-.5-2.600-1.500M12 6v1.500M12 16.500V18"/>',
 'collectibles': '<path d="m12 3 2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100L3.200 9.500l6.100-.9z"/>',
 'vehicles': '<path d="M5 16V11l2-5h10l2 5v5M3 16h18M7 19v-3M17 19v-3M5 11h14"/>',
 'weapons': '<circle cx="12" cy="12" r="8"/><path d="M12 2v6M12 16v6M2 12h6M16 12h6"/>',
 'glitches': '<path d="M14.700 6.300a4 4 0 0 0-5.400 5.400L3 18l3 3 6.300-6.300a4 4 0 0 0 5.400-5.400l-2.600 2.600-2.400-.6-.6-2.400z"/>',
 'beginner': '<circle cx="12" cy="12" r="9"/><path d="m15.500 8.500-2 5-5 2 2-5z"/>',
 'ps5': '<rect x="3" y="7" width="18" height="11" rx="5"/><path d="M8 10v5M5.500 12.500h5M16 11.500h.01M18 14h.01"/>',
 'play': '<path d="M7 5v14l12-7z"/>', 'pause': '<path d="M7 5h3.500v14H7zM13.500 5H17v14h-3.500z"/>',
}
CATS = [('missions','Missions',14),('money','Money',9),('collectibles','Collectibles',11),('vehicles','Vehicles',16),
        ('weapons','Weapons',8),('glitches','Glitches & fixes',6),('beginner','Beginner tips',12),('ps5','PS5 settings',4)]
CL = {k:l for k,l,_ in CATS}
CROPS = {'missions':['boat','water'],'money':['cash','window'],'collectibles':['map'],'vehicles':['car'],'weapons':['window'],'glitches':['water'],'beginner':['palms'],'ps5':['skyline']}
TALL = {'missions':'boat','money':'cash','collectibles':'map','vehicles':'car','beginner':'palms','ps5':'skyline'}
LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'

def badge(kind, label=None):
    m = {'updated': ('badge--updated', 'clock', 'Updated 18 Nov 2026'), 'official': ('badge--official','check','Official source'),
         'rumour': ('badge--rumour','alert','Unverified'), 'new': ('badge--new', None, 'New')}
    if kind.startswith('spoiler'):
        lvl = kind.split('-')[1]; t = {'none':'Spoiler-free','minor':'Minor spoilers','major':'Major spoilers'}[lvl]
        return f'<span class="badge badge--spoiler badge--spoiler-{lvl}">{label or t}</span>'
    c, i, t = m[kind]
    return f'<span class="badge {c}">{svg(IC[i]) if i else ""}{label or t}</span>'

_n = {}
def card(cat, title, excerpt, bdg=('spoiler-none',), cls='', mins=6, href='mockup-guide.html', flip=False, eager=False):
    n = _n.get(cat, 0); _n[cat] = n+1
    opts = CROPS[cat]; crop = opts[n % len(opts)]
    fl = ' is-flip' if (flip or n % 2 == 1) else ''
    b = ''.join(f'<span class="guide-card__badge">{badge(x)}</span>' for x in bdg)
    return f'''<li class="guide-card cat-{cat}{fl}{(" "+cls) if cls else ""}" data-cat="{cat}">
  <div class="guide-card__media"><div class="guide-card__art"><img src="img/crop-{crop}.webp" width="640" height="400" alt="" loading="lazy" decoding="async"></div><span class="guide-card__chip chip">{CL[cat]}</span></div>
  <div class="guide-card__body">
    <h3 class="guide-card__title"><a class="guide-card__link" href="{href}">{title}</a></h3>
{('    <p class="guide-card__excerpt">'+excerpt+'</p>'+chr(10)) if excerpt else ""}    <div class="guide-card__meta"><span class="guide-card__cat">{CL[cat]}</span>{b}<span>{mins} min</span></div>
  </div>
</li>'''

def head(title, desc):
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} — Leonida Guides (unofficial fan site)</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#06050d">
<link rel="icon" href="favicon.svg" type="image/svg+xml"><link rel="icon" href="favicon.ico" sizes="48x48"><link rel="apple-touch-icon" href="apple-touch-icon-180.png"><link rel="manifest" href="site.webmanifest">
<meta property="og:image" content="og/og-default.png"><meta property="og:title" content="{title} — Leonida Guides"><meta property="og:description" content="{desc}">
<link rel="preload" href="fonts/Anton-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="fonts.css"><link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="components.css">
<noscript><style>.spoiler-toggle,.ticker__pause{{display:none}}</style></noscript>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<div class="disclaimer-bar"><div class="container"><p class="disclaimer-bar__text"><strong>{DISC}</strong></p></div></div>
'''

def header(current=None):
    links = ''.join(f'<li><a class="nav__link cat-{k}" href="mockup-hub.html"{" aria-current=\"page\"" if k==current else ""}>{ {"glitches":"Fixes"}.get(k,l) }</a></li>' for k,l,_ in CATS[:6])
    return f'''<header class="site-header">
  <div class="container site-header__inner">
    <a class="site-header__brand" href="mockup-home.html" aria-label="Leonida Guides — home">
      <img class="site-header__logo" src="logo/icon.svg" width="30" height="30" alt="">
      <span class="site-header__wordmark" aria-hidden="true">Leonida <span>Guides</span></span>
    </a>
    <nav class="nav" id="site-nav" aria-label="Primary"><ul class="nav__list">{links}<li><a class="nav__link cat-ps5" href="mockup-hub.html">More topics</a></li></ul></nav>
    <div class="site-header__actions">
      <button class="spoiler-toggle" type="button" role="switch" aria-checked="false" data-spoiler-toggle><span class="spoiler-toggle__track" aria-hidden="true"></span><span class="spoiler-toggle__label">Show all spoilers</span><span class="spoiler-toggle__state" data-spoiler-state>Off</span></button>
      <button class="icon-btn site-header__search-toggle" type="button" aria-label="Search" aria-expanded="false" aria-controls="search-panel">{svg(IC['search'],'')}</button>
      <a class="btn btn--cta btn--sm site-header__cta" href="mockup-collectibles.html">Checklists</a>
      <button class="icon-btn site-header__toggle" type="button" aria-label="Menu" aria-expanded="false" aria-controls="site-nav"><span class="icon-btn__open">{svg(IC['menu'],'')}</span><span class="icon-btn__close">{svg(IC['close'],'')}</span></button>
    </div>
    <div class="site-header__search search" role="search">
      <form class="search__form" action="mockup-search.html">
        {svg(IC['search'],'search__icon')}
        <input class="search__input" type="search" name="q" placeholder="Search guides…" aria-label="Search guides" autocomplete="off" aria-expanded="false" aria-controls="search-panel">
      </form>
      <div class="search__panel" id="search-panel" hidden>
        <p class="search__group-title label">Guides</p>
        <a class="search__result cat-money" href="mockup-guide.html"><span class="chip">Money</span><span class="search__result-title"><mark>Money</mark> Method #1</span><span class="search__result-excerpt">Lorem ipsum dolor sit amet, consectetur adipiscing.</span></a>
        <a class="search__result cat-money" href="mockup-guide.html"><span class="chip">Money</span><span class="search__result-title"><mark>Money</mark> Method #2</span><span class="search__result-excerpt">Sed do eiusmod tempor incididunt ut labore.</span></a>
        <a class="search__result cat-beginner" href="mockup-guide.html"><span class="chip">Beginner</span><span class="search__result-title">Beginner tips placeholder</span><span class="search__result-excerpt">Early <mark>money</mark> basics, lorem ipsum.</span></a>
        <p class="search__group-title label">Topics</p>
        <a class="search__result cat-money" href="mockup-hub.html"><span class="chip">Hub</span><span class="search__result-title">All <mark>Money</mark> guides</span></a>
        <p class="search__empty" hidden>No guides found. Try a shorter term.</p>
        <div class="search__footer"><span>↑↓ to navigate · Esc to close</span><a href="mockup-search.html">See all results</a></div>
      </div>
    </div>
  </div>
</header>
'''

def ticker():
    items = [('missions','New walkthrough','Mission walkthrough title placeholder','2h'),('money','Updated','Money Method #1: placeholder route','5h'),
             ('collectibles','Checklist','Collectibles tracker placeholder','1d'),('glitches','Fix','Download stuck: placeholder fix','1d'),
             ('vehicles','Guide','Fastest vehicles placeholder','2d'),('beginner','Tips','Beginner tips placeholder','3d')]
    def grp(hidden):
        a = ' aria-hidden="true"' if hidden else ''; t = ' tabindex="-1"' if hidden else ''
        return f'<ul class="ticker__group"{a}>' + ''.join(f'<li class="ticker__item cat-{c}"><a class="ticker__link" href="mockup-guide.html"{t}>{k}: {x}</a><span class="ticker__time">{w} ago</span></li>' for c,k,x,w in items) + '</ul>'
    return f'''<div class="ticker" role="region" aria-label="Latest updates">
  <span class="ticker__label">Live</span>
  <div class="ticker__viewport"><div class="ticker__track">{grp(False)}{grp(True)}</div></div>
  <button class="ticker__pause" type="button" aria-pressed="false" aria-label="Pause ticker" hidden>{svg(IC['pause'],'icon-pause')}{svg(IC['play'],'icon-play')}</button>
</div>
'''

def footer():
    return f'''<footer class="site-footer">
  <div class="container">
    <div class="site-footer__grid">
      <div class="site-footer__brand"><a class="site-footer__wordmark" href="mockup-home.html">Leonida <span>Guides</span></a>
        <p class="site-footer__about">Guides, tips and walkthroughs for the open-world crime series, written by fans. Every fact shows its source; rumours are labelled.</p></div>
      <nav aria-label="Guides"><h2 class="site-footer__title">Guides</h2><ul class="site-footer__list"><li><a class="site-footer__link" href="mockup-hub.html">Missions</a></li><li><a class="site-footer__link" href="mockup-hub.html">Money</a></li><li><a class="site-footer__link" href="mockup-hub.html">Collectibles</a></li><li><a class="site-footer__link" href="mockup-hub.html">Vehicles</a></li></ul></nav>
      <nav aria-label="Help"><h2 class="site-footer__title">Help</h2><ul class="site-footer__list"><li><a class="site-footer__link" href="mockup-hub.html">Beginner tips</a></li><li><a class="site-footer__link" href="mockup-hub.html">PS5 settings</a></li><li><a class="site-footer__link" href="mockup-hub.html">Glitches &amp; fixes</a></li></ul></nav>
      <nav aria-label="Site"><h2 class="site-footer__title">Site</h2><ul class="site-footer__list"><li><a class="site-footer__link" href="mockup-home.html">About</a></li><li><a class="site-footer__link" href="mockup-home.html">Sources &amp; corrections</a></li><li><a class="site-footer__link" href="mockup-home.html">Privacy</a></li></ul></nav>
    </div>
    <div class="site-footer__disclaimer"><p class="site-footer__disclaimer-strong">{DISC}</p>
      <p class="site-footer__legal">Leonida Guides is an independent fan project. All trademarks belong to their respective owners. This site is not endorsed by, directly affiliated with, or sponsored by Rockstar Games or Take-Two Interactive.</p></div>
  </div>
</footer>
<script src="ui.js" defer></script>
</body>
</html>
'''

def byline(compact=False, updated='18 Nov 2026'):
    return f'''<div class="byline{" byline--compact" if compact else ""}">
  <span class="byline__avatar"><img src="logo/icon.svg" width="30" height="30" alt="" loading="lazy"></span>
  <div class="byline__body"><span class="byline__author">By Leonida Guides Team</span>
  <p class="byline__dates"><span class="byline__updated">Updated <time datetime="2026-11-18">{updated}</time></span><span>Published <time datetime="2026-11-14">14 Nov 2026</time></span><span>6 min read</span></p></div>
</div>'''

def section(kicker, title, inner, link=None, last=False, cls=''):
    lk = f'<a class="section__link" href="mockup-hub.html">{link}</a>' if link else ''
    sid = title.lower().replace(' ','-')
    return f'''<section class="section{" section--last" if last else ""}{(" "+cls) if cls else ""}" aria-labelledby="{sid}">
  <div class="container">
    <div class="section__head"><div><span class="section__kicker">{kicker}</span><h2 class="section__title" id="{sid}">{title}</h2></div>{lk}</div>
{inner}
  </div>
</section>
'''

# ------------------------------------------------------------------ HOME
def home():
    wire_items = [('money','Money','Money Method #1: Placeholder Route','2h ago · 5 min'),('missions','Missions','Mission Walkthrough Title Placeholder','4h ago · 6 min'),
                  ('vehicles','Vehicles','Fastest Vehicles: Placeholder Ranking','7h ago · 4 min'),('collectibles','Collectibles','Collectibles Checklist Placeholder','1d ago · 9 min'),
                  ('glitches','Fixes','Download Stuck: Placeholder Fix','1d ago · 3 min'),('beginner','Beginner','Beginner Tips Placeholder','2d ago · 7 min')]
    wire = ''.join(f'<li class="wire__item cat-{c}"><div class="wire__body"><span class="wire__cat">{l}</span><a class="wire__link" href="mockup-guide.html">{t}</a><span class="wire__meta">{m}</span></div></li>' for c,l,t,m in wire_items)
    hero = f'''<div class="container hero-grid">
    <article class="hero-feature cat-missions" aria-labelledby="hero-title">
      <picture class="hero-feature__art"><source type="image/avif" srcset="img/hero-768.avif 768w, img/hero-1280.avif 1280w, img/hero-1920.avif 1920w" sizes="(min-width:64rem) 900px, 100vw"><source type="image/webp" srcset="img/hero-768.webp 768w, img/hero-1280.webp 1280w, img/hero-1920.webp 1920w" sizes="(min-width:64rem) 900px, 100vw"><img src="img/hero-768.webp" width="1920" height="1080" alt="" loading="eager" decoding="async" fetchpriority="high"></picture>
      <div class="hero-feature__shade" aria-hidden="true"></div>
      <div class="hero-feature__inner">
        <div class="hero-feature__tags"><a class="chip" href="mockup-hub.html" style="position:relative;z-index:2">Featured · Missions</a>{badge('updated')}{badge('spoiler-none')}</div>
        <h1 class="hero-feature__title" id="hero-title"><a href="mockup-guide.html">Mission walkthrough <em>title placeholder</em></a></h1>
        <p class="hero-feature__lede">{LOREM}</p>
        <div class="hero-feature__foot">{byline(True)}<div class="hero-feature__actions"><a class="btn btn--cta" href="mockup-guide.html">Read the guide</a><a class="btn btn--ghost" href="mockup-collectibles.html">Checklist</a></div></div>
      </div>
    </article>
    <aside class="wire" aria-labelledby="wire-title">
      <div class="wire__head"><h2 class="wire__title" id="wire-title">Latest</h2><span class="wire__live">Updated daily</span></div>
      <ol class="wire__list">{wire}</ol>
      <div class="wire__foot"><a class="section__link" href="mockup-hub.html">All guides</a></div>
    </aside>
  </div>
'''
    tr = [('money','Money Method #1: placeholder'),('missions','Mission walkthrough placeholder'),('vehicles','Fastest vehicles placeholder'),('collectibles','Collectibles tracker'),('glitches','Download stuck fix'),('beginner','Beginner tips placeholder')]
    trending = f'''<section class="trending" aria-labelledby="trending-title">
  <div class="container trending__inner">
    <h2 class="trending__title" id="trending-title">{svg(IC['flame'])}<span>Trending</span><span class="visually-hidden">now</span></h2>
    <ol class="trending__list">{''.join(f'<li class="trending__item cat-{c}"><span class="trending__rank">{i}</span><a class="trending__link" href="mockup-guide.html">{t}</a></li>' for i,(c,t) in enumerate(tr,1))}</ol>
  </div>
</section>
'''
    qa = '<ul class="quick-access__list">' + ''.join(f'<li class="quick-access__item cat-{k}"><span class="quick-access__icon">{svg(IC[k],"")}</span><a class="quick-access__link" href="mockup-hub.html">{l}</a><span class="quick-access__count">{n} guides</span></li>' for k,l,n in CATS) + '</ul>'
    pop = [('missions','Mission walkthrough title placeholder'),('money','Money Method #1 placeholder'),('collectibles','Collectibles checklist placeholder'),('vehicles','Fastest vehicles placeholder')]
    tiles = '<ul class="tile-row">' + ''.join(f'<li class="tile-row__item cat-{c}"><article class="tile"><div class="tile__art"><img src="img/tall-{TALL[c]}.webp" width="480" height="640" alt="" loading="lazy" decoding="async"></div><div class="tile__shade" aria-hidden="true"></div><span class="tile__rank">#{i}</span><div class="tile__body"><span class="tile__cat">{CL[c]}</span><h3 class="tile__title"><a class="tile__link" href="mockup-guide.html">{t}</a></h3></div></article></li>' for i,(c,t) in enumerate(pop,1)) + '</ul>'
    _n.clear()
    chips = '<div class="chip-row" role="group" aria-label="Filter guides" data-filter-group data-filter-scope="#latest-grid"><button class="chip chip--filter" type="button" data-filter="all" aria-pressed="true">All</button>' + ''.join(f'<button class="chip chip--filter" type="button" data-filter="{k}" aria-pressed="false">{l}</button>' for k,l,_ in CATS[:6]) + '</div>'
    cards = [card('money','Money Method #1: Placeholder Route',LOREM,('spoiler-none','updated'),'guide-card--feature',5),
             card('missions','Mission Walkthrough Placeholder','Sed do eiusmod tempor incididunt ut labore et dolore magna.',('spoiler-minor',)),
             card('vehicles','Fastest Vehicles: Placeholder','Ut enim ad minim veniam, quis nostrud exercitation.',('spoiler-none',),mins=4),
             card('collectibles','Collectibles Checklist','Duis aute irure dolor in reprehenderit in voluptate.',('spoiler-none','new'),mins=9),
             card('glitches','Download Stuck: Placeholder Fix','Excepteur sint occaecat cupidatat non proident.',('spoiler-none','official'),mins=3),
             card('beginner','Beginner Tips Placeholder','Sunt in culpa qui officia deserunt mollit anim.',('spoiler-none',),mins=7),
             card('missions','Another Mission Placeholder','Nemo enim ipsam voluptatem quia voluptas sit.',('spoiler-major',)),
             card('weapons','Weapons Overview Placeholder','Neque porro quisquam est qui dolorem ipsum.',('spoiler-none','rumour'),mins=5),
             card('ps5','PS5 Settings Placeholder','Quis autem vel eum iure reprehenderit qui in ea.',('spoiler-none',),mins=4)]
    latest = f'{chips}\n    <ul class="guide-grid" id="latest-grid">' + ''.join(cards) + '</ul>'
    marquee_words = ['Guides','Checklists','Maps','Fixes','Tips','Updated daily','Fan-made','Source-checked']
    def mg(h): return f'<ul class="marquee__group"{" aria-hidden=\"true\"" if h else ""}>' + ''.join(f'<li class="marquee__item">{w}</li>' for w in marquee_words) + '</ul>'
    marquee = f'<div class="marquee" aria-hidden="true"><div class="marquee__track">{mg(False)}{mg(True)}</div></div>\n'
    promo = f'''<section class="section section--last" aria-labelledby="promo-title"><div class="container"><div class="promo cat-collectibles">
  <div><h2 class="promo__title" id="promo-title">Track every collectible</h2><p class="promo__text">{LOREM} Progress is saved on your device only.</p></div>
  <div class="promo__actions"><a class="btn btn--cta" href="mockup-collectibles.html">Open the checklist</a><a class="btn btn--ghost" href="mockup-hub.html">Browse topics</a></div>
</div></div></section>
'''
    return (head('Home — guides, tips and walkthroughs', 'Placeholder description for the home page. Unofficial fan site.') + header() + ticker() + '<main id="main">\n' + hero + trending
      + section('Browse', 'Quick Access', '    '+qa) + section('Most read', 'Popular guides', '    '+tiles, 'All popular') + section('Fresh', 'Latest guides', '    '+latest, 'All guides') + marquee + promo + '</main>\n' + footer())

# ------------------------------------------------------------------ GUIDE
def guide():
    toc = [('overview','Overview'),('requirements','Requirements'),('steps','Step by step'),('rewards','Rewards'),('spoilers','Story details (spoilers)'),('faq','FAQ')]
    tocl = ''.join(f'<li class="toc__item"><a class="toc__link" href="#{i}">{t}</a></li>' for i,t in toc)
    _n.clear()
    rel = ''.join(card(c,t,'',('spoiler-none',),'guide-card--compact',mins=m) for c,t,m in [('missions','Next mission placeholder',6),('money','Money Method #2 placeholder',5),('vehicles','Vehicle tips placeholder',4)])
    steps = ''.join(f'<li class="step"><span class="step__num" aria-hidden="true"></span><div class="step__body"><h3 class="step__title">Step title placeholder {i}</h3><p>{LOREM}</p></div></li>' for i in (1,2,3))
    return head('Mission walkthrough title placeholder', 'Placeholder guide description. Unofficial fan site.') + header('missions') + '<div class="read-progress" aria-hidden="true"></div>\n<main id="main" class="cat-missions">\n' + f'''
<div class="container"><nav class="breadcrumbs" aria-label="Breadcrumb"><ol class="breadcrumbs__list"><li class="breadcrumbs__item"><a class="breadcrumbs__link" href="mockup-home.html">Home</a></li><li class="breadcrumbs__item"><a class="breadcrumbs__link" href="mockup-hub.html">Missions</a></li><li class="breadcrumbs__item" aria-current="page">Mission walkthrough placeholder</li></ol></nav></div>
<header class="article-head">
  <div class="container article-head__inner">
    <div class="article-head__tags"><a class="chip" href="mockup-hub.html">Missions</a>{badge('updated')}{badge('official')}{badge('spoiler-minor')}</div>
    <h1 class="article-head__title">Mission walkthrough title placeholder</h1>
    <p class="article-head__lede">{LOREM} Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
    {byline()}
  </div>
</header>
<div class="container guide-layout">
  <nav class="guide-layout__toc" aria-label="On this page"><details class="toc" data-collapsible data-toc open><summary class="toc__summary">On this page</summary><ol class="toc__list">{tocl}</ol></details></nav>
  <article class="guide-layout__main">
    <picture class="article__hero"><source type="image/avif" srcset="img/cat-missions-768.avif 768w, img/cat-missions-1280.avif 1280w" sizes="(min-width:64rem) 760px, 100vw"><source type="image/webp" srcset="img/cat-missions-768.webp 768w, img/cat-missions-1280.webp 1280w" sizes="(min-width:64rem) 760px, 100vw"><img src="img/cat-missions-768.webp" width="1280" height="720" alt="" fetchpriority="high" decoding="async"></picture>
    <div class="prose">
      <dl class="quick-facts"><div class="quick-facts__item"><dt>Type</dt><dd>Mission</dd></div><div class="quick-facts__item"><dt>Difficulty</dt><dd>Medium</dd></div><div class="quick-facts__item"><dt>Time</dt><dd>~20 min</dd></div><div class="quick-facts__item"><dt>Reward</dt><dd>Placeholder</dd></div></dl>
      <h2 id="overview">Overview</h2>
      <p>{LOREM} Ut enim ad minim veniam, quis nostrud <a href="mockup-hub.html">exercitation ullamco</a> laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
      <h2 id="requirements">Requirements</h2>
      <div class="callout callout--tip">{svg(IC['check'],'callout__icon')}<div><span class="callout__title">Tip placeholder</span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div></div>
      <ul><li>Requirement placeholder one</li><li>Requirement placeholder two</li><li>Requirement placeholder three</li></ul>
      <h2 id="steps">Step by step</h2>
      <ol class="steps">{steps}</ol>
      <h2 id="rewards">Rewards</h2>
      <div class="table-wrap" tabindex="0" role="region" aria-label="Rewards table"><table class="table"><thead><tr><th scope="col">Item</th><th scope="col">Amount</th><th scope="col">Notes</th></tr></thead><tbody><tr><th scope="row">Reward placeholder A</th><td>$0,000</td><td>Lorem ipsum</td></tr><tr><th scope="row">Reward placeholder B</th><td>000 XP</td><td>Dolor sit amet</td></tr><tr><th scope="row">Reward placeholder C</th><td>—</td><td>Consectetur</td></tr></tbody></table></div>
      <h2 id="spoilers">Story details (spoilers)</h2>
      <p class="spoiler-note">Sections like this stay closed until you tap them. Use “Show all spoilers” in the header to open every one.</p>
      <details class="spoiler" data-spoiler>
        <summary class="spoiler__summary"><span class="spoiler__head">{badge('spoiler-minor')}<span class="spoiler__label">Placeholder spoiler section A</span><span class="spoiler__hint"></span></span></summary>
        <div class="spoiler__body"><p>Placeholder text only. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p></div>
      </details>
      <details class="spoiler spoiler--major" data-spoiler>
        <summary class="spoiler__summary"><span class="spoiler__head">{badge('spoiler-major')}<span class="spoiler__label">Placeholder spoiler section B</span><span class="spoiler__hint"></span></span></summary>
        <div class="spoiler__body"><p>Placeholder text only. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p></div>
      </details>
      <h2 id="faq">FAQ</h2>
      <details class="faq"><summary class="faq__q">Question placeholder one?</summary><p class="faq__a">{LOREM}</p></details>
      <details class="faq"><summary class="faq__q">Question placeholder two?</summary><p class="faq__a">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></details>
    </div>
    <aside class="source-credit" aria-labelledby="src-title"><p class="source-credit__title" id="src-title">Sources</p><ul class="source-credit__list"><li class="source-credit__item"><a class="source-credit__link" href="mockup-home.html">Official source placeholder</a><span class="source-credit__date">checked 18 Nov 2026</span></li></ul><p class="source-credit__note">Image credit placeholder. {DISC}.</p></aside>
  </article>
  <aside class="guide-layout__aside" aria-label="Related">
    <div class="side-card"><h2 class="side-card__title">Related guides</h2><ul class="related">{rel}</ul></div>
    <div class="ad-slot ad-slot--rectangle" role="complementary" aria-label="Advertisement placeholder"><span class="ad-slot__label">Advertisement</span><span class="ad-slot__size">300 × 250</span></div>
  </aside>
</div>
</main>
''' + footer()

# ------------------------------------------------------------------ COLLECTIBLES
def collectibles():
    items = ''.join(f'<li class="checklist__item"><label class="checklist__label"><input class="checklist__input" type="checkbox"><span class="checklist__box" aria-hidden="true"></span><span class="checklist__text">Collectible placeholder {i:02d}<span class="checklist__meta">Area placeholder · Lorem ipsum dolor sit amet</span></span></label></li>' for i in range(1,9))
    shots = [('skyline','Skyline placeholder'),('boat','Boat placeholder'),('car','Car placeholder'),('map','Map placeholder'),('palms','Palms placeholder'),('cash','Cash placeholder')]
    gal = ''.join(f'<li class="gallery__item"><button class="gallery__open" type="button" data-full="img/crop-{k}.webp" data-caption="{c} — caption placeholder"><img src="img/crop-{k}.webp" width="640" height="400" alt="{c}" loading="lazy" decoding="async"></button><span class="gallery__caption">{c}<span class="gallery__credit">Image: Leonida Guides (own art)</span></span></li>' for k,c in shots)
    return head('Collectibles checklist placeholder','Placeholder collectibles checklist. Unofficial fan site.') + header('collectibles') + '<main id="main" class="cat-collectibles">\n' + f'''
<div class="container"><nav class="breadcrumbs" aria-label="Breadcrumb"><ol class="breadcrumbs__list"><li class="breadcrumbs__item"><a class="breadcrumbs__link" href="mockup-home.html">Home</a></li><li class="breadcrumbs__item"><a class="breadcrumbs__link" href="mockup-hub.html">Collectibles</a></li><li class="breadcrumbs__item" aria-current="page">Checklist placeholder</li></ol></nav></div>
<header class="article-head"><div class="container article-head__inner"><div class="article-head__tags"><a class="chip" href="mockup-hub.html">Collectibles</a>{badge('updated')}{badge('spoiler-none')}</div><h1 class="article-head__title">Collectibles checklist placeholder</h1><p class="article-head__lede">{LOREM}</p>{byline()}</div></header>
<div class="container" style="padding-block:var(--space-5) var(--space-section);display:grid;gap:var(--space-6);max-width:56rem">
  <section aria-labelledby="chk-title"><h2 id="chk-title" class="visually-hidden">Checklist</h2>
    <div class="progress-card" data-tracker-progress="collectibles-demo"><div class="progress-card__top"><span class="label">Progress</span><span class="progress-card__count" data-tracker-count>0 / 8</span><button class="btn btn--ghost btn--sm" type="button" data-tracker-reset>Reset</button></div><div class="progress-card__bar" role="progressbar" aria-label="Collectibles found" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span class="progress-card__fill"></span></div></div>
    <ul class="checklist" data-tracker="collectibles-demo">{items}</ul>
  </section>
  <section aria-labelledby="gal-title"><h2 id="gal-title" class="section__title" style="margin-bottom:var(--space-4)">Gallery</h2><ul class="gallery">{gal}</ul>
    <dialog class="lightbox" aria-label="Image viewer"><img class="lightbox__img" src="" alt=""><p class="lightbox__caption"></p><div class="lightbox__bar"><button class="btn btn--ghost btn--sm" type="button" data-lb-prev>Previous</button><button class="btn btn--ghost btn--sm" type="button" data-lb-next>Next</button><button class="btn btn--cta btn--sm" type="button" data-lb-close>Close</button></div></dialog></section>
  <section aria-labelledby="emb-title"><h2 id="emb-title" class="section__title" style="margin-bottom:var(--space-4)">From the community</h2>
    <figure class="embed-post" style="margin:0"><div class="embed-post__head"><span class="embed-post__avatar"><img src="logo/icon.svg" width="26" height="26" alt="" loading="lazy"></span><div><span class="embed-post__name">Account placeholder</span><span class="embed-post__handle">@placeholder</span></div></div><p class="embed-post__text">Placeholder post text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><div class="embed-post__meta"><span>18 Nov 2026</span><a href="mockup-home.html">View original post</a></div></figure></section>
</div>
</main>
''' + footer()

# ------------------------------------------------------------------ HUB / SEARCH
def hub():
    _n.clear()
    cs = [('money','Money Method #1: Placeholder Route',LOREM,('spoiler-none','updated'),5),('money','Money Method #2: Placeholder','Sed do eiusmod tempor incididunt.',('spoiler-none',),6),
          ('money','Money Method #3: Placeholder','Ut enim ad minim veniam, quis nostrud.',('spoiler-minor',),4),('money','Early-game money placeholder','Duis aute irure dolor in reprehenderit.',('spoiler-none','new'),7),
          ('money','Safe routes placeholder','Excepteur sint occaecat cupidatat.',('spoiler-none',),5),('money','Mistakes to avoid placeholder','Sunt in culpa qui officia deserunt.',('spoiler-none','rumour'),3)]
    cards = ''.join(card(c,t,e,b,mins=m,flip=(i%3==1)) for i,(c,t,e,b,m) in enumerate(cs))
    return head('Money guides','Placeholder hub. Unofficial fan site.') + header('money') + '<main id="main" class="cat-money">\n' + f'''
<div class="container"><nav class="breadcrumbs" aria-label="Breadcrumb"><ol class="breadcrumbs__list"><li class="breadcrumbs__item"><a class="breadcrumbs__link" href="mockup-home.html">Home</a></li><li class="breadcrumbs__item" aria-current="page">Money</li></ol></nav></div>
<header class="hub-header"><div class="hub-header__img" aria-hidden="true"><img src="img/crop-cash.webp" width="640" height="400" alt=""></div><div class="container hub-header__inner"><h1 class="hub-header__title">Money guides</h1><p class="hub-header__lede">{LOREM}</p></div></header>
<div class="container" style="padding-block:var(--space-5) var(--space-section)">
  <div class="hub-filters"><div class="chip-row" role="group" aria-label="Sort" data-filter-group data-filter-scope="#hub-grid"><button class="chip chip--filter" type="button" data-filter="all" aria-pressed="true">All</button><button class="chip chip--filter" type="button" data-filter="money" aria-pressed="false">Money</button></div><span class="label">6 guides</span></div>
  <ul class="guide-grid guide-grid--3" id="hub-grid">{cards}</ul>
  <ul class="pagination"><li><a class="pagination__link" href="#" aria-current="page">1</a></li><li><a class="pagination__link" href="#">2</a></li><li><a class="pagination__link" href="#">Next</a></li></ul>
</div>
</main>
''' + footer()

def search():
    res = ''.join(f'<li class="result cat-{c}"><div class="result__meta"><span class="chip">{CL[c]}</span>{badge("spoiler-none")}</div><h2 class="result__title"><a href="mockup-guide.html"><mark>Money</mark> placeholder result {i}</a></h2><p class="result__excerpt">{LOREM}</p><span class="result__url">example.com/guides/placeholder-{i}</span></li>' for i,c in enumerate(['money','missions','beginner','vehicles'],1))
    return head('Search results','Placeholder search. Unofficial fan site.') + header() + '<main id="main">\n' + f'''
<div class="container" style="padding-block:var(--space-6) var(--space-section);max-width:52rem"><h1>Results for “money”</h1><p class="label" style="margin:var(--space-3) 0 var(--space-5)">4 results</p><ul class="result-list">{res}</ul></div>
</main>
''' + footer()

for name, fn in (('home',home),('guide',guide),('collectibles',collectibles),('hub',hub),('search',search)):
    (D/f'mockup-{name}.html').write_text(fn()); print('mockup-%s.html' % name)
