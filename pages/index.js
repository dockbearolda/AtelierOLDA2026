import React, { useState } from 'react';

const MUGS_DATA = {
  olda: [
    { id: 1, reference: 'TC 01', image: '/images/mugs/roseblanc.jpg', couleur: 'Rose & Blanc' },
    { id: 2, reference: 'TC 02', image: '/images/mugs/rougeblanc.jpg', couleur: 'Rouge & Blanc' },
    { id: 3, reference: 'TC 03', image: '/images/mugs/orangeblanc.jpg', couleur: 'Orange & Blanc' },
    { id: 4, reference: 'TC 04', image: '/images/mugs/vertblanc.jpg', couleur: 'Vert & Blanc' },
    { id: 5, reference: 'TC 05', image: '/images/mugs/noirblanc.jpg', couleur: 'Noir & Blanc' },
  ],
  exclusif: [{ id: 11, reference: 'TF 01', image: '/images/mugs/Fuckblancnoir.JPG', couleur: 'Tasse Signature' }],
  tshirts: [{ id: 301, reference: 'TS 01', image: '/images/tshirts/logo.jpg', couleur: 'Coton Bio Noir' }],
  offres: [{ id: 201, reference: 'DS 01', image: '/images/mugs/logo.jpeg', couleur: 'Édition Limitée' }],
};

const formatTabName = (key) => {
  const names = {
    olda: "Tasse Céramique OLDA",
    exclusif: "Tasse Céramique Fuck",
    tshirts: "T-Shirt",
    offres: "Offres Spéciales"
  };
  return names[key] || key;
};

export default function BoutiqueOlda() {
  const [activeTab, setActiveTab] = useState('olda');
  const [quantites, setQuantites] = useState({});
  const [panier, setPanier] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [nomClient, setNomClient] = useState('');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const getQte = (id) => quantites[id] || 3;

  const ajuster = (id, delta) => {
    const actuelle = getQte(id);
    const nouvelle = actuelle + delta;
    if (nouvelle >= 3) {
      setQuantites({ ...quantites, [id]: nouvelle });
    }
  };

  const modifierPanier = (id, nouvelleQte) => {
    if (nouvelleQte < 3) return;
    setPanier(prev =>
      prev.map(item => item.id === id ? { ...item, quantite: nouvelleQte } : item)
    );
  };

  const supprimerDuPanier = (id) => {
    setPanier(prev => prev.filter(item => item.id !== id));
  };

  const ajouterAuPanier = (produit) => {
    const qte = getQte(produit.id);
    setPanier(prev => {
      const existant = prev.find(item => item.id === produit.id);
      if (existant) {
        return prev.map(item =>
          item.id === produit.id ? { ...item, quantite: item.quantite + qte } : item
        );
      }
      return [...prev, { ...produit, quantite: qte }];
    });
    setQuantites({ ...quantites, [produit.id]: 3 });
  };

  const envoyerCommande = async () => {
    if (!nomClient.trim()) {
      alert('❌ Veuillez entrer votre nom');
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nomClient: nomClient,
          panier: panier
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Commande envoyée avec succès !');
        setPanier([]);
        setNomClient('');
        setShowCheckoutModal(false);
        setCartOpen(false);
      } else {
        alert(`❌ Erreur: ${data.error || 'Une erreur est survenue'}`);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Impossible d\'envoyer la commande. Vérifiez votre connexion.');
    } finally {
      setIsSending(false);
    }
  };

  const totalArticles = panier.reduce((acc, item) => acc + item.quantite, 0);

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif' }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        /* HEADER */
        .nav-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255,255,255,0.8);
          backdrop-filter: saturate(180%) blur(20px);
          border-bottom: 0.5px solid #d2d2d7;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .logo {
          font-size: 21px;
          font-weight: 600;
          letter-spacing: -0.5px;
          color: #1d1d1f;
        }

        .cart-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          cursor: pointer;
          position: relative;
          font-size: 20px;
        }

        .cart-count {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #06c;
          color: white;
          border-radius: 10px;
          min-width: 20px;
          height: 20px;
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 5px;
        }

        /* TABS */
        .tabs {
          display: flex;
          gap: 8px;
          padding: 10px 20px;
          max-width: 1000px;
          margin: 0 auto;
          overflow-x: auto;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }

        .tabs::-webkit-scrollbar { display: none; }

        .tab-btn {
          padding: 6px 14px;
          border-radius: 12px;
          border: none;
          background: #f5f5f7;
          color: #1d1d1f;
          font-size: 14px;
          font-weight: 400;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab-btn.active {
          background: #1d1d1f;
          color: #fff;
        }

        /* MAIN */
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 20px 100px;
        }

        /* PRODUCT CARD - HORIZONTAL LAYOUT */
        .product-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 0;
          border-bottom: 0.5px solid #d2d2d7;
        }

        .product-image {
          width: 50px;
          height: 50px;
          flex-shrink: 0;
          background: #f5f5f7;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .product-image img {
          width: 45px;
          height: 45px;
          object-fit: contain;
        }

        .product-info {
          flex: 1;
          min-width: 0;
        }

        .product-ref {
          font-size: 12px;
          color: #86868b;
          margin-bottom: 2px;
        }

        .product-name {
          font-size: 17px;
          font-weight: 600;
          color: #1d1d1f;
        }

        /* CONTROLS */
        .product-controls {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }

        .stepper {
          display: flex;
          align-items: center;
          background: #f5f5f7;
          border-radius: 8px;
          overflow: hidden;
        }

        .stepper-btn {
          width: 32px;
          height: 32px;
          border: none;
          background: transparent;
          color: #06c;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stepper-btn:disabled {
          color: #d2d2d7;
        }

        .stepper-value {
          min-width: 28px;
          text-align: center;
          font-size: 15px;
          font-weight: 500;
        }

        .add-btn {
          padding: 6px 16px;
          background: #06c;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        /* MODAL */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          z-index: 200;
        }

        .modal {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          border-radius: 16px 16px 0 0;
          z-index: 201;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 0.5px solid #d2d2d7;
          position: sticky;
          top: 0;
          background: white;
          z-index: 10;
        }

        .modal-title {
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .close-btn {
          width: 36px;
          height: 36px;
          border: none;
          background: #f5f5f7;
          border-radius: 50%;
          font-size: 22px;
          color: #86868b;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: #e8e8ed;
        }

        .modal-content {
          padding: 16px 20px 20px;
        }

        /* CART ITEM */
        .cart-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          background: #f5f5f7;
          border-radius: 12px;
          margin-bottom: 12px;
        }

        .cart-item-image {
          width: 64px;
          height: 64px;
          background: white;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .cart-item-image img {
          width: 56px;
          height: 56px;
          object-fit: contain;
        }

        .cart-item-info {
          flex: 1;
          min-width: 0;
        }

        .cart-item-name {
          font-size: 17px;
          font-weight: 600;
          color: #1d1d1f;
          margin-bottom: 4px;
        }

        .cart-item-ref {
          font-size: 13px;
          color: #86868b;
          margin-bottom: 12px;
        }

        .cart-item-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .mini-stepper {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 8px;
          border: 1px solid #d2d2d7;
        }

        .mini-btn {
          width: 32px;
          height: 32px;
          border: none;
          background: transparent;
          color: #1d1d1f;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 400;
        }

        .mini-btn:disabled {
          color: #d2d2d7;
        }

        .mini-value {
          min-width: 32px;
          text-align: center;
          font-size: 15px;
          font-weight: 600;
          color: #1d1d1f;
        }

        .delete-btn {
          padding: 6px 12px;
          background: white;
          border: 1px solid #d2d2d7;
          border-radius: 8px;
          color: #1d1d1f;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .delete-btn:hover {
          background: #f5f5f7;
        }

        .cart-empty {
          text-align: center;
          padding: 60px 20px;
          color: #86868b;
        }

        .cart-footer {
          padding: 24px 20px;
          padding-bottom: calc(24px + env(safe-area-inset-bottom));
          background: white;
          position: sticky;
          bottom: 0;
          box-shadow: 0 -1px 0 0 rgba(0,0,0,0.05);
        }

        .checkout-btn {
          width: 100%;
          padding: 16px;
          background: #06c;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 17px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 1px 4px rgba(0,102,204,0.2);
        }

        .checkout-btn:active {
          transform: scale(0.98);
        }

        .checkout-btn:disabled {
          opacity: 0.5;
        }

        /* INPUT */
        .input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #d2d2d7;
          border-radius: 12px;
          font-size: 17px;
          margin-bottom: 12px;
        }

        .input:focus {
          outline: none;
          border-color: #06c;
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          background: #06c;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 17px;
          font-weight: 500;
          cursor: pointer;
          margin-top: 8px;
        }

        .submit-btn:disabled {
          opacity: 0.5;
        }
      `}</style>

      {/* HEADER */}
      <nav className="nav-header">
        <div className="header-top">
          <div className="logo">OLDA</div>
          <button className="cart-btn" onClick={() => setCartOpen(true)}>
            🛍️
            {totalArticles > 0 && <span className="cart-count">{totalArticles}</span>}
          </button>
        </div>
        <div className="tabs">
          {Object.keys(MUGS_DATA).map(key => (
            <button
              key={key}
              className={`tab-btn ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {formatTabName(key)}
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="container">
        {MUGS_DATA[activeTab].map((p) => (
          <div key={p.id} className="product-card">
            <div className="product-image">
              <img src={p.image} alt={p.couleur} />
            </div>
            <div className="product-info">
              <div className="product-ref">{p.reference}</div>
              <div className="product-name">{p.couleur}</div>
            </div>
            <div className="product-controls">
              <div className="stepper">
                <button
                  className="stepper-btn"
                  onClick={() => ajuster(p.id, -1)}
                  disabled={getQte(p.id) <= 3}
                >
                  −
                </button>
                <div className="stepper-value">{getQte(p.id)}</div>
                <button className="stepper-btn" onClick={() => ajuster(p.id, 1)}>
                  +
                </button>
              </div>
              <button className="add-btn" onClick={() => ajouterAuPanier(p)}>
                Ajouter
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* CART MODAL */}
      {cartOpen && (
        <>
          <div className="modal-overlay" onClick={() => setCartOpen(false)} />
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">Panier</div>
              <button className="close-btn" onClick={() => setCartOpen(false)}>×</button>
            </div>

            <div className="modal-content">
              {panier.length === 0 ? (
                <div className="cart-empty">
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛍️</div>
                  <div>Votre panier est vide</div>
                </div>
              ) : (
                panier.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.couleur} />
                    </div>
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.couleur}</div>
                      <div className="cart-item-ref">{item.reference}</div>
                      <div className="cart-item-actions">
                        <div className="mini-stepper">
                          <button
                            className="mini-btn"
                            onClick={() => modifierPanier(item.id, item.quantite - 1)}
                            disabled={item.quantite <= 3}
                          >
                            −
                          </button>
                          <div className="mini-value">{item.quantite}</div>
                          <button
                            className="mini-btn"
                            onClick={() => modifierPanier(item.id, item.quantite + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button className="delete-btn" onClick={() => supprimerDuPanier(item.id)}>
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {panier.length > 0 && (
              <div className="cart-footer">
                <button
                  className="checkout-btn"
                  onClick={() => {
                    setCartOpen(false);
                    setShowCheckoutModal(true);
                  }}
                >
                  Commander ({totalArticles} {totalArticles > 1 ? 'articles' : 'article'})
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* CHECKOUT MODAL */}
      {showCheckoutModal && (
        <>
          <div className="modal-overlay" onClick={() => !isSending && setShowCheckoutModal(false)} />
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">Finaliser</div>
              <button className="close-btn" onClick={() => !isSending && setShowCheckoutModal(false)} disabled={isSending}>×</button>
            </div>

            <div className="modal-content">
              <input
                type="text"
                className="input"
                placeholder="Votre nom"
                value={nomClient}
                onChange={(e) => setNomClient(e.target.value)}
                disabled={isSending}
              />
              <button
                className="submit-btn"
                onClick={envoyerCommande}
                disabled={isSending || !nomClient.trim()}
              >
                {isSending ? 'Envoi en cours...' : 'Envoyer la commande'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
