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

let toc = [];
export const SPOILER_DEFAULT_LABEL = "Spoiler — tap to reveal";

/** Spoiler blocks are matched by this exact wrapper (see the container rule below). */
const SPOILER_RE = /<details class="spoiler"><summary class="spoiler__summary"><span class="spoiler__label">([\s\S]*?)<\/span>[\s\S]*?<\/details>\n?/g;
/** HTML with every spoiler block removed (for descriptions, excerpts, plain text). */
export const stripSpoilers = (html) => html.replace(SPOILER_RE, "");
/** HTML with spoiler bodies replaced by a one-line notice (for feeds / syndication). */
export const redactSpoilers = (html) => html.replace(SPOILER_RE, (_m, label) => `<p><em>Spoiler section hidden: ${label}. Open the guide on the site to reveal it.</em></p>\n`);

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
  const html = applyCallouts(md.render(src));
  // Headings inside spoiler blocks must not leak into the table of contents.
  const safe = stripSpoilers(html);
  return { html, toc: toc.filter((t) => safe.includes(`id="${t.id}"`)) };
}

/** Render a short inline snippet (FAQ answers etc.) */
export const renderInline = (src) => md.renderInline(String(src ?? ""));
