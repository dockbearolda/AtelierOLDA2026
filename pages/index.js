import React, { useState } from 'react';

const MUGS_DATA = {
  nouveautes: [{ id: 101, reference: 'NW 01', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop', couleur: 'Édition Aurore', prix: 16.99, description: 'Notre dernière création' }],
  olda: [
    { id: 1, reference: 'TC 01', image: 'https://images.unsplash.com/photo-1572119865084-43c285814d63?w=400&h=400&fit=crop', couleur: 'Rose & Blanc', prix: 14.99, description: 'Élégance quotidienne' },
    { id: 2, reference: 'TC 02', image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=400&h=400&fit=crop', couleur: 'Rouge & Blanc', prix: 14.99, description: 'Passion incarnée' },
    { id: 3, reference: 'TC 03', image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?w=400&h=400&fit=crop', couleur: 'Orange & Blanc', prix: 14.99, description: 'Énergie positive' },
    { id: 4, reference: 'TC 04', image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=400&h=400&fit=crop', couleur: 'Vert & Blanc', prix: 14.99, description: 'Nature apaisante' },
    { id: 5, reference: 'TC 05', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop', couleur: 'Noir & Blanc', prix: 14.99, description: 'Classique intemporel' },
  ],
  exclusif: [{ id: 11, reference: 'TF 01', image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&h=400&fit=crop', couleur: 'Signature Series', prix: 18.99, description: 'Édition collector' }],
  offres: [{ id: 201, reference: 'DS 01', image: 'https://images.unsplash.com/photo-1497515114583-f29e5f2dfc66?w=400&h=400&fit=crop', couleur: 'Édition Limitée', prix: 12.99, description: 'Offre spéciale' }],
};

const tabs = [
  { key: 'nouveautes', label: 'Nouveautés' },
  { key: 'olda', label: 'Collection' },
  { key: 'exclusif', label: 'Exclusif' },
  { key: 'offres', label: 'Offres' },
];

export default function AppleStyleStore() {
  const [activeTab, setActiveTab] = useState('olda');
  const [quantites, setQuantites] = useState({});
  const [panier, setPanier] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  const getQte = (id) => quantites[id] || 3;
  const ajuster = (id, delta) => {
    const v = getQte(id) + delta;
    if (v >= 1 && v <= 99) setQuantites({ ...quantites, [id]: v });
  };

  const ajouterAuPanier = (p) => {
    const qte = getQte(p.id);
    setPanier(prev => {
      const existant = prev.find(i => i.id === p.id);
      if (existant) return prev.map(i => i.id === p.id ? { ...i, quantite: i.quantite + qte } : i);
      return [...prev, { ...p, quantite: qte }];
    });
    setAddedProduct(p.id);
    setTimeout(() => setAddedProduct(null), 1500);
  };

  const supprimerDuPanier = (id) => setPanier(prev => prev.filter(i => i.id !== id));
  const modifierQuantite = (id, newQte) => {
    if (newQte < 1) {
      supprimerDuPanier(id);
    } else {
      setPanier(prev => prev.map(i => i.id === id ? { ...i, quantite: newQte } : i));
    }
  };
  
  const totalPrix = panier.reduce((acc, i) => acc + (i.prix * i.quantite), 0);
  const totalArticles = panier.reduce((acc, i) => acc + i.quantite, 0);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased',
    }}>
      {/* Navigation */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'rgba(251, 251, 253, 0.8)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: '0.5px solid rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{
          maxWidth: 1024,
          margin: '0 auto',
          padding: '0 24px',
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{
            fontSize: 21,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: '#1d1d1f',
          }}>
            OLDA
          </div>
          
          {/* Apple-style Bag Icon */}
          <button 
            onClick={() => setCartOpen(true)}
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              borderRadius: 8,
              transition: 'background 0.2s',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.5 5C4.5 2.51472 6.51472 0.5 9 0.5C11.4853 0.5 13.5 2.51472 13.5 5" stroke="#1d1d1f" strokeWidth="1.5" fill="none"/>
              <path d="M1.5 6.5H16.5L15.5 18.5H2.5L1.5 6.5Z" stroke="#1d1d1f" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
            </svg>
            {totalArticles > 0 && (
              <span style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: '#0071e3',
                color: 'white',
                fontSize: 9,
                fontWeight: 700,
                minWidth: 14,
                height: 14,
                borderRadius: 7,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {totalArticles}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Tabs */}
      <div style={{
        position: 'sticky',
        top: 48,
        zIndex: 999,
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '0.5px solid rgba(0, 0, 0, 0.08)',
      }}>
        <div style={{
          maxWidth: 600,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          padding: '12px 16px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '8px 16px',
                borderRadius: 20,
                border: 'none',
                background: activeTab === tab.key ? '#1d1d1f' : 'transparent',
                color: activeTab === tab.key ? '#ffffff' : '#1d1d1f',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <main style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '40px 24px 120px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {MUGS_DATA[activeTab].map((product, index) => (
            <article
              key={product.id}
              style={{
                background: '#fbfbfd',
                borderRadius: 18,
                overflow: 'hidden',
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s',
                animation: `fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.08}s both`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Product Image - Compact */}
              <div style={{
                height: 100,
                background: 'linear-gradient(135deg, #f5f5f7 0%, #e8e8ed 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 16,
              }}>
                <img
                  src={product.image}
                  alt={product.couleur}
                  style={{
                    height: 68,
                    width: 68,
                    objectFit: 'contain',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
              </div>

              {/* Product Info - Compact */}
              <div style={{ padding: '16px 20px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <h2 style={{
                      fontSize: 15,
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                      color: '#1d1d1f',
                      marginBottom: 2,
                    }}>
                      {product.couleur}
                    </h2>
                    <p style={{
                      fontSize: 12,
                      color: '#86868b',
                    }}>
                      {product.description}
                    </p>
                  </div>
                  <div style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#1d1d1f',
                  }}>
                    {product.prix.toFixed(2)} €
                  </div>
                </div>

                {/* Quantity + Add Button Row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 14,
                }}>
                  {/* Stepper */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#ffffff',
                    borderRadius: 8,
                    border: '1px solid #e5e5e5',
                  }}>
                    <button
                      onClick={() => ajuster(product.id, -1)}
                      style={{
                        width: 32,
                        height: 32,
                        border: 'none',
                        background: 'none',
                        fontSize: 18,
                        color: getQte(product.id) <= 1 ? '#d2d2d7' : '#1d1d1f',
                        cursor: getQte(product.id) <= 1 ? 'not-allowed' : 'pointer',
                      }}
                    >
                      −
                    </button>
                    <span style={{
                      width: 32,
                      textAlign: 'center',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#1d1d1f',
                    }}>
                      {getQte(product.id)}
                    </span>
                    <button
                      onClick={() => ajuster(product.id, 1)}
                      style={{
                        width: 32,
                        height: 32,
                        border: 'none',
                        background: 'none',
                        fontSize: 18,
                        color: '#1d1d1f',
                        cursor: 'pointer',
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Add Button */}
                  <button
                    onClick={() => ajouterAuPanier(product)}
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      borderRadius: 8,
                      border: 'none',
                      background: addedProduct === product.id ? '#34c759' : '#0071e3',
                      color: '#ffffff',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    {addedProduct === product.id ? '✓ Ajouté' : 'Ajouter'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Cart Overlay */}
      <div
        onClick={() => setCartOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 2000,
          opacity: cartOpen ? 1 : 0,
          visibility: cartOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.35s, visibility 0.35s',
        }}
      />

      {/* Apple-style Cart Dropdown */}
      <div style={{
        position: 'fixed',
        top: 56,
        right: 24,
        width: 'min(380px, calc(100vw - 48px))',
        maxHeight: 'calc(100vh - 100px)',
        background: '#ffffff',
        borderRadius: 18,
        zIndex: 2001,
        opacity: cartOpen ? 1 : 0,
        visibility: cartOpen ? 'visible' : 'hidden',
        transform: cartOpen ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.98)',
        transition: 'all 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.25), 0 0 0 0.5px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Small Arrow */}
        <div style={{
          position: 'absolute',
          top: -8,
          right: 28,
          width: 16,
          height: 16,
          background: '#ffffff',
          transform: 'rotate(45deg)',
          borderRadius: 3,
          boxShadow: '-2px -2px 4px rgba(0, 0, 0, 0.04)',
        }} />

        {/* Cart Header */}
        <div style={{
          padding: '20px 20px 16px',
          borderBottom: '0.5px solid #e5e5e5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <h2 style={{
            fontSize: 17,
            fontWeight: 600,
            letterSpacing: '-0.01em',
            color: '#1d1d1f',
          }}>
            Panier
          </h2>
          <button
            onClick={() => setCartOpen(false)}
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              border: 'none',
              background: '#f5f5f7',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '4px 0',
          maxHeight: 320,
        }}>
          {panier.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '48px 24px',
              color: '#86868b',
            }}>
              <svg width="48" height="48" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 5C4.5 2.51472 6.51472 0.5 9 0.5C11.4853 0.5 13.5 2.51472 13.5 5" stroke="#d2d2d7" strokeWidth="1.5" fill="none"/>
                <path d="M1.5 6.5H16.5L15.5 18.5H2.5L1.5 6.5Z" stroke="#d2d2d7" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
              </svg>
              <p style={{ marginTop: 16, fontSize: 15 }}>Votre panier est vide</p>
            </div>
          ) : (
            panier.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: 14,
                  padding: '14px 20px',
                  borderBottom: '0.5px solid #f5f5f7',
                }}
              >
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 10,
                  background: '#f5f5f7',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  <img
                    src={item.image}
                    alt={item.couleur}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#1d1d1f',
                      marginBottom: 2,
                    }}>
                      {item.couleur}
                    </h3>
                    <span style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#1d1d1f',
                    }}>
                      {(item.prix * item.quantite).toFixed(2)} €
                    </span>
                  </div>
                  
                  <p style={{
                    fontSize: 12,
                    color: '#86868b',
                    marginBottom: 8,
                  }}>
                    {item.prix.toFixed(2)} € × {item.quantite}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: '#f5f5f7',
                      borderRadius: 6,
                    }}>
                      <button
                        onClick={() => modifierQuantite(item.id, item.quantite - 1)}
                        style={{
                          width: 24,
                          height: 24,
                          border: 'none',
                          background: 'none',
                          fontSize: 14,
                          cursor: 'pointer',
                          color: '#1d1d1f',
                        }}
                      >
                        −
                      </button>
                      <span style={{
                        width: 24,
                        textAlign: 'center',
                        fontSize: 12,
                        fontWeight: 600,
                      }}>
                        {item.quantite}
                      </span>
                      <button
                        onClick={() => modifierQuantite(item.id, item.quantite + 1)}
                        style={{
                          width: 24,
                          height: 24,
                          border: 'none',
                          background: 'none',
                          fontSize: 14,
                          cursor: 'pointer',
                          color: '#1d1d1f',
                        }}
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      onClick={() => supprimerDuPanier(item.id)}
                      style={{
                        padding: 0,
                        border: 'none',
                        background: 'none',
                        fontSize: 12,
                        color: '#0071e3',
                        cursor: 'pointer',
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {panier.length > 0 && (
          <div style={{
            padding: '16px 20px 20px',
            borderTop: '0.5px solid #e5e5e5',
            background: '#fbfbfd',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}>
              <span style={{
                fontSize: 14,
                color: '#86868b',
              }}>
                Total
              </span>
              <span style={{
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#1d1d1f',
              }}>
                {totalPrix.toFixed(2)} €
              </span>
            </div>
            
            <button
              style={{
                width: '100%',
                padding: '12px 20px',
                borderRadius: 10,
                border: 'none',
                background: '#0071e3',
                color: '#ffffff',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              Commander
            </button>
            
            <p style={{
              textAlign: 'center',
              fontSize: 11,
              color: '#86868b',
              marginTop: 10,
            }}>
              Livraison gratuite • Retours sous 14 jours
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
