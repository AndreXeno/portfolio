// ===== ANIMATION MODULE LOADER =====
// Carica le animazioni in modo lazy e modulare

class AnimationLoader {
    constructor() {
        this.loadedModules = new Set();
        this.init();
    }

    init() {
        // Carica solo il modulo essenziale all'inizio
        this.loadModule('scroll-observer');
        this.loadModule('text-effects');

        // Carica mouse tracker sempre (anche su mobile con mouse)
        this.loadModule('mouse-tracker');

        // Carica le particelle solo dopo il caricamento completo
        window.addEventListener('load', () => {
            setTimeout(() => this.loadModule('particles'), 500);
        });

        // Carica gli SVG solo quando visibili
        this.observeElement('.projects', () => this.loadModule('svg-animations'));
    }

    loadModule(moduleName) {
        if (this.loadedModules.has(moduleName)) return;

        const script = document.createElement('script');
        script.src = `js/animations/${moduleName}.js`;
        script.async = true;
        script.onload = () => {
            this.loadedModules.add(moduleName);
            console.log(`✓ Modulo "${moduleName}" caricato`);
        };
        document.body.appendChild(script);
    }

    observeElement(selector, callback) {
        const element = document.querySelector(selector);
        if (!element) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback();
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(element);
    }

    isLargeScreen() {
        return window.innerWidth > 1024;
    }
}

// Inizializza il loader
new AnimationLoader();
