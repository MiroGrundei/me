/* ============================================
   script.js - personal website interactions
   ============================================ */

(function () {
  'use strict';

  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const themes = {
    base: 'styles.css',
    'deep-lab': 'styles-deep-lab.css',
    academic: 'styles-academic.css',
    console: 'styles-console.css',
    minimal: 'styles-minimal.css'
  };
  const requestedTheme = new URLSearchParams(window.location.search).get('theme');
  const themeStylesheet = document.getElementById('theme-stylesheet');
  if (themeStylesheet && themes[requestedTheme]) {
    themeStylesheet.setAttribute('href', themes[requestedTheme]);
  }

  const navbar = document.getElementById('navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const sections = Array.from(document.querySelectorAll('section[id]'));

  // Navbar: add "scrolled" class on scroll
  function handleScroll() {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }
    highlightNavLink();
  }

  // Mobile nav toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      });
    });
  }

  // Active nav link on scroll
  function highlightNavLink() {
    if (!navLinks) return;

    const scrollY = window.scrollY + 100;
    let current = '';

    sections.forEach(function (section) {
      if (scrollY >= section.offsetTop) {
        current = section.id;
      }
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Scroll-reveal
  const revealEls = document.querySelectorAll(
    '.skill-card, .project-card, .stat, .about-text'
  );

  if ('IntersectionObserver' in window) {
    revealEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }
}());
