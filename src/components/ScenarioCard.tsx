interface ScenarioCardProps {
  name: string
  percentile: string
  value: number | string
  sub?: string
  description?: string
  variant: 'p15' | 'p50' | 'p85'
}

export function ScenarioCard({ name, percentile, value, sub, description, variant }: ScenarioCardProps) {
  return (
    <div className={`scenario scenario--${variant}`}>
      <div className="scenario__head">
        <div className="scenario__name">{name}</div>
        <div className="scenario__conf">{percentile}</div>
      </div>
      <div className="scenario__big">{value}</div>
      {sub && (
        <div className="scenario__sub" dangerouslySetInnerHTML={{ __html: sub }} />
      )}
      {description && <div className="scenario__desc">{description}</div>}
    </div>
  )
}
