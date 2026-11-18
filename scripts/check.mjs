// Post-build sanity check over _site/: every HTML page must have a <title>, meta description,
// canonical, Open Graph + Twitter tags and parseable JSON-LD; sitemap/robots/feed/Pagefind must exist;
// og:image files must exist; no page may contain more than one <h1>. Exit code 1 on failure.
//   npm run check
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "_site");
const fail = [];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? (e.name === "pagefind" ? [] : walk(path.join(d, e.name))) : [path.join(d, e.name)]));
const pages = walk(root).filter((f) => f.endsWith(".html"));
let ld = 0;
for (const f of pages) {
  const rel = path.relative(root, f);
  const h = fs.readFileSync(f, "utf8");
  if (/<meta http-equiv="refresh"/.test(h)) continue; // moved-URL redirect stub (noindex)
  const need = [["title", /<title>[^<]+<\/title>/], ["description", /<meta name="description" content="[^"]+"/], ["canonical", /<link rel="canonical" href="https?:\/\/[^"]+"/], ["og:title", /property="og:title"/], ["og:image", /property="og:image" content="https?:\/\/[^"]+"/], ["twitter:card", /name="twitter:card"/], ["json-ld", /application\/ld\+json/]];
  for (const [n, re] of need) if (!re.test(h)) fail.push(`${rel}: missing ${n}`);
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); ld++; } catch (e) { fail.push(`${rel}: invalid JSON-LD (${e.message})`); }
  }
  if ((h.match(/<h1[\s>]/g) || []).length !== 1 && rel !== "404.html") fail.push(`${rel}: expected exactly one <h1>`);
  const og = h.match(/property="og:image" content="https?:\/\/[^/]+(?:\/[^/"]+)*?(\/og\/[^"]+)"/);
  if (og && !fs.existsSync(path.join(root, og[1]))) fail.push(`${rel}: og:image file missing (${og[1]})`);
}
for (const f of ["sitemap.xml", "robots.txt", "feed.xml", "pagefind/pagefind.js", "pagefind/pagefind-entry.json", "og/default.jpg", "404.html", "index.html", "search/index.html"]) if (!fs.existsSync(path.join(root, f))) fail.push(`missing ${f}`);
console.log(`checked ${pages.length} pages, ${ld} JSON-LD blocks`);
if (fail.length) { console.error("FAIL\n" + fail.join("\n")); process.exit(1); }
console.log("OK");
