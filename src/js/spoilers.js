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
