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
      MozOsxFontSmoothing: 'grayscale',
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
            onMouseEnter={e => e.target.style.background = 'rgba(0,0,0,0.04)'}
            onMouseLeave={e => e.target.style.background = 'none'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2">
              <path d="M6 6h15l-1.5 9h-12z"/>
              <circle cx="9" cy="20" r="1"/>
              <circle cx="18" cy="20" r="1"/>
              <path d="M6 6L5 3H2"/>
            </svg>
            {totalArticles > 0 && (
              <span style={{
                position: 'absolute',
                top: 2,
                right: 2,
                background: '#0071e3',
                color: 'white',
                fontSize: 10,
                fontWeight: 600,
                minWidth: 16,
                height: 16,
                borderRadius: 8,
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

      {/* Hero Section */}
      <section style={{
        textAlign: 'center',
        padding: '80px 24px 40px',
        background: 'linear-gradient(180deg, #fbfbfd 0%, #ffffff 100%)',
      }}>
        <h1 style={{
          fontSize: 'clamp(40px, 8vw, 64px)',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          color: '#1d1d1f',
          marginBottom: 12,
          lineHeight: 1.1,
        }}>
          Atelier OLDA
        </h1>
        <p style={{
          fontSize: 'clamp(17px, 3vw, 21px)',
          color: '#86868b',
          fontWeight: 400,
          letterSpacing: '-0.01em',
          maxWidth: 500,
          margin: '0 auto',
        }}>
          Des mugs d'exception, pensés pour sublimer chaque instant.
        </p>
      </section>

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
        padding: '60px 24px 120px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 24,
        }}>
          {MUGS_DATA[activeTab].map((product, index) => (
            <article
              key={product.id}
              style={{
                background: '#fbfbfd',
                borderRadius: 24,
                overflow: 'hidden',
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s',
                cursor: 'default',
                animation: `fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s both`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Product Image */}
              <div style={{
                aspectRatio: '1',
                background: 'linear-gradient(135deg, #f5f5f7 0%, #e8e8ed 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 40,
              }}>
                <img
                  src={product.image}
                  alt={product.couleur}
                  style={{
                    width: '80%',
                    height: '80%',
                    objectFit: 'contain',
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
              </div>

              {/* Product Info */}
              <div style={{ padding: '28px 28px 32px' }}>
                <div style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#0071e3',
                  marginBottom: 8,
                }}>
                  {product.reference}
                </div>
                
                <h2 style={{
                  fontSize: 24,
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: '#1d1d1f',
                  marginBottom: 4,
                }}>
                  {product.couleur}
                </h2>
                
                <p style={{
                  fontSize: 14,
                  color: '#86868b',
                  marginBottom: 20,
                }}>
                  {product.description}
                </p>

                <div style={{
                  fontSize: 17,
                  fontWeight: 600,
                  color: '#1d1d1f',
                  marginBottom: 24,
                }}>
                  {product.prix.toFixed(2)} €
                </div>

                {/* Quantity Selector */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  marginBottom: 20,
                }}>
                  <span style={{ fontSize: 13, color: '#86868b' }}>Quantité</span>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#ffffff',
                    borderRadius: 12,
                    border: '1px solid #e5e5e5',
                    overflow: 'hidden',
                  }}>
                    <button
                      onClick={() => ajuster(product.id, -1)}
                      style={{
                        width: 40,
                        height: 40,
                        border: 'none',
                        background: 'none',
                        fontSize: 20,
                        color: getQte(product.id) <= 1 ? '#d2d2d7' : '#1d1d1f',
                        cursor: getQte(product.id) <= 1 ? 'not-allowed' : 'pointer',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => e.target.style.background = '#f5f5f7'}
                      onMouseLeave={e => e.target.style.background = 'none'}
                    >
                      −
                    </button>
                    <span style={{
                      width: 48,
                      textAlign: 'center',
                      fontSize: 15,
                      fontWeight: 600,
                      color: '#1d1d1f',
                    }}>
                      {getQte(product.id)}
                    </span>
                    <button
                      onClick={() => ajuster(product.id, 1)}
                      style={{
                        width: 40,
                        height: 40,
                        border: 'none',
                        background: 'none',
                        fontSize: 20,
                        color: '#1d1d1f',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => e.target.style.background = '#f5f5f7'}
                      onMouseLeave={e => e.target.style.background = 'none'}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => ajouterAuPanier(product)}
                  style={{
                    width: '100%',
                    padding: '14px 24px',
                    borderRadius: 12,
                    border: 'none',
                    background: addedProduct === product.id ? '#34c759' : '#0071e3',
                    color: '#ffffff',
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: addedProduct === product.id ? 'scale(0.98)' : 'scale(1)',
                  }}
                  onMouseEnter={e => {
                    if (addedProduct !== product.id) {
                      e.target.style.background = '#0077ed';
                      e.target.style.transform = 'scale(1.02)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (addedProduct !== product.id) {
                      e.target.style.background = '#0071e3';
                      e.target.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {addedProduct === product.id ? '✓ Ajouté' : 'Ajouter au panier'}
                </button>
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
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          zIndex: 2000,
          opacity: cartOpen ? 1 : 0,
          visibility: cartOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.4s, visibility 0.4s',
        }}
      />

      {/* Cart Drawer */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: 'min(420px, 100vw)',
        background: '#ffffff',
        zIndex: 2001,
        transform: cartOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: cartOpen ? '-20px 0 60px rgba(0, 0, 0, 0.15)' : 'none',
      }}>
        {/* Cart Header */}
        <div style={{
          padding: '24px 24px 20px',
          borderBottom: '0.5px solid #e5e5e5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <h2 style={{
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#1d1d1f',
          }}>
            Panier
          </h2>
          <button
            onClick={() => setCartOpen(false)}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              border: 'none',
              background: '#f5f5f7',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.target.style.background = '#e5e5e5'}
            onMouseLeave={e => e.target.style.background = '#f5f5f7'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 24px',
        }}>
          {panier.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#86868b',
            }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d2d2d7" strokeWidth="1.5">
                <path d="M6 6h15l-1.5 9h-12z"/>
                <circle cx="9" cy="20" r="1"/>
                <circle cx="18" cy="20" r="1"/>
                <path d="M6 6L5 3H2"/>
              </svg>
              <p style={{ marginTop: 16, fontSize: 17 }}>Votre panier est vide</p>
            </div>
          ) : (
            panier.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: 16,
                  padding: '20px 0',
                  borderBottom: '0.5px solid #f5f5f7',
                }}
              >
                <div style={{
                  width: 80,
                  height: 80,
                  borderRadius: 12,
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
                  <h3 style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#1d1d1f',
                    marginBottom: 4,
                  }}>
                    {item.couleur}
                  </h3>
                  <p style={{
                    fontSize: 13,
                    color: '#86868b',
                    marginBottom: 12,
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
                      borderRadius: 8,
                    }}>
                      <button
                        onClick={() => modifierQuantite(item.id, item.quantite - 1)}
                        style={{
                          width: 28,
                          height: 28,
                          border: 'none',
                          background: 'none',
                          fontSize: 16,
                          cursor: 'pointer',
                          color: '#1d1d1f',
                        }}
                      >
                        −
                      </button>
                      <span style={{
                        width: 28,
                        textAlign: 'center',
                        fontSize: 13,
                        fontWeight: 600,
                      }}>
                        {item.quantite}
                      </span>
                      <button
                        onClick={() => modifierQuantite(item.id, item.quantite + 1)}
                        style={{
                          width: 28,
                          height: 28,
                          border: 'none',
                          background: 'none',
                          fontSize: 16,
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
                        padding: '4px 10px',
                        borderRadius: 6,
                        border: 'none',
                        background: 'none',
                        fontSize: 13,
                        color: '#0071e3',
                        cursor: 'pointer',
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
                
                <div style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#1d1d1f',
                }}>
                  {(item.prix * item.quantite).toFixed(2)} €
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {panier.length > 0 && (
          <div style={{
            padding: 24,
            borderTop: '0.5px solid #e5e5e5',
            background: '#fbfbfd',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}>
              <span style={{
                fontSize: 15,
                color: '#86868b',
              }}>
                Total
              </span>
              <span style={{
                fontSize: 24,
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
                padding: '16px 24px',
                borderRadius: 12,
                border: 'none',
                background: '#1d1d1f',
                color: '#ffffff',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'transform 0.2s, background 0.2s',
              }}
              onMouseEnter={e => {
                e.target.style.background = '#000000';
                e.target.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={e => {
                e.target.style.background = '#1d1d1f';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Commander
            </button>
            
            <p style={{
              textAlign: 'center',
              fontSize: 12,
              color: '#86868b',
              marginTop: 12,
            }}>
              Livraison gratuite • Retours sous 14 jours
            </p>
          </div>
        )}
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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
