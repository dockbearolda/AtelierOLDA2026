import React, { useState } from 'react';

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

const Index = () => {
  const [activeTab, setActiveTab] = useState('olda');
  const [quantites, setQuantites] = useState({});
  const [panier, setPanier] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [nomClient, setNomClient] = useState('');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const getQte = (id) => quantites[id] || 3;
  const ajuster = (id, delta) => {
    const v = getQte(id) + delta;
    if (v >= 3) setQuantites({ ...quantites, [id]: v });
  };

  const ajouterAuPanier = (p) => {
    const qte = getQte(p.id);
    setPanier(prev => {
      const existant = prev.find(i => i.id === p.id);
      if (existant) return prev.map(i => i.id === p.id ? { ...i, quantite: i.quantite + qte } : i);
      return [...prev, { ...p, quantite: qte }];
    });
    setCartOpen(true);
  };

  const supprimerDuPanier = (id) => setPanier(prev => prev.filter(i => i.id !== id));

  const totalPrix = panier.reduce((acc, i) => acc + (i.prix * i.quantite), 0);
  const totalArticles = panier.reduce((acc, i) => acc + i.quantite, 0);

  const envoyerCommande = async () => {
    if (!nomClient.trim()) return;
    setIsSending(true);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nomClient, panier })
      });
      if (res.ok) {
        alert('✅ Commande confirmée.');
        setPanier([]);
        setShowCheckoutModal(false);
        setCartOpen(false);
      }
    } catch (e) { alert('Erreur'); }
    finally { setIsSending(false); }
  };

  return (
    <div className="apple-experience">
      <style>{`
        :root {
          --bg: #ffffff;
          --secondary: #f5f5f7;
          --accent: #0071e3;
          --text: #1d1d1f;
        }
        body { margin: 0; background: var(--bg); color: var(--text); font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif; }
        
        /* HEADER LUXE */
        .nav { position: sticky; top: 0; background: rgba(255,255,255,0.7); backdrop-filter: blur(20px); z-index: 1000; border-bottom: 1px solid rgba(0,0,0,0.05); }
        .nav-inner { max-width: 1200px; margin: 0 auto; height: 54px; display: flex; justify-content: space-between; align-items: center; padding: 0 24px; }
        .logo { font-weight: 700; font-size: 22px; letter-spacing: -0.03em; }
        .cart-trigger { background: none; border: none; cursor: pointer; position: relative; font-size: 20px; }
        .badge { position: absolute; top: -5px; right: -8px; background: var(--accent); color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 11px; display: flex; align-items: center; justify-content: center; font-weight: bold; }

        /* COLLECTIONS */
        .tabs { display: flex; justify-content: center; gap: 32px; padding: 20px; border-bottom: 1px solid #f2f2f2; overflow-x: auto; scrollbar-width: none; }
        .tab { font-size: 13px; font-weight: 500; opacity: 0.5; cursor: pointer; transition: 0.3s; white-space: nowrap; border: none; background: none; padding-bottom: 4px; }
        .tab.active { opacity: 1; border-bottom: 2px solid #000; }

        /* PRODUITS */
        .content { max-width: 1200px; margin: 0 auto; padding: 60px 24px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 32px; }
        .product-card { background: var(--secondary); border-radius: 24px; padding: 40px; display: flex; flex-direction: column; align-items: center; transition: transform 0.4s ease; }
        .product-card:hover { transform: translateY(-5px); }
        .img-container { height: 260px; display: flex; align-items: center; margin-bottom: 30px; }
        .img-container img { max-height: 100%; object-fit: contain; mix-blend-mode: multiply; }
        
        /* STEPPER HAUT DE GAMME */
        .lux-stepper { display: flex; align-items: center; background: #fff; border-radius: 40px; padding: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-bottom: 24px; }
        .step-btn { width: 36px; height: 36px; border: none; background: #fff; border-radius: 50%; cursor: pointer; font-size: 20px; transition: 0.2s; }
        .step-btn:hover { background: #f2f2f2; }
        .step-val { width: 50px; text-align: center; font-weight: 600; font-size: 16px; }

        .btn-add { background: var(--accent); color: #fff; border: none; padding: 12px 32px; border-radius: 30px; font-weight: 600; cursor: pointer; transition: 0.3s; }
        .btn-add:hover { background: #0077ed; transform: scale(1.05); }

        /* PANIER APPLE (SIDE DRAWER) */
        .drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.3); backdrop-filter: blur(4px); z-index: 2000; display: ${cartOpen ? 'block' : 'none'}; }
        .drawer { position: fixed; top: 0; right: 0; bottom: 0; width: 450px; background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); z-index: 2001; transform: translateX(${cartOpen ? '0' : '100%'}); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); padding: 48px; display: flex; flex-direction: column; box-shadow: -20px 0 60px rgba(0,0,0,0.1); }
        @media (max-width: 500px) { .drawer { width: 100%; padding: 24px; } }
        
        .drawer-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .drawer-title { font-size: 32px; font-weight: 700; letter-spacing: -0.04em; }
        .close-btn { font-size: 28px; cursor: pointer; border: none; background: none; font-weight: 200; }
        
        .cart-list { flex: 1; overflow-y: auto; }
        .cart-item { display: flex; gap: 20px; padding: 24px 0; border-bottom: 1px solid #f2f2f2; align-items: center; }
        .cart-img { width: 90px; height: 90px; background: var(--secondary); border-radius: 12px; object-fit: contain; }
        .cart-details { flex: 1; }
        .cart-name { font-weight: 600; font-size: 17px; margin-bottom: 4px; }
        .cart-meta { color: #86868b; font-size: 14px; }
        .btn-remove { background: none; border: none; color: var(--accent); cursor: pointer; font-size: 13px; padding: 0; margin-top: 8px; }

        .drawer-footer { margin-top: 20px; padding-top: 30px; border-top: 1px solid #f2f2f2; }
        .total-row { display: flex; justify-content: space-between; font-size: 20px; font-weight: 600; margin-bottom: 24px; }
        .btn-checkout { width: 100%; background: var(--accent); color: #fff; border: none; padding: 18px; border-radius: 16px; font-size: 17px; font-weight: 600; cursor: pointer; }

        /* CHECKOUT MODAL */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 3000; display: flex; align-items: center; justify-content: center; }
        .modal { background: #fff; padding: 48px; border-radius: 32px; width: 90%; max-width: 440px; text-align: center; }
        .apple-input { width: 100%; box-sizing: border-box; padding: 18px; border-radius: 14px; border: 1px solid #d2d2d7; margin: 24px 0; font-size: 17px; outline: none; transition: 0.2s; }
        .apple-input:focus { border-color: var(--accent); box-shadow: 0 0 0 4px rgba(0,113,227,0.1); }
      `}</style>

      <nav className="nav">
        <div className="nav-inner">
          <div className="logo">OLDA</div>
          <button className="cart-trigger" onClick={() => setCartOpen(true)}>
            🛍️ {totalArticles > 0 && <span className="badge">{totalArticles}</span>}
          </button>
        </div>
      </nav>

      <div className="tabs">
        {Object.keys(MUGS_DATA).map(key => (
          <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>
            {formatTabName(key)}
          </button>
        ))}
      </div>

      <main className="content">
        <h1 style={{ fontSize: '48px', fontWeight: 700, textAlign: 'center', marginBottom: '60px', letter-spacing: '-0.05em' }}>
          {formatTabName(activeTab)}
        </h1>

        <div className="grid">
          {MUGS_DATA[activeTab].map(p => (
            <div key={p.id} className="product-card">
              <div className="img-container">
                <img src={p.image} alt={p.couleur} />
              </div>
              <h2 style={{ fontSize: '26px', margin: '0 0 8px 0', fontWeight: 600 }}>{p.couleur}</h2>
              <p style={{ color: '#86868b', fontSize: '19px', marginBottom: '24px' }}>{p.prix.toFixed(2)} €</p>
              
              <div className="lux-stepper">
                <button className="step-btn" onClick={() => ajuster(p.id, -1)}>−</button>
                <div className="step-val">{getQte(p.id)}</div>
                <button className="step-btn" onClick={() => ajuster(p.id, 1)}>+</button>
              </div>
              
              <button className="btn-add" onClick={() => ajouterAuPanier(p)}>
                Ajouter au panier
              </button>
            </div>
          ))}
        </div>
      </main>

      <div className="drawer-overlay" onClick={() => setCartOpen(false)} />
      <div className="drawer">
        <div className="drawer-header">
          <h2 className="drawer-title">Panier</h2>
          <button className="close-btn" onClick={() => setCartOpen(false)}>✕</button>
        </div>

        <div className="cart-list">
          {panier.length === 0 ? (
            <p style={{ color: '#86868b', fontSize: '18px' }}>Votre panier est vide.</p>
          ) : (
            panier.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} className="cart-img" alt="" />
                <div className="cart-details">
                  <div className="cart-name">{item.couleur}</div>
                  <div className="cart-meta">{item.quantite} × {item.prix.toFixed(2)} €</div>
                  <button className="btn-remove" onClick={() => supprimerDuPanier(item.id)}>Supprimer</button>
                </div>
                <div style={{ fontWeight: 600 }}>{(item.prix * item.quantite).toFixed(2)}€</div>
              </div>
            ))
          )}
        </div>

        {panier.length > 0 && (
          <div className="drawer-footer">
            <div className="total-row">
              <span>Total</span>
              <span>{totalPrix.toFixed(2)} €</span>
            </div>
            <button className="btn-checkout" onClick={() => { setCartOpen(false); setShowCheckoutModal(true); }}>
              Commander
            </button>
          </div>
        )}
      </div>

      {showCheckoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-0.04em' }}>Finaliser</h2>
            <p style={{ color: '#86868b', marginTop: '12px' }}>Entrez votre nom pour confirmer la commande.</p>
            <input 
              className="apple-input" 
              placeholder="Nom complet" 
              autoFocus
              value={nomClient} 
              onChange={(e) => setNomClient(e.target.value)} 
            />
            <button className="btn-checkout" onClick={envoyerCommande} disabled={isSending || !nomClient.trim()}>
              {isSending ? 'Traitement en cours...' : 'Confirmer la commande'}
            </button>
            <p style={{ marginTop: '24px', cursor: 'pointer', color: '#0071e3', fontWeight: 500 }} onClick={() => setShowCheckoutModal(false)}>
              Annuler
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
