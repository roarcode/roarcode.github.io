// CSS pipeline: design/tokens.css (Designer) + src/css/*.css -> ONE minified,
// content-hashed stylesheet at /assets/site.<hash>.css (immutable-cacheable).
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { bundle } from "lightningcss";
import { DIRS } from "./site.js";

const CSS_DIR = path.join(DIRS.src, "css");
// Order matters. 00-tokens is design/tokens.css (or the placeholder if the kit is absent).
const FILES = ["01-fonts.css", "02-categories.css", "10-base.css", "20-layout.css", "30-components.css", "40-article.css", "45-spoilers.css", "50-pagefind.css", "60-polish.css"];

export function buildCss() {
  // design/tokens.css is the Designer's source of truth (never edit it here).
  const tokens = path.join(DIRS.design, "tokens.css");
  if (!fs.existsSync(tokens)) throw new Error("design/tokens.css is missing");
  const entry = path.join(DIRS.cache, "entry.css");
  fs.mkdirSync(DIRS.cache, { recursive: true });
  const imports = [tokens, ...FILES.map((f) => path.join(CSS_DIR, f))].map((p) => `@import ${JSON.stringify(p)};`).join("\n");
  fs.writeFileSync(entry, imports);

  const { code, warnings } = bundle({
    filename: entry,
    minify: process.env.NODE_ENV !== "development",
    errorRecovery: true,
    targets: { chrome: 100 << 16, safari: 15 << 16, firefox: 100 << 16 },
  });
  (warnings || []).forEach((w) => console.warn("[css] warn", w.message));
  const css = code.toString();
  const hash = crypto.createHash("sha1").update(css).digest("hex").slice(0, 10);
  return { css, hash, file: `/assets/site.${hash}.css` };
}
