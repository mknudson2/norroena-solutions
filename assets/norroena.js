// Scroll-triggered fade-in for in-page sections.
// Tiny by design — most of the site works with no JS at all.
//
// Progressive enhancement model:
//   1. The CSS rule that hides .scroll-reveal elements is namespaced
//      under .js-enabled — so the rule only applies when JS is running.
//   2. We add the .js-enabled class to <html> below, BEFORE setting up
//      the observers, so that:
//        - If this script runs successfully: elements briefly hide,
//          then fade in as they enter view.
//        - If this script fails for any reason (network error,
//          adblocker, browser bug, etc.): elements remain visible.
//          The site degrades to "no animations" rather than "no content."
//
// Dual-strategy reveal:
//   We use BOTH an IntersectionObserver and a scroll listener. Either
//   one is sufficient to reveal an element. The observer handles the
//   normal case efficiently; the scroll listener catches the edge cases
//   that IntersectionObserver misses on some mobile browsers — in
//   particular very tall elements (taller than the viewport) on mobile
//   Safari, which have historically had quirky observer behavior.
//
//   Reveal rule for the scroll listener: an element is revealed if
//   its top edge has entered the viewport (rect.top < viewport_height).
//   This is a simpler, more reliable signal than intersection ratios
//   and works regardless of element height.
(function () {
  // Flag JS as enabled BEFORE observing — this is what unlocks the
  // .scroll-reveal initial hidden state in the CSS.
  document.documentElement.classList.add("js-enabled");

  const revealed = new WeakSet();

  function reveal(el) {
    if (revealed.has(el)) return;
    revealed.add(el);
    el.classList.add("in");
  }

  // Strategy 1: IntersectionObserver (handles the normal case efficiently)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.01 },
  );

  const elements = document.querySelectorAll(".scroll-reveal");
  elements.forEach((el) => observer.observe(el));

  // Strategy 2: Scroll listener (catches anything the observer misses)
  // Throttled with requestAnimationFrame so it costs essentially nothing.
  let scrollPending = false;
  function checkScrollReveals() {
    scrollPending = false;
    const viewportH = window.innerHeight;
    elements.forEach((el) => {
      if (revealed.has(el)) return;
      const rect = el.getBoundingClientRect();
      // Reveal if the element's top edge has entered the viewport
      // (with a small buffer so the fade starts just before fully in view)
      if (rect.top < viewportH - 50) {
        reveal(el);
        observer.unobserve(el);
      }
    });
  }
  function onScroll() {
    if (!scrollPending) {
      scrollPending = true;
      requestAnimationFrame(checkScrollReveals);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  // Run once immediately to catch anything that's already in view at page load
  checkScrollReveals();
})();
