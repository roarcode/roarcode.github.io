// Human-readable labels + trust kind for source links. Raw URLs are never shown as link text.
//   kind: "official" (Rockstar / Take-Two / PlayStation / Xbox), "press" (reputable outlet), "community" (fan site, wiki, other)
const HOSTS = [
  // [host regex, publisher, kind]
  [/(^|\.)rockstargames\.com$/, "Rockstar Games", "official"],
  [/^taketwointeractivesoftwareinc\.gcs-web\.com$/, "Take-Two Interactive", "official"],
  [/^blog\.playstation\.com$/, "PlayStation Blog", "official"],
  [/^(store|status)\.playstation\.com$/, "PlayStation", "official"],
  [/(^|\.)playstation\.com$/, "PlayStation", "official"],
  [/^news\.xbox\.com$/, "Xbox Wire", "official"],
  [/(^|\.)xbox\.com$/, "Xbox", "official"],
  [/(^|\.)microsoft\.com$/, "Microsoft", "official"],
  [/(^|\.)videogameschronicle\.com$/, "VGC", "press"],
  [/(^|\.)usatoday\.com$/, "USA Today", "press"],
  [/(^|\.)gamespot\.com$/, "GameSpot", "press"],
  [/(^|\.)gameinformer\.com$/, "Game Informer", "press"],
  [/(^|\.)polygon\.com$/, "Polygon", "press"],
  [/(^|\.)pcgamer\.com$/, "PC Gamer", "press"],
  [/(^|\.)gamesradar\.com$/, "GamesRadar+", "press"],
  [/(^|\.)pushsquare\.com$/, "Push Square", "press"],
  [/(^|\.)forbes\.com$/, "Forbes", "press"],
  [/(^|\.)theverge\.com$/, "The Verge", "press"],
  [/(^|\.)vice\.com$/, "Vice", "press"],
  [/(^|\.)tomshardware\.com$/, "Tom's Hardware", "press"],
  [/(^|\.)pcgameshardware\.de$/, "PC Games Hardware", "press"],
  [/(^|\.)1news\.co\.nz$/, "1News (NZ)", "press"],
  [/(^|\.)ign\.com$/, "IGN", "press"],
  [/(^|\.)eurogamer\.net$/, "Eurogamer", "press"],
  [/(^|\.)kotaku\.com$/, "Kotaku", "press"],
  [/(^|\.)wikipedia\.org$/, "Wikipedia", "community"],
  [/(^|\.)gta6everything\.com$/, "GTA6Everything", "community"],
  [/(^|\.)gtasix\.org$/, "GTA Six (fan site)", "community"],
  [/(^|\.)gta6record\.com$/, "GTA6Record (fan site)", "community"],
  [/(^|\.)gta6news\.gg$/, "GTA6News (fan site)", "community"],
  [/(^|\.)mapheist\.com$/, "MapHeist (fan site)", "community"],
  [/(^|\.)sixstarledger\.com$/, "Six Star Ledger (fan site)", "community"],
  [/(^|\.)technobezz\.com$/, "Technobezz", "community"],
];

// Exact / prefix overrides for the pages we cite most (nicer than a title-cased slug).
const TITLES = [
  [/rockstargames\.com\/VI\/?$/i, "Official GTA VI site"],
  [/rockstargames\.com\/VI\/lucia|only-in-leonida\/lucia/i, "Official GTA VI character page: Lucia"],
  [/rockstargames\.com\/VI\/only-in-leonida\/jason/i, "Official GTA VI character page: Jason"],
  [/rockstargames\.com\/VI\/pre-load-now/i, "Official GTA VI pre-load page"],
  [/newswire\/article\/o3982oa93a23k4/i, "Rockstar Newswire: the music of GTA VI (in-game radio stations)"],
  [/newswire\/article\/7599a881942544/i, "Rockstar Newswire: GTA VI: The Album"],
  [/newswire\/article\/39ak8a12395591/i, "Rockstar Newswire: GTA VI original score by Justice"],
  [/rockstargames\.com\/newswire/i, "Rockstar Newswire"],
  [/usatoday\.com.*gta-6-preload/i, "USA Today: GTA 6 pre-load, release date and file size"],
  [/gtasix\.org.*midnight-local/i, "GTA Six (fan site): Rockstar confirms midnight local release"],
  [/gamesradar\.com.*60fps/i, "GamesRadar+: GTA 6 won't run at 60 FPS, even on PS5 Pro"],
  [/support\.rockstargames\.com\/servicestatus/i, "Rockstar Support: service status"],
  [/support\.rockstargames\.com\/?$/i, "Rockstar Support"],
  [/store\.rockstargames\.com/i, "Rockstar Games Store"],
  [/playstation\.com\/en-us\/support\/games\/gta-vi-support/i, "PlayStation Support: GTA VI help"],
  [/playstation\.com\/en-us\/games\/grand-theft-auto-vi/i, "PlayStation: GTA VI game page"],
  [/playstation\.com\/en-us\/support\/hardware\/safe-mode/i, "PlayStation Support: PS5 Safe Mode"],
  [/playstation\.com\/en-us\/support\/games\/troubleshoot-downloaded/i, "PlayStation Support: fix a downloaded game"],
  [/playstation\.com\/en-us\/support\/games\/game-launch-issues/i, "PlayStation Support: game launch issues"],
  [/blog\.playstation\.com\/2026\/11\/10\/pre-load/i, "PlayStation Blog: pre-load GTA VI on PS5"],
  [/status\.playstation\.com/i, "PlayStation Network service status"],
  [/store\.playstation\.com.*GTAVIULTIMATE/i, "PlayStation Store: GTA VI Ultimate Edition"],
  [/store\.playstation\.com.*GTAVISTANDARD/i, "PlayStation Store: GTA VI Standard Edition"],
  [/store\.playstation\.com/i, "PlayStation Store"],
  [/news\.xbox\.com.*xbox-cloud-gaming/i, "Xbox Wire: GTA VI comes to Xbox Cloud Gaming"],
  [/support\.xbox\.com.*xbox-live-status/i, "Xbox Support: service status"],
  [/support\.xbox\.com.*view-status-software-install/i, "Xbox Support: check install progress"],
  [/xbox\.com.*ultimate-edition-upgrade/i, "Microsoft Store: GTA VI Ultimate Edition Upgrade"],
  [/xbox\.com.*ultimate-edition/i, "Microsoft Store: GTA VI Ultimate Edition"],
  [/taketwointeractive.*pre-orders/i, "Take-Two press release: GTA VI pre-orders"],
];

const small = new Set(["a", "an", "and", "the", "of", "to", "in", "on", "for", "or", "at", "is", "will", "at"]);
const tidy = (slug) => {
  const words = decodeURIComponent(slug).replace(/\.(html?|php)$/i, "").split(/[-_+\s]+/).filter((w) => w && !/^\d{4,}$/.test(w) && !/^[a-z0-9]{12,}$/i.test(w));
  const fix = (w) => (/^gta6$/i.test(w) ? "GTA 6" : /^wont$/i.test(w) ? "Won't" : /^pdt$/i.test(w) ? "PDT" : /^edt$/i.test(w) ? "EDT" : w);
  const cap = words.map(fix).slice(0, 11).map((w, i) => (/^(gta|ps5|ps4|vi|vgc|usa|uk|pc|ui|fps|pssr|dlc)$/i.test(w) ? w.toUpperCase() : i > 0 && small.has(w.toLowerCase()) ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1)));
  return cap.join(" ") + (words.length > 11 ? "…" : "");
};

/** URL -> { label, kind, publisher } */
export function describeSource(url) {
  let u;
  try {
    u = new URL(url);
  } catch {
    return { label: String(url || "Source"), kind: "community", publisher: "" };
  }
  const host = u.hostname.replace(/^www\./, "");
  const hit = HOSTS.find(([re]) => re.test(host));
  const publisher = hit ? hit[1] : host.replace(/\.[a-z]+$/, "").replace(/(^|[.-])(\w)/g, (_m, a, b) => (a ? " " : "") + b.toUpperCase());
  const kind = hit ? hit[2] : "community";
  const full = host + u.pathname + u.search;
  const t = TITLES.find(([re]) => re.test(full));
  if (t) return { label: t[1], kind, publisher };
  const seg = u.pathname.split("/").filter(Boolean).pop() || "";
  const title = tidy(seg);
  const label = title && title.length > 3 ? `${publisher}: ${title}` : publisher;
  return { label, kind, publisher };
}
export const KIND_LABEL = { official: "Official", press: "Press", community: "Community" };
