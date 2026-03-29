/* ===================================================
   EHS-PORTFOLIO — Eduardo Santo Portfolio
   Minimal, purposeful JavaScript
   =================================================== */

(function () {
  'use strict';

  // ---- Nav scroll state ----
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Mobile nav toggle ----
  const toggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav__links');

  toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', open);
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', false);
    });
  });

  // ---- Scroll reveal ----
  const revealEls = document.querySelectorAll(
    '.timeline__item, .project-card, .skill-group, .soft-skill, .stats__item, .section__header, .contact__text, .cv-card'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach(el => observer.observe(el));

  // ---- Active nav link ----
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navAnchors.forEach(a => {
            a.style.color = a.getAttribute('href') === `#${id}`
              ? 'var(--clr-text)'
              : '';
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(sec => sectionObserver.observe(sec));

  // ---- Staggered reveal for grids ----
  const staggerParents = document.querySelectorAll('.projects__grid, .stats__grid, .skills__categories, .soft-skills');

  staggerParents.forEach(parent => {
    const children = parent.querySelectorAll('.reveal');
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 80}ms`;
    });
  });

})();
