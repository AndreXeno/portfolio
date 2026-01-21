// ===== PROJECTS =====
function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projectsData') || '[]');
    const list = document.getElementById('projectsList');
    list.innerHTML = '';

    projects.forEach((project, index) => {
        const item = document.createElement('li');
        item.className = 'admin-list-item';
        item.innerHTML = `
            <div class="admin-list-item-content">
                <div class="admin-list-item-title">${project.title}</div>
                <div class="admin-list-item-desc">${project.techs}</div>
            </div>
            <div class="admin-list-buttons">
                <button class="btn-edit" onclick="openProjectForm(${index})">Modifica</button>
                <button class="btn-remove" onclick="deleteProject(${index})">Elimina</button>
            </div>
        `;
        list.appendChild(item);
    });
}

function openProjectForm(index) {
    const projects = JSON.parse(localStorage.getItem('projectsData') || '[]');
    document.getElementById('projectForm').style.display = 'block';

    if (index !== 'new') {
        const project = projects[index];
        document.getElementById('projectIndex').value = index;
        document.getElementById('projectTitle').value = project.title;
        document.getElementById('projectDesc').value = project.description;
        document.getElementById('projectTechs').value = project.techs;
    } else {
        document.getElementById('projectIndex').value = '';
        document.getElementById('projectTitle').value = '';
        document.getElementById('projectDesc').value = '';
        document.getElementById('projectTechs').value = '';
    }
}

function closeProjectForm() {
    document.getElementById('projectForm').style.display = 'none';
}

function saveProject() {
    const projects = JSON.parse(localStorage.getItem('projectsData') || '[]');
    const index = document.getElementById('projectIndex').value;
    const project = {
        title: document.getElementById('projectTitle').value,
        description: document.getElementById('projectDesc').value,
        techs: document.getElementById('projectTechs').value
    };

    if (index === '') {
        projects.push(project);
    } else {
        projects[index] = project;
    }

    localStorage.setItem('projectsData', JSON.stringify(projects));
    applyProjectsChanges();
    loadProjects();
    closeProjectForm();
    showMessage('', '✓ Progetto salvato!', 'success');
}

function deleteProject(index) {
    if (confirm('Sei sicuro di voler eliminare questo progetto?')) {
        const projects = JSON.parse(localStorage.getItem('projectsData') || '[]');
        projects.splice(index, 1);
        localStorage.setItem('projectsData', JSON.stringify(projects));
        applyProjectsChanges();
        loadProjects();
        showMessage('', '✓ Progetto eliminato!', 'success');
    }
}

function applyProjectsChanges() {
    const projects = JSON.parse(localStorage.getItem('projectsData') || '[]');
    const grid = document.querySelector('.projects-grid');
    if (grid && projects.length > 0) {
        grid.innerHTML = '';
        projects.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            // Aggiungi stile pointer per indicare che è cliccabile
            card.style.cursor = 'pointer';

            const techsHtml = project.techs.split(',').map(tech =>
                `<span class="project-tag">${tech.trim()}</span>`
            ).join('');
            card.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">${techsHtml}</div>
            `;

            // Aggiungi evento click per navigare alla pagina di dettaglio
            card.addEventListener('click', () => {
                // Usa l'ID del progetto se esiste, altrimenti usa l'indice
                const projectId = project.id || `project-${index}`;
                window.location.href = `project-detail.html?id=${projectId}`;
            });

            grid.appendChild(card);
        });
    }
}

