interface KpiCardProps {
  label: string
  value: number | string
  unit?: string
  hint?: string
  trend?: number | null
  trendIsGood?: 'up' | 'down'
  featured?: boolean
  children?: React.ReactNode
}

export function KpiCard({ label, value, unit, hint, trend, trendIsGood, featured, children }: KpiCardProps) {
  const trendArrow = trend && trend > 0 ? '↑' : trend && trend < 0 ? '↓' : '→'
  let trendClass = ''
  if (trend && trend > 0) {
    trendClass = trendIsGood === 'up' ? 'kpi__delta--up' : 'kpi__delta--down'
  } else if (trend && trend < 0) {
    trendClass = trendIsGood === 'down' ? 'kpi__delta--up' : 'kpi__delta--down'
  }

  return (
    <div className={`kpi ${featured ? 'kpi--feat' : ''}`}>
      <div className="kpi__label">{label}</div>
      <div className="kpi__num">
        <span className="tnum">{value}</span>
        {unit && <em>{unit}</em>}
      </div>
      {hint && <div className="kpi__hint">{hint}</div>}
      {children}
      {trend !== undefined && trend !== null && (
        <div className="kpi__foot">
          <span className={`kpi__delta ${trendClass}`}>
            {trendArrow} {Math.abs(trend)}%
          </span>
          <span>vs sprint précédent</span>
        </div>
      )}
    </div>
  )
}
