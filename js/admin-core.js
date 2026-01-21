// ===== GESTIONE ADMIN PANEL =====
const DEFAULT_PASSWORD = 'admin123'; // Cambia questo!
let isAdminLoggedIn = false;

// Dati di default iniziali
const DEFAULT_DATA = {
    heroData: {
        name: 'Andrea Meneghetti',
        title: 'Software Developer | Full-Stack Engineer',
        subtitle: 'Creo soluzioni digitali innovative e scalabili'
    },
    aboutData: {
        title: 'Sviluppatore Appassionato di Tecnologia',
        para1: 'Sono un informatico con esperienza nello sviluppo di applicazioni web moderne e soluzioni backend robuste. Mi piace risolvere problemi complessi e creare interfacce user-friendly che risolvono problemi reali.',
        para2: 'Con una solida formazione in ingegneria del software, collaboro con team multidisciplinari per consegnare progetti di qualità che superano le aspettative.',
        skills: 'Java, Spring Boot, PostgreSQL, JPA/Hibernate, Maven, HTML, CSS, PHP, React, Python, Numpy, Pandas, PyTorch, Figma, Unity, C#'
    },
    projectsData: [
        {
            id: 'mindbody',
            title: 'MindBody - Piattaforma Benessere Integrato',
            description: 'Ecosistema di microservizi per il benessere psicofisico che integra supporto mentale, allenamento fisico e nutrizione in un\'unica piattaforma.',
            techs: 'Java, Spring Boot, PostgreSQL, JPA/Hibernate, Maven'
        }
    ],
    experienceData: [
        {
            title: 'Senior Developer',
            company: 'TechCorp Solutions',
            date: '2022 - Presente',
            description: 'Guida dello sviluppo di progetti enterprise, mentoring di junior developers e ottimizzazione dell\'architettura del sistema.'
        },
        {
            title: 'Full-Stack Developer',
            company: 'Digital Innovations Inc',
            date: '2020 - 2022',
            description: 'Sviluppo di applicazioni web full-stack, implementazione di APIs REST e gestione database PostgreSQL.'
        },
        {
            title: 'Junior Developer',
            company: 'StartUp Hub',
            date: '2019 - 2020',
            description: 'Primi progetti professionali, apprendimento best practices, collaborazione con team agile.'
        }
    ],
    contactData: {
        email: 'andrea@example.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        twitter: 'https://twitter.com'
    },
    settingsData: {
        siteTitle: 'Andrea Meneghetti - Software Developer',
        siteDescription: 'Portfolio personale di Andrea Meneghetti, Software Developer specializzato in applicazioni web full-stack.'
    }
};

// Inizializza dati di default se non esistono
function initializeDefaultData() {
    console.log('Initializing default data...');

    // Hero
    if (!localStorage.getItem('heroData') || localStorage.getItem('heroData') === '{}') {
        console.log('Setting heroData');
        localStorage.setItem('heroData', JSON.stringify(DEFAULT_DATA.heroData));
    }

    // About
    if (!localStorage.getItem('aboutData') || localStorage.getItem('aboutData') === '{}') {
        console.log('Setting aboutData');
        localStorage.setItem('aboutData', JSON.stringify(DEFAULT_DATA.aboutData));
    }

    // Projects
    if (!localStorage.getItem('projectsData') || localStorage.getItem('projectsData') === '[]') {
        console.log('Setting projectsData');
        localStorage.setItem('projectsData', JSON.stringify(DEFAULT_DATA.projectsData));
    }

    // Experience
    if (!localStorage.getItem('experienceData') || localStorage.getItem('experienceData') === '[]') {
        console.log('Setting experienceData');
        localStorage.setItem('experienceData', JSON.stringify(DEFAULT_DATA.experienceData));
    }

    // Contact
    if (!localStorage.getItem('contactData') || localStorage.getItem('contactData') === '{}') {
        console.log('Setting contactData');
        localStorage.setItem('contactData', JSON.stringify(DEFAULT_DATA.contactData));
    }

    // Settings
    if (!localStorage.getItem('settingsData') || localStorage.getItem('settingsData') === '{}') {
        console.log('Setting settingsData');
        localStorage.setItem('settingsData', JSON.stringify(DEFAULT_DATA.settingsData));
    }

    console.log('Default data initialization complete');
}

// Apri modal admin
function openAdmin() {
    initializeDefaultData(); // Assicura che i dati di default siano caricati
    document.getElementById('adminModal').classList.add('active');
    loadAdminData();
}

// Chiudi modal admin
function closeAdmin() {
    document.getElementById('adminModal').classList.remove('active');
}

// Login admin
function loginAdmin() {
    // Accesso senza password abilitato temporaneamente
    isAdminLoggedIn = true;
    localStorage.setItem('adminLoggedIn', 'true');

    // Inizializza i dati di default prima di mostrare il form
    initializeDefaultData();

    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('adminSection').style.display = 'block';
    document.getElementById('loginMessage').innerHTML = '';

    // Carica tutti i dati nei campi form
    loadAdminData();
}

// Logout admin
function logoutAdmin() {
    isAdminLoggedIn = false;
    localStorage.removeItem('adminLoggedIn');
    document.getElementById('adminPassword').value = '';
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('adminSection').style.display = 'none';
    showMessage('loginMessage', '✓ Logout effettuato', 'success');
}

// Cambia tab
function switchTab(tabName) {
    document.querySelectorAll('.admin-tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.admin-tab').forEach(el => el.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Mostra messaggio
function showMessage(elementId, message, type) {
    let messageDiv = document.getElementById(elementId);
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.id = elementId;
        const activeTab = document.querySelector('.admin-tab-content.active');
        if (activeTab) {
            activeTab.prepend(messageDiv);
        }
    }
    const messageClass = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.innerHTML = `<div class="${messageClass}">${message}</div>`;
    setTimeout(() => messageDiv.innerHTML = '', 3000);
}

// Carica tutti i dati admin
function loadAdminData() {
    console.log('loadAdminData() called');
    console.log('localStorage content:', localStorage);

    if (localStorage.getItem('adminLoggedIn')) {
        isAdminLoggedIn = true;
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminSection').style.display = 'block';
    }

    // Carica Sito (Settings)
    const settingsData = JSON.parse(localStorage.getItem('settingsData') || '{}');
    console.log('settingsData:', settingsData);
    const siteTitle = document.getElementById('siteTitle');
    const siteDesc = document.getElementById('siteDescription');
    if (siteTitle) siteTitle.value = settingsData.siteTitle || 'Andrea Meneghetti - Software Developer';
    if (siteDesc) siteDesc.value = settingsData.siteDescription || '';

    // Carica Hero
    const heroData = JSON.parse(localStorage.getItem('heroData') || '{}');
    console.log('heroData:', heroData);
    const heroName = document.getElementById('heroName');
    const heroTitle = document.getElementById('heroTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');
    if (heroName) heroName.value = heroData.name || '';
    if (heroTitle) heroTitle.value = heroData.title || '';
    if (heroSubtitle) heroSubtitle.value = heroData.subtitle || '';

    // Carica About
    const aboutData = JSON.parse(localStorage.getItem('aboutData') || '{}');
    console.log('aboutData:', aboutData);
    const aboutTitle = document.getElementById('aboutTitle');
    const aboutPara1 = document.getElementById('aboutPara1');
    const aboutPara2 = document.getElementById('aboutPara2');
    const aboutSkills = document.getElementById('aboutSkills');
    if (aboutTitle) aboutTitle.value = aboutData.title || '';
    if (aboutPara1) aboutPara1.value = aboutData.para1 || '';
    if (aboutPara2) aboutPara2.value = aboutData.para2 || '';
    if (aboutSkills) aboutSkills.value = aboutData.skills || '';

    // Carica Projects
    loadProjects();

    // Carica Experience
    loadExperience();

    // Carica Contact
    const contactData = JSON.parse(localStorage.getItem('contactData') || '{}');
    console.log('contactData:', contactData);
    const contactEmail = document.getElementById('contactEmail');
    const contactLinkedin = document.getElementById('contactLinkedin');
    const contactGithub = document.getElementById('contactGithub');
    const contactTwitter = document.getElementById('contactTwitter');
    if (contactEmail) contactEmail.value = contactData.email || '';
    if (contactLinkedin) contactLinkedin.value = contactData.linkedin || '';
    if (contactGithub) contactGithub.value = contactData.github || '';
    if (contactTwitter) contactTwitter.value = contactData.twitter || '';

    // Carica Password field nel Settings
    const newPassword = document.getElementById('newPassword');
    if (newPassword) newPassword.value = '';

    console.log('loadAdminData() complete');
}

// Resetta la password alla password di default
function resetPassword() {
    if (confirm('Sei sicuro di voler resettare la password a "admin123"?')) {
        localStorage.removeItem('adminPassword');
        alert('✓ Password resettata a "admin123"');
        logoutAdmin();
    }
}
