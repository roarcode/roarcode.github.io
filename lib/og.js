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
import { DIRS, site } from "./site.js";
import { escapeXml, truncate } from "./util.js";

const PLACEHOLDER_TEMPLATE = new URL("./og-placeholder.svg", import.meta.url);

const tokenRe = (name) => new RegExp(`(?:\\{\\{\\s*${name}\\s*\\}\\}|\\$\\{${name}\\}|\\{${name}\\}|%${name}%|__${name}__|\\[\\[${name}\\]\\])`, "gi");

/** Greedy word-wrap by an estimated glyph width (SVG has no auto-wrap). */
function wrap(text, maxChars, maxLines) {
  const words = text.split(/\s+/);
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxChars && cur) {
      lines.push(cur);
      cur = w;
    } else cur = (cur + " " + w).trim();
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = truncate(lines.slice(maxLines - 1).join(" "), maxChars).replace(/…$/, "") + "…";
    return kept;
  }
  return lines;
}

function fillTitle(svg, title) {
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
  const avail = anchor === "middle" ? 1200 - 160 : 1200 - x - 64;
  // Glyph width estimate: Syne ExtraBold (the headline face) is wide, ~0.78em per character.
  // Shrink the font a little (max 2 steps) before resorting to an ellipsis, so long titles stay whole.
  let lines;
  for (const k of [1, 0.84, 0.72]) {
    lines = wrap(title, Math.max(10, Math.floor(avail / (size * k * 0.78))), 3);
    if (!lines[lines.length - 1].endsWith("…") || k === 0.72) { size = Math.round(size * k); break; }
  }
  const sized = open.replace(/font-size=["'][\d.]+["']/, `font-size="${size}"`);
  const tspans = lines.map((l, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : (size * 1.15).toFixed(1)}">${escapeXml(l)}</tspan>`).join("");
  return `${sized}${tspans}${close}`;
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

export function generateOgImages(content, assets) {
  const templateFile = assets.ogTemplate || PLACEHOLDER_TEMPLATE;
  const usingPlaceholderTemplate = !assets.ogTemplate;
  const template = fs.readFileSync(templateFile, "utf8");
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
    const key = crypto.createHash("sha1").update(svg + fontKey).digest("hex");
    const cacheFile = path.join(cacheDir, key + ".png");
    const dest = path.join(DIRS.out, j.out);
    try {
      if (fs.existsSync(cacheFile)) cached++;
      else {
        fs.writeFileSync(cacheFile, render(svg, assets.ogFontFiles));
        rendered++;
      }
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(cacheFile, dest);
    } catch (e) {
      failed++;
      console.warn(`[og] failed for "${j.title}": ${e.message}`);
      if (assets.ogDefault) fs.copyFileSync(assets.ogDefault, dest); // never leave a dead og:image URL
    }
  }

  // site-wide default
  const defDest = path.join(outDir, "default.png");
  if (assets.ogDefault) fs.copyFileSync(assets.ogDefault, defDest);
  else fs.writeFileSync(defDest, render(fill(template, { title: site.name, category: "Unofficial GTA VI guides", updated: "", site: site.name, tagline: site.tagline }), assets.ogFontFiles));

  console.log(`[og] ${jobs.length} images (${rendered} rendered, ${cached} cached, ${failed} failed) template=${usingPlaceholderTemplate ? "built-in placeholder" : path.relative(DIRS.root, templateFile)} default=${assets.ogDefault ? path.relative(DIRS.root, assets.ogDefault) : "generated"}`);
}
