// ===== THEME TOGGLE WITH ANIMATED SUN/MOON =====

class ThemeToggle {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.createToggleButton();
        this.addStyles();
    }

    createToggleButton() {
        const nav = document.querySelector('nav');
        if (!nav) {
            setTimeout(() => this.createToggleButton(), 100);
            return;
        }

        const toggleContainer = document.createElement('div');
        toggleContainer.id = 'theme-toggle-container';
        toggleContainer.innerHTML = `
            <button id="theme-toggle" class="theme-toggle-btn" title="Cambia tema" aria-label="Toggle theme">
                <svg class="theme-icon sun" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle class="sun-center" cx="12" cy="12" r="5"/>
                    <g class="sun-rays">
                        <line x1="12" y1="1" x2="12" y2="3"/>
                        <line x1="12" y1="21" x2="12" y2="23"/>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                        <line x1="1" y1="12" x2="3" y2="12"/>
                        <line x1="21" y1="12" x2="23" y2="12"/>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                    </g>
                </svg>
                <svg class="theme-icon moon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
            </button>
        `;

        nav.appendChild(toggleContainer);
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggle());
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #theme-toggle-container {
                margin-left: auto;
                display: flex;
                align-items: center;
            }

            .theme-toggle-btn {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: none;
                background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 15px rgba(0, 212, 255, 0.25);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                overflow: hidden;
                margin-right: 10px;
            }

            .theme-toggle-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 8px 25px rgba(0, 212, 255, 0.4);
            }

            .theme-toggle-btn:active {
                transform: scale(0.95);
            }

            .theme-icon {
                width: 24px;
                height: 24px;
                position: absolute;
                transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                fill: white;
                stroke: white;
                stroke-width: 2;
                stroke-linecap: round;
                stroke-linejoin: round;
            }

            /* Sun icon - visible in light theme */
            .theme-icon.sun {
                opacity: 1;
                transform: rotate(0deg) scale(1);
            }

            [data-theme="dark"] .theme-icon.sun {
                opacity: 0;
                transform: rotate(180deg) scale(0);
            }

            /* Moon icon - visible in dark theme */
            .theme-icon.moon {
                opacity: 0;
                transform: rotate(-180deg) scale(0);
            }

            [data-theme="dark"] .theme-icon.moon {
                opacity: 1;
                transform: rotate(0deg) scale(1);
            }

            /* Sun rays animation */
            .sun-rays line {
                transform-origin: center;
                animation: sunRays 4s ease-in-out infinite;
            }

            .sun-rays line:nth-child(1) { animation-delay: 0s; }
            .sun-rays line:nth-child(2) { animation-delay: 0.5s; }
            .sun-rays line:nth-child(3) { animation-delay: 1s; }
            .sun-rays line:nth-child(4) { animation-delay: 1.5s; }
            .sun-rays line:nth-child(5) { animation-delay: 2s; }
            .sun-rays line:nth-child(6) { animation-delay: 2.5s; }
            .sun-rays line:nth-child(7) { animation-delay: 3s; }
            .sun-rays line:nth-child(8) { animation-delay: 3.5s; }

            @keyframes sunRays {
                0%, 100% {
                    opacity: 1;
                    transform: scale(1);
                }
                50% {
                    opacity: 0.6;
                    transform: scale(0.8);
                }
            }

            /* Sun rotation on hover */
            .theme-toggle-btn:hover .sun {
                animation: rotateSun 2s linear infinite;
            }

            @keyframes rotateSun {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            /* Moon glow animation */
            [data-theme="dark"] .moon {
                filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.6));
                animation: moonGlow 3s ease-in-out infinite;
            }

            @keyframes moonGlow {
                0%, 100% {
                    filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.6));
                }
                50% {
                    filter: drop-shadow(0 0 15px rgba(139, 92, 246, 0.9));
                }
            }

            /* Click animation */
            @keyframes toggleClick {
                0% { transform: scale(1) rotate(0deg); }
                50% { transform: scale(0.9) rotate(180deg); }
                100% { transform: scale(1) rotate(360deg); }
            }

            .theme-toggle-btn.clicking {
                animation: toggleClick 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }

            @media (max-width: 768px) {
                .theme-toggle-btn {
                    width: 45px;
                    height: 45px;
                }

                .theme-icon {
                    width: 20px;
                    height: 20px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    toggle() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);

        // Add click animation
        const btn = document.getElementById('theme-toggle');
        btn.classList.add('clicking');
        setTimeout(() => btn.classList.remove('clicking'), 600);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);

        if (theme === 'light') {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
        } else {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        }
    }
}

// Initialize theme toggle
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ThemeToggle());
} else {
    new ThemeToggle();
}
