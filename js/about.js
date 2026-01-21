// ===== ABOUT SECTION =====
function saveAbout() {
    const data = {
        title: document.getElementById('aboutTitle').value,
        para1: document.getElementById('aboutPara1').value,
        para2: document.getElementById('aboutPara2').value,
        skills: document.getElementById('aboutSkills').value
    };
    localStorage.setItem('aboutData', JSON.stringify(data));
    applyAboutChanges();
    showMessage('', '✓ Chi Sono salvato!', 'success');
}

function applyAboutChanges() {
    const data = JSON.parse(localStorage.getItem('aboutData') || '{}');
    const aboutSection = document.querySelector('.about-content .about-text');
    if (aboutSection) {
        let h3 = aboutSection.querySelector('h3');
        if (!h3) {
            h3 = document.createElement('h3');
            aboutSection.prepend(h3);
        }
        if (data.title) h3.textContent = data.title;
        
        const paragraphs = aboutSection.querySelectorAll('p');
        if (data.para1 && paragraphs[0]) paragraphs[0].textContent = data.para1;
        if (data.para2 && paragraphs[1]) paragraphs[1].textContent = data.para2;
    }
    
    if (data.skills) {
        const skillsGrid = document.querySelector('.skills-grid');
        if (skillsGrid) {
            skillsGrid.innerHTML = '';
            data.skills.split(',').forEach(skill => {
                const div = document.createElement('div');
                div.className = 'skill-tag';
                div.textContent = skill.trim();
                skillsGrid.appendChild(div);
            });
        }
    }
}
