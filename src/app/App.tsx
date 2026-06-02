import { lazy, Suspense, useEffect, useState } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import { Navigation } from '@/components/Navigation'
import { SecretCodeListener } from '@/components/SecretCodeListener'
import { TweaksPanel } from '@/components/TweaksPanel'
import { useAppStore } from '@/store/useAppStore'

const AdminPage = lazy(() => import('@/pages/AdminPage').then((m) => ({ default: m.AdminPage })))
const ReviewPage = lazy(() => import('@/pages/ReviewPage').then((m) => ({ default: m.ReviewPage })))
const ForecastPage = lazy(() => import('@/pages/ForecastPage').then((m) => ({ default: m.ForecastPage })))
const SharedContributorsPage = lazy(() => import('@/pages/SharedContributorsPage').then((m) => ({ default: m.SharedContributorsPage })))
const HowManyPage = lazy(() => import('@/pages/HowManyPage').then((m) => ({ default: m.HowManyPage })))

function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
      <div className="loader" />
      <span className="dek">Chargement…</span>
    </div>
  )
}

function ThemeApplier() {
  const theme = useAppStore((s) => s.theme)
  const palette = useAppStore((s) => s.palette)
  const density = useAppStore((s) => s.density)
  const typo = useAppStore((s) => s.typo)

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme === 'dark' ? 'dark' : '')
    root.classList.toggle('dark', theme === 'dark')
    root.setAttribute('data-palette', palette === 'earth' ? '' : palette)
    root.setAttribute('data-density', density === 'normal' ? '' : density)
    root.setAttribute('data-typo', typo === 'editorial' ? '' : typo)
  }, [theme, palette, density, typo])

  return null
}

export function App() {
  const [showRgpd, setShowRgpd] = useState(false)

  return (
    <HashRouter>
      <div id="app" className="app">
        <ThemeApplier />
        <SecretCodeListener />

        {/* MASTHEAD */}
        <Navigation onShowRgpd={() => setShowRgpd(true)} />

        {/* MAIN WRAPPER */}
        <div className="app__main-wrapper">

          {/* RGPD MODAL */}
          {showRgpd && (
            <div className="modal-overlay modal-overlay--visible" id="rgpd-modal" onClick={() => setShowRgpd(false)}>
              <div className="modal" role="dialog" aria-labelledby="modal-title" aria-modal="true" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                  <h2 className="modal__title" id="modal-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Conformité RGPD
                  </h2>
                  <button className="modal__close" aria-label="Fermer" onClick={() => setShowRgpd(false)}>&times;</button>
                </div>
                <div className="modal__body">
                  <h2>1. Résumé exécutif</h2>
                  <p>Le Sprint Review Dashboard est une application <strong>100% client-side</strong> (sans serveur) qui traite des données exportées depuis Jira pour visualiser les métriques d'équipe Agile. L'application présente un <strong>risque RGPD faible</strong> en raison de son architecture locale.</p>
                  <table>
                    <thead><tr><th>Critère</th><th>Statut</th></tr></thead>
                    <tbody>
                      <tr><td>Minimisation des données</td><td>Conforme</td></tr>
                      <tr><td>Stockage local uniquement</td><td>Conforme</td></tr>
                      <tr><td>Pas de transfert externe</td><td>Conforme</td></tr>
                      <tr><td>Traitement de données personnelles</td><td>Conforme</td></tr>
                      <tr><td>Droit à l'effacement</td><td>Conforme</td></tr>
                    </tbody>
                  </table>

                  <h2>2. Données traitées</h2>
                  <h3>Données non personnelles</h3>
                  <ul>
                    <li>Identifiants de tickets (PHX-101, etc.)</li>
                    <li>Types de tickets (Story, Bug, Task)</li>
                    <li>Statuts (To Do, In Progress, Done)</li>
                    <li>Story Points, Noms de sprints</li>
                    <li>Dates de création/résolution</li>
                    <li>Temps passé dans chaque statut</li>
                  </ul>
                  <h3>Données personnelles (Article 4 RGPD)</h3>
                  <table>
                    <thead><tr><th>Donnée</th><th>Catégorie</th><th>Sensibilité</th></tr></thead>
                    <tbody>
                      <tr><td>Nom de l'assigné</td><td>Donnée d'identification</td><td>Faible</td></tr>
                      <tr><td>Performance individuelle</td><td>Donnée dérivée</td><td>Moyenne</td></tr>
                      <tr><td>Vélocité par contributeur</td><td>Donnée dérivée</td><td>Moyenne</td></tr>
                    </tbody>
                  </table>
                  <p><strong>Note</strong> : ces données sont dissimulées mais contenues dans le rapport EazyBI.</p>

                  <h2>3. Architecture et flux de données</h2>
                  <pre>{`┌─────────────────────────────────────────────────────────────┐
│                     NAVIGATEUR LOCAL                        │
│  ┌─────────┐    ┌──────────────────┐    ┌───────────────┐  │
│  │ Fichier │───>│ Sprint Review    │───>│ localStorage  │  │
│  │ CSV     │    │ Dashboard        │    │ (optionnel)   │  │
│  └─────────┘    └──────────────────┘    └───────────────┘  │
│                          │                                  │
│                          v                                  │
│                 ┌──────────────────┐                        │
│                 │ Affichage écran  │                        │
│                 └──────────────────┘                        │
└─────────────────────────────────────────────────────────────┘
                           │
                           ✗ Aucun transfert réseau
                           ✗ Aucun serveur externe
                           ✗ Aucun cookie tiers`}</pre>
                  <h3>Points clés</h3>
                  <ul>
                    <li><strong>Pas de backend</strong> : Aucune donnée n'est envoyée à un serveur</li>
                    <li><strong>Pas de tracking</strong> : Aucun outil d'analytics</li>
                    <li><strong>Pas de cookies tiers</strong> : Uniquement localStorage navigateur</li>
                    <li><strong>Données éphémères</strong> : Les données sont perdues à la fermeture (sauf snapshot explicite)</li>
                  </ul>

                  <h2>4. Conformité par article RGPD</h2>
                  <h3>Article 5 - Principes de traitement</h3>
                  <table>
                    <thead><tr><th>Principe</th><th>Conformité</th><th>Commentaire</th></tr></thead>
                    <tbody>
                      <tr><td>Licéité, loyauté, transparence</td><td>Conforme</td><td>Traitement local, visible par l'utilisateur</td></tr>
                      <tr><td>Limitation des finalités</td><td>Conforme</td><td>Uniquement pour Sprint Review</td></tr>
                      <tr><td>Minimisation des données</td><td>Conforme</td><td>Seules les données Jira nécessaires</td></tr>
                      <tr><td>Exactitude</td><td>Conforme</td><td>Données importées directement de Jira</td></tr>
                      <tr><td>Limitation de conservation</td><td>Conforme</td><td>Données non persistées par défaut</td></tr>
                    </tbody>
                  </table>
                  <h3>Article 17 - Droit à l'effacement</h3>
                  <table>
                    <thead><tr><th>Mécanisme</th><th>Disponible</th></tr></thead>
                    <tbody>
                      <tr><td>Fermer le navigateur</td><td>Données en mémoire effacées</td></tr>
                      <tr><td>Vider le localStorage</td><td>Snapshots supprimés</td></tr>
                      <tr><td>Ne pas importer les données</td><td>Aucun traitement</td></tr>
                    </tbody>
                  </table>

                  <h2>5. Conclusion</h2>
                  <p>Le Sprint Review Dashboard est <strong>conforme aux exigences RGPD</strong> grâce à son architecture 100% locale qui élimine les risques liés au transfert et au stockage distant de données.</p>
                </div>
              </div>
            </div>
          )}

          {/* MAIN CONTENT */}
          <main id="app-main" className="main">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/review" element={<ReviewPage />} />
                <Route path="/forecast" element={<ForecastPage />} />
                <Route path="/shared" element={<SharedContributorsPage />} />
                <Route path="/howmany" element={<HowManyPage />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Routes>
            </Suspense>
          </main>

        </div>

        <TweaksPanel />
        <Toaster position="bottom-right" />
      </div>
    </HashRouter>
  )
}
