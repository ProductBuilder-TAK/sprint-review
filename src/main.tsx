import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 1. Tailwind + tokens + shadcn
import './styles/globals.css'

// 2. Design system (editorial classes: .eyebrow, .kpi, .cover, .pill, etc.)
import './styles/design-system.css'
import './styles/custom.css'

// 3. Component CSS (vanilla classes used in JSX: .admin-section, .tab, .file-upload, etc.)
import './styles/components/navigation.css'
import './styles/components/file-upload.css'
import './styles/components/admin.css'
import './styles/components/tweaks.css'
import './styles/components/modal.css'
import './styles/components/loader.css'
import './styles/components/empty-state.css'
import './styles/components/gauge.css'
import './styles/components/charts.css'
import './styles/components/card.css'
import './styles/components/badge.css'
import './styles/components/input.css'
import './styles/components/toggle.css'
import './styles/components/review.css'
import './styles/components/forecast.css'
import './styles/components/shared.css'
import './styles/components/howmany.css'

import { App } from './app/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
