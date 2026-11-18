// Interaction-state screenshots + functional tests for the upgrade components (ui.js). usage: node src/shoot_states.mjs
import { chromium } from 'playwright-core';
import path from 'node:path'; import { fileURLToPath } from 'node:url';
const D = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'); const S = `${D}/screenshots`;
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const results = []; const ok = (name, cond, extra = '') => { results.push(cond); console.log(`${cond ? 'PASS' : 'FAIL'} ${name}${extra ? ' — ' + extra : ''}`); };
const errors = [];
async function open(w, h, page, opts = {}) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: w < 500 ? 2 : 1, ...opts });
  const pg = await ctx.newPage(); pg.on('pageerror', e => errors.push(e.message)); pg.on('console', m => { if (m.type() === 'error' && !/CORS|ERR_FAILED/.test(m.text())) errors.push(m.text()); }); /* file:// font CORS noise is not a real error */
  await pg.goto(`file://${D}/${page}.html`); await pg.waitForLoadState('networkidle'); return [ctx, pg];
}
const jump = async (pg, sel, off = 0) => { await pg.evaluate(([s, o]) => { document.documentElement.style.scrollBehavior = 'auto'; const e = document.querySelector(s); window.scrollTo(0, e.getBoundingClientRect().top + scrollY - o); }, [sel, off]); await pg.waitForTimeout(500); };

// ---- mobile: home fold (trending + hero + tab bar)
let [ctx, pg] = await open(390, 844, 'mockup-home'); await pg.waitForTimeout(600);
await pg.screenshot({ path: `${S}/mockup-home-fold-mobile.png` });
ok('mobile tabbar visible', await pg.locator('.tabbar').isVisible());
ok('trending rail scrolls on mobile', await pg.$eval('.trending__rail', e => e.scrollWidth > e.clientWidth));
await ctx.close();

// ---- mobile guide: sticky ToC bar, open, scroll-spy label, read progress
[ctx, pg] = await open(390, 844, 'mockup-guide');
await jump(pg, '#steps', 120); await pg.waitForTimeout(300);
await pg.screenshot({ path: `${S}/mockup-guide-toc-sticky-mobile.png` });
const tocTop = await pg.$eval('.guide-layout__toc', e => Math.round(e.getBoundingClientRect().top));
ok('mobile ToC bar is sticky under header', tocTop > 40 && tocTop < 90, `top=${tocTop}px`);
ok('mobile ToC label follows section', (await pg.textContent('.toc__current')).trim() === 'Step-by-step', await pg.textContent('.toc__current'));
ok('read-progress advances', parseFloat(await pg.$eval('.read-progress', e => e.style.getPropertyValue('--read'))) > 0.1);
await pg.evaluate(() => document.querySelector('.toc__summary').click()); await pg.waitForTimeout(300); /* DOM click: Playwright's own scroll-into-view fights sticky elements */
await pg.screenshot({ path: `${S}/mockup-guide-toc-open-mobile.png` });
await pg.evaluate(() => document.querySelector('.toc__link[href="#faq"]').click()); await pg.waitForTimeout(1800);
ok('picking a ToC link closes the panel and scrolls', !(await pg.$eval('.toc', e => e.open)) && (await pg.textContent('.toc__current')).trim() === 'FAQ', (await pg.textContent('.toc__current')).trim());
// gallery swipe + lightbox (mobile)
await jump(pg, '#gallery', 80);
await pg.click('.gallery__item:first-child .gallery__link'); await pg.waitForTimeout(500);
await pg.screenshot({ path: `${S}/mockup-guide-lightbox-mobile.png` });
ok('lightbox opens on mobile', await pg.$eval('dialog.lightbox', e => e.open));
await pg.keyboard.press('ArrowRight'); ok('lightbox next (arrow key)', (await pg.textContent('.lightbox__count')).trim() === '2 / 4');
await pg.keyboard.press('Escape'); await pg.waitForTimeout(150); ok('Esc closes lightbox', !(await pg.$eval('dialog.lightbox', e => e.open)));
await ctx.close();

// ---- desktop guide: sticky ToC + scroll-spy, gallery arrows, lightbox
[ctx, pg] = await open(1280, 800, 'mockup-guide');
await jump(pg, '#steps', 90); await pg.waitForTimeout(300);
await pg.screenshot({ path: `${S}/mockup-guide-scrollspy-desktop.png` });
ok('desktop ToC active = Step-by-step', (await pg.textContent('.toc__link[aria-current="true"]')).includes('Step-by-step'));
const st = await pg.$eval('.guide-layout__toc', e => Math.round(e.getBoundingClientRect().top));
ok('desktop ToC sticky', st > 60 && st < 140, `top=${st}px`);
await jump(pg, '#gallery', 100); await pg.hover('.gallery__viewport'); await pg.click('.gallery__btn--next'); await pg.waitForTimeout(700);
ok('gallery next button scrolls + counter updates', (await pg.textContent('.gallery__count')).trim() !== '1 / 4', await pg.textContent('.gallery__count'));
await pg.click('.gallery__item:nth-child(2) .gallery__link'); await pg.waitForTimeout(500);
await pg.screenshot({ path: `${S}/mockup-guide-lightbox-desktop.png` });
ok('lightbox caption + credit', (await pg.textContent('.lightbox__credit')).includes('Image:') && (await pg.textContent('.lightbox__caption-text')).length > 5);
await pg.click('.lightbox__btn--close'); ok('lightbox close button', !(await pg.$eval('dialog.lightbox', e => e.open)));
await ctx.close();

// ---- collectibles: persistence, filter, reset, summary
[ctx, pg] = await open(1280, 800, 'mockup-collectibles');
const count = () => pg.$$eval('.checklist__input:checked', e => e.length);
ok('starts with 0 checked', (await count()) === 0);
await pg.check('input[value="a-01"]'); await pg.check('input[value="b-03"]'); await pg.check('input[value="c-05"]');
ok('3 checked, counter + summary update', (await count()) === 3 && (await pg.textContent('[data-count]')).trim() === '3 / 15' && (await pg.textContent('[data-sum-pct]')).trim() === '20%');
await pg.reload(); await pg.waitForLoadState('networkidle');
ok('state persists after reload (localStorage)', (await count()) === 3 && (await pg.textContent('[data-sum-count]')).trim() === '3 / 15');
await pg.click('[data-tracker-filter] [data-value="todo"]');
ok('"To find" hides done items', (await pg.$$eval('.checklist__item', els => els.filter(e => e.offsetParent !== null).length)) === 12);
await pg.click('[data-tracker-filter] [data-value="done"]');
ok('"Found" shows only done + hides empty groups', (await pg.$$eval('.checklist__item', els => els.filter(e => e.offsetParent !== null).length)) === 3 && (await pg.$$eval('.checklist__group', g => g.filter(x => x.offsetParent !== null).length)) === 3);
await pg.click('[data-tracker-filter] [data-value="all"]');
await jump(pg, '#checklist', 80); await pg.screenshot({ path: `${S}/mockup-collectibles-checklist-desktop.png` });
await pg.click('[data-tracker-reset]'); ok('reset needs a second tap', (await count()) === 3 && (await pg.textContent('[data-tracker-reset]')).includes('again'));
await pg.click('[data-tracker-reset]'); ok('second tap resets + persists', (await count()) === 0 && (await pg.evaluate(() => localStorage.getItem('lg:tracker:collectible-set-a'))) === '[]');
await ctx.close();
[ctx, pg] = await open(390, 844, 'mockup-collectibles');
await pg.check('input[value="a-01"]'); await pg.check('input[value="a-02"]'); await pg.check('input[value="b-01"]');
await jump(pg, '.checklist__group:nth-child(2)', 190); await pg.waitForTimeout(300);
await pg.screenshot({ path: `${S}/mockup-collectibles-checklist-mobile.png` });
const hd = await pg.$eval('.checklist__head', e => Math.round(e.getBoundingClientRect().top)); const tb = await pg.$eval('.guide-layout__toc', e => Math.round(e.getBoundingClientRect().bottom));
ok('mobile checklist header sticks below the ToC bar (no overlap)', hd >= tb - 2, `head.top=${hd} toc.bottom=${tb}`);
await ctx.close();

// ---- reduced motion: no animations/transitions
[ctx, pg] = await open(1280, 800, 'mockup-home', { reducedMotion: 'reduce' });
const anim = await pg.$$eval('.latest-card, .hero-feature__media img, .latest-card__media img', els => els.map(e => getComputedStyle(e).animationName + '|' + getComputedStyle(e).transitionDuration));
ok('prefers-reduced-motion: no animation / transition', anim.every(a => a.startsWith('none|') && /^0s/.test(a.split('|')[1])), anim.slice(0, 3).join(' ; '));
await ctx.close();
ok('no JS console/page errors', errors.length === 0, errors.slice(0, 2).join(' | '));
await b.close(); console.log(`${results.filter(Boolean).length}/${results.length} passed`); process.exit(results.every(Boolean) ? 0 : 1);
