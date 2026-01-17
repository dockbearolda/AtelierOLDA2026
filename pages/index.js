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
        setPanier([]);
        setShowCheckoutModal(false);
        setCartOpen(false);
        alert('✅ Commande confirmée.');
      }
    } catch (e) { alert('Erreur'); }
    finally { setIsSending(false); }
  };

  return (
    <div className="apple-experience">
      <style>{`
        :root { --bg: #ffffff; --secondary: #f5f5f7; --accent: #0071e3; --text: #1d1d1f; }
        body { margin: 0; background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
        
        .nav { position: sticky; top: 0; background: rgba(255,255,255,0.7); backdrop-filter: blur(20px); z-index: 1000; border-bottom: 1px solid rgba(0,0,0,0.05); }
        .nav-inner { max-width: 1200px; margin: 0 auto; height: 54px; display: flex; justify-content: space-between; align-items: center; padding: 0 24px; }
        .logo { font-weight: 700; font-size: 22px; letter-spacing: -0.03em; }
        
        .cart-trigger { background: none; border: none; cursor: pointer; position: relative; font-size: 20px; }
        .badge { position: absolute; top: -5px; right: -8px; background: var(--accent); color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 11px; display: flex; align-items: center; justify-content: center; }

        .tabs { display: flex; justify-content: center; gap: 32px; padding: 20px; border-bottom: 1px solid #f2f2f2; overflow-x: auto; scrollbar-width: none; }
        .tab { font-size: 13px; font-weight: 500; opacity: 0.5; cursor: pointer; border: none; background: none; transition: 0.3s; }
        .tab.active { opacity: 1; border-bottom: 2px solid #000; }

        .content { max-width: 1200px; margin: 0 auto; padding: 60px 24px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; }
        .product-card { background: var(--secondary); border-radius: 24px; padding: 40px; display: flex; flex-direction: column; align-items: center; }
        
        .img-container { height: 250px; display: flex; align-items: center; margin-bottom: 30px; }
        .img-container img { max-height: 100%; object-fit: contain; mix-blend-mode: multiply; }
        
        .lux-stepper { display: flex; align-items: center; background: #fff; border-radius: 40px; padding: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-bottom: 24px; }
        .step-btn { width: 36px; height: 36px; border: none; background: #fff; border-radius: 50%; cursor: pointer; font-size: 20px; }
        .step-val { width: 50px; text-align: center; font-weight: 600; }

        .btn-add { background: var(--accent); color: #fff; border: none; padding: 12px 32px; border-radius: 30px; font-weight: 600; cursor: pointer; }

        /* LE PANIER SIDE-DRAWER */
        .drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.3); backdrop-filter: blur(4px); z-index: 2000; display: ${cartOpen ? 'block' : 'none'}; }
        .drawer { position: fixed; top: 0; right: 0; bottom: 0; width: 450px; background: rgba(255,255,255,0.98); z-index: 2001; transform: translateX(${cartOpen ? '0' : '100%'}); transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); padding: 40px; box-shadow: -20px 0 60px rgba(0,0,0,0.15); display: flex; flex-direction: column; }
        @media (max-width: 500px) { .drawer { width: 100%; } }

        .cart-item { display: flex; gap: 20px; padding: 20px 0; border-bottom: 1px solid #f2f2f2; align-items: center; }
        .cart-img { width: 80px; height: 80px; background: var(--secondary); border-radius: 12px; object-fit: contain; }
        .btn-checkout { width: 100%; background: var(--accent); color: #fff; border: none; padding: 18px; border-radius: 16px; font-size: 17px; font-weight: 600; cursor: pointer; }

        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 3000; display: flex; align-items: center; justify-content: center; }
        .modal { background: #fff; padding: 40px; border-radius: 30px; width: 90%; max-width: 400px; text-align: center; }
        .apple-input { width: 100%; box-sizing: border-box; padding: 15px; border-radius: 12px; border: 1px solid #d2d2d7; margin: 20px 0; font-size: 16px; }
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
        <h1 style={{ fontSize: '42px', fontWeight: 700, textAlign: 'center', marginBottom: '50px', letterSpacing: '-0.04em' }}>
          {formatTabName(activeTab)}
        </h1>

        <div className="grid">
          {MUGS_DATA[activeTab].map(p => (
            <div key={p.id} className="product-card">
              <div className="img-container"><img src={p.image} alt="" /></div>
              <h2 style={{ fontSize: '24px', margin: '0 0 10px 0' }}>{p.couleur}</h2>
              <p style={{ color: '#86868b', fontSize: '18px', marginBottom: '24px' }}>{p.prix.toFixed(2)} €</p>
              <div className="lux-stepper">
                <button className="step-btn" onClick={() => ajuster(p.id, -1)}>−</button>
                <div className="step-val">{getQte(p.id)}</div>
                <button className="step-btn" onClick={() => ajuster(p.id, 1)}>+</button>
              </div>
              <button className="btn-add" onClick={() => ajouterAuPanier(p)}>Ajouter au panier</button>
            </div>
          ))}
        </div>
      </main>

      <div className="drawer-overlay" onClick={() => setCartOpen(false)} />
      <div className="drawer">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: 700 }}>Panier</h2>
          <button style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }} onClick={() => setCartOpen(false)}>✕</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {panier.length === 0 ? <p>Votre panier est vide.</p> : panier.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} className="cart-img" alt="" />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{item.couleur}</div>
                <div style={{ color: '#86868b', fontSize: '14px' }}>{item.quantite} × {item.prix}€</div>
                <button style={{ background: 'none', border: 'none', color: '#0071e3', fontSize: '12px', cursor: 'pointer', padding: 0 }} onClick={() => supprimerDuPanier(item.id)}>Supprimer</button>
              </div>
              <div style={{ fontWeight: 600 }}>{(item.prix * item.quantite).toFixed(2)}€</div>
            </div>
          ))}
        </div>
        {panier.length > 0 && (
          <div style={{ paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>
              <span>Total</span>
              <span>{totalPrix.toFixed(2)} €</span>
            </div>
            <button className="btn-checkout" onClick={() => { setCartOpen(false); setShowCheckoutModal(true); }}>Commander</button>
          </div>
        )}
      </div>

      {showCheckoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 style={{ fontSize: '28px', fontWeight: 700 }}>Confirmation</h2>
            <input className="apple-input" placeholder="Votre nom complet" value={nomClient} onChange={(e) => setNomClient(e.target.value)} />
            <button className="btn-checkout" onClick={envoyerCommande} disabled={isSending || !nomClient.trim()}>
              {isSending ? 'Envoi...' : 'Confirmer'}
            </button>
            <p style={{ marginTop: '20px', cursor: 'pointer', color: '#0071e3' }} onClick={() => setShowCheckoutModal(false)}>Annuler</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
