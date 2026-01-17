import React, { useState } from 'react';

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
    setPanier(prev => {
      const existant = prev.find(i => i.id === p.id);
      if (existant) return prev.map(i => i.id === p.id ? { ...i, quantite: i.quantite + qte } : i);
      return [...prev, { ...p, quantite: qte }];
    });
    setAddedProduct(p.id);
    setTimeout(() => setAddedProduct(null), 1500);
  };

  const supprimerDuPanier = (id) => setPanier(prev => prev.filter(i => i.id !== id));
  const modifierQuantite = (id, newQte) => {
    if (newQte < 3) supprimerDuPanier(id);
    else setPanier(prev => prev.map(i => i.id === id ? { ...i, quantite: newQte } : i));
  };
  
  const totalArticles = panier.reduce((acc, i) => acc + i.quantite, 0);

  const ajouterCommentaire = (productId, texte) => {
    if (!texte.trim()) return;
    setCommentaires(prev => ({
      ...prev,
      [productId]: [...(prev[productId] || []), texte]
    }));
    setNouveauCommentaire(prev => ({ ...prev, [productId]: '' }));
  };

  const generateOrderText = () => {
    let text = `NOUVELLE COMMANDE OLDA\n\n`;
    text += `CLIENT:\n`;
    text += `Nom: ${clientInfo.nom}\n`;
    text += `Email: ${clientInfo.email}\n\n`;
    text += `ARTICLES:\n`;
    panier.forEach(item => {
      text += `- ${item.nom} ${item.couleur} (${item.reference}) x${item.quantite}\n`;
    });
    return text;
  };

  const envoyerCommande = () => {
    if (!clientInfo.nom || !clientInfo.email) {
      alert('Merci de remplir tous les champs');
      return;
    }
    
    setSending(true);
    const subject = encodeURIComponent(`Commande OLDA - ${clientInfo.nom}`);
    const body = encodeURIComponent(generateOrderText());
    
    // Ouvre l'app mail
    window.open(`mailto:charlie.jallon@gmail.com?subject=${subject}&body=${body}`, '_blank');
    
    setTimeout(() => {
      setSending(false);
      setOrderSent(true);
    }, 500);
  };

  const fermerEtReset = () => {
    setCartOpen(false);
    setOrderSent(false);
    setPanier([]);
    setClientInfo({ nom: '', email: '' });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased',
    }}>
      {/* Navigation */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'rgba(251, 251, 253, 0.8)',
        backdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: '0.5px solid rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{
          padding: '0 16px',
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-0.02em', color: '#1d1d1f' }}>
            OLDA
          </div>
          
          <button 
            onClick={() => setCartOpen(true)}
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 17 20" fill="none">
              <path d="M4.5 5C4.5 2.51472 6.51472 0.5 9 0.5C11.4853 0.5 13.5 2.51472 13.5 5" stroke="#1d1d1f" strokeWidth="1.5" fill="none"/>
              <path d="M1.5 6.5H16.5L15.5 18.5H2.5L1.5 6.5Z" stroke="#1d1d1f" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
            </svg>
            {totalArticles > 0 && (
              <span style={{
                position: 'absolute', top: 0, right: 0, background: '#0071e3',
                color: 'white', fontSize: 9, fontWeight: 700, minWidth: 14, height: 14,
                borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {totalArticles}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Tabs */}
      <div style={{
        position: 'sticky',
        top: 44,
        zIndex: 999,
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '0.5px solid rgba(0, 0, 0, 0.08)',
      }}>
        <div style={{
          display: 'flex',
          gap: 4,
          padding: '10px 12px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '6px 12px',
                borderRadius: 16,
                border: 'none',
                background: activeTab === tab.key ? '#1d1d1f' : 'transparent',
                color: activeTab === tab.key ? '#ffffff' : '#1d1d1f',
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <main style={{ padding: '24px 16px 100px' }}>
        {MUGS_DATA[activeTab].map((product) => (
          <div key={product.id} style={{ marginBottom: 36 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              {/* Image sans cadre */}
              <img
                src={product.image}
                alt={product.nom}
                style={{ width: 100, height: 100, objectFit: 'contain', flexShrink: 0 }}
              />

              {/* Infos */}
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: '#1d1d1f', marginBottom: 4 }}>
                  {product.nom}
                </h2>
                <p style={{ fontSize: 13, color: '#86868b', marginBottom: 2 }}>
                  {product.couleur}
                </p>
                <p style={{ fontSize: 11, color: '#ababab', marginBottom: 14 }}>
                  {product.reference}
                </p>

                {/* Quantité */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#f5f5f7',
                    borderRadius: 8,
                  }}>
                    <button
                      onClick={() => ajuster(product.id, -1)}
                      style={{
                        width: 32, height: 32, border: 'none', background: 'none',
                        fontSize: 18, color: getQte(product.id) <= 3 ? '#d2d2d7' : '#1d1d1f',
                        cursor: 'pointer',
                      }}
                    >−</button>
                    <span style={{ width: 28, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>
                      {getQte(product.id)}
                    </span>
                    <button
                      onClick={() => ajuster(product.id, 1)}
                      style={{ width: 32, height: 32, border: 'none', background: 'none', fontSize: 18, cursor: 'pointer' }}
                    >+</button>
                  </div>
                </div>

                <button
                  onClick={() => ajouterAuPanier(product)}
                  style={{
                    padding: '8px 20px', borderRadius: 8, border: 'none',
                    background: addedProduct === product.id ? '#34c759' : '#0071e3',
                    color: '#ffffff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  {addedProduct === product.id ? '✓' : 'Ajouter'}
                </button>
              </div>
            </div>

            {/* Commentaire */}
            <div style={{ marginTop: 12, marginLeft: 116 }}>
              {(commentaires[product.id] || []).map((c, i) => (
                <p key={i} style={{ fontSize: 11, color: '#86868b', marginBottom: 4 }}>« {c} »</p>
              ))}
              <input
                type="text"
                placeholder="Laisser un commentaire..."
                value={nouveauCommentaire[product.id] || ''}
                onChange={e => setNouveauCommentaire(prev => ({ ...prev, [product.id]: e.target.value }))}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    ajouterCommentaire(product.id, nouveauCommentaire[product.id] || '');
                  }
                }}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: '1px solid #e5e5e5',
                  fontSize: 12,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>
        ))}
      </main>

      {/* Cart Overlay */}
      <div
        onClick={() => { if (!orderSent) setCartOpen(false); }}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)', zIndex: 2000,
          opacity: cartOpen ? 1 : 0, visibility: cartOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.3s, visibility 0.3s',
        }}
      />

      {/* Cart - Plein écran sur mobile */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        maxHeight: '85vh',
        background: '#ffffff',
        borderRadius: '20px 20px 0 0',
        zIndex: 2001,
        transform: cartOpen ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Barre de drag */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 8px' }}>
          <div style={{ width: 36, height: 5, background: '#e0e0e0', borderRadius: 3 }} />
        </div>

        {orderSent ? (
          <div style={{ padding: '50px 30px', textAlign: 'center' }}>
            <div style={{
              width: 60, height: 60, borderRadius: 30, background: '#34c759',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                <path d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1d1d1f', marginBottom: 10, lineHeight: 1.4 }}>
              Atelier OLDA vous remercie pour votre commande
            </h2>
            <button
              onClick={fermerEtReset}
              style={{
                marginTop: 20,
                padding: '12px 30px', borderRadius: 10, border: 'none',
                background: '#1d1d1f', color: '#ffffff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}
            >
              Fermer
            </button>
          </div>
        ) : (
          <>
            <div style={{
              padding: '0 20px 12px',
              borderBottom: '0.5px solid #e5e5e5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <h2 style={{ fontSize: 17, fontWeight: 600, color: '#1d1d1f' }}>Votre commande</h2>
              <button
                onClick={() => setCartOpen(false)}
                style={{
                  width: 28, height: 28, borderRadius: 14, border: 'none',
                  background: '#f5f5f7', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
              {panier.length === 0 ? (
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'center', padding: '40px 20px', color: '#86868b',
                }}>
                  <svg width="44" height="44" viewBox="0 0 17 20" fill="none">
                    <path d="M4.5 5C4.5 2.51472 6.51472 0.5 9 0.5C11.4853 0.5 13.5 2.51472 13.5 5" stroke="#d2d2d7" strokeWidth="1.5" fill="none"/>
                    <path d="M1.5 6.5H16.5L15.5 18.5H2.5L1.5 6.5Z" stroke="#d2d2d7" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
                  </svg>
                  <p style={{ marginTop: 14, fontSize: 14 }}>Votre panier est vide</p>
                </div>
              ) : (
                <>
                  {panier.map(item => (
                    <div key={item.id} style={{
                      display: 'flex', gap: 12, padding: '12px 0',
                      borderBottom: '0.5px solid #f0f0f0',
                    }}>
                      <img src={item.image} alt={item.nom} style={{ width: 50, height: 50, objectFit: 'contain' }} />
                      
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: 13, fontWeight: 600, color: '#1d1d1f', marginBottom: 2 }}>
                          {item.nom}
                        </h3>
                        <p style={{ fontSize: 11, color: '#86868b', marginBottom: 8 }}>
                          {item.couleur} • {item.reference}
                        </p>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            display: 'flex', alignItems: 'center',
                            background: '#f5f5f7', borderRadius: 6,
                          }}>
                            <button
                              onClick={() => modifierQuantite(item.id, item.quantite - 1)}
                              style={{ width: 26, height: 26, border: 'none', background: 'none', fontSize: 14, cursor: 'pointer' }}
                            >−</button>
                            <span style={{ width: 22, textAlign: 'center', fontSize: 12, fontWeight: 600 }}>
                              {item.quantite}
                            </span>
                            <button
                              onClick={() => modifierQuantite(item.id, item.quantite + 1)}
                              style={{ width: 26, height: 26, border: 'none', background: 'none', fontSize: 14, cursor: 'pointer' }}
                            >+</button>
                          </div>
                          
                          <button
                            onClick={() => supprimerDuPanier(item.id)}
                            style={{ border: 'none', background: 'none', fontSize: 11, color: '#0071e3', cursor: 'pointer' }}
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div style={{ marginTop: 20 }}>
                    <label style={{ fontSize: 12, fontWeight: 500, color: '#1d1d1f', display: 'block', marginBottom: 6 }}>
                      Nom
                    </label>
                    <input
                      type="text"
                      value={clientInfo.nom}
                      onChange={e => setClientInfo({...clientInfo, nom: e.target.value})}
                      style={{
                        width: '100%', padding: '14px 16px', borderRadius: 10,
                        border: '1px solid #e5e5e5', fontSize: 15, outline: 'none',
                        boxSizing: 'border-box', marginBottom: 14,
                      }}
                    />

                    <label style={{ fontSize: 12, fontWeight: 500, color: '#1d1d1f', display: 'block', marginBottom: 6 }}>
                      Adresse mail
                    </label>
                    <input
                      type="email"
                      value={clientInfo.email}
                      onChange={e => setClientInfo({...clientInfo, email: e.target.value})}
                      style={{
                        width: '100%', padding: '14px 16px', borderRadius: 10,
                        border: '1px solid #e5e5e5', fontSize: 15, outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </>
              )}
            </div>

            {panier.length > 0 && (
              <div style={{ padding: '16px 20px 30px', borderTop: '0.5px solid #e5e5e5' }}>
                <button
                  onClick={envoyerCommande}
                  disabled={sending}
                  style={{
                    width: '100%', padding: '16px 20px', borderRadius: 12, border: 'none',
                    background: sending ? '#86868b' : '#0071e3',
                    color: '#ffffff', fontSize: 16, fontWeight: 600, cursor: sending ? 'not-allowed' : 'pointer',
                  }}
                >
                  {sending ? 'Envoi...' : 'Commander'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
