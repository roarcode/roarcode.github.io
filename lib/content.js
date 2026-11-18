// Content loader: content/**/*.md  ->  { guides, pages, categories, ... }
//
// Rules (see README):
//   * content/inbox/**           NEVER published (staging for raw finds).
//   * draft: true, publish: false, or qa: <anything but passed|live-review> NEVER published (unless SHOW_DRAFTS=1 for local preview).
//   * `status: template|queue|draft` and template-*.md files are NEVER published (SHOW_DRAFTS=1 shows them locally).
//   * files starting with "_" or named README.md are ignored.
//   * content/pages/*.md  (or `type: page`) are standalone pages at /<slug>/.
//   * everything else is a guide at /<category-slug>/<slug>/.
//   * categories are data-driven: the seed list (lib/categories.seed.json) gives names,
//     descriptions and aliases, but any new `category:` value creates a category.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { renderMarkdown, renderInline, stripSpoilers, redactSpoilers } from "./markdown.js";
import { DIRS, site, normLang } from "./site.js";
import { describeSource, KIND_LABEL } from "./sources.js";
import { resolveMdLinks, rewriteMovedLinks } from "./extras.js";
import { slugify, plainText, truncate, toDate, isoDate, fmtDate, fmtDateTime, hasTime, isoLocal } from "./util.js";

const SEED = JSON.parse(fs.readFileSync(new URL("./categories.seed.json", import.meta.url), "utf8"));
const RESERVED = new Set(["search", "about", "assets", "og", "media", "pagefind", "feed", "sitemap", "robots", "404", "index", "guides"]);
const STRICT = process.env.STRICT === "1";
// SHOW_DRAFTS=1 includes held pages in LOCAL builds for QA. It is ignored in CI / production builds.
const SHOW_DRAFTS = process.env.SHOW_DRAFTS === "1" && !process.env.CI && process.env.NODE_ENV !== "production";

const problems = { errors: [], warnings: [] };
const err = (f, m) => problems.errors.push(`${f}: ${m}`);
const warn = (f, m) => problems.warnings.push(`${f}: ${m}`);

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "inbox" || e.name === "media" || e.name.startsWith("_") || e.name.startsWith(".")) continue;
      out.push(...walk(p));
    } else if (e.isFile() && e.name.endsWith(".md") && !e.name.startsWith("_") && e.name.toLowerCase() !== "readme.md") {
      out.push(p);
    }
  }
  return out.sort();
}

/** "URL", "Label | URL", "Label — URL" or {title,url,...}  ->  {label,url,publisher,note,date} */
function normaliseSources(list, file) {
  if (list == null) return [];
  if (!Array.isArray(list)) list = [list];
  return list
    .map((s) => {
      if (typeof s === "string") {
        const m = s.match(/https?:\/\/[^\s)>\]]+/);
        if (!m) return { label: s.trim(), url: "" };
        const label = s.replace(m[0], "").replace(/[\s|—–\-:()[\]<>]+$/g, "").replace(/^[\s|—–\-:()[\]<>]+/g, "").trim();
        const d = describeSource(m[0]);
        return { label: label || d.label, url: m[0], kind: d.kind };
      }
      if (s && typeof s === "object") {
        const url = s.url || s.link || s.href || "";
        const d = url ? describeSource(url) : { label: "Source", kind: "community" };
        return {
          kind: ["official", "press", "community"].includes(s.kind) ? s.kind : d.kind,
          label: s.title || s.name || s.label || d.label,
          url,
          publisher: s.publisher || s.site || s.author || "",
          note: s.note || s.type || "",
          date: toDate(s.date || s.accessed),
        };
      }
      warn(file, "ignored an unreadable `sources` entry");
      return null;
    })
    .filter(Boolean)
    .map((s) => {
      if (s.kind) s.kindLabel = KIND_LABEL[s.kind];
      if (/^http:\/\//i.test(s.url || "")) s.url = s.url.replace(/^http:/i, "https:");
      if (s.url && !/^https?:\/\//i.test(s.url)) {
        warn(file, `source URL must start with http(s): ${s.url}`);
        s.url = "";
      }
      return s;
    });
}
const hostLabel = (u) => {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return u || "Source";
  }
};

export const SPOILER_LEVELS = {
  none: { level: "none", label: "Spoiler-free" },
  minor: { level: "minor", label: "Minor spoilers" },
  major: { level: "major", label: "Major spoilers" },
};
function normaliseSpoilers(v, file) {
  const key = String(v ?? "none").trim().toLowerCase();
  if (SPOILER_LEVELS[key]) return SPOILER_LEVELS[key];
  warn(file, `invalid \`spoilers: ${v}\` (use none|minor|major) — treated as "major" to stay safe`);
  return SPOILER_LEVELS.major;
}

/** date-only (midnight UTC) -> "YYYY-MM-DD", otherwise full ISO. */
const dateValue = (d) => (hasTime(d) ? isoLocal(d) : isoDate(d));

function normaliseFaq(list, file) {
  if (!list) return [];
  if (!Array.isArray(list)) {
    warn(file, "`faq` must be a list of {q, a}");
    return [];
  }
  return list
    .map((f) => ({ q: String(f.q ?? f.question ?? "").trim(), a: String(f.a ?? f.answer ?? "").trim() }))
    .filter((f) => f.q && f.a)
    .map((f) => ({ q: f.q, a: f.a, aHtml: renderInline(f.a), aText: plainText(renderInline(f.a)) }));
}

export function loadContent() {
  problems.errors = [];
  problems.warnings = [];

  // ---- categories (seeded + discovered) -----------------------------------
  const categories = SEED.map((c, i) => ({ ...c, order: i, seeded: true, guides: [] }));
  const lookup = new Map();
  const register = (c) => {
    [c.slug, slugify(c.name), slugify(c.short || ""), ...(c.aliases || []).map(slugify)].filter(Boolean).forEach((k) => lookup.set(k, c));
  };
  categories.forEach(register);
  const resolveCategory = (raw, file) => {
    const key = slugify(raw);
    if (!key) return null;
    if (lookup.has(key)) return lookup.get(key);
    const name = String(raw).trim();
    const c = { slug: key, name: name.replace(/\b\w/g, (m) => m.toUpperCase()), short: name, icon: "spark", description: "", aliases: [], order: 100 + categories.length, seeded: false, guides: [] };
    categories.push(c);
    register(c);
    warn(file, `new category "${raw}" auto-created (not in seed list)`);
    return c;
  };

  // ---- files ---------------------------------------------------------------
  const guides = [];
  const pages = [];
  const seenUrls = new Map();

  for (const file of walk(DIRS.content)) {
    const rel = path.relative(DIRS.content, file);
    let fm;
    try {
      fm = matter(fs.readFileSync(file, "utf8"));
    } catch (e) {
      err(rel, `front-matter parse error: ${e.reason || e.message}`);
      continue;
    }
    const d = fm.data;
    if ((d.draft === true || d.publish === false) && !SHOW_DRAFTS) continue;
    // QA gate: no `qa` field (legacy), `qa: passed` and `qa: live-review` (live, under re-review) publish;
    // any other value (`qa: pending`, ...) is held out of output, sitemap, search and feed.
    if (d.qa != null && !/^(passed|live-review)$/i.test(String(d.qa).trim()) && !SHOW_DRAFTS) continue;
    // Authoring templates / queued stubs live next to real guides but must never be published.
    if (/^(template|queue|queued|draft)$/i.test(String(d.status || "")) && !SHOW_DRAFTS) continue;
    if (path.basename(file).startsWith("template-") && !SHOW_DRAFTS) continue;

    const parts = rel.split(path.sep);
    const isPage = d.type === "page" || parts[0] === "pages";
    const title = String(d.title || "").trim();
    if (!title) {
      err(rel, "missing `title`");
      continue;
    }
    const slug = slugify(d.slug || path.basename(file, ".md"));
    if (!slug) {
      err(rel, "empty slug");
      continue;
    }
    let updated = toDate(d.updated);
    if (!updated) {
      updated = fs.statSync(file).mtime;
      warn(rel, "missing/invalid `updated` — using file modified time");
    }
    const published = toDate(d.published || d.date) || updated;

    // The page template renders the title as the one <h1>: drop a leading "# Title" from the body
    // (authors often repeat it) so there is never a duplicate H1.
    const { html, toc } = renderMarkdown(fm.content.replace(/^\s*#[ \t]+[^\n]*\n/, ""));
    // SPOILER SAFETY: everything public-facing (description, OG/Twitter text, JSON-LD, cards, feed,
    // search excerpts) is derived from the HTML with every :::spoiler block removed.
    const safeHtml = stripSpoilers(html);
    const text = plainText(safeHtml);
    const firstPara = plainText((safeHtml.match(/<p>([\s\S]*?)<\/p>/) || [])[1] || "");
    const spoilers = normaliseSpoilers(d.spoilers, rel);
    const base = {
      title,
      slug,
      file: rel,
      description: truncate(String(d.description || "").trim() || firstPara || site.tagline, 158),
      hasDescription: Boolean(d.description),
      updated,
      published,
      updatedISO: updated.toISOString(),
      publishedISO: published.toISOString(),
      // One value feeds BOTH the visible <time datetime> and the Article schema dateModified/datePublished.
      updatedValue: dateValue(updated),
      publishedValue: dateValue(published),
      updatedDate: dateValue(updated),
      updatedLabel: fmtDateTime(updated),
      publishedLabel: fmtDateTime(published),
      html,
      feedHtml: redactSpoilers(html),
      spoilers: spoilers.level,
      spoilerLabel: spoilers.label,
      toc: toc.filter((t) => t.level === 2 || toc.length < 4),
      sources: normaliseSources(d.sources, rel),
      faq: normaliseFaq(d.faq, rel),
      tags: (Array.isArray(d.tags) ? d.tags : d.tags ? [d.tags] : []).map(String),
      rumour: d.rumour === true || d.rumor === true,
      hasEmbeds: html.includes("data-x-embed"),
      // i18n: front-matter `lang` (default en); `translationOf: <slug>` or `hreflang: {sl: <slug>}` link translations.
      lang: normLang(d.lang),
      translationOf: d.translationOf ? slugify(String(d.translationOf)) : "",
      hreflangMap: d.hreflang && typeof d.hreflang === "object" && !Array.isArray(d.hreflang) ? d.hreflang : {},
      alternates: [],
      // Tick-box checklist (progress saved in localStorage): front-matter `checklist: true`, or the launch-night checklist page.
      checklist: d.checklist === true || /^launch-night-checklist$/.test(slug),
      placeholder: d.placeholder === true,
      draft: d.draft === true,
      featured: d.featured === true,
      author: d.author ? String(d.author) : site.byline,
      authorExplicit: Boolean(d.author),
      answer: d.answer || d.tldr ? String(d.answer || d.tldr).trim() : "",
      answerHtml: d.answer || d.tldr ? renderInline(String(d.answer || d.tldr).trim()) : "",
      schemaType: d.schema === "TechArticle" ? "TechArticle" : "Article",
      imageOverride: d.image ? String(d.image) : "",
      readingMinutes: Math.max(1, Math.round(text.split(/\s+/).length / 220)),
    };
    // "Official sources" badge: front-matter `official: true|false` wins, otherwise true when any cited source is official.
    base.official = d.official === false ? false : d.official === true || base.sources.some((x) => x.kind === "official");
    // Unreleased/placeholder/draft pages must not be indexed or syndicated.
    base.indexable = !base.placeholder && !base.draft;

    if (isPage) {
      if (RESERVED.has(slug) && slug !== "about") {
        err(rel, `slug "${slug}" is reserved`);
        continue;
      }
      const page = { ...base, kind: "page", path: slug, url: `/${slug}/` };
      if (seenUrls.has(page.url)) {
        err(rel, `duplicate URL ${page.url} (also ${seenUrls.get(page.url)})`);
        continue;
      }
      seenUrls.set(page.url, rel);
      pages.push(page);
      continue;
    }

    const catRaw = d.category || (parts.length > 1 ? parts[0] : "");
    const cat = resolveCategory(catRaw, rel);
    if (!cat) {
      err(rel, "missing `category` (and not inside a category folder)");
      continue;
    }
    if (RESERVED.has(cat.slug)) {
      err(rel, `category slug "${cat.slug}" is reserved`);
      continue;
    }
    if (!base.sources.length && !base.placeholder) warn(rel, "no `sources` — the brief requires crediting sources");
    if (!base.answer && !base.placeholder && !/quick answer|tl;?dr|short answer|the answer/i.test(text.slice(0, 500))) warn(rel, "no `answer` (TL;DR) — guides should lead with the direct answer");
    const guide = { ...base, kind: "guide", category: cat, categorySlug: cat.slug, path: `${cat.slug}/${slug}`, url: `/${cat.slug}/${slug}/` };
    if (seenUrls.has(guide.url)) {
      err(rel, `duplicate URL ${guide.url} (also ${seenUrls.get(guide.url)})`);
      continue;
    }
    seenUrls.set(guide.url, rel);
    guide.ogPath = `/og/${cat.slug}-${slug}.jpg`;
    guides.push(guide);
    cat.guides.push(guide);
  }

  // ---- derive ----------------------------------------------------------------
  const byUpdated = (a, b) => b.updated - a.updated || a.title.localeCompare(b.title);
  guides.sort(byUpdated);
  for (const c of categories) {
    c.guides.sort(byUpdated);
    c.url = `/${c.slug}/`;
    c.path = c.slug;
    c.ogPath = `/og/category-${c.slug}.jpg`;
    c.count = c.guides.length;
    c.lastUpdated = c.guides[0]?.updated || null;
    c.lastUpdatedLabel = c.lastUpdated ? fmtDateTime(c.lastUpdated) : "";
    c.lastUpdatedISO = c.lastUpdated ? c.lastUpdated.toISOString() : "";
    c.lastUpdatedDate = c.lastUpdated ? dateValue(c.lastUpdated) : "";
    c.indexable = c.guides.some((g) => g.indexable);
    c.accentVar = `--cat-${c.slug}`;
  }
  // hreflang: reciprocal pairs, only between PUBLISHED pages (held/draft pages are never in `guides`/`pages`).
  const bySlug = new Map([...guides, ...pages].map((x) => [x.slug, x]));
  const parent = new Map([...bySlug.keys()].map((k) => [k, k]));
  const find = (k) => (parent.get(k) === k ? k : (parent.set(k, find(parent.get(k))), parent.get(k)));
  const union = (a, b) => { if (bySlug.has(a) && bySlug.has(b)) parent.set(find(a), find(b)); };
  for (const x of bySlug.values()) {
    if (x.translationOf) union(x.slug, x.translationOf);
    for (const t of Object.values(x.hreflangMap)) union(x.slug, slugify(String(t)));
  }
  const groups = new Map();
  for (const x of bySlug.values()) (groups.get(find(x.slug)) || groups.set(find(x.slug), []).get(find(x.slug))).push(x);
  for (const grp of groups.values()) {
    const langs = new Set(grp.map((x) => x.lang));
    if (grp.length < 2 || langs.size < 2) continue; // need two different languages that are both live
    const def = grp.find((x) => x.lang === site.lang) || grp[0];
    for (const x of grp) {
      x.alternates = [...grp.map((y) => ({ hreflang: y.lang, url: y.url })), { hreflang: "x-default", url: def.url }];
      x.alternateLocales = [...new Set(grp.filter((y) => y !== x).map((y) => y.lang))];
    }
  }
  for (const g of guides) g.related = g.category.guides.filter((x) => x !== g).slice(0, 3);
  for (const p of pages) p.ogPath = `/og/page-${p.slug}.jpg`;

  // Relative guide links (foo.md) were written as /__md/foo; point them at the real URLs now that every page is known.
  const urlBySlug = new Map();
  for (const x of [...pages, ...guides]) {
    urlBySlug.set(x.slug, x.url);
    urlBySlug.set(slugify(path.basename(x.file, ".md")), x.url);
  }
  for (const x of [...guides, ...pages]) {
    const w = (msg) => warn(x.file, msg);
    x.html = rewriteMovedLinks(resolveMdLinks(x.html, urlBySlug, w));
    x.feedHtml = rewriteMovedLinks(resolveMdLinks(x.feedHtml, urlBySlug, w));
    x.answerHtml = rewriteMovedLinks(resolveMdLinks(x.answerHtml, urlBySlug, w));
    for (const f of x.faq) f.aHtml = rewriteMovedLinks(resolveMdLinks(f.aHtml, urlBySlug, w));
  }

  categories.sort((a, b) => a.order - b.order);
  const newest = [...guides, ...pages].sort(byUpdated)[0]?.updated || site.buildDate;

  const summary = {
    guides: guides.length,
    pages: pages.length,
    placeholders: [...guides, ...pages].filter((x) => x.placeholder).length,
    rumours: guides.filter((g) => g.rumour).length,
    errors: problems.errors,
    warnings: problems.warnings,
  };
  const msg = (arr, tag) => arr.forEach((m) => console.warn(`[content] ${tag} ${m}`));
  msg(problems.errors, "ERROR");
  msg(problems.warnings, "warn ");
  if (STRICT && problems.errors.length) throw new Error(`Content errors (STRICT=1):\n${problems.errors.join("\n")}`);

  return {
    guides,
    pages,
    categories,
    navCategories: categories.filter((c) => c.nav !== false),
    featured: guides.filter((g) => g.featured && g.indexable).slice(0, 6),
    // Every published guide, newest first (ties: title). Home "Latest updates" lists all of them.
    latest: guides.filter((g) => g.indexable),
    // "Start here" list for empty hubs: the newest launch guides that already exist.
    startHere: (categories.find((c) => c.slug === "launch-hub")?.guides || []).filter((g) => g.indexable).slice(0, 6),
    lastUpdated: newest,
    lastUpdatedLabel: fmtDateTime(newest),
    lastUpdatedISO: newest.toISOString(),
    lastUpdatedDate: dateValue(newest),
    summary,
  };
}
