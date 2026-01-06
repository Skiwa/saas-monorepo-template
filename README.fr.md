[English](README.md) | Français

# Application de Gestion de Notes

Une application moderne et scalable de gestion de notes construite en monorepo avec une approche Clean Architecture. Cette application démontre les meilleures pratiques en ingénierie logicielle, incluant Domain-Driven Design (DDD), Architecture Hexagonale, et la séparation des préoccupations entre frontend et backend.

## 📋 Table des Matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancement](#lancement)
- [Structure du Projet](#structure-du-projet)
- [Aperçu de la Stack Technique](#aperçu-de-la-stack-technique)
- [Architecture Technique](#architecture-technique)
- [Documentation](#documentation)

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** 25.0 ou supérieur
- **Yarn** 4.12.0 ou supérieur

## Installation

1. Clonez le dépôt (si ce n'est pas déjà fait)
2. Installez toutes les dépendances à la racine :

```bash
yarn install
```

Cela installera les dépendances pour tous les packages du monorepo (backend, frontend, et api-contracts).

## Configuration

### Variables d'Environnement

Le backend et le frontend nécessitent tous deux des variables d'environnement configurées. Copiez les fichiers d'exemple et ajustez-les selon vos besoins.

#### Configuration Backend

1. Naviguez vers le package backend :

```bash
cd packages/backend
```

2. Copiez le fichier d'environnement d'exemple :

```bash
cp .env.example .env
```

3. Le fichier `.env` doit contenir :

```env
SERVER_ENV=development
SERVER_HTTP_HOST=0.0.0.0
SERVER_HTTP_PORT=3003
```

#### Configuration Frontend

1. Naviguez vers le package frontend :

```bash
cd packages/frontend
```

2. Copiez le fichier d'environnement d'exemple :

```bash
cp .env.example .env
```

3. Le fichier `.env` doit contenir :

```env
VITE_API_URL=http://localhost:3003
```

**Note** : Assurez-vous que `VITE_API_URL` correspond à l'adresse du serveur backend configurée dans le fichier `.env` du backend.

## Lancement

### Backend

Depuis le répertoire racine, vous pouvez démarrer le backend en mode développement avec :

```bash
yarn workspace backend dev
```

Ou naviguez vers le répertoire backend et exécutez :

```bash
cd packages/backend
yarn dev
```

Le serveur backend démarrera sur `http://localhost:3003` (ou l'hôte/port configuré dans votre fichier `.env`).

### Frontend

Depuis le répertoire racine, vous pouvez démarrer le serveur de développement frontend avec :

```bash
yarn workspace frontend dev
```

Ou naviguez vers le répertoire frontend et exécutez :

```bash
cd packages/frontend
yarn dev
```

Le frontend démarrera généralement sur `http://localhost:5173` (port par défaut de Vite).

## Structure du Projet

### Structure du Monorepo

```
saas-monorepo-template/
├── packages/
│   ├── api-contracts/     # Types TypeScript et DTOs partagés
│   ├── backend/           # Application backend
│   └── frontend/          # Application frontend
├── package.json           # Configuration du workspace racine
└── tsconfig.json          # Configuration TypeScript racine
```

Le projet utilise **Yarn workspaces** pour gérer plusieurs packages dans un seul dépôt. Le package `api-contracts` contient les types et DTOs partagés utilisés par le frontend et le backend pour assurer la sécurité des types dans toute l'application.

### Structure Backend (`packages/backend/src/`)

```
src/
├── config/                        # Configuration de l'application
│   ├── dependency-injections/    # Configuration du conteneur d'injection de dépendances
│   ├── env/                       # Configuration des variables d'environnement
│   └── http/                      # Configuration du serveur HTTP Fastify
├── domains/                       # Domaines métier (contextes délimités)
│   └── notes-management/         # Domaine d'exemple
│       ├── adapters/             # Ports et adaptateurs
│       │   ├── inbound/          # Contrôleurs et routeurs (points d'entrée)
│       │   └── outbound/         # Repositories et systèmes externes (ex: Bases de données)
│       ├── config/                # Configuration DI spécifique au domaine
│       ├── domain/                # Logique métier principale
│       │   ├── entities/         # Entités du domaine
│       │   ├── errors/           # Erreurs spécifiques au domaine
│       │   ├── use-cases/         # Cas d'usage applicatifs
│       │   └── value-objects/     # Objets valeur avec validation
│       └── mappers/               # Mappers DTO vers entité domaine
├── infrastructure/                # Implémentations externes
│   └── in-memory/                 # Implémentations des repositories en version mémoire
└── shared/                        # Classes de base et utilitaires partagés
    ├── Controller.ts              # Classe contrôleur de base
    ├── Entity.ts                 # Classe entité de base
    ├── HttpServer.ts             # Interface serveur HTTP
    ├── UseCase.ts                # Classe cas d'usage de base
    └── ValueObject.ts            # Classe objet valeur de base
```

Le backend suit les principes de l'**Architecture Hexagonale** (Ports et Adaptateurs) et du **Domain-Driven Design**. Chaque domaine est un contexte délimité contenant toute sa logique métier, ses cas d'usage et ses adaptateurs.

### Structure Frontend (`packages/frontend/src/`)

```
src/
├── components/                    # Composants React (Atomic Design)
│   ├── atoms/                    # Composants UI de base (boutons, inputs)
│   ├── molecules/                # Composants composites
│   ├── organisms/                # Composants complexes (en-têtes, listes)
│   ├── pages/                    # Composants de page
│   ├── templates/                # Modèles de mise en page
│   └── modal/                    # Composants modaux
├── config/                        # Configuration de l'application
│   └── index.ts                  # Config avec variables d'environnement
├── core/                          # Couche de logique métier principale
│   ├── di/                       # Conteneur d'injection de dépendances
│   ├── domain/                   # Couche domaine
│   │   ├── mappers/              # Mappers DTO vers domaine
│   │   ├── ports/                # Interfaces de passerelle (ports)
│   │   ├── types/                # Types du domaine
│   │   └── use-cases/            # Cas d'usage applicatifs
│   └── stores/                   # Stores de gestion d'état Zustand
├── infrastructure/                # Implémentations externes
│   └── gateways/                 # Implémentations de passerelle API (adaptateurs)
├── App.tsx                        # Composant racine avec routage
└── main.tsx                       # Point d'entrée de l'application
```

Le frontend suit un pattern architectural similaire au backend, avec une séparation claire entre la logique domaine, l'infrastructure et les couches de présentation. Les composants sont organisés selon les principes de l'**Atomic Design**.

## Aperçu de la Stack Technique

### Technologies Backend

| Technologie     | Version | Rôle                                                                                        |
| --------------- | ------- | ------------------------------------------------------------------------------------------- |
| **Node.js**     | 25.0+   | Environnement d'exécution JavaScript                                                        |
| **TypeScript**  | 5.9.3   | JavaScript avec typage statique                                                             |
| **Fastify**     | 5.6.2   | Framework web HTTP haute performance                                                        |
| **Effect**      | 3.19.13 | Bibliothèque de programmation fonctionnelle pour la gestion d'erreurs et les effets de bord |
| **Zod**         | 4.2.1   | Validation à l'exécution et définition de schémas                                           |
| **dotenv-safe** | 9.1.0   | Gestion des variables d'environnement avec validation                                       |
| **tsx**         | 4.21.0  | Exécution TypeScript pour le développement (rechargement à chaud)                           |
| **pino-pretty** | 13.1.3  | Formateur de logs pour le développement                                                     |

### Technologies Frontend

| Technologie        | Version | Rôle                                                       |
| ------------------ | ------- | ---------------------------------------------------------- |
| **React**          | 19.2.0  | Bibliothèque UI pour construire des interfaces utilisateur |
| **Vite**           | 7.2.4   | Outil de build rapide et serveur de développement          |
| **TypeScript**     | 5.9.3   | JavaScript avec typage statique                            |
| **Material-UI**    | 7.3.6   | Bibliothèque de composants React pour les composants UI    |
| **Zustand**        | 5.0.2   | Bibliothèque de gestion d'état légère                      |
| **React Router**   | 7.11.0  | Routage côté client pour les applications single-page      |
| **Axios**          | 1.13.2  | Client HTTP pour les requêtes API                          |
| **React Compiler** | 1.0.0   | Compilateur d'optimisation React (via Babel)               |
| **Emotion**        | 11.14+  | Bibliothèque de style CSS-in-JS (utilisée par Material-UI) |

### Outils de Développement

| Outil          | Version | Rôle                                              |
| -------------- | ------- | ------------------------------------------------- |
| **Yarn**       | 4.12.0  | Gestionnaire de paquets et gestion des workspaces |
| **ESLint**     | 9.39+   | Linting de code et vérification de qualité        |
| **Prettier**   | 3.7.4   | Formatage de code pour un style cohérent          |
| **TypeScript** | 5.9.3   | Vérification de types et compilation              |

## Architecture Technique

### Monorepo

Ce projet utilise une **structure monorepo** gérée par Yarn workspaces. Cette approche permet :

- **Partage de code** : Le package `api-contracts` fournit des types et DTOs partagés entre frontend et backend
- **Outillage cohérent** : Configurations ESLint, Prettier et TypeScript partagées
- **Gestion simplifiée des dépendances** : Un seul `yarn install` installe toutes les dépendances
- **Changements atomiques** : Les changements aux contrats partagés se propagent automatiquement à tous les consommateurs

### Architecture Backend

Le backend suit l'**Architecture Hexagonale** (également connue sous le nom de Ports et Adaptateurs) combinée aux principes du **Domain-Driven Design** :

- **Architecture Hexagonale** : Sépare la logique métier des préoccupations d'infrastructure via des ports (interfaces) et des adaptateurs (implémentations)
- **Domain-Driven Design** : Organise le code par domaines métier (contextes délimités), chaque domaine contenant ses propres entités, objets valeur, cas d'usage et erreurs
- **Clean Architecture** : Applique des règles de dépendance - les couches externes dépendent des couches internes, jamais l'inverse
- **Effect** : Utilise des patterns de programmation fonctionnelle pour une gestion d'erreurs composable et type-safe et des effets de bord

**Couches Clés :**

- **Couche Domaine** : Logique métier pure avec entités, objets valeur et cas d'usage
- **Adaptateurs Entrants** : Contrôleurs et routeurs HTTP (points d'entrée)
- **Adaptateurs Sortants** : Interfaces de dépôt (points de sortie)
- **Infrastructure** : Implémentations concrètes (base de données, services externes)
- **Partagé** : Classes de base et utilitaires communs

### Architecture Frontend

Le frontend suit un pattern architectural similaire pour assurer la cohérence :

- **Couche Domaine** : Logique métier avec cas d'usage, types domaine et mappers
- **Couche Infrastructure** : Passerelles API qui implémentent les ports du domaine
- **Couche Présentation** : Composants React organisés par Atomic Design
- **Gestion d'État** : Stores Zustand qui orchestrent les cas d'usage
- **Injection de Dépendances** : Pattern de conteneur pour gérer les dépendances

**Patterns Clés :**

- **Cas d'Usage** : Encapsulent la logique métier et orchestrent les opérations du domaine
- **Passerelles** : Abstraient la communication API derrière des interfaces (ports)
- **Stores** : Gèrent l'état de l'application et coordonnent l'exécution des cas d'usage
- **Atomic Design** : Organisation des composants des atomes aux templates

---

> 💡 **Conseil pour les Nouveaux Développeurs** : Commencez par explorer le domaine `notes-management` dans le backend (`packages/backend/src/domains/notes-management/`) car il sert d'exemple complet de l'architecture. Ensuite, examinez comment le frontend consomme ce domaine via le package `api-contracts` et implémente l'UI dans `packages/frontend/src/components/pages/Notes.tsx`.
