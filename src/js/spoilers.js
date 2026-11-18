// Site-wide "Show all spoilers" toggle (progressive enhancement only).
// Without JS the button stays hidden and every <details class="spoiler"> still opens on click.
// Preference is remembered in localStorage ("lg-spoilers" = "on"); default is OFF.
(function () {
  var KEY = "lg-spoilers";
  var btn = document.querySelector("[data-spoiler-toggle]");
  if (!btn) return;
  var state = btn.querySelector("[data-spoiler-state]");

  function read() { try { return localStorage.getItem(KEY) === "on"; } catch (e) { return false; } }
  function write(on) { try { localStorage.setItem(KEY, on ? "on" : "off"); } catch (e) { /* private mode */ } }
  function apply(on) {
    document.querySelectorAll("details.spoiler").forEach(function (d) { d.open = on; });
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    if (state) state.textContent = on ? "on" : "off";
    document.documentElement.setAttribute("data-spoilers", on ? "shown" : "hidden");
  }

  btn.hidden = false;
  // No spoiler blocks on this page: keep the toggle on wide screens only (CSS hides .spoiler-toggle--idle on phones).
  if (!document.querySelector("details.spoiler")) btn.classList.add("spoiler-toggle--idle");
  // Only touch the blocks when the preference is ON: with OFF the author's default (collapsed) stands.
  if (read()) apply(true); else document.documentElement.setAttribute("data-spoilers", "hidden");

  btn.addEventListener("click", function () {
    var on = btn.getAttribute("aria-pressed") !== "true";
    write(on);
    apply(on);
  });
  // Keep tabs in sync.
  window.addEventListener("storage", function (e) { if (e.key === KEY) apply(read()); });
})();

// Table of contents: collapsed by default (keeps the answer above the fold on phones),
// opened on desktop where it is a sticky sidebar. Same file to keep the site at one tiny script.
(function () {
  var toc = document.querySelector("details[data-toc]");
  if (toc && window.matchMedia("(min-width: 64rem)").matches) toc.open = true;
})();

// Mobile menu (kit hamburger): below 64rem the category nav is an overlay opened by [data-nav-toggle].
// Without JS the nav stays a visible, scrollable strip (see <noscript> in header.njk).
(function () {
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;
  function set(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Menu");
    nav.classList.toggle("site-nav--open", open);
  }
  toggle.addEventListener("click", function () { set(toggle.getAttribute("aria-expanded") !== "true"); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("site-nav--open")) { set(false); toggle.focus(); } });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
  window.matchMedia("(min-width: 64rem)").addEventListener("change", function (m) { if (m.matches) set(false); });
})();
