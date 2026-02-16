(function () {
  'use strict';

  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelectorAll('.nav__link');
  const yearEl = document.getElementById('year');

  // Footer year
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Scroll: add/remove header background
  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      nav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open');
      document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
    });
  }

  // Close mobile nav when a link is clicked
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (nav && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        if (navToggle) navToggle.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  });

  // Intersection Observer: subtle fade-up for sections
  const sections = document.querySelectorAll('.about, .services, .gallery, .contact');
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  sections.forEach(function (section) {
    section.style.opacity = '0';
    section.style.transform = 'translateY(24px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Add visible class styles via a small stylesheet injection (or rely on CSS)
  const style = document.createElement('style');
  style.textContent = `
    .about.is-visible,
    .services.is-visible,
    .gallery.is-visible,
    .contact.is-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // Contact form: open mailto so enquiry goes to info@mediawalls.ie
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = (document.getElementById('contact-name') && document.getElementById('contact-name').value) || '';
      const email = (document.getElementById('contact-email') && document.getElementById('contact-email').value) || '';
      const phone = (document.getElementById('contact-phone') && document.getElementById('contact-phone').value) || '';
      const message = (document.getElementById('contact-message') && document.getElementById('contact-message').value) || '';
      const subject = 'Media Walls – Enquiry from ' + (name || 'website');
      const body = (name ? 'Name: ' + name + '\n' : '') + (email ? 'Email: ' + email + '\n' : '') + (phone ? 'Phone: ' + phone + '\n\n' : '\n') + (message ? 'Message:\n' + message : '');
      const mailto = 'mailto:info@mediawalls.ie?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      window.location.href = mailto;
    });
  }
})();
