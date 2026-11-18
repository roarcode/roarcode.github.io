// Screenshots all mockups. usage: node src/shoot.mjs [page...]   (needs playwright-core + google-chrome)
import { chromium } from 'playwright-core';
import path from 'node:path'; import { fileURLToPath } from 'node:url';
const D = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = process.argv.length > 2 ? process.argv.slice(2) : ['mockup-home','mockup-guide','mockup-hub','mockup-search'];
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
for (const [w, tag] of [[390,'mobile'],[1280,'desktop']]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 800 }, deviceScaleFactor: w < 500 ? 2 : 1 });
  for (const p of pages) {
    const pg = await ctx.newPage();
    await pg.goto('file://' + D + '/' + p + '.html'); await pg.waitForLoadState('networkidle'); await pg.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}window.scrollTo(0,0);});await pg.waitForTimeout(900);
    await pg.screenshot({ path: `${D}/screenshots/${p}-${tag}.png`, fullPage: true });
    if (p === 'mockup-home') {
      for (const [h, n] of [['#demo-search','search'],['#demo-menu','menu']]) {
        if (n === 'menu' && w >= 1024) continue;
        const q = await ctx.newPage(); await q.goto(`file://${D}/${p}.html${h}`); await q.waitForTimeout(500);
        await q.screenshot({ path: `${D}/screenshots/${p}-${n}-${tag}.png` }); await q.close();
      }
    }
    await pg.close();
  }
  await ctx.close();
}
await b.close(); console.log('shots ok');
