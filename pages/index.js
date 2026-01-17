import React, { useState } from 'react';

const MUGS_DATA = {
  nouveautes: [
    { id: 101, reference: 'NW 01', image: '/images/mugs/nouveaute1.jpg', nom: 'Édition Aurore', description: 'Notre dernière création' }
  ],
  olda: [
    { id: 1, reference: 'TC 01', image: '/images/mugs/roseblanc.jpg', nom: 'Rose & Blanc', description: 'Élégance quotidienne' },
    { id: 2, reference: 'TC 02', image: '/images/mugs/rougeblanc.jpg', nom: 'Rouge & Blanc', description: 'Passion incarnée' },
    { id: 3, reference: 'TC 03', image: '/images/mugs/orangeblanc.jpg', nom: 'Orange & Blanc', description: 'Énergie positive' },
    { id: 4, reference: 'TC 04', image: '/images/mugs/vertblanc.jpg', nom: 'Vert & Blanc', description: 'Nature apaisante' },
    { id: 5, reference: 'TC 05', image: '/images/mugs/noirblanc.jpg', nom: 'Noir & Blanc', description: 'Classique intemporel' },
  ],
  fuck: [
    { id: 11, reference: 'TF 01', image: '/images/mugs/Fuckblancnoir.JPG', nom: 'Fuck Blanc & Noir', description: 'Édition signature' },
  ],
  tshirt: [
    { id: 21, reference: 'TS 01', image: 'À REMPLIR', nom: 'À REMPLIR', description: 'À REMPLIR' },
  ],
  offres: [
    { id: 201, reference: 'PR 01', image: '/images/mugs/logo.jpeg', nom: 'Édition Limitée', description: 'Offre spéciale' }
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
  const [showCheckout, setShowCheckout] = useState(false);
  const [clientInfo, setClientInfo] = useState({ nom: '', email: '', tel: '', adresse: '', message: '' });
  const [orderSent, setOrderSent] = useState(false);
  const [sending, setSending] = useState(false);

  const getQte = (id) => quantites[id] || 1;
  const ajuster = (id, delta) => {
    const v = getQte(id) + delta;
    if (v >= 1 && v <= 99) setQuantites({ ...quantites, [id]: v });
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
    if (newQte < 1) supprimerDuPanier(id);
    else setPanier(prev => prev.map(i => i.id === id ? { ...i, quantite: newQte } : i));
  };
  
  const totalArticles = panier.reduce((acc, i) => acc + i.quantite, 0);

  const generateOrderText = () => {
    let text = `NOUVELLE COMMANDE OLDA\n\n`;
    text += `CLIENT:\n`;
    text += `Nom: ${clientInfo.nom}\n`;
    text += `Email: ${clientInfo.email}\n`;
    text += `Téléphone: ${clientInfo.tel}\n`;
    text += `Adresse: ${clientInfo.adresse}\n\n`;
    text += `ARTICLES:\n`;
    panier.forEach(item => {
      text += `- ${item.nom} (${item.reference}) x${item.quantite}\n`;
    });
    if (clientInfo.message) {
      text += `\nMESSAGE:\n${clientInfo.message}`;
    }
    return text;
  };

  const envoyerCommande = () => {
    if (!clientInfo.nom || !clientInfo.email || !clientInfo.tel) {
      alert('Merci de remplir tous les champs obligatoires');
      return;
    }
    
    setSending(true);
    
    const subject = encodeURIComponent(`Commande OLDA - ${clientInfo.nom}`);
    const body = encodeURIComponent(generateOrderText());
    
    window.location.href = `mailto:charlie.jallon@gmail.com?subject=${subject}&body=${body}`;
    
    setTimeout(() => {
      setSending(false);
      setOrderSent(true);
      setTimeout(() => {
        setShowCheckout(false);
        setOrderSent(false);
        setPanier([]);
        setClientInfo({ nom: '', email: '', tel: '', adresse: '', message: '' });
      }, 3000);
    }, 1000);
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
          maxWidth: 1024,
          margin: '0 auto',
          padding: '0 24px',
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ fontSize: 21, fontWeight: 600, letterSpacing: '-0.02em', color: '#1d1d1f' }}>
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
                position: 'absolute',
                top: 0,
                right: 0,
                background: '#0071e3',
                color: 'white',
                fontSize: 9,
                fontWeight: 700,
                minWidth: 14,
                height: 14,
                borderRadius: 7,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
        top: 48,
        zIndex: 999,
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '0.5px solid rgba(0, 0, 0, 0.08)',
      }}>
        <div style={{
          display: 'flex',
          gap: 6,
          padding: '12px 16px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '8px 14px',
                borderRadius: 20,
                border: 'none',
                background: activeTab === tab.key ? '#1d1d1f' : 'transparent',
                color: activeTab === tab.key ? '#ffffff' : '#1d1d1f',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s',
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
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 120px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 16,
        }}>
          {MUGS_DATA[activeTab].map((product, index) => (
            <article
              key={product.id}
              style={{
                background: '#fbfbfd',
                borderRadius: 18,
                overflow: 'hidden',
                transition: 'transform 0.4s, box-shadow 0.4s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                height: 100,
                background: 'linear-gradient(135deg, #f5f5f7 0%, #e8e8ed 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img
                  src={product.image}
                  alt={product.nom}
                  style={{ height: 68, width: 68, objectFit: 'contain' }}
                />
              </div>

              <div style={{ padding: '14px 18px 18px' }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#86868b' }}>
                  {product.reference}
                </span>
                <h2 style={{ fontSize: 15, fontWeight: 600, color: '#1d1d1f', marginTop: 4, marginBottom: 2 }}>
                  {product.nom}
                </h2>
                <p style={{ fontSize: 12, color: '#86868b', marginBottom: 14 }}>
                  {product.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#ffffff',
                    borderRadius: 8,
                    border: '1px solid #e5e5e5',
                  }}>
                    <button
                      onClick={() => ajuster(product.id, -1)}
                      style={{
                        width: 32, height: 32, border: 'none', background: 'none',
                        fontSize: 18, color: getQte(product.id) <= 1 ? '#d2d2d7' : '#1d1d1f',
                        cursor: getQte(product.id) <= 1 ? 'not-allowed' : 'pointer',
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

                  <button
                    onClick={() => ajouterAuPanier(product)}
                    style={{
                      flex: 1, padding: '10px 14px', borderRadius: 8, border: 'none',
                      background: addedProduct === product.id ? '#34c759' : '#0071e3',
                      color: '#ffffff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    {addedProduct === product.id ? '✓' : 'Ajouter'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Cart Overlay */}
      <div
        onClick={() => setCartOpen(false)}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)', zIndex: 2000,
          opacity: cartOpen ? 1 : 0, visibility: cartOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.35s, visibility 0.35s',
        }}
      />

      {/* Cart Dropdown */}
      <div style={{
        position: 'fixed', top: 56, right: 24,
        width: 'min(380px, calc(100vw - 48px))', maxHeight: 'calc(100vh - 100px)',
        background: '#ffffff', borderRadius: 18, zIndex: 2001,
        opacity: cartOpen ? 1 : 0, visibility: cartOpen ? 'visible' : 'hidden',
        transform: cartOpen ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.98)',
        transition: 'all 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.25)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -8, right: 28, width: 16, height: 16,
          background: '#ffffff', transform: 'rotate(45deg)', borderRadius: 3,
        }} />

        <div style={{
          padding: '20px 20px 16px', borderBottom: '0.5px solid #e5e5e5',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <h2 style={{ fontSize: 17, fontWeight: 600, color: '#1d1d1f' }}>Panier</h2>
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

        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0', maxHeight: 320 }}>
          {panier.length === 0 ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', padding: '48px 24px', color: '#86868b',
            }}>
              <svg width="48" height="48" viewBox="0 0 17 20" fill="none">
                <path d="M4.5 5C4.5 2.51472 6.51472 0.5 9 0.5C11.4853 0.5 13.5 2.51472 13.5 5" stroke="#d2d2d7" strokeWidth="1.5" fill="none"/>
                <path d="M1.5 6.5H16.5L15.5 18.5H2.5L1.5 6.5Z" stroke="#d2d2d7" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
              </svg>
              <p style={{ marginTop: 16, fontSize: 15 }}>Votre panier est vide</p>
            </div>
          ) : (
            panier.map(item => (
              <div key={item.id} style={{
                display: 'flex', gap: 14, padding: '14px 20px',
                borderBottom: '0.5px solid #f5f5f7',
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 10,
                  background: '#f5f5f7', overflow: 'hidden', flexShrink: 0,
                }}>
                  <img src={item.image} alt={item.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1d1d1f', marginBottom: 2 }}>
                    {item.nom}
                  </h3>
                  <p style={{ fontSize: 12, color: '#86868b', marginBottom: 8 }}>
                    {item.reference}
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      display: 'flex', alignItems: 'center',
                      background: '#f5f5f7', borderRadius: 6,
                    }}>
                      <button
                        onClick={() => modifierQuantite(item.id, item.quantite - 1)}
                        style={{ width: 24, height: 24, border: 'none', background: 'none', fontSize: 14, cursor: 'pointer' }}
                      >−</button>
                      <span style={{ width: 24, textAlign: 'center', fontSize: 12, fontWeight: 600 }}>
                        {item.quantite}
                      </span>
                      <button
                        onClick={() => modifierQuantite(item.id, item.quantite + 1)}
                        style={{ width: 24, height: 24, border: 'none', background: 'none', fontSize: 14, cursor: 'pointer' }}
                      >+</button>
                    </div>
                    
                    <button
                      onClick={() => supprimerDuPanier(item.id)}
                      style={{ border: 'none', background: 'none', fontSize: 12, color: '#0071e3', cursor: 'pointer' }}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {panier.length > 0 && (
          <div style={{ padding: '16px 20px 20px', borderTop: '0.5px solid #e5e5e5', background: '#fbfbfd' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 14, color: '#86868b' }}>{totalArticles} article{totalArticles > 1 ? 's' : ''}</span>
            </div>
            
            <button
              onClick={() => { setCartOpen(false); setShowCheckout(true); }}
              style={{
                width: '100%', padding: '12px 20px', borderRadius: 10, border: 'none',
                background: '#0071e3', color: '#ffffff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}
            >
              Commander
            </button>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <>
          <div
            onClick={() => setShowCheckout(false)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(8px)', zIndex: 3000,
            }}
          />
          <div style={{
            position: 'fixed', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(440px, calc(100vw - 48px))',
            maxHeight: 'calc(100vh - 100px)',
            background: '#ffffff', borderRadius: 20, zIndex: 3001,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            overflow: 'hidden',
          }}>
            {orderSent ? (
              <div style={{
                padding: 60, textAlign: 'center',
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 32, background: '#34c759',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                    <path d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1d1d1f', marginBottom: 8 }}>
                  Commande envoyée !
                </h2>
                <p style={{ fontSize: 15, color: '#86868b' }}>
                  Nous vous contacterons rapidement.
                </p>
              </div>
            ) : (
              <>
                <div style={{
                  padding: '20px 24px', borderBottom: '0.5px solid #e5e5e5',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1d1d1f' }}>Finaliser la commande</h2>
                  <button
                    onClick={() => setShowCheckout(false)}
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

                <div style={{ padding: 24, maxHeight: 400, overflowY: 'auto' }}>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, fontWeight: 500, color: '#1d1d1f', display: 'block', marginBottom: 6 }}>
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      value={clientInfo.nom}
                      onChange={e => setClientInfo({...clientInfo, nom: e.target.value})}
                      style={{
                        width: '100%', padding: '12px 14px', borderRadius: 10,
                        border: '1px solid #e5e5e5', fontSize: 15, outline: 'none',
                        boxSizing: 'border-box',
                      }}
                      placeholder="Jean Dupont"
                    />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, fontWeight: 500, color: '#1d1d1f', display: 'block', marginBottom: 6 }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={clientInfo.email}
                      onChange={e => setClientInfo({...clientInfo, email: e.target.value})}
                      style={{
                        width: '100%', padding: '12px 14px', borderRadius: 10,
                        border: '1px solid #e5e5e5', fontSize: 15, outline: 'none',
                        boxSizing: 'border-box',
                      }}
                      placeholder="jean@email.com"
                    />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, fontWeight: 500, color: '#1d1d1f', display: 'block', marginBottom: 6 }}>
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      value={clientInfo.tel}
                      onChange={e => setClientInfo({...clientInfo, tel: e.target.value})}
                      style={{
                        width: '100%', padding: '12px 14px', borderRadius: 10,
                        border: '1px solid #e5e5e5', fontSize: 15, outline: 'none',
                        boxSizing: 'border-box',
                      }}
                      placeholder="06 12 34 56 78"
                    />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, fontWeight: 500, color: '#1d1d1f', display: 'block', marginBottom: 6 }}>
                      Adresse de livraison
                    </label>
                    <textarea
                      value={clientInfo.adresse}
                      onChange={e => setClientInfo({...clientInfo, adresse: e.target.value})}
                      style={{
                        width: '100%', padding: '12px 14px', borderRadius: 10,
                        border: '1px solid #e5e5e5', fontSize: 15, outline: 'none',
                        resize: 'none', height: 80, boxSizing: 'border-box',
                      }}
                      placeholder="123 Rue Example, 75001 Paris"
                    />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, fontWeight: 500, color: '#1d1d1f', display: 'block', marginBottom: 6 }}>
                      Message (optionnel)
                    </label>
                    <textarea
                      value={clientInfo.message}
                      onChange={e => setClientInfo({...clientInfo, message: e.target.value})}
                      style={{
                        width: '100%', padding: '12px 14px', borderRadius: 10,
                        border: '1px solid #e5e5e5', fontSize: 15, outline: 'none',
                        resize: 'none', height: 60, boxSizing: 'border-box',
                      }}
                      placeholder="Instructions spéciales..."
                    />
                  </div>

                  <div style={{
                    background: '#f5f5f7', borderRadius: 12, padding: 16, marginBottom: 20,
                  }}>
                    <h3 style={{ fontSize: 13, fontWeight: 600, color: '#1d1d1f', marginBottom: 12 }}>
                      Récapitulatif
                    </h3>
                    {panier.map(item => (
                      <div key={item.id} style={{
                        display: 'flex', justifyContent: 'space-between',
                        fontSize: 13, color: '#1d1d1f', marginBottom: 6,
                      }}>
                        <span>{item.nom}</span>
                        <span>x{item.quantite}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={envoyerCommande}
                    disabled={sending}
                    style={{
                      width: '100%', padding: '14px 20px', borderRadius: 12, border: 'none',
                      background: sending ? '#86868b' : '#1d1d1f',
                      color: '#ffffff', fontSize: 15, fontWeight: 600, cursor: sending ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {sending ? 'Envoi...' : 'Envoyer la commande'}
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
