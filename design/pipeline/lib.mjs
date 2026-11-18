// Shared drawing helpers for the Leonida Guides image pipeline.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
let fontkit;
try {
  ({ default: fontkit } = await import('fontkit'));
} catch {
  fontkit = createRequire('/workspace/gta6-design-work/package.json')('fontkit');
}

const here = path.dirname(fileURLToPath(import.meta.url));
const FONT_DIRS = [
  path.join(here, 'fonts'),
  path.join(here, '..', 'fonts'),
  '/workspace/gta6-design-work/fonts',
];
function findFont(name) {
  for (const d of FONT_DIRS) {
    const p = path.join(d, name);
    if (fs.existsSync(p)) return p;
  }
  throw new Error('Missing pipeline font: ' + name + ' (looked in ' + FONT_DIRS.join(', ') + ')');
}

const FONT_PATHS = {
  regular: findFont('Inter-Regular.ttf'),
  semi: findFont('Inter-SemiBold.ttf'),
  display: findFont('Syne-ExtraBold.ttf'),
  mono: findFont('SpaceMono-Regular.ttf'),
};

const loaded = {};
function fk(kind) {
  const k = FONT_PATHS[kind] ? kind : 'regular';
  if (!loaded[k]) loaded[k] = fontkit.openSync(FONT_PATHS[k]);
  return loaded[k];
}

export const FONT_FILES = Object.values(FONT_PATHS);

export const COLORS = {
  bg0: '#07060c',
  bg1: '#0d0b16',
  bg2: '#151226',
  bg3: '#1e1a36',
  line1: '#2a2446',
  line2: '#3b3462',
  line3: '#54497f',
  text1: '#f4f1fa',
  text2: '#c4bdda',
  text3: '#9189ae',
  pink: '#ff2e93',
  cyan: '#19e3f5',
  orange: '#ff8a3d',
  yellow: '#ffc857',
  violet: '#8b5cf6',
  ok: '#4ade80',
  danger: '#ff6b6b',
  warn: '#ffc857',
};

const CATEGORIES = {
  'pre-launch': { label: 'Pre-launch', color: COLORS.pink },
  missions: { label: 'Missions', color: '#ff4fa3' },
  money: { label: 'Money', color: '#4ade80' },
  collectibles: { label: 'Collectibles', color: '#c084fc' },
  vehicles: { label: 'Vehicles', color: '#4da3ff' },
  weapons: { label: 'Weapons', color: '#ff6b3d' },
  glitches: { label: 'Glitches & Fixes', color: '#facc15' },
  beginner: { label: 'Beginner Tips', color: '#5eead4' },
  ps5: { label: 'PS5 Settings', color: '#a5b4fc' },
  platforms: { label: 'Platforms', color: '#a5b4fc' },
};

export function category(key) {
  return CATEGORIES[key] || { label: String(key || 'Guide'), color: COLORS.pink };
}

export const DISCLAIMERS = {
  en: 'Unofficial fan site — not affiliated with Rockstar Games',
  sl: 'Neuradna stran oboževalcev — ni povezana z Rockstar Games',
};

export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function measure(text, size, kind = 'regular') {
  const map = { display: 'display', mono: 'mono', semi: 'semi', regular: 'regular' };
  const f = fk(map[kind] || 'regular');
  const run = f.layout(String(text ?? ''));
  return (run.advanceWidth / f.unitsPerEm) * size;
}

export function wrap(text, size, maxW, { font = 'regular', maxLines = 4, label = 'text' } = {}) {
  const words = String(text ?? '').split(/\s+/).filter(Boolean);
  if (!words.length) return [''];
  const lines = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? cur + ' ' + w : w;
    if (measure(next, size, font) <= maxW || !cur) cur = next;
    else {
      lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    let last = kept[maxLines - 1];
    while (last.length && measure(last + '…', size, font) > maxW) last = last.slice(0, -1);
    kept[maxLines - 1] = last.replace(/[.,;:\s]+$/, '') + '…';
    if (label) console.warn('wrap truncated:', label);
    return kept;
  }
  return lines;
}

export function fitText(text, size, maxW, kind = 'regular') {
  let s = String(text ?? '');
  if (measure(s, size, kind) <= maxW) return s;
  while (s.length && measure(s + '…', size, kind) > maxW) s = s.slice(0, -1);
  return s + '…';
}

export function textLines(lines, { x, y, size, lh = 1.25, font = 'regular', fill = COLORS.text1, anchor = 'start' } = {}) {
  const family = font === 'display' ? 'Syne' : font === 'mono' ? 'Space Mono' : 'Inter';
  const weight = font === 'display' ? 800 : font === 'semi' ? 600 : 400;
  return lines
    .map((t, i) => `<text x="${x}" y="${y + i * size * lh}" text-anchor="${anchor}" font-family="${family}" font-weight="${weight}" font-size="${size}" fill="${fill}">${esc(t)}</text>`)
    .join('');
}

export function chip(x, y, label, color) {
  const text = String(label || '').toUpperCase();
  const tw = measure(text, 16, 'semi') + 44;
  const svg =
    `<rect x="${x}" y="${y}" width="${tw}" height="40" rx="20" fill="${COLORS.bg1}" stroke="${color}" stroke-opacity=".7" stroke-width="1.5"/>` +
    `<circle cx="${x + 18}" cy="${y + 20}" r="5" fill="${color}"/>` +
    `<text x="${x + 30}" y="${y + 26}" font-family="Inter" font-weight="600" font-size="16" letter-spacing="0.8" fill="${COLORS.text1}">${esc(text)}</text>`;
  return { svg, w: tw, h: 40 };
}

export function need(d, keys, type) {
  for (const k of keys) if (d[k] == null || d[k] === '') throw new Error(`${type}: missing ${k}`);
}

export function warn(msg) {
  console.warn(msg);
}

function logoPath() {
  const cands = [
    path.join(here, '..', 'design', 'logo', 'wordmark-horizontal.svg'),
    '/workspace/gta6-guides/design/logo/wordmark-horizontal.svg',
    '/workspace/gta6-design-work/design/logo/wordmark-horizontal.svg',
  ];
  return cands.find((p) => fs.existsSync(p));
}

let logoUriCache;
export function logoDataUri() {
  if (logoUriCache) return logoUriCache;
  const p = logoPath();
  if (!p) return '';
  const b64 = fs.readFileSync(p).toString('base64');
  logoUriCache = `data:image/svg+xml;base64,${b64}`;
  return logoUriCache;
}

export function frame(w, h, accent, body, d = {}) {
  const footer = d.footer !== false;
  const disclaimer = d.disclaimer || DISCLAIMERS[d.locale] || DISCLAIMERS.en;
  const grid = Array.from({ length: Math.floor(w / 60) }, (_, i) => `<path d="M${(i + 1) * 60} 0V${h}" stroke="#fff" stroke-opacity=".025"/>`).join('');
  const logo = logoDataUri();
  const foot = footer
    ? `<path d="M40 ${h - 62}H${w - 40}" stroke="${COLORS.line1}"/>
<text x="40" y="${h - 26}" font-family="Inter" font-weight="400" font-size="19" fill="${COLORS.text3}">${esc(disclaimer)}</text>
${logo ? `<image href="${logo}" x="${w - 40 - 150}" y="${h - 54}" width="150" height="35"/>` : ''}`
    : '';
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="topbar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ff8a3d"/>
      <stop offset="55%" stop-color="#ff2e93"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
    <clipPath id="card"><rect width="${w}" height="${h}" rx="28"/></clipPath>
  </defs>
  <g clip-path="url(#card)">
    <rect width="${w}" height="${h}" fill="${COLORS.bg0}"/>
    <circle cx="${w - 80}" cy="90" r="240" fill="${accent}" fill-opacity=".07"/>
    ${grid}
    <rect width="${w}" height="6" fill="url(#topbar)"/>
    ${body}
    ${foot}
  </g>
  <rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="27" fill="none" stroke="${COLORS.line1}" stroke-width="2"/>
</svg>`;
}
