  const envoyerCommande = async () => {
    if (!nomClient.trim()) {
      alert('❌ Veuillez entrer votre nom');
      return;
    }

    setIsSending(true);

    try {
      // On s'assure d'envoyer exactement ce que l'API attend
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nomClient: nomClient,
          panier: panier // Contient id, reference, couleur, prix, quantite
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Commande envoyée avec succès !');
        setPanier([]);
        setNomClient('');
        setShowCheckoutModal(false);
        setCartOpen(false);
      } else {
        // Affiche l'erreur précise renvoyée par le serveur
        alert(`❌ Erreur: ${data.error || 'Une erreur est survenue'}`);
      }
    } catch (error) {
      console.error('Erreur technique:', error);
      alert('❌ Impossible d\'envoyer la commande. Vérifiez votre connexion ou le serveur.');
    } finally {
      setIsSending(false);
    }
  };
