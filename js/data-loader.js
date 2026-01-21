// ===== CARICAMENTO DATI DA data.json =====

let portfolioData = {};

// Carica i dati da data.json
async function loadPortfolioData() {
    try {
        const response = await fetch('data.json');
        portfolioData = await response.json();
        console.log('Dati portfolio caricati:', portfolioData);
        renderPortfolio();
    } catch (error) {
        console.error('Errore nel caricamento di data.json:', error);
    }
}

// Renderizza tutto il portfolio
function renderPortfolio() {
    // Inizializza localStorage con i dati da data.json se non esistono
    initializeLocalStorage();

    renderHero();
    renderAbout();
    renderProjects();
    renderExperience();
    renderContacts();
    updatePageTitle();
}

// Inizializza localStorage con i dati da data.json se vuoto
function initializeLocalStorage() {
    // Inizializza progetti se non esistono in localStorage
    if (!localStorage.getItem('projectsData') && portfolioData.projects) {
        localStorage.setItem('projectsData', JSON.stringify(portfolioData.projects));
        console.log('Progetti inizializzati in localStorage da data.json');
    }
}

// Renderizza Hero Section
function renderHero() {
    const hero = portfolioData.hero;
    if (!hero) return;

    const heroH1 = document.querySelector('.hero-content h1');
    const heroParagraphs = document.querySelectorAll('.hero-content p');

    if (heroH1) heroH1.textContent = hero.name;
    if (heroParagraphs[0]) heroParagraphs[0].textContent = hero.title;
    if (heroParagraphs[1]) heroParagraphs[1].textContent = hero.subtitle;
}

// Renderizza About
function renderAbout() {
    const about = portfolioData.about;
    if (!about) return;

    const aboutTitle = document.querySelector('#about h2');
    const aboutPara1 = document.querySelector('#about .about-content p:nth-of-type(1)');
    const aboutPara2 = document.querySelector('#about .about-content p:nth-of-type(2)');
    const skillsContainer = document.querySelector('.skills-grid');

    if (aboutTitle) aboutTitle.textContent = about.title;
    if (aboutPara1) aboutPara1.textContent = about.para1;
    if (aboutPara2) aboutPara2.textContent = about.para2;

    // Renderizza skills
    if (skillsContainer && about.skills) {
        skillsContainer.innerHTML = '';
        const skills = about.skills.split(',').map(s => s.trim());
        skills.forEach(skill => {
            const skillEl = document.createElement('span');
            skillEl.className = 'skill-tag';
            skillEl.textContent = skill;
            skillsContainer.appendChild(skillEl);
        });
    }
}

// Renderizza Projects
function renderProjects() {
    // Prima controlla se ci sono progetti in localStorage (modificati dall'admin)
    const localProjects = localStorage.getItem('projectsData');
    let projects;

    if (localProjects) {
        // Usa i progetti da localStorage se disponibili
        projects = JSON.parse(localProjects);
        console.log('Caricamento progetti da localStorage:', projects);
    } else {
        // Altrimenti usa quelli da data.json
        projects = portfolioData.projects;
        console.log('Caricamento progetti da data.json:', projects);
    }

    if (!projects || !Array.isArray(projects)) return;

    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = '';
    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.cursor = 'pointer';

        // Crea i tag delle tecnologie
        const techsArray = project.techs.split(',').map(t => t.trim());
        const techsHtml = techsArray.map(tech =>
            `<span class="project-tag">${tech}</span>`
        ).join('');

        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">${techsHtml}</div>
        `;

        // Rendi il card cliccabile
        card.addEventListener('click', () => {
            const projectId = project.id || `project-${index}`;
            window.location.href = `project-detail.html?id=${projectId}`;
        });

        projectsGrid.appendChild(card);
    });
}

// Renderizza Experience
function renderExperience() {
    const experiences = portfolioData.experience;
    if (!experiences || !Array.isArray(experiences)) return;

    const timeline = document.querySelector('.experience-timeline');
    if (!timeline) return;

    timeline.innerHTML = '';
    experiences.forEach((exp, index) => {
        const item = document.createElement('div');
        item.className = 'experience-item';
        item.innerHTML = `
            <div class="experience-marker"></div>
            <div class="experience-content">
                <h3>${exp.title}</h3>
                <p class="company">${exp.company}</p>
                <p class="date">${exp.date}</p>
                <p>${exp.description}</p>
            </div>
        `;
        timeline.appendChild(item);
    });
}

// Renderizza Contacts
function renderContacts() {
    const contacts = portfolioData.contacts;
    if (!contacts) return;

    const links = document.querySelectorAll('.contact-link');
    if (links.length >= 1 && contacts.email) links[0].href = 'mailto:' + contacts.email;
    if (links.length >= 2 && contacts.linkedin) links[1].href = contacts.linkedin;
    if (links.length >= 3 && contacts.github) links[2].href = contacts.github;
    if (links.length >= 4 && contacts.twitter) links[3].href = contacts.twitter;
}

// Aggiorna il titolo della pagina
function updatePageTitle() {
    if (portfolioData.siteTitle) {
        document.title = portfolioData.siteTitle;
    }
}

// Carica i dati quando la pagina si carica
window.addEventListener('load', loadPortfolioData);
