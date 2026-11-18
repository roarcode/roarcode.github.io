// Content loader: content/**/*.md  ->  { guides, pages, categories, ... }
//
// Rules (see README):
//   * content/inbox/**           NEVER published (staging for raw finds).
//   * draft: true                NEVER published (unless SHOW_DRAFTS=1 for local preview).
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
import { DIRS, site } from "./site.js";
import { slugify, plainText, truncate, toDate, isoDate, fmtDate } from "./util.js";

const SEED = JSON.parse(fs.readFileSync(new URL("./categories.seed.json", import.meta.url), "utf8"));
const RESERVED = new Set(["search", "about", "assets", "og", "media", "pagefind", "feed", "sitemap", "robots", "404", "index", "guides"]);
const STRICT = process.env.STRICT === "1";
const SHOW_DRAFTS = process.env.SHOW_DRAFTS === "1";

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
        return { label: label || hostLabel(m[0]), url: m[0] };
      }
      if (s && typeof s === "object") {
        const url = s.url || s.link || s.href || "";
        return {
          label: s.title || s.name || s.label || hostLabel(url),
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
const dateValue = (d) => (d.getUTCHours() + d.getUTCMinutes() + d.getUTCSeconds() === 0 ? isoDate(d) : d.toISOString());

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
    if (d.draft === true && !SHOW_DRAFTS) continue;
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
      updatedDate: isoDate(updated),
      updatedLabel: fmtDate(updated),
      publishedLabel: fmtDate(published),
      html,
      feedHtml: redactSpoilers(html),
      spoilers: spoilers.level,
      spoilerLabel: spoilers.label,
      toc: toc.filter((t) => t.level === 2 || toc.length < 4),
      sources: normaliseSources(d.sources, rel),
      faq: normaliseFaq(d.faq, rel),
      tags: (Array.isArray(d.tags) ? d.tags : d.tags ? [d.tags] : []).map(String),
      rumour: d.rumour === true || d.rumor === true,
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
    c.lastUpdatedLabel = c.lastUpdated ? fmtDate(c.lastUpdated) : "";
    c.lastUpdatedISO = c.lastUpdated ? c.lastUpdated.toISOString() : "";
    c.lastUpdatedDate = c.lastUpdated ? isoDate(c.lastUpdated) : "";
    c.indexable = c.guides.some((g) => g.indexable);
    c.accentVar = `--cat-${c.slug}`;
  }
  for (const g of guides) g.related = g.category.guides.filter((x) => x !== g).slice(0, 3);
  for (const p of pages) p.ogPath = `/og/page-${p.slug}.jpg`;

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
    navCategories: categories,
    featured: guides.filter((g) => g.featured && g.indexable).slice(0, 6),
    latest: guides.slice(0, 9),
    lastUpdated: newest,
    lastUpdatedLabel: fmtDate(newest),
    lastUpdatedISO: newest.toISOString(),
    lastUpdatedDate: isoDate(newest),
    summary,
  };
}
