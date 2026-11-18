// X (Twitter) embeds. Pages with an embed include only this file; platform.twitter.com/widgets.js is fetched
// the first time an embed scrolls near the viewport. Embeds inside a closed spoiler (<details class="spoiler">)
// are NOT loaded until that block is opened (the "Show all spoilers" toggle opens them too).
// Without JS the <blockquote> fallback (post text, @handle and link) stays readable.
(function () {
  var embeds = document.querySelectorAll("[data-x-embed]");
  if (!embeds.length) return;
  var widgetsReady = null;
  function loadWidgets() {
    if (widgetsReady) return widgetsReady;
    widgetsReady = new Promise(function (resolve, reject) {
      if (window.twttr && window.twttr.widgets) return resolve();
      var s = document.createElement("script");
      s.src = "https://platform.twitter.com/widgets.js";
      s.async = true;
      s.onload = function () { resolve(); };
      s.onerror = function () { widgetsReady = null; reject(new Error("widgets.js failed")); };
      document.head.appendChild(s);
    });
    return widgetsReady;
  }
  function closedSpoiler(el) {
    var d = el.closest("details.spoiler");
    return d && !d.open;
  }
  function render(el) {
    if (el.getAttribute("data-x-state") || closedSpoiler(el)) return;
    el.setAttribute("data-x-state", "loading");
    loadWidgets().then(function () {
      window.twttr.widgets.load(el);
      el.setAttribute("data-x-state", "done");
    }, function () {
      el.removeAttribute("data-x-state"); // keep the plain-text fallback; retry on next intersection
    });
  }
  if (!("IntersectionObserver" in window)) return; // fallback text + link only
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { io.unobserve(e.target); render(e.target); }
    });
  }, { rootMargin: "400px 0px" });
  embeds.forEach(function (el) { io.observe(el); });
  // A spoiler being opened: (re)observe its embeds so they load once visible.
  document.addEventListener("toggle", function (ev) {
    var d = ev.target;
    if (!d || d.tagName !== "DETAILS" || !d.open) return;
    d.querySelectorAll("[data-x-embed]").forEach(function (el) {
      if (!el.getAttribute("data-x-state")) { io.unobserve(el); io.observe(el); }
    });
  }, true);
})();
