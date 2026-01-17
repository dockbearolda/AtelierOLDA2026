# Configuration de la Boutique Atelier OLDA

## Configuration de l'envoi d'emails

Pour recevoir les commandes par email, vous devez configurer les variables d'environnement dans le fichier `.env.local`.

### Étape 1 : Créer un mot de passe d'application Gmail

1. Allez sur votre compte Google : https://myaccount.google.com/security
2. **Activez la validation en 2 étapes** (obligatoire)
   - Cliquez sur "Validation en 2 étapes"
   - Suivez les instructions pour l'activer
3. Une fois la validation en 2 étapes activée, retournez sur la page de sécurité
4. Cherchez **"Mots de passe des applications"** (ou "App passwords")
5. Cliquez dessus et sélectionnez :
   - Application : **Autre**
   - Nom : **Atelier OLDA** (ou un nom de votre choix)
6. Cliquez sur **Générer**
7. **Copiez le mot de passe** généré (16 caractères sans espaces)

### Étape 2 : Configurer le fichier `.env.local`

Ouvrez le fichier `.env.local` à la racine du projet et remplissez les valeurs :

```env
# L'adresse Gmail qui enverra les emails
EMAIL_USER=votre-email@gmail.com

# Le mot de passe d'application généré à l'étape 1
EMAIL_PASS=xxxxxxxxxxxxxxxx

# L'adresse email qui recevra les commandes (peut être la même que EMAIL_USER)
EMAIL_DESTINATAIRE=votre-email-de-reception@gmail.com
```

### Étape 3 : Démarrer le serveur

```bash
npm install
npm run dev
```

Le site sera accessible sur http://localhost:3000

## Test de l'envoi d'email

1. Ajoutez des produits au panier
2. Cliquez sur le panier (icône 🛍️)
3. Cliquez sur "Finaliser la commande"
4. Remplissez le formulaire avec vos informations
5. Cliquez sur "Confirmer la commande"
6. Vérifiez votre boîte email (celle configurée dans `EMAIL_DESTINATAIRE`)

## Fonctionnalités

### Panier
- Minimum 3 articles par produit
- Ajout/retrait de quantités
- Suppression d'articles
- Affichage du total

### Formulaire de commande
- Nom complet (obligatoire)
- Email (obligatoire)
- Téléphone (optionnel)
- Adresse de livraison (optionnel)

### Email de confirmation
Vous recevrez un email propre et bien formaté contenant :
- Les informations du client
- La liste des produits commandés avec quantités et prix
- Le total de la commande
- La date de réception

## Problèmes courants

### L'email ne s'envoie pas
- Vérifiez que vous avez bien activé la validation en 2 étapes
- Vérifiez que le mot de passe d'application est correct (pas d'espaces)
- Vérifiez que l'adresse email dans `EMAIL_USER` est correcte
- Consultez les logs dans la console du navigateur (F12)

### "Méthode non autorisée"
- Vérifiez que le serveur Next.js est bien démarré (`npm run dev`)

### Variables d'environnement non reconnues
- Redémarrez le serveur après avoir modifié `.env.local`
- Vérifiez que le fichier est bien à la racine du projet

## Déploiement

Si vous déployez sur Vercel, Netlify ou autre :
1. N'uploadez JAMAIS le fichier `.env.local` sur Git
2. Configurez les variables d'environnement dans les paramètres de votre plateforme
3. Utilisez les mêmes noms : `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_DESTINATAIRE`
