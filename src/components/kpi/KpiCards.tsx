// @ts-expect-error — JS service
import { formatNumber, formatPercent } from '@/utils/formatters.js'

/* ========================================================================
 * Throughput KPI
 * ======================================================================== */
interface ThroughputKpiProps {
  value: number
  benchmark: number
  trend: number
}

export function ThroughputKpi({ value, benchmark, trend }: ThroughputKpiProps) {
  const trendArrow = trend > 0 ? '↑' : trend < 0 ? '↓' : '→'
  const trendClass = trend > 0 ? 'kpi__delta--up' : trend < 0 ? 'kpi__delta--down' : ''

  return (
    <div className="kpi kpi--feat">
      <div className="kpi__label">Throughput</div>
      <div className="kpi__num"><span className="tnum">{value}</span></div>
      <div className="kpi__hint">Méd. 6 sprints : {benchmark || '—'}</div>
      <div className="kpi__foot">
        <span className={`kpi__delta ${trendClass}`}>{trendArrow} {formatPercent(Math.abs(trend))}</span>
        <span>vs sprint précédent</span>
      </div>
    </div>
  )
}

/* ========================================================================
 * Cycle Time KPI
 * ======================================================================== */
interface CycleTimeKpiProps {
  avg: number
  median: number
  trend: number
}

export function CycleTimeKpi({ avg, median, trend }: CycleTimeKpiProps) {
  const trendArrow = trend > 0 ? '↑' : trend < 0 ? '↓' : '→'
  // For cycle time, down is good
  const trendClass = trend < 0 ? 'kpi__delta--up' : trend > 0 ? 'kpi__delta--down' : ''

  return (
    <div className="kpi">
      <div className="kpi__label">Cycle time<sup style={{ fontSize: 9, marginLeft: 3 }}>★</sup></div>
      <div className="kpi__num"><span className="tnum">{formatNumber(avg, 1)}</span><em>j</em></div>
      <div className="kpi__sub">
        <span><b>{formatNumber(median, 1)}j</b> médiane</span>
        <span><b>{formatNumber(avg, 1)}j</b> moyenne</span>
      </div>
      <div className="kpi__foot">
        <span className={`kpi__delta ${trendClass}`}>{trendArrow} {formatPercent(Math.abs(trend))}</span>
        <span>★ hors bugs</span>
      </div>
    </div>
  )
}

/* ========================================================================
 * Stock Bugs KPI
 * ======================================================================== */
interface BugsKpiProps {
  stock: number
  created: number
  closed: number
}

export function BugsKpi({ stock, created, closed }: BugsKpiProps) {
  const net = created - closed
  const netArrow = net > 0 ? '↑' : net < 0 ? '↓' : '→'
  const netClass = net <= 0 ? 'kpi__delta--up' : 'kpi__delta--down'

  return (
    <div className="kpi">
      <div className="kpi__label">Stock de bugs</div>
      <div className="kpi__num"><span className="tnum">{stock}</span></div>
      <div className="tagrow">
        <span className="tag" style={{ color: 'var(--bad)' }}><b>+{created}</b> créés</span>
        <span className="tag" style={{ color: 'var(--ok)' }}><b>−{closed}</b> résolus</span>
      </div>
      <div className="kpi__foot">
        <span className={`kpi__delta ${netClass}`}>{netArrow} {Math.abs(net)}</span>
        <span>net cette quinzaine</span>
      </div>
    </div>
  )
}

/* ========================================================================
 * Mid-Sprint KPI
 * ======================================================================== */
interface MidSprintKpiProps {
  count: number
  throughputValue: number
  additions: Array<{ type: string }>
}

export function MidSprintKpi({ count, throughputValue, additions }: MidSprintKpiProps) {
  const byType: Record<string, number> = {}
  additions.forEach((t) => { byType[t.type] = (byType[t.type] || 0) + 1 })
  const typeBreakdown = Object.entries(byType).sort((a, b) => b[1] - a[1])
  const pct = throughputValue ? Math.round((count / throughputValue) * 100) : 0

  return (
    <div className="kpi">
      <div className="kpi__label">Ajouts mid‑sprint</div>
      <div className="kpi__num"><span className="tnum">{count}</span></div>
      {typeBreakdown.length > 0 ? (
        <div className="tagrow">
          {typeBreakdown.map(([type, cnt]) => (
            <span key={type} className="tag"><b>{cnt}</b> {type}</span>
          ))}
        </div>
      ) : (
        <div className="kpi__hint" style={{ color: 'var(--ok)' }}>Scope préservé</div>
      )}
      <div className="kpi__foot"><span>Sur {throughputValue || '—'} tickets — soit {pct} % du scope</span></div>
    </div>
  )
}

/* ========================================================================
 * MTTR KPI
 * ======================================================================== */
interface MttrKpiProps {
  value: number
  median: number
  periodAvg: number
}

export function MttrKpi({ value, median, periodAvg }: MttrKpiProps) {
  return (
    <div className="kpi">
      <div className="kpi__label">MTTR</div>
      {value > 0 ? (
        <>
          <div className="kpi__num"><span className="tnum">{formatNumber(value, 1)}</span><em>j</em></div>
          <div className="kpi__sub">
            <span><b>{formatNumber(value, 1)}j</b> moy.</span>
            <span><b>{formatNumber(median, 1)}j</b> médiane</span>
          </div>
          <div className="kpi__foot"><span>Moy. 6 sprints : {formatNumber(periodAvg, 1)} j</span></div>
        </>
      ) : (
        <div className="kpi__hint">Aucun bug résolu</div>
      )}
    </div>
  )
}

/* ========================================================================
 * Change Failure Rate KPI
 * ======================================================================== */
interface CfrKpiProps {
  value: number
  periodAvg: number
  bugsClosed: number
  itemsDelivered: number
}

export function CfrKpi({ value, periodAvg, bugsClosed, itemsDelivered }: CfrKpiProps) {
  const cfrColor = value < 15 ? 'var(--ok)' : value < 30 ? 'var(--warn)' : 'var(--bad)'
  const cfrDelta = periodAvg ? Math.round(value - periodAvg) : null
  const cfrDeltaArrow = cfrDelta && cfrDelta > 0 ? '↑' : cfrDelta && cfrDelta < 0 ? '↓' : '→'
  const cfrDeltaClass = cfrDelta && cfrDelta <= 0 ? 'kpi__delta--up' : 'kpi__delta--down'

  return (
    <div className="kpi">
      <div className="kpi__label">Change Failure Rate</div>
      <div className="kpi__num"><span className="tnum" style={{ color: cfrColor }}>{formatNumber(value, 1)}</span><em>%</em></div>
      <div className="kpi__hint">{bugsClosed} bugs / {itemsDelivered} items livrés</div>
      {cfrDelta !== null && (
        <div className="kpi__foot">
          <span className={`kpi__delta ${cfrDeltaClass}`}>{cfrDeltaArrow} {Math.abs(cfrDelta)}%</span>
          <span>vs moy. 6 sprints</span>
        </div>
      )}
    </div>
  )
}
