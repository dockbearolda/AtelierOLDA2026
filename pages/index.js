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

// COMPOSANT PRINCIPAL EXPORTÉ PAR DÉFAUT
const BoutiqueIndex = () => {
  const [activeTab, setActiveTab] = useState('olda');
  const [quantites, setQuantites] = useState({});
  const [panier, setPanier] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [nomClient, setNomClient] = useState('');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const getQte = (id) => quantites[id] || 3;
  const ajuster = (id, delta) => {
    const nouvelle = getQte(id) + delta;
    if (nouvelle >= 3) setQuantites({ ...quantites, [id]: nouvelle });
  };
  
  const ajouterAuPanier = (produit) => {
    const qte = getQte(produit.id);
    setPanier(prev => {
      const existant = prev.find(item => item.id === produit.id);
      if (existant) return prev.map(item => item.id === produit.id ? { ...item, quantite: item.quantite + qte } : item);
      return [...prev, { ...produit, quantite: qte }];
    });
    setCartOpen(true);
  };

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
        alert('✅ Commande envoyée !');
        setPanier([]);
        setShowCheckoutModal(false);
      }
    } catch (e) { alert('❌ Erreur'); }
    finally { setIsSending(false); }
  };

  const totalArticles = panier.reduce((acc, item) => acc + item.quantite, 0);
  const totalPrix = panier.reduce((acc, item) => acc + (item.prix * item.quantite), 0);

  return (
    <div style={{ backgroundColor: '#fff', color: '#1d1d1f', fontFamily: '-apple-system, sans-serif', minHeight: '100vh' }}>
      <style>{`
        .apple-nav { position: sticky; top: 0; background: rgba(255,255,255,0.8); backdrop-filter: blur(20px); z-index: 100; border-bottom: 1px solid #eee; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; }
        .tabs { display: flex; gap: 20px; justify-content: center; padding: 20px; overflow-x: auto; }
        .tab-btn { font-size: 13px; cursor: pointer; opacity: 0.6; border: none; background: none; }
        .tab-btn.active { opacity: 1; font-weight: 600; border-bottom: 1px solid #000; }
        .product-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; padding: 20px; max-width: 1100px; margin: 0 auto; }
        .apple-card { background: #f5f5f7; border-radius: 20px; padding: 30px; text-align: center; }
        .stepper-lux { display: inline-flex; background: #fff; border-radius: 25px; padding: 5px; margin-bottom: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
        .step-btn { width: 30px; height: 30px; border: none; background: none; cursor: pointer; font-size: 18px; }
        .add-btn { background: #0071e3; color: #fff; border: none; padding: 10px 25px; border-radius: 20px; cursor: pointer; font-weight: 500; }
        
        /* APPLE DRAWER */
        .drawer { position: fixed; top: 0; right: 0; bottom: 0; width: 380px; background: #fff; z-index: 200; transform: translateX(${cartOpen ? '0' : '100%'}); transition: 0.4s ease; padding: 30px; box-shadow: -5px 0 15px rgba(0,0,0,0.1); }
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.3); z-index: 150; display: ${cartOpen ? 'block' : 'none'}; }
      `}</style>

      <nav className="apple-nav">
        <span style={{ fontWeight: 700, fontSize: '20px' }}>OLDA</span>
        <button onClick={() => setCartOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>
          🛍️ {totalArticles > 0 && <span style={{ fontSize: '14px', background: '#0071e3', color: '#fff', padding: '2px 8px', borderRadius: '10px' }}>{totalArticles}</span>}
        </button>
      </nav>

      <div className="tabs">
        {Object.keys(MUGS_DATA).map(key => (
          <button key={key} className={`tab-btn ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>
            {formatTabName(key)}
          </button>
        ))}
      </div>

      <main className="product-grid">
        {MUGS_DATA[activeTab].map(p => (
          <div key={p.id} className="apple-card">
            <img src={p.image} alt="" style={{ height: '180px', marginBottom: '20px', objectFit: 'contain' }} />
            <h3 style={{ margin: '0 0 10px 0' }}>{p.couleur}</h3>
            <p style={{ color: '#86868b', marginBottom: '20px' }}>{p.prix.toFixed(2)} €</p>
            <div className="stepper-lux">
              <button className="step-btn" onClick={() => ajuster(p.id, -1)}>−</button>
              <span style={{ width: '40px', lineHeight: '30px' }}>{getQte(p.id)}</span>
              <button className="step-btn" onClick={() => ajuster(p.id, 1)}>+</button>
            </div>
            <br />
            <button className="add-btn" onClick={() => ajouterAuPanier(p)}>Ajouter</button>
          </div>
        ))}
      </main>

      <div className="overlay" onClick={() => setCartOpen(false)} />
      <div className="drawer">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <h2>Panier</h2>
          <button onClick={() => setCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '24px' }}>✕</button>
        </div>
        {panier.map(item => (
          <div key={item.id} style={{ display: 'flex', gap: '15px', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
            <img src={item.image} alt="" style={{ width: '50px', height: '50px', background: '#f5f5f7', borderRadius: '8px' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{item.couleur}</div>
              <div style={{ fontSize: '13px', color: '#86868b' }}>{item.quantite} x {item.prix} €</div>
            </div>
          </div>
        ))}
        {panier.length > 0 && (
          <div style={{ marginTop: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>
              <span>Total</span>
              <span>{totalPrix.toFixed(2)} €</span>
            </div>
            <button className="add-btn" style={{ width: '100%', padding: '15px' }} onClick={() => setShowCheckoutModal(true)}>Commander</button>
          </div>
        )}
      </div>

      {showCheckoutModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '40px', borderRadius: '25px', width: '90%', maxWidth: '400px', textAlign: 'center' }}>
            <h2>Confirmation</h2>
            <input className="apple-input" style={{ width: '100%', padding: '15px', margin: '20px 0', borderRadius: '12px', border: '1px solid #d2d2d7' }} placeholder="Nom complet" value={nomClient} onChange={(e) => setNomClient(e.target.value)} />
            <button className="add-btn" style={{ width: '100%' }} onClick={envoyerCommande} disabled={isSending || !nomClient.trim()}>
              {isSending ? 'Envoi...' : 'Confirmer'}
            </button>
            <p onClick={() => setShowCheckoutModal(false)} style={{ color: '#0071e3', cursor: 'pointer', marginTop: '15px' }}>Annuler</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoutiqueIndex;
