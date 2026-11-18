/* Leonida Guides — progressive-enhancement script (Designer kit v2 design/ui.js, trimmed + wired to this site).
   Pages work without it: ticker/marquee are CSS, ToC/spoilers/FAQ are <details>, filters stay hidden, the spoiler switch is hidden by <noscript>.
   Adds: mobile menu, header search dropdown, page-level spoiler switch (localStorage "lg-spoilers"), card filters,
   ToC collapse on phones + scroll-spy, read-progress bar, ticker pause. */
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = { get: (k) => { try { return localStorage.getItem(k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch {} } };

  // Mobile menu (below 64rem the category nav is an overlay opened by the hamburger)
  const toggle = $('.site-header__toggle'), nav = $('#site-nav');
  const setNav = (open) => {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
    nav.classList.toggle('nav--open', open);
  };
  toggle?.addEventListener('click', () => setNav(toggle.getAttribute('aria-expanded') !== 'true'));
  nav?.addEventListener('click', (e) => { if (e.target.closest('a')) setNav(false); });
  matchMedia('(min-width: 64rem)').addEventListener?.('change', (m) => { if (m.matches) setNav(false); });

  // Search dropdown (all sizes). It is a plain GET form to /search/?q=… ; the search page runs Pagefind.
  const sBtn = $('.site-header__search-toggle'), sBox = $('.site-header__search'), input = $('.search__input');
  const setSearch = (open) => { sBox?.classList.toggle('site-header__search--open', open); sBtn?.setAttribute('aria-expanded', open); if (open) input?.focus(); };
  sBtn?.addEventListener('click', () => setSearch(!sBox.classList.contains('site-header__search--open')));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const wasNav = nav?.classList.contains('nav--open');
      setSearch(false); setNav(false);
      if (wasNav) toggle?.focus();
    }
    if (e.key === '/' && !e.metaKey && !e.ctrlKey && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); setSearch(true); }
  });
  document.addEventListener('click', (e) => { if (sBox?.classList.contains('site-header__search--open') && !e.target.closest('.site-header__search, .site-header__search-toggle')) setSearch(false); });

  // Page-level spoiler switch: opens/closes every details.spoiler. Preference: localStorage["lg-spoilers"] = "on" | "off" (default off).
  // With OFF the blocks keep their authored (collapsed) state; embeds inside a closed spoiler do not load (src/js/x-embed.js).
  const KEY = 'lg-spoilers', sw = $('[data-spoiler-toggle]'), state = sw && $('[data-spoiler-state]', sw);
  const isOn = () => store.get(KEY) === 'on';
  const applySpoilers = (on) => {
    $$('details.spoiler').forEach((d) => { d.open = on; });
    if (sw) { sw.setAttribute('aria-checked', on); if (state) state.textContent = on ? 'On' : 'Off'; }
    document.documentElement.setAttribute('data-spoilers', on ? 'shown' : 'hidden');
  };
  if (sw) {
    if (isOn()) applySpoilers(true); else document.documentElement.setAttribute('data-spoilers', 'hidden');
    sw.addEventListener('click', () => { const on = sw.getAttribute('aria-checked') !== 'true'; store.set(KEY, on ? 'on' : 'off'); applySpoilers(on); });
    addEventListener('storage', (e) => { if (e.key === KEY) applySpoilers(isOn()); });
  }

  // Card filters: [data-filter-group] buttons (data-filter="all|slug") control cards [data-cat] inside [data-filter-scope]. Hidden without JS.
  $$('[data-filter-group]').forEach((g) => {
    g.hidden = false;
    g.addEventListener('click', (e) => {
      const c = e.target.closest('[data-filter]'); if (!c) return;
      $$('[data-filter]', g).forEach((x) => x.setAttribute('aria-pressed', x === c));
      const scope = $(g.dataset.filterScope || '[data-filter-scope]') || document, f = c.dataset.filter;
      $$('[data-cat]', scope).forEach((card) => { card.hidden = !(f === 'all' || card.dataset.cat === f); });
    });
  });

  // ToC: open on desktop (sticky sidebar), collapsed on phones/tablets (compact sticky bar)
  const toc = $('.toc[data-collapsible]');
  if (toc && matchMedia('(max-width: 63.99rem)').matches) toc.removeAttribute('open');
  // Close the compact ToC after a jump on phones/tablets so it doesn't cover the heading
  $$('.toc a[href^="#"]').forEach((a) => a.addEventListener('click', () => { if (matchMedia('(max-width: 63.99rem)').matches) a.closest('details.toc')?.removeAttribute('open'); }));

  // ToC scroll-spy
  const links = $$('.toc a[href^="#"]');
  if (links.length && 'IntersectionObserver' in window) {
    const map = new Map(links.map((a) => [decodeURIComponent(a.getAttribute('href').slice(1)), a]));
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { links.forEach((l) => l.removeAttribute('aria-current')); map.get(e.target.id)?.setAttribute('aria-current', 'true'); }
    }), { rootMargin: '-20% 0px -70% 0px' });
    map.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    links[0].setAttribute('aria-current', 'true');
  }

  // Read-progress bar
  const bar = $('.read-progress'), art = $('.guide-layout__main');
  if (bar && art) {
    let tick = false;
    const upd = () => { const r = art.getBoundingClientRect(), t = Math.min(1, Math.max(0, (innerHeight - r.top) / (r.height + innerHeight * .2))); bar.style.setProperty('--p', t.toFixed(3)); tick = false; };
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true }); upd();
  }

  // Ticker pause button (WCAG 2.2.2)
  const tk = $('.ticker'), pb = tk && $('.ticker__pause', tk);
  if (pb) { pb.hidden = false; pb.addEventListener('click', () => { const p = tk.classList.toggle('ticker--paused'); pb.setAttribute('aria-pressed', p); pb.setAttribute('aria-label', p ? 'Play ticker' : 'Pause ticker'); }); }
})();
