// ===== SMOOTH SCROLLING E EFFETTI =====
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#' && href !== '') {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Animazione navbar al scroll con parallax
function initializeNavbarAnimation() {
    const navbar = document.querySelector('nav');
    if (!navbar) return;

    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 10px 40px rgba(0, 212, 255, 0.15)';
            navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// Animazione parallax per hero background - DISABILITATO per evitare movimento hero
function initializeParallaxEffect() {
    // DISABILITATO: la hero section ora resta ferma
    // const heroSection = document.querySelector('.hero');
    // if (!heroSection) return;

    // window.addEventListener('scroll', function() {
    //     const scrollTop = window.pageYOffset;
    //     const parallax = scrollTop * 0.5;
    //     heroSection.style.transform = `translateY(${parallax}px)`;
    // });
}

// Animazione elementi al scroll
function initializeScrollAnimation() {
    const projectCards = document.querySelectorAll('.project-card, .experience-item');
    if (projectCards.length === 0) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    projectCards.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Animazione mouse-following per effetti interattivi
function initializeMouseFollowEffect() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
    });
}

// Animazione per i numeri (counter effect)
function initializeNumberAnimation() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('animated')) {
                return; // Già animato
            }

            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Inizializza tutte le funzionalità
function initializePortfolio() {
    loadPortfolioData(); // Carica i dati dal JSON
    initializeSmoothScroll();
    initializeNavbarAnimation();
    // initializeParallaxEffect(); // DISABILITATO - hero resta ferma
    initializeScrollAnimation();
    initializeMouseFollowEffect();
    initializeNumberAnimation();
    applyHeroChanges();
    applyAboutChanges();
    applyProjectsChanges();
    applyExperienceChanges();
    applyContactChanges();
}

// Esegui inizializzazione al caricamento pagina
window.addEventListener('load', initializePortfolio);
