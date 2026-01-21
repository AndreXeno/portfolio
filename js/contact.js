// ===== CONTACT =====
function saveContact() {
    const data = {
        email: document.getElementById('contactEmail').value,
        linkedin: document.getElementById('contactLinkedin').value,
        github: document.getElementById('contactGithub').value,
        twitter: document.getElementById('contactTwitter').value
    };
    localStorage.setItem('contactData', JSON.stringify(data));
    applyContactChanges();
    showMessage('', '✓ Contatti salvati!', 'success');
}

function applyContactChanges() {
    const data = JSON.parse(localStorage.getItem('contactData') || '{}');
    const links = document.querySelectorAll('.contact-link');
    if (links[0] && data.email) links[0].href = 'mailto:' + data.email;
    if (links[1] && data.linkedin) links[1].href = data.linkedin;
    if (links[2] && data.github) links[2].href = data.github;
    if (links[3] && data.twitter) links[3].href = data.twitter;
}

// ===== SETTINGS =====
function changePassword() {
    const newPassword = document.getElementById('newPassword').value;
    if (newPassword.length < 6) {
        showMessage('', '❌ Password deve essere almeno 6 caratteri', 'error');
        return;
    }
    localStorage.setItem('adminPassword', newPassword);
    document.getElementById('newPassword').value = '';
    showMessage('', '✓ Password cambiata! Ricordati il nuovo accesso.', 'success');
}

function saveSettings() {
    const data = {
        siteTitle: document.getElementById('siteTitle').value,
        siteDescription: document.getElementById('siteDescription').value
    };
    localStorage.setItem('settingsData', JSON.stringify(data));
    applySiteSettings();
    showMessage('', '✓ Impostazioni salvate!', 'success');
}

function applySiteSettings() {
    const data = JSON.parse(localStorage.getItem('settingsData') || '{}');
    if (data.siteTitle) {
        document.title = data.siteTitle;
    }
}

function downloadBackup() {
    const backup = {
        heroData: JSON.parse(localStorage.getItem('heroData') || '{}'),
        aboutData: JSON.parse(localStorage.getItem('aboutData') || '{}'),
        projectsData: JSON.parse(localStorage.getItem('projectsData') || '[]'),
        experienceData: JSON.parse(localStorage.getItem('experienceData') || '[]'),
        contactData: JSON.parse(localStorage.getItem('contactData') || '{}'),
        settingsData: JSON.parse(localStorage.getItem('settingsData') || '{}'),
        timestamp: new Date().toLocaleString()
    };

    const dataStr = JSON.stringify(backup, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio_backup_${new Date().getTime()}.json`;
    link.click();
    showMessage('', '✓ Backup scaricato!', 'success');
}

// ===== JSON EDITOR =====
function loadJsonIntoEditor() {
    const allData = {
        heroData: JSON.parse(localStorage.getItem('heroData') || '{}'),
        aboutData: JSON.parse(localStorage.getItem('aboutData') || '{}'),
        projectsData: JSON.parse(localStorage.getItem('projectsData') || '[]'),
        experienceData: JSON.parse(localStorage.getItem('experienceData') || '[]'),
        contactData: JSON.parse(localStorage.getItem('contactData') || '{}'),
        settingsData: JSON.parse(localStorage.getItem('settingsData') || '{}')
    };
    
    const jsonEditor = document.getElementById('jsonEditor');
    if (jsonEditor) {
        jsonEditor.value = JSON.stringify(allData, null, 2);
        showMessage('', '✓ JSON caricato nell\'editor', 'success');
    }
}

function saveJsonFromEditor() {
    const jsonEditor = document.getElementById('jsonEditor');
    if (!jsonEditor || !jsonEditor.value) {
        showMessage('', '❌ L\'editor è vuoto', 'error');
        return;
    }
    
    try {
        const data = JSON.parse(jsonEditor.value);
        
        // Salva ogni sezione
        if (data.heroData) localStorage.setItem('heroData', JSON.stringify(data.heroData));
        if (data.aboutData) localStorage.setItem('aboutData', JSON.stringify(data.aboutData));
        if (data.projectsData) localStorage.setItem('projectsData', JSON.stringify(data.projectsData));
        if (data.experienceData) localStorage.setItem('experienceData', JSON.stringify(data.experienceData));
        if (data.contactData) localStorage.setItem('contactData', JSON.stringify(data.contactData));
        if (data.settingsData) localStorage.setItem('settingsData', JSON.stringify(data.settingsData));
        
        // Applica i cambiamenti al sito
        applyHeroChanges();
        applyAboutChanges();
        applyProjectsChanges();
        applyExperienceChanges();
        applyContactChanges();
        applySiteSettings();
        
        showMessage('', '✅ JSON salvato con successo! Il sito è stato aggiornato.', 'success');
        
        // Ricarica i form dell'admin
        loadAdminData();
    } catch (error) {
        showMessage('', `❌ Errore nel JSON: ${error.message}`, 'error');
    }
}
