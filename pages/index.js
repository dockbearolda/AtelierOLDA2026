import React, { useState } from 'react';

const MUGS_DATA = {
  nouveautes: [{ id: 101, reference: 'NW 01', image: '/images/mugs/nouveaute1.jpg', couleur: 'Édition Aurore' }],
  olda: [
    { id: 1, reference: 'TC 01', image: '/images/mugs/roseblanc.jpg', couleur: 'Rose & Blanc' },
    { id: 2, reference: 'TC 02', image: '/images/mugs/rougeblanc.jpg', couleur: 'Rouge & Blanc' },
    { id: 3, reference: 'TC 03', image: '/images/mugs/orangeblanc.jpg', couleur: 'Orange & Blanc' },
    { id: 4, reference: 'TC 04', image: '/images/mugs/vertblanc.jpg', couleur: 'Vert & Blanc' },
    { id: 5, reference: 'TC 05', image: '/images/mugs/noirblanc.jpg', couleur: 'Noir & Blanc' },
  ],
  exclusif: [{ id: 11, reference: 'TF 01', image: '/images/mugs/Fuckblancnoir.JPG', couleur: 'Tasse Signature' }],
  offres: [{ id: 201, reference: 'DS 01', image: '/images/mugs/logo.jpeg', couleur: 'Édition Limitée' }],
  // Ajoutez vos futures collections ici, le menu défilera tout seul
};

export default function BoutiqueOlda() {
  const [activeTab, setActiveTab] = useState('olda');
  const [quantites, setQuantites] = useState({});
  const [panier, setPanier] = useState([]);

  const getQte = (id) => quantites[id] || 3;

  const ajuster = (id, delta) => {
    const actuelle = getQte(id);
    const nouvelle = actuelle + delta;
    if (nouvelle >= 3) {
      setQuantites({ ...quantites, [id]: nouvelle });
    }
  };

  const ajouterAuPanier = (produit) => {
    const qte = getQte(produit.id);
    const nouvelArticle = { ...produit, quantite: qte };
    
    setPanier(prev => {
      const existant = prev.find(item => item.id === produit.id);
      if (existant) {
        return prev.map(item => item.id === produit.id ? { ...item, quantite: item.quantite + qte } : item);
      }
      return [...prev, nouvelArticle];
    });
    
    alert(`${qte} x ${produit.couleur} ajouté à votre collection.`);
  };

  const totalArticles = panier.reduce((acc, item) => acc + item.quantite, 0);

  const formatTabName = (key) => {
    const names = {
      nouveautes: "Nouveautés",
      olda: "Collection OLDA",
      exclusif: "Collection Signature",
      offres: "Offres Spéciales"
    };
    return names[key] || key;
  };

  return (
    <div style={{ background: '#f5f5f7', minHeight: '100vh', color: '#1d1d1f', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', paddingBottom: '100px' }}>
      <style>{`
        /* BARRE FIXE ET TOURNIQUET */
        .nav-header { 
          position: sticky; top: 0; z-index: 1000; 
          background: rgba(255,255,255,0.85); backdrop-filter: saturate(180%) blur(20px); 
          border-bottom: 1px solid rgba(0,0,0,0.08); padding: 12px 0;
        }
        .roulette { 
          display: flex; overflow-x: auto; gap: 8px; padding: 0 20px; 
          scrollbar-width: none; -webkit-overflow-scrolling: touch;
        }
        .roulette::-webkit-scrollbar { display: none; }
        
        .collection-btn { 
          flex: 0 0 auto; padding: 10px 22px; border-radius: 25px; border: none; 
          font-weight: 500; font-size: 14px; background: rgba(0,0,0,0.04); color: #1d1d1f; 
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; white-space: nowrap;
        }
        .collection-btn.active { background: #000; color: #fff; transform: scale(1.02); }
        
        .container { max-width: 600px; margin: 0 auto; padding: 30px 20px; }
        
        .card { 
          background: #fff; border-radius: 28px; padding: 20px; margin-bottom: 30px; 
          box-shadow: 0 8px 24px rgba(0,0,0,0.04);
        }
        .img-box { background: #fbfbfd; border-radius: 20px; padding: 30px; text-align: center; margin-bottom: 20px; }
        
        /* STEPPER */
        .stepper-lux { 
          display: flex; align-items: center; justify-content: space-between;
          background: #f5f5f7; border-radius: 14px; width: 120px; height: 48px; 
          padding: 0 6px;
        }
        .btn-step { 
          border: none; background: transparent; width: 34px; height: 34px; 
          font-size: 18px; color: #0071e3; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
        }
        .btn-step:disabled { color: #d2d2d7; }
        .val-step { font-weight: 600; font-size: 16px; width: 25px; text-align: center; }
        
        .btn-ajouter { 
          flex: 1; margin-left: 12px; height: 48px; border: none; border-radius: 14px; 
          background: #0071e3; color: #fff; font-weight: 600; font-size: 15px; 
          cursor: pointer; transition: transform 0.2s;
        }
        .btn-ajouter:active { transform: scale(0.98); }

        /* PANIER FLOTTANT */
        .cart-bar {
          position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
          width: 90%; max-width: 400px; background: #000; color: #fff;
          padding: 16px 24px; border-radius: 20px; display: flex;
          justify-content: space-between; align-items: center;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2); z-index: 1001;
        }
        .btn-checkout { background: #0071e3; border: none; color: #fff; padding: 8px 16px; border-radius: 10px; font-weight: 600; cursor: pointer;}
      `}</style>

      <nav className="nav-header">
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

      <main className="container">
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '24px' }}>
          {formatTabName(activeTab)}
        </h1>

        {MUGS_DATA[activeTab].map(p => (
          <div key={p.id} className="card">
            <div className="img-box">
              <img src={p.image} style={{ height: '200px', width: '100%', objectFit: 'contain' }} alt={p.couleur} />
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '4px' }}>{p.couleur}</h2>
            <p style={{ color: '#86868b', fontSize: '14px', marginBottom: '20px' }}>Référence {p.reference}</p>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="stepper-lux">
                <button className="btn-step" onClick={() => ajuster(p.id, -1)} disabled={getQte(p.id) <= 3}>−</button>
                <div className="val-step">{getQte(p.id)}</div>
                <button className="btn-step" onClick={() => ajuster(p.id, 1)}>+</button>
              </div>
              <button className="btn-ajouter" onClick={() => ajouterAuPanier(p)}>
                Ajouter
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* PANIER VISIBLE SI ARTICLES PRÉSENTS */}
      {panier.length > 0 && (
        <div className="cart-bar">
          <div>
            <span style={{ opacity: 0.7, fontSize: '13px' }}>Votre sélection</span>
            <div style={{ fontWeight: '600' }}>{totalArticles} articles</div>
          </div>
          <button className="btn-checkout" onClick={() => alert("Direction le paiement...")}>
            Finaliser
          </button>
        </div>
      )}
    </div>
  );
}
