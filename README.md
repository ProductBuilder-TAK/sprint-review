# Sprint Review Dashboard (React)

Dashboard de sprint review pour les équipes agiles. Migration React + Tailwind + shadcn/ui du dashboard vanilla JS.

## Stack

- **React 19** + TypeScript
- **Vite 8** (build)
- **Tailwind CSS 4** (styling)
- **shadcn/ui** (composants UI)
- **Zustand** (state management)
- **React Router 7** (HashRouter pour GitHub Pages)
- **Recharts** (graphiques)
- **Storybook 10** (design system)

## Setup

```bash
npm install
npm run dev          # Dev server → http://localhost:5173/dash-react/
npm run build        # Build statique → dist/
npm run storybook    # Storybook → http://localhost:6006
```

## Structure

```
src/
├── app/           # App.tsx, routing
├── components/    # Composants React
│   ├── ui/        # shadcn/ui (Button, Badge, Card, Input, Select)
│   ├── charts/    # Recharts wrappers
│   └── kpi/       # KPI cards éditoriales
├── hooks/         # useSecretCode, useExport
├── pages/         # AdminPage, ReviewPage, ForecastPage, +2 secrètes
├── services/      # Logique métier (CSV parser, Monte Carlo, etc.)
├── store/         # Zustand store
├── stories/       # Storybook stories
├── styles/        # globals.css (Tailwind + tokens), editorial.css
└── utils/         # Formatters, validators, dates
```

## Design System

Le design system éditorial utilise :
- **Fraunces** (display/serif), **Inter** (body), **JetBrains Mono** (data)
- Palette chaude : sage, amber, rust, plum, sky
- Voir le Storybook pour la documentation complète

## Tests

```bash
npx vitest run     # Unit + component + story smoke tests
```

## Déploiement

GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`).
Push sur `main` → build → deploy automatique.

## Lovable

Ce projet est structuré pour être compatible avec Lovable :
- React fonctionnel + Tailwind
- shadcn/ui dans `src/components/ui/` avec `components.json`
- Structure Vite standard
- TypeScript
