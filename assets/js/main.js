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
  var EMAIL_PARTS = { user: "svitlana.piven2311", domain: "gmail.com" };

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

    /* --- clickable header --------------------------------------------------
       The button holds only the title, so the <h3> stays a real heading
       (a heading inside a button is invalid HTML). CSS then stretches the
       button's ::after over the whole header, making the card clickable
       without swallowing the links inside the expanded body. */
    var header = el("div", "case__header");

    header.appendChild(el("span", "case__num", data.id));

    var heading = el("h3", "case__title");
    var toggle = el("button", "case__toggle", data.title);
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", bodyId);
    heading.appendChild(toggle);
    header.appendChild(heading);

    header.appendChild(el("p", "case__summary", data.summary));

    if (data.metric) {
      header.appendChild(el("span", "case__metric", data.metric));
    }

    if (data.stack && data.stack.length) {
      var chips = el("ul", "chips");
      data.stack.forEach(function (tool) {
        chips.appendChild(el("li", "chip", tool));
      });
      header.appendChild(chips);
    }

    /* The visible cue that the card opens. The button already announces its
       state to screen readers, so this is decoration for sighted users. */
    var action = el("span", "case__action");
    action.setAttribute("aria-hidden", "true");
    var actionText = el("span", "case__action-text", "Read the write-up");
    action.appendChild(actionText);

    /* An SVG chevron rather than a "▾" glyph — the character renders as a
       hairline dot in several fonts. */
    var arrow = el("span", "case__arrow");
    arrow.innerHTML =
      '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" ' +
      'stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
      'stroke-linejoin="round"><path d="M4 6.5 8 10.5 12 6.5"/></svg>';
    action.appendChild(arrow);

    header.appendChild(action);

    article.appendChild(header);

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

    function setOpen(isOpen) {
      article.classList.toggle("is-open", isOpen);
      body.hidden = !isOpen;
      toggle.setAttribute("aria-expanded", String(isOpen));
      actionText.textContent = isOpen ? "Hide the write-up" : "Read the write-up";
    }

    return {
      article: article,
      toggle: toggle,
      setOpen: setOpen,
      isOpen: function () { return article.classList.contains("is-open"); }
    };
  }

  function renderCases() {
    var grid = document.getElementById("cases-grid");
    if (!grid || typeof CASES === "undefined") return;

    var cards = CASES.map(function (data, i) {
      var card = buildCase(data, i);
      grid.appendChild(card.article);
      return card;
    });

    cards.forEach(function (card) {
      card.toggle.addEventListener("click", function () {
        var opening = !card.isOpen();

        /* One at a time. With five cases, several open at once turns the
           section into a wall of text and makes the page jump on every click. */
        cards.forEach(function (other) {
          if (other !== card) other.setOpen(false);
        });
        card.setOpen(opening);

        /* An open card spans the full row, which in a 3-up grid strands the
           cards beside it in a half-empty row. Drop the whole grid to one
           column while reading, so nothing is left orphaned. */
        grid.classList.toggle("is-reading", opening);
      });
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
