// Build-time output gate (run in CI after the build): fails if any built file contains raw authoring leftovers.
//   node scripts/verify-output.mjs [dir=_site]
// Checks every .html/.xml/.json file for:
//   - the string "TODO" (case-sensitive, e.g. "TODO: image:slot")
//   - raw markdown image syntax  ![alt](...)  or a "](" link leftover
//   - links to .md files (href="...something.md")  and unresolved /__md/ or /__slot/ placeholders
//   - internal href/src that do not resolve to a built file (broken internal links)
//   - raw "<!--" authoring comments shown as escaped text, and "image:<slot>" bare lines
//   - Pagefind index fragments are skipped (binary), but the page excerpts come from the HTML checked here.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] || "_site");
const origin = (process.env.SITE_URL || "").replace(/\/$/, "");
const basePath = (() => {
  try {
    return new URL(origin).pathname.replace(/\/$/, "");
  } catch {
    return "";
  }
})();

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name === "pagefind") continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(html|xml|json|webmanifest|txt)$/.test(e.name)) files.push(p);
  }
})(root);

const problems = [];
const bad = (f, msg) => problems.push(`${path.relative(root, f)}: ${msg}`);
const exists = (u) => {
  let p = decodeURIComponent(u.split("#")[0].split("?")[0]);
  if (basePath && p.startsWith(basePath + "/")) p = p.slice(basePath.length);
  const t = path.join(root, p);
  return fs.existsSync(t) && (fs.statSync(t).isFile() || fs.existsSync(path.join(t, "index.html")));
};

for (const f of files) {
  const raw = fs.readFileSync(f, "utf8");
  // JSON-LD/inline scripts are checked too; only strip <script src> noise (none) and <style> blocks.
  const text = raw.replace(/<style[\s\S]*?<\/style>/g, "");
  if (/\bTODO\b/.test(text)) bad(f, `contains "TODO" (${(text.match(/.{0,40}\bTODO\b.{0,40}/) || [""])[0].trim()})`);
  if (/!\[[^\]\n]*\]\([^)\n]*\)/.test(text)) bad(f, "raw markdown image syntax ![..](..)");
  if (/\]\(\s*(https?:|\/|\.|[a-z0-9-]+\.md)/i.test(text.replace(/<script[\s\S]*?<\/script>/g, ""))) bad(f, "raw markdown link syntax ](");
  if (/(?:__md\/|__slot\/)/.test(text)) bad(f, "unresolved /__md/ or /__slot/ placeholder");
  if (/&lt;!--/.test(text)) bad(f, "escaped HTML comment shown as text");
  if (/\bimage:[a-z0-9][\w-]*-step-\d/.test(text)) bad(f, "bare image:<slot> line");
  if (!f.endsWith(".html")) continue;
  for (const m of text.matchAll(/<a\b[^>]*\shref="([^"]*)"/g)) {
    const h = m[1];
    if (/\.md(#|\?|$)/i.test(h) && !/^https?:\/\/(?!roarcode)/i.test(h)) bad(f, `link to .md file: ${h}`);
    const internal = h.startsWith("/") && !h.startsWith("//") ? h : origin && h.startsWith(origin) ? h.slice(origin.length) : null;
    if (internal && internal !== "" && !exists(internal)) bad(f, `broken internal link: ${h}`);
  }
  for (const m of text.matchAll(/<(?:img|script|link)\b[^>]*\s(?:src|href)="(\/[^"/][^"]*)"/g)) {
    if (!exists(m[1])) bad(f, `broken asset reference: ${m[1]}`);
  }
}
if (problems.length) {
  console.error(`verify-output: ${problems.length} problem(s) in ${root}`);
  for (const p of problems.slice(0, 60)) console.error("  - " + p);
  process.exit(1);
}
console.log(`verify-output: OK (${files.length} files, no TODO / raw markdown / .md links / broken internal links)`);
