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
