// ===== HERO SECTION =====
function saveHero() {
    const data = {
        name: document.getElementById('heroName').value,
        title: document.getElementById('heroTitle').value,
        subtitle: document.getElementById('heroSubtitle').value
    };
    localStorage.setItem('heroData', JSON.stringify(data));
    applyHeroChanges();
    showMessage('', '✓ Hero section salvata!', 'success');
}

function applyHeroChanges() {
    const data = JSON.parse(localStorage.getItem('heroData') || '{}');
    if (data.name) document.querySelector('.hero h1').textContent = data.name;
    if (data.title) document.querySelectorAll('.hero p')[0].textContent = data.title;
    if (data.subtitle) document.querySelectorAll('.hero p')[1].textContent = data.subtitle;
}
