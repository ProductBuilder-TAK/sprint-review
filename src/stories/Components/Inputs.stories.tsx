import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '@/components/ui/input'

const meta: Meta<typeof Input> = { title: 'Components/Inputs', component: Input }
export default meta

export const TextInputs: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <div>
        <label className="text-sm font-medium text-ink-3 mb-1 block">Label standard</label>
        <Input placeholder="Placeholder..." />
      </div>
      <div>
        <label className="text-sm font-medium text-ink-3 mb-1 block">Avec valeur</label>
        <Input defaultValue="Sprint 18" />
      </div>
      <div>
        <label className="text-sm font-medium text-ink-3 mb-1 block">Désactivé</label>
        <Input disabled defaultValue="Non modifiable" />
      </div>
    </div>
  ),
}

export const Toggles: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <div className="eyebrow mb-2">Toggle éditorial</div>
        <div className="toggle">
          <button aria-pressed="true">Tickets</button>
          <button aria-pressed="false">SP</button>
        </div>
      </div>
      <div>
        <div className="eyebrow mb-2">3 options</div>
        <div className="toggle">
          <button aria-pressed="false">compact</button>
          <button aria-pressed="true">normal</button>
          <button aria-pressed="false">cozy</button>
        </div>
      </div>
    </div>
  ),
}
