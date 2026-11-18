// Renders article-assets/**.svg -> article-assets/png/**.png (2x). Diagram templates get sample text. Needs @resvg/resvg-js.
import { Resvg } from '@resvg/resvg-js'; import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const D = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const A = path.join(D, 'article-assets');
const fonts = [path.join(D, 'fonts/Syne-ExtraBold-static.ttf'), path.join(D, 'fonts/Inter-SemiBold-static.ttf')];
const SAMPLE = { title: 'Diagram title placeholder', caption: 'Caption placeholder', before_caption: 'Before: placeholder', after_caption: 'After: placeholder', credit: 'Credit: placeholder',
  start: 'Start', question: 'Condition?', yes_action: 'Action A', no_action: 'Action B', time: '05:00', unit: 'MIN : SEC', event: 'Event placeholder', note: 'Lorem ipsum dolor sit amet.', max: '10:00',
  do_1: 'Do this first', do_2: 'Then do this', do_3: 'Keep it short', dont_1: 'Skip this step', dont_2: 'Avoid this', dont_3: 'Never do this' };
export const fill = svg => svg.replace(/\{\{(\w+)\}\}/g, (_, k) => SAMPLE[k] ?? k);
for (const dir of ['steps', 'pins', 'buttons', 'diagrams']) {
  fs.mkdirSync(path.join(A, 'png', dir), { recursive: true });
  for (const f of fs.readdirSync(path.join(A, dir)).filter(f => f.endsWith('.svg'))) {
    let svg = fs.readFileSync(path.join(A, dir, f), 'utf8'); if (dir === 'diagrams') svg = fill(svg);
    const r = new Resvg(svg, { font: { fontFiles: fonts, loadSystemFonts: false }, fitTo: dir === 'diagrams' ? { mode: 'width', value: 1200 } : { mode: 'zoom', value: 2 } });
    fs.writeFileSync(path.join(A, 'png', dir, f.replace('.svg', '.png')), r.render().asPng());
  }
}
console.log('article png ok');
