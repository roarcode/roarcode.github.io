// Detects which Designer-kit files exist in design/ so the site "just works" with
// or without them. Every lookup is a list of candidate paths (first hit wins), so
// small naming differences in the kit do not break the build.
import fs from "node:fs";
import path from "node:path";
import { DIRS } from "./site.js";

const D = (...p) => path.join(DIRS.design, ...p);
const first = (list) => list.find((p) => fs.existsSync(p)) || null;
const list = (dir, re) => (fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => re.test(f)) : []);

export function detectAssets() {
  // ---- brand marks -----------------------------------------------------------
  const wordmark = first([D("logo", "wordmark.svg"), D("logo", "logo.svg"), D("wordmark.svg"), D("logo.svg"), ...list(D("logo"), /wordmark.*\.svg$/i).map((f) => D("logo", f))]);
  const icon = first([D("logo", "icon.svg"), D("icon.svg"), D("icons", "icon.svg"), D("icons", "favicon.svg")]);

  // ---- favicon set (copied to site root) ------------------------------------
  const iconDirs = [D("icons"), D("favicons"), D("favicon"), DIRS.design];
  const FAV_RE = /^(favicon.*\.(ico|png|svg)|apple-touch-icon.*\.png|android-chrome.*\.png|icon-\d+.*\.png|mstile.*\.png|safari-pinned-tab\.svg|site\.webmanifest|manifest\.json|browserconfig\.xml)$/i;
  const favicons = new Map(); // filename -> absolute source
  for (const dir of iconDirs) for (const f of list(dir, FAV_RE)) if (!favicons.has(f)) favicons.set(f, path.join(dir, f));
  const has = (re) => [...favicons.keys()].find((f) => re.test(f));
  const faviconLinks = [];
  const ico = has(/^favicon\.ico$/i), svg = has(/^favicon\.svg$/i), png32 = has(/^favicon-32/i), png16 = has(/^favicon-16/i), apple = has(/^apple-touch-icon\.png$/i) || has(/^apple-touch-icon/i);
  if (ico) faviconLinks.push({ rel: "icon", href: `/${ico}`, sizes: "48x48" });
  if (svg) faviconLinks.push({ rel: "icon", href: `/${svg}`, type: "image/svg+xml", sizes: "any" });
  if (png32) faviconLinks.push({ rel: "icon", href: `/${png32}`, type: "image/png", sizes: "32x32" });
  if (png16) faviconLinks.push({ rel: "icon", href: `/${png16}`, type: "image/png", sizes: "16x16" });
  if (apple) faviconLinks.push({ rel: "apple-touch-icon", href: `/${apple}` });
  const manifest = has(/^site\.webmanifest$/i) || has(/^manifest\.json$/i) || null;

  // ---- OG ----------------------------------------------------------------------
  const ogDefault = first([D("og-default.png"), D("og", "og-default.png"), D("og", "default.png")]);
  const ogTemplate = first([D("og-template.svg"), D("og", "og-template.svg"), D("og", "template.svg")]);

  // ---- fonts / fonts for OG rendering -----------------------------------------------
  const fontsDir = fs.existsSync(D("fonts")) ? D("fonts") : null;
  // resvg cannot read woff2 or variable-font instances reliably: prefer the static TTFs in design/fonts,
  // plus Space Mono from design/src; fall back to everything in design/src.
  const staticTtf = list(D("fonts"), /\.(ttf|otf)$/i).map((f) => D("fonts", f));
  const mono = list(D("src"), /^SpaceMono.*\.ttf$/i).map((f) => D("src", f));
  const ogFontFiles = staticTtf.length ? [...staticTtf, ...mono] : list(D("src"), /\.(ttf|otf)$/i).map((f) => D("src", f));

  const hasHero = fs.existsSync(D("img", "hero-1280.webp"));
  const tokensCss = first([D("tokens.css")]);
  const logoPngName = has(/512.*\.png$/i) || has(/^apple-touch-icon.*\.png$/i);
  const logoPng = logoPngName ? `/${logoPngName}` : null; // Organization.logo in JSON-LD
  // Logos are used as <img> (inline SVGs with duplicate gradient ids break when one is display:none).
  const logoWordmark = wordmark ? `/assets/logo/${path.basename(wordmark)}` : null;
  const logoIcon = (icon || first([D("logo", "monogram-sun.svg")])) ? `/assets/logo/${path.basename(icon || D("logo", "monogram-sun.svg"))}` : null;

  return {
    hasHero, wordmark, logoWordmark, logoIcon, icon, logoPng, favicons, faviconLinks, manifest, ogDefault, ogTemplate, fontsDir, ogFontFiles, tokensCss,
    // preload only the two faces used above the fold
    preloadFonts: fontsDir ? list(fontsDir, /^(Inter|Syne).*\.woff2$/i) : [],
  };
}
