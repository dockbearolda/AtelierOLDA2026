import React, { useState, useEffect } from 'react';

const MUGS_DATA = {
  nouveautes: [{ id: 101, reference: 'NW 01', image: '/images/mugs/nouveaute1.jpg', couleur: 'Édition Aurore', prix: 16.99 }],
  olda: [
    { id: 1, reference: 'TC 01', image: '/images/mugs/roseblanc.jpg', couleur: 'Rose & Blanc', prix: 14.99 },
    { id: 2, reference: 'TC 02', image: '/images/mugs/rougeblanc.jpg', couleur: 'Rouge & Blanc', prix: 14.99 },
    { id: 3, reference: 'TC 03', image: '/images/mugs/orangeblanc.jpg', couleur: 'Orange & Blanc', prix: 14.99 },
    { id: 4, reference: 'TC 04', image: '/images/mugs/vertblanc.jpg', couleur: 'Vert & Blanc', prix: 14.99 },
    { id: 5, reference: 'TC 05', image: '/images/mugs/noirblanc.jpg', couleur: 'Noir & Blanc', prix: 14.99 },
  ],
  exclusif: [{ id: 11, reference: 'TF 01', image: '/images/mugs/Fuckblancnoir.JPG', couleur: 'Tasse Signature', prix: 18.99 }],
  offres: [{ id: 201, reference: 'DS 01', image: '/images/mugs/logo.jpeg', couleur: 'Édition Limitée', prix: 12.99 }],
};

const formatTabName = (key) => {
  const names = {
    nouveautes: "Nouveautés",
    olda: "Collection OLDA",
    exclusif: "Collection Signature",
    offres: "Offres Spéciales"
  };
  return names[key] || key;
};

export default function BoutiqueAppleStyle() {
  const [activeTab, setActiveTab] = useState('olda');
  const [quantites, setQuantites] = useState({});
  const [panier, setPanier] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [nomClient, setNomClient] = useState('');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // --- LOGIQUE METIER ---
  const getQte = (id) => quantites[id] || 3;
  const ajuster = (id, delta) => {
    const nouvelle = getQte(id) + delta;
    if (nouvelle >= 3) setQuantites({ ...quantites, [id]: nouvelle });
  };
  const modifierPanier = (id, nouvelleQte) => {
    if (nouvelleQte < 3) return;
    setPanier(prev => prev.map(item => item.id === id ? { ...item, quantite: nouvelleQte } : item));
  };
  const supprimerDuPanier = (id) => setPanier(prev => prev.filter(item => item.id !== id));
  
  const ajouterAuPanier = (produit) => {
    const qte = getQte(produit.id);
    setPanier(prev => {
      const existant = prev.find(item => item.id === produit.id);
      if (existant) return prev.map(item => item.id === produit.id ? { ...item, quantite: item.quantite + qte } : item);
      return [...prev, { ...produit, quantite: qte }];
    });
    setQuantites({ ...quantites, [produit.id]: 3 });
    setCartOpen(true); // Ouvre le panier style Apple lors de l'ajout
  };

  const envoyerCommande = async () => {
    if (!nomClient.trim()) return;
    setIsSending(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nomClient, panier })
      });
      if (response.ok) {
        setPanier([]);
        setShowCheckoutModal(false);
        setCartOpen(false);
        alert('Commande confirmée.');
      }
    } catch (e) { console.error(e); }
    finally { setIsSending(false); }
  };

  const totalArticles = panier.reduce((acc, item) => acc + item.quantite, 0);
  const totalPrix = panier.reduce((acc, item) => acc + (item.prix * item.quantite), 0);

  return (
    <div className="apple-theme">
      <style>{`
        :root {
          --apple-bg: #ffffff;
          --apple-secondary: #f5f5f7;
          --apple-text: #1d1d1f;
          --apple-blue: #0071e3;
          --apple-gray: #86868b;
        }

        .apple-theme {
          background: var(--apple-bg);
          color: var(--apple-text);
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
        }

        /* NAVIGATION STYLE APPLE */
        .nav-apple {
          position: sticky;
          top: 0;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: saturate(180%) blur(20px);
          z-index: 1000;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }

        .nav-content {
          max-width: 1000px;
          margin: 0 auto;
          height: 52px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 22px;
        }

        .brand { font-weight: 600; font-size: 21px; letter-spacing: -0.01em; }

        .cart-icon-btn {
          background: none; border: none; cursor: pointer; position: relative;
          padding: 8px; transition: opacity 0.2s;
        }

        .cart-dot {
          position: absolute; top: 4px; right: 4px;
          background: var(--apple-blue); width: 8px; height: 8px; border-radius: 50%;
        }

        /* CATEGORIES (SUB-NAV) */
        .collections-nav {
          display: flex; gap: 30px; justify-content: center;
          padding: 15px 0; overflow-x: auto;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .col-link {
          font-size: 12px; color: var(--apple-text); text-decoration: none;
          opacity: 0.8; transition: opacity 0.2s; cursor: pointer; white-space: nowrap;
        }

        .col-link.active { opacity: 1; font-weight: 600; border-bottom: 1px solid #000; }

        /* PRODUCT GRID */
        .main-container { max-width: 1100px; margin: 0 auto; padding: 60px 22px; }
        .hero-title { font-size: 48px; font-weight: 700; margin-bottom: 40px; letter-spacing: -0.02em; text-align: center; }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .product-card {
          background: var(--apple-secondary);
          border-radius: 20px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.4s cubic-bezier(0,0,0.5,1);
        }
        .product-card:hover { transform: scale(1.01); }

        .img-wrapper { height: 240px; display: flex; align-items: center; margin-bottom: 30px; }
        .img-wrapper img { max-height: 100%; object-fit: contain; }

        .p-name { font-size: 24px; font-weight: 600; margin: 0 0 8px 0; }
        .p-price { font-size: 17px; color: var(--apple-gray); margin-bottom: 24px; }

        /* STEPPER HAUTE-GAMME */
        .stepper-apple {
          display: flex; align-items: center; background: #fff;
          border-radius: 30px; padding: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);
          margin-bottom: 15px; width: fit-content;
        }
        .step-btn {
          width: 32px; height: 32px; border-radius: 50%; border: none;
          background: #fff; color: #000; font-size: 18px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; transition: background 0.2s;
        }
        .step-btn:hover { background: var(--apple-secondary); }
        .step-val { width: 40px; text-align: center; font-weight: 500; font-size: 14px; }

        .add-button {
          background: var(--apple-blue); color: white; border: none;
          padding: 8px 18px; border-radius: 20px; font-weight: 500;
          cursor: pointer; transition: background 0.2s;
        }
        .add-button:hover { background: #0077ed; }

        /* PANIER STYLE APPLE (SIDE DRAWER) */
        .cart-drawer {
          position: fixed; top: 0; right: 0; bottom: 0; width: 400px;
          background: rgba(255,255,255,0.95); backdrop-filter: blur(20px);
          box-shadow: -10px 0 50px rgba(0,0,0,0.1); z-index: 2000;
          padding: 40px; display: flex; flex-direction: column;
          transform: translateX(${cartOpen ? '0' : '100%'});
          transition: transform 0.5s cubic-bezier(0.2, 1, 0.2, 1);
        }
        
        @media (max-width: 500px) { .cart-drawer { width: 100%; } }

        .drawer-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .drawer-title { font-size: 28px; font-weight: 700; }
        .close-x { font-size: 30px; cursor: pointer; font-weight: 200; }

        .cart-list { flex: 1; overflow-y: auto; }
        .cart-row { display: flex; gap: 15px; margin-bottom: 25px; align-items: center; }
        .row-img { width: 70px; height: 70px; background: var(--apple-secondary); border-radius: 12px; padding: 5px; }
        .row-info { flex: 1; }
        .row-name { font-weight: 600; font-size: 15px; }
        .row-price { font-size: 14px; color: var(--apple-gray); }

        .drawer-footer { border-top: 1px solid #eee; padding-top: 20px; }
        .total-line { display: flex; justify-content: space-between; font-size: 19px; font-weight: 600; margin-bottom: 20px; }

        .checkout-btn {
          width: 100%; background: var(--apple-blue); color: white; border: none;
          padding: 16px; border-radius: 12px; font-weight: 600; font-size: 16px; cursor: pointer;
        }

        /* MODAL FINALISATION */
        .apple-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.4); 
          display: flex; align-items: center; justify-content: center; z-index: 3000;
        }
        .apple-modal {
          background: white; width: 90%; max-width: 450px; border-radius: 24px; padding: 40px;
          text-align: center;
        }
        .apple-input {
          width: 100%; padding: 16px; border-radius: 12px; border: 1px solid #d2d2d7;
          margin: 20px 0; font-size: 16px; outline-color: var(--apple-blue);
        }

        .overlay-blur {
          position: fixed; inset: 0; background: rgba(0,0,0,0.1); 
          backdrop-filter: blur(4px); z-index: 1500;
          display: ${cartOpen ? 'block' : 'none'};
        }
      `}</style>

      {/* HEADER BAR */}
      <nav className="nav-apple">
        <div className="nav-content">
          <div className="brand">OLDA</div>
          <button className="cart-icon-btn" onClick={() => setCartOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {totalArticles > 0 && <div className="cart-dot"></div>}
          </button>
        </div>
      </nav>

      {/* COLLECTIONS NAV */}
      <div className="collections-nav">
        {Object.keys(MUGS_DATA).map(key => (
          <span 
            key={key} 
            className={`col-link ${activeTab === key ? 'active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {formatTabName(key)}
          </span>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <main className="main-container">
        <h1 className="hero-title">{formatTabName(activeTab)}</h1>
        
        <div className="grid">
          {MUGS_DATA[activeTab].map((p) => (
            <div key={p.id} className="product-card">
              <div className="img-wrapper">
                <img src={p.image} alt={p.couleur} />
              </div>
              <h2 className="p-name">{p.couleur}</h2>
              <p className="p-price">{p.prix.toFixed(2)} €</p>
              
              <div className="stepper-apple">
                <button className="step-btn" onClick={() => ajuster(p.id, -1)}>−</button>
                <div className="step-val">{getQte(p.id)}</div>
                <button className="step-btn" onClick={() => ajuster(p.id, 1)}>+</button>
              </div>
              
              <button className="add-button" onClick={() => ajouterAuPanier(p)}>
                Ajouter au panier
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* CART DRAWER (STYLE APPLE STORE) */}
      <div className="overlay-blur" onClick={() => setCartOpen(false)} />
      <div className="cart-drawer">
        <div className="drawer-header">
          <span className="drawer-title">Panier</span>
          <span className="close-x" onClick={() => setCartOpen(false)}>×</span>
        </div>

        <div className="cart-list">
          {panier.length === 0 ? (
            <p style={{ color: '#86868b', textAlign: 'center', marginTop: '40px' }}>Votre panier est vide.</p>
          ) : (
            panier.map(item => (
              <div key={item.id} className="cart-row">
                <img src={item.image} className="row-img" alt="" />
                <div className="row-info">
                  <div className="row-name">{item.couleur}</div>
                  <div className="row-price">{item.quantite} x {item.prix} €</div>
                </div>
                <button 
                  style={{ background: 'none', border: 'none', color: '#0071e3', cursor: 'pointer', fontSize: '13px' }}
                  onClick={() => supprimerDuPanier(item.id)}
                >
                  Supprimer
                </button>
              </div>
            ))
          )}
        </div>

        {panier.length > 0 && (
          <div className="drawer-footer">
            <div className="total-line">
              <span>Sous-total</span>
              <span>{totalPrix.toFixed(2)} €</span>
            </div>
            <button className="checkout-btn" onClick={() => { setCartOpen(false); setShowCheckoutModal(true); }}>
              Vérifier le paiement
            </button>
          </div>
        )}
      </div>

      {/* CHECKOUT MODAL */}
      {showCheckoutModal && (
        <div className="apple-modal-overlay">
          <div className="apple-modal">
            <h2 style={{ fontSize: '32px', fontWeight: 700 }}>Dernière étape</h2>
            <p style={{ color: '#86868b' }}>Pour valider votre commande de {totalPrix.toFixed(2)} €, merci de saisir votre nom.</p>
            
            <input 
              className="apple-input"
              placeholder="Nom complet"
              value={nomClient}
              onChange={(e) => setNomClient(e.target.value)}
            />
            
            <button 
              className="checkout-btn" 
              onClick={envoyerCommande}
              disabled={isSending || !nomClient}
            >
              {isSending ? 'Traitement...' : 'Confirmer la commande'}
            </button>
            <p 
              style={{ marginTop: '20px', cursor: 'pointer', fontSize: '14px', color: '#0071e3' }}
              onClick={() => setShowCheckoutModal(false)}
            >
              Annuler
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
