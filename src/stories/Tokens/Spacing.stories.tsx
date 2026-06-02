import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = { title: 'Tokens/Spacing & Shadows' }
export default meta

const spacingTokens = [
  ['0.25rem', '4px'], ['0.5rem', '8px'], ['0.75rem', '12px'],
  ['1rem', '16px'], ['1.25rem', '20px'], ['1.5rem', '24px'],
  ['2rem', '32px'], ['2.5rem', '40px'], ['3rem', '48px'],
  ['4rem', '64px'], ['5rem', '80px'],
]

export const SpacingScale: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-2">
      {spacingTokens.map(([rem, px]) => (
        <div key={rem} className="flex items-center gap-4">
          <code className="text-xs text-ink-3 w-28">{rem} / {px}</code>
          <div className="h-4 rounded-sm" style={{ width: rem, background: 'var(--color-sage)' }} />
        </div>
      ))}
    </div>
  ),
}

export const Shadows: StoryObj = {
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      {['shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-card', 'shadow-card-hover'].map((s) => (
        <div key={s} className={`p-6 bg-paper rounded-md ${s}`}>
          <code className="text-xs text-ink-3">{s}</code>
        </div>
      ))}
    </div>
  ),
}

export const BorderRadius: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-6 items-end">
      {[['sm', '4px'], ['md', '6px'], ['lg', '10px'], ['xl', '12px'], ['2xl', '16px'], ['full', '9999px']].map(([name, px]) => (
        <div key={name} className="text-center">
          <div className="w-16 h-16 border-2 border-sage" style={{ borderRadius: `var(--radius-${name})`, background: 'var(--color-sage-soft)' }} />
          <code className="text-xs text-ink-3 mt-2 block">--radius-{name}</code>
          <div className="text-xs text-ink-mute">{px}</div>
        </div>
      ))}
    </div>
  ),
}
