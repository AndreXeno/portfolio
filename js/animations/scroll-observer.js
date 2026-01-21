// ===== SCROLL OBSERVER ANIMATION MODULE =====
// Modulo essenziale e leggero per osservare elementi al scroll

class ScrollObserverModule {
    constructor() {
        this.init();
    }

    init() {
        this.addScrollRevealStyle();
        this.observeElements();
    }

    addScrollRevealStyle() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes scrollReveal {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .reveal {
                animation: scrollReveal 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }
        `;
        document.head.appendChild(style);
    }

    observeElements() {
        const elements = document.querySelectorAll('.project-card, .experience-item, .skill-tag');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => observer.observe(el));
    }
}

// Inizializza il modulo
new ScrollObserverModule();
