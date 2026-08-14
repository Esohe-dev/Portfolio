/* Success Esohe Osarumwense — Portfolio
   Purposeful interactions only: sticky-nav state, active-section
   highlighting, mobile menu, scroll reveal, copy-to-clipboard. */

(function () {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');

  // Sticky nav shadow/border once the page scrolls
  function onScroll() {
    if (window.scrollY > 8) {
      nav && nav.classList.add('is-scrolled');
    } else {
      nav && nav.classList.remove('is-scrolled');
    }
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      let isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Close menu after a link is tapped
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active-section highlighting in the nav pill bar
  const sections = Array.prototype.slice.call(document.querySelectorAll('main [id]'));
  const navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    let byId = {};
    navLinks.forEach(function (l) {
      const id = l.getAttribute('href').replace('#', '');
      byId[id] = l;
    });
    const spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          const link = byId[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.classList.remove('is-active'); });
            link.classList.add('is-active');
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach(function (s) { spy.observe(s); });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    let ro = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Copy email to clipboard
  const copyBtn = document.querySelector('[data-copy-email]');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      let email = copyBtn.getAttribute('data-copy-email');
      let restore = copyBtn.textContent;
      function done(ok) {
        copyBtn.textContent = ok ? 'Copied' : 'Copy failed';
        setTimeout(function () { copyBtn.textContent = restore; }, 1800);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () { done(true); }, function () { done(false); });
      } else {
        done(false);
      }
    });
  }

  // Footer year
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();