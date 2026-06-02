interface ChartCardProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  children: React.ReactNode
  legend?: React.ReactNode
}

export function ChartCard({ title, subtitle, actions, children, legend }: ChartCardProps) {
  return (
    <div className="grid-cell">
      <div className="cell__head">
        <div className="cell__title">
          <h3 className="h-card">{title}</h3>
          {subtitle && <span className="dek">{subtitle}</span>}
        </div>
        {actions}
      </div>
      <div className="cell__chart">{children}</div>
      {legend}
    </div>
  )
}
