"""Generates mockup-*.html (static HTML; Lead Engineer mirrors the markup/classes in Eleventy)."""
import json, pathlib
D = pathlib.Path(__file__).resolve().parent.parent
LQ = json.loads((D/'img/lqip.json').read_text())
DISC = 'Unofficial fan site — not affiliated with Rockstar Games'
ICON = {
 'search': '<svg class="search__icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
 'search-btn': '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
 'menu': '<svg class="icon-btn__open" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg><svg class="icon-btn__close" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
 'check': '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>',
 'alert': '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8v5M12 17h.01"/><path d="M10.3 4.2 2.8 17.5A2 2 0 0 0 4.5 20.5h15a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0z"/></svg>',
 'clock': '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
 'bulb': '<svg class="callout__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg>',
 'warn': '<svg class="callout__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8v5M12 17h.01"/><path d="M10.3 4.2 2.8 17.5A2 2 0 0 0 4.5 20.5h15a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0z"/></svg>',
}
CATS = [('missions','Missions',14),('money','Money',9),('collectibles','Collectibles',11),('vehicles','Vehicles',16),
        ('weapons','Weapons',8),('glitches','Glitches & fixes',6),('beginner','Beginner tips',12),('ps5','PS5 settings',4)]
CATLABEL = {k:l for k,l,_ in CATS}
NAVL = {'glitches':'Fixes','collectibles':'Collectibles'}
IMGCAT = {'missions','money','vehicles','collectibles'}

def picture(name, sizes, widths, alt='', cls='', loading='lazy', eager=False, w=None, h=None):
    w = w or max(widths); h = h or round(w*9/16)
    src = lambda ext: ', '.join(f'img/{name}-{x}.{ext} {x}w' for x in sorted(widths))
    lo = 'eager' if eager else 'lazy'
    pri = ' fetchpriority="high"' if eager else ''
    return (f'<picture{(" class=%s" % chr(34)+cls+chr(34)) if cls else ""}><source type="image/avif" srcset="{src("avif")}" sizes="{sizes}">'
            f'<source type="image/webp" srcset="{src("webp")}" sizes="{sizes}">'
            f'<img src="img/{name}-{min(widths)}.webp" width="{w}" height="{h}" alt="{alt}" loading="{lo}" decoding="async"{pri}></picture>')

def chip(cat, text=None):
    return f'<a class="chip cat-{cat}" href="#">{text or CATLABEL[cat]}</a>'
def badge(kind):
    return {'updated': f'<span class="badge badge--updated">{ICON["clock"]}Updated 18 Nov 2026</span>',
            'official': f'<span class="badge badge--official">{ICON["check"]}Official source</span>',
            'rumour': f'<span class="badge badge--rumour">{ICON["alert"]}Unverified</span>',
            'new': '<span class="badge badge--new">New</span>'}[kind]

def card(cat, title, excerpt, bdg, featured=False, img=True, eager=False):
    media = ''
    if cat in IMGCAT and img:
        sizes = '(min-width:48rem) 50vw, 100vw' if featured else '(min-width:64rem) 380px, (min-width:40rem) 50vw, 100vw'
        media = f'<div class="guide-card__media">{picture("cat-"+cat, sizes, [640,1280], "", loading="lazy", w=1280, h=720)}<span class="guide-card__chip chip cat-{cat}">{CATLABEL[cat]}</span></div>'
    else:
        media = f'<div class="guide-card__media guide-card__media--placeholder"><span class="guide-card__chip chip cat-{cat}">{CATLABEL[cat]}</span></div>'
    return f'''<li class="guide-card cat-{cat}{' guide-card--featured' if featured else ''}">
  {media}
  <div class="guide-card__body">
    <h3 class="guide-card__title"><a class="guide-card__link" href="mockup-guide.html">{title}</a></h3>
    <p class="guide-card__excerpt">{excerpt}</p>
    <div class="guide-card__meta"><span class="guide-card__badge">{badge(bdg[0])}</span>{('<span class="guide-card__badge">'+badge(bdg[1])+'</span>') if len(bdg)>1 else ''}<span class="mono">6 min</span></div>
  </div>
</li>'''

LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'

def head(title, desc, extra_css=''):
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} — Leonida Guides (unofficial fan site)</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#07060c">
<link rel="icon" href="favicon.svg" type="image/svg+xml"><link rel="icon" href="favicon.ico" sizes="48x48"><link rel="apple-touch-icon" href="apple-touch-icon-180.png"><link rel="manifest" href="site.webmanifest">
<meta property="og:image" content="og/og-default.png"><meta property="og:title" content="{title} — Leonida Guides"><meta property="og:description" content="{desc}">
<link rel="preload" href="fonts/Inter-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/Syne-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="fonts.css"><link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="components.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<div class="disclaimer-bar"><div class="container"><p class="disclaimer-bar__text"><strong>{DISC}</strong></p></div></div>
'''

def header(current=None):
    links = ''.join(f'<li><a class="nav__link cat-{k}" href="mockup-hub.html"{" aria-current=\"page\"" if k==current else ""}>{NAVL.get(k,l)}</a></li>' for k,l,_ in CATS[:6])
    return f'''<header class="site-header">
  <div class="container site-header__inner">
    <a class="site-header__brand" href="mockup-home.html" aria-label="Leonida Guides — home">
      <img class="site-header__logo site-header__logo--icon" src="logo/icon.svg" width="34" height="34" alt="">
      <img class="site-header__logo site-header__logo--wordmark" src="logo/wordmark-horizontal.svg" width="190" height="44" alt="Leonida Guides">
    </a>
    <nav class="nav" id="site-nav" aria-label="Primary"><ul class="nav__list">{links}<li><a class="nav__link cat-ps5" href="mockup-hub.html">More</a></li></ul></nav>
    <div class="site-header__actions">
      <button class="icon-btn site-header__search-toggle" type="button" aria-label="Search" aria-expanded="false">{ICON['search-btn']}</button>
      <button class="icon-btn site-header__toggle" type="button" aria-label="Menu" aria-expanded="false" aria-controls="site-nav">{ICON['menu']}</button>
    </div>
    <div class="site-header__search search" role="search">
      <form class="search__form" action="mockup-search.html">
        {ICON['search']}
        <input class="search__input" type="search" name="q" placeholder="Search guides…" aria-label="Search guides" autocomplete="off" aria-expanded="false" aria-controls="search-panel">
        <kbd class="search__kbd">/</kbd>
      </form>
      <div class="search__panel" id="search-panel" hidden>
        <p class="search__group-title label">Guides</p>
        <a class="search__result cat-money" href="mockup-guide.html"><span class="chip">Money</span><span class="search__result-title"><mark>Money</mark> Method #1</span><span class="search__result-excerpt">Lorem ipsum dolor sit amet, consectetur adipiscing.</span></a>
        <a class="search__result cat-money" href="mockup-guide.html"><span class="chip">Money</span><span class="search__result-title"><mark>Money</mark> Method #2</span><span class="search__result-excerpt">Sed do eiusmod tempor incididunt ut labore.</span></a>
        <a class="search__result cat-beginner" href="mockup-guide.html"><span class="chip">Beginner</span><span class="search__result-title">Beginner tips placeholder</span><span class="search__result-excerpt">Early <mark>money</mark> basics, lorem ipsum.</span></a>
        <p class="search__group-title label">Categories</p>
        <a class="search__result cat-money" href="mockup-hub.html"><span class="chip">Hub</span><span class="search__result-title">All <mark>Money</mark> guides</span></a>
        <p class="search__empty" hidden>No guides found. Try a shorter term.</p>
        <div class="search__footer"><span>↑↓ to navigate · Esc to close</span><a href="mockup-search.html">See all results</a></div>
      </div>
    </div>
  </div>
</header>
'''

def footer():
    return f'''<footer class="site-footer">
  <div class="container">
    <div class="site-footer__grid">
      <div class="site-footer__brand"><img src="logo/wordmark-stacked.svg" width="190" height="95" alt="Leonida Guides" loading="lazy">
        <p class="site-footer__about">Guides, tips and walkthroughs for the open-world crime series, written by fans. Every fact shows its source; rumours are labelled.</p></div>
      <nav aria-label="Guides"><h2 class="site-footer__title">Guides</h2><ul class="site-footer__list"><li><a class="site-footer__link" href="#">Missions</a></li><li><a class="site-footer__link" href="#">Money</a></li><li><a class="site-footer__link" href="#">Collectibles</a></li><li><a class="site-footer__link" href="#">Vehicles</a></li></ul></nav>
      <nav aria-label="Help"><h2 class="site-footer__title">Help</h2><ul class="site-footer__list"><li><a class="site-footer__link" href="#">Beginner tips</a></li><li><a class="site-footer__link" href="#">PS5 settings</a></li><li><a class="site-footer__link" href="#">Glitches &amp; fixes</a></li></ul></nav>
      <nav aria-label="Site"><h2 class="site-footer__title">Site</h2><ul class="site-footer__list"><li><a class="site-footer__link" href="#">About &amp; sources policy</a></li><li><a class="site-footer__link" href="#">Corrections</a></li><li><a class="site-footer__link" href="#">Privacy</a></li><li><a class="site-footer__link" href="#">Contact</a></li></ul></nav>
    </div>
    <div class="site-footer__disclaimer">
      <p class="site-footer__disclaimer-strong">{DISC}</p>
      <p class="site-footer__legal">This is an independent fan project. It is not endorsed by, sponsored by or connected to Rockstar Games or Take-Two Interactive. Grand Theft Auto and related names and marks are trademarks of their respective owners and are used here only to identify the subject of our guides. Screenshots are credited to their sources.</p>
      <p class="site-footer__legal">© 2026 Leonida Guides. Original design and text.</p>
    </div>
  </div>
</footer>
<script src="ui.js" defer></script>
</body></html>
'''

def ad(kind='rectangle', size='300×250'):
    return f'<aside class="ad-slot ad-slot--{kind}" aria-label="Advertisement"><span class="ad-slot__label">Advertisement</span><span class="ad-slot__size">{size} · reserved space</span></aside>'

# ============================ HOME ============================
cards = [
 card('missions','Mission Walkthrough Title Placeholder', LOREM, ['updated','official'], featured=True),
 card('money','Money Method #1', LOREM, ['updated','rumour']),
 card('vehicles','Vehicle Guide: Example Sports Car', LOREM, ['official']),
 card('collectibles','Collectible Set A: Location Checklist', LOREM, ['updated']),
 card('beginner','Beginner Tips Placeholder', LOREM, ['official']),
 card('ps5','PS5 Settings Placeholder', LOREM, ['updated','official']),
]
tiles = ''.join(f'''<li class="category-tile cat-{k}"><span class="category-tile__glyph"></span><h3 class="category-tile__title"><a class="category-tile__link" href="mockup-hub.html">{l}</a></h3><span class="category-tile__count">{n:02d} guides</span></li>''' for k,l,n in CATS)
compact = ''.join(card(c,t,'', [b]).replace('guide-card cat-','guide-card guide-card--compact cat-',1) for c,t,b in
   [('money','Money Method #2','updated'),('vehicles','Vehicle Guide: Example Muscle Car','updated'),('glitches','Glitch Fix Placeholder','rumour'),('weapons','Weapon Guide Placeholder','official')])
hero_pic = picture('hero','100vw',[768,1280,1920],'', eager=True, w=1920, h=1080)
home = head('Unofficial GTA VI guides: missions, money, collectibles, cars','Fan-made guides for missions, money methods, collectibles, vehicles and fixes. Sources credited, rumours labelled.') + header() + f'''
<main id="main">
  <section class="hero" aria-labelledby="hero-title" style="background-color:{LQ['hero']['color']}">
    <div class="hero__art" aria-hidden="true"></div>
    {hero_pic.replace('<picture','<picture class="hero__img" aria-hidden="true"',1)}
    <div class="hero__shade" aria-hidden="true"></div>
    <div class="container hero__content">
      <span class="hero__kicker label" style="color:var(--brand-cyan)">Unofficial fan guides</span>
      <h1 class="hero__title" id="hero-title">Every guide, <em>from day one.</em></h1>
      <p class="hero__lede">Missions, money methods, collectibles, cars and fixes. Sources credited, rumours clearly labelled.</p>
      <div class="hero__actions"><a class="btn btn--primary" href="mockup-hub.html">Browse all guides</a><a class="btn btn--ghost" href="#labels">How we label facts</a></div>
      <p class="hero__note">{DISC}</p>
    </div>
  </section>

  <section class="section container" aria-labelledby="cats-title">
    <div class="section__head"><div><span class="section__kicker label">Browse</span><h2 class="section__title" id="cats-title">Pick a category</h2></div></div>
    <ul class="category-grid">{tiles}</ul>
  </section>

  <section class="section container" aria-labelledby="latest-title">
    <div class="section__head"><div><span class="section__kicker label">Fresh &amp; updated</span><h2 class="section__title" id="latest-title">Latest guides</h2></div><a class="section__more" href="mockup-hub.html">View all →</a></div>
    <ul class="guide-grid">{''.join(cards)}</ul>
    {ad('rectangle')}
  </section>

  <section class="section container" id="labels" aria-labelledby="label-title">
    <div class="section__head"><div><span class="section__kicker label">Trust</span><h2 class="section__title" id="label-title">How we label facts</h2></div></div>
    <div class="guide-grid">
      <div class="side-card"><p class="side-card__title">Official source</p><p>{badge('official')}</p><p style="margin-top:.75rem">Confirmed by official publisher material or a reputable preview, with the source linked.</p></div>
      <div class="side-card"><p class="side-card__title">Unverified</p><p>{badge('rumour')}</p><p style="margin-top:.75rem">Rumours, leaks and single-source claims. Shown with a dashed amber badge until confirmed.</p></div>
      <div class="side-card"><p class="side-card__title">Last updated</p><p>{badge('updated')}</p><p style="margin-top:.75rem">Every guide shows when it was last checked, so you know whether it still works.</p></div>
    </div>
  </section>

  <section class="section container" aria-labelledby="upd-title">
    <div class="section__head"><div><span class="section__kicker label">Changelog</span><h2 class="section__title" id="upd-title">Recently updated</h2></div></div>
    <ul class="guide-grid">{compact}</ul>
  </section>
</main>
''' + footer()
(D/'mockup-home.html').write_text(home)

# ============================ GUIDE ============================
toc_items = [('overview','Overview'),('before','Before you start'),('steps','Step-by-step'),('map','Map &amp; locations'),('rewards','Rewards &amp; tips'),('faq','FAQ'),('sources','Sources')]
toc = ''.join(f'<li class="toc__item"><a class="toc__link" href="#{i}">{t}</a></li>' for i,t in toc_items)
steps = ''.join(f'''<li class="step"><span class="step__num" aria-hidden="true"></span><div class="step__body"><h3 class="step__title">Step title placeholder {n}</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p></div></li>''' for n in range(1,5))
pins = [('mission',34,40,'missions'),('mission',62,28,'missions'),('collect',48,66,'collectibles'),('collect',24,58,'collectibles'),('car',72,62,'vehicles'),('money',82,36,'money')]
pin_html = ''.join(f'<span class="map-embed__pin cat-{c}" data-pin-type="{t}" style="left:{x}%;top:{y}%"></span>' for t,x,y,c in pins)
guide = head('Mission Walkthrough Title Placeholder','Placeholder walkthrough used to demonstrate the guide page layout: table of contents, steps, map block and source credits.') + header('missions') + f'''
<main id="main" class="cat-missions">
  <div class="container">
    <nav class="breadcrumbs" aria-label="Breadcrumb"><ol class="breadcrumbs__list"><li class="breadcrumbs__item"><a class="breadcrumbs__link" href="mockup-home.html">Home</a></li><li class="breadcrumbs__item"><a class="breadcrumbs__link" href="mockup-hub.html">Missions</a></li><li class="breadcrumbs__item" aria-current="page">Mission Walkthrough Title Placeholder</li></ol></nav>
    <header class="article__header" style="margin-top:1.25rem">
      <div class="chip-row"><a class="chip cat-missions" href="mockup-hub.html">Missions</a>{badge('official')}{badge('rumour')}</div>
      <h1 class="article__title">Mission Walkthrough Title Placeholder</h1>
      <p class="article__lede">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <div class="article__meta">{badge('updated')}<span>By the Leonida Guides team</span><span aria-hidden="true">·</span><span>6 min read</span></div>
    </header>
    <div class="guide-layout">
      <div class="guide-layout__toc"><details class="toc" data-collapsible open><summary class="toc__summary">On this page</summary><ol class="toc__list">{toc}</ol></details></div>
      <article class="guide-layout__main">
        <div class="prose">
          <h2 id="overview" style="margin-top:0;border-top:0;padding-top:0">Overview</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</p>
          <dl class="quick-facts"><div class="quick-facts__item"><dt>Difficulty</dt><dd>Placeholder</dd></div><div class="quick-facts__item"><dt>Reward</dt><dd>Placeholder</dd></div><div class="quick-facts__item"><dt>Time</dt><dd>~10 min</dd></div><div class="quick-facts__item"><dt>Platform</dt><dd>PS5 · Xbox</dd></div></dl>
          <h2 id="before">Before you start</h2>
          <div class="callout callout--tip">{ICON['bulb']}<div><span class="callout__title">Tip placeholder</span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Keep tips short and actionable.</div></div>
          <ul><li>Requirement placeholder one</li><li>Requirement placeholder two</li><li>Requirement placeholder three</li></ul>
          <h2 id="steps">Step-by-step</h2>
          <ol class="steps">{steps}</ol>
          <figure><div class="media-placeholder">Screenshot placeholder · 16:9</div><figcaption>Caption placeholder. Credit: source name (link).</figcaption></figure>
        </div>
        {ad('rectangle')}
        <div class="prose">
          <h2 id="map">Map &amp; locations</h2>
          <p>Use the filters to show or hide each marker type. Interactive map embed placeholder.</p>
        </div>
        <section class="map-embed" aria-label="Interactive map placeholder">
          <div class="map-embed__toolbar">
            <p class="map-embed__title"><span>Map · placeholder</span><span>6 markers</span></p>
            <div class="chip-row chip-row--scroll" role="group" aria-label="Map filters">
              <button class="chip chip--filter cat-missions" type="button" aria-pressed="true" data-map-filter="mission">Missions</button>
              <button class="chip chip--filter cat-collectibles" type="button" aria-pressed="true" data-map-filter="collect">Collectibles</button>
              <button class="chip chip--filter cat-vehicles" type="button" aria-pressed="true" data-map-filter="car">Vehicles</button>
              <button class="chip chip--filter cat-money" type="button" aria-pressed="true" data-map-filter="money">Money</button>
            </div>
          </div>
          <div class="map-embed__frame">
            <div class="map-embed__grid"></div>
            <svg class="map-embed__shape" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M8 62 C10 40 22 30 34 34 C44 18 62 12 74 22 C90 24 94 44 88 58 C92 74 76 90 58 86 C44 94 20 88 8 62Z"/></svg>
            {pin_html}
            <div class="map-embed__cta"><span>Interactive map loads here (lazy, on tap).</span><a class="btn btn--sm btn--primary" href="#">Open full map</a></div>
          </div>
          <div class="map-embed__legend"><span class="map-embed__legend-item cat-missions">Mission</span><span class="map-embed__legend-item cat-collectibles">Collectible</span><span class="map-embed__legend-item cat-vehicles">Vehicle</span><span class="map-embed__legend-item cat-money">Cash</span></div>
        </section>
        <div class="prose">
          <h2 id="rewards">Rewards &amp; tips</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. {badge('rumour')} <span style="color:var(--text-2)">Claim placeholder that is not yet confirmed.</span></p>
          <div class="callout callout--warning">{ICON['warn']}<div><span class="callout__title">Unconfirmed information</span>Items marked “Unverified” come from a single non-official source and may change.</div></div>
          <h2 id="faq">FAQ</h2>
          <div>
            <details class="faq"><summary class="faq__q">Question placeholder one?</summary><p class="faq__a">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></details>
            <details class="faq"><summary class="faq__q">Question placeholder two?</summary><p class="faq__a">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></details>
            <details class="faq"><summary class="faq__q">Question placeholder three?</summary><p class="faq__a">Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p></details>
          </div>
        </div>
        <section class="source-credit" id="sources" aria-labelledby="src-title">
          <h2 class="source-credit__title" id="src-title">Sources &amp; credits</h2>
          <ul class="source-credit__list">
            <li class="source-credit__item">{badge('official')}<a class="source-credit__link" href="#">Publisher newswire post (placeholder title)</a><span class="source-credit__date">Accessed 18 Nov 2026</span></li>
            <li class="source-credit__item">{badge('rumour')}<a class="source-credit__link" href="#">Community forum thread (placeholder)</a><span class="source-credit__date">Accessed 18 Nov 2026</span></li>
            <li class="source-credit__item"><span class="badge">Image</span><a class="source-credit__link" href="#">Screenshot credit: creator name (placeholder)</a></li>
          </ul>
          <p class="source-credit__note">Spotted a mistake? <a href="#">Send a correction</a>. Our text is original; we link and credit everything we reference.</p>
        </section>
      </article>
      <aside class="guide-layout__aside" aria-label="Sidebar">
        {ad('sidebar','300×600')}
        <div class="side-card"><p class="side-card__title">Related guides</p><ul class="side-list"><li><a class="side-list__link" href="#">Money Method #1 <span>6 min</span></a></li><li><a class="side-list__link" href="#">Beginner Tips Placeholder <span>4 min</span></a></li><li><a class="side-list__link" href="#">PS5 Settings Placeholder <span>3 min</span></a></li></ul></div>
      </aside>
    </div>
  </div>
</main>
''' + footer()
(D/'mockup-guide.html').write_text(guide)

# ============================ HUB ============================
hub_cards = ''.join(card('money', f'Money Method #{i}', LOREM, ['updated','rumour'] if i%3==0 else (['official'] if i%2 else ['updated'])) for i in range(1,7))
hub = head('Money guides','Placeholder category hub for Money guides: filters, sorting and a guide grid.') + header('money') + f'''
<main id="main" class="cat-money">
  <section class="hub-header">
    {picture('cat-money','100vw',[640,1280],'',cls='hub-header__img',eager=True,w=1280,h=720)}
    <div class="container hub-header__inner">
      <nav class="breadcrumbs" aria-label="Breadcrumb" style="padding:0"><ol class="breadcrumbs__list"><li class="breadcrumbs__item"><a class="breadcrumbs__link" href="mockup-home.html">Home</a></li><li class="breadcrumbs__item" aria-current="page">Money</li></ol></nav>
      <h1 class="hub-header__title">Money</h1>
      <p class="hub-header__lede">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Every method lists what it needs, what it pays and when we last checked it.</p>
    </div>
  </section>
  <div class="container">
    <div class="hub-toolbar">
      <div class="chip-row chip-row--scroll" role="group" aria-label="Filter" data-filter-group>
        <button class="chip chip--filter" type="button" aria-pressed="true">All</button>
        <button class="chip chip--filter" type="button" aria-pressed="false">Beginner</button>
        <button class="chip chip--filter" type="button" aria-pressed="false">Mid game</button>
        <button class="chip chip--filter" type="button" aria-pressed="false">Late game</button>
        <button class="chip chip--filter" type="button" aria-pressed="false">Official only</button>
      </div>
      <label class="mono" for="sort">Sort <select class="select" id="sort"><option>Recently updated</option><option>Newest</option><option>A–Z</option></select></label>
    </div>
    <div class="hub-layout">
      <div>
        <ul class="guide-grid">{hub_cards}</ul>
        <ul class="pagination"><li><a class="pagination__link" href="#" aria-current="page">1</a></li><li><a class="pagination__link" href="#">2</a></li><li><a class="pagination__link" href="#">3</a></li><li><a class="pagination__link" href="#" aria-label="Next page">→</a></li></ul>
      </div>
      <aside aria-label="Sidebar" style="display:grid;gap:1rem;align-content:start">
        <div class="side-card"><p class="side-card__title">All categories</p><ul class="side-list">{''.join(f'<li><a class="side-list__link cat-{k}" href="#">{l}<span>{n:02d}</span></a></li>' for k,l,n in CATS)}</ul></div>
        {ad('rectangle')}
      </aside>
    </div>
  </div>
</main>
''' + footer()
(D/'mockup-hub.html').write_text(hub)

# ============================ SEARCH RESULTS ============================
res = ''.join(f'''<li class="result cat-{c}"><div class="result__meta"><span class="chip">{CATLABEL[c]}</span>{badge(b)}</div><h2 class="result__title"><a href="mockup-guide.html">{t}</a></h2><p class="result__excerpt">{e}</p><span class="result__url">leonidaguides.example/{c}/{t.lower().replace(' ','-').replace('#','')}</span></li>'''
  for c,t,e,b in [('money','<mark>Money</mark> Method #1','Lorem ipsum dolor sit amet, early <mark>money</mark> consectetur adipiscing elit.','updated'),
                  ('money','<mark>Money</mark> Method #2','Sed do eiusmod tempor incididunt ut labore, et dolore <mark>money</mark> magna.','rumour'),
                  ('beginner','Beginner Tips Placeholder','Ut enim ad minim veniam, <mark>money</mark> basics quis nostrud exercitation.','official'),
                  ('collectibles','Collectible Set A: Location Checklist','Duis aute irure dolor in reprehenderit, bonus <mark>money</mark> rewards.','updated')])
search = head('Search results for “money”','Placeholder search results page.') + header() + f'''
<main id="main" class="container" style="padding-block:2rem 0">
  <h1 style="font-size:var(--fs-700)">Results for “<span style="color:var(--brand-yellow)">money</span>”</h1>
  <p class="mono" style="margin-top:.75rem">4 results</p>
  <div class="chip-row chip-row--scroll" style="margin-top:1.25rem" data-filter-group role="group" aria-label="Filter by category">
    <button class="chip chip--filter" type="button" aria-pressed="true">All 4</button>
    <button class="chip chip--filter cat-money" type="button" aria-pressed="false">Money 2</button>
    <button class="chip chip--filter cat-beginner" type="button" aria-pressed="false">Beginner 1</button>
    <button class="chip chip--filter cat-collectibles" type="button" aria-pressed="false">Collectibles 1</button>
  </div>
  <ul class="result-list" style="margin-top:1.5rem;max-width:48rem">{res}</ul>
  <p style="margin-top:2rem;color:var(--text-3)">Nothing found? Try a shorter term or <a href="mockup-hub.html">browse categories</a>.</p>
</main>
''' + footer()
(D/'mockup-search.html').write_text(search)
print('pages ok')

# ============================ ARTICLE ASSETS CONTACT SHEET ============================
A = D/'article-assets'
def imgs(folder, pat='*.svg', h=64, skip=''):
    out = ''
    for f in sorted((A/folder).glob(pat)):
        if skip and skip in f.name: continue
        out += f'<figure class="sheet__item"><img src="{folder}/{f.name}" alt="" style="height:{h}px;width:auto"><figcaption>{f.stem}</figcaption></figure>'
    return out
sheet = head('Article assets','Contact sheet').replace('href="fonts.css"','href="../fonts.css"').replace('href="tokens.css"','href="../tokens.css"').replace('href="components.css"','href="../components.css"').replace('href="favicon','href="../favicon').replace('href="apple','href="../apple').replace('href="site.web','href="../site.web').replace('href="fonts/','href="../fonts/').replace('content="og/','content="../og/')
sheet = sheet.split('<a class="skip-link"')[0] + f'''<style>.sheet{{display:flex;flex-wrap:wrap;gap:1rem;list-style:none;padding:0}}.sheet__item{{margin:0;display:grid;justify-items:center;gap:.4rem;padding:.75rem;background:var(--bg-2);border:1px solid var(--line-1);border-radius:var(--radius-md);min-width:5.5rem}}.sheet__item figcaption{{font:var(--fs-100)/1.2 var(--font-mono);color:var(--text-3)}}.sheet__item--wide img{{height:auto!important;width:100%!important}}.sheet__grid{{display:grid;gap:1rem;grid-template-columns:repeat(auto-fill,minmax(20rem,1fr))}}.demo{{background:var(--bg-2);border:1px solid var(--line-1);border-radius:var(--radius-md);padding:1rem 1.25rem;color:var(--text-1);font-size:var(--fs-400)}}body{{padding-bottom:4rem}}h2{{margin:3rem 0 1rem}}</style>
</head><body><div class="disclaimer-bar"><div class="container"><p class="disclaimer-bar__text"><strong>{DISC}</strong></p></div></div>
<main class="container" style="padding-top:2rem"><h1>Article asset kit</h1><p style="margin-top:.75rem;max-width:44rem">Original SVGs built from the design tokens. Neutral controller glyphs: no console-maker logos or wordmarks. See README.md for usage.</p>
<h2>CSS components</h2>
<div class="demo"><p><span class="step-badge step-badge--sm">1</span> <span class="step-badge">2</span> <span class="step-badge step-badge--solid">3</span> <span class="step-badge step-badge--solid step-badge--lg">4</span></p>
<p style="margin-top:1rem">Hold <kbd class="kbd-btn">R2</kbd> and press <kbd class="kbd-btn kbd-btn--round">A</kbd>, then <kbd class="kbd-btn">LT</kbd> + <kbd class="kbd-btn kbd-btn--key">E</kbd> · icon style: Hold <img class="kbd-icon" src="buttons/ps-r2.svg" alt="R2"> then <img class="kbd-icon" src="buttons/ps-cross.svg" alt="Cross"> or <img class="kbd-icon" src="buttons/xbox-a.svg" alt="A">.</p>
<ul class="legend"><li class="legend-item cat-missions">Mission</li><li class="legend-item cat-money">Money</li><li class="legend-item cat-collectibles">Collectible</li><li class="legend-item cat-vehicles">Vehicle</li><li class="legend-item cat-weapons">Weapon</li><li class="legend-item legend-item--danger">Danger</li><li class="legend-item legend-item--start">Start</li><li class="legend-item legend-item--finish">Finish</li></ul>
<div class="do-dont"><div class="do-dont__col do-dont__col--do"><p class="do-dont__title">DO</p><ul class="do-dont__list"><li>Do this first</li><li>Then do this</li></ul></div><div class="do-dont__col do-dont__col--dont"><p class="do-dont__title">DON'T</p><ul class="do-dont__list"><li>Skip this step</li><li>Avoid this</li></ul></div></div></div>
<h2>steps/ (step-NN.svg · step-NN-solid.svg)</h2><ul class="sheet">{imgs('steps','step-*.svg',56)}</ul>
<h2>pins/</h2><ul class="sheet">{imgs('pins','pin-*.svg',72)}</ul><ul class="sheet">{imgs('pins','legend-*.svg',28)}</ul>
<h2>buttons/ — PlayStation-style (generic)</h2><ul class="sheet">{imgs('buttons','ps-*.svg',56)}</ul>
<h2>buttons/ — Xbox-style (generic)</h2><ul class="sheet">{imgs('buttons','xbox-*.svg',56)}</ul>
<h2>buttons/ — shared</h2><ul class="sheet">{imgs('buttons','dpad*.svg',56)}{imgs('buttons','stick-*.svg',56)}</ul>
<h2>diagrams/ (png/diagrams/*.png are sample renders)</h2><div class="sheet__grid">{''.join(f'<figure class="sheet__item sheet__item--wide"><img src="png/diagrams/{f.stem}.png" alt="{f.stem} sample"><figcaption>{f.stem}</figcaption></figure>' for f in sorted((A/'diagrams').glob('*.svg')))}</div>
</main><script src="../ui.js" defer></script></body></html>'''
(A/'index.html').write_text(sheet)
print('sheet ok')
