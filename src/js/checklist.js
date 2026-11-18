// Tick-boxes for step lists (progressive enhancement). Without JS the lists read as normal numbered steps.
// Progress is saved in localStorage under "lg-check:<slug>" (device-only, never sent anywhere).
(function () {
  var body = document.querySelector("[data-checklist]");
  if (!body) return;
  var KEY = "lg-check:" + body.getAttribute("data-checklist");
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { saved = {}; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) { /* private mode */ } }

  // Only top-level step lists in the article body (not quick answers, spoilers, tables or the FAQ).
  var items = [];
  body.querySelectorAll(":scope > ol > li, :scope > ul > li").forEach(function (li) { items.push(li); });
  if (!items.length) return;

  var total = items.length;
  var bar = document.createElement("div");
  bar.className = "checklist-bar";
  bar.setAttribute("role", "status");
  bar.innerHTML = '<span class="checklist-bar__count" aria-live="polite"></span><button type="button" class="checklist-bar__reset">Reset ticks</button>';
  body.insertBefore(bar, body.firstChild);
  var count = bar.querySelector(".checklist-bar__count");

  function id(li, i) { return i + ":" + (li.textContent || "").trim().slice(0, 40); }
  function refresh() {
    var done = items.filter(function (li, i) { return saved[id(li, i)]; }).length;
    count.textContent = done + " of " + total + " steps ticked (saved on this device)";
  }
  items.forEach(function (li, i) {
    var key = id(li, i);
    var label = document.createElement("label");
    label.className = "checklist-box";
    var cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = !!saved[key];
    cb.setAttribute("aria-label", "Done: " + (li.textContent || "").trim().slice(0, 80));
    var tick = document.createElement("span");
    tick.className = "checklist-box__tick";
    tick.setAttribute("aria-hidden", "true");
    label.appendChild(cb);
    label.appendChild(tick);
    li.classList.add("checklist-item");
    li.classList.toggle("is-done", cb.checked);
    li.insertBefore(label, li.firstChild);
    cb.addEventListener("change", function () {
      if (cb.checked) saved[key] = 1; else delete saved[key];
      li.classList.toggle("is-done", cb.checked);
      save(); refresh();
    });
  });
  bar.querySelector(".checklist-bar__reset").addEventListener("click", function () {
    saved = {}; save();
    body.querySelectorAll(".checklist-item").forEach(function (li) { li.classList.remove("is-done"); var c = li.querySelector("input"); if (c) c.checked = false; });
    refresh();
  });
  refresh();
})();
