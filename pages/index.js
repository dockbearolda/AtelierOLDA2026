import React, { useState } from ‘react’;

const MUGS_DATA = {
nouveautes: [{ id: 101, reference: ‘NW 01’, image: ‘/images/mugs/nouveaute1.jpg’, couleur: ‘Édition Aurore’, prix: 16.99 }],
olda: [
{ id: 1, reference: ‘TC 01’, image: ‘/images/mugs/roseblanc.jpg’, couleur: ‘Rose & Blanc’, prix: 14.99 },
{ id: 2, reference: ‘TC 02’, image: ‘/images/mugs/rougeblanc.jpg’, couleur: ‘Rouge & Blanc’, prix: 14.99 },
{ id: 3, reference: ‘TC 03’, image: ‘/images/mugs/orangeblanc.jpg’, couleur: ‘Orange & Blanc’, prix: 14.99 },
{ id: 4, reference: ‘TC 04’, image: ‘/images/mugs/vertblanc.jpg’, couleur: ‘Vert & Blanc’, prix: 14.99 },
{ id: 5, reference: ‘TC 05’, image: ‘/images/mugs/noirblanc.jpg’, couleur: ‘Noir & Blanc’, prix: 14.99 },
],
exclusif: [{ id: 11, reference: ‘TF 01’, image: ‘/images/mugs/Fuckblancnoir.JPG’, couleur: ‘Tasse Signature’, prix: 18.99 }],
offres: [{ id: 201, reference: ‘DS 01’, image: ‘/images/mugs/logo.jpeg’, couleur: ‘Édition Limitée’, prix: 12.99 }],
};

const formatTabName = (key) => {
const names = {
nouveautes: “Nouveautés”,
olda: “Collection OLDA”,
exclusif: “Collection Signature”,
offres: “Offres Spéciales”
};
return names[key] || key;
};

export default function BoutiqueOlda() {
const [activeTab, setActiveTab] = useState(‘olda’);
const [quantites, setQuantites] = useState({});
const [panier, setPanier] = useState([]);
const [cartOpen, setCartOpen] = useState(false);

const getQte = (id) => quantites[id] || 3;

const ajuster = (id, delta) => {
const actuelle = getQte(id);
const nouvelle = actuelle + delta;
if (nouvelle >= 3) {
setQuantites({ …quantites, [id]: nouvelle });
}
};

const modifierPanier = (id, nouvelleQte) => {
if (nouvelleQte < 3) return;
setPanier(prev =>
prev.map(item => item.id === id ? { …item, quantite: nouvelleQte } : item)
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
item.id === produit.id ? { …item, quantite: item.quantite + qte } : item
);
}
return […prev, { …produit, quantite: qte }];
});
setQuantites({ …quantites, [produit.id]: 3 });
};

const totalArticles = panier.reduce((acc, item) => acc + item.quantite, 0);
const totalPrix = panier.reduce((acc, item) => acc + (item.prix * item.quantite), 0);

return (
<div style={{ background: ‘#fafbfc’, minHeight: ‘100vh’, color: ‘#1a1a1a’, fontFamily: “‘Clash Display’, ‘Outfit’, -apple-system, BlinkMacSystemFont, sans-serif” }}>
<style>{`
@import url(‘https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Clash+Display:wght@600;700&display=swap’);

```
    /* HEADER STICKY */
    .nav-header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: linear-gradient(180deg, rgba(250,251,252,0.95) 0%, rgba(250,251,252,0.85) 100%);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(0,0,0,0.06);
      padding: 16px 0;
      animation: slideDown 0.5s ease-out;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
    }

    .logo {
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.5px;
      background: linear-gradient(135deg, #000 0%, #444 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .cart-badge {
      position: relative;
      cursor: pointer;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,0.05);
      border-radius: 12px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-size: 20px;
    }

    .cart-badge:hover {
      background: rgba(0,0,0,0.1);
      transform: scale(1.05);
    }

    .badge-count {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #e63946;
      color: white;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      font-size: 12px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes pop {
      0% { transform: scale(0); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }

    /* COLLECTION BUTTONS */
    .roulette {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      padding: 0 20px;
      margin-top: 16px;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
    }

    .roulette::-webkit-scrollbar { display: none; }

    .collection-btn {
      flex: 0 0 auto;
      padding: 10px 20px;
      border-radius: 20px;
      border: 1px solid rgba(0,0,0,0.1);
      font-weight: 500;
      font-size: 14px;
      background: white;
      color: #666;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }

    .collection-btn:hover {
      border-color: rgba(0,0,0,0.2);
      transform: translateY(-2px);
    }

    .collection-btn.active {
      background: #000;
      color: #fff;
      border-color: #000;
      box-shadow: 0 8px 16px rgba(0,0,0,0.15);
      transform: scale(1.02);
    }

    /* MAIN CONTAINER */
    .container {
      max-width: 640px;
      margin: 0 auto;
      padding: 40px 20px 120px;
    }

    .section-title {
      font-size: 36px;
      font-weight: 700;
      font-family: 'Clash Display', sans-serif;
      margin-bottom: 32px;
      letter-spacing: -1px;
      animation: fadeInUp 0.6s ease-out;
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* PRODUCT CARD */
    .card {
      background: white;
      border-radius: 24px;
      padding: 24px;
      margin-bottom: 28px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.04);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      animation: fadeInUp 0.5s ease-out;
      animation-fill-mode: both;
    }

    .card:nth-child(2) { animation-delay: 0.1s; }
    .card:nth-child(3) { animation-delay: 0.2s; }
    .card:nth-child(4) { animation-delay: 0.3s; }
    .card:nth-child(5) { animation-delay: 0.4s; }

    .card:hover {
      box-shadow: 0 12px 32px rgba(0,0,0,0.08);
      transform: translateY(-4px);
    }

    .img-box {
      background: linear-gradient(135deg, #f8f9fa 0%, #f0f1f3 100%);
      border-radius: 18px;
      padding: 40px 24px;
      text-align: center;
      margin-bottom: 24px;
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .img-box img {
      max-height: 100%;
      max-width: 100%;
      object-fit: contain;
      animation: fadeIn 0.6s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }

    .product-info {
      margin-bottom: 24px;
    }

    .product-name {
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 8px;
      color: #000;
    }

    .product-ref {
      color: #999;
      font-size: 13px;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .product-price {
      font-size: 18px;
      font-weight: 600;
      color: #e63946;
    }

    /* CONTROLS */
    .controls {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .stepper-lux {
      display: flex;
      align-items: center;
      gap: 0;
      background: #f5f5f7;
      border-radius: 12px;
      overflow: hidden;
      padding: 0;
    }

    .btn-step {
      border: none;
      background: transparent;
      width: 40px;
      height: 44px;
      font-size: 18px;
      color: #000;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      font-weight: 600;
    }

    .btn-step:hover:not(:disabled) {
      background: rgba(0,0,0,0.06);
    }

    .btn-step:disabled {
      color: #d2d2d7;
      cursor: not-allowed;
    }

    .val-step {
      font-weight: 600;
      font-size: 15px;
      min-width: 40px;
      text-align: center;
      background: white;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 1px solid rgba(0,0,0,0.06);
      border-right: 1px solid rgba(0,0,0,0.06);
    }

    .btn-ajouter {
      flex: 1;
      height: 44px;
      border: none;
      border-radius: 12px;
      background: linear-gradient(135deg, #000 0%, #333 100%);
      color: white;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .btn-ajouter:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    }

    .btn-ajouter:active {
      transform: scale(0.98);
    }

    /* PANIER MODAL */
    .cart-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      backdrop-filter: blur(4px);
      z-index: 1000;
      animation: fadeIn 0.2s ease-out;
    }

    .cart-modal {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: white;
      border-radius: 28px 28px 0 0;
      z-index: 1001;
      max-height: 90vh;
      overflow-y: auto;
      animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }

    .cart-header {
      padding: 24px 20px;
      border-bottom: 1px solid rgba(0,0,0,0.06);
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      background: white;
      border-radius: 28px 28px 0 0;
    }

    .cart-header h2 {
      font-size: 24px;
      font-weight: 700;
      margin: 0;
    }

    .btn-close {
      background: none;
      border: none;
      font-size: 28px;
      cursor: pointer;
      color: #666;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .btn-close:hover {
      color: #000;
      background: rgba(0,0,0,0.05);
      border-radius: 12px;
    }

    .cart-items {
      padding: 20px;
    }

    .cart-item {
      display: flex;
      gap: 16px;
      padding: 16px;
      background: #f5f5f7;
      border-radius: 16px;
      margin-bottom: 12px;
      align-items: flex-start;
      animation: fadeIn 0.3s ease-out;
    }

    .cart-item-img {
      width: 80px;
      height: 80px;
      background: white;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .cart-item-img img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    .cart-item-details {
      flex: 1;
    }

    .cart-item-name {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 4px;
    }

    .cart-item-ref {
      font-size: 12px;
      color: #999;
      margin-bottom: 8px;
    }

    .cart-item-price {
      font-weight: 600;
      color: #e63946;
    }

    .cart-item-controls {
      display: flex;
      gap: 8px;
      margin-top: 8px;
    }

    .mini-stepper {
      display: flex;
      align-items: center;
      gap: 6px;
      background: white;
      border-radius: 8px;
      padding: 4px;
    }

    .mini-btn {
      width: 28px;
      height: 28px;
      border: none;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: #000;
      transition: all 0.2s;
    }

    .mini-btn:hover {
      background: rgba(0,0,0,0.06);
      border-radius: 6px;
    }

    .mini-val {
      min-width: 20px;
      text-align: center;
      font-size: 13px;
      font-weight: 600;
    }

    .btn-delete {
      background: rgba(230,57,70,0.1);
      color: #e63946;
      border: none;
      padding: 6px 12px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
      transition: all 0.2s;
      margin-left: auto;
      align-self: flex-end;
    }

    .btn-delete:hover {
      background: rgba(230,57,70,0.2);
    }

    .cart-empty {
      text-align: center;
      padding: 60px 20px;
      color: #999;
    }

    .cart-empty-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }

    .cart-footer {
      padding: 20px;
      border-top: 1px solid rgba(0,0,0,0.06);
      position: sticky;
      bottom: 0;
      background: white;
    }

    .cart-summary {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding: 0 0 16px;
      border-bottom: 1px solid rgba(0,0,0,0.06);
    }

    .summary-label {
      font-size: 14px;
      color: #666;
    }

    .summary-value {
      font-size: 24px;
      font-weight: 700;
      color: #000;
    }

    .price-total {
      color: #e63946;
    }

    .btn-checkout {
      width: 100%;
      height: 50px;
      background: linear-gradient(135deg, #000 0%, #333 100%);
      color: white;
      border: none;
      border-radius: 14px;
      font-weight: 700;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .btn-checkout:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.2);
    }

    .btn-checkout:active {
      transform: scale(0.98);
    }

    /* RESPONSIVE */
    @media (max-width: 480px) {
      .section-title {
        font-size: 28px;
      }

      .card {
        padding: 18px;
        margin-bottom: 20px;
      }

      .img-box {
        padding: 30px 16px;
      }

      .collection-btn {
        padding: 8px 16px;
        font-size: 13px;
      }
    }
  `}</style>

  {/* HEADER */}
  <nav className="nav-header">
    <div className="header-content">
      <div className="logo">OLDA</div>
      <div 
        className="cart-badge" 
        onClick={() => setCartOpen(true)}
      >
        🛍️
        {totalArticles > 0 && <span className="badge-count">{totalArticles}</span>}
      </div>
    </div>
    <div className="roulette">
      {Object.keys(MUGS_DATA).map(key => (
        <button
          key={key}
          className={`collection-btn ${activeTab === key ? 'active' : ''}`}
          onClick={() => setActiveTab(key)}
        >
          {formatTabName(key)}
        </button>
      ))}
    </div>
  </nav>

  {/* MAIN CONTENT */}
  <main className="container">
    <h1 className="section-title">{formatTabName(activeTab)}</h1>

    {MUGS_DATA[activeTab].map((p) => (
      <div key={p.id} className="card">
        <div className="img-box">
          <img src={p.image} alt={p.couleur} />
        </div>
        <div className="product-info">
          <p className="product-ref">{p.reference}</p>
          <h2 className="product-name">{p.couleur}</h2>
          <p className="product-price">{p.prix.toFixed(2)}€</p>
        </div>

        <div className="controls">
          <div className="stepper-lux">
            <button
              className="btn-step"
              onClick={() => ajuster(p.id, -1)}
              disabled={getQte(p.id) <= 3}
            >
              −
            </button>
            <div className="val-step">{getQte(p.id)}</div>
            <button className="btn-step" onClick={() => ajuster(p.id, 1)}>
              +
            </button>
          </div>
          <button className="btn-ajouter" onClick={() => ajouterAuPanier(p)}>
            Ajouter
          </button>
        </div>
      </div>
    ))}
  </main>

  {/* CART MODAL */}
  {cartOpen && (
    <>
      <div className="cart-overlay" onClick={() => setCartOpen(false)} />
      <div className="cart-modal">
        <div className="cart-header">
          <h2>Votre panier</h2>
          <button className="btn-close" onClick={() => setCartOpen(false)}>×</button>
        </div>

        <div className="cart-items">
          {panier.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛍️</div>
              <p>Votre panier est vide</p>
            </div>
          ) : (
            panier.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img">
                  <img src={item.image} alt={item.couleur} />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.couleur}</div>
                  <div className="cart-item-ref">{item.reference}</div>
                  <div className="cart-item-price">
                    {(item.prix * item.quantite).toFixed(2)}€
                  </div>
                  <div className="cart-item-controls">
                    <div className="mini-stepper">
                      <button
                        className="mini-btn"
                        onClick={() => modifierPanier(item.id, item.quantite - 1)}
                        disabled={item.quantite <= 3}
                      >
                        −
                      </button>
                      <div className="mini-val">{item.quantite}</div>
                      <button
                        className="mini-btn"
                        onClick={() => modifierPanier(item.id, item.quantite + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn-delete"
                      onClick={() => supprimerDuPanier(item.id)}
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
          <div className="cart-footer">
            <div className="cart-summary">
              <span className="summary-label">Total ({totalArticles} articles)</span>
              <span className="summary-value price-total">{totalPrix.toFixed(2)}€</span>
            </div>
            <button className="btn-checkout" onClick={() => alert("Direction le paiement...")}>
              Finaliser la commande
            </button>
          </div>
        )}
      </div>
    </>
  )}
</div>
```

);
}