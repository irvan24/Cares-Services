# Architecture du Projet Cares-Services

## Vue d'ensemble

Application de réservation de services automobiles avec interface admin et frontend client.

## Stack Technologique

### Frontend

- **Framework**: Next.js 14 (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Déploiement**: Vercel
- **URL**: https://cares-services-j2br.vercel.app

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: JavaScript
- **Base de données**: Supabase (PostgreSQL)
- **Déploiement**: Render
- **Port local**: 3004

### Base de données

- **Service**: Supabase
- **Type**: PostgreSQL
- **Authentification**: Supabase Auth
- **Clés**: SUPABASE_ANON_KEY, SUPABASE_SERVICE_KEY

## Structure du Frontend

### Pages principales

- **Accueil** (`/`): Page d'accueil avec présentation des services
- **Réservation** (`/reservation`): Processus de réservation en 5 étapes
- **Boutique** (`/boutique`): Catalogue des produits/services
- **Admin Login** (`/admin/login`): Connexion administrateur
- **Admin Dashboard** (`/admin`): Tableau de bord admin
- **Admin Produits** (`/admin/produits`): Gestion des produits
- **Admin Commandes** (`/admin/commandes`): Gestion des commandes
- **Admin Utilisateurs** (`/admin/utilisateurs`): Gestion des utilisateurs
- **Admin Paramètres** (`/admin/parametres`): Configuration admin

### Composants

- **Navigation.tsx**: Navigation principale avec menu burger mobile
- **Footer.tsx**: Pied de page

### Services

- **adminService.ts**: Communication avec l'API admin
- **productsService.ts**: Gestion des produits
- **AuthContext.tsx**: Gestion de l'authentification

### Contextes

- **AuthContext**: Gestion globale de l'authentification

## Structure du Backend



### Configuration

- **server.js**: Serveur principal Express
- **index.js**: Point d'entrée
- **package.json**: Dépendances et scripts

## Flux de données

### Authentification

1. **Frontend** → **Backend** (`/auth/admin/login`)
2. **Backend** → **Supabase** (vérification credentials)
3. **Supabase** → **Backend** (retour token)
4. **Backend** → **Frontend** (token JWT)

### Gestion des produits

1. **Admin Frontend** → **Backend** (`/api/products`)
2. **Backend** → **Supabase** (CRUD operations)
3. **Supabase** → **Backend** (données)
4. **Backend** → **Frontend** (réponse JSON)

### Réservation

1. **Client Frontend** → **Backend** (`/api/orders`)
2. **Backend** → **Supabase** (création commande)
3. **Supabase** → **Backend** (confirmation)
4. **Backend** → **Frontend** (statut réservation)



## Déploiement


## Base de données (Supabase)

### Tables principales

- **users**: Utilisateurs et administrateurs
- **products**: Produits/services
- **categories**: Catégories de produits
- **orders**: Commandes
- **order_items**: Éléments de commande
- **reviews**: Avis clients

## API Endpoints

### Authentification

- `POST /auth/admin/login`: Connexion admin
- `POST /auth/admin/logout`: Déconnexion admin

### Produits

- `GET /api/products`: Liste des produits
- `POST /api/products`: Créer un produit
- `PUT /api/products/:id`: Modifier un produit
- `DELETE /api/products/:id`: Supprimer un produit

### Commandes

- `GET /api/orders`: Liste des commandes
- `POST /api/orders`: Créer une commande
- `PUT /api/orders/:id`: Modifier une commande
- `DELETE /api/orders/:id`: Supprimer une commande

### Dashboard

- `GET /api/dashboard/stats`: Statistiques générales
- `GET /api/dashboard/products`: Stats produits
- `GET /api/dashboard/orders`: Stats commandes
- `GET /api/dashboard/users`: Stats utilisateurs

## Sécurité

### Authentification

- JWT tokens pour les sessions admin
- Supabase Auth pour la gestion des utilisateurs
- Middleware de vérification sur toutes les routes admin




## Fonctionnalités principales

### Frontend Client

- Réservation en 5 étapes
- Sélection de véhicule (Citadine, Berline, SUV)
- Choix de formule (Essentiel, Premium, Confort)
- Options supplémentaires
- Calendrier de disponibilité
- Formulaire de contact

### Admin Dashboard

- Statistiques en temps réel
- Gestion des produits
- Gestion des commandes
- Gestion des utilisateurs
- Configuration des paramètres

## Intégrations

### Supabase

- Base de données PostgreSQL
- Authentification
- Real-time subscriptions
- Storage (images)

### Vercel

- Déploiement automatique
- CDN global
- Analytics
- Environment variables

### Render

- Déploiement backend
- Auto-scaling
- Health checks
- Logs centralisés
