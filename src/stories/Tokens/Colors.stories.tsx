import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = { title: 'Tokens/Colors' }
export default meta

const Swatch = ({ name, cssVar, hex }: { name: string; cssVar: string; hex: string }) => (
  <div className="flex items-center gap-3 py-2">
    <div className="w-12 h-12 rounded-md border border-line-soft" style={{ background: `var(${cssVar})` }} />
    <div>
      <div className="font-medium text-sm">{name}</div>
      <code className="text-xs text-ink-3">{cssVar}</code>
      <span className="text-xs text-ink-mute ml-2">{hex}</span>
    </div>
  </div>
)

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h3 className="h-card mb-3 pb-2" style={{ borderBottom: '1px solid var(--color-line-hair)' }}>{title}</h3>
    {children}
  </div>
)

export const Surfaces: StoryObj = {
  render: () => (
    <Section title="Surfaces">
      <Swatch name="Paper" cssVar="--color-paper" hex="#fafaf7" />
      <Swatch name="Paper 2" cssVar="--color-paper-2" hex="#f3f1ea" />
      <Swatch name="Paper 3" cssVar="--color-paper-3" hex="#e9e5d9" />
    </Section>
  ),
}

export const Ink: StoryObj = {
  render: () => (
    <Section title="Encre (texte)">
      <Swatch name="Ink" cssVar="--color-ink" hex="#1a1a17" />
      <Swatch name="Ink 2" cssVar="--color-ink-2" hex="#3a3a34" />
      <Swatch name="Ink 3" cssVar="--color-ink-3" hex="#6b6b62" />
      <Swatch name="Ink Mute" cssVar="--color-ink-mute" hex="#9a9a8e" />
    </Section>
  ),
}

export const Accents: StoryObj = {
  render: () => (
    <Section title="Accents">
      <Swatch name="Sage" cssVar="--color-sage" hex="#6b8559" />
      <Swatch name="Sage 2" cssVar="--color-sage-2" hex="#9bb38a" />
      <Swatch name="Sage Soft" cssVar="--color-sage-soft" hex="#dee5d4" />
      <Swatch name="Forest" cssVar="--color-forest" hex="#2a3e2d" />
      <Swatch name="Amber" cssVar="--color-amber" hex="#c9a47a" />
      <Swatch name="Amber Soft" cssVar="--color-amber-soft" hex="#ecddc7" />
      <Swatch name="Ochre" cssVar="--color-ochre" hex="#a8865c" />
      <Swatch name="Rust" cssVar="--color-rust" hex="#b07564" />
      <Swatch name="Rust Soft" cssVar="--color-rust-soft" hex="#e8d3ca" />
      <Swatch name="Plum" cssVar="--color-plum" hex="#8a6e7e" />
      <Swatch name="Plum Soft" cssVar="--color-plum-soft" hex="#ddd0d6" />
      <Swatch name="Sky" cssVar="--color-sky" hex="#8499ad" />
      <Swatch name="Sky Soft" cssVar="--color-sky-soft" hex="#d6dde4" />
    </Section>
  ),
}

export const Semantic: StoryObj = {
  render: () => (
    <Section title="Sémantique">
      <Swatch name="OK (success)" cssVar="--ok" hex="sage" />
      <Swatch name="OK Soft" cssVar="--ok-soft" hex="sage-soft" />
      <Swatch name="Warn" cssVar="--warn" hex="ochre" />
      <Swatch name="Warn Soft" cssVar="--warn-soft" hex="amber-soft" />
      <Swatch name="Bad" cssVar="--bad" hex="rust" />
      <Swatch name="Bad Soft" cssVar="--bad-soft" hex="rust-soft" />
    </Section>
  ),
}
