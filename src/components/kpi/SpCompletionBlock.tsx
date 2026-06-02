// @ts-expect-error — JS service
import { formatNumber } from '@/utils/formatters.js'

interface SpCompletionBlockProps {
  currentDelivered: number
  currentCommitted: number
  currentCompletion: number
  currentSprintLabel: string
  initialCommitted: number
  initialDelivered: number
  initialCompletion: number
  midSprintSP: number
  avgDelivered?: number
  avgCompletion?: number
  previousSprintsCount?: number
  recommendedVelocity?: number
}

function getCompletionClass(pct: number): string {
  if (pct >= 90) return 'success'
  if (pct < 70) return 'danger'
  return 'warning'
}

function pillClass(cls: string): string {
  return cls === 'success' ? 'ok' : cls === 'danger' ? 'bad' : 'warn'
}

export function SpCompletionBlock({
  currentDelivered,
  currentCommitted,
  currentCompletion,
  currentSprintLabel,
  initialCommitted,
  initialDelivered,
  initialCompletion,
  midSprintSP,
  avgDelivered,
  avgCompletion,
  previousSprintsCount,
  recommendedVelocity,
}: SpCompletionBlockProps) {
  const initialClass = getCompletionClass(initialCompletion)
  const totalClass = getCompletionClass(currentCompletion)
  const hasMidSprint = midSprintSP > 0

  return (
    <div className="sp" style={{ border: '1px solid var(--color-line)' }}>
      <div>
        <div className="eyebrow">Story points livrés</div>
        <div className="sp__hero">
          <span className="v tnum">{currentDelivered}</span>
          <span className="frac">/ {currentCommitted} engagés</span>
        </div>
      </div>

      <div className="sp__bar">
        <div className="sp__bar-fill" style={{ width: `${currentCompletion}%` }} />
      </div>

      <div className="sp__completion-cards">
        <div className="kpi kpi--completion">
          <div className="kpi__label">Engagement initial</div>
          <div className="kpi__num"><span className="tnum">{initialCompletion}</span><em>%</em></div>
          <div className="kpi__hint">{initialDelivered} / {initialCommitted} sp</div>
          <div className="kpi__foot">
            <span className={`pill pill--${pillClass(initialClass)}`} style={{ fontSize: 10, padding: '2px 8px' }}>
              {hasMidSprint ? `Hors ${midSprintSP} sp ajoutés` : 'Scope préservé'}
            </span>
          </div>
        </div>
        <div className="kpi kpi--completion">
          <div className="kpi__label">Complétion totale</div>
          <div className="kpi__num"><span className="tnum">{currentCompletion}</span><em>%</em></div>
          <div className="kpi__hint">{currentDelivered} / {currentCommitted} sp</div>
          <div className="kpi__foot">
            <span className={`pill pill--${pillClass(totalClass)}`} style={{ fontSize: 10, padding: '2px 8px' }}>
              {currentSprintLabel || 'Sprint actuel'}
            </span>
          </div>
        </div>
      </div>

      <div className="sp__rows">
        {previousSprintsCount && previousSprintsCount > 0 && (
          <>
            <div className="sp__row">
              <span>Moyenne {previousSprintsCount} sprints précédents</span>
              <b>{formatNumber(avgDelivered || 0, 1)} sp</b>
              <span className="dek">{avgCompletion}%</span>
            </div>
            {recommendedVelocity && (
              <div className="sp__row">
                <span>Vélocité recommandée</span>
                <b>{recommendedVelocity} sp</b>
                <span className="kicker">— suggéré</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
