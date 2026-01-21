# 🎨 Portfolio Personale - Struttura Modularizzata

## ✨ Cosa Puoi Modificare

Puoi **CAMBIARE TUTTO** direttamente dall'area personale Admin:

✅ **Impostazioni Sito** - Titolo e descrizione
✅ **Hero Section** - Nome, titolo professionale, sottotitolo
✅ **Chi Sono** - Descrizione completa e competenze
✅ **Progetti** - Aggiungi/modifica/elimina progetti
✅ **Esperienza** - Aggiungi/modifica/elimina esperienze
✅ **Contatti** - Email e link social
✅ **Password** - Cambia password admin
✅ **Backup** - Scarica backup JSON dei dati

```
portfolio/
├── index.html                 # HTML principale
├── css/
│   ├── styles.css            # CSS per il sito principale
│   └── admin.css             # CSS per l'admin panel
├── js/
│   ├── admin-core.js         # Funzioni core dell'admin (login, tab, messaggi)
│   ├── hero.js               # Gestione Hero Section
│   ├── about.js              # Gestione Chi Sono
│   ├── projects.js           # Gestione Progetti
│   ├── experience.js         # Gestione Esperienza
│   ├── contact.js            # Gestione Contatti e Settings
│   └── main.js               # Inizializzazione e effetti
└── portfolio.html            # Versione monolitica (deprecata)
```

## 🚀 Come Usare

### 1. Apri il Sito
Apri `index.html` nel browser

### 2. Accedi all'Area Personale
Clicca su **⚙️ Admin** nella navigazione
- Password default: `admin123`

### 3. Modifica i Contenuti
Usa i vari tab per modificare:
- **Hero Section**: Nome, titolo e sottotitolo
- **Chi Sono**: Descrizione e competenze
- **Progetti**: Aggiungi/modifica/elimina progetti
- **Esperienza**: Gestisci cronologia lavorativa
- **Contatti**: Email e link social

### 4. Impostazioni
- Cambia password admin (⚠️ Importante!)
- Scarica backup JSON dei tuoi dati
- Logout

## 💾 Come Funziona la Memorizzazione

I dati vengono salvati nel **localStorage** del browser:
- `heroData` - Dati Hero Section
- `aboutData` - Dati Chi Sono
- `projectsData` - Array di progetti
- `experienceData` - Array di esperienze
- `contactData` - Dati contatti
- `adminPassword` - Password admin (hashata consigliato in produzione)
- `adminLoggedIn` - Flag di accesso

## 📝 Descrizione Moduli JavaScript

### `admin-core.js`
- `openAdmin()` - Apri modal admin
- `closeAdmin()` - Chiudi modal admin
- `loginAdmin()` - Effettua login
- `logoutAdmin()` - Effettua logout
- `switchTab(tabName)` - Cambia tab
- `loadAdminData()` - Carica dati dal localStorage

### `hero.js`
- `saveHero()` - Salva dati hero
- `applyHeroChanges()` - Applica modifiche al DOM

### `about.js`
- `saveAbout()` - Salva dati about
- `applyAboutChanges()` - Applica modifiche al DOM

### `projects.js`
- `loadProjects()` - Carica lista progetti
- `openProjectForm(index)` - Apri form modifica
- `saveProject()` - Salva progetto
- `deleteProject(index)` - Elimina progetto
- `applyProjectsChanges()` - Applica modifiche al DOM

### `experience.js`
- `loadExperience()` - Carica lista esperienze
- `openExpForm(index)` - Apri form modifica
- `saveExp()` - Salva esperienza
- `deleteExp(index)` - Elimina esperienza
- `applyExperienceChanges()` - Applica modifiche al DOM

### `contact.js`
- `saveContact()` - Salva dati contatti
- `applyContactChanges()` - Applica modifiche al DOM
- `changePassword()` - Cambia password admin
- `downloadBackup()` - Scarica backup JSON

### `main.js`
- `initializeSmoothScroll()` - Scroll liscio
- `initializeNavbarAnimation()` - Animazione navbar
- `initializeScrollAnimation()` - Animazioni al scroll
- `initializePortfolio()` - Funzione principale di init

## 🎨 Stili CSS

### `styles.css`
- Stili principali del sito
- Variabili CSS per colori
- Media queries per responsive design
- Animazioni (bounce, fadeInUp)

### `admin.css`
- Stili admin panel
- Form styling
- Tab styling
- Messaggi di success/error

## ⚙️ Personalizzazione

### Cambia Colori
Modifica le variabili CSS in `styles.css`:
```css
:root {
    --primary-color: #00d4ff;      /* Ciano */
    --accent-color: #ff006e;       /* Rosa */
    --text-color: #ffffff;         /* Bianco */
    --bg-darker: #0a0e27;          /* Blu scuro */
}
```

### Cambia Password
1. Vai in Admin → ⚙️ Impostazioni
2. Inserisci nuova password
3. Clicca "Cambia Password"

### Backup e Restore
- **Backup**: Admin → ⚙️ Impostazioni → Scarica Backup
- File JSON contiene tutti i tuoi dati
- Puoi usare il JSON per importare altrove

## 🔐 Sicurezza

⚠️ **Nota Importante:**
- Questo è un portfolio client-side
- La password è salvata in localStorage (non crittografata)
- **NON mettere informazioni sensibili**
- Per produzione, usa un backend con autenticazione sicura

## 🎯 Vantaggi della Struttura Modularizzata

✅ Codice più organizzato e leggibile
✅ Facile manutenzione e debug
✅ Riutilizzo del codice
✅ Separazione delle responsabilità
✅ Caricamento CSS e JS ben organizzato
✅ Possibilità di aggiungere nuove sezioni facilmente

## 📱 Responsive Design

Il sito è completamente responsive:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

## 🚀 Deploy

Per mettere online il sito:
1. Zipa la cartella `portfolio/`
2. Uploada su un hosting (Netlify, Vercel, GitHub Pages, etc.)
3. Assicurati che `index.html` sia il file principale

---

**Creato con ❤️ da GitHub Copilot**
