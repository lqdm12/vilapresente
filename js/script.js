// ====================== VILA PRESENTE - SCRIPT.JS ======================

document.addEventListener('DOMContentLoaded', function() {

    // ── NAV SCROLL EFFECT ──
    const nav = document.getElementById('nav');
    
    function handleScroll() {
        if (window.scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);

    // ── FADE-UP ANIMATIONS ──
    const fadeEls = document.querySelectorAll('.fade-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    });

    fadeEls.forEach(el => observer.observe(el));

    // ── FAQ ACCORDION ──
    const faqQuestions = document.querySelectorAll('.faq-q');
    
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const answer = item.querySelector('.faq-a');
            const isOpen = item.classList.contains('open');

            // Fecha todos os outros
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                faqItem.classList.remove('open');
                const faqAnswer = faqItem.querySelector('.faq-a');
                if (faqAnswer) faqAnswer.style.maxHeight = null;
            });

            // Abre o atual se não estava aberto
            if (!isOpen) {
                item.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // ── SMOOTH SCROLL PARA LINKS INTERNOS ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ── MOBILE MENU (HAMBURGER) ──
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            toggleMobileMenu();
        });
    }

    function toggleMobileMenu() {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'fixed';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(28,58,42,0.98)';
            navLinks.style.padding = '40px 20px';
            navLinks.style.alignItems = 'center';
            navLinks.style.justifyContent = 'center';
            navLinks.style.gap = '32px';
            navLinks.style.zIndex = '200';
            navLinks.style.fontSize = '18px';
        }
    }

    // Fechar menu mobile ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                navLinks.style.display = 'none';
            }
        });
    });

    // ── FECHAR MENU AO REDIMENSIONAR JANELA ──
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900 && navLinks) {
            navLinks.style.display = '';
            navLinks.style.position = '';
            navLinks.style.background = '';
        }
    });

    // ── FORM SUBMISSION FEEDBACK (opcional) ──
    const form = document.querySelector('.waitlist-form');
    if (form) {
        form.addEventListener('submit', function() {
            // Você pode adicionar feedback visual aqui se quiser
            console.log('Formulário enviado!');
        });
    }

    console.log('%cVila Presente site loaded successfully 🌿', 'color: #7A9E72; font-family: monospace;');
});
