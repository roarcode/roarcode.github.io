/* Leonida Guides — tiny progressive-enhancement script (~4 KB min, no deps). Pages work without it; it adds menu/search toggles,
   the spoiler switch, card filters, ToC scroll-spy, checklist progress, gallery lightbox, ticker pause and a read-progress bar. */
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = { get: k => { try { return localStorage.getItem(k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch {} } };

  // Mobile nav
  const toggle = $('.site-header__toggle'), nav = $('#site-nav');
  const setNav = open => { if (!toggle || !nav) return; toggle.setAttribute('aria-expanded', open); nav.classList.toggle('nav--open', open); };
  toggle?.addEventListener('click', () => setNav(toggle.getAttribute('aria-expanded') !== 'true'));

  // Search dropdown (all sizes) + naive client filter (swap for Pagefind in production)
  const sBtn = $('.site-header__search-toggle'), sBox = $('.site-header__search');
  const input = $('.search__input'), panel = $('.search__panel');
  const setSearch = open => { sBox?.classList.toggle('site-header__search--open', open); sBtn?.setAttribute('aria-expanded', open); if (open) input?.focus(); else showPanel(false); };
  const showPanel = on => { if (panel) panel.hidden = !on; input?.setAttribute('aria-expanded', on); };
  sBtn?.addEventListener('click', () => setSearch(!sBox.classList.contains('site-header__search--open')));
  input?.addEventListener('focus', () => showPanel(true));
  input?.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase(); let n = 0;
    $$('.search__result', panel).forEach(r => { const hit = !q || r.textContent.toLowerCase().includes(q); r.hidden = !hit; if (hit) n++; });
    const empty = $('.search__empty', panel); if (empty) empty.hidden = n > 0;
    showPanel(true);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { setSearch(false); setNav(false); }
    if (e.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); setSearch(true); }
  });
  document.addEventListener('click', e => { if (sBox?.classList.contains('site-header__search--open') && !e.target.closest('.site-header__search, .site-header__search-toggle')) setSearch(false); });

  // Page-level spoiler switch: opens/closes every details.spoiler, remembered in localStorage["lg-spoilers"]
  const KEY = 'lg-spoilers', sw = $('[data-spoiler-toggle]');
  const applySpoilers = on => {
    $$('details.spoiler').forEach(d => { d.open = on; });
    if (sw) { sw.setAttribute('aria-checked', on); const st = $('[data-spoiler-state]', sw); if (st) st.textContent = on ? 'On' : 'Off'; }
  };
  if (sw) { applySpoilers(store.get(KEY) === 'on'); sw.addEventListener('click', () => { const on = sw.getAttribute('aria-checked') !== 'true'; store.set(KEY, on ? 'on' : 'off'); applySpoilers(on); }); }

  // Card filters: [data-filter-group] buttons (data-filter="all|cat") control cards [data-cat] inside [data-filter-scope]
  $$('[data-filter-group]').forEach(g => g.addEventListener('click', e => {
    const c = e.target.closest('[data-filter]'); if (!c) return;
    $$('[data-filter]', g).forEach(x => x.setAttribute('aria-pressed', x === c));
    const scope = $(g.dataset.filterScope || '[data-filter-scope]') || document, f = c.dataset.filter;
    $$('[data-cat]', scope).forEach(card => { card.hidden = !(f === 'all' || card.dataset.cat === f); });
  }));

  // Collapsible ToC: open on desktop (sticky sidebar), collapsed on mobile
  const toc = $('.toc[data-collapsible]');
  if (toc && matchMedia('(max-width: 63.99rem)').matches) toc.removeAttribute('open');

  // ToC scroll-spy
  const links = $$('.toc a[href^="#"]');
  if (links.length && 'IntersectionObserver' in window) {
    const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { links.forEach(l => l.removeAttribute('aria-current')); map.get(e.target.id)?.setAttribute('aria-current', 'true'); }
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

  // Checklist trackers: [data-tracker="id"] list + [data-tracker-progress] card; progress saved per id
  $$('[data-tracker]').forEach(list => {
    const id = 'lg-track-' + list.dataset.tracker, boxes = $$('input[type=checkbox]', list);
    const card = $(`[data-tracker-progress="${list.dataset.tracker}"]`);
    let saved = []; try { saved = JSON.parse(store.get(id) || '[]'); } catch {}
    boxes.forEach((b, i) => { b.checked = saved.includes(i); });
    const render = () => {
      const done = boxes.filter(b => b.checked).length, pct = boxes.length ? Math.round(done / boxes.length * 100) : 0;
      store.set(id, JSON.stringify(boxes.flatMap((b, i) => b.checked ? [i] : [])));
      if (!card) return;
      const c = $('[data-tracker-count]', card), f = $('.progress-card__fill', card), bn = $('[role=progressbar]', card);
      if (c) c.textContent = `${done} / ${boxes.length}`; if (f) f.style.width = pct + '%'; if (bn) bn.setAttribute('aria-valuenow', pct);
    };
    list.addEventListener('change', render); render();
    $('[data-tracker-reset]', card || document)?.addEventListener('click', () => { boxes.forEach(b => { b.checked = false; }); render(); });
  });

  // Gallery lightbox (native <dialog>)
  const lb = $('.lightbox');
  if (lb) {
    const items = $$('.gallery__open'), img = $('.lightbox__img', lb), cap = $('.lightbox__caption', lb); let i = 0;
    const show = n => { i = (n + items.length) % items.length; const b = items[i], im = $('img', b); img.src = b.dataset.full || im.src; img.alt = im.alt; cap.textContent = b.dataset.caption || ''; };
    items.forEach((b, n) => b.addEventListener('click', () => { show(n); lb.showModal(); }));
    $('[data-lb-close]', lb)?.addEventListener('click', () => lb.close());
    $('[data-lb-prev]', lb)?.addEventListener('click', () => show(i - 1)); $('[data-lb-next]', lb)?.addEventListener('click', () => show(i + 1));
    lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1); });
  }

  // Ticker pause button (WCAG 2.2.2)
  const tk = $('.ticker'), pb = $('.ticker__pause', tk || document);
  if (pb) { pb.hidden = false; pb.addEventListener('click', () => { const p = tk.classList.toggle('ticker--paused'); pb.setAttribute('aria-pressed', p); pb.setAttribute('aria-label', p ? 'Play ticker' : 'Pause ticker'); }); }

  // Demo states for screenshots (#demo-menu, #demo-search)
  if (location.hash === '#demo-menu') setNav(true);
  if (location.hash === '#demo-search') { setSearch(true); if (input) { input.value = 'money'; input.dispatchEvent(new Event('input')); } }
})();
