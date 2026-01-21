// ===== TEXT EFFECTS ANIMATION MODULE =====
// Effetti di testo dinamici (typewriter, etc)

class TextEffectsModule {
    constructor() {
        this.init();
    }

    init() {
        this.addTextStyles();
        this.observeHeadings();
        console.log('✓ Text Effects inizializzato');
    }

    addTextStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes typewriter {
                from { width: 0; }
                to { width: 100%; }
            }

            @keyframes textGlow {
                0% { text-shadow: 0 0 0 rgba(0, 212, 255, 0); }
                50% { text-shadow: 0 0 20px rgba(0, 212, 255, 0.4); }
                100% { text-shadow: 0 0 0 rgba(0, 212, 255, 0); }
            }

            .text-animated {
                animation: textGlow 2s ease-in-out;
            }
        `;
        document.head.appendChild(style);
    }

    observeHeadings() {
        const headings = document.querySelectorAll('h1, h2, h3');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('text-animated')) {
                    entry.target.classList.add('text-animated');
                }
            });
        }, { threshold: 0.5 });

        headings.forEach(h => observer.observe(h));
    }
}

new TextEffectsModule();
