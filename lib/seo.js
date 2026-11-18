// All SEO output lives here: <head> tags, Open Graph / Twitter, JSON-LD, breadcrumbs.
// Templates call {% seoHead pageType, item %}; item is a guide / category / page object
// from lib/content.js (or undefined for home / search / 404).
import { site, abs } from "./site.js";
import { escapeHtml as e } from "./util.js";

/** JSON for embedding in <script>: escape characters that could close the tag. */
const safeJson = (o) => JSON.stringify(o).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026").replace(/\u2028|\u2029/g, "");

export function breadcrumbsFor(pageType, item) {
  const home = { name: "Home", url: "/" };
  switch (pageType) {
    case "guide":
      return [home, { name: item.category.name, url: item.category.url }, { name: item.title, url: item.url }];
    case "category":
      return [home, { name: item.name, url: item.url }];
    case "page":
      return [home, { name: item.title, url: item.url }];
    case "search":
      return [home, { name: "Search", url: "/search/" }];
    default:
      return [home];
  }
}

const ids = { org: () => abs("/") + "#organization", web: () => abs("/") + "#website" };

function organization(assets) {
  const o = { "@type": "Organization", name: site.name, url: abs("/") };
  if (assets?.logoPng) o.logo = { "@type": "ImageObject", url: abs(assets.logoPng) };
  return o;
}

function breadcrumbLd(crumbs) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(c.url) })),
  };
}

export function seoHead(pageType, item, assets) {
  const crumbs = breadcrumbsFor(pageType, item);
  let title, description, path, ogType = "website", image = "/og/default.jpg", imageAlt = site.name;
  const graph = [];

  switch (pageType) {
    case "guide": {
      title = `${item.title} | ${site.name}`;
      description = item.description;
      path = item.url;
      ogType = "article";
      image = item.imageOverride || item.ogPath;
      imageAlt = item.title;
      const article = {
        "@type": item.schemaType,
        "@id": abs(item.url) + "#article",
        headline: item.title.slice(0, 110),
        description,
        url: abs(item.url),
        mainEntityOfPage: abs(item.url),
        image: [abs(image)],
        datePublished: item.publishedValue, // same value as the visible <time datetime>
        dateModified: item.updatedValue,    // same value as the visible "Last updated" <time datetime>
        inLanguage: "en",
        isAccessibleForFree: true,
        articleSection: item.category.name,
        // `author` is the visible byline (front-matter `author`, default = site byline).
        author: item.authorExplicit ? { "@type": "Person", name: item.author } : { "@type": "Organization", name: item.author, url: abs("/") },
        publisher: organization(assets),
      };
      if (item.tags.length) article.keywords = item.tags.join(", ");
      const cites = item.sources.filter((s) => s.url).map((s) => ({ "@type": "CreativeWork", name: s.label, url: s.url }));
      if (cites.length) article.citation = cites;
      graph.push(article);
      break;
    }
    case "category": {
      title = `${item.name}: GTA VI Guides | ${site.name}`;
      description = item.description || item.intro || `${item.name} guides for GTA VI.`;
      path = item.url;
      image = item.ogPath;
      imageAlt = item.name;
      break;
    }
    case "page": {
      title = `${item.title} | ${site.name}`;
      description = item.description;
      path = item.url;
      image = item.ogPath;
      imageAlt = item.title;
      break;
    }
    case "search":
      title = `Search | ${site.name}`;
      description = `Search every ${site.name} guide.`;
      path = "/search/";
      break;
    case "404":
      title = `Page not found | ${site.name}`;
      description = "That page does not exist.";
      path = "/404.html";
      break;
    default: // home
      title = `${site.name}: Unofficial GTA VI Guides`;
      description = site.homeDescription; // og:description / twitter:description reuse this value
      path = "/";
      graph.push({
        "@type": "WebSite",
        "@id": ids.web(),
        url: abs("/"),
        name: site.name,
        description,
        inLanguage: "en",
        publisher: organization(assets),
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: abs("/search/") + "?q={search_term_string}" },
          "query-input": "required name=search_term_string",
        },
      });
  }

  // Only Article/TechArticle, BreadcrumbList and WebSite+SearchAction are emitted (no FAQPage / HowTo / other types).
  graph.push(breadcrumbLd(crumbs));

  const noindex =
    site.noindex || pageType === "search" || pageType === "404" ||
    (item && (item.placeholder || item.draft || item.indexable === false));
  const canonical = abs(path);
  const img = abs(image);
  const robots = noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1";

  const m = [];
  m.push(`<title>${e(title)}</title>`);
  m.push(`<meta name="description" content="${e(description)}">`);
  // A 404 must not declare a canonical (or og:url): it is not a real, indexable URL.
  if (pageType !== "404") m.push(`<link rel="canonical" href="${e(canonical)}">`);
  m.push(`<meta name="robots" content="${robots}">`);
  // Open Graph
  m.push(`<meta property="og:site_name" content="${e(site.name)}">`);
  m.push(`<meta property="og:locale" content="${site.locale}">`);
  m.push(`<meta property="og:type" content="${ogType}">`);
  m.push(`<meta property="og:title" content="${e(item?.title || title.replace(/ \| .*$/, ""))}">`);
  m.push(`<meta property="og:description" content="${e(description)}">`);
  if (pageType !== "404") m.push(`<meta property="og:url" content="${e(canonical)}">`);
  m.push(`<meta property="og:image" content="${e(img)}">`);
  m.push(`<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">`);
  m.push(`<meta property="og:image:alt" content="${e(imageAlt)}">`);
  if (pageType === "guide") {
    m.push(`<meta property="article:published_time" content="${item.publishedValue}">`);
    m.push(`<meta property="article:modified_time" content="${item.updatedValue}">`);
    m.push(`<meta property="article:section" content="${e(item.category.name)}">`);
    item.tags.forEach((t) => m.push(`<meta property="article:tag" content="${e(t)}">`));
  }
  // Twitter / X
  m.push(`<meta name="twitter:card" content="summary_large_image">`);
  if (site.twitter) m.push(`<meta name="twitter:site" content="${e(site.twitter)}">`);
  m.push(`<meta name="twitter:title" content="${e(item?.title || title.replace(/ \| .*$/, ""))}">`);
  m.push(`<meta name="twitter:description" content="${e(description)}">`);
  m.push(`<meta name="twitter:image" content="${e(img)}">`);
  m.push(`<meta name="twitter:image:alt" content="${e(imageAlt)}">`);
  // JSON-LD (single @graph)
  m.push(`<script type="application/ld+json">${safeJson({ "@context": "https://schema.org", "@graph": graph })}</script>`);
  return m.join("\n    ");
}
