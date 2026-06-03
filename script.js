/* ============================================
   script.js — personal website interactions
   ============================================ */

(function () {
  'use strict';

  // ── Year in footer ──────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ── Navbar: add "scrolled" class on scroll ──
  const navbar = document.getElementById('navbar');
  function handleScroll() {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }
    highlightNavLink();
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load

  // ── Mobile nav toggle ───────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      });
    });
  }

  // ── Active nav link on scroll ───────────────
  const sections = Array.from(document.querySelectorAll('section[id]'));

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

  // ── Contact form (client-side feedback only) ─
  const form       = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (form && formStatus) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name    = form.name.value.trim();
      const email   = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        showStatus('Please fill in all fields.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      // Simulate successful submission (replace with real endpoint if needed)
      showStatus('Thanks for your message! I\'ll be in touch soon.', 'success');
      form.reset();
    });
  }

  function showStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = 'form-status ' + type;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ── Scroll-reveal (Intersection Observer) ───
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
