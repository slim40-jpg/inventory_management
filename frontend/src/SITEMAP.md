# 🗺️ Site Map - Plateforme de Gestion de Stock Multi-Entrepôts

## 📋 Vue d'ensemble
Application web de gestion de stock pour le secteur événementiel avec système d'authentification et gestion des permissions.

---

## 🏗️ Architecture de Navigation

```
┌─────────────────────────────────────────────────────────────────┐
│                     AUTHENTIFICATION                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌──────────────────────────────────────────┐
        │         Page de Connexion                │
        │  - Formulaire de login                   │
        │  - Sélection du rôle (Staff/Admin)       │
        │  - Comptes de démonstration              │
        └──────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     APPLICATION PRINCIPALE                       │
│                     (Authentifié uniquement)                     │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┴─────────────────────────────┐
        │                   LAYOUT                          │
        │  ┌──────────────┬──────────────────────────────┐ │
        │  │   Sidebar    │        Contenu Principal     │ │
        │  │   + Header   │                              │ │
        │  └──────────────┴──────────────────────────────┘ │
        └───────────────────────────────────────────────────┘
```

---

## 📱 Pages & Sections Principales

### 🏠 **1. ACCUEIL** (`/home`)
**Accessible à:** Staff & Admin

```
┌─────────────────────────────────────────────────────┐
│  Accueil                                            │
├─────────────────────────────────────────────────────┤
│                                                     │
│  👤 Avatar + Message de bienvenue                  │
│     "Bienvenue M./Mme [Nom]"                       │
│     Rôle - Société                                 │
│                                                     │
│  📊 NAVIGATION RAPIDE (Cartes cliquables)          │
│  ┌──────────────┬──────────────┐                   │
│  │ Tableau de   │   Dépôts     │                   │
│  │    bord      │              │                   │
│  ├──────────────┼──────────────┤                   │
│  │  Matériel    │  Mouvements  │                   │
│  ├──────────────┼──────────────┤                   │
│  │ Réservations │ [Gestion des │                   │
│  │              │  utilisateurs]│  ← Admin only    │
│  └──────────────┴──────────────┘                   │
│                                                     │
│  🔔 NOTIFICATIONS                                   │
│  Alertes de stock faible (3)                       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

### 📊 **2. TABLEAU DE BORD** (`/dashboard`)
**Accessible à:** Staff & Admin

```
┌─────────────────────────────────────────────────────┐
│  Tableau de bord                                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📈 STATISTIQUES CLÉS (Cartes KPI)                 │
│  ┌──────────┬──────────┬──────────┬──────────┐     │
│  │ Dépôts   │ Articles │ Valeur   │ Réserva- │     │
│  │ Actifs   │ en stock │ totale   │ tions    │     │
│  │    5     │   847    │ 2.4M €   │   23     │     │
│  └──────────┴──────────┴──────────┴──────────┘     │
│                                                     │
│  🏢 DÉPÔTS RÉGIONAUX (Cartes)                      │
│  ┌────────────────────────────────┐                │
│  │ Paris Nord                      │                │
│  │ • Capacité: 85%                │                │
│  │ • Articles: 320                │                │
│  │ • Alertes: 12                  │                │
│  └────────────────────────────────┘                │
│  [+ 4 autres dépôts...]                            │
│                                                     │
│  ⚠️ ALERTES DE STOCK FAIBLE                        │
│  Liste des articles nécessitant réapprovisionnement│
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Permissions:**
- 👁️ **Staff:** Lecture seule
- ✏️ **Admin:** Lecture seule

---

### 🏢 **3. DÉPÔTS** (`/depots`)
**Accessible à:** Staff & Admin

```
┌─────────────────────────────────────────────────────┐
│  Dépôts                                             │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [+ Nouveau dépôt]  ← Admin uniquement             │
│                                                     │
│  🔍 Barre de recherche                             │
│                                                     │
│  📦 LISTE DES DÉPÔTS (Vue en cartes)               │
│  ┌────────────────────────────────────┐            │
│  │ 📍 Paris Nord                      │            │
│  │ 45 Avenue du Général de Gaulle     │            │
│  │ 93200 Saint-Denis                  │            │
│  │                                    │            │
│  │ 📊 Capacité: 85% (340/400)         │            │
│  │ 💰 Valeur: 680 000 €               │            │
│  │                                    │            │
│  │ 👤 Responsable: Jean Martin        │            │
│  │ ☎️ +33 1 23 45 67 89              │            │
│  │                                    │            │
│  │ [Modifier] [Voir détails]          │ ← Admin    │
│  └────────────────────────────────────┘            │
│  [+ 4 autres dépôts...]                            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Permissions:**
- 👁️ **Staff:** Consultation uniquement
- ✏️ **Admin:** Ajouter, modifier, supprimer des dépôts

**Fonctionnalités:**
- Recherche par nom, ville, code postal
- Affichage en cartes avec informations clés
- Dialog de création/modification (Admin)
- Vue détaillée de chaque dépôt

---

### 📦 **4. MATÉRIEL** (`/material`)
**Accessible à:** Staff & Admin

```
┌─────────────────────────────────────────────────────┐
│  Matériel                                           │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [+ Nouveau matériel]  ← Admin uniquement          │
│                                                     │
│  🔍 Recherche | 🏷️ Filtre par catégorie           │
│                                                     │
│  🎛️ LISTE DU MATÉRIEL (Vue en cartes)             │
│  ┌────────────────────────────────────┐            │
│  │ 🎤 Console Yamaha CL5               │            │
│  │ Catégorie: Son                     │            │
│  │ Référence: YAM-CL5-001             │            │
│  │                                    │            │
│  │ 📍 Emplacement: Paris Nord          │            │
│  │ 💰 Prix: 25 000 €                  │            │
│  │                                    │            │
│  │ 📊 Stock: 3 unités                 │            │
│  │ 🔄 Disponible: 2                   │            │
│  │ 📅 Réservé: 1                      │            │
│  │                                    │            │
│  │ [Modifier] [Supprimer] [Détails]   │ ← Admin    │
│  └────────────────────────────────────┘            │
│  [+ Autres articles...]                            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Permissions:**
- 👁️ **Staff:** Consultation uniquement
- ✏️ **Admin:** Ajouter, modifier, supprimer du matériel

**Catégories de matériel:**
- 🎤 Son (Consoles, Enceintes, Micros)
- 💡 Lumière (Projecteurs, LEDs, Contrôleurs)
- 📹 Vidéo (Écrans, Projecteurs, Caméras)
- 🏗️ Scènes (Structures, Podiums, Praticables)

**Fonctionnalités:**
- Recherche par nom, référence
- Filtrage par catégorie, dépôt, disponibilité
- Dialog de création/modification (Admin)
- Gestion des stocks et réservations

---

### 📊 **5. MOUVEMENTS** (`/movements`)
**Accessible à:** Staff & Admin

```
┌─────────────────────────────────────────────────────┐
│  Mouvements de stock                                │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [+ Nouveau mouvement]  ← Admin uniquement         │
│                                                     │
│  📅 Filtre par date | 🏷️ Type de mouvement        │
│                                                     │
│  📋 HISTORIQUE DES MOUVEMENTS (Liste)              │
│  ┌────────────────────────────────────┐            │
│  │ 📦 Transfert                       │            │
│  │ Console Yamaha CL5                 │            │
│  │ REF: YAM-CL5-001                   │            │
│  │                                    │            │
│  │ 📍 Paris Nord → Lyon Centre        │            │
│  │ 📊 Quantité: 1 unité               │            │
│  │                                    │            │
│  │ 📅 2025-11-06 14:30               │            │
│  │ 👤 Par: Marie Dubois               │            │
│  │                                    │            │
│  │ 📝 Note: Pour événement Lyon       │            │
│  └────────────────────────────────────┘            │
│  [+ Autres mouvements...]                          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Types de mouvements:**
- 📦 Transfert (entre dépôts)
- ✅ Entrée (réception)
- ❌ Sortie (expédition)
- 🔧 Maintenance
- ⚠️ Perte/Casse

**Permissions:**
- 👁️ **Staff:** Consultation de l'historique
- ✏️ **Admin:** Créer de nouveaux mouvements

**Fonctionnalités:**
- Traçabilité complète des mouvements
- Filtrage par date, type, dépôt
- Historique complet avec responsable
- Export possible (future feature)

---

### 📅 **6. RÉSERVATIONS** (`/reservations`)
**Accessible à:** Staff & Admin

```
┌─────────────────────────────────────────────────────┐
│  Réservations                                       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [+ Nouvelle réservation]  ← Admin uniquement      │
│                                                     │
│  📅 Vue: [Calendrier | Liste]                      │
│  🔍 Recherche | 🏷️ Filtre par statut              │
│                                                     │
│  📋 LISTE DES RÉSERVATIONS (Cartes)                │
│  ┌────────────────────────────────────┐            │
│  │ 🎪 Festival Jazz Vienne            │            │
│  │ Client: Jazz Productions           │            │
│  │                                    │            │
│  │ 📅 15/11/2025 → 18/11/2025        │            │
│  │ 📍 Retrait: Lyon Centre            │            │
│  │                                    │            │
│  │ 📦 Matériel réservé (8 articles):  │            │
│  │   • Console Yamaha CL5 (x2)        │            │
│  │   • Enceintes Line Array (x4)      │            │
│  │   • Projecteurs LED (x12)          │            │
│  │                                    │            │
│  │ 💰 Valeur totale: 85 000 €         │            │
│  │ 📊 Statut: ✅ Confirmée            │            │
│  │                                    │            │
│  │ [Modifier] [Annuler] [Détails]     │ ← Admin    │
│  └────────────────────────────────────┘            │
│  [+ Autres réservations...]                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Statuts de réservation:**
- ⏳ En attente
- ✅ Confirmée
- 🚚 En cours (matériel sorti)
- ✔️ Terminée
- ❌ Annulée

**Permissions:**
- 👁️ **Staff:** Consultation des réservations
- ✏️ **Admin:** Créer, modifier, annuler des réservations

**Fonctionnalités:**
- Gestion des périodes de réservation
- Affectation du matériel
- Vérification des disponibilités
- Calcul de la valeur totale
- Gestion des clients

---

### 👥 **7. GESTION DES UTILISATEURS** (`/users`)
**Accessible à:** **Admin uniquement** ⚠️

```
┌─────────────────────────────────────────────────────┐
│  Gestion des utilisateurs                           │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [+ Nouvel utilisateur]                            │
│                                                     │
│  🔍 Recherche | 🏷️ Filtre par rôle                │
│                                                     │
│  👥 LISTE DES UTILISATEURS (Cartes)                │
│  ┌────────────────────────────────────┐            │
│  │ 👤 Marie Dubois                    │            │
│  │ ✉️ marie@eventpro.com              │            │
│  │ ☎️ +33 6 12 34 56 78              │            │
│  │                                    │            │
│  │ 🏷️ Rôle: Staff (Gestionnaire)     │            │
│  │ 🏢 Société: EventPro Solutions     │            │
│  │                                    │            │
│  │ 📅 Créé le: 15/01/2024             │            │
│  │ 🔄 Dernière connexion: Aujourd'hui │            │
│  │                                    │            │
│  │ [Modifier] [Désactiver]            │            │
│  └────────────────────────────────────┘            │
│  [+ Autres utilisateurs...]                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Rôles disponibles:**
- 👁️ **Staff:** Lecture seule sur tous les modules
- ✏️ **Admin:** Accès complet + gestion utilisateurs

**Permissions:**
- ❌ **Staff:** Aucun accès
- ✏️ **Admin:** Créer, modifier, désactiver des utilisateurs

**Fonctionnalités:**
- Création de comptes utilisateurs
- Attribution des rôles
- Gestion des informations de contact
- Activation/désactivation de comptes
- Historique de connexion

---

## 🎨 Composants Globaux

### 🧭 **Sidebar (Navigation principale)**
```
┌─────────────────────┐
│  EventPro Solutions │
│  Gestion de stock   │
├─────────────────────┤
│ 🏠 Accueil          │
│ 📊 Tableau de bord  │
│ 🏢 Dépôts           │
│ 📦 Matériel         │
│ 📊 Mouvements       │
│ 📅 Réservations     │
│ 👥 Utilisateurs*    │  * Admin only
└─────────────────────┘
```

### 📱 **Header (Barre supérieure)**
```
┌────────────────────────────────────────────────┐
│  [Titre de la page]          🔔(3)  👤 Avatar │
└────────────────────────────────────────────────┘
```

### 👤 **Menu utilisateur (Dropdown)**
```
┌──────────────────────┐
│ Email                │
│ marie@eventpro.com   │
│                      │
│ Téléphone            │
│ +33 6 12 34 56 78   │
├──────────────────────┤
│ 🚪 Se déconnecter   │
└──────────────────────┘
```

---

## 🔐 Matrice des Permissions

| Section                | Staff (Gestionnaire) | Admin (Administrateur) |
|------------------------|---------------------|------------------------|
| 🏠 Accueil             | ✅ Lecture          | ✅ Lecture             |
| 📊 Tableau de bord     | ✅ Lecture          | ✅ Lecture             |
| 🏢 Dépôts              | ✅ Lecture          | ✅ Lecture + Écriture  |
| 📦 Matériel            | ✅ Lecture          | ✅ Lecture + Écriture  |
| 📊 Mouvements          | ✅ Lecture          | ✅ Lecture + Écriture  |
| 📅 Réservations        | ✅ Lecture          | ✅ Lecture + Écriture  |
| 👥 Utilisateurs        | ❌ Aucun accès      | ✅ Accès complet       |

---

## 📊 Flux de Données (Mock)

```
┌──────────────────────────────────────────────────────┐
│              DONNÉES MOCKÉES (Frontend)              │
├──────────────────────────────────────────────────────┤
│                                                      │
│  👥 Utilisateurs                                     │
│     ├─ Marie Dubois (Staff)                         │
│     └─ Pierre Martin (Admin)                        │
│                                                      │
│  🏢 Dépôts (5)                                       │
│     ├─ Paris Nord                                   │
│     ├─ Lyon Centre                                  │
│     ├─ Marseille Port                               │
│     ├─ Toulouse Est                                 │
│     └─ Bordeaux Lac                                 │
│                                                      │
│  📦 Matériel (~40 articles)                          │
│     ├─ Son (Consoles, Enceintes, Micros)            │
│     ├─ Lumière (Projecteurs, LEDs)                  │
│     ├─ Vidéo (Écrans, Caméras)                      │
│     └─ Scènes (Structures, Praticables)             │
│                                                      │
│  📊 Mouvements (~20 entrées)                         │
│     └─ Transferts, Entrées, Sorties                 │
│                                                      │
│  📅 Réservations (~10 réservations)                  │
│     └─ Festivals, Concerts, Événements              │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 🎯 Parcours Utilisateur Types

### 📝 **Parcours 1: Consultation du stock (Staff)**
```
1. 🔐 Connexion (compte Staff)
2. 🏠 Accueil → Bienvenue Mme [Nom]
3. 📦 Navigation vers "Matériel"
4. 🔍 Recherche d'un article spécifique
5. 👁️ Consultation des détails et disponibilité
6. 📊 Vérification du stock dans différents dépôts
```

### ✏️ **Parcours 2: Création de réservation (Admin)**
```
1. 🔐 Connexion (compte Admin)
2. 🏠 Accueil → Bienvenue M. [Nom]
3. 📅 Navigation vers "Réservations"
4. ➕ Clic sur "Nouvelle réservation"
5. 📝 Saisie des informations:
   - Client
   - Dates de début/fin
   - Dépôt de retrait
   - Sélection du matériel
6. ✅ Validation de la réservation
7. 🔔 Notification de confirmation
```

### 🔧 **Parcours 3: Gestion d'un mouvement de stock (Admin)**
```
1. 🔐 Connexion (compte Admin)
2. 📊 Navigation vers "Mouvements"
3. ➕ Création d'un transfert
4. 📝 Saisie:
   - Article à transférer
   - Dépôt source
   - Dépôt destination
   - Quantité
   - Raison du transfert
5. ✅ Validation
6. 🔄 Mise à jour automatique des stocks
```

---

## 🚀 Évolutions Futures Possibles

### Phase 2 (Backend Supabase)
- 🔐 Authentification réelle avec Supabase Auth
- 💾 Base de données persistante
- 🔄 Synchronisation temps réel
- 📧 Notifications par email
- 📱 API REST pour mobile

### Phase 3 (Fonctionnalités avancées)
- 📊 Rapports et analytics avancés
- 📅 Calendrier interactif pour réservations
- 📸 Photos du matériel
- 🔍 Scan de codes-barres/QR codes
- 📱 Application mobile (iOS/Android)
- 📄 Export PDF/Excel
- 🌐 Multi-langue (FR/EN)

### Phase 4 (Optimisations)
- 🤖 Prédictions de stock (IA)
- 📈 Tableaux de bord personnalisables
- 🔔 Système de notifications avancé
- 👥 Collaboration en temps réel
- 🔗 Intégrations tierces (comptabilité, CRM)

---

## 📄 Structure des Fichiers

```
/
├── App.tsx                          # Point d'entrée principal
├── components/
│   ├── LoginPage.tsx                # Page de connexion
│   ├── Dashboard.tsx                # Tableau de bord
│   ├── DepotManagement.tsx          # Gestion des dépôts
│   ├── MaterialManagement.tsx       # Gestion du matériel
│   ├── StockMovements.tsx           # Mouvements de stock
│   ├── Reservations.tsx             # Gestion des réservations
│   ├── UserManagement.tsx           # Gestion des utilisateurs
│   └── ui/                          # Composants UI (ShadCN)
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── sidebar.tsx
│       └── [40+ composants...]
├── styles/
│   └── globals.css                  # Styles globaux + Tailwind
└── SITEMAP.md                       # Ce fichier
```

---

## 🎨 Design System

### Couleurs principales
- **Primaire:** Bleu (`#2563eb`) - Actions, navigation
- **Succès:** Vert - Confirmations, disponibilité
- **Alerte:** Orange - Avertissements, stock faible
- **Danger:** Rouge - Erreurs, suppressions
- **Neutre:** Gris - Textes, bordures

### Composants UI (ShadCN)
- Cards pour l'affichage des données
- Dialogs pour les formulaires
- Badges pour les statuts
- Buttons avec variants
- Inputs avec validation
- Tooltips pour les informations

---

**Document généré le:** 8 novembre 2025  
**Version:** 1.0  
**Auteur:** Documentation automatique
