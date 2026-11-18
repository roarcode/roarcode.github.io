// Functional + a11y + layout checks for the redesign mockups. usage: LH_DIR=/tmp/lh node src/test_redesign.mjs
import { chromium } from 'playwright-core'; import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url'; import { serve } from './_server.mjs';
const D = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'); const LH = process.env.LH_DIR || '/tmp/lh';
const axeSrc = fs.readFileSync(path.join(LH, 'node_modules/axe-core/axe.min.js'), 'utf8');
const srv = await serve(D); const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
let pass = 0, fail = 0; const ok = (name, c, info = '') => { c ? pass++ : fail++; console.log(`${c ? 'PASS' : 'FAIL'} ${name}${c ? '' : '  → ' + info}`); };
const errors = [];
async function open(name, { w = 1280, h = 900, js = true, reduced = false, hash = '' } = {}) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, javaScriptEnabled: js, reducedMotion: reduced ? 'reduce' : 'no-preference' });
  const pg = await ctx.newPage(); pg.on('console', m => { if (m.type() === 'error') errors.push(name + ': ' + m.text()); }); pg.on('pageerror', e => errors.push(name + ': ' + e.message));
  await pg.goto(`${srv.url}/mockup-${name}.html${hash}`, { waitUntil: 'networkidle' }); return { ctx, pg };
}
const $c = (pg, s) => pg.locator(s).count();

// ---- structure / BEM (home)
{ const { ctx, pg } = await open('home');
  ok('home: hero-grid has hero-feature + wire', await $c(pg, '.hero-grid > .hero-feature') === 1 && await $c(pg, '.hero-grid > .wire') === 1);
  const r = await pg.evaluate(() => { const h = document.querySelector('.hero-feature').getBoundingClientRect(), w = document.querySelector('.wire').getBoundingClientRect(); return { hr: h.right, wl: w.left, ht: h.top, wt: w.top }; });
  ok('home desktop: ranked Latest wire sits BESIDE the hero', r.wl >= r.hr - 1 && Math.abs(r.ht - r.wt) < 30, JSON.stringify(r));
  ok('home: ticker has duplicated aria-hidden group', await $c(pg, '.ticker__group') === 2 && await pg.locator('.ticker__group').nth(1).getAttribute('aria-hidden') === 'true');
  ok('home: wire has 6 ranked items', await $c(pg, '.wire__item') === 6);
  ok('home: trending strip ≥5 items', await $c(pg, '.trending__item') >= 5);
  ok('home: quick access has 8 tiles', await $c(pg, '.quick-access__item') === 8);
  ok('home: 4 popular tiles', await $c(pg, '.tile-row__item') === 4);
  ok('home: guide grid ≥9 cards incl. one feature', await $c(pg, '.guide-grid .guide-card') >= 9 && await $c(pg, '.guide-card--feature') === 1);
  ok('home: exactly ONE header CTA pill', await $c(pg, '.site-header .btn--cta') === 1);
  ok('home: disclaimer in top bar and footer', (await pg.textContent('.disclaimer-bar')).includes('not affiliated with Rockstar Games') && (await pg.textContent('.site-footer__disclaimer')).includes('not affiliated with Rockstar Games'));
  ok('home: marquee decorative (aria-hidden)', await pg.locator('.marquee').getAttribute('aria-hidden') === 'true');
  // fonts
  const f = await pg.evaluate(async () => { await document.fonts.ready; return { h1: getComputedStyle(document.querySelector('h1')).fontFamily, anton: document.fonts.check('40px Anton', 'ČŠŽčšž'), inter: document.fonts.check('16px Inter', 'ČŠŽčšž'),
    pre: [...document.querySelectorAll('link[rel=preload][as=font]')].map(l => l.getAttribute('href')) }; });
  ok('fonts: h1 uses Anton and it loaded', f.h1.startsWith('Anton') && f.anton, JSON.stringify(f));
  ok('fonts: Inter loaded; č š ž covered', f.inter);
  ok('fonts: preload only the display font (Anton)', f.pre.length === 1 && f.pre[0].includes('Anton'), JSON.stringify(f.pre));
  // filters
  await pg.click('[data-filter="vehicles"]');
  const vis = await pg.$$eval('.guide-grid .guide-card', cs => cs.filter(c => !c.hidden).map(c => c.dataset.cat));
  ok('filter chips: Vehicles shows only vehicle cards', vis.length >= 1 && vis.every(c => c === 'vehicles'), vis.join());
  await pg.click('[data-filter="all"]');
  ok('filter chips: All restores every card', (await pg.$$eval('.guide-grid .guide-card', cs => cs.filter(c => !c.hidden).length)) >= 9);
  // ticker pause
  await pg.click('.ticker__pause'); ok('ticker: pause button toggles', await pg.evaluate(() => document.querySelector('.ticker').classList.contains('ticker--paused')));
  // search
  await pg.click('.site-header__search-toggle'); await pg.fill('.search__input', 'beginner');
  const sr = await pg.$$eval('.search__result', rs => rs.filter(r => !r.hidden).length);
  ok('search dropdown opens and filters', await pg.locator('.search__input').isVisible() && sr >= 1 && sr < 4, 'visible=' + sr);
  await pg.keyboard.press('Escape'); ok('search closes on Esc', !(await pg.locator('.site-header__search').evaluate(e => e.classList.contains('site-header__search--open'))));
  await ctx.close(); }

// ---- overflow at several widths
for (const w of [390, 768, 1024, 1100, 1280]) for (const n of ['home', 'guide']) {
  if (n === 'guide' && ![390, 1280].includes(w)) continue;
  const { ctx, pg } = await open(n, { w }); const sw = await pg.evaluate(() => document.documentElement.scrollWidth);
  ok(`no horizontal overflow: ${n} @${w}`, sw <= w, 'scrollWidth=' + sw); await ctx.close(); }
{ const { ctx, pg } = await open('home', { w: 1100 }); const sw = await pg.evaluate(() => document.documentElement.scrollWidth); ok('no horizontal overflow: home @1100 (nav squeeze)', sw <= 1100); await ctx.close(); }

// ---- mobile specifics
{ const { ctx, pg } = await open('home', { w: 390, h: 844 });
  const r = await pg.evaluate(() => ({ h: document.querySelector('.hero-feature').getBoundingClientRect().bottom, w: document.querySelector('.wire').getBoundingClientRect().top }));
  ok('home mobile: Latest wire is BELOW the hero', r.w >= r.h - 1, JSON.stringify(r));
  ok('home mobile: header CTA hidden (nav stays slim)', !(await pg.locator('.site-header__cta').isVisible()));
  await pg.click('.site-header__toggle'); ok('mobile menu opens (aria-expanded)', await pg.getAttribute('.site-header__toggle', 'aria-expanded') === 'true' && await pg.locator('#site-nav').isVisible());
  await pg.keyboard.press('Escape'); ok('mobile menu closes on Esc', await pg.getAttribute('.site-header__toggle', 'aria-expanded') === 'false');
  const tt = await pg.evaluate(() => [...document.querySelectorAll('.icon-btn, .spoiler-toggle, .btn')].filter(e => e.offsetParent).every(e => { const r = e.getBoundingClientRect(); return r.height >= 36 && r.width >= 36; }));
  ok('touch targets ≥36px (header controls, buttons)', tt); await ctx.close(); }

// ---- guide: layout, ToC, spoilers
{ const { ctx, pg } = await open('guide');
  ok('guide: breadcrumb + byline with updated date + quick facts', await $c(pg, '.breadcrumbs__list') === 1 && await $c(pg, '.byline__updated time') === 1 && await $c(pg, '.quick-facts') === 1);
  ok('guide: ToC open on desktop and sticky', await pg.locator('.toc').evaluate(e => e.open) && await pg.locator('.guide-layout__toc').evaluate(e => getComputedStyle(e).position) === 'sticky');
  await pg.evaluate(() => document.getElementById('steps').scrollIntoView()); await pg.waitForTimeout(500);
  ok('ToC scroll-spy marks the current section', await pg.getAttribute('.toc a[href="#steps"]', 'aria-current') === 'true');
  ok('read-progress bar advances on scroll', parseFloat(await pg.evaluate(() => getComputedStyle(document.querySelector('.read-progress')).getPropertyValue('--p'))) > 0.05);
  const sp = pg.locator('details.spoiler').first();
  ok('spoiler block starts closed (blurred decoy)', !(await sp.evaluate(e => e.open)));
  await pg.locator('details.spoiler summary').first().focus(); await pg.keyboard.press('Enter');
  ok('spoiler opens from keyboard (Enter on summary)', await sp.evaluate(e => e.open));
  await pg.keyboard.press('Enter'); ok('spoiler closes again from keyboard', !(await sp.evaluate(e => e.open)));
  ok('spoiler switch: role=switch aria-checked=false initially', await pg.getAttribute('[data-spoiler-toggle]', 'role') === 'switch' && await pg.getAttribute('[data-spoiler-toggle]', 'aria-checked') === 'false');
  await pg.click('[data-spoiler-toggle]');
  ok('Show all spoilers opens every block + saves lg-spoilers=on', (await pg.$$eval('details.spoiler', d => d.every(x => x.open))) && await pg.evaluate(() => localStorage.getItem('lg-spoilers')) === 'on');
  await pg.reload({ waitUntil: 'networkidle' });
  ok('spoiler preference restored after reload', await pg.$$eval('details.spoiler', d => d.every(x => x.open)) && await pg.getAttribute('[data-spoiler-toggle]', 'aria-checked') === 'true');
  const ax = await (async () => { await pg.addScriptTag({ content: axeSrc }); return pg.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] })).violations.map(v => v.id + ':' + v.nodes.length)); })();
  ok('axe WCAG AA guide @1280 (spoilers open)', ax.length === 0, ax.join(', '));
  await pg.click('[data-spoiler-toggle]'); ok('switch off closes blocks + saves off', (await pg.$$eval('details.spoiler', d => d.every(x => !x.open))) && await pg.evaluate(() => localStorage.getItem('lg-spoilers')) === 'off');
  await ctx.close(); }
{ const { ctx, pg } = await open('guide', { w: 390, h: 844 }); ok('guide mobile: ToC collapsed by default', !(await pg.locator('.toc').evaluate(e => e.open))); await ctx.close(); }

// ---- no-JS: everything readable, spoilers still native
{ const { ctx, pg } = await open('guide', { js: false });
  ok('no-JS: spoiler <details> still opens natively', await (async () => { await pg.locator('details.spoiler summary').first().click(); return pg.locator('details.spoiler').first().evaluate(e => e.open); })());
  ok('no-JS: h1 + ToC links present, pause button hidden', await $c(pg, 'h1') === 1 && await $c(pg, '.toc a') === 6 && !(await pg.locator('.ticker__pause').isVisible()));
  await ctx.close(); }
{ const { ctx, pg } = await open('home', { js: false }); ok('no-JS home: all cards visible, content intact', (await pg.$$eval('.guide-grid .guide-card', c => c.filter(x => x.offsetParent).length)) >= 9 && await $c(pg, '.wire__item') === 6); await ctx.close(); }

// ---- collectibles: tracker + lightbox
{ const { ctx, pg } = await open('collectibles');
  await pg.locator('.checklist__label').nth(0).click(); await pg.locator('.checklist__label').nth(2).click();
  ok('checklist: progress card counts 2 / 8', (await pg.textContent('[data-tracker-count]')).trim() === '2 / 8');
  await pg.reload({ waitUntil: 'networkidle' }); ok('checklist: progress persists (localStorage)', (await pg.textContent('[data-tracker-count]')).trim() === '2 / 8');
  await pg.click('[data-tracker-reset]'); ok('checklist: reset clears progress', (await pg.textContent('[data-tracker-count]')).trim() === '0 / 8');
  await pg.locator('.gallery__open').first().click(); ok('gallery: lightbox opens with caption', await pg.locator('dialog.lightbox').evaluate(e => e.open) && (await pg.textContent('.lightbox__caption')).length > 3);
  await pg.keyboard.press('Escape'); ok('gallery: lightbox closes on Esc', !(await pg.locator('dialog.lightbox').evaluate(e => e.open)));
  await ctx.close(); }

// ---- reduced motion
{ const { ctx, pg } = await open('home', { reduced: true });
  const rm = await pg.evaluate(() => ({ t: getComputedStyle(document.querySelector('.ticker__track')).animationName, m: getComputedStyle(document.querySelector('.marquee__track')).animationName, d: getComputedStyle(document.querySelector('.ticker__group[aria-hidden]')).display }));
  ok('reduced motion: ticker + marquee do not animate, duplicates hidden', rm.t === 'none' && rm.m === 'none' && rm.d === 'none', JSON.stringify(rm)); await ctx.close(); }

// ---- axe
for (const [n, w] of [['home', 390], ['guide', 390], ['home', 1280], ['guide', 1280], ['collectibles', 390], ['hub', 1280]]) {
  const { ctx, pg } = await open(n, { w }); await pg.addScriptTag({ content: axeSrc });
  const v = await pg.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] })).violations.map(v => v.id + ':' + v.nodes.map(x => x.target.join(' ')).join('|')));
  ok(`axe WCAG AA ${n} @${w}`, v.length === 0, v.join(' ; ')); await ctx.close(); }

ok('no console/page errors', errors.length === 0, errors.join(' | '));
await b.close(); srv.close(); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
