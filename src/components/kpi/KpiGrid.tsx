interface KpiGridProps {
  children: React.ReactNode
}

export function KpiGrid({ children }: KpiGridProps) {
  return <div className="kpi-grid">{children}</div>
}
