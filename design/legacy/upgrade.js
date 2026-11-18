/* upgrade.js — GENERATED from ui.js by src/build_upgrade_bundle.py (do not edit). Dependency-free, progressive enhancement. */
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  // <upgrade> (generated into upgrade.js by src/build_upgrade_bundle.py — keep this block self-contained)
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = () => matchMedia('(max-width: 63.99rem)').matches;
  const raf = fn => { let t = 0; return () => { if (!t) t = requestAnimationFrame(() => { t = 0; fn(); }); }; };

  // ToC: open on desktop (sticky sidebar), collapsed on mobile (sticky bar). Scroll-spy + current-section label.
  const toc = $('.toc[data-collapsible], details[data-toc]');
  if (toc && isMobile()) toc.removeAttribute('open');
  const links = $$('.toc__link, .toc__item a');
  if (links.length) {
    const heads = links.map(a => document.getElementById(decodeURIComponent(a.hash.slice(1)))).map((h, i) => [h, links[i]]).filter(p => p[0]);
    const cur = $('.toc__current');
    const spy = () => {
      const off = parseFloat(getComputedStyle(document.documentElement).fontSize) * 3.5 + (isMobile() ? 64 : 24) + 16;
      let hit = heads[0];
      heads.forEach(p => { if (p[0].getBoundingClientRect().top <= off) hit = p; });
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) hit = heads[heads.length - 1];
      links.forEach(l => l.removeAttribute('aria-current')); hit[1].setAttribute('aria-current', 'true');
      if (cur) cur.textContent = hit[1].textContent;
    };
    const onScroll = raf(spy); addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); spy();
    links.forEach(l => l.addEventListener('click', () => { if (isMobile()) toc?.removeAttribute('open'); }));
  }

  // Reading progress bar (injected into the sticky header on guide pages)
  const article = $('.guide-layout__main, .article__main'), header = $('.site-header');
  if (article && header) {
    const rp = document.createElement('div'); rp.className = 'read-progress'; rp.setAttribute('aria-hidden', 'true'); rp.innerHTML = '<span class="read-progress__bar"></span>'; header.appendChild(rp);
    const upd = raf(() => { const r = article.getBoundingClientRect(), t = r.height - innerHeight * .6; rp.style.setProperty('--read', Math.max(0, Math.min(1, -r.top / Math.max(t, 1))).toFixed(3)); });
    addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
  }

  // Collectible checklists: checkbox state saved in localStorage (key lg:tracker:<data-tracker>)
  const store = { get: k => { try { return JSON.parse(localStorage.getItem(k) || '[]'); } catch { return []; } }, set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode */ } } };
  const lists = $$('[data-tracker]');
  const summary = $('[data-tracker-summary]');
  const sumUpdate = () => {
    if (!summary) return;
    const all = $$('.checklist__input', document), n = all.filter(i => i.checked).length, p = all.length ? Math.round(n / all.length * 100) : 0;
    $('[data-sum-count]', summary).textContent = `${n} / ${all.length}`; $('[data-sum-pct]', summary).textContent = p + '%'; $('.progress-card__ring', summary).style.setProperty('--p', p);
  };
  lists.forEach(cl => {
    const key = 'lg:tracker:' + cl.dataset.tracker, boxes = $$('.checklist__input', cl);
    const bar = $('.checklist__bar-fill', cl), barBox = $('.checklist__bar', cl), stat = $('[data-count]', cl), live = $('.checklist__live', cl), empty = $('.checklist__empty', cl);
    const load = () => { const s = new Set(store.get(key)); boxes.forEach(b => { b.checked = s.has(b.value); }); };
    const render = () => {
      const n = boxes.filter(b => b.checked).length, p = boxes.length ? Math.round(n / boxes.length * 100) : 0;
      boxes.forEach(b => b.closest('.checklist__item').classList.toggle('is-done', b.checked));
      bar?.style.setProperty('--p', p); barBox?.setAttribute('aria-valuenow', p); if (stat) stat.textContent = n + ' / ' + boxes.length;
      $$('.checklist__group', cl).forEach(g => {
        const gb = $$('.checklist__input', g), gc = $('[data-group-count]', g); if (gc) gc.textContent = gb.filter(b => b.checked).length + '/' + gb.length;
        const f = cl.dataset.filter; g.hidden = (f === 'todo' && gb.every(b => b.checked)) || (f === 'done' && !gb.some(b => b.checked));
      });
      if (empty) empty.hidden = $$('.checklist__group:not([hidden])', cl).length > 0;
      if (live) live.textContent = `${n} of ${boxes.length} done`;
      sumUpdate();
    };
    const save = () => store.set(key, boxes.filter(b => b.checked).map(b => b.value));
    cl.addEventListener('change', e => { if (e.target.matches('.checklist__input')) { save(); render(); } });
    const reset = $('[data-tracker-reset]', cl);
    let tm; reset?.addEventListener('click', () => {
      if (reset.dataset.confirm === 'true') { clearTimeout(tm); reset.dataset.confirm = 'false'; reset.textContent = 'Reset'; boxes.forEach(b => { b.checked = false; }); save(); render(); return; }
      reset.dataset.confirm = 'true'; reset.textContent = 'Tap again to reset'; tm = setTimeout(() => { reset.dataset.confirm = 'false'; reset.textContent = 'Reset'; }, 3500);
    });
    addEventListener('storage', e => { if (e.key === key) { load(); render(); } });
    cl.dataset.filter = cl.dataset.filter || 'all'; cl.__render = render; load(); render();
  });
  $$('[data-tracker-filter]').forEach(g => g.addEventListener('click', e => {
    const c = e.target.closest('[data-value]'); if (!c) return;
    $$('[data-value]', g).forEach(x => x.setAttribute('aria-pressed', x === c));
    lists.forEach(cl => { cl.dataset.filter = c.dataset.value; cl.__render(); });
  }));

  // Galleries: prev/next buttons + counter (CSS scroll-snap does the work), lightbox on click
  $$('[data-gallery]').forEach(g => {
    const track = $('.gallery__track', g), items = $$('.gallery__item', g), count = $('.gallery__count', g);
    const idx = () => Math.max(0, Math.min(items.length - 1, Math.round(track.scrollLeft / (items[0].getBoundingClientRect().width + 12))));
    const go = d => track.scrollBy({ left: d * (items[0].getBoundingClientRect().width + 12), behavior: reduce ? 'auto' : 'smooth' });
    const btns = $$('.gallery__btn', g);
    const upd = raf(() => { const i = idx(); if (count) count.textContent = (i + 1) + ' / ' + items.length; btns.forEach(b => { b.disabled = b.dataset.dir === 'prev' ? i === 0 : i === items.length - 1; }); });
    track.addEventListener('scroll', upd, { passive: true }); upd();
    btns.forEach(b => { b.hidden = false; b.addEventListener('click', () => go(b.dataset.dir === 'prev' ? -1 : 1)); });
  });
  let lb, lbItems = [], lbI = 0;
  const lbShow = i => {
    lbI = (i + lbItems.length) % lbItems.length; const a = lbItems[lbI], im = $('img', a), fig = a.closest('figure'), cap = $('.gallery__caption', fig || a), cr = $('.gallery__credit', fig || a);
    const img = $('.lightbox__img', lb); img.src = a.href; img.alt = im ? im.alt : '';
    $('.lightbox__caption-text', lb).textContent = cap ? cap.firstChild.textContent.trim() : (im?.alt || ''); $('.lightbox__credit', lb).innerHTML = cr ? cr.innerHTML : '';
    $('.lightbox__count', lb).textContent = lbItems.length > 1 ? (lbI + 1) + ' / ' + lbItems.length : '';
    $$('.lightbox__btn--prev, .lightbox__btn--next', lb).forEach(b => { b.hidden = lbItems.length < 2; });
    lbItems.forEach((n, k) => { if (Math.abs(k - lbI) === 1) new Image().src = n.href; });
  };
  const lbBuild = () => {
    lb = document.createElement('dialog'); lb.className = 'lightbox'; lb.setAttribute('aria-label', 'Image viewer');
    const ic = d => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;
    lb.innerHTML = `<div class="lightbox__inner"><div class="lightbox__bar"><span class="lightbox__count"></span><button class="lightbox__btn lightbox__btn--close" type="button" aria-label="Close">${ic('M6 6l12 12M18 6 6 18')}</button></div>
      <div class="lightbox__stage"><button class="lightbox__btn lightbox__btn--prev" type="button" aria-label="Previous image">${ic('m15 5-7 7 7 7')}</button><img class="lightbox__img" alt=""><button class="lightbox__btn lightbox__btn--next" type="button" aria-label="Next image">${ic('m9 5 7 7-7 7')}</button></div>
      <p class="lightbox__caption"><span class="lightbox__caption-text"></span><span class="lightbox__credit"></span></p></div>`;
    document.body.appendChild(lb);
    lb.addEventListener('click', e => { if (e.target === lb || e.target.closest('.lightbox__btn--close') || e.target.classList.contains('lightbox__inner') || e.target.classList.contains('lightbox__stage')) lb.close(); else if (e.target.closest('.lightbox__btn--prev')) lbShow(lbI - 1); else if (e.target.closest('.lightbox__btn--next')) lbShow(lbI + 1); });
    lb.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') lbShow(lbI - 1); if (e.key === 'ArrowRight') lbShow(lbI + 1); });
    let x0 = null; lb.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', e => { if (x0 !== null) { const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) lbShow(lbI + (dx < 0 ? 1 : -1)); x0 = null; } });
  };
  document.addEventListener('click', e => {
    const a = e.target.closest('a[data-lightbox]'); if (!a || e.metaKey || e.ctrlKey || typeof HTMLDialogElement === 'undefined') return;
    e.preventDefault(); if (!lb) lbBuild();
    const grp = a.closest('[data-gallery]'); lbItems = grp ? $$('a[data-lightbox]', grp) : [a];
    lbShow(lbItems.indexOf(a)); lb.showModal(); $('.lightbox__btn--close', lb).focus();
  });

  // Tab bar: search tab opens the header search
  $$('[data-search-open]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); scrollTo(0, 0); if (typeof setSearch === 'function') setSearch(true); else $('.site-header__search-toggle')?.click(); }));

  })();
