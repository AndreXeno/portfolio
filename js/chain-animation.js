// ===== CHAIN ANIMATION IN NAVBAR =====

class ChainAnimation {
    constructor() {
        this.init();
    }

    init() {
        this.createChain();
        this.addChainStyles();
    }

    createChain() {
        // Creazione della catenella nella navbar
        const nav = document.querySelector('nav');
        if (!nav) return;

        const chainContainer = document.createElement('div');
        chainContainer.id = 'chain-container';
        chainContainer.innerHTML = `
            <div class="chain-pull">
                <svg class="chain-links" viewBox="0 0 20 120" xmlns="http://www.w3.org/2000/svg">
                    <!-- Chain links -->
                    <g class="chain-link chain-1">
                        <circle cx="10" cy="10" r="5" stroke="currentColor" stroke-width="1" fill="none"/>
                        <line x1="10" y1="15" x2="10" y2="25" stroke="currentColor" stroke-width="1"/>
                    </g>
                    <g class="chain-link chain-2">
                        <circle cx="10" cy="30" r="5" stroke="currentColor" stroke-width="1" fill="none"/>
                        <line x1="10" y1="35" x2="10" y2="45" stroke="currentColor" stroke-width="1"/>
                    </g>
                    <g class="chain-link chain-3">
                        <circle cx="10" cy="50" r="5" stroke="currentColor" stroke-width="1" fill="none"/>
                        <line x1="10" y1="55" x2="10" y2="65" stroke="currentColor" stroke-width="1"/>
                    </g>
                    <g class="chain-link chain-4">
                        <circle cx="10" cy="70" r="5" stroke="currentColor" stroke-width="1" fill="none"/>
                        <line x1="10" y1="75" x2="10" y2="85" stroke="currentColor" stroke-width="1"/>
                    </g>
                    <g class="chain-link chain-5">
                        <circle cx="10" cy="90" r="5" stroke="currentColor" stroke-width="1" fill="none"/>
                        <line x1="10" y1="95" x2="10" y2="105" stroke="currentColor" stroke-width="1"/>
                    </g>
                    <!-- Handle at bottom -->
                    <rect class="handle" x="5" y="110" width="10" height="8" rx="2" stroke="currentColor" stroke-width="1" fill="none"/>
                </svg>
            </div>
        `;
        nav.appendChild(chainContainer);

        // Aggiungi interattività
        const handle = document.querySelector('.handle');
        if (handle) {
            handle.addEventListener('mouseenter', () => this.pullChain());
            handle.addEventListener('mouseleave', () => this.releaseChain());
        }
    }

    pullChain() {
        const chain = document.querySelector('.chain-links');
        if (chain) {
            chain.style.transform = 'scaleY(0.85)';
            chain.style.opacity = '0.7';
        }
    }

    releaseChain() {
        const chain = document.querySelector('.chain-links');
        if (chain) {
            chain.style.transform = 'scaleY(1)';
            chain.style.opacity = '1';
        }
    }

    addChainStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #chain-container {
                position: absolute;
                right: 50px;
                top: 15px;
                opacity: 0.6;
                transition: opacity 0.3s ease;
            }

            #chain-container:hover {
                opacity: 1;
            }

            .chain-pull {
                display: flex;
                align-items: flex-start;
                justify-content: center;
            }

            .chain-links {
                width: 20px;
                height: 120px;
                color: var(--primary-color);
                transition: all 0.3s ease;
            }

            .chain-link {
                transition: transform 0.3s ease;
            }

            .chain-1 {
                animation: chainSwing 2s ease-in-out infinite;
                animation-delay: 0s;
            }

            .chain-2 {
                animation: chainSwing 2s ease-in-out infinite;
                animation-delay: 0.1s;
            }

            .chain-3 {
                animation: chainSwing 2s ease-in-out infinite;
                animation-delay: 0.2s;
            }

            .chain-4 {
                animation: chainSwing 2s ease-in-out infinite;
                animation-delay: 0.3s;
            }

            .chain-5 {
                animation: chainSwing 2s ease-in-out infinite;
                animation-delay: 0.4s;
            }

            .handle {
                animation: handleBounce 1s ease-in-out infinite;
            }

            @keyframes chainSwing {
                0%, 100% {
                    transform: translateX(0) scaleY(1);
                    opacity: 0.8;
                }
                50% {
                    transform: translateX(2px) scaleY(0.95);
                    opacity: 1;
                }
            }

            @keyframes handleBounce {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(2px);
                }
            }

            /* Responsive */
            @media (max-width: 768px) {
                #chain-container {
                    right: 20px;
                    top: 10px;
                }

                .chain-links {
                    width: 15px;
                    height: 90px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Inizializza al caricamento
document.addEventListener('DOMContentLoaded', () => {
    new ChainAnimation();
});
