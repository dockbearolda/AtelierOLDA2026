import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

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
if (v >= 3 && v <= 99) setQuantites({ …quantites, [id]: v });
};

const ajouterAuPanier = (p) => {
const qte = getQte(p.id);
const commentaire = commentaires[p.id] || [];
setPanier(prev => {
const existant = prev.find(i => i.id === p.id);
if (existant) return prev.map(i => i.id === p.id ? { …i, quantite: i.quantite + qte, commentaire } : i);
return […prev, { …p, quantite: qte, commentaire }];
});
setAddedProduct(p.id);
setTimeout(() => setAddedProduct(null), 1500);
};

const supprimerDuPanier = (id) => {
setPanier(prev => prev.filter(item => item.id !== id));
};

const envoyerCommande = async () => {
if (!clientInfo.nom || !clientInfo.email) {
alert("Merci de remplir tous les champs");
return;
}

if (panier.length === 0) {
  alert("Votre panier est vide");
  return;
}

setSending(true);

// Créer le récapitulatif de commande
let commandeTexte = '';
panier.forEach((item) => {
  commandeTexte += `• ${item.nom} ${item.couleur} (${item.reference}) x${item.quantite}\n`;
  if (item.commentaire && item.commentaire.length > 0) {
    commandeTexte += `  Commentaire: ${item.commentaire.join(", ")}\n`;
  }
});

// Paramètres pour EmailJS
const templateParams = {
  client_nom: clientInfo.nom,
  client_email: clientInfo.email,
  commande: commandeTexte,
};

try {
  await emailjs.send(
    'service_063h32x',    // Votre Service ID
    'template_1qwnkwd',   // Votre Template ID
    templateParams,
    '063h32x'             // Votre Public Key
  );

  setSending(false);
  setOrderSent(true);
} catch (err) {
  console.error("Erreur lors de l'envoi:", err);
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

const totalArticles = panier.reduce((sum, item) => sum + item.quantite, 0);

return (
<div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>

  {/* Header */}
  <header style={{ backgroundColor: '#333', color: 'white', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <h1 style={{ margin: 0 }}>OLDA Store</h1>
    <button 
      onClick={() => setCartOpen(true)}
      style={{ 
        backgroundColor: '#e74c3c', 
        color: 'white', 
        border: 'none', 
        padding: '10px 20px', 
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px'
      }}
    >
      🛒 Panier ({totalArticles})
    </button>
  </header>

  {/* Tabs */}
  <nav style={{ backgroundColor: '#444', padding: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
    {tabs.map(tab => (
      <button
        key={tab.key}
        onClick={() => setActiveTab(tab.key)}
        style={{
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          backgroundColor: activeTab === tab.key ? '#e74c3c' : '#666',
          color: 'white',
          fontSize: '14px'
        }}
      >
        {tab.label}
      </button>
    ))}
  </nav>

  {/* Products Grid */}
  <main style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
    {MUGS_DATA[activeTab]?.map(product => (
      <div 
        key={product.id} 
        style={{ 
          backgroundColor: 'white', 
          borderRadius: '10px', 
          padding: '15px', 
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          position: 'relative'
        }}
      >
        {addedProduct === product.id && (
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: '#27ae60',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '12px'
          }}>
            ✓ Ajouté !
          </div>
        )}
        
        <div style={{ 
          height: '150px', 
          backgroundColor: '#eee', 
          borderRadius: '5px', 
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          <img 
            src={product.image} 
            alt={product.nom}
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
        
        <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{product.nom}</h3>
        <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '14px' }}>{product.couleur}</p>
        <p style={{ margin: '0 0 15px 0', color: '#999', fontSize: '12px' }}>Réf: {product.reference}</p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <button 
            onClick={() => ajuster(product.id, -1)}
            style={{ width: '30px', height: '30px', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer' }}
          >
            -
          </button>
          <span style={{ fontWeight: 'bold' }}>{getQte(product.id)}</span>
          <button 
            onClick={() => ajuster(product.id, 1)}
            style={{ width: '30px', height: '30px', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer' }}
          >
            +
          </button>
        </div>
        
        <button
          onClick={() => ajouterAuPanier(product)}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Ajouter au panier
        </button>
      </div>
    ))}
  </main>

  {/* Cart Modal */}
  {cartOpen && (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto'
      }}>
        {orderSent ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2 style={{ color: '#27ae60' }}>✓ Commande envoyée !</h2>
            <p>Merci {clientInfo.nom}, votre commande a bien été reçue.</p>
            <p>Nous vous contacterons à {clientInfo.email}</p>
            <button
              onClick={fermerEtReset}
              style={{
                marginTop: '20px',
                padding: '10px 30px',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Fermer
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0 }}>🛒 Votre Panier</h2>
              <button
                onClick={() => setCartOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>

            {panier.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666' }}>Votre panier est vide</p>
            ) : (
              <>
                {panier.map(item => (
                  <div key={item.id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '10px',
                    borderBottom: '1px solid #eee'
                  }}>
                    <div>
                      <strong>{item.nom}</strong>
                      <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>
                        {item.couleur} - x{item.quantite}
                      </p>
                    </div>
                    <button
                      onClick={() => supprimerDuPanier(item.id)}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#e74c3c', 
                        cursor: 'pointer',
                        fontSize: '18px'
                      }}
                    >
                      🗑
                    </button>
                  </div>
                ))}

                <div style={{ marginTop: '20px' }}>
                  <h3>Vos informations</h3>
                  <input
                    type="text"
                    placeholder="Votre nom"
                    value={clientInfo.nom}
                    onChange={(e) => setClientInfo({ ...clientInfo, nom: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      marginBottom: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      boxSizing: 'border-box'
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Votre email"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      marginBottom: '20px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      boxSizing: 'border-box'
                    }}
                  />
                  
                  <button
                    onClick={envoyerCommande}
                    disabled={sending}
                    style={{
                      width: '100%',
                      padding: '15px',
                      backgroundColor: sending ? '#999' : '#27ae60',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: sending ? 'not-allowed' : 'pointer',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}
                  >
                    {sending ? 'Envoi en cours...' : '✓ Commander'}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )}
</div>

);
}