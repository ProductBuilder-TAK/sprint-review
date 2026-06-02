import { useCallback, useEffect, useState } from 'react'
import { FileUploader } from '@/components/FileUploader'
import { useAppStore } from '@/store/useAppStore'
import { toast } from 'sonner'

// @ts-expect-error — JS services not yet typed
import { transformAllDataV2, getAvailableSprints } from '@/services/dataTransformerV2.js'

export function AdminPage() {
  const csvData = useAppStore((s) => s.csvData) as Record<string, any> | null
  const csvLoaded = useAppStore((s) => s.csvLoaded)
  const selectedSprint = useAppStore((s) => s.selectedSprint)
  const selectedTeams = useAppStore((s) => s.selectedTeams)
  const availableSprints = useAppStore((s) => s.availableSprints)
  const availableTeams = useAppStore((s) => s.availableTeams)
  const setSelectedSprint = useAppStore((s) => s.setSelectedSprint)
  const setSelectedTeams = useAppStore((s) => s.setSelectedTeams)
  const setAvailableSprints = useAppStore((s) => s.setAvailableSprints)
  const setAvailableTeams = useAppStore((s) => s.setAvailableTeams)
  const setSprintMetrics = useAppStore((s) => s.setSprintMetrics)

  // Local state
  const [teamName, setTeamName] = useState('')
  const [sprintName, setSprintName] = useState('Sprint')

  // Quand CSV chargé → extraire sprints/teams
  useEffect(() => {
    if (!csvLoaded || !csvData) return
    try {
      const tickets = csvData.tickets || []
      const teams = (csvData.teams || []) as string[]

      const sprints = getAvailableSprints(tickets) as Array<{ sprint: number; label: string }>
      setAvailableSprints(sprints)
      setAvailableTeams(teams)

      // Auto-select single team
      if (teams.length === 1) {
        setSelectedTeams([teams[0]])
        setTeamName(teams[0])
      }

      // Select last sprint by default
      if (sprints.length > 0 && selectedSprint === null) {
        const defaultSprint = sprints[sprints.length - 1]
        setSelectedSprint(defaultSprint.sprint)
        setSprintName(defaultSprint.label)
      }
    } catch (err) {
      console.error('[AdminPage] Erreur extraction:', err)
      toast.error('Erreur lors de l\'analyse des données CSV')
    }
  }, [csvLoaded, csvData])

  // Transform quand sprint ou teams changent
  const transformData = useCallback(() => {
    if (!csvData || selectedSprint === null) return
    try {
      const result = transformAllDataV2(csvData, selectedSprint, selectedTeams.length > 0 ? selectedTeams : [])
      setSprintMetrics(result)
    } catch (err) {
      console.error('[AdminPage] Erreur transformation:', err)
      toast.error('Erreur lors de la transformation des données')
    }
  }, [csvData, selectedSprint, selectedTeams, setSprintMetrics])

  useEffect(() => {
    if (csvLoaded && selectedSprint !== null) transformData()
  }, [csvLoaded, selectedSprint, selectedTeams])

  const handleSprintSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const num = parseInt(e.target.value, 10)
    setSelectedSprint(num)
    const label = availableSprints.find((s) => s.sprint === num)?.label
    if (label) setSprintName(label)
  }

  const toggleTeam = (team: string) => {
    const next = selectedTeams.includes(team)
      ? selectedTeams.filter((t) => t !== team)
      : [...selectedTeams, team]
    setSelectedTeams(next)
  }

  // Story Points from sprintMetrics (auto-calculated)
  const sprintMetrics = useAppStore((s) => s.sprintMetrics) as Record<string, any> | null
  const storyPoints = sprintMetrics?.storyPoints

  return (
    <div className="admin-page">

      {/* ══════ COVER ══════ */}
      <div className="cover">
        <div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>§ 00 — Préparation</div>
          <h1 className="h-display">Préparation de la <em>review</em></h1>
          <p className="lede" style={{ marginTop: 18 }}>
            Charger les exports Jira, choisir le sprint à présenter, saisir les engagements — tout reste sur cette machine.
          </p>
        </div>
      </div>

      {/* ══════ § 01 — SOURCES ══════ */}
      <div className="section--editorial" style={{ borderTop: 0, paddingTop: 0, marginTop: 0 }}>
        <div className="section__head">
          <div className="section__title">
            <span className="section__num">§ 01 — Sources</span>
            <h2 className="h-section">Fichiers Jira</h2>
          </div>
        </div>

        <div className="admin-page__grid">
          {/* Colonne gauche : File Uploader */}
          <section className="admin-section">
            <div className="admin-section__content">
              <FileUploader />
            </div>
          </section>

          {/* Colonne droite : Informations Sprint */}
          <div className="admin-column">
            <section className="admin-section admin-section--compact">
              <div className="admin-section__header">
                <h3 className="admin-section__title">Informations Sprint</h3>
              </div>
              <div className="admin-section__content admin-section__content--compact">
                {!csvLoaded ? (
                  /* Avant CSV : inputs texte */
                  <form className="form">
                    <div className="form__group">
                      <label className="form__label" htmlFor="teamName">Nom de l'équipe</label>
                      <input
                        type="text"
                        id="teamName"
                        className="form__input"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="Ex: Data Platform"
                      />
                    </div>
                    <div className="form__group">
                      <label className="form__label" htmlFor="sprintName">Sprint</label>
                      <input
                        type="text"
                        id="sprintName"
                        className="form__input"
                        value={sprintName}
                        onChange={(e) => setSprintName(e.target.value)}
                        placeholder="Ex: Sprint5, PI 4.2, etc."
                      />
                    </div>
                  </form>
                ) : availableTeams.length > 1 ? (
                  /* Multi-teams : chips + select */
                  <form className="form">
                    <div className="form__group">
                      <label className="form__label">Équipes</label>
                      <div className="team-chips">
                        {availableTeams.map((team) => (
                          <button
                            key={team}
                            type="button"
                            className={`team-chip${selectedTeams.includes(team) ? ' team-chip--selected' : ''}`}
                            onClick={() => toggleTeam(team)}
                          >
                            {team}
                          </button>
                        ))}
                      </div>
                      <span className="form__hint">
                        {selectedTeams.length === 0
                          ? 'Toutes les équipes'
                          : `${selectedTeams.length} équipe(s) sélectionnée(s)`}
                      </span>
                    </div>
                    <div className="form__group">
                      <label className="form__label" htmlFor="sprintSelect">Sprint à afficher</label>
                      <select
                        id="sprintSelect"
                        className="form__input form__select"
                        value={selectedSprint ?? ''}
                        onChange={handleSprintSelect}
                      >
                        {availableSprints.map((s) => (
                          <option key={s.sprint} value={s.sprint}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                  </form>
                ) : (
                  /* Single team : input + select */
                  <form className="form">
                    <div className="form__group">
                      <label className="form__label" htmlFor="teamName">Nom de l'équipe</label>
                      <input
                        type="text"
                        id="teamName"
                        className="form__input"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="Ex: Data Platform"
                      />
                    </div>
                    <div className="form__group">
                      <label className="form__label" htmlFor="sprintSelect">Sprint à afficher</label>
                      <select
                        id="sprintSelect"
                        className="form__input form__select"
                        value={selectedSprint ?? ''}
                        onChange={handleSprintSelect}
                      >
                        {availableSprints.map((s) => (
                          <option key={s.sprint} value={s.sprint}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                  </form>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ══════ § 02 — ENGAGEMENTS ══════ */}
      <div className="section--editorial">
        <div className="section__head">
          <div className="section__title">
            <span className="section__num">§ 02 — Engagements</span>
            <h2 className="h-section">Story points par sprint</h2>
          </div>
          <span className="dek section__deck">
            Saisir les engagements et livrés sur six sprints — sert au calcul de vélocité recommandée.
          </span>
        </div>
        <div className="admin-section">
          <div className="admin-section__content admin-section__content--compact">
            {storyPoints?.isFromCSV ? (
              /* Auto-calculated from CSV */
              <>
                <div className="admin-notice admin-notice--success">
                  <span className="admin-notice__icon">✓</span>
                  <span className="admin-notice__text">Story Points calculés automatiquement depuis le CSV</span>
                </div>
                <div className="story-points-auto">
                  <div className="story-points-auto__header">
                    <span></span>
                    <span>Engagés</span>
                    <span>Livrés</span>
                    <span>%</span>
                  </div>
                  {storyPoints.sprints?.slice().reverse().slice(0, 3).map((s: any, i: number) => {
                    const cls = s.completion >= 90 ? 'success' : s.completion < 70 ? 'danger' : 'warning'
                    return (
                      <div key={s.label} className={`story-points-auto__row${i === 0 ? ' story-points-auto__row--current' : ''}`}>
                        <span className="story-points-auto__label">{s.label}</span>
                        <span className="story-points-auto__value">{s.committed}</span>
                        <span className="story-points-auto__value">{s.delivered}</span>
                        <span className={`story-points-auto__badge story-points-auto__badge--${cls}`}>{s.completion}%</span>
                      </div>
                    )
                  })}
                </div>
              </>
            ) : (
              /* Manual input (no CSV data) */
              <>
                <div className="admin-notice admin-notice--info">
                  <span className="admin-notice__icon">💡</span>
                  <span className="admin-notice__text">
                    Ajoutez la colonne "Issue Story Points" dans votre export EazyBI pour automatiser ce calcul.
                  </span>
                </div>
                <div className="story-points-grid">
                  <div className="story-points-grid__header">
                    <span></span>
                    <span>Engagés</span>
                    <span>Livrés</span>
                  </div>
                  {['Sprint actuel', 'Sprint -1', 'Sprint -2', 'Sprint -3', 'Sprint -4', 'Sprint -5'].map((label, i) => (
                    <div key={i} className={`story-points-grid__row${i === 0 ? ' story-points-grid__row--current' : ''}`}>
                      <span className="story-points-grid__label">{label}</span>
                      <input type="number" className="form__input form__input--small" min="0" placeholder="0" />
                      <input type="number" className="form__input form__input--small" min="0" placeholder="0" />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ══════ § 03 — ARCHIVES ══════ */}
      <div className="section--editorial">
        <div className="section__head">
          <div className="section__title">
            <span className="section__num">§ 03 — Archives</span>
            <h2 className="h-section">Snapshots sauvegardés</h2>
          </div>
          <button
            className="btn--editorial btn--editorial-small"
            disabled={!csvLoaded}
            onClick={() => toast.info('Snapshots en cours de développement')}
          >
            Sauvegarder <span className="arr">→</span>
          </button>
        </div>
        <div className="admin-section">
          <div className="admin-section__content">
            <div className="empty-state empty-state--small">
              <p>Aucun snapshot sauvegardé</p>
            </div>
          </div>
        </div>
      </div>

      {/* ══════ FINEPRINT ══════ */}
      <div className="fineprint">Tout reste local · Aucun serveur · Conforme RGPD</div>

    </div>
  )
}
