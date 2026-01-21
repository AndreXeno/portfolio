const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Funzione helper per leggere data.json
async function readData() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Errore lettura data.json:', error);
        throw error;
    }
}

// Funzione helper per scrivere data.json
async function writeData(data) {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Errore scrittura data.json:', error);
        throw error;
    }
}

// API Endpoints

// GET - Leggi tutti i dati
app.get('/api/data', async (req, res) => {
    try {
        const data = await readData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Errore nel caricamento dei dati' });
    }
});

// POST - Salva tutti i dati
app.post('/api/data', async (req, res) => {
    try {
        await writeData(req.body);
        res.json({ success: true, message: 'Dati salvati con successo' });
    } catch (error) {
        res.status(500).json({ error: 'Errore nel salvataggio dei dati' });
    }
});

// POST - Aggiorna sezione "Chi Sono"
app.post('/api/data/about', async (req, res) => {
    try {
        const data = await readData();
        data.about = req.body;
        await writeData(data);
        res.json({ success: true, message: 'Sezione "Chi Sono" aggiornata' });
    } catch (error) {
        res.status(500).json({ error: 'Errore nell\'aggiornamento' });
    }
});

// POST - Aggiorna progetti
app.post('/api/data/projects', async (req, res) => {
    try {
        const data = await readData();
        data.projects = req.body;
        await writeData(data);
        res.json({ success: true, message: 'Progetti aggiornati' });
    } catch (error) {
        res.status(500).json({ error: 'Errore nell\'aggiornamento dei progetti' });
    }
});

// POST - Aggiorna singolo progetto
app.post('/api/data/projects/:index', async (req, res) => {
    try {
        const data = await readData();
        const index = parseInt(req.params.index);
        
        if (index >= 0 && index < data.projects.length) {
            data.projects[index] = req.body;
        } else {
            data.projects.push(req.body);
        }
        
        await writeData(data);
        res.json({ success: true, message: 'Progetto salvato' });
    } catch (error) {
        res.status(500).json({ error: 'Errore nel salvataggio del progetto' });
    }
});

// DELETE - Elimina progetto
app.delete('/api/data/projects/:index', async (req, res) => {
    try {
        const data = await readData();
        const index = parseInt(req.params.index);
        
        if (index >= 0 && index < data.projects.length) {
            data.projects.splice(index, 1);
            await writeData(data);
            res.json({ success: true, message: 'Progetto eliminato' });
        } else {
            res.status(404).json({ error: 'Progetto non trovato' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Errore nell\'eliminazione del progetto' });
    }
});

// POST - Aggiorna esperienze
app.post('/api/data/experience', async (req, res) => {
    try {
        const data = await readData();
        data.experience = req.body;
        await writeData(data);
        res.json({ success: true, message: 'Esperienze aggiornate' });
    } catch (error) {
        res.status(500).json({ error: 'Errore nell\'aggiornamento delle esperienze' });
    }
});

// POST - Aggiorna singola esperienza
app.post('/api/data/experience/:index', async (req, res) => {
    try {
        const data = await readData();
        const index = parseInt(req.params.index);
        
        if (index >= 0 && index < data.experience.length) {
            data.experience[index] = req.body;
        } else {
            data.experience.push(req.body);
        }
        
        await writeData(data);
        res.json({ success: true, message: 'Esperienza salvata' });
    } catch (error) {
        res.status(500).json({ error: 'Errore nel salvataggio dell\'esperienza' });
    }
});

// DELETE - Elimina esperienza
app.delete('/api/data/experience/:index', async (req, res) => {
    try {
        const data = await readData();
        const index = parseInt(req.params.index);
        
        if (index >= 0 && index < data.experience.length) {
            data.experience.splice(index, 1);
            await writeData(data);
            res.json({ success: true, message: 'Esperienza eliminata' });
        } else {
            res.status(404).json({ error: 'Esperienza non trovata' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Errore nell\'eliminazione dell\'esperienza' });
    }
});

// POST - Aggiorna hero
app.post('/api/data/hero', async (req, res) => {
    try {
        const data = await readData();
        data.hero = req.body;
        await writeData(data);
        res.json({ success: true, message: 'Hero aggiornato' });
    } catch (error) {
        res.status(500).json({ error: 'Errore nell\'aggiornamento' });
    }
});

// POST - Aggiorna contatti
app.post('/api/data/contacts', async (req, res) => {
    try {
        const data = await readData();
        data.contacts = req.body;
        await writeData(data);
        res.json({ success: true, message: 'Contatti aggiornati' });
    } catch (error) {
        res.status(500).json({ error: 'Errore nell\'aggiornamento dei contatti' });
    }
});

// Avvia il server
app.listen(PORT, () => {
    console.log(`🚀 Server avviato su http://localhost:${PORT}`);
    console.log(`📊 Admin panel: http://localhost:${PORT}/admin.html`);
    console.log(`✏️  Modifica Chi Sono: http://localhost:${PORT}/edit-about.html`);
    console.log(`📁 Modifica Progetti: http://localhost:${PORT}/edit-projects.html`);
    console.log(`🎓 Modifica Esperienze: http://localhost:${PORT}/edit-experience.html`);
});
