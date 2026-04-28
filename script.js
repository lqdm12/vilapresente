// Vila Presente - Main JavaScript

// Nav scroll effect
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// Fade-up on scroll
const fadeEls = document.querySelectorAll('.fade-up');
if (fadeEls.length > 0) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { 
      if (e.isIntersecting) e.target.classList.add('visible'); 
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => obs.observe(el));
}

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    const answer = item.querySelector('.faq-a');
    
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      const a = i.querySelector('.faq-a');
      if (a) a.style.maxHeight = null;
    });
    
    if (!isOpen && answer) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (target) { 
      e.preventDefault(); 
      target.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
      
      // Close mobile menu if open
      const navLinks = document.querySelector('.nav-links');
      if (navLinks && window.innerWidth <= 900) {
        navLinks.style.display = 'none';
      }
    }
  });
});

// Mobile menu toggle
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  if (!links) return;
  
  const isOpen = links.style.display === 'flex';
  
  if (isOpen) {
    links.style.display = 'none';
    document.body.style.overflow = '';
  } else {
    links.style.display = 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'fixed';
    links.style.top = '0';
    links.style.left = '0';
    links.style.right = '0';
    links.style.bottom = '0';
    links.style.background = 'rgba(28,58,42,.98)';
    links.style.alignItems = 'center';
    links.style.justifyContent = 'center';
    links.style.gap = '32px';
    links.style.zIndex = '200';
    links.style.fontSize = '18px';
    document.body.style.overflow = 'hidden';
  }
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth <= 900 && navLinks) {
      navLinks.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
});

// Auto-detect language (runs once per session)
(function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const hasLang = currentPage.includes('-pt') || currentPage.includes('-es') || currentPage.includes('-en');
  
  if (!hasLang && !sessionStorage.getItem('langRedirected')) {
    const userLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    sessionStorage.setItem('langRedirected', 'true');
    
    if (userLang.startsWith('pt')) {
      window.location.href = 'index-pt.html';
    } else if (userLang.startsWith('es')) {
      window.location.href = 'index-es.html';
    }
  }
})();

console.log('Vila Presente - Site loaded âœ“');
