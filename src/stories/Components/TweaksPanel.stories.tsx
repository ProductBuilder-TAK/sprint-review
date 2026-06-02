import type { Meta, StoryObj } from '@storybook/react-vite'
import { TweaksPanel } from '@/components/TweaksPanel'

const meta: Meta<typeof TweaksPanel> = { title: 'Components/TweaksPanel', component: TweaksPanel }
export default meta

export const Default: StoryObj = {
  render: () => <TweaksPanel />,
}
