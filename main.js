document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll-triggered animations ───────────────────────── */
  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.scroll-animate').forEach((el) => {
    scrollObserver.observe(el);
  });

  /* ── Header shrink on scroll ────────────────────────────── */
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.style.padding = '0.6rem 5%';
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    } else {
      header.style.padding = '1rem 5%';
      header.style.boxShadow = 'none';
    }
  }, { passive: true });

  /* ── Sidebar active highlight on scroll ─────────────────── */
  const sidebarLinks = document.querySelectorAll('.sidebar nav a');
  if (sidebarLinks.length) {
    const sectionIds = [...sidebarLinks].map((a) => a.getAttribute('href').replace('#', ''));
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sidebarLinks.forEach((a) => a.classList.remove('active'));
            const link = document.querySelector(`.sidebar nav a[href="#${entry.target.id}"]`);
            if (link) link.classList.add('active');
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((s) => sectionObserver.observe(s));
  }
});
