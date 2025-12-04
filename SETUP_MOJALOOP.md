
# Guide Technique : Infrastructure OpenPension & Mojaloop

Ce document contient l'architecture technique actuelle (MVP) et la feuille de route pour la mise en production (Enterprise V2.0).

---

## 🔥 CHEAT SHEET : BACKEND + DOCKER (POUR DÉMARRAGE RAPIDE)

### 1. Commandes Essentielles

| Action | Commande (Terminal) |
| :--- | :--- |
| **Lancer Mojaloop Hub** | `docker compose -f docker-compose-mojaloop.yml up -d` |
| **Vérifier les Conteneurs** | `docker ps` |
| **Voir les Logs (TTK)** | `docker logs mojaloop-ttk-backend -f` |
| **Lancer Backend Node** | `npm install && node server.js` |
| **Arrêter Tout** | `docker compose -f docker-compose-mojaloop.yml down` |

### 2. Ports à Connaître

| Service | Port Local | URL d'accès |
| :--- | :--- | :--- |
| **Frontend (React)** | `5173` ou `3000` | `http://localhost:5173` |
| **Backend Middleware** | `3005` | `http://localhost:3005` |
| **TTK UI (Admin Mojaloop)** | `6060` | `http://localhost:6060` |
| **SDK (Outbound API)** | `4001` | `http://localhost:4001` |
| **SDK (Inbound Callbacks)** | `4000` | `http://localhost:4000` |

### 3. Snippet Backend pour Bulk Upload (CSV)

Ajoutez cette route à votre `server.js` pour gérer les paiements de masse :

```javascript
app.post("/bulk-transfer", async (req, res) => {
  const { batchId, transactions } = req.body; // Array of {to, amount}
  console.log(`[Bulk] Traitement du lot ${batchId} : ${transactions.length} paiements`);

  let successCount = 0;
  
  // Traitement séquentiel (pour éviter de surcharger le simulateur)
  for (const tx of transactions) {
    try {
        await axios.post("http://localhost:4001/transfers", {
            from: { idType: "MSISDN", idValue: "22900000000" },
            to: { idType: "MSISDN", idValue: tx.to },
            amount: tx.amount,
            currency: "XOF",
            transactionType: "TRANSFER",
            homeTransactionId: `TX-${Date.now()}-${Math.random()}`
        });
        successCount++;
    } catch (e) {
        console.error(`Echec paiement vers ${tx.to}`);
    }
  }

  res.json({ 
    status: "COMPLETED", 
    processed: transactions.length, 
    success: successCount 
  });
});
```

---

## 🏗️ PARTIE 1 : L'INFRASTRUCTURE ACTUELLE (MVP)

### 1. Docker Compose (Le Cœur Mojaloop)

Créez un dossier `mojaloop-core` et un fichier `docker-compose-mojaloop.yml` :

```yaml
version: "3.8"

services:
  # ----------------- Testing Toolkit (UI Web & Backend) -----------------
  ttk-gui:
    image: mojaloop/mojaloop-testing-toolkit-ui:v15.0.0
    container_name: mojaloop-ttk-ui
    ports:
      - "6060:6060"
    depends_on:
      - ttk-backend

  ttk-backend:
    image: mojaloop/mojaloop-testing-toolkit:v15.0.0
    container_name: mojaloop-ttk-backend
    ports:
      - "5050:5050"
    environment:
      - LOG_LEVEL=info

  # ----------------- Mojaloop SDK Adapter ---------------------
  sdk-scheme-adapter:
    image: mojaloop/sdk-scheme-adapter:v15.0.0
    container_name: sdk-scheme-adapter
    ports:
      - "4000:4000"    # API inbound (Callbacks)
      - "4001:4001"    # API outbound (Envoi de virements)
    environment:
      - LOG_LEVEL=info
      - TRANSFERS_ENDPOINT=http://ttk-backend:5050

  # ---------------- Integration Toolkit (ITK) ----------------
  itk:
    image: mojaloop/integration-toolkit:v1.4.1
    container_name: integration-toolkit
    ports:
      - "3200:3200"
    environment:
      - LOG_LEVEL=debug

  # ---------------- Hub Simulator (Fake Switch) --------------
  hub-simulator:
    image: mojaloop/hub-sim:v13.1.0
    container_name: mojaloop-hub-sim
    ports:
      - "3000:3000"
    environment:
      - LOG_LEVEL=info
```

### 2. Le Backend Node.js (Middleware)

Fichier `server.js` (requis pour faire le pont entre React et Mojaloop) :

```javascript
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const MOJALOOP_SDK_URL = "http://localhost:4001";

app.post("/transfer", async (req, res) => {
  const { from, to, amount, currency } = req.body;
  console.log(`[Backend] Transfert: ${amount} ${currency} -> ${to}`);

  const payload = {
    from: { idType: "MSISDN", idValue: from },
    to:   { idType: "MSISDN", idValue: to },
    amount: amount,
    currency: currency || "XOF",
    transactionType: "TRANSFER",
    note: "Pension G2P",
    homeTransactionId: "TX-" + Date.now()
  };

  try {
    const r = await axios.post(`${MOJALOOP_SDK_URL}/transfers`, payload);
    res.json({ status: "SUCCESS", sdk_response: r.data });
  } catch (err) {
    console.error("[Backend] Erreur:", err.message);
    res.status(500).json({ status: "FAILED", error: err.message });
  }
});

app.listen(3005, () => console.log("API Backend running on :3005"));
```

---

## 🚀 PARTIE 2 : ROADMAP & VISION ENTERPRISE (OpenPension V2.0)

Pour porter la plateforme de simple démonstrateur à **produit bancaire pilote national**, nous implémentons les 4 fondations critiques suivantes.

### A. Moteur Financier & Persistence (Core Banking)
*Objectif : Transformer les flux éphémères en registres comptables durables.*
- **Base de données** : Ajout de PostgreSQL/MongoDB pour historiser chaque transaction.
- **Gestion des Soldes** : Implémentation d'un Ledger local pour tracker le solde du Trésor Public avant envoi.
- **Réconciliation** : Script nocturne de comparaison entre les logs OpenPension et les rapports Mojaloop.

### B. Routage Télécom Intelligent (Smart Routing)
*Objectif : Distribuer automatiquement vers MTN, Moov, Celtiis.*
Logique d'aiguillage à implémenter dans le Backend :
```javascript
function getRoute(phoneNumber) {
  if (phoneNumber.startsWith("22997") || phoneNumber.startsWith("22966")) return "MTN_BENIN";
  if (phoneNumber.startsWith("22995") || phoneNumber.startsWith("22994")) return "MOOV_AFRICA";
  if (phoneNumber.startsWith("22990") || phoneNumber.startsWith("22940")) return "CELTIIS";
  return "BANQUE_UBA"; // Default
}
```

### C. Back-Office Trésor Public (Supervision)
*Objectif : Donner le contrôle aux agents de l'État.*
- **Tableau de bord Live** : Visualisation des flux sortants en temps réel (déjà prototypé dans le Frontend).
- **Gestion des Bénéficiaires** : Import de fichiers CSV (Liste des retraités) pour paiements en masse (Bulk Payments).
- **Audit Logs** : Interface de recherche pour le contrôle financier.

### D. Sécurité Bancaire (Bank-Grade Security)
*Objectif : Zéro Trust.*
- **mTLS (Mutual TLS)** : Chiffrement obligatoire entre le Backend et le Hub Mojaloop.
- **JWS Signing** : Signature numérique de chaque payload JSON avec clé privée.
- **Authentification** : Intégration SSO (Single Sign-On) pour les agents du Trésor.

---

## ✅ ÉTAT D'AVANCEMENT

| Module | Statut | Prochaine Étape |
| :--- | :--- | :--- |
| **Interface Utilisateur** | 🟢 Terminé | Intégration Reçus PDF |
| **Simulateur Mojaloop** | 🟢 Terminé (Docker) | Configuration Multi-DFSP |
| **Middleware Backend** | 🟡 Basique | Ajout Base de Données |
| **Sécurité** | 🔴 À faire | Mise en place API Keys |

---

*Document généré automatiquement par l'Architecte Technique OpenPension.*
