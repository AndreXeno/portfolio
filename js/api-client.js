// API Client per comunicare con il backend
const API_BASE_URL = 'http://localhost:3000/api';

class PortfolioAPI {
    // Gestione errori
    static handleError(error) {
        console.error('API Error:', error);
        return {
            success: false,
            error: error.message || 'Errore di comunicazione con il server'
        };
    }

    // Mostra messaggio all'utente
    static showMessage(message, type = 'success') {
        const messageEl = document.getElementById('message');
        if (messageEl) {
            messageEl.textContent = message;
            messageEl.className = `message ${type} show`;
            setTimeout(() => {
                messageEl.classList.remove('show');
            }, 3000);
        }
    }

    // GET - Leggi tutti i dati
    static async getData() {
        try {
            const response = await fetch(`${API_BASE_URL}/data`);
            if (!response.ok) throw new Error('Errore nel caricamento');
            return await response.json();
        } catch (error) {
            return this.handleError(error);
        }
    }

    // POST - Salva tutti i dati
    static async saveData(data) {
        try {
            const response = await fetch(`${API_BASE_URL}/data`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Errore nel salvataggio');
            const result = await response.json();
            this.showMessage(result.message, 'success');
            return result;
        } catch (error) {
            this.showMessage('Errore nel salvataggio', 'error');
            return this.handleError(error);
        }
    }

    // Aggiorna sezione "Chi Sono"
    static async updateAbout(aboutData) {
        try {
            const response = await fetch(`${API_BASE_URL}/data/about`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(aboutData)
            });
            if (!response.ok) throw new Error('Errore nell\'aggiornamento');
            const result = await response.json();
            this.showMessage(result.message, 'success');
            return result;
        } catch (error) {
            this.showMessage('Errore nell\'aggiornamento', 'error');
            return this.handleError(error);
        }
    }

    // Aggiorna tutti i progetti
    static async updateProjects(projects) {
        try {
            const response = await fetch(`${API_BASE_URL}/data/projects`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projects)
            });
            if (!response.ok) throw new Error('Errore nell\'aggiornamento');
            const result = await response.json();
            this.showMessage(result.message, 'success');
            return result;
        } catch (error) {
            this.showMessage('Errore nell\'aggiornamento dei progetti', 'error');
            return this.handleError(error);
        }
    }

    // Salva singolo progetto
    static async saveProject(projectData, index = -1) {
        try {
            const response = await fetch(`${API_BASE_URL}/data/projects/${index}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projectData)
            });
            if (!response.ok) throw new Error('Errore nel salvataggio');
            const result = await response.json();
            this.showMessage(result.message, 'success');
            return result;
        } catch (error) {
            this.showMessage('Errore nel salvataggio del progetto', 'error');
            return this.handleError(error);
        }
    }

    // Elimina progetto
    static async deleteProject(index) {
        try {
            const response = await fetch(`${API_BASE_URL}/data/projects/${index}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Errore nell\'eliminazione');
            const result = await response.json();
            this.showMessage(result.message, 'success');
            return result;
        } catch (error) {
            this.showMessage('Errore nell\'eliminazione del progetto', 'error');
            return this.handleError(error);
        }
    }

    // Aggiorna tutte le esperienze
    static async updateExperience(experiences) {
        try {
            const response = await fetch(`${API_BASE_URL}/data/experience`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(experiences)
            });
            if (!response.ok) throw new Error('Errore nell\'aggiornamento');
            const result = await response.json();
            this.showMessage(result.message, 'success');
            return result;
        } catch (error) {
            this.showMessage('Errore nell\'aggiornamento delle esperienze', 'error');
            return this.handleError(error);
        }
    }

    // Salva singola esperienza
    static async saveExperience(experienceData, index = -1) {
        try {
            const response = await fetch(`${API_BASE_URL}/data/experience/${index}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(experienceData)
            });
            if (!response.ok) throw new Error('Errore nel salvataggio');
            const result = await response.json();
            this.showMessage(result.message, 'success');
            return result;
        } catch (error) {
            this.showMessage('Errore nel salvataggio dell\'esperienza', 'error');
            return this.handleError(error);
        }
    }

    // Elimina esperienza
    static async deleteExperience(index) {
        try {
            const response = await fetch(`${API_BASE_URL}/data/experience/${index}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Errore nell\'eliminazione');
            const result = await response.json();
            this.showMessage(result.message, 'success');
            return result;
        } catch (error) {
            this.showMessage('Errore nell\'eliminazione dell\'esperienza', 'error');
            return this.handleError(error);
        }
    }

    // Aggiorna hero
    static async updateHero(heroData) {
        try {
            const response = await fetch(`${API_BASE_URL}/data/hero`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(heroData)
            });
            if (!response.ok) throw new Error('Errore nell\'aggiornamento');
            const result = await response.json();
            this.showMessage(result.message, 'success');
            return result;
        } catch (error) {
            this.showMessage('Errore nell\'aggiornamento', 'error');
            return this.handleError(error);
        }
    }

    // Aggiorna contatti
    static async updateContacts(contactsData) {
        try {
            const response = await fetch(`${API_BASE_URL}/data/contacts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contactsData)
            });
            if (!response.ok) throw new Error('Errore nell\'aggiornamento');
            const result = await response.json();
            this.showMessage(result.message, 'success');
            return result;
        } catch (error) {
            this.showMessage('Errore nell\'aggiornamento dei contatti', 'error');
            return this.handleError(error);
        }
    }
}
