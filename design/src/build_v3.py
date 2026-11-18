import html
HEAD='''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} — Leonida Guides (unofficial fan site)</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#0b0b0f">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preload" href="fonts/Newsreader-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/Inter-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="fonts-v3.css"><link rel="stylesheet" href="tokens-v3.css"><link rel="stylesheet" href="components-v3.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<div class="disclaimer"><div class="container"><p><strong>Unofficial fan site. Not affiliated with Rockstar Games or Take-Two Interactive.</strong></p></div></div>
<header class="site-header">
  <div class="container site-header__inner">
    <a class="wordmark" href="mockup-home-v3.html" aria-label="Leonida Guides — home">Leonida <span>Guides</span></a>
    <nav class="nav" aria-label="Guides"><ul class="nav__list">
      <li><a href="#"{cur0}>Launch hub</a></li><li><a href="#">Missions</a></li><li><a href="#">Money</a></li><li><a href="#">Collectibles</a></li><li><a href="#">Cars</a></li><li><a href="#">Fixes</a></li>
    </ul></nav>
    <div class="site-header__tools"><a class="textbtn" href="#">Search</a><button class="textbtn" type="button" aria-pressed="false" data-spoilers>Spoilers: hidden</button></div>
    <details class="menu"><summary>Menu</summary><div class="menu__panel"><ul>
      <li><a href="#">Launch hub</a></li><li><a href="#">Missions</a></li><li><a href="#">Money</a></li><li><a href="#">Collectibles</a></li><li><a href="#">Cars</a></li><li><a href="#">Fixes</a></li><li><a href="#">Search</a></li><li><button class="textbtn" type="button" aria-pressed="false" data-spoilers>Spoilers: hidden</button></li>
    </ul></div></details>
  </div>
</header>
<main id="main">
'''
FOOT='''</main>
<footer class="site-footer">
  <div class="container">
    <div class="site-footer__grid">
      <div><a class="wordmark" href="mockup-home-v3.html">Leonida <span>Guides</span></a><p class="site-footer__about">Unofficial GTA VI guides, written by fans. Every guide names its sources and shows when it was last updated.</p></div>
      <div class="site-footer__cols">
        <nav aria-label="Guides"><h2>Guides</h2><ul><li><a href="#">Launch hub</a></li><li><a href="#">Missions</a></li><li><a href="#">Money</a></li><li><a href="#">Collectibles</a></li><li><a href="#">Cars</a></li><li><a href="#">Fixes</a></li><li><a href="#">Beginner tips</a></li><li><a href="#">Leaks and rumours</a></li></ul></nav>
        <nav aria-label="Site"><h2>Site</h2><ul><li><a href="#">About and disclaimer</a></li><li><a href="#">Search</a></li><li><a href="#">Atom feed</a></li><li><a href="#">Sitemap</a></li></ul></nav>
      </div>
    </div>
    <div class="site-footer__legal"><p><strong>Unofficial fan site. Not affiliated with Rockstar Games or Take-Two Interactive.</strong></p><p>Grand Theft Auto and GTA VI are trademarks of Take-Two Interactive Software, Inc. Placeholder text in this mockup.</p><p>Site last updated 18 Nov 2026 · © 2026 Leonida Guides</p></div>
  </div>
</footer>
<script>if(matchMedia('(min-width:64rem)').matches){var t=document.querySelector('details.toc');if(t)t.open=true}document.querySelectorAll('[data-spoilers]').forEach(function(b){b.addEventListener('click',function(){var on=b.getAttribute('aria-pressed')!=='true';document.querySelectorAll('[data-spoilers]').forEach(function(x){x.setAttribute('aria-pressed',on);x.textContent='Spoilers: '+(on?'shown':'hidden')});document.querySelectorAll('details.spoiler').forEach(function(d){d.open=on})})});</script>
</body>
</html>
'''
T=[('Launch hub','Placeholder headline for a lead guide, long enough to wrap to two lines','Fixes','Placeholder guide headline, two lines at most'),]
imgs=['crop-water','crop-palms','crop-skyline','crop-window','crop-boat','crop-car','crop-map','crop-cash']
def card(i,cat,title,date,mins,img):
    return f'''<li class="grid__item"><a class="card" href="mockup-guide-v3.html"><img class="card__img" src="img/{img}.webp" width="640" height="400" alt="" loading="lazy" decoding="async"><span class="card__body"><span class="meta"><span>{cat}</span><span>{date}</span><span>{mins} min</span></span><h3 class="card__title">{title}</h3></span></a></li>'''
grid=[('Launch hub','Placeholder guide headline, up to three lines at card width','18 Nov 2026',3,'crop-palms'),
('Fixes','Placeholder headline for a fix or troubleshooting guide','18 Nov 2026',4,'crop-window'),
('Launch hub','Placeholder headline for a setup guide, short','17 Nov 2026',2,'crop-water'),
('Collectibles','Placeholder headline for a checklist guide','17 Nov 2026',6,'crop-map')]
rows=[('18 Nov 2026','Placeholder headline for a guide, one line or two on narrow screens','Launch hub · 2 min',''),
('18 Nov 2026','Placeholder headline for another guide in the list','Fixes · 4 min',''),
('18 Nov 2026','Placeholder headline for a guide with a spoiler note','Launch hub · 3 min · Minor spoilers',''),
('17 Nov 2026','Placeholder headline for a comparison guide','Launch hub · 6 min',''),
('17 Nov 2026','Placeholder headline for a how-to guide','Beginner tips · 3 min',''),
('16 Nov 2026','Placeholder headline for a reference guide','Launch hub · 5 min',''),
('16 Nov 2026','Placeholder headline for a platform guide','Fixes · 4 min',''),
('15 Nov 2026','Placeholder headline for a short update','Launch hub · 2 min','')]
cats=[('Launch hub',23),('Missions','Soon'),('Money','Soon'),('Collectibles',1),('Cars','Soon'),('Fixes',8),('Beginner tips',1),('Leaks and rumours','Soon')]
home=HEAD.format(title='Placeholder home',desc='Placeholder description. Unofficial fan site.',cur0='')
home+='''<div class="container">
  <section class="intro" aria-labelledby="h1">
    <h1 id="h1">Every GTA VI guide, <em>sourced</em> and kept current.</h1>
    <p class="intro__dek">Placeholder dek: one plain sentence on what the site is and how often it changes.</p>
    <a class="intro__link" href="#">Placeholder call to action, a plain text link</a>
  </section>

  <a class="lead" href="mockup-guide-v3.html">
    <picture><source type="image/webp" srcset="img/hero-768.webp 768w, img/hero-1280.webp 1280w" sizes="(min-width:76rem) 1216px, 100vw"><img class="lead__img" src="img/hero-768.webp" width="1280" height="720" alt="" fetchpriority="high" decoding="async"></picture>
    <span class="lead__text"><span class="meta"><span>Launch hub</span><span>18 Nov 2026</span><span>2 min</span></span><h2 class="lead__title">Placeholder headline for the lead guide, set in the display serif</h2><span class="lead__dek">Placeholder dek, one line.</span></span>
  </a>

  <ul class="grid">
'''
for c,t,d,m,i in grid: home+='    '+card(0,c,t,d,m,i)+'\n'
home+='''  </ul>

  <section class="section" aria-labelledby="latest">
    <div class="section__head"><span class="section__num">01</span><h2 class="section__title" id="latest">Latest guides</h2><a class="section__more" href="#">All guides</a></div>
    <ol class="rows">
'''
for d,t,n,_ in rows: home+=f'      <li class="rows__item"><span class="meta"><span>{d}</span></span><h3 class="rows__title"><a href="mockup-guide-v3.html">{t}</a></h3><span class="rows__note">{n}</span></li>\n'
home+='''    </ol>
  </section>

  <section class="section" aria-labelledby="browse">
    <div class="section__head"><span class="section__num">02</span><h2 class="section__title" id="browse">Browse by topic</h2></div>
    <ul class="index">
'''
for n,c in cats: home+=f'      <li><a href="#">{n} <span>{c if c=="Soon" else str(c)}</span></a></li>\n'
home+='''    </ul>
  </section>
</div>
'''+FOOT
open('mockup-home-v3.html','w').write(home)

guide=HEAD.format(title='Placeholder guide title',desc='Placeholder guide description. Unofficial fan site.',cur0=' aria-current="page"')
guide+='''<div class="container container--read">
  <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="mockup-home-v3.html">Guides</a></li><li><a href="#">Launch hub</a></li><li aria-current="page">Placeholder guide title</li></ol></nav>

  <article>
    <header class="article-head">
      <p class="meta"><a href="#">Launch hub</a><span>Updated 18 Nov 2026</span><span>10 min</span></p>
      <h1>Placeholder guide title, set large in the display serif</h1>
      <p class="article-head__dek">Placeholder dek: one line that says what the reader gets.</p>
      <p class="byline">By <strong>Leonida Guides Team</strong> · Written with AI help and checked against the cited sources. <a href="#">How we work</a></p>
      <p class="spoiler-line"><strong>Spoilers: none.</strong> <span>Safe to read before you play.</span></p>
    </header>

    <figure class="article-figure"><picture><source type="image/webp" srcset="img/hero-768.webp 768w, img/hero-1280.webp 1280w" sizes="(min-width:76rem) 1216px, 100vw"><img src="img/hero-768.webp" width="1280" height="720" alt="" decoding="async"></picture><figcaption>Placeholder caption. Image credit goes here.</figcaption></figure>

    <div class="article-layout">
      <details class="toc"><summary>On this page</summary>
        <ol><li><a href="#s1">Placeholder section one</a></li><li><a href="#s2">Placeholder section two</a></li><li><a href="#s3">Placeholder section three</a></li><li><a href="#s4">Placeholder section four</a></li><li><a href="#s5">Frequently asked questions</a></li></ol>
      </details>

      <div class="article-layout__main">
        <div class="answer"><p class="answer__label">Quick answer</p><p>Placeholder quick answer in one or two sentences, with the one fact most readers came for.</p></div>

        <div class="prose" style="margin-top:var(--space-5)">
          <p>Placeholder paragraph one. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <a href="#">A placeholder link</a> sits inside the sentence.</p>
          <p>Placeholder paragraph two. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <strong>Bold text</strong> carries the key term.</p>

          <h2 id="s1">Placeholder section one</h2>
          <p>Placeholder paragraph. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <ul><li>Placeholder list item one</li><li>Placeholder list item two</li><li>Placeholder list item three</li></ul>

          <h2 id="s2">Placeholder section two</h2>
          <p>Placeholder paragraph before a table. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.</p>
          <div class="table-wrap"><table class="table"><thead><tr><th>#</th><th>Column A</th><th>Column B</th><th>Status</th></tr></thead><tbody>
            <tr><td>1</td><td>Placeholder A1</td><td>Placeholder B1</td><td>Confirmed</td></tr>
            <tr><td>2</td><td>Placeholder A2</td><td>Placeholder B2</td><td>Calculated</td></tr>
            <tr><td>3</td><td>Placeholder A3</td><td>Placeholder B3</td><td>Sources disagree</td></tr></tbody></table></div>

          <h2 id="s3">Placeholder section three</h2>
          <p>Placeholder paragraph. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
          <details class="spoiler"><summary><span><strong>Spoiler.</strong>Placeholder topic. Click to reveal.</span></summary><div><p>Placeholder hidden text, shown only after the reader opens the block.</p></div></details>

          <h2 id="s4">Placeholder section four</h2>
          <blockquote>Placeholder pull quote or official statement, set in the display serif.</blockquote>
          <p>Placeholder paragraph. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>

          <h2 id="s5">Frequently asked questions</h2>
          <div><details class="faq"><summary><span>Placeholder question one?</span></summary><div><p>Placeholder answer one.</p></div></details><details class="faq"><summary><span>Placeholder question two?</span></summary><div><p>Placeholder answer two.</p></div></details><details class="faq"><summary><span>Placeholder question three?</span></summary><div><p>Placeholder answer three.</p></div></details></div>
        </div>

        <section class="sources" aria-labelledby="src"><h2 id="src">Sources</h2><ul>
          <li><span>Official</span><span><a href="#">Placeholder official source title</a> — Publisher</span></li>
          <li><span>Press</span><span><a href="#">Placeholder press source title</a> — Publisher</span></li>
          <li><span>Community</span><span><a href="#">Placeholder community source title</a></span></li></ul>
          <p class="note">Credit goes to the original creators and publishers. Spotted a mistake? Tell us on the <a href="#">About page</a>.</p></section>

        <section class="section" aria-labelledby="more"><div class="section__head"><h2 class="section__title" id="more">More in Launch hub</h2></div>
          <ol class="rows">
            <li class="rows__item"><span class="meta"><span>18 Nov 2026</span></span><h3 class="rows__title"><a href="#">Placeholder related guide headline one</a></h3><span class="rows__note">2 min</span></li>
            <li class="rows__item"><span class="meta"><span>17 Nov 2026</span></span><h3 class="rows__title"><a href="#">Placeholder related guide headline two</a></h3><span class="rows__note">3 min</span></li>
            <li class="rows__item"><span class="meta"><span>17 Nov 2026</span></span><h3 class="rows__title"><a href="#">Placeholder related guide headline three</a></h3><span class="rows__note">5 min</span></li>
          </ol></section>
      </div>
    </div>
  </article>
</div>
'''+FOOT
open('mockup-guide-v3.html','w').write(guide)
