// Small shared helpers.
export const slugify = (s = "") =>
  String(s)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const escapeHtml = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export const escapeXml = escapeHtml;

/** Strip tags + collapse whitespace (for descriptions / JSON-LD text). */
export const plainText = (html = "") =>
  String(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

export const truncate = (s, n = 155) => {
  s = String(s).trim();
  if (s.length <= n) return s;
  const cut = s.slice(0, n - 1);
  return cut.slice(0, cut.lastIndexOf(" ") > n * 0.6 ? cut.lastIndexOf(" ") : cut.length).replace(/[\s,;:.\-–—]+$/, "") + "…";
};

export const toDate = (v) => {
  if (!v) return null;
  const d = v instanceof Date ? v : new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
};

export const isoDate = (d) => (d ? d.toISOString().slice(0, 10) : "");
export const fmtDate = (d) =>
  d ? d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "";

// ---- times are shown in the site's home zone (Europe/Ljubljana: CET / CEST) -----------------------------------
export const SITE_TZ = "Europe/Ljubljana";
/** True when the date carries a time of day (front-matter `updated: 2026-11-18T12:20:00+01:00`); date-only values are midnight UTC. */
export const hasTime = (d) => Boolean(d) && d.getUTCHours() + d.getUTCMinutes() + d.getUTCSeconds() !== 0;
const tzParts = (d, opts) => Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: SITE_TZ, ...opts }).formatToParts(d).map((p) => [p.type, p.value]));
/** ISO 8601 with the Ljubljana offset, e.g. 2026-11-18T12:20:00+01:00 (used for <time datetime>, dateModified and sitemap lastmod). */
export const isoLocal = (d) => {
  const p = tzParts(d, { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" });
  const off = (tzParts(d, { timeZoneName: "longOffset" }).timeZoneName || "GMT+00:00").replace("GMT", "") || "+00:00";
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}${off.length === 3 ? off + ":00" : off}`;
};
/** "18 Nov 2026" for date-only values, "18 Nov 2026, 12:20 CET" (zone label always shown) when a time is set. */
export const fmtDateTime = (d) => {
  if (!d) return "";
  if (!hasTime(d)) return fmtDate(d);
  const p = tzParts(d, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZoneName: "short" });
  return `${p.day} ${p.month} ${p.year}, ${p.hour}:${p.minute} ${p.timeZoneName}`;
};
