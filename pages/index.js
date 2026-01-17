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
  exclusif: [{ id: 11, reference: 'TF 01', image: '/images/mugs/Fuckblancnoir.JPG', couleur: 'Tasse Céramique Fuck' }],
  tshirts: [{ id: 301, reference: 'TS 01', image: '/images/tshirts/logo.jpg', couleur: 'Coton Bio Noir' }],
  offres: [{ id: 201, reference: 'DS 01', image: '/images/mugs/logo.jpeg', couleur: 'Pack Duo Limité' }]
};

export default function BoutiqueOlda() {
  const [activeTab, setActiveTab] = useState('olda');
  const [quantites, setQuantites] = useState({});
  const [commentaires, setCommentaires] = useState({});
  const [panier, setPanier] = useState([]);
  const [showPanier, setShowPanier] = useState(false);
  const [clientInfo, setClientInfo] = useState({ nom: '', email: '', note: '' });
  const [isSending, setIsSending] = useState(false);

  const getQte = (id) => quantites[id] || 3;
  const ajuster = (id, delta) => {
    const actuelle = getQte(id);
    const nouvelle = actuelle + delta;
    if (nouvelle >= 3) setQuantites({ ...quantites, [id]: nouvelle });
  };

  const ajouterAuPanier = (produit) => {
    const qte = getQte(produit.id);
    const comm = commentaires[produit.id] || "";
    setPanier(prev => [...prev, { ...produit, quantite: qte, commentaire: comm }]);
    setCommentaires({ ...commentaires, [produit.id]: "" });
  };

  const envoyerCommande = async () => {
    if (!clientInfo.nom || !clientInfo.email) {
      alert("Nom et Email requis.");
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client: {
            nom: clientInfo.nom,
            email: clientInfo.email,
            note: clientInfo.note
          },
          articles: panier
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Commande envoyée avec succès à l'Atelier OLDA !");
        setPanier([]);
        setClientInfo({ nom: '', email: '', note: '' });
        setShowPanier(false);
      } else {
        alert(`❌ Erreur: ${data.error || 'Une erreur est survenue'}`);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      alert('❌ Impossible de contacter le serveur. Vérifiez votre connexion.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh', color: '#1d1d1f', fontFamily: '-apple-system, sans-serif' }}>
      <style>{`
        .header-main { position: sticky; top: 0; z-index: 1000; background: rgba(255,255,255,0.85); backdrop-filter: saturate(180%) blur(20px); border-bottom: 0.5px solid rgba(0,0,0,0.1); padding-top: env(safe-area-inset-top); }
        .top-bar { display: flex; justify-content: space-between; align-items: center; padding: 15px 20px; }
        .cart-icon { background: #f5f5f7; width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; position: relative; border: none; }
        .cart-badge { position: absolute; top: -2px; right: -2px; background: #0071e3; color: white; font-size: 11px; font-weight: 700; min-width: 18px; height: 18px; border-radius: 9px; display: flex; align-items: center; justify-content: center; }
        .roulette { display: flex; overflow-x: auto; gap: 8px; padding: 10px 20px; scrollbar-width: none; }
        .roulette::-webkit-scrollbar { display: none; }
        .collection-btn { flex: 0 0 auto; padding: 8px 18px; border-radius: 20px; border: none; font-size: 13px; font-weight: 500; background: #f5f5f7; }
        .collection-btn.active { background: #000; color: #fff; }
        .product-item { padding: 20px; border-bottom: 0.5px solid #f2f2f2; }
        .input-apple { width: 100%; border: 1px solid #d2d2d7; border-radius: 12px; padding: 14px; font-size: 16px; outline: none; margin-bottom: 10px; }
        .modal-panier { position: fixed; inset: 0; background: #fff; z-index: 2000; padding: 20px; padding-top: env(safe-area-inset-top); overflow-y: auto; }
      `}</style>

      <div className="header-main">
        <div className="top-bar">
          <span style={{ fontWeight: '800', fontSize: '22px' }}>OLDA</span>
          <button className="cart-icon" onClick={() => setShowPanier(true)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/></svg>
            {panier.length > 0 && <div className="cart-badge">{panier.reduce((acc, i) => acc + i.quantite, 0)}</div>}
          </button>
        </div>
        <div className="roulette">
          {Object.keys(MUGS_DATA).map(key => (
            <button key={key} className={`collection-btn ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>
              {key === 'olda' ? 'Collection OLDA' : key === 'exclusif' ? 'Tasses Céramique Fuck' : key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <main>
        {MUGS_DATA[activeTab].map(p => (
          <div key={p.id} className="product-item">
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '90px', height: '90px', background: '#fbfbfd', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={p.image} style={{ width: '75px' }} alt={p.couleur} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', color: '#86868b', fontWeight: '700' }}>{p.reference}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '600' }}>{p.couleur}</h3>
              </div>
            </div>
            <input className="input-apple" style={{marginTop:'15px', fontSize:'13px', border:'none', background:'#f5f5f7'}} placeholder="Note pour cet article..." value={commentaires[p.id] || ""} onChange={(e) => setCommentaires({...commentaires, [p.id]: e.target.value})} />
            <div style={{ display: 'flex', marginTop: '10px', gap: '10px' }}>
                <div style={{ display:'flex', background:'#f5f5f7', borderRadius:'12px', height:'40px', alignItems:'center', padding:'0 5px' }}>
                    <button style={{border:'none', background:'none', width:'35px', color:'#0071e3', fontSize:'20px'}} onClick={() => ajuster(p.id, -1)} disabled={getQte(p.id) <= 3}>−</button>
                    <span style={{width:'30px', textAlign:'center', fontWeight:'700'}}>{getQte(p.id)}</span>
                    <button style={{border:'none', background:'none', width:'35px', color:'#0071e3', fontSize:'20px'}} onClick={() => ajuster(p.id, 1)}>+</button>
                </div>
                <button style={{ flex: 1, background: '#0071e3', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '600' }} onClick={() => ajouterAuPanier(p)}>Ajouter au panier</button>
            </div>
          </div>
        ))}
      </main>

      {showPanier && (
        <div className="modal-panier">
          <button style={{ background: '#f5f5f7', border: 'none', padding: '10px 20px', borderRadius: '20px', fontWeight: '600', marginBottom: '20px' }} onClick={() => setShowPanier(false)}>← Boutique</button>
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '20px' }}>Finaliser</h2>

          <input className="input-apple" type="text" placeholder="Votre Nom" value={clientInfo.nom} onChange={(e) => setClientInfo({...clientInfo, nom: e.target.value})} />
          <input className="input-apple" type="email" placeholder="Email" value={clientInfo.email} onChange={(e) => setClientInfo({...clientInfo, email: e.target.value})} />
          <textarea className="input-apple" rows="2" placeholder="Note générale..." value={clientInfo.note} onChange={(e) => setClientInfo({...clientInfo, note: e.target.value})}></textarea>

          <h3 style={{ fontSize: '17px', fontWeight: '600', margin: '20px 0 10px' }}>Récapitulatif ({panier.reduce((acc, i) => acc + i.quantite, 0)})</h3>
          {panier.map((item, idx) => (
            <div key={idx} style={{ padding: '12px 0', borderBottom: '0.5px solid #eee' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600' }}>{item.quantite}x {item.couleur}</span>
                <span style={{ color: '#86868b' }}>{item.reference}</span>
              </div>
              {item.commentaire && <div style={{ fontSize: '13px', color: '#0071e3' }}>Note : {item.commentaire}</div>}
            </div>
          ))}

          <button
            disabled={isSending || panier.length === 0}
            onClick={envoyerCommande}
            style={{ width: '100%', background: '#000', color: '#fff', border: 'none', height: '55px', borderRadius: '15px', marginTop: '30px', fontWeight: '700', opacity: (isSending || panier.length === 0) ? 0.5 : 1 }}
          >
            {isSending ? 'Envoi en cours...' : 'Envoyer la commande'}
          </button>
        </div>
      )}
    </div>
  );
}
