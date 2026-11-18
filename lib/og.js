// Open Graph image generation (build time, no browser needed).
//
//   template  = design/og-template.svg (or design/og/og-template.svg) from the Designer kit,
//               else lib/og-placeholder.svg (built-in stand-in so the pipeline is live now).
//   For each guide / category / page the template is string-substituted and rendered to
//   a 1200x630 PNG with resvg-js at  _site/og/<category>-<slug>.png.
//   design/og-default.png is copied to _site/og/default.png (used by home/search/404 and as
//   the fallback if a render fails); if the kit has none, a default is rendered from the template.
//
// Template placeholders (any of these work, case-insensitive):
//   {{title}} {title} %title% __title__ [[title]] ${title}   -> page title (auto-wrapped to <=3 lines
//                                                               when it is the sole content of a <text>)
//   {{category}} {{updated}} {{site}} {{tagline}}            -> optional extras
//   Or give a <text id="title"> element: its content is replaced.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";
import { DIRS, site } from "./site.js";
import { escapeXml, truncate } from "./util.js";

const PLACEHOLDER_TEMPLATE = new URL("./og-placeholder.svg", import.meta.url);

const tokenRe = (name) => new RegExp(`(?:\\{\\{\\s*${name}\\s*\\}\\}|\\$\\{${name}\\}|\\{${name}\\}|%${name}%|__${name}__|\\[\\[${name}\\]\\])`, "gi");

let FONT_FILES = [];
const widthCache = new Map();
/** Real rendered width of `text` (px) in Anton (all caps, like the site headlines) at `size`, measured with resvg (no guessing). */
function measure(text, size) {
  const k = size + "|" + text;
  if (widthCache.has(k)) return widthCache.get(k);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="4000" height="300"><text x="10" y="150" font-family="Anton" font-weight="400" font-size="${size}">${escapeXml(text)}</text></svg>`;
  const bb = new Resvg(svg, { font: { fontFiles: FONT_FILES, loadSystemFonts: FONT_FILES.length === 0 } }).getBBox();
  const w = bb ? bb.width + 0.03 * size : text.length * size * 0.8;
  widthCache.set(k, w);
  return w;
}

/** Greedy word-wrap by measured width. Returns lines (last line ellipsised only if it still overflows). */
function wrap(text, maxWidth, maxLines, size) {
  const words = text.trim().split(/\s+/);
  const lines = [];
  let cur = "";
  for (const w of words) {
    const next = (cur + " " + w).trim();
    if (cur && measure(next, size) > maxWidth) {
      lines.push(cur);
      cur = w;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    let last = lines.slice(maxLines - 1).join(" ");
    while (last.length > 1 && measure(last + "…", size) > maxWidth) last = last.slice(0, -1).trimEnd();
    kept[maxLines - 1] = last + "…";
    return kept;
  }
  return lines;
}

function fillTitle(svg, title) {
  title = String(title).toUpperCase(); // Anton is a caps display face (matches the site headlines)
  const re = tokenRe("title");
  const safe = escapeXml(title);
  // Case 1: placeholder is the sole content of a <text> -> wrap into tspans.
  const textRe = new RegExp(`(<text\\b[^>]*>)\\s*(?:\\{\\{\\s*title\\s*\\}\\}|\\$\\{title\\}|\\{title\\}|%title%|__title__|\\[\\[title\\]\\])\\s*(</text>)`, "gi");
  svg = svg.replace(textRe, (_m, open, close) => wrapInto(open, close, title));
  // Case 2: <text id="title">anything</text>
  svg = svg.replace(/(<text\b[^>]*\bid=["']title["'][^>]*>)[\s\S]*?(<\/text>)/i, (_m, open, close) => wrapInto(open, close, title));
  // Case 3: any remaining inline placeholder (inside a longer string / attribute)
  return svg.replace(re, safe);
}

function wrapInto(open, close, title) {
  const x = Number((open.match(/\bx=["']([\d.]+)/) || [])[1] ?? 80);
  let size = Number((open.match(/font-size[=:]\s*["']?([\d.]+)/) || [])[1] ?? 64);
  const anchor = /text-anchor=["']middle/.test(open) ? "middle" : "start";
  // Keep a 64px margin on the right; measured widths, so nothing can clip at the edge.
  const avail = anchor === "middle" ? 1200 - 160 : 1200 - x - 64;
  // Shrink the font (max 2 steps) before resorting to an ellipsis, so long titles stay whole.
  let lines;
  for (const k of [1, 0.84, 0.72]) {
    const s2 = Math.round(size * k);
    lines = wrap(title, avail, 3, s2);
    if (!lines[lines.length - 1].endsWith("…") || k === 0.72) { size = s2; break; }
  }
  const sized = open.replace(/font-size=["'][\d.]+["']/, `font-size="${size}"`);
  const tspans = lines.map((l, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : (size * 1.15).toFixed(1)}">${escapeXml(l)}</tspan>`).join("");
  return `${sized}${tspans}${close}`;
}

/** The Designer template bakes the "not affiliated" badge as outlined paths (no text to edit). Replace it with live text that also names Take-Two. */
function withBadge(svg) {
  const i = svg.indexOf('<rect x="64" y="540"');
  if (i < 0) return svg;
  const text = site.disclaimer.replace(/\.\s+Not/, " — not").replace(/\.$/, "");
  const w = 62 + Math.round(measureInter(text, 21));
  const badge = `<rect x="64" y="540" width="${w}" height="48" rx="24" fill="#07060C" fill-opacity=".82" stroke="#FF2E93" stroke-opacity=".6"/><circle cx="88" cy="564" r="6" fill="#19E3F5"/><text x="108" y="571" font-family="Inter" font-weight="600" font-size="21" fill="#F4F1FA">${escapeXml(text)}</text>`;
  return svg.slice(0, i) + badge + "\n</svg>\n";
}
function measureInter(text, size) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="4000" height="200"><text x="10" y="100" font-family="Inter" font-weight="600" font-size="${size}">${escapeXml(text)}</text></svg>`;
  const bb = new Resvg(svg, { font: { fontFiles: FONT_FILES, loadSystemFonts: FONT_FILES.length === 0, defaultFontFamily: "Inter" } }).getBBox();
  return bb ? bb.width : text.length * size * 0.6;
}

function fill(template, vars) {
  let svg = fillTitle(template, vars.title);
  for (const k of ["category", "updated", "site", "tagline"]) svg = svg.replace(tokenRe(k), escapeXml(vars[k] ?? ""));
  return svg;
}

function render(svg, fontFiles) {
  const r = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
    font: { fontFiles, loadSystemFonts: fontFiles.length === 0, defaultFontFamily: "Inter" },
  });
  return r.render().asPng();
}

/** PNG -> small progressive JPEG (social crawlers accept PNG or JPEG; a photographic 1200x630 PNG is ~680 KB, this is ~60-90 KB). */
const toJpeg = (png) => sharp(png).jpeg({ quality: 78, mozjpeg: true, progressive: true }).toBuffer();

export async function generateOgImages(content, assets) {
  const templateFile = assets.ogTemplate || PLACEHOLDER_TEMPLATE;
  const usingPlaceholderTemplate = !assets.ogTemplate;
  FONT_FILES = assets.ogFontFiles;
  const template = withBadge(fs.readFileSync(templateFile, "utf8"));
  const outDir = path.join(DIRS.out, "og");
  const cacheDir = path.join(DIRS.cache, "og");
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(cacheDir, { recursive: true });
  const fontKey = assets.ogFontFiles.map((f) => fs.statSync(f).size).join(",");

  const jobs = [
    ...content.guides.map((g) => ({ out: g.ogPath, title: g.title, category: g.category.name, updated: g.updatedLabel })),
    ...content.categories.map((c) => ({ out: c.ogPath, title: c.name, category: "Guides", updated: c.lastUpdatedLabel })),
    ...content.pages.map((p) => ({ out: p.ogPath, title: p.title, category: site.name, updated: p.updatedLabel })),
  ];

  let rendered = 0, cached = 0, failed = 0;
  for (const j of jobs) {
    const vars = { title: j.title, category: j.category, updated: j.updated ? `Updated ${j.updated}` : "", site: site.name, tagline: site.tagline };
    const svg = fill(template, vars);
    const key = crypto.createHash("sha1").update("jpg78" + svg + fontKey).digest("hex");
    const cacheFile = path.join(cacheDir, key + ".jpg");
    const dest = path.join(DIRS.out, j.out);
    try {
      if (fs.existsSync(cacheFile)) cached++;
      else {
        fs.writeFileSync(cacheFile, await toJpeg(render(svg, assets.ogFontFiles)));
        rendered++;
      }
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(cacheFile, dest);
    } catch (e) {
      failed++;
      console.warn(`[og] failed for "${j.title}": ${e.message}`);
      if (fs.existsSync(path.join(outDir, "default.jpg"))) fs.copyFileSync(path.join(outDir, "default.jpg"), dest);
    }
  }

  // site-wide default (always rendered from the template so it carries the same disclaimer badge)
  const defDest = path.join(outDir, "default.jpg");
  fs.writeFileSync(defDest, await toJpeg(render(fill(template, { title: site.name, category: "Unofficial GTA VI guides", updated: "", site: site.name, tagline: site.tagline }), assets.ogFontFiles)));

  console.log(`[og] ${jobs.length} images (${rendered} rendered, ${cached} cached, ${failed} failed) template=${usingPlaceholderTemplate ? "built-in placeholder" : path.relative(DIRS.root, templateFile)} default=${assets.ogDefault ? path.relative(DIRS.root, assets.ogDefault) : "generated"}`);
}
