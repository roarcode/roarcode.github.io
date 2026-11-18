/* Leonida Guides — tiny progressive-enhancement script (~2 KB, no deps). Everything works without it except menu/search toggles. */
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Mobile nav
  const toggle = $('.site-header__toggle'), nav = $('#site-nav');
  const setNav = open => { if (!toggle || !nav) return; toggle.setAttribute('aria-expanded', open); nav.classList.toggle('nav--open', open); };
  toggle?.addEventListener('click', () => setNav(toggle.getAttribute('aria-expanded') !== 'true'));

  // Search: mobile toggle + dropdown + naive client filter (swap for Pagefind in production)
  const sBtn = $('.site-header__search-toggle'), sBox = $('.site-header__search');
  const input = $('.search__input'), panel = $('.search__panel');
  const setSearch = open => { sBox?.classList.toggle('site-header__search--open', open); sBtn?.setAttribute('aria-expanded', open); if (open) input?.focus(); };
  sBtn?.addEventListener('click', () => setSearch(!sBox.classList.contains('site-header__search--open')));
  const showPanel = on => { if (panel) panel.hidden = !on; input?.setAttribute('aria-expanded', on); };
  input?.addEventListener('focus', () => showPanel(true));
  input?.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase(); let n = 0;
    $$('.search__result', panel).forEach(r => { const hit = !q || r.textContent.toLowerCase().includes(q); r.hidden = !hit; if (hit) n++; });
    const empty = $('.search__empty', panel); if (empty) empty.hidden = n > 0;
    showPanel(true);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { showPanel(false); setNav(false); }
    if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); if (window.innerWidth < 1024) setSearch(true); else input?.focus(); }
  });
  document.addEventListener('click', e => { if (panel && !e.target.closest('.search')) showPanel(false); });

  // Collapsible ToC: open on desktop (sticky sidebar), collapsed on mobile
  const toc = $('.toc[data-collapsible]');
  if (toc && window.matchMedia('(max-width: 63.99rem)').matches) toc.removeAttribute('open');

  // ToC scroll-spy
  const links = $$('.toc__link');
  if (links.length && 'IntersectionObserver' in window) {
    const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { links.forEach(l => l.removeAttribute('aria-current')); map.get(e.target.id)?.setAttribute('aria-current', 'true'); }
    }), { rootMargin: '-20% 0px -70% 0px' });
    map.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    links[0].setAttribute('aria-current', 'true');
  }

  // Map filter chips toggle pins by data-pin-type
  $$('[data-map-filter]').forEach(chip => chip.addEventListener('click', () => {
    const on = chip.getAttribute('aria-pressed') !== 'true'; chip.setAttribute('aria-pressed', on);
    $$(`.map-embed__pin[data-pin-type="${chip.dataset.mapFilter}"]`).forEach(p => p.hidden = !on);
  }));
  // Generic single-select filter chips (hub pages)
  $$('[data-filter-group]').forEach(g => g.addEventListener('click', e => {
    const c = e.target.closest('.chip--filter'); if (!c) return;
    $$('.chip--filter', g).forEach(x => x.setAttribute('aria-pressed', x === c));
  }));

  // Demo states for screenshots (#demo-menu, #demo-search)
  if (location.hash === '#demo-menu') setNav(true);
  if (location.hash === '#demo-search') { setSearch(true); if (input) { input.value = 'money'; input.dispatchEvent(new Event('input')); } }
})();
