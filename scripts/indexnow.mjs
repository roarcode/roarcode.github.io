// After a deploy: tell IndexNow (Bing, Yandex, Seznam, Naver...) which URLs exist/changed, and ping search engines
// with the sitemap. Never fails the deploy: every network error is logged and ignored.
//   SITE_URL=https://example.com node scripts/indexnow.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const site = (process.env.SITE_URL || "https://roarcode.github.io").replace(/\/+$/, "");
const host = new URL(site).host;
const keyFile = fs.readdirSync(path.join(root, "src/static")).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
const log = (...a) => console.log("[indexnow]", ...a);

async function get(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "user-agent": "leonida-guides-deploy/1.0" }, signal: AbortSignal.timeout(15000) });
      if (r.ok) return r;
      log(`GET ${url} -> ${r.status} (try ${i + 1})`);
    } catch (e) {
      log(`GET ${url} failed: ${e.message} (try ${i + 1})`);
    }
    await new Promise((r) => setTimeout(r, 5000));
  }
  return null;
}

try {
  if (!keyFile) throw new Error("no <key>.txt in src/static");
  const key = keyFile.replace(/\.txt$/, "");
  // GitHub Pages needs a few seconds to serve the new deploy; wait until the key file is reachable.
  const live = await get(`${site}/${keyFile}`);
  if (!live) log("key file not reachable yet; submitting anyway");
  const sm = await get(`${site}/sitemap.xml`);
  const urls = sm ? [...(await sm.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]) : [site + "/"];
  log(`${urls.length} URLs from sitemap`);

  const r = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key, keyLocation: `${site}/${keyFile}`, urlList: urls }),
    signal: AbortSignal.timeout(20000),
  });
  log(`IndexNow submit -> HTTP ${r.status} ${r.status === 200 || r.status === 202 ? "(accepted)" : "(ignored)"}`);

  // Sitemap pings. Google retired its ping endpoint in 2024 and Bing's sitemap ping is deprecated, so these are
  // best-effort only; the sitemap is also declared in robots.txt, and Search Console / Bing Webmaster can be submitted once by hand.
  for (const u of [`https://www.google.com/ping?sitemap=${encodeURIComponent(site + "/sitemap.xml")}`, `https://www.bing.com/ping?sitemap=${encodeURIComponent(site + "/sitemap.xml")}`]) {
    try {
      const p = await fetch(u, { signal: AbortSignal.timeout(10000) });
      log(`ping ${new URL(u).host} -> HTTP ${p.status}`);
    } catch (e) {
      log(`ping ${new URL(u).host} failed: ${e.message}`);
    }
  }
} catch (e) {
  log("skipped:", e.message);
}
process.exit(0);
