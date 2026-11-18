// Eleventy configuration. Input: src/  Output: _site/  Content: content/*.md (read by lib/content.js).
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { DIRS, site, href, abs } from "./lib/site.js";
import { loadContent } from "./lib/content.js";
import { detectAssets } from "./lib/assets.js";
import { buildCss } from "./lib/css.js";
import { generateOgImages } from "./lib/og.js";
import { seoHead, breadcrumbsFor } from "./lib/seo.js";
import { escapeXml } from "./lib/util.js";

export default function (eleventyConfig) {
  // ---- global data (functions are re-evaluated on every (re)build) ----------
  eleventyConfig.addGlobalData("site", () => ({ ...site, buildDate: new Date() }));
  // Computed once per build (reset in eleventy.before) so warnings print once.
  const memo = {};
  const once = (k, fn) => () => (memo[k] ??= fn());
  eleventyConfig.on("eleventy.before", () => Object.keys(memo).forEach((k) => delete memo[k]));
  const getContent = once("content", loadContent);
  const getAssets = once("assets", detectAssets);
  eleventyConfig.addGlobalData("library", getContent);
  eleventyConfig.addGlobalData("assets", getAssets);
  eleventyConfig.addGlobalData("css", () => buildCss());

  // ---- template helpers ---------------------------------------------------------
  eleventyConfig.addShortcode("seoHead", function (pageType, item) {
    return seoHead(pageType, item, getAssets());
  });
  eleventyConfig.addFilter("crumbs", (item, pageType) => breadcrumbsFor(pageType, item));
  eleventyConfig.addFilter("abs", (p) => abs(p));
  eleventyConfig.addFilter("href", (p) => href(p));
  eleventyConfig.addFilter("xml", (s) => escapeXml(s));
  eleventyConfig.addFilter("isoDate", (d) => (d instanceof Date ? d.toISOString() : d));
  // Feed readers need absolute URLs inside the HTML body.
  eleventyConfig.addFilter("absolutizeHtml", (html) => html.replace(/(href|src)="\/(?!\/)/g, (_m, a) => `${a}="${site.origin}/`));
  eleventyConfig.addFilter("cdata", (s) => String(s).replace(/]]>/g, "]]]]><![CDATA[>"));

  // ---- static files ---------------------------------------------------------------
  eleventyConfig.addPassthroughCopy({ "src/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/static": "." }, { dot: true }); // _headers, .nojekyll
  eleventyConfig.addPassthroughCopy({ "content/media": "media" });

  // ---- watching -----------------------------------------------------------------------
  eleventyConfig.addWatchTarget("content/");
  eleventyConfig.addWatchTarget("design/");
  eleventyConfig.addWatchTarget("lib/");
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.setServerOptions({ port: 8080, domDiff: false });
  eleventyConfig.setQuietMode(true);

  // ---- post-build: assets from the Designer kit, OG images, (dev) Pagefind -------------------
  eleventyConfig.on("eleventy.after", async ({ dir, runMode }) => {
    const out = path.resolve(dir.output);
    const assets = getAssets();
    const content = getContent();
    const copy = (src, dest) => {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(src, dest);
    };

    // favicons + webmanifest at the site root
    for (const [name, src] of assets.favicons) copy(src, path.join(out, name));
    // self-hosted fonts (preloaded in <head>)
    if (assets.fontsDir) for (const f of fs.readdirSync(assets.fontsDir).filter((f) => f.endsWith(".woff2"))) copy(path.join(assets.fontsDir, f), path.join(out, "assets/fonts", f));
    // design assets that pages may reference (logo/art) are copied as-is
    for (const sub of ["logo", "img"]) {
      const d = path.join(DIRS.design, sub);
      if (fs.existsSync(d)) for (const f of fs.readdirSync(d)) if (/\.(svg|png|jpe?g|webp|avif)$/i.test(f)) copy(path.join(d, f), path.join(out, "assets", sub, f));
    }

    // The kit's webmanifest uses root-absolute URLs; prefix them when deployed under a sub-path.
    const mf = path.join(out, "site.webmanifest");
    if (site.basePath && fs.existsSync(mf)) {
      const m = JSON.parse(fs.readFileSync(mf, "utf8"));
      m.start_url = site.basePath + "/";
      m.scope = site.basePath + "/";
      (m.icons || []).forEach((i) => (i.src = href(i.src)));
      fs.writeFileSync(mf, JSON.stringify(m, null, 2));
    }

    await generateOgImages(content, assets);

    const s = content.summary;
    console.log(`[build] ${s.guides} guides, ${s.pages} pages, ${content.categories.length} categories · ${s.placeholders} placeholder · ${s.rumours} rumour · warnings: ${s.warnings.length}, errors: ${s.errors.length}`);
    if (site.isPlaceholderUrl) console.log("[build] SITE_URL not set -> placeholder URL + noindex. Set SITE_URL for production.");

    // In dev (serve/watch) there is no postbuild step, so index for search here.
    if (runMode !== "build") {
      const bin = path.join(DIRS.root, "node_modules/.bin/pagefind");
      const r = spawnSync(bin, ["--site", out, "--force-language", "en", "--quiet"], { encoding: "utf8" });
      if (r.status !== 0) console.warn("[pagefind] failed:", r.stderr || r.stdout);
    }
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    templateFormats: ["njk", "11ty.js"],
    htmlTemplateEngine: "njk",
    pathPrefix: site.basePath + "/",
  };
}
