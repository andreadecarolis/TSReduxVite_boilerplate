# TSReduxVite_boilerplate

## Installation

```
git clone <repository-url>
cd project-directory
npm install
npm run dev
```

## Scripts

- `npm run dev` -> Starts the frontend development server
- `npm run build` -> Creates the production build
- `npm run mapserver` -> Starts the server to retrieve map tiles
- `npm run scenariomgr` -> Starts the server to handle scenarios
- `npm run sttserver` -> Starts the server to convert speech to text
- `npm run all` -> Starts all servers at once
- `npm run generate:store xxx` -> Generate a new store for redux following our standards
- `npm run generate:component xxx` -> Generate a new component following our standards

## Structure

- `/public` -> The static files
- `/scripts` -> The scripts generateComponent.js and generateStore.js
- `/src` -> The source code
- `.env` -> The environment variables
