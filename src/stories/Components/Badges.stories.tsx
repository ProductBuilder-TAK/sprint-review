import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '@/components/ui/badge'

const meta: Meta<typeof Badge> = { title: 'Components/Badges', component: Badge }
export default meta

export const Variants: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-2 items-center">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
}

export const Pills: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="pill pill--ok">OK</span>
      <span className="pill pill--warn">Warning</span>
      <span className="pill pill--bad">Danger</span>
      <span className="pill pill--ghost">Ghost</span>
      <span className="pill pill--ok"><span className="pill__dot" />Avec dot</span>
    </div>
  ),
}

export const Tags: StoryObj = {
  render: () => (
    <div className="tagrow">
      <span className="tag"><b>2</b> Story</span>
      <span className="tag"><b>1</b> Bug</span>
      <span className="tag" style={{ color: 'var(--ok)' }}><b>−5</b> résolus</span>
      <span className="tag" style={{ color: 'var(--bad)' }}><b>+3</b> créés</span>
    </div>
  ),
}
