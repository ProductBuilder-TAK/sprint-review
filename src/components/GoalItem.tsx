import { useState } from 'react'

type GoalStatus = 'achieved' | 'partial' | 'missed' | 'pending'

interface GoalItemProps {
  text: string
  status: GoalStatus
  onStatusChange?: (status: GoalStatus) => void
}

const statusConfig: Record<GoalStatus, { label: string; pillClass: string; bgColor: string }> = {
  achieved: { label: 'Atteint', pillClass: 'pill--ok', bgColor: 'var(--ok-soft)' },
  partial: { label: 'Partiel', pillClass: 'pill--warn', bgColor: 'var(--warn-soft)' },
  missed: { label: 'Non atteint', pillClass: 'pill--bad', bgColor: 'var(--bad-soft)' },
  pending: { label: 'En cours', pillClass: 'pill--ghost', bgColor: 'transparent' },
}

const statusCycle: GoalStatus[] = ['pending', 'achieved', 'partial', 'missed']

export function GoalItem({ text, status, onStatusChange }: GoalItemProps) {
  const config = statusConfig[status]

  const cycleStatus = () => {
    if (!onStatusChange) return
    const currentIdx = statusCycle.indexOf(status)
    const nextIdx = (currentIdx + 1) % statusCycle.length
    onStatusChange(statusCycle[nextIdx])
  }

  return (
    <div
      className="flex items-center gap-3 px-3 py-3 rounded-md border border-line-soft transition-colors"
      style={{ background: config.bgColor }}
    >
      <button
        onClick={cycleStatus}
        className={`pill ${config.pillClass} cursor-pointer`}
        style={{ fontSize: 10, padding: '2px 8px' }}
      >
        {config.label}
      </button>
      <span className="flex-1 text-sm">{text}</span>
    </div>
  )
}

/* ========================================================================
 * Goal Input
 * ======================================================================== */
interface GoalInputProps {
  onAdd: (text: string) => void
  disabled?: boolean
}

export function GoalInput({ onAdd, disabled }: GoalInputProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text.trim())
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ajouter un sprint goal..."
        disabled={disabled}
        className="flex-1 px-3 py-2 text-sm border border-line-soft rounded-md bg-paper font-body outline-none focus:border-ink transition-colors"
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="pill pill--ok"
        style={{ cursor: text.trim() ? 'pointer' : 'not-allowed', opacity: text.trim() ? 1 : 0.5 }}
      >
        +
      </button>
    </form>
  )
}
