// Script per rendere cliccabili le card dei progetti statiche in index.html
// Questo script aggiunge eventi click alle card dei progetti per navigare alle pagine di dettaglio

document.addEventListener('DOMContentLoaded', function () {
    // Mappa dei titoli dei progetti ai loro ID nel data.json
    const projectMapping = {
        'E-Commerce Platform': 'ecommerce',
        'Analytics Dashboard': 'analytics',
        'Mobile App': 'mobile',
        'Sistema di Prenotazioni': 'booking',
        'API Microservizi': 'microservices',
        'CMS Headless': 'cms'
    };

    // Seleziona tutte le card dei progetti
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        // Ottieni il titolo del progetto dalla card
        const titleElement = card.querySelector('h3');
        if (titleElement) {
            const title = titleElement.textContent.trim();
            const projectId = projectMapping[title];

            if (projectId) {
                // Aggiungi evento click
                card.addEventListener('click', function () {
                    window.location.href = `project-detail.html?id=${projectId}`;
                });

                // Aggiungi stile cursor pointer (già presente nel CSS ma per sicurezza)
                card.style.cursor = 'pointer';
            }
        }
    });
});
