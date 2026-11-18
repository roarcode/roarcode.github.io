// Site-wide configuration. Everything environment-specific comes from env vars,
// so switching hosts (GitHub Pages -> Cloudflare Pages -> real domain) is one change.
//
//   SITE_URL      Public base URL, e.g. https://guides.example.com or
//                 https://user.github.io/gta6-guides (a sub-path is supported).
//   SITE_NAME     Brand name (default "Leonida Guides").
//   TWITTER_HANDLE  Optional, e.g. @leonidaguides (adds twitter:site).
//   NOINDEX=1     Force noindex + "Disallow: /" (staging builds).
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const DIRS = {
  root: ROOT,
  content: process.env.CONTENT_DIR ? path.resolve(process.env.CONTENT_DIR) : path.join(ROOT, "content"),
  design: path.join(ROOT, "design"),
  src: path.join(ROOT, "src"),
  out: path.join(ROOT, "_site"),
  cache: path.join(ROOT, ".cache"),
};

const PLACEHOLDER_URL = "https://REPLACE-ME.example";
const rawUrl = (process.env.SITE_URL || PLACEHOLDER_URL).trim().replace(/\/+$/, "");

let parsed;
try {
  parsed = new URL(rawUrl);
} catch {
  throw new Error(`SITE_URL is not a valid absolute URL: "${rawUrl}"`);
}

// Free, cookie-less analytics (GoatCounter). OFF unless GOATCOUNTER_CODE is a valid site code
// (the subdomain in https://<code>.goatcounter.com). Invalid values are ignored.
const gcCode = (process.env.GOATCOUNTER_CODE || "").trim().toLowerCase();

const basePath = parsed.pathname.replace(/\/+$/, ""); // "" or "/gta6-guides"

export const site = {
  name: process.env.SITE_NAME || "Leonida Guides",
  tagline: "Unofficial GTA VI guides: unlock times, pre-load and download size, launch fixes, editions and prices.",
  // Only promises what exists today. Keep under ~155 characters and spoiler-free.
  homeDescription: "Unofficial GTA 6 launch-day guides: unlock time by timezone, pre-load and download size, launch fixes, and editions and prices.",
  lang: "en",
  locale: "en_US",
  url: rawUrl, // origin + basePath, no trailing slash
  origin: parsed.origin,
  basePath,
  twitter: process.env.TWITTER_HANDLE || "",
  byline: process.env.SITE_BYLINE || "Leonida Guides Team",
  aiDisclosure: "Written with AI help and fact-checked against the cited sources.",
  disclaimer: "Unofficial fan site. Not affiliated with Rockstar Games or Take-Two Interactive.",
  // True while SITE_URL is still the placeholder: pages get noindex so a staging
  // URL can never pollute search results with a wrong canonical.
  isPlaceholderUrl: rawUrl === PLACEHOLDER_URL,
  noindex: process.env.NOINDEX === "1" || rawUrl === PLACEHOLDER_URL,
  buildDate: new Date(),
  analytics: { goatcounter: /^[a-z0-9][a-z0-9-]{0,62}$/.test(gcCode) ? gcCode : "" },
  // Ads / affiliate placeholder regions: OFF by default, no ad-network code anywhere.
  ads: { enabled: process.env.ADS_ENABLED === "1" },
};

/** BCP-47 language of a page (front-matter `lang`, default "en") -> Open Graph locale. */
const LOCALES = { en: "en_US", sl: "sl_SI", de: "de_DE", fr: "fr_FR", es: "es_ES", it: "it_IT", hr: "hr_HR" };
export const normLang = (v) => (/^[a-z]{2,3}(-[A-Za-z]{2})?$/.test(String(v || "").trim()) ? String(v).trim().toLowerCase() : "en");
export const ogLocale = (lang) => {
  const l = normLang(lang);
  if (LOCALES[l]) return LOCALES[l];
  return l.includes("-") ? l.replace("-", "_").replace(/_(\w+)$/, (_m, r) => "_" + r.toUpperCase()) : site.locale;
};

/** Root-relative internal path -> path including the deploy base path. "/a/" -> "/repo/a/" */
export const href = (p = "/") => (p.startsWith("/") ? basePath + p : p);
/** Root-relative internal path -> absolute URL on the public origin. */
export const abs = (p = "/") => (/^https?:\/\//.test(p) ? p : site.url + (p.startsWith("/") ? p : "/" + p));
