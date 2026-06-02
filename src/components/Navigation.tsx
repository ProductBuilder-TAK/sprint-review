/**
 * Navigation — reproduction exacte de Navigation.js vanilla render()
 * Classes: .masthead, .masthead__top, .masthead__brand, .masthead__brand-mark,
 *          .masthead__edition, .masthead__nav, .navigation, .tab, .tab__num,
 *          .tab--secret, .tab--right
 */
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'

// Exact config from vanilla SECTIONS_CONFIG
const SECTIONS_CONFIG: Record<string, { id: string; label: string; num: string; secret?: string }> = {
  admin:   { id: 'admin',   label: 'Préparation', num: '§ 01' },
  review:  { id: 'review',  label: 'Review',      num: '§ 02' },
  forecast:{ id: 'forecast', label: 'Forecast',   num: '§ 03' },
  shared:  { id: 'shared',  label: 'StarAc',      num: '§ ★', secret: 'starac' },
  howmany: { id: 'howmany', label: 'How Many',    num: '§ #', secret: 'howmany' },
}

const BASE_SECTIONS = ['admin', 'review', 'forecast']

// Route mapping: section id → hash path
const ROUTES: Record<string, string> = {
  admin: '/admin', review: '/review', forecast: '/forecast',
  shared: '/shared', howmany: '/howmany',
}

interface NavigationProps {
  onShowRgpd?: () => void
}

export function Navigation({ onShowRgpd }: NavigationProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const unlockedSecrets = useAppStore((s) => s.unlockedSecrets)
  const availableSprints = useAppStore((s) => s.availableSprints)
  const selectedSprint = useAppStore((s) => s.selectedSprint)
  const availableTeams = useAppStore((s) => s.availableTeams)
  const selectedTeams = useAppStore((s) => s.selectedTeams)

  // Build visible sections list (same logic as vanilla render())
  const visibleSections = [...BASE_SECTIONS]
  if (unlockedSecrets.has('starac')) visibleSections.push('shared')
  if (unlockedSecrets.has('howmany')) visibleSections.push('howmany')

  // Active section from current route
  const activeSection = location.pathname.replace('/', '') || 'admin'

  // Edition line
  const sprintLabel = availableSprints.find((s) => s.sprint === selectedSprint)?.label || ''
  const teamName = selectedTeams.length === 1
    ? selectedTeams[0]
    : (availableTeams.length === 1 ? availableTeams[0] : '')

  return (
    <header id="app-header" className="masthead">
      {/* Top bar */}
      <div className="masthead__top">
        <div className="masthead__brand">
          <span className="masthead__brand-mark">Sprint Review</span>
        </div>
        <div className="masthead__edition" id="header-sprint-info">
          {sprintLabel && (
            <>
              <strong>{sprintLabel}</strong>
              {teamName && ` — ${teamName}`}
            </>
          )}
        </div>
      </div>

      {/* Navigation tabs — exact same HTML as vanilla render() */}
      <nav id="app-nav" className="masthead__nav">
        <div className="navigation" role="navigation" aria-label="Navigation principale">
          {visibleSections.map((sectionId) => {
            const section = SECTIONS_CONFIG[sectionId]
            if (!section) return null

            const isActive = activeSection === sectionId
            const isSecret = !!section.secret

            return (
              <button
                key={sectionId}
                className={`tab${isSecret ? ' tab--secret' : ''}`}
                data-section={sectionId}
                data-action="navigate"
                role="tab"
                aria-selected={isActive}
                onClick={() => navigate(ROUTES[sectionId])}
              >
                <span className="tab__num">{section.num}</span>
                {section.label}
              </button>
            )
          })}

          {/* RGPD button (far right) */}
          <button
            className="tab tab--right"
            data-action="show-rgpd"
            title="RGPD"
            onClick={onShowRgpd}
          >
            <span className="tab__num">¶</span>
            RGPD
          </button>
        </div>
      </nav>
    </header>
  )
}
