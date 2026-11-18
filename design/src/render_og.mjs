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
// Greedy wrap: <=22 chars -> 1 line template; else 2 lines (max ~28 chars each, ellipsis if longer).
export function wrapTitle(t, max = 28) {
  t = t.trim();
  if (t.length <= 22) return [t];
  const words = t.split(/\s+/); let l1 = '';
  while (words.length && (l1 + ' ' + words[0]).trim().length <= max) l1 = (l1 + ' ' + words.shift()).trim();
  let l2 = words.join(' ');
  if (l2.length > max) l2 = l2.slice(0, max - 1).trimEnd() + '…';
  return [l1 || t.slice(0, max), l2];
}
export function renderOg({ title, category = 'GUIDE' }) {
  const [a, b] = wrapTitle(title);
  let svg = b === undefined
    ? fs.readFileSync(path.join(D, 'og/og-template.svg'), 'utf8').replace('{{title}}', esc(a))
    : fs.readFileSync(path.join(D, 'og/og-template-2line.svg'), 'utf8').replace('{{title_line1}}', esc(a)).replace('{{title_line2}}', esc(b));
  svg = svg.replace('{{category}}', esc(category.toUpperCase()));
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
