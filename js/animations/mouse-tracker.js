// ===== MOUSE TRACKER ANIMATION MODULE =====
// Effetto 3D di tracking del mouse (solo per schermi grandi)

class MouseTrackerModule {
    constructor() {
        this.elements = document.querySelectorAll('.project-card, .btn, .contact-link');
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        console.log('✓ Mouse Tracker inizializzato');
    }

    onMouseMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;

        this.elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const x = this.mouse.x - (rect.left + rect.width / 2);
            const y = this.mouse.y - (rect.top + rect.height / 2);
            const distance = Math.sqrt(x * x + y * y);

            if (distance < 300) {
                const rotationStrength = (300 - distance) / 300;
                el.style.transform = `perspective(1000px) rotateX(${-y / 50 * rotationStrength}deg) rotateY(${x / 50 * rotationStrength}deg) scale(${1 + rotationStrength * 0.05})`;
            } else {
                el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            }
        });
    }
}

new MouseTrackerModule();
