// Dependency-free static server for _site/ (clean URLs, 404.html, correct MIME types).
//   npm run preview            -> http://localhost:8080
//   PORT=4000 npm run preview
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "_site");
const port = Number(process.env.PORT || 8080);
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".ico": "image/x-icon", ".woff2": "font/woff2", ".webmanifest": "application/manifest+json", ".pagefind": "application/octet-stream", ".pf_meta": "application/octet-stream", ".pf_index": "application/octet-stream", ".pf_fragment": "application/octet-stream", ".pf_filter": "application/octet-stream" };

// SITE_URL may have a base path (GitHub project pages): strip it like the host would.
let base = "";
try { base = new URL(process.env.SITE_URL || "http://x").pathname.replace(/\/+$/, ""); } catch {}

http
  .createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (base && p.startsWith(base)) p = p.slice(base.length) || "/";
    let file = path.join(root, p);
    if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    let status = 200;
    if (!fs.existsSync(file)) { file = path.join(root, "404.html"); status = 404; }
    res.writeHead(status, { "Content-Type": mime[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, () => console.log(`Preview: http://localhost:${port}  (serving ${root})`));
