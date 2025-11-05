# Configuration Stripe

## Variables d'environnement requises

Ajoutez les variables suivantes dans votre fichier `.env.local` :

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...  # Votre clé secrète Stripe (Test ou Live)
NEXT_PUBLIC_APP_URL=http://localhost:3000  # URL de votre application
```

## Configuration

### 1. Obtenir vos clés API Stripe

1. Créez un compte sur [Stripe](https://stripe.com)
2. Accédez au [Tableau de bord Stripe](https://dashboard.stripe.com)
3. Allez dans **Développeurs > Clés API**
4. Copiez votre **Clé secrète** (commence par `sk_test_` en mode test ou `sk_live_` en mode production)

### 2. Configuration des URLs de redirection

Les URLs de redirection sont configurées dans le code :

- **Succès** : `/commande/succes?session_id={CHECKOUT_SESSION_ID}`
- **Annulation** : `/commande/annule`

Assurez-vous que `NEXT_PUBLIC_APP_URL` correspond à votre URL de production en déploiement.

### 3. Mode Test vs Production

#### Mode Test

- Utilisez `sk_test_...` pour les clés API
- Les cartes de test fonctionnent (ex: `4242 4242 4242 4242`)
- Aucun paiement réel n'est effectué

#### Mode Production

- Utilisez `sk_live_...` pour les clés API
- Les paiements réels sont effectués
- Configurez les webhooks pour gérer les événements de paiement

## Webhooks Stripe (Recommandé)

### Configuration des webhooks

1. Allez dans **Développeurs > Webhooks** dans votre tableau de bord Stripe
2. Créez un endpoint avec l'URL : `https://votre-domaine.com/api/webhooks/stripe`
3. Sélectionnez les événements suivants :
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`

### Mise à jour du backend

Vous devrez créer une route webhook dans votre backend pour :

- Vérifier la signature du webhook
- Mettre à jour le statut de la commande dans votre base de données
- Envoyer l'email de confirmation

Exemple de route webhook (à ajouter au backend) :

```javascript
// Back/src/Routes/Payement/payement.routes.js
app.post("/api/webhooks/stripe", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      // Mettre à jour la commande dans la base de données
      // Envoyer l'email de confirmation
    }

    res.json({ received: true });
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
```

## Test de l'intégration

### Cartes de test

Utilisez ces numéros de carte pour tester :

- **Succès** : `4242 4242 4242 4242`
- **Échec** : `4000 0000 0000 0002`
- **3D Secure requis** : `4000 0027 6000 3184`

Expiration : n'importe quelle date future (ex: 12/34)
CVC : n'importe quel 3 chiffres (ex: 123)

### Flux de test

1. Ajoutez des produits au panier
2. Remplissez le formulaire de commande
3. Cliquez sur "Confirmer la commande et payer"
4. Vous serez redirigé vers Stripe Checkout
5. Utilisez une carte de test
6. Retournez à la page de succès après le paiement

## Sécurité

⚠️ **Important** :

- Ne commitez jamais vos clés API dans le code
- Utilisez des variables d'environnement
- Activez les webhooks pour sécuriser les transactions
- Vérifiez toujours les signatures des webhooks

## Support

Pour toute question sur Stripe :

- [Documentation Stripe](https://stripe.com/docs)
- [Support Stripe](https://support.stripe.com)
