// Screenshots: redesign-{home,guide}-{desktop,mobile}.png (full page) + -fold variants. usage: node src/shoot_redesign.mjs [outdir]
import { chromium } from 'playwright-core'; import path from 'node:path'; import { fileURLToPath } from 'node:url'; import { serve } from './_server.mjs';
const D = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'); const out = process.argv[2] || path.join(D, 'screenshots');
const srv = await serve(D); const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
for (const [dev, vp, dsf] of [['desktop', { width: 1280, height: 900 }, 1], ['mobile', { width: 390, height: 844 }, 2]]) {
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: dsf }); const pg = await ctx.newPage();
  for (const n of ['home', 'guide']) {
    await pg.goto(`${srv.url}/mockup-${n}.html`, { waitUntil: 'networkidle' });
    await pg.addStyleTag({ content: '.ticker__track,.marquee__track{animation:none!important}.site-header{position:static!important}' });
    await pg.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } scrollTo(0, 0); });
    await pg.waitForTimeout(400);
    await pg.screenshot({ path: path.join(out, `redesign-${n}-${dev}.png`), fullPage: true });
    await pg.screenshot({ path: path.join(out, `redesign-${n}-${dev}-fold.png`) });
  }
  await ctx.close();
}
await b.close(); srv.close(); console.log('shots ok');
