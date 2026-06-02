import type { Meta, StoryObj } from '@storybook/react-vite'
import { KpiGrid } from '@/components/kpi/KpiGrid'
import { ChartCard } from '@/components/charts/ChartCard'

const meta: Meta = { title: 'Layout/Grids & Sections' }
export default meta

const Placeholder = ({ label, height = '80px' }: { label: string; height?: string }) => (
  <div className="bg-paper-2 border border-dashed border-line-soft rounded-md flex items-center justify-center text-xs text-ink-3" style={{ minHeight: height, padding: 16 }}>{label}</div>
)

export const KPIGrid3Cols: StoryObj = {
  name: 'kpi-grid (3 colonnes, bordures)',
  render: () => (
    <div className="kpi-grid">
      <div className="kpi"><div className="kpi__label">KPI 1</div><div className="kpi__num"><span className="tnum">42</span></div></div>
      <div className="kpi"><div className="kpi__label">KPI 2</div><div className="kpi__num"><span className="tnum">18</span></div></div>
      <div className="kpi"><div className="kpi__label">KPI 3</div><div className="kpi__num"><span className="tnum">7.2</span><em>j</em></div></div>
    </div>
  ),
}

export const Grid2Charts: StoryObj = {
  name: 'grid-2 (charts, bordures)',
  render: () => (
    <div className="grid-2">
      <ChartCard title="Throughput" subtitle="Tickets fermés par sprint"><Placeholder label="Chart area" height="200px" /></ChartCard>
      <ChartCard title="Cycle Time" subtitle="Temps moyen en jours"><Placeholder label="Chart area" height="200px" /></ChartCard>
    </div>
  ),
}

export const ScenariosGrid: StoryObj = {
  name: 'scenarios (3 cartes forecast)',
  render: () => (
    <div className="scenarios">
      <Placeholder label="Pessimiste (P15)" height="120px" />
      <Placeholder label="Réaliste (P50)" height="120px" />
      <Placeholder label="Optimiste (P85)" height="120px" />
    </div>
  ),
}

export const CoverSection: StoryObj = {
  name: 'cover (en-tête sprint)',
  render: () => (
    <div className="cover">
      <div>
        <div className="eyebrow">Sprint Review</div>
        <h1 className="h-display">Sprint <em>18</em></h1>
        <p className="lede">DATECH — IAML · 3 fév — 16 fév 2026</p>
      </div>
      <div className="cover__sprintno">18<sup>S</sup></div>
    </div>
  ),
}

export const EditorialSection: StoryObj = {
  render: () => (
    <div className="section--editorial">
      <div className="section__head">
        <div className="section__title">
          <div className="section__num">01 — Performance</div>
          <h2 className="h-section">Throughput</h2>
          <div className="section__deck">Tickets fermés par sprint sur les 6 derniers sprints</div>
        </div>
        <div className="toggle">
          <button aria-pressed="true">Tickets</button>
          <button aria-pressed="false">SP</button>
        </div>
      </div>
      <Placeholder label="Contenu de section" height="200px" />
    </div>
  ),
}

export const Legend: StoryObj = {
  render: () => (
    <div className="legend">
      <div className="legend__item"><span className="legend__sw" style={{ background: 'var(--color-sage)' }} />Throughput</div>
      <div className="legend__item"><span className="legend__sw" style={{ background: 'var(--color-amber)' }} />Cycle Time</div>
      <div className="legend__item"><span className="legend__sw" style={{ background: 'var(--color-rust)' }} />Bugs</div>
      <div className="legend__item"><span className="legend__sw" style={{ background: 'var(--color-plum)' }} />Story Points</div>
      <div className="legend__item"><span className="legend__sw" style={{ background: 'var(--color-sky)' }} />Velocity</div>
    </div>
  ),
}

export const Fineprint: StoryObj = {
  render: () => <div className="fineprint">*Données calculées à partir des exports EazyBI. Les estimations Monte Carlo sont basées sur 10 000 simulations.</div>,
}
