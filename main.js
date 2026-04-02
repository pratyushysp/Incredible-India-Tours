// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'white';
    navLinks.style.padding = '20px 5%';
    navLinks.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
  });
}

// ===== PAGE LOADER =====
window.addEventListener('load', () => {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 1300);
  }
});

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));

// ===== NEWSLETTER FORM =====
const newsletterBtn = document.querySelector('.newsletter-form .btn');
if (newsletterBtn) {
  newsletterBtn.addEventListener('click', () => {
    const input = document.querySelector('.newsletter-input');
    if (input && input.value.includes('@')) {
      newsletterBtn.textContent = '✓ Subscribed!';
      newsletterBtn.style.background = 'linear-gradient(135deg,#2D6A4F,#1B4332)';
      input.value = '';
      setTimeout(() => {
        newsletterBtn.textContent = 'Subscribe';
        newsletterBtn.style.background = '';
      }, 3000);
    } else {
      input.style.outline = '2px solid #FF6B2B';
      setTimeout(() => input.style.outline = '', 2000);
    }
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== FILTER PACKAGES BY TYPE (packages page) =====
function filterPackages(type) {
  const cards = document.querySelectorAll('.pkg-card-full');
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(t => t.classList.remove('active'));
  document.querySelector(`[data-type="${type}"]`)?.classList.add('active');

  cards.forEach(card => {
    if (type === 'all' || card.dataset.type === type) {
      card.style.display = 'block';
      card.style.animation = 'fadeIn 0.4s ease';
    } else {
      card.style.display = 'none';
    }
  });
}

// Check URL param on packages page
const urlParams = new URLSearchParams(window.location.search);
const typeParam = urlParams.get('type');
if (typeParam) {
  setTimeout(() => filterPackages(typeParam), 100);
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(counter => {
    const target = parseInt(counter.textContent.replace(/\D/g,''));
    if (isNaN(target)) return;
    let count = 0;
    const suffix = counter.textContent.replace(/[0-9]/g,'');
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      count = Math.min(count + step, target);
      counter.textContent = count + suffix;
      if (count >= target) clearInterval(timer);
    }, 30);
  });
}
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      statsObserver.disconnect();
    }
  }, { threshold: 0.5 });
  statsObserver.observe(heroStats);
}

// ===== ACTIVE NAV LINK =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href').split('/').pop();
  if (href === currentPage) link.classList.add('active');
});

console.log('🌏 Incredible India Tours — Loaded Successfully!');
