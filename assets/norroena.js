// Intersection-triggered fade-in for in-page sections.
// Tiny by design — most of the site works with no JS at all.
//
// NOTE on threshold: kept very low (0.01) so the observer fires when
// ANY pixel of the element crosses into view. A higher threshold (e.g. 0.12)
// silently fails for elements taller than ~8× the viewport, because they
// can never have 12% of themselves visible at once on mobile — leaving
// the content stuck at opacity:0. This is exactly the failure mode the
// founder essay (one tall scroll-reveal wrapping a 2,000-word piece)
// originally exhibited on mobile. Do not raise this threshold.
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.01 },
  );

  document
    .querySelectorAll(".scroll-reveal")
    .forEach((el) => observer.observe(el));
})();
