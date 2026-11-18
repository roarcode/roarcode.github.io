// Markdown rendering for guide bodies.
//  - raw HTML is DISABLED (content may include text pasted from X/Reddit/etc.)
//  - headings get stable ids (+ a table of contents is collected for h2/h3)
//  - tables are wrapped for horizontal scroll on mobile
//  - external links open safely; internal "/x/" links get the deploy base path
//  - local images get width/height (no layout shift) + lazy loading
//  - GitHub-style callouts:  > [!TIP] ... / [!NOTE] / [!WARNING] / [!RUMOUR]
import fs from "node:fs";
import path from "node:path";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import container from "markdown-it-container";
import { imageSize } from "image-size";
import { slugify, escapeHtml } from "./util.js";
import { DIRS, site, href } from "./site.js";
import { installExtras, prepareSource, dropEmptySections } from "./extras.js";

let toc = [];
export const SPOILER_DEFAULT_LABEL = "Spoiler — tap to reveal";

/** Spoiler blocks are matched by this exact wrapper (see the container rule below). */
const SPOILER_RE = /<details class="spoiler"><summary class="spoiler__summary"><span class="spoiler__label">([\s\S]*?)<\/span>[\s\S]*?<\/details>\n?/g;
/** HTML with every spoiler block removed (for descriptions, excerpts, plain text). */
/** X (Twitter) embed figures: their text is third-party content, so it is treated like spoiler text. */
const EMBED_RE = /<figure class="x-embed"[\s\S]*?<\/figure>\n?/g;
export const stripSpoilers = (html) => html.replace(SPOILER_RE, "").replace(EMBED_RE, "");
/** HTML with spoiler bodies replaced by a one-line notice (for feeds / syndication). */
export const redactSpoilers = (html) =>
  html
    .replace(SPOILER_RE, (_m, label) => `<p><em>Spoiler section hidden: ${label}. Open the guide on the site to reveal it.</em></p>\n`)
    .replace(EMBED_RE, (m) => {
      const u = (m.match(/data-x-url="([^"]+)"/) || [])[1];
      return u ? `<p><a href="${u}">View the embedded post on X</a></p>\n` : "";
    });

const md = new MarkdownIt({ html: false, linkify: true, typographer: true });

md.use(anchor, {
  level: [2, 3],
  slugify,
  permalink: false,
  callback: (_token, info) => {
    toc.push({ level: Number(_token.tag.slice(1)), id: info.slug, title: info.title });
  },
});

// --- spoiler blocks ------------------------------------------------------------
//   :::spoiler Optional label        ->  <details class="spoiler"><summary>Label</summary>…</details>
//   ...markdown...                       Native <details>: hidden until clicked, works with NO JS.
//   :::                                  The body carries data-pagefind-ignore so search excerpts never show it.
md.use(container, "spoiler", {
  validate: (params) => /^spoiler(\s|$)/.test(params.trim()),
  render(tokens, idx) {
    const t = tokens[idx];
    if (t.nesting === 1) {
      const label = t.info.trim().replace(/^spoiler\s*/, "").trim() || SPOILER_DEFAULT_LABEL;
      return `<details class="spoiler"><summary class="spoiler__summary"><span class="spoiler__label">${escapeHtml(label)}</span><span class="spoiler__hint" aria-hidden="true">tap to reveal</span></summary><div class="spoiler__body" data-pagefind-ignore>\n`;
    }
    return "</div></details>\n";
  },
});

// Any other body-level H1 becomes an H2 (one H1 per page).
md.core.ruler.push("demote_h1", (state) => {
  for (const t of state.tokens) if ((t.type === "heading_open" || t.type === "heading_close") && t.tag === "h1") t.tag = "h2";
});

// --- links -----------------------------------------------------------------
const defaultLinkOpen = md.renderer.rules.link_open || ((t, i, o, e, s) => s.renderToken(t, i, o));
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const t = tokens[idx];
  const h = t.attrGet("href") || "";
  if (/^http:\/\//i.test(h)) t.attrSet("href", h.replace(/^http:/i, "https:")); // all hosts we link to serve https
  if (/^https?:\/\//i.test(h) && !h.startsWith(site.origin)) {
    t.attrSet("rel", "noopener noreferrer");
    t.attrSet("target", "_blank");
  } else if (h.startsWith("/") && !h.startsWith("//")) {
    t.attrSet("href", href(h));
  }
  return defaultLinkOpen(tokens, idx, options, env, self);
};

// --- tables ----------------------------------------------------------------
md.renderer.rules.table_open = () => '<div class="table-wrap" tabindex="0" role="region" aria-label="Table"><table class="table">\n';
md.renderer.rules.table_close = () => "</table></div>\n";

// --- images ----------------------------------------------------------------
md.renderer.rules.image = (tokens, idx, _o, _e, self) => {
  const t = tokens[idx];
  let src = t.attrGet("src") || "";
  const alt = self.renderInlineAsText(t.children, md.options, {});
  const title = t.attrGet("title");
  let dims = "";
  if (src.startsWith("/media/")) {
    // content/media/foo.jpg is published at /media/foo.jpg
    try {
      const file = path.join(DIRS.content, src.replace(/^\//, ""));
      const { width, height } = imageSize(fs.readFileSync(file));
      dims = ` width="${width}" height="${height}"`;
    } catch {
      /* missing file: build still works, no dimensions */
    }
    src = href(src);
  }
  const img = `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}"${dims} loading="lazy" decoding="async">`;
  return title ? `<figure class="figure">${img}<figcaption>${escapeHtml(title)}</figcaption></figure>` : img;
};

// --- X (Twitter) post embeds ------------------------------------------------------
//   :::x https://x.com/<handle>/status/<id>      (optional body = the post text, quoted as the no-JS fallback)
//   :::
//   or a bare x.com / twitter.com status URL alone on its own line.
// Output is the official  <blockquote class="twitter-tweet">  markup with a plain-text fallback (@handle + link).
// widgets.js is NOT in the page: /assets/js/x-embed.js loads it only for pages with an embed, only when one scrolls
// near the viewport, and never for an embed inside a closed :::spoiler block.
const X_URL = /^https?:\/\/(?:www\.|mobile\.)?(?:x|twitter)\.com\/(\w{1,15})\/status\/(\d{5,25})(?:[/?#][^\s]*)?$/i;
const parseX = (u) => {
  const m = String(u || "").trim().match(X_URL);
  return m ? { handle: m[1], id: m[2], url: `https://twitter.com/${m[1]}/status/${m[2]}` } : null;
};
const xOpen = (x) =>
  `<figure class="x-embed" data-x-embed data-x-url="${escapeHtml(x.url)}" data-pagefind-ignore><blockquote class="twitter-tweet" data-dnt="true" data-theme="dark" data-conversation="none">\n`;
const xClose = (x, hadBody) =>
  `${hadBody ? "" : `<p>Post by @${escapeHtml(x.handle)} on X.</p>\n`}<p>&mdash; @${escapeHtml(x.handle)} <a href="${escapeHtml(x.url)}" rel="noopener noreferrer nofollow" target="_blank">View post on X</a></p></blockquote></figure>\n`;

md.use(container, "x", {
  validate: (params) => /^x\s+\S+/.test(params.trim()),
  render(tokens, idx) {
    const t = tokens[idx];
    const x = parseX(t.info.trim().replace(/^x\s+/, "").split(/\s+/)[0]);
    if (t.nesting === 1) {
      if (!x) return '<p class="x-embed__bad">[X embed: invalid post URL]</p><div hidden>\n';
      t.meta = { x };
      return xOpen(x);
    }
    // closing token: find the matching opener to recover the post
    let j = idx - 1;
    while (j >= 0 && !(tokens[j].type === "container_x_open" && tokens[j].level === t.level)) j--;
    const open = tokens[j];
    const hadBody = open && tokens[j + 1] !== tokens[idx];
    return open?.meta?.x ? xClose(open.meta.x, hadBody) : "</div>\n";
  },
});

// A paragraph that is only a link to an x.com / twitter.com status becomes the same embed.
md.core.ruler.push("x_bare_url", (state) => {
  const T = state.tokens;
  for (let i = 0; i < T.length - 2; i++) {
    if (T[i].type !== "paragraph_open" || T[i + 1].type !== "inline" || T[i + 2].type !== "paragraph_close") continue;
    const kids = T[i + 1].children || [];
    const link = kids.length === 3 && kids[0].type === "link_open" && kids[1].type === "text" && kids[2].type === "link_close" ? kids[0] : null;
    const x = link && parseX(link.attrGet("href")) && parseX(kids[1].content) ? parseX(link.attrGet("href")) : null;
    if (!x) continue;
    const tok = new state.Token("x_embed", "", 0);
    tok.meta = { x };
    T.splice(i, 3, tok);
  }
});
md.renderer.rules.x_embed = (tokens, idx) => xOpen(tokens[idx].meta.x) + xClose(tokens[idx].meta.x, false);

installExtras(md); // slots, relative .md links (see lib/extras.js)

// --- callouts --------------------------------------------------------------
const CALLOUTS = { NOTE: "Note", TIP: "Tip", WARNING: "Warning", RUMOUR: "Rumour — unconfirmed", RUMOR: "Rumour — unconfirmed" };
const calloutRe = /<blockquote>\s*<p>\[!(NOTE|TIP|WARNING|RUMOUR|RUMOR)\]\s*(?:<br>\s*)?/g;
const applyCallouts = (html) =>
  html.replace(calloutRe, (_m, kind) => {
    const k = kind === "RUMOR" ? "rumour" : kind.toLowerCase();
    return `<blockquote class="callout callout--${k}"><p class="callout__title">${CALLOUTS[kind]}</p><p>`;
  });

/** Render markdown -> { html, toc } */
export function renderMarkdown(src) {
  toc = [];
  const html = dropEmptySections(applyCallouts(md.render(prepareSource(src))));
  // Headings inside spoiler blocks must not leak into the table of contents.
  const safe = stripSpoilers(html);
  return { html, toc: toc.filter((t) => safe.includes(`id="${t.id}"`)) };
}

/** Render a short inline snippet (FAQ answers etc.) */
export const renderInline = (src) => md.renderInline(String(src ?? ""));
