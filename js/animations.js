/* ============================================================
   VOYAGER — animations.js
   Simplified for Elm: Page loader curtain, hero parallax,
   and nav scroll port bridge.
   ============================================================ */

(function () {
  'use strict';

  // ============================================================
  // PAGE LOADER
  // ============================================================
  const loader = document.getElementById('loader');

  function hideLoader() {
    if (loader) {
      loader.classList.add('hidden');
    }
    document.body.style.overflow = '';
  }

  // Minimum display time for the loader (1.8s)
  document.body.style.overflow = 'hidden';
  const loaderStart = Date.now();

  window.addEventListener('load', () => {
    const elapsed = Date.now() - loaderStart;
    const delay = Math.max(0, 1800 - elapsed);
    setTimeout(hideLoader, delay);
  });

  // Fallback in case load event fires very late
  setTimeout(hideLoader, 4000);

  // ============================================================
  // HERO PARALLAX
  // ============================================================
  let heroParallaxTicking = false;

  function onHeroScroll() {
    if (!heroParallaxTicking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroSlides = document.getElementById('hero-slides');
        if (heroSlides && scrollY < window.innerHeight) {
          heroSlides.style.transform = `translateY(${scrollY * 0.4}px)`;
        }
        heroParallaxTicking = false;
      });
      heroParallaxTicking = true;
    }
  }

  window.addEventListener('scroll', onHeroScroll, { passive: true });

  // ============================================================
  // NAV SCROLL PORT BRIDGE
  // ============================================================
  window.addEventListener('scroll', () => {
    if (window.app && window.app.ports && window.app.ports.navScroll) {
      window.app.ports.navScroll.send(window.scrollY > 60);
    }
  }, { passive: true });

  // Stub VoyagerAnimations to prevent any console errors if imported/called elsewhere
  window.VoyagerAnimations = {
    init() {},
    reinitTilt() {},
    reinitReveal() {}
  };

})();
