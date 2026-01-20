import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

// Données organisées par Collections
const MUGS_DATA = {
  "nouveautes": [
    { id: 101, reference: "SM 01", image: "/images/mugs/nouveaute1.jpg", nom: "Support Mobile Acrylique", couleur: "" }
  ],
  "tasse-ceramique-fuck": [
    { id: 11, reference: "TCF 01", image: "/images/mugs/Fuckblancnoir.JPG", nom: "Tasse Ceramique Fuck", couleur: "Blanc & Noir" },
    { id: 12, reference: "TCF 02", image: "/images/mugs/Fuckblancnoir.JPG", nom: "Tasse Ceramique Fuck", couleur: "Blanc & Noir" }
  ],
  "tasse-ceramique": [
    { id: 1, reference: "TC 01", image: "/images/mugs/roseblanc.jpg", nom: "Tasse Ceramique OLDA", couleur: "Rose & Blanc" },
    { id: 2, reference: "TC 02", image: "/images/mugs/rougeblanc.jpg", nom: "Tasse Ceramique OLDA", couleur: "Rouge & Blanc" }
  ],
  "tasse-metal": [],
  "tshirt": [
    { id: 41, reference: "H-001", image: "/images/mugs/tshirtns300bleu.jpg", nom: "T-shirt unisexe ", couleur: "Bleu Saphir" }
  ],
  "offres": [
    { id: 201, reference: "DB-001", image: "/images/mugs/decapsuleur.jpg", nom: "Decapsuleur Bois", couleur: "" }
  ],
  "accessoires": []
};

const COLLECTIONS = [
  { key: "nouveautes", label: "Nouveautés" },
  { 
    key: "tasses", 
    label: "Tasses", 
    subcategories: [
      { key: "tasse-ceramique-fuck", label: "Tasse Fuck" },
      { key: "tasse-ceramique", label: "Tasse OLDA" },
      { key: "tasse-metal", label: "Tasse Métal" }
    ]
  },
  { key: "tshirt", label: "T-Shirt" },
  { 
    key: "goodies", 
    label: "Goodies",
    subcategories: [
      { key: "nouveautes", label: "Support Mobile" },
      { key: "offres", label: "Décapsuleur" }
    ]
  },
  { key: "offres", label: "Offres Spécial" },
  { key: "accessoires", label: "Accessoires" }
];

export default function OLDAStore() {
  const [activeCollection, setActiveCollection] = useState("tasses");
  const [activeSubTab, setActiveSubTab] = useState("tasse-ceramique");
  const [quantites, setQuantites] = useState({});
  const [commentaires, setCommentaires] = useState({});
  const [panier, setPanier] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [clientInfo, setClientInfo] = useState({ nom: "", email: "" });
  const [orderSent, setOrderSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState({});

  useEffect(() => {
    emailjs.init("Y9NKwhNvCNtb_SRry");
    document.body.style.overflowX = "hidden";
  }, []);

  const getQte = (id) => quantites[id] || 3;
  
  const ajuster = (id, delta) => {
    const v = getQte(id) + delta;
    if (v >= 3 && v <= 99) setQuantites({ ...quantites, [id]: v });
  };

  const ajouterAuPanier = (p) => {
    const qte = getQte(p.id);
    const commentaire = commentaires[p.id] || "";
    
    setPanier((prev) => {
      const existant = prev.find((i) => i.id === p.id);
      if (existant) {
        return prev.map((i) => i.id === p.id ? { ...i, quantite: i.quantite + qte, commentaire } : i);
      }
      return [...prev, { ...p, quantite: qte, commentaire }];
    });

    setRecentlyAdded({ ...recentlyAdded, [p.id]: true });
    setTimeout(() => {
      const next = { ...recentlyAdded };
      delete next[p.id];
      setRecentlyAdded(next);
    }, 2000);
  };

  const envoyerCommande = async () => {
    if (!clientInfo.nom || !clientInfo.email || panier.length === 0) return;
    setSending(true);

    const orderNumber = `OLDA-${Date.now().toString().slice(-6)}`;
    
    // Construction du contenu de l'email optimisé
    const productsRows = panier.map(item => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 15px 0;">
          <div style="font-weight: 600; color: #1d1d1f; font-size: 15px;">${item.nom}</div>
          <div style="color: #86868b; font-size: 13px;">${item.reference} ${item.couleur ? `| ${item.couleur}` : ''}</div>
          ${item.commentaire ? `<div style="font-style: italic; font-size: 12px; margin-top:5px;">Note: ${item.commentaire}</div>` : ''}
        </td>
        <td style="padding: 15px 0; text-align: right; font-weight: 700; color: #1d1d1f; font-size: 16px;">
          x${item.quantite}
        </td>
      </tr>
    `).join('');

    const templateParams = {
      client_nom: clientInfo.nom,
      client_email: clientInfo.email,
      order_number: orderNumber,
      commande_html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px;">
          <h2 style="font-size: 24px; letter-spacing: -0.5px;">Merci pour votre commande.</h2>
          <p style="color: #6e6e73;">Numéro de suivi : <strong>${orderNumber}</strong></p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 30px;">
            ${productsRows}
          </table>
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #d2d2d7; font-size: 12px; color: #86868b; text-align: center;">
            Atelier OLDA • Collection 2026
          </div>
        </div>
      `,
      to_email: "contact@atelierolda.com"
    };

    try {
      await emailjs.send("service_vbspize", "template_kvrjlfu", templateParams);
      setOrderSent(true);
    } catch (err) {
      alert("Erreur d'envoi");
    } finally {
      setSending(false);
    }
  };

  const activeCollectionData = COLLECTIONS.find(c => c.key === activeCollection);

  return (
    <div className="app-container">
      <style>{`
        :root {
          --apple-bg: #f5f5f7;
          --apple-line: #d2d2d7;
          --apple-text: #1d1d1f;
          --apple-blur: blur(20px);
        }

        body { margin: 0; background: var(--apple-bg); font-family: -apple-system, sans-serif; -webkit-font-smoothing: antialiased; }
        
        /* Navigation Snap Slider */
        .nav-wrapper {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255,255,255,0.72);
          backdrop-filter: var(--apple-blur);
          -webkit-backdrop-filter: var(--apple-blur);
          border-bottom: 1px solid var(--apple-line);
        }

        .snap-slider {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          padding: 15px 20px;
          gap: 25px;
        }

        .snap-slider::-webkit-scrollbar { display: none; }

        .nav-item {
          flex-shrink: 0;
          scroll-snap-align: start;
          font-size: 15px;
          font-weight: 500;
          color: #86868b;
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
          transition: color 0.3s;
        }

        .nav-item.active { color: var(--apple-text); }

        .sub-nav {
          border-top: 1px solid var(--apple-line);
          padding: 10px 20px;
          background: rgba(255,255,255,0.5);
        }

        .sub-nav .nav-item { font-size: 13px; }

        /* Grille Invisible */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          background-color: var(--apple-line);
          gap: 1px; /* Création des lignes de 1px */
          border-bottom: 1px solid var(--apple-line);
        }

        .product-card {
          background: var(--apple-bg);
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .img-container {
          width: 100%;
          aspect-ratio: 1;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .img-container img { max-width: 90%; max-height: 90%; object-fit: contain; }

        .product-info h3 { font-size: 14px; font-weight: 600; margin: 0 0 4px 0; }
        .product-info p { font-size: 12px; color: #86868b; margin: 0 0 15px 0; }

        /* Stepper High-End */
        .stepper {
          display: flex;
          align-items: center;
          border: 1px solid #d2d2d7;
          border-radius: 20px;
          padding: 4px 12px;
          margin-bottom: 15px;
          background: white;
        }

        .stepper button {
          border: none;
          background: none;
          font-size: 18px;
          padding: 0 10px;
          cursor: pointer;
          color: #0071e3;
        }

        .stepper span {
          font-size: 14px;
          font-weight: 600;
          min-width: 30px;
        }

        .add-btn {
          background: var(--apple-text);
          color: white;
          border: none;
          border-radius: 20px;
          padding: 8px 20px;
          font-size: 13px;
          font-weight: 500;
          width: 100%;
          transition: opacity 0.2s;
        }

        .add-btn.success { background: #34c759; }

        .cart-footer {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #0071e3;
          color: white;
          padding: 15px 25px;
          border-radius: 30px;
          box-shadow: 0 10px 30px rgba(0,113,227,0.3);
          border: none;
          font-weight: 600;
          z-index: 1000;
        }
      `}</style>

      {/* Navigation à deux étages */}
      <header className="nav-wrapper">
        <div className="snap-slider">
          {COLLECTIONS.map(c => (
            <button 
              key={c.key} 
              className={`nav-item ${activeCollection === c.key ? 'active' : ''}`}
              onClick={() => {
                setActiveCollection(c.key);
                if (c.subcategories) setActiveSubTab(c.subcategories[0].key);
                else setActiveSubTab(c.key);
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {activeCollectionData?.subcategories && (
          <div className="snap-slider sub-nav">
            {activeCollectionData.subcategories.map(s => (
              <button 
                key={s.key} 
                className={`nav-item ${activeSubTab === s.key ? 'active' : ''}`}
                onClick={() => setActiveSubTab(s.key)}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Grille de produits */}
      <main className="product-grid">
        {(MUGS_DATA[activeSubTab] || []).map(product => (
          <div key={product.id} className="product-card">
            <div className="img-container">
              <img src={product.image} alt={product.nom} />
            </div>
            <div className="product-info">
              <h3>{product.nom}</h3>
              <p>{product.couleur || product.reference}</p>
              
              <div className="stepper">
                <button onClick={() => ajuster(product.id, -1)}>−</button>
                <span>{getQte(product.id)}</span>
                <button onClick={() => ajuster(product.id, 1)}>+</button>
              </div>

              <button 
                className={`add-btn ${recentlyAdded[product.id] ? 'success' : ''}`}
                onClick={() => ajouterAuPanier(product)}
              >
                {recentlyAdded[product.id] ? "Ajouté ✓" : "Ajouter"}
              </button>
            </div>
          </div>
        ))}
      </main>

      {panier.length > 0 && (
        <button className="cart-footer" onClick={() => setCartOpen(true)}>
          Panier ({panier.length})
        </button>
      )}

      {/* Modal Panier (Simplifié pour l'exemple) */}
      {cartOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'white', zcall: 2000, padding: 40, overflowY: 'auto' }}>
          <button onClick={() => setCartOpen(false)} style={{ float: 'right', border: 'none', fontSize: 24 }}>×</button>
          <h2 style={{ fontSize: 32, letterSpacing: -1 }}>Votre Sélection</h2>
          
          <div style={{ margin: '40px 0' }}>
            {panier.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #eee' }}>
                <span>{item.nom} (x{item.quantite})</span>
                <button onClick={() => setPanier(panier.filter(i => i.id !== item.id))} style={{ color: 'red', border: 'none', background: 'none' }}>Supprimer</button>
              </div>
            ))}
          </div>

          {!orderSent ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
              <input 
                placeholder="Votre Nom" 
                style={{ padding: 15, borderRadius: 12, border: '1px solid #d2d2d7' }}
                onChange={e => setClientInfo({...clientInfo, nom: e.target.value})}
              />
              <input 
                placeholder="Votre Email" 
                style={{ padding: 15, borderRadius: 12, border: '1px solid #d2d2d7' }}
                onChange={e => setClientInfo({...clientInfo, email: e.target.value})}
              />
              <button 
                disabled={sending}
                onClick={envoyerCommande}
                style={{ background: '#0071e3', color: 'white', padding: 20, borderRadius: 14, border: 'none', fontWeight: 600 }}
              >
                {sending ? "Envoi..." : "Confirmer la commande"}
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', marginTop: 50 }}>
              <h3 style={{ color: '#34c759' }}>✓ Commande Envoyée</h3>
              <p>Un email de confirmation a été envoyé.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
