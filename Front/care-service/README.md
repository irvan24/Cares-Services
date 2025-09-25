# Care Service - Site Web de Lavage Auto à Domicile

## 🚗 Description

Site web professionnel pour un service de lavage automobile à domicile, développé avec Next.js 15, TypeScript et Tailwind CSS.

## ✨ Fonctionnalités

- **Landing page moderne** avec design responsive
- **Section Services** détaillant les offres
- **Section Formules** avec tarifs transparents
- **Page de réservation** intégrée avec Calendly
- **Navigation fluide** entre les sections
- **Design professionnel** avec palette de couleurs cyan/gris

## 🚀 Installation et Démarrage

### Prérequis

- Node.js 18+ (recommandé: Node.js 20)
- npm ou yarn

### Installation

```bash
# Cloner le projet
git clone [votre-repo]

# Aller dans le dossier
cd care-service

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

## 📅 Configuration Calendly

### 1. Créer un compte Calendly

- Allez sur [calendly.com](https://calendly.com)
- Créez votre compte professionnel

### 2. Configurer vos disponibilités

- Créez un "Event Type" pour vos services de lavage
- Définissez vos créneaux disponibles
- Configurez la durée des rendez-vous

### 3. Personnaliser l'URL

Remplacez l'URL Calendly dans le fichier `src/app/reservation/page.tsx` :

```javascript
// Ligne 108 - Remplacez par votre URL Calendly
data-url="https://calendly.com/votre-entreprise/care-service"
```

### 4. Personnaliser les champs

Dans Calendly, ajoutez des champs personnalisés :

- Type de véhicule
- Adresse de service
- Numéro de téléphone
- Formule choisie

## 🎨 Personnalisation

### Couleurs

Le site utilise une palette cyan/gris. Modifiez les classes Tailwind dans :

- `src/app/globals.css`
- Composants individuels

### Logo

Remplacez le texte "CARE" par votre logo dans :

- `src/components/Navigation.tsx`
- `src/app/page.tsx`

### Contenu

Modifiez les textes et informations dans :

- `src/app/page.tsx` (page d'accueil)
- `src/app/reservation/page.tsx` (page réservation)

## 📱 Responsive Design

Le site est entièrement responsive et s'adapte à :

- **Mobile** : 1 colonne, navigation compacte
- **Tablette** : 2 colonnes, navigation étendue
- **Desktop** : 3 colonnes, navigation complète

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Démarrer en production
npm run start

# Linting
npm run lint
```

## 📁 Structure du Projet

```
care-service/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Page d'accueil
│   │   ├── reservation/      # Page de réservation
│   │   │   └── page.tsx
│   │   ├── layout.tsx        # Layout principal
│   │   └── globals.css       # Styles globaux
│   └── components/
│       └── Navigation.tsx    # Composant navigation
├── public/                    # Assets statiques
└── package.json
```

## 🌐 Déploiement

### Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Autres plateformes

- **Netlify** : Compatible avec Next.js
- **AWS Amplify** : Déploiement automatique
- **Hébergement traditionnel** : Build puis upload des fichiers

## 📞 Support

Pour toute question ou problème :

- Email : contact@care-service.fr
- Téléphone : 01 23 45 67 89

## 📄 Licence

Ce projet est développé pour Care Service. Tous droits réservés.

---

**Développé avec ❤️ pour Care Service**
