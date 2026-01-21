// ===== EXPERIENCE =====
function loadExperience() {
    const experiences = JSON.parse(localStorage.getItem('experienceData') || '[]');
    const list = document.getElementById('experienceList');
    list.innerHTML = '';

    experiences.forEach((exp, index) => {
        const item = document.createElement('li');
        item.className = 'admin-list-item';
        item.innerHTML = `
            <div class="admin-list-item-content">
                <div class="admin-list-item-title">${exp.title}</div>
                <div class="admin-list-item-desc">${exp.company} • ${exp.date}</div>
            </div>
            <div class="admin-list-buttons">
                <button class="btn-edit" onclick="openExpForm(${index})">Modifica</button>
                <button class="btn-remove" onclick="deleteExp(${index})">Elimina</button>
            </div>
        `;
        list.appendChild(item);
    });
}

function openExpForm(index) {
    const experiences = JSON.parse(localStorage.getItem('experienceData') || '[]');
    document.getElementById('expForm').style.display = 'block';
    
    if (index !== 'new') {
        const exp = experiences[index];
        document.getElementById('expIndex').value = index;
        document.getElementById('expTitle').value = exp.title;
        document.getElementById('expCompany').value = exp.company;
        document.getElementById('expDate').value = exp.date;
        document.getElementById('expDesc').value = exp.description;
    } else {
        document.getElementById('expIndex').value = '';
        document.getElementById('expTitle').value = '';
        document.getElementById('expCompany').value = '';
        document.getElementById('expDate').value = '';
        document.getElementById('expDesc').value = '';
    }
}

function closeExpForm() {
    document.getElementById('expForm').style.display = 'none';
}

function saveExp() {
    const experiences = JSON.parse(localStorage.getItem('experienceData') || '[]');
    const index = document.getElementById('expIndex').value;
    const exp = {
        title: document.getElementById('expTitle').value,
        company: document.getElementById('expCompany').value,
        date: document.getElementById('expDate').value,
        description: document.getElementById('expDesc').value
    };

    if (index === '') {
        experiences.push(exp);
    } else {
        experiences[index] = exp;
    }

    localStorage.setItem('experienceData', JSON.stringify(experiences));
    applyExperienceChanges();
    loadExperience();
    closeExpForm();
    showMessage('', '✓ Esperienza salvata!', 'success');
}

function deleteExp(index) {
    if (confirm('Sei sicuro di voler eliminare questa esperienza?')) {
        const experiences = JSON.parse(localStorage.getItem('experienceData') || '[]');
        experiences.splice(index, 1);
        localStorage.setItem('experienceData', JSON.stringify(experiences));
        applyExperienceChanges();
        loadExperience();
        showMessage('', '✓ Esperienza eliminata!', 'success');
    }
}

function applyExperienceChanges() {
    const experiences = JSON.parse(localStorage.getItem('experienceData') || '[]');
    const timeline = document.querySelector('.experience-timeline');
    if (timeline && experiences.length > 0) {
        timeline.innerHTML = '';
        experiences.forEach(exp => {
            const item = document.createElement('div');
            item.className = 'experience-item';
            item.innerHTML = `
                <div class="experience-header">
                    <h3>${exp.title}</h3>
                    <span class="date">${exp.date}</span>
                </div>
                <div class="experience-company">${exp.company}</div>
                <div class="experience-description">${exp.description}</div>
            `;
            timeline.appendChild(item);
        });
    }
}
