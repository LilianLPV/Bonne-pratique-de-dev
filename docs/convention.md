# Convention - Bonne pratique de dév

## 1️⃣ Conventions & Hygiène 

### a) Nommage clair et cohérent
- Toujours en **anglais** pour la cohérence.
- Styles :
  - Variables / fonctions : `camelCase` → `userList`, `calculateTotal()`
  - Fichiers : `kebab-case` → `user-list.component.ts`, `user.service.ts`
- README.md clair à la racine expliquant :
  - Comment lancer le projet
  - Architecture globale
  - Structure des dossiers
### b) Structure du dépôt

```
Bonne-pratique-de-dev/
├── README.md
├── .gitignore
├── package.json
│
├── frontend/
│ ├── angular.json
│ ├── tsconfig.json
│ ├── .eslintrc.js
│ ├── .prettierrc
│ ├── package.json
│ │ ├── docs/
│ │ │ └── convention.md
│ ├── src/
│ │ ├── main.ts
│ │ ├── index.html
│ │ ├── styles.css
│ │ │
│ │ ├── app/
│ │ │ ├── core/
│ │ │ │ └── services/
│ │ │ │     └── api-client-service.ts
│ │ │ │
│ │ │ ├── features/
│ │ │ │ ├── homepage/
│ │ │ │ │ ├── homepage-component.ts
│ │ │ │ │ ├── homepage-component.html
│ │ │ │ │ └── homepage-component.css
│ │ │ │ │
│ │ │ │ └── game/
│ │ │ │     ├── game-component.ts
│ │ │ │     ├── game-component.html
│ │ │ │     └── game-component.css
│ │ │
│ │ ├── assets/
│ │ │ ├── images/
│ │ │ └── favicons/
│ │ │
│ │ ├── environments/
│
├── backend/
│ ├── tsconfig.json
│ ├── .eslintrc.js
│ ├── .prettierrc
│ ├── package.json
│ │
│ ├── src/
│ │ ├── app.ts               
│ │ ├── server.ts           
│ │ │
│ │ ├── routes/
│ │ │ ├── index.ts            
│ │ │ └── game.routes.ts      
│ │ │
│ │ ├── controllers/
│ │ │ └── game.controller.ts  
│ │ │
│ │ ├── services/
│ │ │ └── game.service.ts     
│ │ │
│ │ ├── models/
│ │ │ └── game.model.ts       
│ │ │
│ │ ├── middlewares/
│ │ │ ├── error-handler.ts  
│ │ └── utils/
│ │     └── logger.ts         


```

### c) Formatter et linter
- Angular CLI + ESLint + Prettier :
```bash
ng lint
npm run format
```

