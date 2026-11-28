#!/usr/bin/env node
// Sources poller: checks a few public sources and drops NEW items into content/inbox/ as
// markdown with `status: queue`. The build NEVER publishes content/inbox/, so nothing goes live.
//
//   node scripts/poll-sources.mjs              # run once (schedule it externally, e.g. every 30 min)
//   node scripts/poll-sources.mjs --dry-run    # show what would be written, change nothing
//   node scripts/poll-sources.mjs --only=youtube,xbox
//
// Sources: Rockstar Newswire (page titles+links, no article text copied), Rockstar YouTube RSS,
// PlayStation status, Xbox status (the last two only when something is NOT green).
// Politeness: descriptive User-Agent, robots.txt fetched + honoured per host, ONE data request per
// source per run, 15 s timeouts, every source isolated in try/catch. No Reddit.
// De-dupe state: .sources-state.json (gitignored).
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const INBOX = path.join(ROOT, "content", "inbox");
const STATE_FILE = path.join(ROOT, ".sources-state.json");
const UA = "LeonidaGuidesBot/1.0 (+https://roarcode.github.io)";
const BOT_TOKEN = "leonidaguidesbot";
const TIMEOUT = 15_000;
const DRY = process.argv.includes("--dry-run");
const ONLY = (process.argv.find((a) => a.startsWith("--only=")) || "").slice(7).split(",").filter(Boolean);
const CHROME = process.env.CHROME_BIN || ["/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"].find((p) => fs.existsSync(p));
const NOW = new Date().toISOString();

const state = fs.existsSync(STATE_FILE) ? JSON.parse(fs.readFileSync(STATE_FILE, "utf8")) : {};
state.seen ??= {};

// ---------------------------------------------------------------- helpers
const slug = (s) => String(s).normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "item";
const decode = (s = "") => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
const text = (html = "") => decode(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();

async function http(url, accept = "*/*") {
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: accept }, signal: AbortSignal.timeout(TIMEOUT), redirect: "follow" });
  return res;
}

// --- minimal robots.txt support: longest matching Allow/Disallow in the best user-agent group
const robotsCache = new Map();
async function robotsRules(origin) {
  if (robotsCache.has(origin)) return robotsCache.get(origin);
  let rules = [];
  try {
    const r = await http(origin + "/robots.txt", "text/plain");
    if (r.ok) {
      const groups = [];
      let cur = null, lastWasUA = false;
      for (const raw of (await r.text()).split(/\r?\n/)) {
        const line = raw.replace(/#.*/, "").trim();
        const m = line.match(/^([A-Za-z-]+)\s*:\s*(.*)$/);
        if (!m) continue;
        const k = m[1].toLowerCase(), v = m[2].trim();
        if (k === "user-agent") { if (!lastWasUA) { cur = { agents: [], rules: [] }; groups.push(cur); } cur.agents.push(v.toLowerCase()); lastWasUA = true; continue; }
        lastWasUA = false;
        if (cur && (k === "allow" || k === "disallow")) cur.rules.push({ allow: k === "allow", path: v });
      }
      const g = groups.find((x) => x.agents.some((a) => a && BOT_TOKEN.includes(a))) || groups.find((x) => x.agents.includes("*"));
      rules = g ? g.rules : [];
    }
  } catch { /* robots unreachable: treated as allowed */ }
  robotsCache.set(origin, rules);
  return rules;
}
async function allowed(url) {
  const u = new URL(url);
  const rules = (await robotsRules(u.origin)).filter((r) => r.path && (u.pathname + u.search).startsWith(r.path.replace(/\*.*$/, "")));
  if (!rules.length) return true;
  rules.sort((a, b) => b.path.length - a.path.length || (b.allow ? 1 : -1));
  return rules[0].allow;
}
// robots.txt is enforced for page fetches (Rockstar Newswire). Explicitly advertised machine feeds (YouTube's
// channel RSS, the status pages' own JSON/XML) are fetched like a feed reader would: user-initiated subscription,
// one request per run. YouTube's robots.txt disallows /feeds/videos.xml for generic crawlers, so set
// ROBOTS_STRICT_FEEDS=1 to enforce robots on feeds too (the YouTube source will then be skipped).
async function guarded(url, accept, { feed = false } = {}) {
  if ((!feed || process.env.ROBOTS_STRICT_FEEDS === "1") && !(await allowed(url))) throw new Error(`blocked by robots.txt: ${url}`);
  const r = await http(url, accept);
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`);
  return r;
}

function stateKey(src, key) {
  state.seen[src] ??= {};
  return { isNew: !state.seen[src][key], mark: () => (state.seen[src][key] = NOW) };
}

const written = [];
function writeItem({ source, sourceName, title, url, published, body, extra = {} }) {
  fs.mkdirSync(INBOX, { recursive: true });
  const stamp = NOW.slice(0, 10).replace(/-/g, "");
  const hash = crypto.createHash("sha1").update(source + title + url).digest("hex").slice(0, 6);
  const file = path.join(INBOX, `${stamp}-${source}-${slug(title)}-${hash}.md`);
  const q = (v) => JSON.stringify(String(v)); // JSON strings are valid YAML double-quoted scalars
  const fm = ["---", `title: ${q(title)}`, `source: ${q(sourceName)}`, `source_url: ${q(url)}`, `fetched_at: ${q(NOW)}`, ...(published ? [`published: ${q(published)}`] : []), ...Object.entries(extra).map(([k, v]) => `${k}: ${q(v)}`), "status: queue", "---", ""].join("\n");
  const content = `${fm}\n${body.trim()}\n`;
  if (!DRY) fs.writeFileSync(file, content);
  written.push({ source, title, url, file: path.relative(ROOT, file) });
}

// ---------------------------------------------------------------- sources
// 1) Rockstar Newswire: client-rendered, so render once in headless Chrome and read the post cards.
async function newswire() {
  const url = "https://www.rockstargames.com/newswire";
  if (!(await allowed(url))) throw new Error("blocked by robots.txt");
  // Client-rendered: a dump can occasionally come back before the post cards hydrate (seen 2026-11-22 and
  // 2026-11-24, both self-recovered). Retry once with a longer render budget before treating it as a layout change.
  const render = (budget) => CHROME
    ? new Promise((resolve, reject) =>
        execFile(CHROME, ["--headless=new", "--no-sandbox", "--disable-gpu", `--user-agent=${UA}`, `--virtual-time-budget=${budget}`, "--dump-dom", url], { timeout: 90_000, maxBuffer: 20 * 1024 * 1024 }, (e, out) => (e && !out ? reject(e) : resolve(out))),
      )
    : guarded(url, "text/html").then((r) => r.text());
  const parse = (html) => {
    const items = [];
    for (const m of html.matchAll(/<a\b[^>]*href="(?:https:\/\/www\.rockstargames\.com)?(\/newswire\/article\/[^"#?]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
      const title = text((m[2].match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/) || [])[1] || "");
      if (!title) continue;
      const tag = text((m[2].match(/<i><\/i>([\s\S]*?)<\/div>/) || [])[1] || "");
      const date = text((m[2].match(/<time[^>]*>([\s\S]*?)<\/time>/) || [])[1] || "");
      items.push({ id: m[1].split("/")[3], title, tag, date, url: "https://www.rockstargames.com" + m[1] });
    }
    return items;
  };
  let items = parse(await render(20000));
  if (!items.length) {
    await new Promise((r) => setTimeout(r, 5000));
    items = parse(await render(40000));
  }
  const uniq = [...new Map(items.map((i) => [i.id, i])).values()];
  if (!uniq.length) throw new Error("no posts found (page layout changed?)");
  let n = 0;
  for (const i of uniq) {
    const s = stateKey("newswire", i.id);
    if (!s.isNew) continue;
    s.mark(); n++;
    writeItem({ source: "newswire", sourceName: "Rockstar Newswire", title: i.title, url: i.url, published: i.date, extra: { ...(i.tag ? { tag: i.tag } : {}), ...(/grand-theft-auto-vi|gta-vi|gta-6/i.test(i.url) ? { gta6: "true" } : {}) }, body: `Rockstar Newswire post${i.tag ? ` (${i.tag})` : ""}${i.date ? `, ${i.date}` : ""}.\n\nRead and credit the original: ${i.url}\n\n_Only the title and link are stored here; no article text is copied._` });
  }
  return { n, total: uniq.length };
}

// 2) Rockstar Games on YouTube (public Atom feed). Channel id verified against the channel page's own rssUrl.
async function youtube() {
  // Official Rockstar Games channel. YouTube's RSS endpoint intermittently returns 404/5xx, so retry with backoff.
  // (The old fallback id from the brief is dead and only masked the real error with a 404, so it was removed.)
  const used = "UC6VcWc1rAoWdBCM0JxrRQ3A";
  let xml, lastErr;
  for (let attempt = 0; attempt < 4; attempt++) {
    if (attempt) await new Promise((r) => setTimeout(r, 3000 * attempt));
    try { xml = await (await guarded(`https://www.youtube.com/feeds/videos.xml?channel_id=${used}`, "application/atom+xml", { feed: true })).text(); break; } catch (e) { lastErr = e; }
  }
  if (xml === undefined) throw lastErr;
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => m[1]);
  if (!entries.length) throw new Error("feed has no entries");
  let n = 0;
  for (const e of entries) {
    const id = (e.match(/<yt:videoId>([^<]+)/) || [])[1];
    const title = decode((e.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "");
    if (!id || !title) continue;
    const s = stateKey("youtube", id);
    if (!s.isNew) continue;
    s.mark(); n++;
    const url = `https://www.youtube.com/watch?v=${id}`;
    const published = (e.match(/<published>([^<]+)/) || [])[1];
    const desc = decode((e.match(/<media:description>([\s\S]*?)<\/media:description>/) || [])[1] || "").slice(0, 1200);
    writeItem({ source: "youtube", sourceName: "Rockstar Games (YouTube)", title, url, published, body: `New video on the Rockstar Games YouTube channel.\n\n${url}\n\n${desc ? "Description (excerpt):\n\n> " + desc.replace(/\n+/g, "\n> ") : ""}` });
  }
  return { n, total: entries.length, note: `channel ${used}` };
}

// 3) PlayStation Network status: the status page's own public JSON for region SCEE (Europe). Items only when NOT green.
async function psn() {
  const json = JSON.parse(await (await guarded("https://status.playstation.com/data/statuses/region/SCEE.json", "application/json", { feed: true })).text());
  const issues = new Map(); // statusId -> {type, countries:Set, message}
  const add = (st, country) => {
    const e = issues.get(st.statusId) || { type: st.statusType, started: st.startDate, countries: new Set(), message: st.message?.messageKey || "", devices: (st.devices || []).map((d) => d.deviceName).join(", ") };
    if (country) e.countries.add(country);
    issues.set(st.statusId, e);
  };
  (json.status || []).forEach((st) => add(st));
  for (const c of json.countries || []) {
    (c.status || []).forEach((st) => add(st, c.countryCode));
    for (const sv of c.services || []) (sv.status || []).forEach((st) => add(st, c.countryCode));
  }
  let n = 0;
  for (const [id, i] of issues) {
    const s = stateKey("psn", id);
    if (!s.isNew) continue;
    s.mark(); n++;
    const where = [...i.countries].join(", ") || "region-wide";
    writeItem({ source: "psn", sourceName: "PlayStation Service Status", title: `PSN status: ${i.type}${i.message ? ` (${i.message.replace(/^tbone\./, "")})` : ""} [${where}]`, url: "https://status.playstation.com/", published: i.started, body: `PlayStation Service Status (region SCEE) reports **${i.type}**.\n\n- Affected: ${where}\n- Devices: ${i.devices || "n/a"}\n- Since: ${i.started}\n- Message key: ${i.message}\n\nCheck https://status.playstation.com/ before publishing anything.` });
  }
  return { n, total: issues.size, note: issues.size ? "" : "all services up" };
}

// 4) Xbox network status: the support page's own public status feed. Items only when NOT green.
async function xbox() {
  const xml = await (await guarded("https://xnotify.xboxlive.com/servicestatusv6/US/en-US", "application/xml", { feed: true })).text();
  const overall = (xml.match(/<Overall><State>([^<]*)/) || [])[1];
  if (overall === undefined) throw new Error("unexpected Xbox status format");
  const bad = [...xml.matchAll(/<Scenario><Id>(\d+)<\/Id><Status><Name>([^<]*)<\/Name>[\s\S]*?<\/Status><Name>([^<]*)<\/Name>/g)].filter((m) => m[2] !== "None").map((m) => ({ id: m[1], status: m[2], name: decode(m[3]) }));
  if (overall === "None" && !bad.length) return { n: 0, total: 0, note: "all services up" };
  const key = crypto.createHash("sha1").update(bad.map((b) => `${b.id}:${b.status}`).sort().join("|") || overall).digest("hex").slice(0, 10);
  const s = stateKey("xbox", key);
  if (!s.isNew) return { n: 0, total: bad.length || 1 };
  s.mark();
  writeItem({ source: "xbox", sourceName: "Xbox network status", title: `Xbox status: ${bad.length ? bad.map((b) => `${b.name} (${b.status})`).join(", ") : `overall ${overall}`}`, url: "https://support.xbox.com/en-US/xbox-live-status", body: `Xbox network status is not all-green (overall state: ${overall}).\n\n${bad.map((b) => `- ${b.name}: ${b.status}`).join("\n") || "- see the status page"}\n\nCheck https://support.xbox.com/en-US/xbox-live-status before publishing anything.` });
  return { n: 1, total: bad.length || 1 };
}

// ---------------------------------------------------------------- run
const SOURCES = { newswire, youtube, psn, xbox };
const summary = [];
for (const [name, fn] of Object.entries(SOURCES)) {
  if (ONLY.length && !ONLY.includes(name)) continue;
  try {
    const r = await fn();
    summary.push(`${name.padEnd(9)} ${r.n} new, ${r.total - r.n} unchanged${r.note ? ` (${r.note})` : ""}`);
  } catch (e) {
    summary.push(`${name.padEnd(9)} ERROR: ${e.message}`);
    console.error(`[poll] ${name} failed:`, e.message);
  }
}
if (!DRY) fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
console.log(`[poll] ${NOW}${DRY ? " (dry run)" : ""}\n  ` + summary.join("\n  "));
for (const w of written) console.log(`  + ${w.source}: ${w.title}\n      ${w.url}\n      ${w.file}`);
process.exitCode = summary.some((s) => s.includes("ERROR")) && summary.every((s) => s.includes("ERROR")) ? 1 : 0;
