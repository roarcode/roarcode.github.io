// CSS pipeline: Designer kit v2 (design/fonts.css, tokens.css, components.css) + src/css/*.css -> ONE minified,
// content-hashed stylesheet at /assets/site.<hash>.css (immutable-cacheable).
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { bundle } from "lightningcss";
import { DIRS } from "./site.js";

const CSS_DIR = path.join(DIRS.src, "css");
// Order matters. 00-tokens is design/tokens.css (or the placeholder if the kit is absent).
const FILES = ["02-categories.css", "50-pagefind.css", "70-site.css"];
// Designer kit v2 (design/): fonts -> tokens -> [src/css/02-categories.css] -> components. design/ is never edited here.
const KIT_BEFORE = ["fonts.css", "tokens.css"];
const KIT_AFTER = ["components.css"];

export function buildCss() {
  // design/tokens.css is the Designer's source of truth (never edit it here).
  const tokens = path.join(DIRS.design, "tokens.css");
  if (!fs.existsSync(tokens)) throw new Error("design/tokens.css is missing");
  const entry = path.join(DIRS.cache, "entry.css");
  fs.mkdirSync(DIRS.cache, { recursive: true });
  const kit = (f) => path.join(DIRS.design, f);
  for (const f of [...KIT_BEFORE, ...KIT_AFTER]) if (!fs.existsSync(kit(f))) throw new Error(`design/${f} is missing`);
  const order = [...KIT_BEFORE.map(kit), path.join(CSS_DIR, FILES[0]), ...KIT_AFTER.map(kit), ...FILES.slice(1).map((f) => path.join(CSS_DIR, f))];
  const imports = order.map((p) => `@import ${JSON.stringify(p)};`).join("\n");
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
