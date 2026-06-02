import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = { title: 'Tokens/Typography' }
export default meta

export const FontFamilies: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-10">
      <div>
        <div className="eyebrow mb-3">Display / Serif</div>
        <div className="font-display text-4xl" style={{ fontWeight: 300, letterSpacing: '-0.025em', fontVariationSettings: '"opsz" 144' }}>Fraunces — Sprint Review</div>
        <div className="font-display text-4xl italic" style={{ fontWeight: 300, color: 'var(--color-sage)', marginTop: 8 }}>Fraunces Italic</div>
        <code className="text-xs text-ink-mute mt-2 block">--font-display</code>
      </div>
      <div>
        <div className="eyebrow mb-3">Body / Sans-serif</div>
        {[400, 500, 600, 700].map((w) => (
          <div key={w} className="font-body text-base" style={{ fontWeight: w, marginTop: 4 }}>Inter {w} — The quick brown fox jumps over the lazy dog.</div>
        ))}
        <code className="text-xs text-ink-mute mt-2 block">--font-body</code>
      </div>
      <div>
        <div className="eyebrow mb-3">Monospace / Data</div>
        {[400, 500, 600].map((w) => (
          <div key={w} className="font-mono text-sm" style={{ fontWeight: w, marginTop: 4 }}>JetBrains Mono {w} — 12.5j | 3.2% | Sprint 18</div>
        ))}
        <code className="text-xs text-ink-mute mt-2 block">--font-mono</code>
      </div>
    </div>
  ),
}

export const EditorialClasses: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-7">
      <div><code className="text-xs text-ink-3">.eyebrow — Mono 10.5px, weight 500, uppercase, 0.16em</code><div className="eyebrow mt-1">Section Label</div></div>
      <div><code className="text-xs text-ink-3">.h-display — Fraunces clamp(40-68px), weight 400</code><div className="h-display mt-1">Sprint <em>18</em></div></div>
      <div><code className="text-xs text-ink-3">.h-section — Fraunces 22px, weight 500</code><h2 className="h-section mt-1">Section Heading</h2></div>
      <div><code className="text-xs text-ink-3">.h-card — Fraunces 18px, weight 500</code><h3 className="h-card mt-1">Card Heading</h3></div>
      <div><code className="text-xs text-ink-3">.lede — Fraunces italic 17px, weight 300, ink-2</code><p className="lede mt-1">Introduction text qui présente le contexte.</p></div>
      <div><code className="text-xs text-ink-3">.dek — 13px, ink-3</code><p className="dek mt-1">Description secondaire sous les titres</p></div>
      <div><code className="text-xs text-ink-3">.kicker — Fraunces italic 13px, ochre</code><span className="kicker mt-1 block">— annotation éditoriale</span></div>
      <div><code className="text-xs text-ink-3">.fineprint — Fraunces italic 12px, ink-mute, centered</code><div className="fineprint mt-4">*Données calculées à partir des exports EazyBI.</div></div>
      <div><code className="text-xs text-ink-3">.section__num — Mono 11px, ochre, uppercase</code><div className="section__num mt-1">01 — Throughput</div></div>
    </div>
  ),
}

export const KPINumbers: StoryObj = {
  name: 'KPI Number Styles',
  render: () => (
    <div className="flex flex-col gap-6">
      <div><code className="text-xs text-ink-3">.kpi__label</code><div className="kpi__label mt-1">Throughput</div></div>
      <div><code className="text-xs text-ink-3">.kpi__num — Fraunces clamp(48-64px), weight 300</code><div className="kpi__num mt-1"><span className="tnum">24</span></div></div>
      <div><code className="text-xs text-ink-3">.kpi__num em — italic, 0.6em, ink-3</code><div className="kpi__num mt-1"><span className="tnum">5.2</span><em>j</em></div></div>
      <div><code className="text-xs text-ink-3">.kpi__delta — Mono 11.5px, weight 500</code><div className="flex gap-4 mt-1"><span className="kpi__delta kpi__delta--up">↑ 12%</span><span className="kpi__delta kpi__delta--down">↓ 8%</span></div></div>
      <div><code className="text-xs text-ink-3">.scenario__big — Fraunces 88px, weight 300</code><div className="scenario__big mt-1">42</div></div>
      <div><code className="text-xs text-ink-3">.cover__sprintno — Fraunces italic clamp(80-140px)</code><div className="cover__sprintno mt-1">18<sup>S</sup></div></div>
    </div>
  ),
}
