# Règles Métier — Sprint Review Dashboard

## 1. Structure CSV et Parsing

### Sprint Review CSV (parseUnifiedCSV)
- Colonnes détectées case-insensitive : Issue key, Issue type, Issue created date, Issue status, Progress workdays, Issue closed date, Issue Sprints, Issue Sprint, Issue Story Points, Issue assignee
- **Statuts exclus** : `Backlog`, `A affiner`, `A cadrer` (regex case-insensitive)
- **Ticket terminé** : status match `/termin|done|fini|résolu|closed/i`
- **Sprint de fermeture** : dernier sprint de la liste "Issue Sprints"
- **Retourne** : `{ tickets[], teams[], summary }`

### Time in Status CSV (parseTimeInStatusCSV)
- 4 colonnes par statut : Average workdays, Issue created date, Issue Sprint, Issue Sprints
- **Retourne** : `{ tickets[], teams[], statuses[], summary }`

### Objet csvData unifié (construit par FileUploader)
```
{
  tickets: [...],           // depuis parseUnifiedCSV
  teams: string[],          // depuis parseUnifiedCSV
  teamsTimeInStatus: string[],
  commonTeams: string[],
  summary: {...},
  timeInStatus: {...}       // depuis parseTimeInStatusCSV (optionnel)
}
```

## 2. Sprint

- **Durée** : 14 jours calendaires (10 jours ouvrés)
- **Référence** : Sprint 18 = 2 février 2026
- **Formats supportés** : "Sprint 16", "Sprint 16 IAML – 05/01", "Tableau Sprint 14", "Engager 13", "Engager Q1-2026 2/7 - 17"
- **Fenêtre affichée** : 6 derniers sprints avec au moins 1 ticket fermé
- **selectedSprint = number** (pas string, pas label)

## 3. Cycle Time

- **Source primaire** : Time in Status (somme des temps de statut) = VRAI cycle time
- **Source fallback** : Progress workdays = lead time (moins précis)
- **Bugs exclus** du cycle time moyen (ont leur propre métrique MTTR)

## 4. Story Points

- **Committed** = SP de tous les tickets embarqués dans le sprint (fermés ou non)
- **Delivered** = SP des tickets fermés uniquement
- **Mid-sprint** = tickets single-sprint créés après le lundi de début
- **initialCommitted** = committed - midSprintSP
- **initialDelivered** = delivered - midSprintDeliveredSP
- **Vélocité recommandée** = P50 Monte Carlo (fallback = moyenne historique)

## 5. Bugs / DORA

- **Stock** = créés - résolus (cumulé)
- **MTTR** = Mean Time To Repair (cycle time des bugs)
- **Change Failure Rate** = bugs résolus / items livrés (%)

## 6. Mid-Sprint

- Ticket dans 1 seul sprint (isSingleSprint) + créé strictement APRÈS le lundi de début du sprint
- Stocké dans `midSprintAdditions[]` avec key, summary, type, storyPoints, createdDate, isFinished

## 7. transformAllDataV2 — Signature

```javascript
transformAllDataV2(
  rawData,          // objet csvData unifié { tickets, teams, timeInStatus }
  selectedSprint,   // number (numéro de sprint) ou null
  selectedTeams     // string[] (noms d'équipes) ou [] pour toutes
)
```

**Retourne** : `{ throughput, cycleTime, bugs, storyPoints, timeInStatus, wip, correlation, burndown }`

## 8. getAvailableSprints — Signature

```javascript
getAvailableSprints(tickets)  // prend les tickets directement, PAS le sprintData
```

**Retourne** : `[{ sprint: number, label: string }]`

## 9. Monte Carlo

- 10 000 simulations
- Échantillonne depuis le throughput historique des 6 derniers sprints
- P15 (pessimiste), P50 (réaliste), P85 (optimiste)

## 10. Secrets (Konami Codes)

| Code | Séquence | Effet |
|------|----------|-------|
| starac | ↑↑↓↓ | Affiche tab StarAc |
| howmany | ←←→→ | Affiche tab How Many |
| hide-secrets | ↓↓↑↑ | Masque les tabs secrets |
| individual | →→←← | Simulation individuelle |
| pearson | p-e-a-r | Corrélation Pearson dans Review |
| burndown | b-u-r-n | Burndown chart dans Review |
