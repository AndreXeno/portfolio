// ===== SVG ANIMATIONS MODULE =====
// Animazioni SVG caricate quando la sezione progetti è visibile

class SVGAnimationsModule {
    constructor() {
        this.init();
    }

    init() {
        this.createSVGBackground();
        this.addSVGStyles();
        console.log('✓ SVG Animations inizializzato');
    }

    createSVGBackground() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.position = 'fixed';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.pointerEvents = 'none';
        svg.style.zIndex = '-2';

        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'svg-gradient');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '100%');

        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('style', 'stop-color:#00d4ff;stop-opacity:0.08');

        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('style', 'stop-color:#ff006e;stop-opacity:0.08');

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.appendChild(defs);

        document.body.appendChild(svg);
    }

    addSVGStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes svgFlow {
                0% { stroke-dashoffset: 1000; }
                100% { stroke-dashoffset: 0; }
            }

            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);
    }
}

new SVGAnimationsModule();
