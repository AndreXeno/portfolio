// ===== PARTICLES ANIMATION MODULE =====
// Sistema di particelle interattive nel background

class ParticlesModule {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particle-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        document.body.prepend(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => this.updateMouse(e));

        console.log('✓ Particle System inizializzato');
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.particles = [];
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 1.2,
                opacity: Math.random() * 0.3,
                maxOpacity: Math.random() * 0.3 + 0.1
            });
        }
    }

    updateMouse(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#00d4ff';

        this.particles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                p.opacity = Math.min(p.opacity + 0.02, p.maxOpacity + 0.2);
                p.vx += (dx / distance) * 0.05;
                p.vy += (dy / distance) * 0.05;
            } else {
                p.opacity = Math.max(p.opacity - 0.01, p.maxOpacity);
            }

            this.ctx.globalAlpha = p.opacity;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.ctx.globalAlpha = 1;
        requestAnimationFrame(() => this.animate());
    }
}

new ParticlesModule();
