// Rendering hardening shared by the markdown pipeline (kept separate from markdown.js so edits don't collide).
//  * authoring comments  <!-- ... -->            -> removed before parsing (never shown, never escaped to text)
//  * official twitter-tweet blockquotes          -> rewritten to a bare status URL (-> the same safe X embed as :::x)
//  * relative guide links  foo.md / ./foo.md#x   -> /__md/foo#x, resolved to real URLs once all guides are known
//  * image slots  ![alt](TODO: image:<slot> ...) -> real <figure><img><figcaption> from site-images/, or NOTHING
//    (a designed placeholder only with SHOW_DRAFTS=1 locally); the raw TODO text can never reach the output
//  * "X|S" inside table cells                    -> escaped pipe
//  * headings with no content under them         -> removed (e.g. an empty "What players are saying")
import fs from "node:fs";
import path from "node:path";
import { escapeHtml } from "./util.js";
import { DIRS, href } from "./site.js";

const SHOW_DRAFTS = process.env.SHOW_DRAFTS === "1" && !process.env.CI && process.env.NODE_ENV !== "production";

const SLOT_LINE = /^[ \t]*!\[([^\]\n]*)\]\(\s*TODO:\s*image:([a-z0-9][\w-]*)[^\n]*\)[ \t]*$/gim;
const SLOT_BARE = /^[ \t]*image:([a-z0-9][\w-]*)[ \t]*$/gim;
const slotMd = (alt, slot) => `![${String(alt).replace(/[\[\]]/g, "")}](/__slot/${slot})`;
// Only a genuine official embed qualifies: blockquote.twitter-tweet whose link is an x.com/twitter.com status URL.
const TWEET_BQ = /<blockquote\s+class="twitter-tweet"[^>]*>[\s\S]*?<\/blockquote>/gi;
const STATUS_HREF = /href="(https?:\/\/(?:www\.)?(?:twitter|x)\.com\/\w{1,15}\/status\/\d{5,25})(?:[?#][^"]*)?"/i;

export const prepareSource = (src) =>
  src
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(TWEET_BQ, (m) => {
      const u = (m.match(STATUS_HREF) || [])[1];
      return u ? `\n\n${u}\n\n` : m; // anything else stays escaped text (raw HTML is disabled)
    })
    .replace(SLOT_LINE, (_m, alt, slot) => slotMd(alt, slot))
    .replace(SLOT_BARE, (_m, slot) => slotMd("", slot))
    .replace(/\bX\|S\b/g, "X\\|S");

let cache = { mtime: 0, data: {} };
function manifest() {
  const f = path.join(DIRS.root, "site-images", "_manifest.json");
  try {
    const m = fs.statSync(f).mtimeMs;
    if (m !== cache.mtime) cache = { mtime: m, data: JSON.parse(fs.readFileSync(f, "utf8")) };
  } catch {
    cache = { mtime: 0, data: {} };
  }
  return cache.data;
}
const slotEntry = (slot) => {
  const e = manifest()[slot];
  return e && fs.existsSync(path.join(DIRS.root, "site-images", e.file)) ? e : null;
};

const isSlotImg = (t) => t && t.type === "image" && (t.attrGet("src") || "").startsWith("/__slot/");

function figureHtml(md, slot, alt, captionHtml) {
  const e = slotEntry(slot);
  if (!e) {
    if (!SHOW_DRAFTS) return "";
    return `<figure class="figure figure--pending" data-pagefind-ignore><div class="figure__pending-box" aria-hidden="true"><span class="figure__pending-tag">Image coming soon (${escapeHtml(slot)})</span></div></figure>\n`;
  }
  const img = `<img src="${escapeHtml(href("/site-images/" + e.file))}" alt="${escapeHtml(e.alt || alt)}" width="${e.width}" height="${e.height}" loading="lazy" decoding="async">`;
  return `<figure class="figure figure--slot" data-slot="${escapeHtml(slot)}">${img}${captionHtml ? `<figcaption>${captionHtml}</figcaption>` : ""}</figure>\n`;
}

export function installExtras(md) {
  // 1) relative guide links
  const prevLink = md.renderer.rules.link_open || ((t, i, o, e, s) => s.renderToken(t, i, o));
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const t = tokens[idx];
    const m = (t.attrGet("href") || "").match(/^(?:\.\/)?([a-z0-9][\w-]*)\.md(#[\w-]*)?$/i);
    if (m) t.attrSet("href", `/__md/${m[1].toLowerCase()}${m[2] || ""}`);
    return prevLink(tokens, idx, options, env, self);
  };

  // 2) a slot image outside the figure rule (inline use) renders as a figure/nothing, never as <img src="/__slot/..">
  const prevImg = md.renderer.rules.image;
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const t = tokens[idx];
    const src = t.attrGet("src") || "";
    if (src.startsWith("/__slot/")) return figureHtml(md, src.slice(8), self.renderInlineAsText(t.children, options, env), "");
    return prevImg(tokens, idx, options, env, self);
  };

  // 3) "<slot image>\n*Caption: ...*"  ->  one figure block with figcaption
  md.core.ruler.push("slot_figure", (state) => {
    const T = state.tokens;
    for (let i = 0; i < T.length - 2; i++) {
      if (T[i].type !== "paragraph_open" || T[i + 1].type !== "inline" || T[i + 2].type !== "paragraph_close") continue;
      const kids = T[i + 1].children || [];
      if (!isSlotImg(kids[0])) continue;
      let rest = kids.slice(1);
      while (rest.length && (rest[0].type === "softbreak" || rest[0].type === "hardbreak")) rest = rest.slice(1);
      let cap = [];
      if (rest.length) {
        if (rest[0].type !== "em_open" || rest[rest.length - 1].type !== "em_close") continue; // mixed content: leave as is
        cap = rest.slice(1, -1);
      }
      const tok = new state.Token("slot_figure", "", 0);
      tok.block = true;
      tok.meta = { slot: kids[0].attrGet("src").slice(8), alt: kids[0].content, cap };
      T.splice(i, 3, tok);
    }
  });
  md.renderer.rules.slot_figure = (tokens, idx, options, env) => {
    const { slot, alt, cap } = tokens[idx].meta;
    let c = cap.length ? md.renderer.renderInline(cap, options, env).replace(/^\s*Caption:\s*/i, "") : "";
    return figureHtml(md, slot, alt, c.trim());
  };
}

/** Drop headings that have nothing under them (next thing is a same/higher heading, the end, or a closing spoiler). */
export function dropEmptySections(html) {
  const re = /<h([1-6])\b[^>]*>(?:(?!<\/h\1>)[\s\S])*<\/h\1>\s*(?=(<h([1-6])\b)|(<\/div><\/details>)|$)/g;
  let prev;
  do {
    prev = html;
    html = html.replace(re, (m, lvl, nextH, nextLvl, closer) => (!nextH || closer || Number(nextLvl) <= Number(lvl) ? "" : m));
  } while (html !== prev);
  return html;
}

/** Turn /__md/<slug>#x placeholders into real guide URLs; unknown targets become plain text. */
export function resolveMdLinks(html, urlBySlug, warn) {
  if (!html || !html.includes("__md/")) return html;
  return html.replace(/<a href="[^"]*?\/__md\/([a-z0-9][\w-]*)(#[\w-]*)?"([^>]*)>([\s\S]*?)<\/a>/g, (_m, slug, frag, attrs, text) => {
    const url = urlBySlug.get(slug);
    if (!url) {
      warn?.(`link to unknown guide "${slug}.md" rendered as plain text`);
      return text;
    }
    return `<a href="${escapeHtml(href(url) + (frag || ""))}"${attrs}>${text}</a>`;
  });
}

/** Old URLs that moved. Written as tiny meta-refresh pages (noindex, canonical -> new URL) and rewritten in internal links. */
export const REDIRECTS = {
  "/beginner-tips/beginner-tips/": "/launch-hub/beginner-tips/",
};
export function rewriteMovedLinks(html) {
  if (!html) return html;
  for (const [from, to] of Object.entries(REDIRECTS)) html = html.split(`href="${href(from)}`).join(`href="${href(to)}`);
  return html;
}
export function redirectPage(to, origin) {
  const dest = href(to);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Moved</title><meta name="robots" content="noindex"><link rel="canonical" href="${escapeHtml(origin + dest)}"><meta http-equiv="refresh" content="0; url=${escapeHtml(dest)}"></head><body data-pagefind-ignore><p>This page moved to <a href="${escapeHtml(dest)}">${escapeHtml(dest)}</a>.</p></body></html>\n`;
}
