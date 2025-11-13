# 🎨 Charte Graphique - Plateforme de Gestion de Stock

## 📋 Vue d'ensemble

Identité visuelle moderne, professionnelle et épurée pour une plateforme de gestion événementielle. Design system basé sur des composants ShadCN/UI avec Tailwind CSS v4.

---

## 🎨 Palette de Couleurs

### Couleurs Principales

#### 🔵 Bleu (Primaire)
```css
Primaire: #2563eb (rgb(37, 99, 235))
Utilisation: Navigation, boutons principaux, liens, éléments interactifs

Variantes:
- Blue 50:  #eff6ff (Arrière-plans légers)
- Blue 100: #dbeafe (Conteneurs d'icônes)
- Blue 600: #2563eb (Standard)
- Blue 700: #1d4ed8 (Hover states)
```

**Où c'est utilisé:**
- Boutons primaires
- Liens cliquables
- Icônes de navigation
- Conteneurs d'icônes dans les cartes
- Notifications importantes
- Indicateurs actifs dans la sidebar

#### 🟣 Indigo (Accentuation)
```css
Indigo: De #6366f1 à #4f46e5
Utilisation: Dégradés, avatars admin, éléments premium

Dégradés combinés:
- from-blue-600 to-indigo-600 (Logo, boutons premium)
- from-blue-50 via-indigo-50 to-purple-50 (Arrière-plans de pages)
```

**Où c'est utilisé:**
- Logo de l'application
- Avatars des administrateurs (dégradé)
- Arrière-plans des pages de connexion/inscription
- Boutons d'action importante

---

### Couleurs Fonctionnelles

#### ✅ Succès (Vert)
```css
Green 50:   #f0fdf4 (Arrière-plans d'alertes de succès)
Green 100:  #dcfce7 (Conteneurs d'icônes)
Green 600:  #16a34a (Texte et icônes)
Green 200:  #bbf7d0 (Bordures d'alertes)
```

**Utilisation:**
- Messages de confirmation
- Statuts "Confirmé", "Terminé"
- Indicateurs de croissance (+12%, +8%)
- Disponibilité du matériel

#### ⚠️ Avertissement (Orange/Amber)
```css
Amber 600: #d97706 (Alertes de stock faible)
Orange:    #f97316 (Avertissements généraux)
```

**Utilisation:**
- Alertes de stock bas
- Badges d'avertissement
- Icônes d'alerte (AlertTriangle)
- Notifications nécessitant attention

#### 🔴 Danger/Destructif (Rouge)
```css
Destructive: #d4183d (Primaire rouge)
Red 600:     #dc2626 (Actions destructives)
Red 50:      #fef2f2 (Arrière-plans d'erreur)
```

**Utilisation:**
- Boutons de suppression
- Messages d'erreur
- Badges d'erreur
- Notification de déconnexion
- Badge de compteur de notifications (badge rouge sur cloche)

#### 🟣 Violet (Catégorie spéciale)
```css
Purple 50:  #faf5ff (Arrière-plans)
Purple 100: #f3e8ff (Conteneurs d'icônes)
Purple 600: #9333ea (Icônes et accents)
```

**Utilisation:**
- Icônes de tableaux de bord (BarChart3)
- Distinction de certaines catégories
- Dégradés d'arrière-plans (via-indigo-50 to-purple-50)

---

### Couleurs Neutres (Système)

#### 🌑 Noir/Gris Foncé
```css
Primary:           #030213 (Texte principal)
Foreground:        oklch(0.145 0 0) (Texte de base)
```

**Utilisation:**
- Texte principal
- Titres
- Labels
- Contenu important

#### ⚪ Gris (Muted)
```css
Muted:             #ececf0 (Arrière-plans discrets)
Muted-foreground:  #717182 (Texte secondaire)
Border:            rgba(0, 0, 0, 0.1) (Bordures fines)
```

**Utilisation:**
- Texte secondaire (descriptions, métadonnées)
- Séparateurs
- Bordures de cartes
- Placeholders d'inputs
- Icônes désactivées

#### ⬜ Blanc/Arrière-plans
```css
Background:        #ffffff (Fond principal)
Card:              #ffffff (Cartes)
Gray 50:           #f9fafb (Arrière-plan général de l'app)
Input-background:  #f3f3f5 (Champs de formulaire)
```

**Utilisation:**
- Fond des pages principales (bg-gray-50)
- Cartes et composants (white)
- Header (white)
- Sidebar (très légèrement gris)

---

### Couleurs par Catégories de Matériel

#### 🎤 Son (Bleu)
```css
Bleu standard pour la catégorie Son
```

#### 💡 Lumière (Jaune/Orange)
```css
Orange/Amber pour distinguer l'éclairage
```

#### 📹 Vidéo (Violet)
```css
Violet/Purple pour le matériel vidéo
```

#### 🏗️ Scènes (Vert)
```css
Vert pour structures et praticables
```

---

## 📝 Typographie

### Police de caractères
```css
Font Family: System UI (Native)
- -apple-system
- BlinkMacSystemFont
- "Segoe UI"
- Roboto
- "Helvetica Neue"
- Arial
- sans-serif
```

**Raison:** Performance optimale, rendu natif selon l'OS

---

### Tailles de Police

```css
Base font-size: 16px (1rem)

--text-xs:   0.75rem   (12px)  - Badges, métadonnées
--text-sm:   0.875rem  (14px)  - Texte secondaire, labels de cartes
--text-base: 1rem      (16px)  - Texte standard, paragraphes
--text-lg:   1.125rem  (18px)  - Sous-titres, titres de cartes
--text-xl:   1.25rem   (20px)  - Titres de sections
--text-2xl:  1.5rem    (24px)  - Titres de pages (h1)
--text-4xl:  2.25rem   (36px)  - Titre d'accueil "Bienvenue..."
```

**Utilisation par élément:**
- `h1`: 2xl (24px) - Titres principaux de pages
- `h2`: xl (20px) - Titres de sections
- `h3`: lg (18px) - Titres de cartes
- `h4`: base (16px) - Sous-titres
- `p`: base (16px) - Paragraphes
- `label`: base (16px) - Labels de formulaires
- `button`: base (16px) - Texte des boutons
- `input`: base (16px) - Champs de saisie

---

### Graisses de Police

```css
--font-weight-normal: 400  - Texte standard
--font-weight-medium: 500  - Titres, labels, boutons
```

**Hiérarchie:**
- **Titres (h1-h4):** Medium (500)
- **Labels:** Medium (500)
- **Boutons:** Medium (500)
- **Paragraphes:** Normal (400)
- **Inputs:** Normal (400)

---

### Line-height (Interlignage)

```css
Line-height: 1.5 (150%)
```

Appliqué uniformément pour une lisibilité optimale.

---

## 🎯 Icônes

### Bibliothèque: Lucide React

```bash
npm install lucide-react
```

**Style:** Outline (contours), minimaliste, cohérent

---

### Icônes Principales par Section

#### 🏠 Navigation & Layout
```tsx
Package          - Logo principal, matériel
LayoutDashboard  - Tableau de bord
Warehouse        - Dépôts
TrendingUp       - Mouvements de stock
Calendar         - Réservations
Users            - Gestion des utilisateurs
Bell             - Notifications
LogOut           - Déconnexion
```

#### 📊 Statistiques & Données
```tsx
ArrowUpRight     - Croissance, augmentation
BarChart3        - Graphiques, analytics
AlertTriangle    - Alertes, avertissements
Package          - Total matériel
Warehouse        - Nombre de dépôts
```

#### 📝 Formulaires & Actions
```tsx
Lock             - Mot de passe
Mail             - Email
User             - Nom d'utilisateur
Building2        - Entreprise
Phone            - Téléphone
Shield           - Rôle/permissions
Eye / EyeOff     - Visibilité mot de passe
AlertCircle      - Messages d'erreur
```

#### ⚙️ Actions CRUD
```tsx
Plus             - Ajouter
Edit / Pencil    - Modifier
Trash2           - Supprimer
Search           - Rechercher
Filter           - Filtrer
X                - Fermer
Check            - Valider
```

#### 📦 Catégories Matériel
```tsx
Mic              - Son (microphones, audio)
Lightbulb        - Lumière (éclairage)
Video            - Vidéo (écrans, caméras)
Building         - Scènes (structures)
```

---

### Tailles d'Icônes

```css
h-3 w-3   (12px)  - Indicateurs très petits (flèches de stats)
h-4 w-4   (16px)  - Standard (navigation, inputs, actions)
h-5 w-5   (20px)  - Header (notifications)
h-6 w-6   (24px)  - Cartes de navigation, sidebar
h-8 w-8   (32px)  - Logo de connexion
h-10 w-10 (40px)  - Logo principal
h-12 w-12 (48px)  - Icônes de cartes features
h-16 w-16 (64px)  - Logo de login
h-20 w-20 (80px)  - Grande icône de bienvenue
h-24 w-24 (96px)  - Avatar de bienvenue sur page d'accueil
```

---

## 🎴 Composants UI (ShadCN)

### Boutons (Button)

#### Variantes
```tsx
Primary (default):
- Fond: Bleu #2563eb
- Texte: Blanc
- Hover: Bleu foncé
- Usage: Actions principales

Outline:
- Fond: Transparent
- Bordure: Gris clair
- Texte: Noir
- Usage: Actions secondaires

Ghost:
- Fond: Transparent (hover: gris léger)
- Usage: Actions discrètes, icônes

Destructive:
- Fond: Rouge #d4183d
- Texte: Blanc
- Usage: Suppressions, actions dangereuses
```

#### Tailles
```tsx
sm   - Petit (padding réduit)
md   - Standard (default)
lg   - Grand (px-8, pour actions importantes)
icon - Carré (notifications, actions icône seule)
```

**Exemples:**
```tsx
<Button>Action principale</Button>
<Button variant="outline">Action secondaire</Button>
<Button variant="ghost" size="icon"><Bell /></Button>
<Button variant="destructive">Supprimer</Button>
```

---

### Cartes (Card)

```tsx
Structure:
<Card>
  <CardHeader>
    <CardTitle>Titre</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Contenu principal
  </CardContent>
</Card>
```

**Style:**
- Fond: Blanc
- Bordure: Gris très léger (rgba(0, 0, 0, 0.1))
- Arrondi: 0.625rem (10px)
- Ombre: Légère (hover: plus prononcée)
- Padding: 1.5rem (24px)

**Variantes d'utilisation:**
- Statistiques KPI (Dashboard)
- Listes d'items (Matériel, Dépôts)
- Navigation rapide (Page d'accueil)
- Containers de formulaires

---

### Badges (Badge)

#### Variantes
```tsx
default:     Bleu foncé, pour statuts confirmés
secondary:   Gris, pour statuts en cours
outline:     Transparent avec bordure, neutre
destructive: Rouge, pour alertes/erreurs
```

**Tailles:**
- Petit: text-xs (12px)
- Standard: text-sm (14px)

**Exemples d'usage:**
```tsx
<Badge>Confirmé</Badge>                    // Bleu
<Badge variant="secondary">En cours</Badge> // Gris
<Badge variant="outline">Son</Badge>        // Bordure
<Badge variant="destructive">2/5</Badge>    // Rouge (stock)
```

---

### Inputs (Input)

**Style:**
- Fond: #f3f3f5 (gris très léger)
- Bordure: Transparente (focus: bleu)
- Arrondi: 0.5rem (8px)
- Padding: 0.75rem (12px)
- Texte: 1rem (16px), weight 400

**Avec icônes:**
```tsx
<div className="relative">
  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
  <Input className="pl-10" placeholder="email@example.com" />
</div>
```

---

### Dialogs (Dialog)

**Style:**
- Overlay: Noir semi-transparent (backdrop)
- Contenu: Carte blanche centrée
- Largeur max: 500px (standard)
- Animation: Fade in + scale

**Structure:**
```tsx
<Dialog>
  <DialogTrigger>Ouvrir</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Titre</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    [Contenu]
    <DialogFooter>
      <Button>Action</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

### Alertes (Alert)

#### Variantes
```tsx
default:     Gris neutre (informations)
destructive: Rouge (erreurs)
success:     Vert (succès) - custom avec bg-green-50
```

**Structure:**
```tsx
<Alert>
  <AlertCircle className="h-4 w-4" />
  <AlertDescription>Message d'alerte</AlertDescription>
</Alert>
```

---

### Progress Bar (Progress)

**Style:**
- Fond: Gris clair
- Barre: Bleu #2563eb
- Hauteur: 8px (standard) ou 4px (h-1 pour version fine)
- Arrondi: Complet (rounded-full)

**Usage:**
- Capacité des dépôts
- Niveau de stock
- Progression d'actions

---

### Avatar (Avatar)

**Style:**
- Forme: Circulaire
- Tailles: 32px (standard), 64px (header), 96px (accueil)
- Fallback: Initiales sur fond coloré

**Couleurs selon rôle:**
```tsx
Staff: bg-blue-600 (bleu uni)
Admin: bg-gradient-to-br from-blue-600 to-indigo-600 (dégradé)
```

---

### Sidebar

**Style:**
- Fond: #fafafa (gris très clair, oklch(0.985))
- Largeur: 256px (desktop), rétractable (mobile)
- Bordure droite: Gris clair
- Items actifs: Fond gris plus foncé + icône/texte bleu

**Structure:**
```
┌─────────────────────┐
│ Header + Logo       │
├─────────────────────┤
│ Navigation items    │
│  - Accueil          │
│  - Tableau de bord  │
│  - Dépôts           │
│  - ...              │
└─────────────────────┘
```

---

### Dropdown Menu

**Style:**
- Fond: Blanc
- Ombre: Importante (shadow-lg)
- Arrondi: 0.5rem
- Items: Hover gris léger
- Séparateurs: Ligne fine grise

**Usage:**
- Menu utilisateur (avatar + infos)
- Sélections multiples
- Actions contextuelles

---

## 📐 Espacements & Layout

### Système de Spacing (Tailwind)

```css
p-1  = 0.25rem  (4px)
p-2  = 0.5rem   (8px)
p-3  = 0.75rem  (12px)
p-4  = 1rem     (16px)
p-6  = 1.5rem   (24px)
p-8  = 2rem     (32px)
p-12 = 3rem     (48px)
```

**Conventions d'usage:**
- **Cartes:** p-6 (24px)
- **Sections:** space-y-6 (24px entre éléments)
- **Inputs/Buttons:** p-3 ou p-4 (12-16px)
- **Grilles:** gap-4 ou gap-6 (16-24px)

---

### Arrondis (Border Radius)

```css
--radius: 0.625rem (10px) - Valeur de base

rounded-sm:   calc(10px - 4px) = 6px   - Petits éléments
rounded-md:   calc(10px - 2px) = 8px   - Inputs, badges
rounded-lg:   10px                     - Cartes, dialogs
rounded-xl:   calc(10px + 4px) = 14px  - Containers importants
rounded-2xl:  16px                     - Logo, avatars
rounded-3xl:  24px                     - Icônes de logo (welcome)
rounded-full: 9999px                   - Avatars, badges ronds
```

**Application par composant:**
- Cartes: rounded-lg (10px)
- Inputs: rounded-md (8px)
- Boutons: rounded-md (8px)
- Badges: rounded-md (8px) ou rounded-full
- Avatars: rounded-full
- Logo containers: rounded-2xl ou rounded-3xl

---

### Grilles (Grid Layout)

**Dashboard (statistiques):**
```tsx
grid gap-4 md:grid-cols-2 lg:grid-cols-4
```
- Mobile: 1 colonne
- Tablet: 2 colonnes
- Desktop: 4 colonnes
- Gap: 16px

**Page d'accueil (navigation):**
```tsx
grid md:grid-cols-2 gap-4
```
- Mobile: 1 colonne
- Desktop: 2 colonnes

**Sections principales:**
```tsx
grid gap-6 md:grid-cols-2
```
- Gap plus large (24px) pour espacement confortable

---

### Conteneurs & Largeurs

```css
max-w-md:   28rem (448px)   - Formulaires de connexion
max-w-4xl:  56rem (896px)   - Page d'accueil
max-w-6xl:  72rem (1152px)  - Welcome page
w-full:     100%            - Conteneurs fluides
```

---

## 🎭 Effets Visuels

### Ombres (Shadows)

```css
Cartes standard:
shadow-sm: Ombre très légère (défaut des cartes)

Hover state:
hover:shadow-lg: Ombre prononcée (interaction)

Dropdowns/Popovers:
shadow-lg: Ombre importante (éléments flottants)

Logo:
shadow-lg: Sur les containers de logo
```

---

### Dégradés (Gradients)

#### Arrière-plans de pages
```tsx
bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50
```
Utilisé sur: Pages de connexion, inscription, welcome

#### Logo & Éléments premium
```tsx
bg-gradient-to-br from-blue-600 to-indigo-600
```
Utilisé sur: Logo principal, avatars admin, icônes importantes

**Direction:** `br` (bottom-right) pour dynamisme

---

### Transitions

```css
Cartes:
transition-shadow: Transition fluide des ombres au hover

Boutons:
transition-colors: Changement de couleur au hover

Hover states:
hover:bg-gray-50: Fond léger au survol (cartes, items de liste)
```

**Durée par défaut:** 150ms (Tailwind standard)

---

### États Interactifs

#### Hover
```css
Cartes: hover:shadow-lg (ombre)
Boutons: hover:bg-blue-700 (assombrissement)
Links: hover:underline (soulignement)
Inputs: hover:border-blue-500 (bordure colorée)
```

#### Focus
```css
Inputs: focus:ring-2 focus:ring-blue-500 (anneau bleu)
Buttons: focus:outline-none focus:ring-2
```

#### Active
```css
Sidebar items: bg-gray-100 + text-blue-600 (état actif)
Tabs: border-b-2 border-blue-600 (onglet actif)
```

---

## 🎯 Patterns de Design

### 1. Cartes de Statistiques (KPI Cards)

```tsx
┌─────────────────────────┐
│ Total Matériel     📦   │
│                         │
│ 1,390                   │
│ ↗ +12% ce mois         │
└─────────────────────────┘
```

**Éléments:**
- Titre (text-sm)
- Icône (top-right, text-muted-foreground)
- Valeur principale (text-2xl)
- Métrique secondaire (text-xs, avec icône de tendance)

---

### 2. Cartes d'Items (Listes)

```tsx
┌────────────────────────────────┐
│ 🎤 Console Yamaha CL5          │
│ Catégorie: Son                 │
│ Référence: YAM-CL5-001         │
│                                │
│ 📍 Paris Nord                  │
│ 💰 25 000 €                    │
│ 📊 Stock: 3 | Disponible: 2    │
│                                │
│ [Modifier] [Supprimer]         │
└────────────────────────────────┘
```

**Structure:**
- Titre avec émoji/icône
- Métadonnées (badges, texte secondaire)
- Informations clés (localisation, prix, stock)
- Actions en bas (boutons)

---

### 3. Progress Bars avec Labels

```tsx
Paris Nord        450 / 600
███████████░░░░░ 75%
```

**Composants:**
- Label et valeurs (flex justify-between)
- Barre de progression colorée
- Texte en text-muted-foreground

---

### 4. Formulaires avec Icônes

```tsx
┌────────────────────────────┐
│ Email                      │
│ ┌──────────────────────┐   │
│ │ 📧 email@example.com │   │
│ └──────────────────────┘   │
└────────────────────────────┘
```

**Pattern:**
- Label au-dessus
- Input avec icône à gauche (absolute left-3)
- Padding left compensé (pl-10)

---

### 5. Badges de Statut

```tsx
Confirmé     → Badge default (bleu)
En cours     → Badge secondary (gris)
En attente   → Badge outline (bordure)
Annulée      → Badge destructive (rouge)
```

**Couleurs sémantiques** selon l'état

---

## 📱 Responsive Design

### Breakpoints Tailwind

```css
sm:  640px  - Petits écrans (smartphones larges)
md:  768px  - Tablettes
lg:  1024px - Petits desktops
xl:  1280px - Desktops standard
2xl: 1536px - Grands écrans
```

---

### Patterns Responsives

#### Grilles
```tsx
Mobile:    grid-cols-1        (1 colonne)
Tablet:    md:grid-cols-2     (2 colonnes)
Desktop:   lg:grid-cols-4     (4 colonnes)
```

#### Sidebar
```tsx
Mobile:    Rétractable (hamburger menu)
Desktop:   Fixe à gauche (256px)
```

#### Espacements
```tsx
Mobile:    p-4 (16px)
Desktop:   p-6 (24px)
```

#### Text
```tsx
Titres:    text-2xl → md:text-4xl (plus grand sur desktop)
```

---

## ♿ Accessibilité

### Contraste des Couleurs

**WCAG AA Compliance:**
- Texte standard: 4.5:1 minimum
- Texte large: 3:1 minimum
- Éléments interactifs: 3:1 minimum

**Validation:**
- Noir (#030213) sur blanc → 19.5:1 ✅
- Bleu (#2563eb) sur blanc → 4.6:1 ✅
- Gris muted (#717182) sur blanc → 4.8:1 ✅

---

### Focus States

```css
Tous les éléments interactifs ont:
- focus:outline-none (suppression du outline par défaut)
- focus:ring-2 focus:ring-blue-500 (anneau visible au clavier)
- focus:ring-offset-2 (espacement de l'anneau)
```

---

### Sémantique HTML

- Utilisation correcte des balises `<h1>`, `<h2>`, etc.
- Labels associés aux inputs (`htmlFor`)
- Boutons avec `<button>` (pas de `<div>` cliquables)
- Attributs ARIA où nécessaire

---

## 📊 Exemples d'Application

### Page d'Accueil

```
┌─────────────────────────────────────────┐
│           [Avatar 96px]                 │
│    Bienvenue M./Mme [Nom]              │ ← text-4xl
│    Administrateur - EventPro            │ ← text-xl text-muted
│                                         │
│  ┌──────────────┬──────────────┐        │
│  │ 📊 Tableau   │  🏢 Dépôts   │        │ ← Cards cliquables
│  │    de bord   │              │        │   hover:shadow-lg
│  ├──────────────┼──────────────┤        │
│  │ 📦 Matériel  │ 📊 Mouvements│        │
│  ├──────────────┼──────────────┤        │
│  │ 📅 Réserv.   │ 👥 Utilisat. │        │
│  └──────────────┴──────────────┘        │
│                                         │
│  ┌──────────────────────────────┐       │
│  │ 🔔 Notifications importantes │       │ ← bg-blue-50
│  │ 3 alertes de stock faible... │       │   border-blue-200
│  └──────────────────────────────┘       │
└─────────────────────────────────────────┘
```

**Couleurs:** Dégradé bleu-indigo-violet en arrière-plan

---

### Tableau de Bord

```
┌────────────────────────────────────────────────┐
│ [KPI] [KPI] [KPI] [KPI]                        │ ← 4 colonnes (lg)
│                                                │    2 colonnes (md)
│ ┌──────────────────┬──────────────────┐        │
│ │ Dépôts principaux│ Alertes stock    │        │ ← 2 colonnes
│ │                  │                  │        │
│ │ Progress bars    │ Liste + badges   │        │
│ └──────────────────┴──────────────────┘        │
│                                                │
│ ┌──────────────────────────────────────┐       │
│ │ Réservations à venir                 │       │ ← Pleine largeur
│ │ [Liste avec badges de statut]        │       │
│ └──────────────────────────────────────┘       │
└────────────────────────────────────────────────┘
```

**Arrière-plan:** bg-gray-50 pour contraste avec cartes blanches

---

### Formulaire de Connexion

```
┌─────────────────────────────────┐
│        [Logo gradient]          │ ← 64px, dégradé bleu-indigo
│                                 │
│         Connexion               │ ← text-2xl
│  Accédez à votre plateforme    │ ← text-muted-foreground
│                                 │
│  Nom d'utilisateur              │
│  [👤 johndoe        ]           │ ← Input avec icône
│                                 │
│  Email                          │
│  [📧 email@ex.com   ]           │
│                                 │
│  Mot de passe                   │
│  [🔒 ••••••••  👁️]             │ ← Toggle visibilité
│                                 │
│  [Se connecter (full width)]    │ ← Bouton primaire bleu
│                                 │
│  Pas de compte ? Créer un compte│ ← Lien bleu
└─────────────────────────────────┘
```

**Fond:** Dégradé bleu-indigo-violet
**Carte:** Blanche, centrée, max-w-md, shadow-lg

---

## 🎨 Code Snippets (Exemples)

### Bouton Primaire
```tsx
<Button className="bg-blue-600 hover:bg-blue-700 text-white">
  Action Principale
</Button>
```

### Carte KPI
```tsx
<Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm">Total Matériel</CardTitle>
    <Package className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl">1,390</div>
    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
      <ArrowUpRight className="h-3 w-3 text-green-600" />
      <span className="text-green-600">+12%</span> ce mois
    </p>
  </CardContent>
</Card>
```

### Badge de Statut
```tsx
<Badge variant="default">Confirmé</Badge>
<Badge variant="destructive">Stock faible</Badge>
<Badge variant="outline">Son</Badge>
```

### Input avec Icône
```tsx
<div className="relative">
  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
  <Input
    type="email"
    placeholder="votre@email.com"
    className="pl-10"
  />
</div>
```

### Avatar avec Initiales
```tsx
<Avatar className="h-16 w-16">
  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
    MD
  </AvatarFallback>
</Avatar>
```

---

## 📝 Checklist de Cohérence

Lors de la création de nouveaux composants, vérifier:

- [ ] Utilisation de la palette de couleurs définie
- [ ] Respect de la hiérarchie typographique
- [ ] Icônes de lucide-react (pas d'autres bibliothèques)
- [ ] Arrondis cohérents (lg pour cartes, md pour inputs)
- [ ] Espacements standardisés (p-6 pour cartes, gap-4/6 pour grilles)
- [ ] États interactifs (hover, focus, active)
- [ ] Transitions fluides (transition-colors, transition-shadow)
- [ ] Responsive design (grilles adaptatives)
- [ ] Accessibilité (contraste, focus visible, sémantique)
- [ ] Composants ShadCN existants utilisés (pas de recréation)

---

## 🔗 Ressources

**Composants UI:**
- ShadCN/UI: https://ui.shadcn.com/
- Tailwind CSS v4: https://tailwindcss.com/

**Icônes:**
- Lucide React: https://lucide.dev/

**Couleurs:**
- Palette primaire: Bleu #2563eb
- Génération de teintes: https://tailwindcss.com/docs/customizing-colors

**Typographie:**
- System UI Font Stack (natif)

---

**Document créé le:** 8 novembre 2025  
**Version:** 1.0  
**Statut:** ✅ Complet et prêt à l'emploi
