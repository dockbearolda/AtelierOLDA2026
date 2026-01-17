// hooks/useCart.js
import { useState, useEffect } from 'react';

export const useCart = () => {
  // Chargement initial depuis le localStorage
  const [panier, setPanier] = useState(() => {
    const saved = localStorage.getItem('olda_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Sauvegarde automatique dès que le panier change
  useEffect(() => {
    localStorage.setItem('olda_cart', JSON.stringify(panier));
  }, [panier]);

  const ajouterAuPanier = (produit, qte) => {
    setPanier(prev => {
      const existant = prev.find(item => item.id === produit.id);
      if (existant) {
        return prev.map(item =>
          item.id === produit.id ? { ...item, quantite: item.quantite + qte } : item
        );
      }
      return [...prev, { ...produit, quantite: qte }];
    });
  };

  const supprimerDuPanier = (id) => setPanier(p => p.filter(i => i.id !== id));

  return { panier, ajouterAuPanier, supprimerDuPanier, setPanier };
};
