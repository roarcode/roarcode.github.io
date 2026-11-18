// Render content/images/<slot>.json into site-images/<slot>.webp
//   node pipeline/render.mjs --scan ../content --site-images ../site-images
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import matter from 'gray-matter';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { FONT_FILES } from './lib.mjs';
import { TYPES } from './types.mjs';

const require = createRequire(import.meta.url);
function resolveSharp() { return sharp; }
void require;

function arg(flag, fallback) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : fallback;
}
const only = (() => {
  const raw = arg('--only');
  return raw ? raw.split(',').map((s) => s.trim()).filter(Boolean) : null;
})();
const force = process.argv.includes('--force');

const here = path.dirname(fileURLToPath(import.meta.url));
const scanRoot = path.resolve(arg('--scan', path.join(here, '..', '..', 'gta6-guides', 'content')));
const outDir = path.resolve(arg('--site-images', path.join(here, '..', '..', 'gta6-guides', 'site-images')));
const specDir = path.join(scanRoot, 'images');

const SLOT_RE = /image:([a-z0-9]+(?:-[a-z0-9]+)*)/g;

function walkMd(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === 'inbox' || name === 'images' || name === 'node_modules') continue;
      walkMd(p, acc);
    } else if (name.endsWith('.md') && !name.startsWith('template') && name !== 'README.md') {
      acc.push(p);
    }
  }
  return acc;
}

function collectSlots() {
  const slots = new Set();
  for (const p of walkMd(scanRoot)) {
    let src;
    try {
      src = fs.readFileSync(p, 'utf8');
      matter(src);
    } catch {
      src = fs.readFileSync(p, 'utf8');
    }
    for (const m of src.matchAll(SLOT_RE)) slots.add(m[1]);
  }
  return slots;
}

function loadSpec(slot) {
  const p = path.join(specDir, slot + '.json');
  if (!fs.existsSync(p)) return null;
  const spec = JSON.parse(fs.readFileSync(p, 'utf8'));
  spec._path = p;
  return spec;
}

async function renderSpec(slot, spec) {
  const type = spec.type;
  const fn = TYPES[type];
  if (!fn) throw new Error(`${slot}: unknown type ${type}`);
  const data = spec.data || spec;
  if (spec.alt && !data.alt) data.alt = spec.alt;
  const out = await fn(data);
  const svg = out.svg;
  const resvg = new Resvg(svg, {
    font: { fontFiles: FONT_FILES, loadSystemFonts: false, defaultFontFamily: 'Inter' },
    fitTo: { mode: 'original' },
  });
  const png = resvg.render().asPng();
  const maxKB = type === 'press-still' ? 150 : 120;
  let quality = 82;
  let buf;
  do {
    buf = await sharp(png).webp({ quality, effort: 6 }).toBuffer();
    quality -= 6;
  } while (buf.length > maxKB * 1024 && quality >= 50);
  if (buf.length > maxKB * 1024) {
    buf = await sharp(png).resize({ width: 1200 }).webp({ quality: 50, effort: 6 }).toBuffer();
  }
  return { buf, w: out.w, h: out.h, bytes: buf.length, alt: spec.alt || data.alt || '', type };
}

function loadManifest() {
  const p = path.join(outDir, '_manifest.json');
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return {};
  }
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const contentSlots = collectSlots();
  const specSlots = fs.existsSync(specDir)
    ? fs.readdirSync(specDir).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5))
    : [];
  const wanted = new Set([...contentSlots, ...specSlots]);
  if (only) only.forEach((s) => wanted.add(s));

  const manifest = loadManifest();
  let rendered = 0, upToDate = 0, noSpec = 0, errors = 0;
  const errList = [];
  const missing = [];

  for (const slot of [...wanted].sort()) {
    if (only && !only.includes(slot)) continue;
    const spec = loadSpec(slot);
    if (!spec) {
      if (contentSlots.has(slot)) {
        noSpec++;
        missing.push(slot);
      }
      continue;
    }
    try {
      const dest = path.join(outDir, slot + '.webp');
      if (!force && !only && fs.existsSync(dest) && manifest[slot]) {
        upToDate++;
        continue;
      }
      const result = await renderSpec(slot, spec);
      fs.writeFileSync(dest, result.buf);
      manifest[slot] = {
        file: slot + '.webp',
        width: result.w,
        height: result.h,
        bytes: result.bytes,
        alt: result.alt,
        type: result.type,
      };
      rendered++;
      console.log('rendered', slot, result.w + 'x' + result.h, result.bytes + 'B');
    } catch (e) {
      errors++;
      errList.push(slot + ': ' + e.message);
      console.error('ERROR', slot, e.message);
    }
  }

  // Don't drop existing manifest entries for slots we didn't touch
  fs.writeFileSync(path.join(outDir, '_manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

  const orphans = Object.keys(manifest).filter((s) => !contentSlots.has(s) && !wanted.has(s) && !specSlots.includes(s));
  const report = [
    `# Slot report`,
    '',
    `- content slots: ${contentSlots.size}`,
    `- specs: ${specSlots.length}`,
    `- rendered this run: ${rendered}`,
    `- no-spec: ${noSpec}`,
    `- errors: ${errors}`,
    missing.length ? `- missing: ${missing.join(', ')}` : '- missing: none',
    errList.length ? errList.map((e) => `- error: ${e}`).join('\n') : '',
    '',
  ].join('\n');
  fs.writeFileSync(path.join(outDir, '_slots-report.md'), report);
  console.log(`scan: ${contentSlots.size} content slots | rendered ${rendered} | no-spec ${noSpec} | errors ${errors} | orphans ${orphans.length}`);
  if (missing.length) console.log('no-spec:', missing.join(', '));
  process.exitCode = errors ? 1 : 0;
}

main();
