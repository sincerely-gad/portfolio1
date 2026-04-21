/* ─────────────────────────────────────────────────────────────
   PORTFOLIO — script.js
───────────────────────────────────────────────────────────── */

/* ── Footer year ────────────────────────────────────────────── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── Mobile nav toggle ──────────────────────────────────────── */
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  /* Close mobile nav on link click */
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

/* ── Scroll-triggered fade-in ───────────────────────────────── */
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once only
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

fadeEls.forEach(el => observer.observe(el));

/* ── Stagger project cards ──────────────────────────────────── */
const cards = document.querySelectorAll('.card');
cards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 80}ms`;
});

/* ── Smooth scroll for anchor buttons ──────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Nav shrink on scroll ───────────────────────────────────── */
const header = document.querySelector('.nav-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;

  if (current > 60) {
    header.style.boxShadow = '0 2px 12px rgba(0,0,0,.08)';
  } else {
    header.style.boxShadow = 'none';
  }

  lastScroll = current;
}, { passive: true });
