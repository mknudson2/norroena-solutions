// Intersection-triggered fade-in for in-page sections.
// Tiny by design — most of the site works with no JS at all.
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
})();
