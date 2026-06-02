import { useState } from 'react'
import { useAppStore } from '@/store/useAppStore'

const PALETTE_LABELS: Record<string, string> = { earth: 'Sauge', rose: 'Rose', ink: 'Encre' }
const DENSITY_LABELS: Record<string, string> = { compact: 'Dense', normal: 'Normal', cozy: 'Aéré' }
const TYPO_LABELS: Record<string, string> = { editorial: 'Éditorial', sans: 'Sans', mono: 'Mono' }

export function TweaksPanel() {
  const [open, setOpen] = useState(false)
  const theme = useAppStore((s) => s.theme)
  const palette = useAppStore((s) => s.palette)
  const density = useAppStore((s) => s.density)
  const typo = useAppStore((s) => s.typo)
  const setTheme = useAppStore((s) => s.setTheme)
  const setPalette = useAppStore((s) => s.setPalette)
  const setDensity = useAppStore((s) => s.setDensity)
  const setTypo = useAppStore((s) => s.setTypo)

  return (
    <>
      {/* FAB button */}
      <button
        id="twk-fab"
        className="twk-fab"
        aria-label="Personnaliser"
        title="Personnaliser l'affichage"
        onClick={() => setOpen(!open)}
      >
        ⚙
      </button>

      {/* Panel */}
      <aside className="twk-panel" id="twk-panel" hidden={!open}>
        <div className="twk-hd">
          <b>Tweaks</b>
          <button className="twk-x" aria-label="Fermer" onClick={() => setOpen(false)}>&times;</button>
        </div>
        <div className="twk-body">
          <div className="twk-section">Palette</div>
          <div className="twk-seg" data-tweak="palette">
            {(['earth', 'rose', 'ink'] as const).map((p) => (
              <button
                key={p}
                data-value={p}
                aria-checked={palette === p ? 'true' : 'false'}
                onClick={() => setPalette(p)}
              >
                {PALETTE_LABELS[p]}
              </button>
            ))}
          </div>

          <div className="twk-section">Densité</div>
          <div className="twk-seg" data-tweak="density">
            {(['compact', 'normal', 'cozy'] as const).map((d) => (
              <button
                key={d}
                data-value={d}
                aria-checked={density === d ? 'true' : 'false'}
                onClick={() => setDensity(d)}
              >
                {DENSITY_LABELS[d]}
              </button>
            ))}
          </div>

          <div className="twk-section">Typographie</div>
          <div className="twk-seg" data-tweak="typo">
            {(['editorial', 'sans', 'mono'] as const).map((t) => (
              <button
                key={t}
                data-value={t}
                aria-checked={typo === t ? 'true' : 'false'}
                onClick={() => setTypo(t)}
              >
                {TYPO_LABELS[t]}
              </button>
            ))}
          </div>

          <div className="twk-section">Thème</div>
          <label className="twk-toggle">
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
            />
            <span>Mode sombre</span>
          </label>
        </div>
      </aside>
    </>
  )
}
