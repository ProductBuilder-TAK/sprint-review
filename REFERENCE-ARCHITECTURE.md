# Architecture — Sprint Review Dashboard (Vanilla)

## Data Flow

```
CSV Files (drag-drop)
    │
    ▼
FileUploader._processFiles()
    ├── detectFileType() → 'unified' ou 'timeInStatus'
    ├── parseUnifiedCSV(text)   → { tickets, teams, summary }
    └── parseTimeInStatusCSV(text) → { tickets, teams, statuses, summary }
    │
    ▼
FileUploader._handleAllLoaded()
    │ Construit l'objet csvData unifié :
    │ {
    │   tickets,
    │   teams,
    │   teamsTimeInStatus,
    │   commonTeams,
    │   summary,
    │   timeInStatus   ← optionnel
    │ }
    │
    ├── store.dispatch({ csvData, csvLoaded: true })
    └── eventBus.emit('files:allLoaded', { data: csvData })
    │
    ▼
AdminPage._handleFilesLoaded(csvData)
    ├── Extraire teams → availableTeams
    ├── getAvailableSprints(csvData.tickets) → availableSprints
    ├── selectedSprint = dernier sprint (number)
    └── transformAllDataV2(csvData, selectedSprint, selectedTeams)
         │
         ▼
    store.dispatch({ sprintMetrics })
         │
         ▼
ReviewPage (subscribe to store.sprintMetrics)
    ├── Render KPIs
    ├── Render Charts (Chart.js)
    ├── Render SP Completion
    └── Render Goals
```

## Modules et dépendances

### Core (à remplacer par React)
- `store.js` → Zustand
- `router.js` → React Router (HashRouter)
- `eventBus.js` → Zustand actions + callbacks
- `config.js` → Portable (retirer cssVar, chartPalette)

### Services (portables tels quels)
- `csvParserV2.js` (938 lignes) — aucune dépendance DOM
- `dataTransformerV2.js` (1039 lignes) — importe csvParserV2, monteCarloService, burndownService
- `metricsCalculator.js` (525 lignes) — autosuffisant
- `monteCarloService.js` (514 lignes) — autosuffisant
- `burndownService.js` (200 lignes) — importe sprintDates
- `forecastDataService.js` (304 lignes) — importe csvParserV2, monteCarloService
- `howManyService.js` (539 lignes) — autosuffisant, PAS de default export
- `sprintCalculator.js` (512 lignes) — importe config
- `storageService.js` (491 lignes) — importe config, eventBus (à neutraliser)

### Utils (portables tels quels)
- `dateUtils.js` (190 lignes) — importe config
- `validators.js` (217 lignes) — autosuffisant
- `formatters.js` (249 lignes) — importe config
- `sprintDates.js` (136 lignes) — autosuffisant

### Services DOM (à réécrire)
- `pdfExporter.js` (921 lignes) — DOM lourd, jsPDF + html2canvas
- `tweaksService.js` (154 lignes) → composant React + Zustand

### Composants vanilla (à réécrire en React)
- `Component.js` — classe de base (string templates)
- `FileUploader.js` — drag-drop + checklist
- `Navigation.js` — masthead + tabs
- `MetricCard.js`, `Gauge.js`, `StoryPointsGauge.js`
- `charts/BaseChart.js`, `BarChart.js`, `TrendChart.js`, `DoughnutChart.js`

### Pages vanilla (à réécrire en React)
- `AdminPage.js` (~1164 lignes) — upload, config, story points, snapshots
- `ReviewPage.js` (~1395 lignes) — KPIs, charts, goals, SP
- `ForecastPage.js` (~899 lignes) — Monte Carlo, scénarios
- `SharedContributorsPage.js` (~345 lignes) — leaderboard
- `HowManyPage.js` (~443 lignes) — simulation capacité

## Fichiers CSS (structure)
```
css/
├── variables.css      → @theme Tailwind v4
├── base.css           → editorial.css (@apply + custom)
├── layout.css         → Tailwind utilities
├── components/
│   ├── badge.css      → shadcn Badge + pills custom
│   ├── button.css     → shadcn Button + btn--editorial custom
│   ├── card.css       → shadcn Card + metric-card custom
│   ├── charts.css     → Recharts wrappers
│   ├── empty-state.css
│   ├── file-upload.css → custom (garder les classes)
│   ├── gauge.css       → SVG custom
│   ├── input.css       → shadcn Input + form custom
│   ├── loader.css
│   ├── navigation.css  → custom (garder les classes)
│   ├── toggle.css      → custom (.toggle éditorial)
│   └── tweaks.css      → custom (.twk-*)
└── pages/
    ├── admin.css       → custom (.admin-*)
    ├── review.css      → custom (.sp-*, .review-*)
    ├── forecast.css
    ├── howmany.css
    └── shared.css
```

## Erreurs de la migration précédente (à NE PAS reproduire)

1. **csvData stocké en 2 morceaux** au lieu de l'objet unifié → cassait transformAllDataV2
2. **transformAllDataV2 appelé avec 4 args** au lieu de 3 → signature incorrecte
3. **getAvailableSprints(sprintData)** au lieu de **getAvailableSprints(tickets)** → double agrégation
4. **selectedSprint = string** au lieu de **number** → comparaisons cassées
5. **Tab "Admin"** au lieu de **"Préparation"** — textes approximés au lieu d'être copiés exactement
6. **Dropzone simplifiée** — manque le bouton "Parcourir →", le texte "Sprint Review & Time in Status — exports EazyBI"
7. **Pas de panel "Informations Sprint"** à droite de la dropzone
8. **Pas de section Story Points** (§ 02 — Engagements)
9. **Pas de section Snapshots** (§ 03 — Archives)
10. **Pas de RGPD** modal ni tab
11. **Cover "Admin"** au lieu de **"Préparation de la review"**
