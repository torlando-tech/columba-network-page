/**
 * Main site interactivity: nav scroll state, scroll reveals, mobile menu.
 */
(function () {
  'use strict';

  // ── Nav scroll effect ─────────────────────────────
  const nav = document.getElementById('nav');
  const SCROLL_THRESHOLD = 80;

  function updateNav() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // ── Mobile menu ───────────────────────────────────
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');

  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    menu.classList.add('nav__menu--open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('nav__menu--open');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function () {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  // Close on link click
  menu.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });

  // ── Scroll reveal ─────────────────────────────────
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Stagger cards within a grid
            const parent = entry.target.parentElement;
            if (parent) {
              const siblings = parent.querySelectorAll('.reveal');
              const index = Array.prototype.indexOf.call(siblings, entry.target);
              entry.target.style.transitionDelay = (index * 80) + 'ms';
            }
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
