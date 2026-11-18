// Render OG PNGs with resvg.  npm i @resvg/resvg-js   (Lead Engineer: copy this into the Eleventy build)
// usage: node src/render_og.mjs                       -> og/og-default.png
//        import { renderOg } from './render_og.mjs'    -> renderOg({title, category}) => PNG Buffer
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const D = path.resolve(here, '..');
const fonts = [path.join(D, 'fonts/Syne-ExtraBold-static.ttf'), path.join(D, 'fonts/Inter-SemiBold-static.ttf')];
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Measured wrap (Syne ExtraBold). Tries 50px, 42px, 36px: 1 line if it fits in 1100px, else 2 lines (ellipsis only if still too long at 36px).
const MAXW = 1100, SIZES = [50, 42, 36];
const widthCache = new Map();
function measure(text, size) {
  const k = size + '|' + text; if (widthCache.has(k)) return widthCache.get(k);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="4000" height="300"><text x="10" y="150" font-family="Syne" font-weight="800" font-size="${size}">${esc(text)}</text></svg>`;
  const b = new Resvg(svg, { font: { fontFiles: fonts, loadSystemFonts: false } }).getBBox(); const w = b ? b.width + 0.03 * size : 0; widthCache.set(k, w); return w;
}
export function wrapTitle(t) {
  t = t.trim().replace(/\s+/g, ' ');
  for (const size of SIZES) {
    if (measure(t, size) <= MAXW) return { lines: [t], size };
    const words = t.split(' '); let l1 = '';
    while (words.length && measure((l1 + ' ' + words[0]).trim(), size) <= MAXW) l1 = (l1 + ' ' + words.shift()).trim();
    const l2 = words.join(' ');
    if (l1 && l2 && measure(l2, size) <= MAXW) return { lines: [l1, l2], size };
    if (size === SIZES.at(-1)) { let e = l2 || t; while (e.length > 1 && measure(e + '…', size) > MAXW) e = e.slice(0, -1).trimEnd(); return { lines: [l1 || e, l1 ? e + '…' : undefined].filter(Boolean), size }; }
  }
}
export function renderOg({ title, category = 'GUIDE' }) {
  const { lines, size } = wrapTitle(title);
  let svg = lines.length === 1
    ? fs.readFileSync(path.join(D, 'og/og-template.svg'), 'utf8').replace('{{title}}', esc(lines[0]))
    : fs.readFileSync(path.join(D, 'og/og-template-2line.svg'), 'utf8').replace('{{title_line1}}', esc(lines[0])).replace('{{title_line2}}', esc(lines[1]));
  svg = svg.replace(/font-size="50"/g, `font-size="${size}"`).replace('y="364"', `y="${290 + Math.round(size * 1.45)}"`).replace('{{category}}', esc(category.toUpperCase()));
  return new Resvg(svg, { font: { fontFiles: fonts, loadSystemFonts: false, defaultFontFamily: 'Inter' } }).render().asPng();
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const out = (f, svgFile) => fs.writeFileSync(path.join(D, f), new Resvg(fs.readFileSync(path.join(D, svgFile), 'utf8'),
    { font: { fontFiles: fonts, loadSystemFonts: false } }).render().asPng());
  out('og/og-default.png', 'og/og-default.svg');
  fs.writeFileSync(path.join(D, 'og/sample-1line.png'), renderOg({ title: 'Money Method #1', category: 'Money' }));
  fs.writeFileSync(path.join(D, 'og/sample-2line.png'), renderOg({ title: 'Mission Walkthrough Title Placeholder', category: 'Missions' }));
  console.log('og rendered');
}
