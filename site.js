(function () {
  document.documentElement.classList.add("js");

  function visible() { return document.querySelector(".page[data-lang]:not([hidden])"); }

  /* ---------- Countdowns on dated lines ---------- */
  var now = new Date();
  var today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  var words = {
    en: { live: "In force", week: function (n) { return "In " + n + (n === 1 ? " week" : " weeks"); }, month: function (n) { return "In " + n + " months"; } },
    et: { live: "Kehtib", week: function (n) { return n + " nädala pärast"; }, month: function (n) { return n + " kuu pärast"; } }
  };
  document.querySelectorAll(".page[data-lang]").forEach(function (page) {
    var w = words[page.getAttribute("data-lang")];
    page.querySelectorAll("[data-date]").forEach(function (el) {
      var p = el.getAttribute("data-date").split("-");
      var days = Math.round((Date.UTC(+p[0], +p[1] - 1, +p[2]) - today) / 86400000);
      var st = el.querySelector(".status");
      var past = days <= 0;
      st.classList.toggle("live", past);
      st.textContent = past ? w.live : days < 70 ? w.week(Math.max(1, Math.round(days / 7))) : w.month(Math.round(days / 30.44));
    });
  });

  /* ---------- Freshness: check dates in one place ---------- */
  // aiAct: keep in sync with eu-ai-act-checker/legal_corpus.py CORPUS_VERIFIED_ON.
  // climate: the day the energy and climate rows were last checked by hand against the acts.
  // liability: the day the product liability date (Directive 2024/2853) was last checked.
  var CHECKS = { aiAct: "2026-08-24", climate: "2026-10-16", liability: "2026-10-21", staleAfterDays: 90 };
  var MON = {
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    et: ["jaan", "veebr", "märts", "apr", "mai", "juuni", "juuli", "aug", "sept", "okt", "nov", "dets"]
  };
  function day(iso) { var q = iso.split("-"); return Date.UTC(+q[0], +q[1] - 1, +q[2]); }
  function fmt(ms, l) {
    var d = new Date(ms);
    return l === "et" ? d.getUTCDate() + ". " + MON.et[d.getUTCMonth()] + " " + d.getUTCFullYear()
                      : d.getUTCDate() + " " + MON.en[d.getUTCMonth()] + " " + d.getUTCFullYear();
  }
  var ai = day(CHECKS.aiAct), cl = day(CHECKS.climate), li = day(CHECKS.liability);
  var due = Math.min(ai, cl, li) + CHECKS.staleAfterDays * 86400000;
  var overdue = today > due;
  document.querySelectorAll(".page[data-lang]").forEach(function (page) {
    var l = page.getAttribute("data-lang");
    var el = page.querySelector("[data-fresh]");
    if (!el) return;
    el.classList.toggle("overdue", overdue);
    el.textContent = l === "et"
      ? (overdue ? "Kontroll on hilinenud — kuupäevad võivad olla aegunud. Viimati kontrollitud: AI Act " + fmt(ai, l) + ", energia ja kliima " + fmt(cl, l) + ", tootevastutus " + fmt(li, l) + "."
                 : "Kuupäevad käsitsi kontrollitud: AI Act " + fmt(ai, l) + ", energia ja kliima " + fmt(cl, l) + ", tootevastutus " + fmt(li, l) + " · järgmine kontroll: " + fmt(due, l))
      : (overdue ? "Check overdue — dates may be outdated. Last checked: AI Act " + fmt(ai, l) + ", energy and climate " + fmt(cl, l) + ", product liability " + fmt(li, l) + "."
                 : "Dates checked by hand: AI Act " + fmt(ai, l) + ", energy and climate " + fmt(cl, l) + ", product liability " + fmt(li, l) + " · next check due: " + fmt(due, l));
  });

  /* ---------- Copy email ---------- */
  var addr = "acceleratedigitaltwin@gmail.com";
  document.querySelectorAll(".copy-email").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var page = btn.closest(".page");
      var st = page.querySelector(".copy-status");
      var et = page.getAttribute("data-lang") === "et";
      function done(m) { st.textContent = m; setTimeout(function () { st.textContent = ""; }, 2500); }
      function select() {
        var r = document.createRange(); r.selectNodeContents(page.querySelector(".email-text"));
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        done(et ? "Valitud, vajuta Ctrl+C" : "Selected, press Ctrl+C");
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(addr).then(function () { done(et ? "Kopeeritud" : "Copied"); }, select);
      } else { select(); }
    });
  });

  /* ---------- Language toggle ---------- */
  function setLang(target, initial) {
    document.querySelectorAll(".page[data-lang]").forEach(function (p) { p.hidden = p.getAttribute("data-lang") !== target; });
    document.documentElement.lang = target;
    // keep the address bar shareable: ?lang=et for Estonian, clean URL for English
    try {
      var u = new URL(location.href);
      if (target === "et") u.searchParams.set("lang", "et"); else u.searchParams.delete("lang");
      history.replaceState(null, "", u.pathname + u.search + (initial ? u.hash : ""));
    } catch (e) {}
  }
  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-set"));
      window.scrollTo(0, 0);
      var b = visible().querySelector(".lang-btn"); if (b) b.focus();
    });
  });
  // a link can ask for Estonian: ?lang=et, or an anchor that ends in -et (#contact-et)
  var wantsEt = /[?&]lang=et\b/.test(location.search) || /-et$/.test(location.hash);
  if (wantsEt) {
    setLang("et", true);
    var anchor = location.hash && document.getElementById(location.hash.slice(1));
    if (anchor) anchor.scrollIntoView({ behavior: "instant" });
  }

  /* ---------- Privacy-friendly analytics (off until configured) ---------- */
  // To turn on: create a free GoatCounter site (no cookies, no personal data)
  // and put its code here, e.g. "robertkond". Empty = nothing is loaded or sent.
  var GOATCOUNTER = "";
  function track(name) {
    try { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: "event/" + name, title: name, event: true }); } catch (e) {}
  }
  if (GOATCOUNTER) {
    var gc = document.createElement("script");
    gc.async = true; gc.src = "https://gc.zgo.at/count.js";
    gc.setAttribute("data-goatcounter", "https://" + GOATCOUNTER + ".goatcounter.com/count");
    document.head.appendChild(gc);
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("[data-track]");
    if (t) track(t.getAttribute("data-track"));
  });
  // one "view" per section per visit: service, projects, radar, contact
  if ("IntersectionObserver" in window) {
    var seen = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var k = en.target.getAttribute("data-view");
        if (en.isIntersecting && !seen[k]) { seen[k] = true; track("view-" + k); }
      });
    }, { threshold: 0.35 });
    document.querySelectorAll("[data-view]").forEach(function (el) { io.observe(el); });
  }

  /* ---------- Inquiry form: opens the visitor's email app, sends nothing itself ---------- */
  document.querySelectorAll("form.ask").forEach(function (form) {
    var et = form.closest(".page").getAttribute("data-lang") === "et";
    var st = form.querySelector(".form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var bad = null;
      form.querySelectorAll("[required]").forEach(function (f) {
        var ok = f.value.trim() !== "" && (f.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim()));
        f.setAttribute("aria-invalid", ok ? "false" : "true");
        if (!ok && !bad) bad = f;
      });
      if (bad) {
        st.classList.add("err");
        st.textContent = et ? "Täida palun märgitud väljad." : "Please fill in the marked fields.";
        bad.focus();
        return;
      }
      var v = function (n) { return form.elements[n].value.trim(); };
      var subject = (et ? "Päring: " : "Inquiry: ") + v("topic");
      var body = (et ? "Nimi: " : "Name: ") + v("name") + "\n" +
                 (v("org") ? (et ? "Organisatsioon: " : "Organization: ") + v("org") + "\n" : "") +
                 (et ? "E-post: " : "Email: ") + v("email") + "\n" +
                 (et ? "Teema: " : "Topic: ") + v("topic") + "\n\n" + v("msg");
      st.classList.remove("err");
      st.textContent = et ? "Avan e-posti rakenduse. Kui see ei avane, kirjuta aadressile acceleratedigitaltwin@gmail.com."
                          : "Opening your email app. If nothing opens, write to acceleratedigitaltwin@gmail.com.";
      track("inquiry-submit");
      location.href = "mailto:" + addr + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  });
})();
