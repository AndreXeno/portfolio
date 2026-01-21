// Smooth Scroll Animations - Inspired by premium portfolio sites
// This file handles all scroll-triggered animations and smooth transitions

class SmoothAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        this.init();
    }

    init() {
        // Add animation classes to elements
        this.prepareElements();

        // Initialize Intersection Observer
        this.initObserver();

        // Add smooth scroll behavior
        this.initSmoothScroll();

        // Add parallax effects
        this.initParallax();

        // Add hover effects
        this.initHoverEffects();

        // Add page load animation
        this.initPageLoad();
    }

    prepareElements() {
        // Sections are already styled in CSS, no need to add classes
        // Just make sure they start hidden
    }

    initObserver() {
        let lastScrollY = window.pageYOffset;
        let scrollDirection = 'down';

        // Track scroll direction
        window.addEventListener('scroll', () => {
            const currentScrollY = window.pageYOffset;
            scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
            lastScrollY = currentScrollY;
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Rimuovi classi precedenti
                    entry.target.classList.remove('animated', 'animated-reverse');

                    // Aggiungi classe basata sulla direzione scroll
                    if (scrollDirection === 'down') {
                        entry.target.classList.add('animated');
                    } else {
                        entry.target.classList.add('animated-reverse');
                    }
                } else {
                    // Quando esce dal viewport, rimuovi le classi per permettere re-animazione
                    entry.target.classList.remove('animated', 'animated-reverse');
                }
            });
        }, {
            threshold: 0.15, // Trigger quando 15% è visibile
            rootMargin: '0px 0px -50px 0px' // Offset per trigger più preciso
        });

        // Observe sections
        document.querySelectorAll('section').forEach(el => {
            observer.observe(el);
        });

        // Observe project cards
        document.querySelectorAll('.project-card').forEach(el => {
            observer.observe(el);
        });

        // Observe skill tags
        document.querySelectorAll('.skill-tag').forEach(el => {
            observer.observe(el);
        });

        // Observe experience items
        document.querySelectorAll('.experience-item').forEach(el => {
            observer.observe(el);
        });
    }

    initSmoothScroll() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));

                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initParallax() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateParallax() {
        const scrolled = window.pageYOffset;

        // Parallax effect on hero section - DISABILITATO per evitare lag
        // const hero = document.querySelector('.hero');
        // if (hero) {
        //     hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        // }

        // Parallax effect on scroll indicator - stop when not visible
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            // Only update if still potentially visible
            if (scrolled < 400) {
                const opacity = Math.max(0, 1 - scrolled / 300);
                scrollIndicator.style.opacity = opacity;
                // Ridotto l'effetto di movimento
                scrollIndicator.style.transform = `translateY(${scrolled * 0.1}px)`;
            } else {
                // Ensure it's hidden and stop updating
                scrollIndicator.style.opacity = 0;
                scrollIndicator.style.display = 'none';
            }
        }
    }

    initHoverEffects() {
        // Add magnetic effect to buttons
        document.querySelectorAll('.btn, .contact-link').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0) scale(1)';
            });
        });

        // Add tilt effect to project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    initPageLoad() {
        // Add page load animation
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');

            // Animate hero content
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                setTimeout(() => {
                    heroContent.classList.add('animate-in');
                }, 100);
            }
        });
    }
}

// Initialize animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new SmoothAnimations();
    });
} else {
    new SmoothAnimations();
}

// Add cursor follower effect (optional, premium touch)
class CursorFollower {
    constructor() {
        this.cursor = null;
        this.cursorDot = null;
        this.init();
    }

    init() {
        // Create cursor elements
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';

        this.cursorDot = document.createElement('div');
        this.cursorDot.className = 'custom-cursor-dot';

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorDot);

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';

            this.cursorDot.style.left = e.clientX + 'px';
            this.cursorDot.style.top = e.clientY + 'px';
        });

        // Add hover effects
        document.querySelectorAll('a, button, .project-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.cursorDot.classList.add('hover');
            });

            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
                this.cursorDot.classList.remove('hover');
            });
        });
    }
}

// Initialize cursor follower (comment out if you don't want it)
// new CursorFollower();
