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
        alert('✅ Commande confirmée !');
        setPanier([]);
        setShowCheckoutModal(false);
        setCartOpen(false);
      }
    } catch (e) { alert('Erreur réseau'); }
    finally { setIsSending(false); }
  };

  return (
    <div className="apple-page">
      <style>{`
        :root { --apple-blue: #0071e3; --apple-bg: #f5f5f7; }
        .apple-page { font-family: -apple-system, BlinkMacSystemFont, sans-serif; color: #1d1d1f; background: #fff; min-height: 100vh; }
        
        .nav-lux { position: sticky; top: 0; background: rgba(255,255,255,0.8); backdrop-filter: blur(20px); z-index: 1000; border-bottom: 1px solid rgba(0,0,0,0.05); }
        .nav-content { max-width: 1000px; margin: 0 auto; height: 50px; display: flex; justify-content: space-between; align-items: center; padding: 0 20px; }
        .logo { font-weight: 600; font-size: 19px; letter-spacing: -0.5px; }
        
        .tabs-container { display: flex; justify-content: center; gap: 30px; padding: 15px; border-bottom: 1px solid #eee; overflow-x: auto; }
        .tab-link { font-size: 13px; font-weight: 500; opacity: 0.5; cursor: pointer; border: none; background: none; transition: 0.2s; }
        .tab-link.active { opacity: 1; border-bottom: 1px solid #000; }

        .hero-title { font-size: 40px; font-weight: 700; text-align: center; margin: 50px 0; letter-spacing: -1px; }
        .grid-lux { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; padding: 0 20px 60px; max-width: 1200px; margin: 0 auto; }
        
        .card-lux { background: var(--apple-bg); border-radius: 22px; padding: 35px; text-align: center; transition: 0.3s; }
        .img-wrap { height: 220px; display: flex; align-items: center; justify-content: center; margin-bottom: 25px; }
        .img-wrap img { max-height: 100%; mix-blend-mode: multiply; }

        .stepper-high-end { display: inline-flex; align-items: center; background: #fff; border-radius: 30px; padding: 5px; box-shadow: 0 4px 10px rgba(0,0,0,0.04); margin-bottom: 20px; }
        .s-btn { width: 34px; height: 34px; border-radius: 50%; border: none; background: #fff; cursor: pointer; font-size: 18px; }
        .s-val { width: 45px; font-weight: 600; font-size: 15px; }

        .btn-apple { background: var(--apple-blue); color: #fff; border: none; padding: 10px 25px; border-radius: 20px; font-weight: 600; cursor: pointer; }

        /* SIDE DRAWER PANIER */
        .drawer-mask { position: fixed; inset: 0; background: rgba(0,0,0,0.2); backdrop-filter: blur(5px); z-index: 2000; display: ${cartOpen ? 'block' : 'none'}; }
        .drawer-side { position: fixed; top: 0; right: 0; bottom: 0; width: 400px; background: #fff; z-index: 2001; transform: translateX(${cartOpen ? '0' : '100%'}); transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1); padding: 40px; box-shadow: -10px 0 40px rgba(0,0,0,0.1); display: flex; flex-direction: column; }
        @media (max-width: 500px) { .drawer-side { width: 100%; } }

        .cart-item-lux { display: flex; gap: 15px; padding: 20px 0; border-bottom: 1px solid #f5f5f7; align-items: center; }
        .item-img { width: 70px; height: 70px; background: var(--apple-bg); border-radius: 12px; object-fit: contain; }

        .modal-lux { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 3000; display: flex; align-items: center; justify-content: center; }
        .modal-box { background: #fff; padding: 40px; border-radius: 28px; width: 90%; max-width: 400px; text-align: center; }
        .apple-input { width: 100%; padding: 15px; border-radius: 12px; border: 1px solid #d2d2d7; margin: 20px 0; box-sizing: border-box; }
      `}</style>

      <nav className="nav-lux">
        <div className="nav-content">
          <div className="logo">Atelier OLDA</div>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '22px' }} onClick={() => setCartOpen(true)}>
            🛍️ {totalArticles > 0 && <span style={{ fontSize: '12px', verticalAlign: 'top', background: '#000', color: '#fff', padding: '2px 6px', borderRadius: '10px' }}>{totalArticles}</span>}
          </button>
        </div>
      </nav>

      <div className="tabs-container">
        {['nouveautes', 'olda', 'exclusif', 'offres'].map(k => (
          <button key={k} className={`tab-link ${activeTab === k ? 'active' : ''}`} onClick={() => setActiveTab(k)}>
            {k === 'olda' ? 'Collection OLDA' : k.charAt(0).toUpperCase() + k.slice(1)}
          </button>
        ))}
      </div>

      <h1 className="hero-title">Achetez vos Mugs.</h1>

      <main className="grid-lux">
        {MUGS_DATA[activeTab].map(p => (
          <div key={p.id} className="card-lux">
            <div className="img-wrap"><img src={p.image} alt="" /></div>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '22px' }}>{p.couleur}</h3>
            <p style={{ color: '#86868b', marginBottom: '25px' }}>{p.prix.toFixed(2)} €</p>
            <div className="stepper-high-end">
              <button className="s-btn" onClick={() => ajuster(p.id, -1)}>−</button>
              <div className="s-val">{getQte(p.id)}</div>
              <button className="s-btn" onClick={() => ajuster(p.id, 1)}>+</button>
            </div>
            <br />
            <button className="btn-apple" onClick={() => ajouterAuPanier(p)}>Ajouter au panier</button>
          </div>
        ))}
      </main>

      <div className="drawer-mask" onClick={() => setCartOpen(false)} />
      <div className="drawer-side">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700 }}>Panier</h2>
          <button style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }} onClick={() => setCartOpen(false)}>✕</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {panier.map(item => (
            <div key={item.id} className="cart-item-lux">
              <img src={item.image} className="item-img" alt="" />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{item.couleur}</div>
                <div style={{ fontSize: '13px', color: '#86868b' }}>{item.quantite} × {item.prix}€</div>
              </div>
              <button style={{ border: 'none', background: 'none', color: 'var(--apple-blue)', cursor: 'pointer' }} onClick={() => supprimerDuPanier(item.id)}>Supprimer</button>
            </div>
          ))}
        </div>
        {panier.length > 0 && (
          <div style={{ paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>
              <span>Total</span>
              <span>{totalPrix.toFixed(2)} €</span>
            </div>
            <button className="btn-apple" style={{ width: '100%', padding: '16px', fontSize: '17px' }} onClick={() => { setCartOpen(false); setShowCheckoutModal(true); }}>
              Passer la commande
            </button>
          </div>
        )}
      </div>

      {showCheckoutModal && (
        <div className="modal-lux">
          <div className="modal-box">
            <h2>Votre Nom</h2>
            <input className="apple-input" value={nomClient} onChange={e => setNomClient(e.target.value)} placeholder="Jean Dupont" />
            <button className="btn-apple" style={{ width: '100%' }} onClick={envoyerCommande} disabled={isSending || !nomClient.trim()}>
              {isSending ? 'Envoi...' : 'Confirmer'}
            </button>
            <p style={{ marginTop: '15px', color: 'var(--apple-blue)', cursor: 'pointer' }} onClick={() => setShowCheckoutModal(false)}>Annuler</p>
          </div>
        </div>
      )}
    </div>
  );
}
