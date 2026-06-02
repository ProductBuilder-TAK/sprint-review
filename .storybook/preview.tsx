import type { Preview } from '@storybook/react-vite'

// Same CSS imports as main.tsx — tokens + design system + components
import '../src/styles/globals.css'
import '../src/styles/design-system.css'
import '../src/styles/custom.css'
import '../src/styles/components/navigation.css'
import '../src/styles/components/file-upload.css'
import '../src/styles/components/admin.css'
import '../src/styles/components/tweaks.css'
import '../src/styles/components/modal.css'
import '../src/styles/components/loader.css'
import '../src/styles/components/empty-state.css'
import '../src/styles/components/gauge.css'
import '../src/styles/components/charts.css'
import '../src/styles/components/card.css'
import '../src/styles/components/badge.css'
import '../src/styles/components/input.css'
import '../src/styles/components/toggle.css'
import '../src/styles/components/review.css'
import '../src/styles/components/forecast.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: 'todo' },
    backgrounds: {
      default: 'paper',
      values: [
        { name: 'paper', value: '#fafaf7' },
        { name: 'paper-2', value: '#f3f1ea' },
        { name: 'dark', value: '#14140f' },
      ],
    },
  },
}

export default preview
