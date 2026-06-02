import { useState, useRef, useEffect } from 'react'
import { useExport } from '@/hooks/useExport'
import { Button } from '@/components/ui/button'

interface ExportMenuProps {
  targetId: string
}

export function ExportMenu({ targetId }: ExportMenuProps) {
  const { exportPdf, exportMarkdown, isExporting } = useExport()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div ref={menuRef} style={{ position: 'relative' }}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(!open)}
        disabled={isExporting}
        className="rounded-full"
      >
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>
        {isExporting ? 'Export...' : 'Exporter'}
      </Button>

      {open && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '100%',
            marginTop: 4,
            background: 'var(--color-paper)',
            border: '1px solid var(--color-line-soft)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 100,
            minWidth: 180,
            padding: '4px 0',
          }}
        >
          <button
            className="flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-paper-2 transition-colors text-left"
            onClick={() => { exportPdf(targetId); setOpen(false) }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>picture_as_pdf</span>
            Export PDF
          </button>
          <button
            className="flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-paper-2 transition-colors text-left"
            onClick={() => { exportMarkdown(); setOpen(false) }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>description</span>
            Export Markdown
          </button>
        </div>
      )}
    </div>
  )
}
