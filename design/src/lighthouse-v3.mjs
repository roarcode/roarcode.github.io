// Production-like Lighthouse (mobile) for mockup-home + mockup-guide: single minified CSS, minified JS, brotli, immutable cache.
// usage: LH_DIR=/tmp/lh node src/lighthouse.mjs      (needs lighthouse, esbuild, chrome-launcher in $LH_DIR/node_modules)
import fs from 'node:fs'; import path from 'node:path'; import zlib from 'node:zlib'; import http from 'node:http'; import os from 'node:os'; import { fileURLToPath, pathToFileURL } from 'node:url';
const D = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'); const LH = process.env.LH_DIR || '/tmp/lh';
const imp = m => import(pathToFileURL(path.join(LH, 'node_modules', m)).href);
const esbuild = (await imp('esbuild/lib/main.js')); const lighthouse = (await imp('lighthouse/core/index.js')).default; const chromeLauncher = await imp('chrome-launcher/dist/index.js');
const dist = fs.mkdtempSync(path.join(os.tmpdir(), 'lg-dist-'));
const cp = (a, b) => { fs.mkdirSync(path.dirname(b), { recursive: true }); fs.copyFileSync(a, b); };
const css = ['fonts-v3.css', 'tokens-v3.css', 'components-v3.css'].map(f => fs.readFileSync(path.join(D, f), 'utf8')).join('\n');
const min = await esbuild.transform(css, { loader: 'css', minify: true }); fs.writeFileSync(path.join(dist, 'kit.min.css'), min.code);
const js = {code:''};
const br = b => zlib.brotliCompressSync(b).length;
console.log(`kit.min.css ${(min.code.length / 1024).toFixed(1)} KB raw / ${(br(Buffer.from(min.code)) / 1024).toFixed(1)} KB br · ui.min.js ${(js.code.length / 1024).toFixed(1)} KB raw`);
for (const f of fs.readdirSync(path.join(D, 'fonts'))) if (f.endsWith('.woff2')) cp(path.join(D, 'fonts', f), path.join(dist, 'fonts', f));
for (const d of ['img', 'logo']) for (const f of fs.readdirSync(path.join(D, d))) if (fs.statSync(path.join(D, d, f)).isFile()) cp(path.join(D, d, f), path.join(dist, d, f));
for (const f of ['favicon.svg', 'favicon.ico', 'apple-touch-icon-180.png', 'site.webmanifest', 'icon-192.png', 'icon-512.png']) cp(path.join(D, f), path.join(dist, f));
cp(path.join(D, 'og/og-default.png'), path.join(dist, 'og/og-default.png'));
for (const n of ['home', 'guide']) {
  let h = fs.readFileSync(path.join(D, `mockup-${n}-v3.html`), 'utf8');
  h = h.replace(/<link rel="stylesheet" href="fonts-v3.css"><link rel="stylesheet" href="tokens-v3.css"><link rel="stylesheet" href="components-v3.css">/, '<link rel="stylesheet" href="kit.min.css">').replace('src="ui.js"', 'src="ui.min.js"');
  fs.writeFileSync(path.join(dist, `${n}.html`), h);
}
const T = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.json': 'application/json', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json' };
const server = http.createServer((q, r) => { const p = q.url.split('?')[0]; const f = path.join(dist, p === '/' ? 'home.html' : p);
  if (!fs.existsSync(f)) { r.writeHead(404); return r.end(); } const ext = path.extname(f); let body = fs.readFileSync(f); const h = { 'content-type': T[ext] || 'application/octet-stream', 'cache-control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable' };
  if (['.html', '.css', '.js', '.svg', '.json', '.webmanifest'].includes(ext)) { body = zlib.brotliCompressSync(body); h['content-encoding'] = 'br'; } r.writeHead(200, h); r.end(body); });
await new Promise(r => server.listen(0, '127.0.0.1', r)); const port = server.address().port;
const chrome = await chromeLauncher.launch({ chromePath: '/usr/bin/google-chrome', chromeFlags: ['--headless=new', '--no-sandbox'] });
const out = [];
for (const n of ['home', 'guide']) {
  const r = await lighthouse(`http://127.0.0.1:${port}/${n}.html`, { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'] });
  const c = r.lhr.categories, a = r.lhr.audits, s = k => Math.round(c[k].score * 100);
  const line = `${n}: perf ${s('performance')} · a11y ${s('accessibility')} · best-practices ${s('best-practices')} · seo ${s('seo')} | FCP ${(a['first-contentful-paint'].numericValue / 1000).toFixed(1)} s LCP ${(a['largest-contentful-paint'].numericValue / 1000).toFixed(1)} s TBT ${Math.round(a['total-blocking-time'].numericValue)} ms CLS ${a['cumulative-layout-shift'].numericValue.toFixed(3)} SI ${(a['speed-index'].numericValue / 1000).toFixed(1)} s`;
  console.log(line); out.push(line);
  const bad = Object.values(r.lhr.audits).filter(x => x.score !== null && x.score < 1 && x.scoreDisplayMode === 'numeric' && ['performance','best-practices','accessibility','seo'].some(k => c[k].auditRefs.find(ar => ar.id === x.id && ar.weight > 0))).map(x => `${x.id}=${x.score}`);
  if (bad.length) console.log('   not perfect:', bad.join(', '));
}
await chrome.kill(); server.close(); fs.writeFileSync(path.join(D, 'screenshots', '.lighthouse-v3-last.txt'), out.join('\n') + '\n');
