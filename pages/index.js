import React, { useState } from 'react';

const MUGS_DATA = {
  nouveautes: [{ id: 101, reference: 'NW 01', image: '/images/mugs/nouveaute1.jpg', couleur: 'Édition Aurore' }],
  olda: [
    { id: 1, reference: 'TC 01', image: '/images/mugs/roseblanc.jpg', couleur: 'Rose & Blanc' },
    { id: 2, reference: 'TC 02', image: '/images/mugs/rougeblanc.jpg', couleur: 'Rouge & Blanc' },
    { id: 3, reference: 'TC 03', image: '/images/mugs/orangeblanc.jpg', couleur: 'Orange & Blanc' },
    { id: 4, reference: 'TC 04', image: '/images/mugs/vertblanc.jpg', couleur: 'Vert & Blanc' },
    { id: 5, reference: 'TC 05', image: '/images/mugs/noirblanc.jpg', couleur: 'Noir & Blanc' },
    { id: 6, reference: 'TC 06', image: '/images/mugs/noirrose.JPG', couleur: 'Noir & Rose' },
    { id: 7, reference: 'TC 07', image: '/images/mugs/noirrouge.JPG', couleur: 'Noir & Rouge' },
    { id: 8, reference: 'TC 08', image: '/images/mugs/noirorange.JPG', couleur: 'Noir & Orange' },
    { id: 9, reference: 'TC 09', image: '/images/mugs/noirjaune.JPG', couleur: 'Noir & Jaune' },
    { id: 10, reference: 'TC 10', image: '/images/mugs/noirvert.JPG', couleur: 'Noir & Vert' }
  ],
  exclusif: [{ id: 11, reference: 'TF 01', image: '/images/mugs/Fuckblancnoir.JPG', couleur: 'Tasse Signature' }],
  offres: [{ id: 201, reference: 'DS 01', image: '/images/mugs/logo.jpeg', couleur: 'Édition Limitée' }]
};

export default function BoutiqueOlda() {
  const [activeTab, setActiveTab] = useState('olda');
  const [quantites, setQuantites] = useState({});

  const getQte = (id) => quantites[id] || 3;

  const ajuster = (id, delta) => {
    const actuelle = getQte(id);
    const nouvelle = actuelle + delta;
    if (nouvelle >= 3) {
      setQuantites({ ...quantites, [id]: nouvelle });
    }
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

  return (
    <div style={{ background: '#f5f5f7', minHeight: '100vh', color: '#1d1d1f', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <style>{`
        .nav-header { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.8); backdrop-filter: saturate(180%) blur(20px); border-bottom: 1px solid rgba(0,0,0,0.1); padding: 16px 0; }
        .roulette { display: flex; overflow-x: auto; gap: 12px; padding: 0 20px; scrollbar-width: none; }
        .roulette::-webkit-scrollbar { display: none; }
        
        .collection-btn { 
          flex: 0 0 auto; padding: 8px 20px; border-radius: 20px; border: none; 
          font-weight: 500; font-size: 14px; background: rgba(0,0,0,0.05); color: #1d1d1f; 
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; 
        }
        .collection-btn.active { background: #000; color: #fff; transform: scale(1.05); }
        
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        
        .card { 
          background: #fff; border-radius: 30px; padding: 24px; margin-bottom: 40px; 
          box-shadow: 0 10px 30px rgba(0,0,0,0.03); transition: transform 0.3s ease;
        }
        .img-box { background: #fbfbfd; border-radius: 22px; padding: 40px; text-align: center; margin-bottom: 24px; }
        
        /* STEPPER HIGH-END */
        .stepper-lux { 
          display: flex; align-items: center; justify-content: space-between;
          background: #f5f5f7; border-radius: 16px; width: 130px; height: 52px; 
          padding: 0 8px; border: 1px solid rgba(0,0,0,0.02);
        }
        .btn-step { 
          border: none; background: transparent; width: 36px; height: 36px; 
          font-size: 20px; font-weight: 300; cursor: pointer; color: #0071e3; 
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s; border-radius: 10px;
        }
        .btn-step:active { background: rgba(0,0,0,0.05); }
        .btn-step:disabled { color: #d2d2d7; cursor: default; }
        .val-step { font-weight: 600; font-size: 17px; width: 30px; text-align: center; }
        
        .btn-ajouter { 
          flex: 1; margin-left: 16px; height: 52px; border: none; border-radius: 16px; 
          background: #0071e3; color: #fff; font-weight: 600; font-size: 16px; 
          cursor: pointer; transition: opacity 0.2s;
        }
        .btn-ajouter:hover { opacity: 0.9; }
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
        <h1 style={{ fontSize: '34px', fontWeight: '700', letterSpacing: '-0.5px', marginBottom: '30px' }}>
          {formatTabName(activeTab)}
        </h1>

        {MUGS_DATA[activeTab].map(p => (
          <div key={p.id} className="card">
            <div className="img-box">
              <img src={p.image} style={{ height: '240px', width: '100%', objectFit: 'contain' }} alt={p.couleur} />
            </div>
            <div style={{ padding: '0 8px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '4px' }}>{p.couleur}</h2>
              <p style={{ color: '#86868b', fontSize: '15px', marginBottom: '24px' }}>Référence {p.reference}</p>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="stepper-lux">
                  <button 
                    className="btn-step" 
                    onClick={() => ajuster(p.id, -1)} 
                    disabled={getQte(p.id) <= 3}
                  >
                    <span style={{ marginTop: '-2px' }}>−</span>
                  </button>
                  <div className="val-step">{getQte(p.id)}</div>
                  <button 
                    className="btn-step" 
                    onClick={() => ajuster(p.id, 1)}
                  >
                    <span>+</span>
                  </button>
                </div>
                
                <button className="btn-ajouter">
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
