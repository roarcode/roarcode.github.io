// Image types for the Leonida Guides pipeline.
import {
  COLORS as C, category, esc, wrap, textLines, fitText, frame, chip, measure, warn, need,
} from './lib.mjs';

const catOf = (d) => {
  const c = category(d.category);
  return d.category_label ? { ...c, label: d.category_label } : c;
};

const STATUS = {
  ok: (c) => `<circle cx="16" cy="16" r="15" fill="${c}" fill-opacity=".18" stroke="${c}" stroke-width="2.5"/><path d="M9 16.5l5 5 10-12" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
  no: (c) => `<circle cx="16" cy="16" r="15" fill="${c}" fill-opacity=".18" stroke="${c}" stroke-width="2.5"/><path d="M10 10l12 12M22 10L10 22" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`,
  check: (c) => `<circle cx="16" cy="16" r="15" fill="none" stroke="${c}" stroke-width="2.5"/><path d="M9 16.5l5 5 10-12" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
};

function header(d, cat, y, titleSize = 44) {
  const PADX = 40;
  const W = 1200;
  let body = '';
  const ch = chip(PADX, y, cat.label, cat.color);
  body += ch.svg;
  if (d.banner) {
    const banner = String(d.banner);
    const bw = measure(banner.toUpperCase(), 16, 'mono') + 28;
    body += `<rect x="${W - PADX - bw}" y="${y}" width="${bw}" height="40" rx="20" fill="${C.bg1}" stroke="${C.cyan}" stroke-opacity=".55" stroke-width="1.5"/>`
          + `<text x="${W - PADX - bw / 2}" y="${y + 26}" text-anchor="middle" font-family="Space Mono" font-size="16" letter-spacing="1.2" fill="${C.cyan}">${esc(banner.toUpperCase())}</text>`;
  }
  y += 86;
  const tl = wrap(d.title, titleSize, W - 2 * PADX, { font: 'display', maxLines: 2, label: 'title' });
  body += textLines(tl, { x: PADX, y, size: titleSize, lh: 1.15, font: 'display' });
  y += (tl.length - 1) * titleSize * 1.15;
  if (d.subtitle) {
    y += 40;
    const sl = wrap(d.subtitle, 24, W - 2 * PADX, { maxLines: 2, label: 'subtitle' });
    body += textLines(sl, { x: PADX, y, size: 24, fill: C.text2 });
    y += (sl.length - 1) * 24 * 1.25;
  }
  y += 28;
  return { body, y };
}

function footerNote(body, d, y, W, PADX) {
  if (!d.note) return { body, y };
  y += 8;
  const nl = wrap(d.note, 22, W - 2 * PADX, { maxLines: 3, label: 'note' });
  body += textLines(nl, { x: PADX, y, size: 22, lh: 1.35, fill: C.text3 });
  y += nl.length * 22 * 1.35;
  return { body, y };
}

export function compareTable(d) {
  need(d, ['title', 'columns', 'rows'], 'compare-table');
  const W = 1200, cat = catOf(d), PADX = 40;
  let { body, y } = header(d, cat, 36);
  const cols = d.columns;
  const rows = d.rows;
  const colW = (W - 2 * PADX) / cols.length;
  const headH = 56, rowH = 78;
  const tableH = headH + rows.length * rowH;
  body += `<rect x="${PADX}" y="${y}" width="${W - 2 * PADX}" height="${tableH}" rx="18" fill="${C.bg1}" stroke="${C.line2}" stroke-width="2"/>`;
  body += `<rect x="${PADX}" y="${y}" width="${W - 2 * PADX}" height="${headH}" rx="18" fill="${C.bg3}"/>`
        + `<rect x="${PADX}" y="${y + headH - 18}" width="${W - 2 * PADX}" height="18" fill="${C.bg3}"/>`;
  cols.forEach((c, i) => {
    body += `<text x="${PADX + 24 + i * colW}" y="${y + 36}" font-family="Space Mono" font-size="16" letter-spacing="1" fill="${C.text3}">${esc(fitText(String(c).toUpperCase(), 16, colW - 36, 'mono'))}</text>`;
  });
  rows.forEach((r, ri) => {
    const cy = y + headH + ri * rowH;
    if (ri) body += `<path d="M${PADX + 16} ${cy}H${W - PADX - 16}" stroke="${C.line1}"/>`;
    (Array.isArray(r) ? r : []).forEach((cell, i) => {
      const kind = i === 0 ? 'semi' : 'regular';
      const lines = wrap(String(cell), 22, colW - 36, { font: kind, maxLines: 2, label: 'cell' });
      const ty = cy + (rowH - (lines.length - 1) * 26) / 2 + 8;
      body += textLines(lines, { x: PADX + 24 + i * colW, y: ty, size: 22, lh: 1.2, font: kind });
    });
  });
  y += tableH + 24;
  ({ body, y } = footerNote(body, d, y, W, PADX));
  const H = Math.ceil(Math.max(675, y + 90));
  return { svg: frame(W, H, cat.color, body, d), w: W, h: H };
}

export function barChart(d) {
  need(d, ['title', 'bars'], 'bar-chart');
  const W = 1200, cat = catOf(d), PADX = 40;
  const bars = d.bars.map((b) => (typeof b === 'object' ? b : { label: String(b) }));
  if (bars.length > 8) warn('bar-chart: more than 8 bars');
  let { body, y } = header(d, cat, 36);
  const numeric = bars.map((b) => (b.value == null || b.value === '' || Number.isNaN(Number(b.value)) ? 0 : Number(b.value)));
  const maxV = Math.max(1, ...(d.max != null ? [Number(d.max)] : numeric));
  const BARW = W - 2 * PADX - 8;
  bars.forEach((b) => {
    const unknown = b.value == null || b.value === '' || Number.isNaN(Number(b.value)) || b.unknown;
    const display = b.display || (unknown ? (b.unknown_label || 'Not announced') : String(b.value));
    const fill = unknown ? C.line3 : (b.highlight ? cat.color : cat.color);
    body += `<text x="${PADX}" y="${y + 20}" font-family="Inter" font-weight="600" font-size="24" fill="${C.text1}">${esc(fitText(b.label, 24, BARW - 240, 'semi'))}</text>`
          + `<text x="${PADX + BARW}" y="${y + 20}" text-anchor="end" font-family="Space Mono" font-size="20" fill="${unknown ? C.text3 : C.text2}">${esc(fitText(display, 20, 240, 'mono'))}</text>`;
    const ty = y + 32;
    const frac = unknown ? 0.12 : Math.max(0.04, Math.min(1, Number(b.value) / maxV));
    body += `<rect x="${PADX}" y="${ty}" width="${BARW}" height="36" rx="18" fill="${C.bg2}"/>`
          + `<rect x="${PADX}" y="${ty}" width="${BARW * frac}" height="36" rx="18" fill="${fill}" fill-opacity="${unknown ? .45 : 1}"/>`;
    y += 88;
  });
  ({ body, y } = footerNote(body, d, y, W, PADX));
  const H = Math.ceil(Math.max(675, y + 90));
  return { svg: frame(W, H, cat.color, body, d), w: W, h: H };
}

export function infoCards(d) {
  need(d, ['title', 'cards'], 'info-cards');
  const W = 1200, cat = catOf(d), PADX = 40;
  const cards = d.cards;
  if (cards.length > 6) warn('info-cards: more than 6 cards');
  let { body, y } = header(d, cat, 36);
  const n = cards.length, gap = 24, flow = d.layout === 'flow';
  const cols = d.cols || (n <= 4 && !flow ? (n === 4 ? 2 : n) : n);
  const rowsN = Math.ceil(n / cols);
  const arrow = flow ? 36 : 0;
  const cw = (W - 2 * PADX - (cols - 1) * (gap + arrow)) / cols;
  const chgt = d.card_height || (rowsN === 1 ? 260 : 200);
  cards.forEach((c, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const x = PADX + col * (cw + gap + arrow);
    const cy = y + row * (chgt + gap);
    const st = c.status || 'none';
    const scol = st === 'ok' || st === 'check' ? C.ok : st === 'no' ? C.danger : cat.color;
    body += `<rect x="${x}" y="${cy}" width="${cw}" height="${chgt}" rx="18" fill="${C.bg1}" stroke="${C.line2}" stroke-width="2"/>`
          + `<rect x="${x}" y="${cy}" width="8" height="${chgt}" rx="4" fill="${st === 'none' ? cat.color : scol}"/>`;
    let ty = cy + 48;
    if (st !== 'none' && STATUS[st]) {
      body += `<g transform="translate(${x + 28} ${cy + 24})">${STATUS[st](scol)}</g>`;
      ty = cy + 80;
    }
    const titleLines = wrap(c.title || '', 26, cw - 48, { font: 'semi', maxLines: 2, label: 'card title' });
    body += textLines(titleLines, { x: x + 28, y: ty, size: 26, lh: 1.2, font: 'semi' });
    ty += titleLines.length * 32 + 16;
    if (c.body) {
      const bl = wrap(c.body, 22, cw - 48, { maxLines: 5, label: 'card body' });
      body += textLines(bl, { x: x + 28, y: ty, size: 22, lh: 1.35, fill: C.text2 });
    }
    if (flow && col < cols - 1) {
      const ax = x + cw + 6, ay = cy + chgt / 2;
      body += `<path d="M${ax} ${ay}H${ax + arrow - 10}" stroke="${C.cyan}" stroke-width="3" fill="none"/>`
            + `<path d="M${ax + arrow - 16} ${ay - 7}L${ax + arrow - 4} ${ay}L${ax + arrow - 16} ${ay + 7}" fill="${C.cyan}"/>`;
    }
  });
  y += rowsN * chgt + (rowsN - 1) * gap + 24;
  ({ body, y } = footerNote(body, d, y, W, PADX));
  const H = Math.ceil(Math.max(675, y + 90));
  return { svg: frame(W, H, cat.color, body, d), w: W, h: H };
}

export function menuMock(d) {
  need(d, ['title', 'rows'], 'menu-mock');
  const W = 1200, cat = catOf(d), PADX = 40;
  const rows = d.rows.map((r, i) => {
    if (Array.isArray(r)) return { label: String(r[0] ?? ''), value: String(r[1] ?? ''), highlight: d.highlightRow === i };
    return { label: String(r.label ?? ''), value: String(r.value ?? ''), highlight: !!(r.highlight || d.highlightRow === i) };
  });
  if (rows.length > 8) warn('menu-mock: more than 8 rows — consider splitting');
  const banner = d.banner || 'Illustration — not an in-game screenshot';
  const d2 = { ...d, banner };
  let { body, y } = header(d2, cat, 36);
  const PH = 64, rowH = 70, panelX = PADX, panelW = W - 2 * PADX;
  const panelH = PH + rows.length * rowH;
  const panelY = y;
  body += `<rect x="${panelX}" y="${panelY}" width="${panelW}" height="${panelH}" rx="18" fill="${C.bg1}" stroke="${C.line2}" stroke-width="2"/>`
        + `<rect x="${panelX}" y="${panelY}" width="${panelW}" height="${PH}" rx="18" fill="${C.bg3}"/>`
        + `<rect x="${panelX}" y="${panelY + PH - 18}" width="${panelW}" height="18" fill="${C.bg3}"/>`
        + `<circle cx="${panelX + 28}" cy="${panelY + PH / 2}" r="6" fill="${cat.color}"/>`
        + `<circle cx="${panelX + 50}" cy="${panelY + PH / 2}" r="6" fill="${C.cyan}" fill-opacity=".7"/>`
        + `<circle cx="${panelX + 72}" cy="${panelY + PH / 2}" r="6" fill="${C.orange}" fill-opacity=".7"/>`;
  const ptitle = d.panel_title || 'Settings';
  const ptw = panelW - 160 - (d.platform ? 160 : 0);
  body += `<text x="${panelX + 96}" y="${panelY + 40}" font-family="Inter" font-weight="600" font-size="24" fill="${C.text1}">${esc(fitText(ptitle, 24, ptw, 'semi'))}</text>`;
  if (d.platform) {
    const pl = String(d.platform).toUpperCase();
    const pw = measure(pl, 16, 'mono') + 28;
    body += `<rect x="${panelX + panelW - 20 - pw}" y="${panelY + (PH - 32) / 2}" width="${pw}" height="32" rx="10" fill="${C.bg0}" stroke="${C.line3}"/>`
          + `<text x="${panelX + panelW - 20 - pw / 2}" y="${panelY + PH / 2 + 6}" text-anchor="middle" font-family="Space Mono" font-size="16" fill="${C.text2}">${esc(pl)}</text>`;
  }
  rows.forEach((r, i) => {
    const ry = panelY + PH + i * rowH;
    if (i) body += `<path d="M${panelX + 20} ${ry}H${panelX + panelW - 20}" stroke="${C.line1}"/>`;
    if (r.highlight) {
      body += `<rect x="${panelX + 8}" y="${ry + 6}" width="${panelW - 16}" height="${rowH - 12}" rx="10" fill="${cat.color}" fill-opacity=".16"/>`
            + `<rect x="${panelX}" y="${ry + 10}" width="6" height="${rowH - 20}" rx="3" fill="${cat.color}"/>`;
    }
    body += `<text x="${panelX + 28}" y="${ry + 44}" font-family="Inter" font-weight="600" font-size="24" fill="${C.text1}">${esc(fitText(r.label, 24, panelW * 0.5, 'semi'))}</text>`
          + `<text x="${panelX + panelW - 28}" y="${ry + 44}" text-anchor="end" font-family="Inter" font-size="22" fill="${C.text2}">${esc(fitText(r.value, 22, panelW * 0.42, 'regular'))}</text>`;
  });
  y = panelY + panelH + 24;
  ({ body, y } = footerNote(body, d, y, W, PADX));
  const H = Math.ceil(Math.max(675, y + 90));
  return { svg: frame(W, H, cat.color, body, d), w: W, h: H };
}

export function stepCard(d) {
  need(d, ['title', 'steps'], 'step-card');
  const W = 1200, cat = catOf(d), PADX = 40;
  const steps = d.steps;
  let { body, y } = header(d, cat, 36);
  const n = steps.length, gap = 20;
  const cw = (W - 2 * PADX - (n - 1) * gap) / Math.min(n, 4);
  const chgt = d.card_height || 240;
  const cols = Math.min(n, 4);
  steps.forEach((s, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const x = PADX + col * (cw + gap);
    const cy = y + row * (chgt + gap);
    body += `<rect x="${x}" y="${cy}" width="${cw}" height="${chgt}" rx="18" fill="${C.bg1}" stroke="${C.line2}" stroke-width="2"/>`;
    body += `<circle cx="${x + 40}" cy="${cy + 44}" r="22" fill="none" stroke="${cat.color}" stroke-width="3"/>`
          + `<text x="${x + 40}" y="${cy + 52}" text-anchor="middle" font-family="Syne" font-weight="800" font-size="24" fill="${C.text1}">${i + 1}</text>`;
    const title = typeof s === 'string' ? s : (s.title || '');
    const blurb = typeof s === 'string' ? '' : (s.body || s.text || '');
    const tl = wrap(title, 24, cw - 40, { font: 'semi', maxLines: 3, label: 'step' });
    body += textLines(tl, { x: x + 20, y: cy + 90, size: 24, lh: 1.2, font: 'semi' });
    if (blurb) {
      const bl = wrap(blurb, 20, cw - 40, { maxLines: 4, label: 'step body' });
      body += textLines(bl, { x: x + 20, y: cy + 90 + tl.length * 30 + 8, size: 20, lh: 1.3, fill: C.text2 });
    }
  });
  const rowsN = Math.ceil(n / cols);
  y += rowsN * chgt + (rowsN - 1) * gap + 24;
  ({ body, y } = footerNote(body, d, y, W, PADX));
  const H = Math.ceil(Math.max(675, y + 90));
  return { svg: frame(W, H, cat.color, body, d), w: W, h: H };
}


export function saveSlots(d) {
  need(d, ['title'], 'save-slots');
  const W = 1200, cat = catOf(d), PADX = 40;
  let { body, y } = header(d, cat, 36);
  const total = Number(d.slots || 15);
  const cols = Number(d.cols || 5);
  const rowsN = Math.ceil(total / cols);
  const gap = 16;
  const avail = W - 2 * PADX;
  const sw = (avail - (cols - 1) * gap) / cols;
  const sh = 88;
  const autoIndex = d.autosave_index == null ? 0 : Number(d.autosave_index);
  for (let i = 0; i < total; i++) {
    const col = i % cols, row = Math.floor(i / cols);
    const x = PADX + col * (sw + gap);
    const cy = y + row * (sh + gap);
    const isAuto = i === autoIndex;
    body += `<rect x="${x}" y="${cy}" width="${sw}" height="${sh}" rx="14" fill="${isAuto ? C.bg3 : C.bg1}" stroke="${isAuto ? cat.color : C.line2}" stroke-width="${isAuto ? 3 : 2}"/>`;
    const label = isAuto ? (d.autosave_label || 'Autosave') : String(autoIndex < 0 ? i + 1 : i);
    body += `<text x="${x + sw / 2}" y="${cy + sh / 2 + 8}" text-anchor="middle" font-family="Inter" font-weight="600" font-size="${isAuto ? 22 : 24}" fill="${C.text1}">${esc(label)}</text>`;
  }
  const gridH = rowsN * sh + (rowsN - 1) * gap;
  if (d.callout) {
    const cx = PADX + (autoIndex % cols) * (sw + gap) + sw / 2;
    const cy = y + Math.floor(autoIndex / cols) * (sh + gap) + sh + 8;
    // place callout under the grid, centred
  }
  y += gridH + 28;
  if (d.callout) {
    const label = String(d.callout);
    const tw = measure(label, 22, 'semi') + 40;
    body += `<rect x="${(W - tw) / 2}" y="${y}" width="${tw}" height="48" rx="16" fill="${C.bg1}" stroke="${cat.color}" stroke-width="2"/>`
          + `<text x="${W / 2}" y="${y + 32}" text-anchor="middle" font-family="Inter" font-weight="600" font-size="22" fill="${C.text1}">${esc(label)}</text>`;
    y += 64;
  }
  ({ body, y } = footerNote(body, d, y, W, PADX));
  const H = Math.ceil(Math.max(675, y + 90));
  return { svg: frame(W, H, cat.color, body, d), w: W, h: H };
}

export function sketch(d) {
  if (d.motif === 'save-slots') return saveSlots(d);
  throw new Error('sketch: unsupported motif ' + (d.motif || ''));
}


// Generic gamepad diagram (no brand logos). d.controllers: [{label, l:"L1", r:"R1"}],
// d.highlight: ["dpad-up"] | ["shoulders"], d.phone: true adds a phone icon with an arrow.
function padSvg(cx, cy, s, ctl, hl, accent) {
  const w = 440 * s, h = 250 * s, x = cx - w / 2, y = cy - h / 2;
  const hs = (k) => hl.includes(k);
  let o = '';
  // shoulder buttons
  const sw = 120 * s, sh = 34 * s;
  [['l', x + 50 * s], ['r', x + w - 50 * s - sw]].forEach(([k, sx]) => {
    const on = hs('shoulders') || hs(k === 'l' ? 'left-shoulder' : 'right-shoulder');
    o += `<rect x="${sx}" y="${y - sh + 6 * s}" width="${sw}" height="${sh}" rx="${12 * s}" fill="${on ? accent : C.bg3}" fill-opacity="${on ? .9 : 1}" stroke="${on ? accent : C.line3}" stroke-width="2"/>`;
    const lab = k === 'l' ? (ctl.l || 'L1') : (ctl.r || 'R1');
    o += `<text x="${sx + sw / 2}" y="${y - sh / 2 + 14 * s}" text-anchor="middle" font-family="Inter" font-weight="600" font-size="${Math.round(24 * s)}" fill="${on ? C.bg0 : C.text2}">${esc(lab)}</text>`;
  });
  // body
  o += `<path d="M${x + 70 * s} ${y} H${x + w - 70 * s} Q${x + w} ${y} ${x + w} ${y + 90 * s} L${x + w - 10 * s} ${y + h - 30 * s} Q${x + w - 30 * s} ${y + h + 20 * s} ${x + w - 110 * s} ${y + h - 30 * s} L${x + w - 150 * s} ${y + h - 70 * s} H${x + 150 * s} L${x + 110 * s} ${y + h - 30 * s} Q${x + 30 * s} ${y + h + 20 * s} ${x + 10 * s} ${y + h - 30 * s} L${x} ${y + 90 * s} Q${x} ${y} ${x + 70 * s} ${y} Z" fill="${C.bg1}" stroke="${C.line3}" stroke-width="3"/>`;
  // d-pad
  const dx = x + 100 * s, dy = y + 95 * s, a = 22 * s;
  const arm = (k, rx, ry) => {
    const on = hs('dpad-' + k);
    return `<rect x="${rx}" y="${ry}" width="${a}" height="${a}" rx="${4 * s}" fill="${on ? accent : C.bg3}" stroke="${on ? accent : C.line3}" stroke-width="2"/>`;
  };
  o += arm('up', dx - a / 2, dy - a * 1.5) + arm('down', dx - a / 2, dy + a / 2) + arm('left', dx - a * 1.5, dy - a / 2) + arm('right', dx + a / 2, dy - a / 2);
  o += `<rect x="${dx - a / 2}" y="${dy - a / 2}" width="${a}" height="${a}" fill="${C.bg3}"/>`;
  if (hs('dpad-up')) o += `<circle cx="${dx}" cy="${dy - a}" r="${30 * s}" fill="none" stroke="${accent}" stroke-width="3"/>`;
  // face buttons
  const fx = x + w - 100 * s, fy = y + 95 * s, r = 13 * s;
  [[0, -1], [0, 1], [-1, 0], [1, 0]].forEach(([i, j]) => { o += `<circle cx="${fx + i * 30 * s}" cy="${fy + j * 30 * s}" r="${r}" fill="${C.bg3}" stroke="${C.line3}" stroke-width="2"/>`; });
  // sticks
  [['left-stick', x + 165 * s], ['right-stick', x + w - 165 * s]].forEach(([k, sx]) => {
    const on = hs(k);
    o += `<circle cx="${sx}" cy="${y + 155 * s}" r="${26 * s}" fill="${on ? accent : C.bg2}" stroke="${on ? accent : C.line3}" stroke-width="2"/>`;
    if (on) o += `<circle cx="${sx}" cy="${y + 155 * s}" r="${36 * s}" fill="none" stroke="${accent}" stroke-width="3"/>`;
  });
  if (ctl.label) o += `<text x="${cx}" y="${y + h + 60 * s}" text-anchor="middle" font-family="Inter" font-weight="600" font-size="26" fill="${C.text1}">${esc(ctl.label)}</text>`;
  return o;
}

function phoneSvg(px, py, accent) {
  return `<rect x="${px}" y="${py}" width="120" height="210" rx="20" fill="${C.bg1}" stroke="${accent}" stroke-width="4"/>`
       + `<rect x="${px + 12}" y="${py + 26}" width="96" height="150" rx="8" fill="${C.bg3}"/>`
       + [0, 1, 2].map((r) => [0, 1, 2].map((c) => `<rect x="${px + 22 + c * 28}" y="${py + 40 + r * 30}" width="20" height="20" rx="5" fill="${accent}" fill-opacity=".55"/>`).join('')).join('')
       + `<circle cx="${px + 60}" cy="${py + 192}" r="8" fill="none" stroke="${C.line3}" stroke-width="2"/>`;
}

export function controller(d) {
  need(d, ['title', 'controllers'], 'controller');
  const W = 1200, cat = catOf(d), PADX = 40;
  const accent = d.accent === 'cyan' ? C.cyan : cat.color;
  let { body, y } = header(d, cat, 36);
  const hl = d.highlight || [];
  const n = d.controllers.length;
  const s = n > 1 ? 1 : 1.1;
  const top = y + 60;
  const cy = top + 140 * s;
  if (n === 1) {
    const cx = d.phone ? 470 : W / 2;
    body += padSvg(cx, cy, s, d.controllers[0], hl, accent);
    if (d.phone) {
      const ax = cx + 270, ay = cy;
      body += `<path d="M${ax} ${ay}H${ax + 150}" stroke="${C.cyan}" stroke-width="5" fill="none"/>`
            + `<path d="M${ax + 140} ${ay - 14}L${ax + 165} ${ay}L${ax + 140} ${ay + 14}" fill="${C.cyan}"/>`;
      body += phoneSvg(ax + 190, cy - 105, accent);
      if (d.phone_label) body += `<text x="${ax + 250}" y="${cy + 150}" text-anchor="middle" font-family="Inter" font-weight="600" font-size="24" fill="${C.text1}">${esc(d.phone_label)}</text>`;
    }
  } else {
    d.controllers.forEach((c, i) => { body += padSvg(PADX + (W - 2 * PADX) * (i + 0.5) / n, cy, s, c, hl, accent); });
  }
  y = cy + 140 * s + 90;
  if (d.callout) {
    const cl = wrap(d.callout, 26, W - 2 * PADX, { font: 'semi', maxLines: 2, label: 'callout' });
    body += textLines(cl, { x: W / 2, y, size: 26, lh: 1.25, font: 'semi', anchor: 'middle' });
    y += cl.length * 34;
  }
  ({ body, y } = footerNote(body, d, y, W, PADX));
  const H = Math.ceil(Math.max(675, y + 90));
  return { svg: frame(W, H, cat.color, body, d), w: W, h: H };
}

export const TYPES = {
  controller,
  'compare-table': compareTable,
  'bar-chart': barChart,
  'info-cards': infoCards,
  'menu-mock': menuMock,
  'step-card': stepCard,
  'save-slots': saveSlots,
  sketch,
};
