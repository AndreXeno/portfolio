# 📝 Guida alle Pagine di Modifica Portfolio

## 🚀 Avvio del Sistema

### 1. Installazione Dipendenze
```bash
npm install
```

### 2. Avvio Server
```bash
npm start
```

Il server si avvierà su `http://localhost:3000`

## 📄 Pagine Disponibili

### Portfolio Principale
- **URL**: `http://localhost:3000/index.html`
- Visualizza il portfolio pubblico

### Admin Panel
- **URL**: `http://localhost:3000/admin.html`
- Dashboard principale per gestire tutte le sezioni

### Modifica Chi Sono
- **URL**: `http://localhost:3000/edit-about.html`
- Modifica la sezione "Chi Sono"
- Campi disponibili:
  - Titolo sezione
  - Primo paragrafo
  - Secondo paragrafo
  - Skills (separate da virgola)
- **Anteprima in tempo reale** delle modifiche

### Modifica Progetti
- **URL**: `http://localhost:3000/edit-projects.html`
- Gestione completa dei progetti
- Funzionalità:
  - ➕ Aggiungi nuovo progetto
  - ✎ Modifica progetto esistente
  - 🗑 Elimina progetto
- Campi disponibili:
  - ID progetto (identificatore univoco)
  - Titolo
  - Descrizione breve
  - Tecnologie
  - URL immagine
  - Descrizione completa
  - Caratteristiche (lista)
  - Ruolo
  - Durata
  - Team
  - Risultato

### Modifica Esperienze
- **URL**: `http://localhost:3000/edit-experience.html`
- Gestione completa delle esperienze lavorative/formative
- Funzionalità:
  - ➕ Aggiungi nuova esperienza
  - ✎ Modifica esperienza esistente
  - 🗑 Elimina esperienza
- Campi disponibili:
  - Titolo/Ruolo
  - Azienda/Istituzione
  - Periodo
  - Descrizione

## 💾 Salvataggio Dati

Tutte le modifiche vengono salvate automaticamente nel file `data.json` quando clicchi sul pulsante "Salva".

Il sistema:
1. Valida i dati inseriti
2. Aggiorna il file `data.json`
3. Mostra un messaggio di conferma
4. Le modifiche sono immediatamente visibili sul portfolio principale

## 🔄 Workflow Consigliato

1. **Avvia il server**: `npm start`
2. **Scegli cosa modificare**:
   - Per modifiche rapide a "Chi Sono": usa `edit-about.html`
   - Per gestire progetti: usa `edit-projects.html`
   - Per gestire esperienze: usa `edit-experience.html`
   - Per una panoramica completa: usa `admin.html`
3. **Modifica i contenuti** nelle pagine dedicate
4. **Salva le modifiche** cliccando sul pulsante "Salva"
5. **Verifica le modifiche** aprendo `index.html`

## 🎨 Caratteristiche

- ✅ **Interfaccia moderna** con design dark mode
- ✅ **Validazione form** per evitare errori
- ✅ **Feedback visivo** per ogni operazione
- ✅ **Conferme** prima di eliminare elementi
- ✅ **Anteprima in tempo reale** (pagina Chi Sono)
- ✅ **Salvataggio persistente** su file JSON
- ✅ **API REST** per comunicazione client-server

## 🛠 Tecnologie Utilizzate

- **Backend**: Node.js + Express
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Storage**: File JSON
- **API**: REST API

## 📝 Note Importanti

1. **Backup**: Prima di modifiche importanti, fai un backup di `data.json`
2. **Server**: Il server deve essere in esecuzione per salvare le modifiche
3. **Browser**: Usa un browser moderno (Chrome, Firefox, Safari, Edge)
4. **Porta**: Il server usa la porta 3000 (assicurati che sia libera)

## 🐛 Risoluzione Problemi

### Il server non si avvia
- Verifica che la porta 3000 sia libera
- Controlla che le dipendenze siano installate (`npm install`)

### Le modifiche non vengono salvate
- Verifica che il server sia in esecuzione
- Controlla la console del browser per eventuali errori
- Assicurati di aver compilato tutti i campi obbligatori

### Errore di connessione API
- Verifica che il server sia avviato su `http://localhost:3000`
- Controlla che non ci siano errori nella console del server

## 📞 Supporto

Per problemi o domande, controlla:
1. Console del browser (F12)
2. Log del server nel terminale
3. File `data.json` per verificare la struttura dati
