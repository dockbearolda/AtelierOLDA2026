import Resend from '@resend/node';
import React, { useState } from 'react';

// Config Resend avec votre clé API
const resend = new Resend("votre_cle_api_resend"); // Remplacez par votre clé API

const MUGS_DATA = {
  nouveautes: [
    { id: 101, reference: 'NW 01', image: '/images/mugs/nouveaute1.jpg', nom: 'Édition Aurore', couleur: 'Aurore' }
  ],
  olda: [
    { id: 1, reference: 'TC 01', image: '/images/mugs/roseblanc.jpg', nom: 'Tasse Céramique', couleur: 'Rose & Blanc' },
    { id: 2, reference: 'TC 02', image: '/images/mugs/rougeblanc.jpg', nom: 'Tasse Céramique', couleur: 'Rouge & Blanc' },
    { id: 3, reference: 'TC 03', image: '/images/mugs/orangeblanc.jpg', nom: 'Tasse Céramique', couleur: 'Orange & Blanc' },
    { id: 4, reference: 'TC 04', image: '/images/mugs/vertblanc.jpg', nom: 'Tasse Céramique', couleur: 'Vert & Blanc' },
    { id: 5, reference: 'TC 05', image: '/images/mugs/noirblanc.jpg', nom: 'Tasse Céramique', couleur: 'Noir & Blanc' },
  ],
  fuck: [
    { id: 11, reference: 'TF 01', image: '/images/mugs/Fuckblancnoir.JPG', nom: 'Tasse Céramique Fuck', couleur: 'Blanc & Noir' },
  ],
  tshirt: [
    { id: 21, reference: 'TS 01', image: 'À REMPLIR', nom: 'À REMPLIR', couleur: 'À REMPLIR' },
  ],
  offres: [
    { id: 201, reference: 'PR 01', image: '/images/mugs/logo.jpeg', nom: 'Édition Limitée', couleur: 'À REMPLIR' }
  ],
};

const tabs = [
  { key: 'nouveautes', label: 'Nouveautés' },
  { key: 'olda', label: 'Tasse Céramique OLDA' },
  { key: 'fuck', label: 'Tasse Céramique Fuck' },
  { key: 'tshirt', label: 'T-Shirt' },
  { key: 'offres', label: 'Offres Promotionnelles' },
];

export default function OLDAStore() {
  const [activeTab, setActiveTab] = useState('olda');
  const [quantites, setQuantites] = useState({});
  const [panier, setPanier] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [clientInfo, setClientInfo] = useState({ nom: '', email: '' });
  const [orderSent, setOrderSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [commentaires, setCommentaires] = useState({});
  const [nouveauCommentaire, setNouveauCommentaire] = useState({});

  const getQte = (id) => quantites[id] || 3;
  const ajuster = (id, delta) => {
    const v = getQte(id) + delta;
    if (v >= 3 && v <= 99) setQuantites({ ...quantites, [id]: v });
  };

  const ajouterAuPanier = (p) => {
    const qte = getQte(p.id);
    const commentaire = commentaires[p.id] || [];
    setPanier(prev => {
      const existant = prev.find(i => i.id === p.id);
      if (existant) return prev.map(i => i.id === p.id ? { ...i, quantite: i.quantite + qte, commentaire } : i);
      return [...prev, { ...p, quantite: qte, commentaire }];
    });
    setAddedProduct(p.id);
    setTimeout(() => setAddedProduct(null), 1500);
  };

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

  const fermerEtReset = () => {
    setCartOpen(false);
    setOrderSent(false);
    setPanier([]);
    setClientInfo({ nom: '', email: '' });
  };

  return (
    <div>
      {/* Votre contenu HTML et composants */}
    </div>
  );
}