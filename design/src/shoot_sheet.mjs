import { chromium } from 'playwright-core'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const D = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const pg = await (await b.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
await pg.goto(`file://${D}/article-assets/index.html`); await pg.waitForLoadState('networkidle'); await pg.waitForTimeout(500);
await pg.screenshot({ path: `${D}/article-assets/contact-sheet.png`, fullPage: true }); await b.close();
