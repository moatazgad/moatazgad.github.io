/**
 * Editorial Precision — main.js
 * Vanilla JS, no dependencies.
 *  - Index overlay open/close (+ Escape)
 *  - Scroll-spy for the left rail (homepage + project pages)
 *  - IntersectionObserver-based reveal animations
 *  - Numeric stat counters
 *  - SVG diagram draw-in
 * All animation respects prefers-reduced-motion.
 */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------ *
   * Index overlay
   * ------------------------------------------------------------------ */
  (function initIndexOverlay() {
    var trigger = document.getElementById("index-trigger");
    var overlay = document.getElementById("index-overlay");
    var closeBtn = document.getElementById("index-close");
    if (!trigger || !overlay || !closeBtn) return;

    var lastFocused = null;

    function openOverlay() {
      lastFocused = document.activeElement;
      overlay.hidden = false;
      // Force layout before adding the open attribute so the transition runs.
      void overlay.offsetWidth;
      overlay.setAttribute("data-open", "");
      trigger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
      document.addEventListener("keydown", onKeydown);
    }

    function closeOverlay() {
      overlay.removeAttribute("data-open");
      trigger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeydown);
      var finish = function () {
        overlay.hidden = true;
        overlay.removeEventListener("transitionend", finish);
      };
      if (prefersReducedMotion) {
        finish();
      } else {
        overlay.addEventListener("transitionend", finish);
      }
      if (lastFocused && typeof lastFocused.focus === "function") {
        lastFocused.focus();
      } else {
        trigger.focus();
      }
    }

    function onKeydown(e) {
      if (e.key === "Escape" || e.key === "Esc") {
        closeOverlay();
      }
    }

    trigger.addEventListener("click", openOverlay);
    closeBtn.addEventListener("click", closeOverlay);

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeOverlay();
    });

    // Close overlay after navigating to an in-page anchor.
    overlay.querySelectorAll("[data-index-link]").forEach(function (link) {
      link.addEventListener("click", closeOverlay);
    });
  })();

  /* ------------------------------------------------------------------ *
   * Scroll-spy for left rail (homepage side-rail + project-rail)
   * ------------------------------------------------------------------ */
  (function initScrollSpy() {
    var railLinks = document.querySelectorAll(
      ".side-rail [data-rail-link], .project-rail [data-rail-link]"
    );
    if (!railLinks.length) return;

    var sections = [];
    railLinks.forEach(function (link) {
      var id = link.getAttribute("href");
      if (!id || id.charAt(0) !== "#") return;
      var section = document.getElementById(id.slice(1));
      if (section) sections.push({ link: link, section: section });
    });
    if (!sections.length) return;

    function setActive(id) {
      railLinks.forEach(function (link) {
        var isActive = link.getAttribute("href") === "#" + id;
        link.classList.toggle("is-active", isActive);
      });
    }

    if (!("IntersectionObserver" in window)) {
      setActive(sections[0].section.id);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach(function (item) {
      observer.observe(item.section);
    });

    setActive(sections[0].section.id);
  })();

  /* ------------------------------------------------------------------ *
   * Reveal animations (masked clip-path reveal)
   * ------------------------------------------------------------------ */
  (function initReveals() {
    var targets = document.querySelectorAll(".reveal");
    if (!targets.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  })();

  /* ------------------------------------------------------------------ *
   * Numeric stat counters — animate 0 -> target once in view.
   * Gracefully no-ops on non-numeric placeholder text (e.g. "XX%").
   * ------------------------------------------------------------------ */
  (function initCounters() {
    var counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    function parseTarget(raw) {
      var match = raw.match(/-?\d+(\.\d+)?/);
      if (!match) return null;
      return {
        value: parseFloat(match[0]),
        prefix: raw.slice(0, match.index),
        suffix: raw.slice(match.index + match[0].length),
        decimals: (match[0].split(".")[1] || "").length,
      };
    }

    function animateCounter(el) {
      var raw = el.getAttribute("data-target") || el.textContent;
      var parsed = parseTarget(raw);

      if (!parsed || prefersReducedMotion) {
        el.textContent = raw;
        return;
      }

      var duration = 1200;
      var start = null;
      var from = 0;

      function step(timestamp) {
        if (start === null) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        var current = from + (parsed.value - from) * eased;
        el.textContent =
          parsed.prefix + current.toFixed(parsed.decimals) + parsed.suffix;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          el.textContent = raw;
        }
      }

      window.requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCounter);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach(function (el) {
      observer.observe(el);
    });
  })();

  /* ------------------------------------------------------------------ *
   * SVG diagram draw-in (stroke-dasharray / stroke-dashoffset)
   * ------------------------------------------------------------------ */
  (function initDiagrams() {
    var diagrams = document.querySelectorAll(".diagram-svg");
    if (!diagrams.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      diagrams.forEach(function (svg) {
        svg.classList.add("is-drawn");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-drawn");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    diagrams.forEach(function (svg) {
      observer.observe(svg);
    });
  })();
})();
