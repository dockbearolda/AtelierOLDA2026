import emailjs from ‘@emailjs/browser’;

// Configuration EmailJS
const EMAILJS_CONFIG = {
serviceId: ‘service_063h32x’,
templateId: ‘template_1qwnkwd’,
publicKey: ‘063h32x’
};

/**

- Envoie un email de commande via EmailJS
- @param {Object} clientInfo - Informations du client { nom, email }
- @param {Array} panier - Liste des articles dans le panier
- @returns {Promise} - Résultat de l’envoi
  */
  export const envoyerEmailCommande = async (clientInfo, panier) => {
  // Validation des données
  if (!clientInfo.nom || !clientInfo.email) {
  throw new Error(“Nom et email requis”);
  }

if (!panier || panier.length === 0) {
throw new Error(“Le panier est vide”);
}

// Créer le récapitulatif de commande
let commandeTexte = ‘’;
panier.forEach((item) => {
commandeTexte += `• ${item.nom} ${item.couleur} (${item.reference}) x${item.quantite}\n`;
if (item.commentaire && item.commentaire.length > 0) {
commandeTexte += `  Commentaire: ${item.commentaire.join(", ")}\n`;
}
});

// Paramètres pour le template EmailJS
const templateParams = {
client_nom: clientInfo.nom,
client_email: clientInfo.email,
commande: commandeTexte,
};

// Envoi de l’email
try {
const response = await emailjs.send(
EMAILJS_CONFIG.serviceId,
EMAILJS_CONFIG.templateId,
templateParams,
EMAILJS_CONFIG.publicKey
);

```
console.log('Email envoyé avec succès:', response);
return { success: true, response };
```

} catch (error) {
console.error(‘Erreur lors de l'envoi de l'email:’, error);
throw error;
}
};

/**

- Initialise EmailJS (optionnel - à appeler au démarrage de l’app)
  */
  export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.publicKey);
  };

export default {
envoyerEmailCommande,
initEmailJS,
EMAILJS_CONFIG
};