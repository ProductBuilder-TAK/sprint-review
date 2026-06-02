import { useCallback, useState, useRef } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { toast } from 'sonner'

// @ts-expect-error — JS services not yet typed
import { parseUnifiedCSV, parseTimeInStatusCSV } from '@/services/csvParserV2.js'

interface FileSpec {
  key: string
  name: string
  optional: boolean
}

const REQUIRED_FILES: FileSpec[] = [
  { key: 'unified', name: 'Sprint Review.csv', optional: false },
  { key: 'timeInStatus', name: 'Time in status.csv', optional: false },
]

interface FileState {
  loaded: boolean
  data: unknown
}

function identifyFileType(filename: string): FileSpec | null {
  const lower = filename.toLowerCase()
  if (lower.includes('time') && lower.includes('status')) {
    return REQUIRED_FILES.find((f) => f.key === 'timeInStatus')!
  }
  // Any other CSV = unified (sprint review data)
  return REQUIRED_FILES.find((f) => f.key === 'unified')!
}

// Module-level storage for parsed data (survives re-renders)
let parsedFiles: Record<string, unknown> = {}

export function FileUploader() {
  const setCsvData = useAppStore((s) => s.setCsvData)
  const setCsvLoaded = useAppStore((s) => s.setCsvLoaded)

  const [fileStates, setFileStates] = useState<Record<string, FileState>>(() => {
    const init: Record<string, FileState> = {}
    REQUIRED_FILES.forEach((f) => { init[f.key] = { loaded: false, data: null } })
    return init
  })
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Build unified csvData and dispatch to store (same shape as vanilla)
  const buildAndStore = useCallback((files: Record<string, FileState>) => {
    const unified = files.unified
    if (!unified?.loaded || !unified.data) return

    const unifiedData = unified.data as { tickets: unknown[]; teams: string[]; summary: unknown }
    const tisData = files.timeInStatus?.loaded ? files.timeInStatus.data : null

    const csvData: Record<string, unknown> = {
      tickets: unifiedData.tickets || [],
      teams: unifiedData.teams || [],
      summary: unifiedData.summary || null,
    }

    if (tisData) {
      csvData.timeInStatus = tisData
      const tisTeams = (tisData as { teams?: string[] }).teams || []
      csvData.teamsTimeInStatus = tisTeams
      const commonTeams = (csvData.teams as string[]).filter((t: string) => tisTeams.includes(t))
      csvData.commonTeams = commonTeams
    }

    setCsvData(csvData)
    setCsvLoaded(true)
  }, [setCsvData, setCsvLoaded])

  const processFiles = useCallback(async (fileList: File[]) => {
    setIsLoading(true)
    setErrors([])

    for (const file of fileList) {
      const spec = identifyFileType(file.name)
      if (!spec) {
        setErrors((prev) => [...prev, `Fichier non reconnu : ${file.name}`])
        continue
      }

      try {
        const text = await file.text()
        const parsed = spec.key === 'timeInStatus'
          ? parseTimeInStatusCSV(text)
          : parseUnifiedCSV(text)

        parsedFiles[spec.key] = parsed

        setFileStates((prev) => {
          const next = { ...prev, [spec.key]: { loaded: true, data: parsed } }
          // Build unified csvData after state update
          setTimeout(() => buildAndStore(next), 0)
          return next
        })

        toast.success(`${file.name} chargé`)
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Erreur de parsing'
        setErrors((prev) => [...prev, `${file.name} : ${msg}`])
        toast.error(`Erreur : ${file.name}`)
      }
    }

    setIsLoading(false)
  }, [buildAndStore])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length) processFiles(files)
  }, [processFiles])

  const handleReset = (key: string) => {
    delete parsedFiles[key]
    setFileStates((prev) => {
      const next = { ...prev, [key]: { loaded: false, data: null } }
      if (key === 'unified') {
        setCsvData(null)
        setCsvLoaded(false)
      } else {
        buildAndStore(next)
      }
      return next
    })
    toast.info('Fichier réinitialisé')
  }

  // Checklist counts
  const mandatoryFiles = REQUIRED_FILES.filter((f) => !f.optional)
  const loadedMandatory = mandatoryFiles.filter((f) => fileStates[f.key]?.loaded).length

  return (
    <div className="file-upload">
      {/* Dropzone */}
      <div
        className={`file-upload__dropzone${isDragging ? ' file-upload__dropzone--active' : ''}`}
        onDragEnter={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragOver={(e) => { e.preventDefault() }}
        onDragLeave={(e) => {
          if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)) {
            setIsDragging(false)
          }
        }}
        onDrop={handleDrop}
      >
        <div className="dropzone__icon">↗</div>
        <strong style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500, marginBottom: 6 }}>
          Déposer les CSV ici
        </strong>
        <div className="dek" style={{ marginBottom: 14 }}>
          Sprint Review &amp; Time in Status — exports EazyBI
        </div>
        <label className="btn--editorial btn--editorial-small" style={{ display: 'inline-flex', cursor: 'pointer' }}>
          Parcourir <span className="arr">→</span>
          <input
            ref={inputRef}
            type="file"
            className="file-upload__input"
            accept=".csv"
            multiple
            onChange={(e) => {
              if (e.target.files?.length) {
                processFiles(Array.from(e.target.files))
                e.target.value = '' // Reset pour re-sélection
              }
            }}
          />
        </label>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="file-upload__loading">
          <div className="loader loader--small"></div>
          <span>Chargement en cours...</span>
        </div>
      )}

      {/* Errors */}
      {errors.length > 0 && (
        <div className="file-upload__errors">
          {errors.map((err, i) => (
            <div key={i} className="file-upload__error">
              <span className="file-upload__error-icon">⚠️</span>
              <span>{err}</span>
            </div>
          ))}
        </div>
      )}

      {/* Checklist */}
      <div className="file-upload__checklist">
        <div className="file-upload__checklist-header">
          <span>Fichiers</span>
          <span className="file-upload__checklist-count">{loadedMandatory}/{mandatoryFiles.length} requis</span>
        </div>
        <ul className="file-upload__checklist-list">
          {REQUIRED_FILES.map((file) => {
            const isLoaded = fileStates[file.key]?.loaded
            const isOptional = file.optional
            return (
              <li
                key={file.key}
                className={`file-upload__checklist-item${isLoaded ? ' file-upload__checklist-item--loaded' : ''}${isOptional ? ' file-upload__checklist-item--optional' : ''}`}
              >
                <span className="file-upload__checklist-icon">
                  {isLoaded ? '✓' : '○'}
                </span>
                <span className="file-upload__checklist-name">
                  {file.name}
                  {isOptional && <span className="file-upload__optional-tag"> (optionnel)</span>}
                </span>
                {isLoaded && (
                  <button
                    className="file-upload__checklist-reset"
                    title="Réinitialiser"
                    onClick={() => handleReset(file.key)}
                  >
                    ✕
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
