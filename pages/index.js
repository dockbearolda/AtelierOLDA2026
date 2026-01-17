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

export default function Index() {
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

  return (
    <div className="olda-premium">
      <style>{`
        :root {
          --sf-text: #1d1d1f;
          --sf-gray: #86868b;
          --sf-blue: #0066cc;
          --sf-bg: #fbfbfd;
        }

        .olda-premium {
          background-color: #fff;
          color: var(--sf-text);
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          padding-bottom: 100px;
        }

        /* HEADER & NAV */
        .nav-bar {
          position: sticky; top: 0; background: rgba(255,255,255,0.8);
          backdrop-filter: saturate(180%) blur(20px); z-index: 1000;
          height: 44px; display: flex; align-items: center; justify-content: space-between;
          padding: 0 22px; border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        .logo-text { font-weight: 600; font-size: 17px; letter-spacing: -0.022em; }
        
        .sub-nav {
          display: flex; justify-content: center; gap: 30px; padding: 12px 0;
          background: #fff; position: sticky; top: 44px; z-index: 999;
          overflow-x: auto; scrollbar-width: none;
        }
        .nav-item {
          font-size: 12px; color: var(--sf-text); opacity: 0.6;
          cursor: pointer; transition: opacity 0.3s; border: none; background: none;
        }
        .nav-item.active { opacity: 1; font-weight: 500; }

        /* CONTENT */
        .main-title {
          font-size: 48px; font-weight: 700; text-align: center;
          margin: 60px 0 40px; letter-spacing: -0.015em;
        }

        .product-card {
          max-width: 400px; margin: 0 auto 40px; background: var(--sf-bg);
          border-radius: 30px; padding: 40px 20px; text-align: center;
        }
        
        .img-container { height: 280px; margin-bottom: 30px; display: flex; align-items: center; justify-content: center; }
        .img-container img { max-height: 100%; object-fit: contain; }

        .price-text { font-size: 17px; color: var(--sf-gray); margin: 10px 0 30px; }
        
        /* STEPPER HAUT DE GAMME */
        .premium-stepper {
          display: inline-flex; align-items: center; background: #fff;
          border-radius: 100px; padding: 4px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          margin-bottom: 25px;
        }
        .s-btn {
          width: 36px; height: 36px; border-radius: 50%; border: none;
          background: #fff; font-size: 20px; font-weight: 300; cursor: pointer;
        }
        .s-val { width: 44px; font-weight: 600; font-size: 16px; }

        .btn-buy {
          background: var(--sf-blue); color: #fff; border: none;
          padding: 12px 28px; border-radius: 100px; font-weight: 600;
          font-size: 14px; cursor: pointer; transition: transform 0.2s;
        }
        .btn-buy:active { transform: scale(0.96); }

        /* PANIER LATÉRAL */
        .drawer-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.4);
          backdrop-filter: blur(8px); z-index: 2000;
          display: ${cartOpen ? 'block' : 'none'};
        }
        .drawer {
          position: fixed; top: 0; right: 0; bottom: 0; width: 400px;
          background: rgba(255,255,255,0.92); backdrop-filter: blur(30px);
          z-index: 2001; padding: 40px; box-shadow: -10px 0 50px rgba(0,0,0,0.1);
          transform: translateX(${cartOpen ? '0' : '100%'});
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (max-width: 500px) { .drawer { width: 100%; padding: 25px; } }
      `}</style>

      <nav className="nav-bar">
        <span className="logo-text">Atelier OLDA</span>
        <button onClick={() => setCartOpen(true)} style={{background:'none', border:'none', fontSize:'20px', cursor:'pointer'}}>
          🛍️ {totalArticles > 0 && <span style={{fontSize:'12px', background:'#000', color:'#fff', padding:'2px 7px', borderRadius:'10px', verticalAlign:'top'}}>{totalArticles}</span>}
        </button>
      </nav>

      <div className="sub-nav">
        {['nouveautes', 'olda', 'exclusif', 'offres'].map(k => (
          <button key={k} className={`nav-item ${activeTab === k ? 'active' : ''}`} onClick={() => setActiveTab(k)}>
            {k === 'olda' ? 'Collection OLDA' : k.charAt(0).toUpperCase() + k.slice(1)}
          </button>
        ))}
      </div>

      <main>
        <h1 className="main-title">Achetez vos Mugs.</h1>
        
        {MUGS_DATA[activeTab].map(p => (
          <div key={p.id} className="product-card">
            <div className="img-container">
              <img src={p.image} alt={p.couleur} />
            </div>
            <h2 style={{fontSize:'24px', fontWeight:600}}>{p.couleur}</h2>
            <p className="price-text">À partir de {p.prix.toFixed(2)} €</p>
            
            <div className="premium-stepper">
              <button className="s-btn" onClick={() => ajuster(p.id, -1)}>−</button>
              <div className="s-val">{getQte(p.id)}</div>
              <button className="s-btn" onClick={() => ajuster(p.id, 1)}>+</button>
            </div>
            <br />
            <button className="btn-buy" onClick={() => ajouterAuPanier(p)}>Ajouter au panier</button>
          </div>
        ))}
      </main>

      {/* PANIER LATÉRAL (DRAWER) */}
      <div className="drawer-overlay" onClick={() => setCartOpen(false)} />
      <div className="drawer">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'40px'}}>
          <h2 style={{fontSize:'32px', fontWeight:700}}>Panier</h2>
          <button onClick={() => setCartOpen(false)} style={{border:'none', background:'none', fontSize:'28px', cursor:'pointer'}}>✕</button>
        </div>
        <div style={{flex:1, overflowY:'auto'}}>
          {panier.map(item => (
            <div key={item.id} style={{display:'flex', gap:'20px', padding:'20px 0', borderBottom:'1px solid #eee'}}>
              <img src={item.image} style={{width:'80px', height:'80px', borderRadius:'12px', background:'#f5f5f7'}} alt="" />
              <div style={{flex:1}}>
                <div style={{fontWeight:600}}>{item.couleur}</div>
                <div style={{fontSize:'14px', color:'#86868b'}}>{item.quantite} × {item.prix}€</div>
                <button style={{border:'none', background:'none', color:'#0066cc', padding:0, marginTop:'8px', cursor:'pointer'}} onClick={() => supprimerDuPanier(item.id)}>Supprimer</button>
              </div>
              <div style={{fontWeight:600}}>{(item.prix * item.quantite).toFixed(2)}€</div>
            </div>
          ))}
        </div>
        {panier.length > 0 && (
          <div style={{marginTop:'30px', borderTop:'1px solid #eee', paddingTop:'20px'}}>
            <div style={{display:'flex', justifyContent:'space-between', fontSize:'20px', fontWeight:600, marginBottom:'20px'}}>
              <span>Total</span>
              <span>{totalPrix.toFixed(2)} €</span>
            </div>
            <button className="btn-buy" style={{width:'100%', padding:'18px', fontSize:'16px'}} onClick={() => {setCartOpen(false); setShowCheckoutModal(true);}}>
              Commander
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
