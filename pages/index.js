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
    { id: 5, reference: 'TC 05', image: '/images/mugs/noirblanc.jpg', nom: 'Tasse Céramique', couleur: 'Noir & Blanc' }
  ],
  fuck: [
    { id: 11, reference: 'TF 01', image: '/images/mugs/Fuckblancnoir.JPG', nom: 'Tasse Céramique Fuck', couleur: 'Blanc & Noir' }
  ],
  tshirt: [
    { id: 21, reference: 'TS 01', image: 'À REMPLIR', nom: 'À REMPLIR', couleur: 'À REMPLIR' }
  ],
  offres: [
    { id: 201, reference: 'PR 01', image: '/images/mugs/logo.jpeg', nom: 'Édition Limitée', couleur: 'À REMPLIR' }
  ]
};

const tabs = [
  { key: 'nouveautes', label: 'Nouveautés' },
  { key: 'olda', label: 'Tasse Céramique OLDA' },
  { key: 'fuck', label: 'Tasse Céramique Fuck' },
  { key: 'tshirt', label: 'T-Shirt' },
  { key: 'offres', label: 'Offres Promotionnelles' }
];

export default function OLDAStore() {
  const [activeTab, setActiveTab] = useState('olda');
  const [quantites, setQuantites] = useState({});
  const [commentaires, setCommentaires] = useState({});
  const [panier, setPanier] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [clientInfo, setClientInfo] = useState({ nom: '', email: '' });
  const [orderSent, setOrderSent] = useState(false);
  const [sending, setSending] = useState(false);

  const getQte = (id) => quantites[id] || 3;
  const getCommentaire = (id) => commentaires[id] || '';

  const ajuster = (id, delta) => {
    const v = getQte(id) + delta;
    if (v >= 3 && v <= 99) setQuantites({ ...quantites, [id]: v });
  };

  const updateCommentaire = (id, value) => {
    setCommentaires({ ...commentaires, [id]: value });
  };

  const ajouterAuPanier = (p) => {
    const qte = getQte(p.id);
    const commentaire = getCommentaire(p.id);
    setPanier(prev => {
      const existant = prev.find(i => i.id === p.id);
      if (existant) {
        return prev.map(i => i.id === p.id ? { ...i, quantite: i.quantite + qte, commentaire } : i);
      }
      return [...prev, { ...p, quantite: qte, commentaire }];
    });
  };

  const supprimerDuPanier = (id) => {
    setPanier(prev => prev.filter(item => item.id !== id));
  };

  const envoyerCommande = async () => {
    if (!clientInfo.nom || !clientInfo.email) {
      alert('Merci de remplir tous les champs');
      return;
    }

    if (panier.length === 0) {
      alert('Votre panier est vide');
      return;
    }

    setSending(true);

    let commandeHTML = '';
    panier.forEach((item, index) => {
      commandeHTML += `${item.nom} ${item.couleur}\n`;
      commandeHTML += `Référence: ${item.reference}\n`;
      commandeHTML += `Quantité: ${item.quantite}\n`;
      if (item.commentaire) {
        commandeHTML += `Note: ${item.commentaire}\n`;
      }
      commandeHTML += '\n';
    });

    const templateParams = {
      client_nom: clientInfo.nom,
      client_email: clientInfo.email,
      commande: commandeHTML
    };

    try {
      const response = await emailjs.send(
        'service_063h32x',
        'template_1qwnkwd',
        templateParams,
        '063h32x'
      );

      console.log('Email envoyé avec succès:', response);
      setSending(false);
      setOrderSent(true);
    } catch (err) {
      console.error('Erreur EmailJS complète:', err);
      alert(`Erreur: ${err.text || err.message || 'Vérifiez votre configuration EmailJS'}`);
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
    <div style={styles.container}>
      <header style={styles.header}>
        <img src="/images/mugs/logo.jpeg" alt="OLDA" style={styles.logo} />
        <h1 style={styles.title}>OLDA</h1>
        <button onClick={() => setCartOpen(true)} style={styles.cartButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 2L11 8H21L17 12L19 18L13 14L7 18L9 12L5 8H15L17 2H9Z" />
            <circle cx="9" cy="21" r="1" fill="currentColor" />
            <circle cx="20" cy="21" r="1" fill="currentColor" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {totalArticles > 0 && <span style={styles.badge}>{totalArticles}</span>}
        </button>
      </header>

      <nav style={styles.nav}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              ...styles.tab,
              ...(activeTab === tab.key ? styles.tabActive : {})
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main style={styles.main}>
        {MUGS_DATA[activeTab]?.map(product => (
          <div key={product.id} style={styles.card}>
            <div style={styles.imageContainer}>
              <img
                src={product.image}
                alt={product.nom}
                style={styles.image}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <h3 style={styles.productName}>{product.nom}</h3>
            <p style={styles.productColor}>{product.couleur}</p>
            <p style={styles.productRef}>Réf: {product.reference}</p>

            <div style={styles.quantityControl}>
              <button onClick={() => ajuster(product.id, -1)} style={styles.qtyButton}>−</button>
              <span style={styles.quantity}>{getQte(product.id)}</span>
              <button onClick={() => ajuster(product.id, 1)} style={styles.qtyButton}>+</button>
            </div>

            <textarea
              placeholder="Note (optionnel)"
              value={getCommentaire(product.id)}
              onChange={(e) => updateCommentaire(product.id, e.target.value)}
              style={styles.commentaire}
              rows="2"
            />

            <button onClick={() => ajouterAuPanier(product)} style={styles.addButton}>
              Ajouter au panier
            </button>
          </div>
        ))}
      </main>

      {cartOpen && (
        <div style={styles.modalOverlay} onClick={() => setCartOpen(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            {orderSent ? (
              <div style={styles.successContainer}>
                <div style={styles.successIcon}>✓</div>
                <h2 style={styles.successTitle}>Commande envoyée</h2>
                <p style={styles.successText}>Merci {clientInfo.nom}</p>
                <p style={styles.successEmail}>Nous vous contacterons à {clientInfo.email}</p>
                <button onClick={fermerEtReset} style={styles.closeButton}>
                  Fermer
                </button>
              </div>
            ) : (
              <>
                <div style={styles.modalHeader}>
                  <h2 style={styles.modalTitle}>Panier</h2>
                  <button onClick={() => setCartOpen(false)} style={styles.closeIcon}>×</button>
                </div>

                {panier.length === 0 ? (
                  <p style={styles.emptyCart}>Votre panier est vide</p>
                ) : (
                  <>
                    <div style={styles.cartItems}>
                      {panier.map(item => (
                        <div key={item.id} style={styles.cartItem}>
                          <div style={{ flex: 1 }}>
                            <p style={styles.cartItemName}>{item.nom}</p>
                            <p style={styles.cartItemDetails}>
                              {item.couleur} × {item.quantite}
                            </p>
                            {item.commentaire && (
                              <p style={styles.cartItemComment}>Note: {item.commentaire}</p>
                            )}
                          </div>
                          <button onClick={() => supprimerDuPanier(item.id)} style={styles.deleteButton}>
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                    <div style={styles.form}>
                      <input
                        type="text"
                        placeholder="Votre nom"
                        value={clientInfo.nom}
                        onChange={(e) => setClientInfo({ ...clientInfo, nom: e.target.value })}
                        style={styles.input}
                      />
                      <input
                        type="email"
                        placeholder="Votre email"
                        value={clientInfo.email}
                        onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                        style={styles.input}
                      />

                      <button
                        onClick={envoyerCommande}
                        disabled={sending}
                        style={{
                          ...styles.submitButton,
                          ...(sending ? styles.submitButtonDisabled : {})
                        }}
                      >
                        {sending ? 'Envoi en cours...' : 'Commander'}
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

const styles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    minHeight: '100vh',
    backgroundColor: '#f5f5f7'
  },
  header: {
    backgroundColor: 'white',
    padding: '16px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #d2d2d7',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  logo: {
    height: '40px',
    width: 'auto',
    objectFit: 'contain'
  },
  title: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    margin: 0,
    fontSize: '28px',
    fontWeight: '600',
    color: '#1d1d1f',
    letterSpacing: '-0.5px'
  },
  cartButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    padding: '8px',
    color: '#1d1d1f'
  },
  badge: {
    position: 'absolute',
    top: '0',
    right: '0',
    backgroundColor: '#0071e3',
    color: 'white',
    borderRadius: '10px',
    padding: '2px 6px',
    fontSize: '12px',
    fontWeight: '600',
    minWidth: '20px',
    textAlign: 'center'
  },
  nav: {
    backgroundColor: 'white',
    padding: '16px 40px',
    display: 'flex',
    gap: '12px',
    overflowX: 'auto',
    borderBottom: '1px solid #d2d2d7'
  },
  tab: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    backgroundColor: '#f5f5f7',
    color: '#1d1d1f',
    fontSize: '14px',
    fontWeight: '400',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap'
  },
  tabActive: {
    backgroundColor: '#1d1d1f',
    color: 'white'
  },
  main: {
    padding: '40px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '18px',
    padding: '24px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  imageContainer: {
    height: '200px',
    backgroundColor: 'white',
    borderRadius: '12px',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain'
  },
  productName: {
    margin: '0 0 4px 0',
    fontSize: '17px',
    fontWeight: '600',
    color: '#1d1d1f'
  },
  productColor: {
    margin: '0 0 4px 0',
    fontSize: '14px',
    color: '#6e6e73'
  },
  productRef: {
    margin: '0 0 16px 0',
    fontSize: '12px',
    color: '#86868b'
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '12px'
  },
  qtyButton: {
    width: '36px',
    height: '36px',
    border: '1px solid #d2d2d7',
    borderRadius: '50%',
    cursor: 'pointer',
    backgroundColor: 'white',
    fontSize: '18px',
    color: '#1d1d1f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantity: {
    fontSize: '17px',
    fontWeight: '600',
    minWidth: '30px',
    textAlign: 'center'
  },
  commentaire: {
    width: '100%',
    padding: '10px',
    border: '1px solid #e5e5e7',
    borderRadius: '8px',
    fontSize: '13px',
    fontFamily: 'inherit',
    resize: 'none',
    marginBottom: '12px',
    boxSizing: 'border-box',
    color: '#1d1d1f'
  },
  addButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#0071e3',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '500',
    transition: 'background-color 0.2s'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '32px',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '80vh',
    overflow: 'auto'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  modalTitle: {
    margin: 0,
    fontSize: '24px',
    fontWeight: '600',
    color: '#1d1d1f'
  },
  closeIcon: {
    background: 'none',
    border: 'none',
    fontSize: '32px',
    cursor: 'pointer',
    color: '#86868b',
    padding: 0,
    lineHeight: 1
  },
  emptyCart: {
    textAlign: 'center',
    color: '#86868b',
    padding: '40px 0'
  },
  cartItems: {
    marginBottom: '24px'
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '16px 0',
    borderBottom: '1px solid #f5f5f7'
  },
  cartItemName: {
    margin: '0 0 4px 0',
    fontSize: '15px',
    fontWeight: '500',
    color: '#1d1d1f'
  },
  cartItemDetails: {
    margin: '0 0 4px 0',
    fontSize: '14px',
    color: '#6e6e73'
  },
  cartItemComment: {
    margin: '4px 0 0 0',
    fontSize: '13px',
    color: '#86868b',
    fontStyle: 'italic'
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    fontSize: '28px',
    cursor: 'pointer',
    color: '#86868b',
    padding: '0 8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  input: {
    width: '100%',
    padding: '14px',
    border: '1px solid #d2d2d7',
    borderRadius: '10px',
    fontSize: '15px',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  },
  submitButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#0071e3',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
    marginTop: '8px'
  },
  submitButtonDisabled: {
    backgroundColor: '#86868b',
    cursor: 'not-allowed'
  },
  successContainer: {
    textAlign: 'center',
    padding: '20px'
  },
  successIcon: {
    width: '64px',
    height: '64px',
    backgroundColor: '#34c759',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    margin: '0 auto 20px'
  },
  successTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1d1d1f',
    margin: '0 0 8px 0'
  },
  successText: {
    fontSize: '15px',
    color: '#6e6e73',
    margin: '0 0 4px 0'
  },
  successEmail: {
    fontSize: '15px',
    color: '#6e6e73',
    margin: '0 0 24px 0'
  },
  closeButton: {
    padding: '14px 32px',
    backgroundColor: '#0071e3',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600'
  }
};
