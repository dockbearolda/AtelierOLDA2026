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

export default function Index() {
  const [activeTab, setActiveTab] = useState('olda');
  const [quantites, setQuantites] = useState({});
  const [panier, setPanier] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [nomClient, setNomClient] = useState('');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // --- LOGIQUE ---
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
    setCartOpen(true);
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
        alert('✅ Commande confirmée avec succès !');
        setPanier([]);
        setNomClient('');
        setShowCheckoutModal(false);
        setCartOpen(false);
      } else {
        alert('❌ Erreur lors de l’envoi de la commande.');
      }
    } catch (e) {
      alert('❌ Erreur de connexion.');
    } finally {
      setIsSending(false);
    }
  };

  const totalArticles = panier.reduce((acc, item) => acc + item.quantite, 0);
  const totalPrix = panier.reduce((acc, item) => acc + (item.prix * item.quantite), 0);

  return (
    <div className="apple-store">
      <style>{`
        :root {
          --apple-bg: #ffffff;
          --apple-grey: #f5f5f7;
          --apple-text: #1d1d1f;
          --apple-blue: #0071e3;
        }

        .apple-store {
          background: var(--apple-bg);
          color: var(--apple-text);
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
        }

        /* HEADER */
        .header {
          position: sticky; top: 0; z-index: 1000;
          background: rgba(255, 255, 255, 0.8); backdrop-filter: saturate(180%) blur(20px);
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .header-wrap {
          max-width: 1024px; margin: 0 auto; height: 48px;
          display: flex; justify-content: space-between; align-items: center; padding: 0 20px;
        }
        .brand { font-weight: 600; font-size: 20px; letter-spacing: -0.5px; cursor: pointer; }
        .cart-btn { background: none; border: none; cursor: pointer; font-size: 18px; position: relative; }
        .dot { position: absolute; top: -2px; right: -5px; background: var(--apple-blue); color: white; border-radius: 50%; width: 16px; height: 16px; font-size: 10px; display: flex; align-items: center; justify-content: center; font-weight: 700; }

        /* NAV COLLECTIONS */
        .collections-nav {
          display: flex; gap: 30px; justify-content: center; padding: 12px 0;
          background: var(--apple-bg); overflow-x: auto; scrollbar-width: none;
        }
        .col-item { font-size: 12px; opacity: 0.6; cursor: pointer; transition: 0.2s; white-space: nowrap; }
        .col-item.active { opacity: 1; font-weight: 600; border-bottom: 1px solid #000; }

        /* GRID */
        .container { max-width: 1000px; margin: 0 auto; padding: 40px 20px; }
        .title { font-size: 40px; font-weight: 700; text-align: center; margin-bottom: 40px; letter-spacing: -1px; }
        
        .grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;
        }
        .card {
          background: var(--apple-grey); border-radius: 18px; padding: 30px;
          display: flex; flex-direction: column; align-items: center; transition: transform 0.3s ease;
        }
        .card:hover { transform: scale(1.02); }
        .img-box { height: 200px; margin-bottom: 20px; display: flex; align-items: center; }
        .img-box img { max-height: 100%; object-fit: contain; }
        
        /* STEPPER HAUT DE GAMME */
        .stepper {
          display: flex; align-items: center; background: white; border-radius: 30px;
          padding: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 15px;
        }
        .s-btn { width: 32px; height: 32px; border: none; background: none; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; }
        .s-val { width: 40px; text-align: center; font-weight: 600; font-size: 14px; }

        .add-btn {
          background: var(--apple-blue); color: white; border: none; border-radius: 20px;
          padding: 8px 20px; font-weight: 500; cursor: pointer; transition: 0.2s;
        }
        .add-btn:hover { background: #0077ed; }

        /* APPLE DRAWER PANIER */
        .drawer {
          position: fixed; top: 0; right: 0; bottom: 0; width: 400px;
          background: rgba(255,255,255,0.95); backdrop-filter: blur(25px);
          z-index: 2000; padding: 40px; box-shadow: -10px 0 50px rgba(0,0,0,0.05);
          transform: translateX(${cartOpen ? '0' : '100%'});
          transition: transform 0.5s cubic-bezier(0.2, 1, 0.2, 1);
        }
        @media (max-width: 500px) { .drawer { width: 100%; } }

        .drawer-row { display: flex; gap: 15px; margin-bottom: 20px; align-items: center; }
        .row-img { width: 64px; height: 64px; background: var(--apple-grey); border-radius: 10px; object-fit: contain; }
        
        .checkout-btn {
          width: 100%; background: var(--apple-blue); color: white; border: none;
          padding: 16px; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer;
        }
        
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.2); z-index: 1500; display: ${cartOpen ? 'block' : 'none'}; }

        /* MODAL */
        .modal-bg { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 3000; display: flex; align-items: center; justify-content: center; }
        .modal { background: white; padding: 40px; border-radius: 22px; width: 90%; max-width: 400px; text-align: center; }
        .apple-input { width: 100%; padding: 14px; border: 1px solid #d2d2d7; border-radius: 10px; margin: 20px 0; font-size: 16px; outline-color: var(--apple-blue); }
      `}</style>

      <header className="header">
        <div className="header-wrap">
          <div className="brand">OLDA</div>
          <button className="cart-btn" onClick={() => setCartOpen(true)}>
            🛍️ {totalArticles > 0 && <span className="dot">{totalArticles}</span>}
          </button>
        </div>
      </header>

      <nav className="collections-nav">
        {Object.keys(MUGS_DATA).map(key => (
          <div key={key} className={`col-item ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>
            {formatTabName(key)}
          </div>
        ))}
      </nav>

      <main className="container">
        <h1 className="title">{formatTabName(activeTab)}</h1>
        <div className="grid">
          {MUGS_DATA[activeTab].map((p) => (
            <div key={p.id} className="card">
              <div className="img-box"><img src={p.image} alt={p.couleur} /></div>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '22px' }}>{p.couleur}</h3>
              <p style={{ margin: '0 0 20px 0', color: '#86868b' }}>{p.prix.toFixed(2)} €</p>
              
              <div className="stepper">
                <button className="s-btn" onClick={() => ajuster(p.id, -1)}>−</button>
                <div className="s-val">{getQte(p.id)}</div>
                <button className="s-btn" onClick={() => ajuster(p.id, 1)}>+</button>
              </div>
              
              <button className="add-btn" onClick={() => ajouterAuPanier(p)}>Ajouter au panier</button>
            </div>
          ))}
        </div>
      </main>

      <div className="overlay" onClick={() => setCartOpen(false)} />
      <div className="drawer">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700 }}>Panier</h2>
          <span style={{ fontSize: '24px', cursor: 'pointer' }} onClick={() => setCartOpen(false)}>✕</span>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px' }}>
          {panier.length === 0 ? <p style={{ color: '#86868b' }}>Votre panier est vide.</p> : panier.map(item => (
            <div key={item.id} className="drawer-row">
              <img src={item.image} className="row-img" alt="" />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '15px' }}>{item.couleur}</div>
                <div style={{ fontSize: '13px', color: '#86868b' }}>{item.quantite} × {item.prix}€</div>
              </div>
              <button style={{ border: 'none', background: 'none', color: '#0071e3', fontSize: '13px', cursor: 'pointer' }} onClick={() => supprimerDuPanier(item.id)}>Supprimer</button>
            </div>
          ))}
        </div>

        {panier.length > 0 && (
          <div style={{ borderTop: '1px solid #f5f5f7', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '18px', fontWeight: 600 }}>
              <span>Total</span>
              <span>{totalPrix.toFixed(2)} €</span>
            </div>
            <button className="checkout-btn" onClick={() => { setCartOpen(false); setShowCheckoutModal(true); }}>Commander</button>
          </div>
        )}
      </div>

      {showCheckoutModal && (
        <div className="modal-bg">
          <div className="modal">
            <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Confirmation</h2>
            <p style={{ fontSize: '14px', color: '#86868b', marginTop: '10px' }}>Saisissez votre nom pour finaliser votre commande de {totalPrix.toFixed(2)} €.</p>
            <input className="apple-input" placeholder="Nom complet" value={nomClient} onChange={(e) => setNomClient(e.target.value)} />
            <button className="checkout-btn" onClick={envoyerCommande} disabled={isSending || !nomClient.trim()}>
              {isSending ? 'Envoi...' : 'Confirmer la commande'}
            </button>
            <div style={{ marginTop: '20px', color: '#0071e3', cursor: 'pointer', fontSize: '14px' }} onClick={() => setShowCheckoutModal(false)}>Annuler</div>
          </div>
        </div>
      )}
    </div>
  );
}
