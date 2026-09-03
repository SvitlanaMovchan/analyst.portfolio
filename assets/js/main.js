/* ============================================================================
   main.js — rendering and interaction. You normally don't need to edit this.
   The one thing you DO edit here is the email in the CONTACT_EMAIL parts below.
   ========================================================================== */

(function () {
  "use strict";

  /* --------------------------------------------------------------------------
     EDIT: your email, split into parts so scrapers reading the raw HTML
     don't pick it up. The page reassembles it at load time.
     For hello@example.com you would write: user "hello", domain "example.com"
     ------------------------------------------------------------------------ */
  var EMAIL_PARTS = { user: "your.name", domain: "gmail.com" };

  /* ---------------------------------------------------------------- helpers */

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /* ------------------------------------------------------------ case studies */

  function buildBlock(label, text) {
    var block = el("div", "case__block");
    block.appendChild(el("p", "case__label", label));
    block.appendChild(el("p", "case__text", text));
    return block;
  }

  function buildCase(data, index) {
    var article = el("article", "case");
    var bodyId = "case-body-" + data.id;

    /* --- clickable header ------------------------------------------------ */
    var toggle = el("button", "case__toggle");
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", bodyId);

    var head = el("div", "case__head");
    head.appendChild(el("span", "case__num", data.id));
    var arrow = el("span", "case__arrow", "▾");
    arrow.setAttribute("aria-hidden", "true");
    head.appendChild(arrow);
    toggle.appendChild(head);

    toggle.appendChild(el("h3", "case__title", data.title));
    toggle.appendChild(el("p", "case__summary", data.summary));

    if (data.metric) {
      toggle.appendChild(el("span", "case__metric", data.metric));
    }

    if (data.stack && data.stack.length) {
      var chips = el("ul", "chips");
      data.stack.forEach(function (tool) {
        chips.appendChild(el("li", "chip", tool));
      });
      toggle.appendChild(chips);
    }

    article.appendChild(toggle);

    /* --- expandable body ------------------------------------------------- */
    var body = el("div", "case__body");
    body.id = bodyId;
    body.hidden = true;

    if (data.context)  body.appendChild(buildBlock("Context", data.context));
    if (data.task)     body.appendChild(buildBlock("Task", data.task));
    if (data.approach) body.appendChild(buildBlock("Approach", data.approach));
    if (data.result)   body.appendChild(buildBlock("Result", data.result));

    if (data.image) {
      var img = el("img", "case__img");
      img.src = data.image;
      img.alt = data.title + " — dashboard screenshot";
      img.loading = "lazy";
      body.appendChild(img);
    }

    /* A case with no document link still renders — the button just hides. */
    if (data.docUrl) {
      var cta = el("div", "case__cta");
      var link = el("a", "btn btn--primary", "Open full solution →");
      link.href = data.docUrl;
      link.target = "_blank";
      link.rel = "noopener";
      cta.appendChild(link);
      body.appendChild(cta);
    }

    article.appendChild(body);

    toggle.addEventListener("click", function () {
      var isOpen = article.classList.toggle("is-open");
      body.hidden = !isOpen;
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    return article;
  }

  function renderCases() {
    var grid = document.getElementById("cases-grid");
    if (!grid || typeof CASES === "undefined") return;

    CASES.forEach(function (data, i) {
      grid.appendChild(buildCase(data, i));
    });
  }

  /* ------------------------------------------------------------------ email */

  function wireEmailLinks() {
    var address = EMAIL_PARTS.user + "@" + EMAIL_PARTS.domain;

    document.querySelectorAll("[data-email-link]").forEach(function (link) {
      link.href = "mailto:" + address;
      /* Only replace the text on links that are placeholders for the address
         itself — the hero button keeps its own label. */
      if (link.textContent.trim() === "loading…") {
        link.textContent = address;
      }
    });
  }

  /* ------------------------------------------------- active nav highlighting */

  function wireNavHighlight() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll(".nav__links a")
    );
    var sections = links
      .map(function (link) { return document.querySelector(link.hash); })
      .filter(Boolean);

    if (!sections.length || !("IntersectionObserver" in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle("is-active", link.hash === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-20% 0px -70% 0px" });

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ------------------------------------------------------------------- init */

  function init() {
    renderCases();
    wireEmailLinks();
    wireNavHighlight();

    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
