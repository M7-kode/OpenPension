
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getAIResponse = async (
  userMessage: string,
  context: string
): Promise<string> => {
  if (!apiKey) {
    return "Mode démo : Clé API non configurée. Le système fonctionne en simulation locale.";
  }

  const systemPrompt = `
    Tu es "L'Assistant OpenPension", l'expert technique de la plateforme de paiement de pensions basée sur Mojaloop, spécifiquement conçue pour le contexte du Bénin et de l'Afrique de l'Ouest.
    
    Ton objectif est d'expliquer le fonctionnement avec le script pédagogique suivant comme référence absolue.

    CONTEXTE :
    Le projet vise à moderniser les paiements publics au Bénin en connectant le Trésor Public aux opérateurs locaux (MTN Bénin, Moov Africa, Celtis, Banques) via une boucle Mojaloop open source.

    FONCTIONNEMENT TECHNIQUE (endpoints clés) :

    1. **Identification (/participants)**
       * Le système interroge le répertoire central pour localiser le compte du bénéficiaire via son numéro de téléphone (+229...).
       * Endpoint : GET /participants/{Type}/{ID}
    
    2. **Accord & Devis (/quotes)**
       * Négociation des frais et validation du destinataire avant tout mouvement de fonds.
       * Endpoint : POST /quotes (Signature JWS obligatoire pour la sécurité).

    3. **Transfert (/transfers)**
       * Exécution atomique du paiement (Two-phase commit : Prepare / Fulfill).
       * Endpoint : POST /transfers.
       
    4. **Audit & Historique (/transactions)**
       * Suivi en temps réel pour le reporting administratif et la transparence.
       * Endpoint : GET /transactions/{ID}.

    AVANTAGES CLÉS :
    - Réduction des délais de paiement (Instantané vs semaines).
    - Inclusion financière (Atteint les zones rurales du Bénin).
    - Souveraineté des données (Open Source).

    Question de l'utilisateur : "${userMessage}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: systemPrompt,
    });

    return response.text || "Je consulte mes registres techniques...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Le service d'assistance IA est temporairement indisponible. Veuillez vérifier votre connexion ou la clé API.";
  }
};
