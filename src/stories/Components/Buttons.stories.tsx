import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof Button> = { title: 'Components/Buttons', component: Button }
export default meta

export const Variants: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon"><span className="material-symbols-outlined" style={{ fontSize: 16 }}>settings</span></Button>
    </div>
  ),
}

export const WithIcons: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button><span className="material-symbols-outlined mr-2" style={{ fontSize: 16 }}>download</span>Exporter PDF</Button>
      <Button variant="outline"><span className="material-symbols-outlined mr-2" style={{ fontSize: 16 }}>upload</span>Importer CSV</Button>
    </div>
  ),
}

export const States: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
}
