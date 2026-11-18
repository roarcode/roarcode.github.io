// Boots Pagefind's default UI on /search/. The only client JS the site needs.
// Pagefind output lives at <base>/pagefind/ (created by `pagefind --site _site` after the build).
(function () {
  var el = document.getElementById("search");
  if (!el) return;
  var bundle = el.getAttribute("data-bundle");
  var base = el.getAttribute("data-base");
  var s = document.createElement("script");
  s.src = bundle + "pagefind-ui.js";
  s.onload = function () {
    /* global PagefindUI */
    var ui = new PagefindUI({ element: "#search", bundlePath: bundle, baseUrl: base, showSubResults: true, showImages: false, resetStyles: false, autofocus: true });
    var q = new URLSearchParams(location.search).get(el.getAttribute("data-query-param") || "q");
    if (q) ui.triggerSearch(q);
  };
  s.onerror = function () {
    el.innerHTML = '<p class="empty">Search index not built yet. Run <code>npm run build</code>.</p>';
  };
  document.head.appendChild(s);
})();
