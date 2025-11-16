# Angular TypeScript App

## Description
1. Application Angular écrite en TypeScript. Fournit les scripts npm standards pour développement, build et tests.

## Prérequis
1. `Node.js` (v18+ recommandé)
2. `npm` (v9+)
3. `@angular/cli` (optionnel pour usage direct de `ng`)

## Installation
1. Cloner le dépôt.
2. Installer les dépendances :
   `npm install`


## Commandes principales

### Front-end (Angular)
1. Se placer à la racine du projet (contenant `package.json` et `angular.json`) :
    - `cd frontend`
2. Installer les dépendances (si pas déjà fait) :
    - `npm install`
3. Démarrer le serveur de développement :
    - `ng serve`
6. Lint :
    - `npm run lint`
7. Format (si configuré) :
    - `npm run format`

### Back-end (Express)
1. Se placer dans le dossier back-end :
    - `cd backend`
2. Installer les dépendances (si pas déjà fait) :
    - `npm install`
3. Démarrer le serveur :
    - `node server.js`


Remarque : sur Windows, exécuter les mêmes commandes dans PowerShell ou CMD. Vérifier les scripts définis dans chaque `package.json` si les commandes diffèrent.

## Structure du projet
1. `src/` — code source Angular (modules, composants, services)
2. backend/server.js — serveur backend simple (Express.js)

## Bonnes pratiques
1. Respecter les règles de lint et formatter avant commit. Voir [`convention.md`](/docs/convention.md)
2. Tester les composants critiques avec tests unitaires.
3. Documenter les nouvelles fonctionnalités dans `README.md` ou un changelog.

## fichier d'environnement 
- `.env` dans le dossier backend pour les variables sensibles (APIkey): on l'a push même si on sais que c'est pas bien mais comme ça tu peux tester le site mon ptit cyrilou :)