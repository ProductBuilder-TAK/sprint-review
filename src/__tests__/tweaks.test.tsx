import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TweaksPanel } from '@/components/TweaksPanel'

describe('TweaksPanel', () => {
  it('renders FAB button when closed', () => {
    render(<TweaksPanel />)
    const btn = screen.getByLabelText('Personnaliser')
    expect(btn).toBeDefined()
  })

  it('opens panel on click', () => {
    render(<TweaksPanel />)
    fireEvent.click(screen.getByLabelText('Personnaliser'))
    expect(screen.getByText('Tweaks')).toBeDefined()
    expect(screen.getByText('Mode sombre')).toBeDefined()
  })

  it('shows palette options with correct labels', () => {
    render(<TweaksPanel />)
    fireEvent.click(screen.getByLabelText('Personnaliser'))
    expect(screen.getByText('Sauge')).toBeDefined()
    expect(screen.getByText('Rose')).toBeDefined()
    expect(screen.getByText('Encre')).toBeDefined()
  })

  it('shows density options with correct labels', () => {
    render(<TweaksPanel />)
    fireEvent.click(screen.getByLabelText('Personnaliser'))
    expect(screen.getByText('Dense')).toBeDefined()
    expect(screen.getByText('Normal')).toBeDefined()
    expect(screen.getByText('Aéré')).toBeDefined()
  })

  it('shows typography options with correct labels', () => {
    render(<TweaksPanel />)
    fireEvent.click(screen.getByLabelText('Personnaliser'))
    expect(screen.getByText('Éditorial')).toBeDefined()
    expect(screen.getByText('Sans')).toBeDefined()
    expect(screen.getByText('Mono')).toBeDefined()
  })
})
