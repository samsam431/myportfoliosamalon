// ============================================================
// SAM ALTIR P. ALON — VIRTUAL ASSISTANT PORTFOLIO
// Vanilla JS interactions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- THEME TOGGLE ---------------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const THEME_KEY = 'va-portfolio-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  applyTheme(getPreferredTheme());

  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  /* ---------------- MOBILE NAV ---------------- */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');

  function openMenu() {
    navMenu.classList.add('open');
    hamburger.classList.add('open');
    navOverlay.classList.add('visible');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    navOverlay.classList.remove('visible');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    navMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  navOverlay.addEventListener('click', closeMenu);

  navMenu.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) closeMenu();
  });

  /* ---------------- NAVBAR SCROLL STYLE ---------------- */
  const siteHeader = document.getElementById('siteHeader');
  function handleHeaderScroll() {
    if (window.scrollY > 12) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* ---------------- ACTIVE NAV LINK ON SCROLL ---------------- */
  const sections = document.querySelectorAll('main section[id], main#home');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    let currentId = 'home';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${currentId}`;
      link.classList.toggle('active-link', isActive);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* ---------------- SCROLL REVEAL ANIMATIONS ---------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------------- PORTFOLIO FILTER ---------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      portfolioCards.forEach(card => {
        const matches = filter === 'all' || card.dataset.category === filter;
        if (matches) {
          card.classList.remove('hidden-card');
          card.style.animation = 'fadeSlideUp 0.4s ease';
        } else {
          card.classList.add('hidden-card');
        }
      });
    });
  });

  /* ---------------- CUSTOMER SUPPORT DEMO MODAL ---------------- */
  const demoModal = document.getElementById('demoModal');
  const openDemoBtn = document.getElementById('openDemoModal');
  const closeDemoBtn = document.getElementById('closeDemoModal');
  let lastFocusedElement = null;

  function openModal() {
    lastFocusedElement = document.activeElement;
    demoModal.hidden = false;
    requestAnimationFrame(() => demoModal.classList.add('visible'));
    document.body.style.overflow = 'hidden';
    closeDemoBtn.focus();
  }

  function closeModal() {
    demoModal.classList.remove('visible');
    document.body.style.overflow = '';
    setTimeout(() => { demoModal.hidden = true; }, 300);
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  if (openDemoBtn) openDemoBtn.addEventListener('click', openModal);
  closeDemoBtn.addEventListener('click', closeModal);

  demoModal.addEventListener('click', (e) => {
    if (e.target === demoModal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && demoModal.classList.contains('visible')) closeModal();
  });

  /* ---------------- BACK TO TOP ---------------- */
  const backToTop = document.getElementById('backToTop');

  function handleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleBackToTop, { passive: true });
  handleBackToTop();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  /* ---------------- CONTACT FORM VALIDATION ---------------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  const fields = {
    name: { el: document.getElementById('name'), error: document.getElementById('nameError') },
    email: { el: document.getElementById('email'), error: document.getElementById('emailError') },
    subject: { el: document.getElementById('subject'), error: document.getElementById('subjectError') },
    message: { el: document.getElementById('message'), error: document.getElementById('messageError') },
  };

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function setFieldError(field, message) {
    field.error.textContent = message;
    field.el.closest('.form-group').classList.toggle('invalid', Boolean(message));
  }

  function validateForm() {
    let isValid = true;

    const nameVal = fields.name.el.value.trim();
    if (!nameVal) {
      setFieldError(fields.name, 'Please enter your name.');
      isValid = false;
    } else {
      setFieldError(fields.name, '');
    }

    const emailVal = fields.email.el.value.trim();
    if (!emailVal) {
      setFieldError(fields.email, 'Please enter your email.');
      isValid = false;
    } else if (!isValidEmail(emailVal)) {
      setFieldError(fields.email, 'Please enter a valid email address.');
      isValid = false;
    } else {
      setFieldError(fields.email, '');
    }

    const subjectVal = fields.subject.el.value.trim();
    if (!subjectVal) {
      setFieldError(fields.subject, 'Please enter a subject.');
      isValid = false;
    } else {
      setFieldError(fields.subject, '');
    }

    const messageVal = fields.message.el.value.trim();
    if (!messageVal) {
      setFieldError(fields.message, 'Please enter a message.');
      isValid = false;
    } else if (messageVal.length < 10) {
      setFieldError(fields.message, 'Message should be at least 10 characters.');
      isValid = false;
    } else {
      setFieldError(fields.message, '');
    }

    return isValid;
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    formSuccess.classList.remove('visible');

    if (!validateForm()) return;

    formSuccess.classList.add('visible');
    contactForm.reset();

    Object.values(fields).forEach(field => setFieldError(field, ''));

    setTimeout(() => {
      formSuccess.classList.remove('visible');
    }, 6000);
  });

  Object.values(fields).forEach(field => {
    field.el.addEventListener('input', () => {
      if (field.el.closest('.form-group').classList.contains('invalid')) {
        validateForm();
      }
    });
  });

});
