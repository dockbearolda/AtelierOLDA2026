import Resend from '@resend/node';
import React, { useState } from 'react';

// Config Resend avec votre clé API
const resend = new Resend("votre_cle_api_resend");

export default function OLDAStore() {
  const envoyerCommande = async () => {
    if (!clientInfo.nom || !clientInfo.email) {
      alert("Merci de remplir tous les champs");
      return;
    }

    setSending(true);

    const subject = `Commande OLDA - ${clientInfo.nom}`;
    let text = `NOUVELLE COMMANDE OLDA\n\n`;
    text += `CLIENT:\n`;
    text += `Nom: ${clientInfo.nom}\n`;
    text += `Email: ${clientInfo.email}\n\n`;
    text += `ARTICLES:\n`;
    panier.forEach((item) => {
      text += `- ${item.nom} ${item.couleur} (${item.reference}) x${item.quantite}\n`;
      if (item.commentaire && item.commentaire.length > 0) {
        text += `  Commentaire: ${item.commentaire.join(", ")}\n`;
      }
    });

    try {
      await resend.emails.send({
        from: "votre@domaine.com", // Remplacez avec votre mail vérifié sur Resend
        to: "charlie.jallon@gmail.com", // Adresse de destination
        subject: subject,
        text: text,
      });

      setSending(false);
      setOrderSent(true);
    } catch (err) {
      console.error("Erreur lors de l'envoi du mail:", err);
      alert("Une erreur est survenue lors de l'envoi de la commande.");
      setSending(false);
    }
  };

  // ... restez avec le reste du code existant comme fermerEtReset(), UI, etc.
}