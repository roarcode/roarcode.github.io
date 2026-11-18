// State screenshots + old-vs-new side-by-side. usage: node src/shoot_redesign_states.mjs
import { chromium } from 'playwright-core'; import path from 'node:path'; import fs from 'node:fs'; import { fileURLToPath } from 'node:url'; import { serve } from './_server.mjs';
const D = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'); const S = path.join(D, 'screenshots'); const srv = await serve(D);
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const freeze = pg => pg.addStyleTag({ content: '.ticker__track,.marquee__track{animation:none!important}' });
{ const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); const pg = await ctx.newPage();
  await pg.goto(`${srv.url}/mockup-guide.html`, { waitUntil: 'networkidle' }); await freeze(pg);
  await pg.evaluate(() => { document.querySelectorAll('details.spoiler')[0].open = true; document.getElementById('spoilers').scrollIntoView(); scrollBy(0, -90); }); await pg.waitForTimeout(300);
  await pg.screenshot({ path: path.join(S, 'redesign-guide-spoiler-desktop.png') });
  await pg.goto(`${srv.url}/mockup-home.html#demo-search`, { waitUntil: 'networkidle' }); await freeze(pg); await pg.waitForTimeout(300);
  await pg.screenshot({ path: path.join(S, 'redesign-home-search-desktop.png') }); await ctx.close(); }
{ const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 }); const pg = await ctx.newPage();
  await pg.goto(`${srv.url}/mockup-guide.html`, { waitUntil: 'networkidle' }); await freeze(pg);
  await pg.evaluate(() => { document.querySelectorAll('details.spoiler')[0].open = true; document.getElementById('spoilers').scrollIntoView(); scrollBy(0, -90); }); await pg.waitForTimeout(300);
  await pg.screenshot({ path: path.join(S, 'redesign-guide-spoiler-mobile.png') });
  await pg.goto(`${srv.url}/mockup-guide.html`, { waitUntil: 'networkidle' }); await pg.click('.toc__summary'); await pg.evaluate(() => scrollTo(0, 380)); await pg.waitForTimeout(300);
  await pg.screenshot({ path: path.join(S, 'redesign-guide-toc-open-mobile.png') });
  await pg.goto(`${srv.url}/mockup-home.html#demo-menu`, { waitUntil: 'networkidle' }); await freeze(pg); await pg.waitForTimeout(300);
  await pg.screenshot({ path: path.join(S, 'redesign-home-menu-mobile.png') }); await ctx.close(); }
for (const [n, f] of [['mockup-collectibles', 'desktop'], ['mockup-hub', 'desktop']]) { const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); const pg = await ctx.newPage();
  await pg.goto(`${srv.url}/${n}.html`, { waitUntil: 'networkidle' }); await freeze(pg); await pg.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 50)); } scrollTo(0, 0); });
  await pg.screenshot({ path: path.join(S, `redesign-${n.replace('mockup-', '')}-desktop.png`), fullPage: true }); await ctx.close(); }
await b.close(); srv.close();
// old vs new side-by-side (old = the v1 committed screenshots)
import { execFileSync } from 'node:child_process';
const old = path.join(S, 'old-home-desktop.png');
if (fs.existsSync(old)) execFileSync('python3', ['-c', `
from PIL import Image, ImageDraw, ImageFont
o=Image.open('${old}').convert('RGB'); n=Image.open('${path.join(S, 'redesign-home-desktop.png')}').convert('RGB')
H=1700; o=o.crop((0,0,o.width,min(H,o.height))); n=n.crop((0,0,n.width,min(H,n.height)))
w=640; o=o.resize((w,int(o.height*w/o.width))); n=n.resize((w,int(n.height*w/n.width)))
c=Image.new('RGB',(w*2+30,max(o.height,n.height)+56),(20,18,34)); d=ImageDraw.Draw(c)
try: f=ImageFont.truetype('${path.join(D, 'fonts/Inter-SemiBold-static.ttf')}',22)
except Exception: f=None
d.text((16,16),'OLD (v1)',fill=(255,255,255),font=f); d.text((w+46,16),'NEW (v2 Dusk Wire)',fill=(255,138,61),font=f)
c.paste(o,(0,56)); c.paste(n,(w+30,56)); c.save('${path.join(S, 'redesign-home-old-vs-new.png')}')
`]);
console.log('states ok');
