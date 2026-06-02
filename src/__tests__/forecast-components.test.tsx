import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ScenarioCard } from '@/components/ScenarioCard'

describe('ScenarioCard', () => {
  it('renders scenario name and percentile', () => {
    render(
      <ScenarioCard
        name="Pessimiste"
        percentile="P15"
        value={16}
        variant="p15"
      />
    )
    expect(screen.getByText('Pessimiste')).toBeDefined()
    expect(screen.getByText('P15')).toBeDefined()
    expect(screen.getByText('16')).toBeDefined()
  })

  it('renders description', () => {
    render(
      <ScenarioCard
        name="Réaliste"
        percentile="P50"
        value={22}
        description="Scénario le plus probable."
        variant="p50"
      />
    )
    expect(screen.getByText('Scénario le plus probable.')).toBeDefined()
  })

  it('renders all three variants', () => {
    const { container } = render(
      <div>
        <ScenarioCard name="P" percentile="P15" value={16} variant="p15" />
        <ScenarioCard name="R" percentile="P50" value={22} variant="p50" />
        <ScenarioCard name="O" percentile="P85" value={28} variant="p85" />
      </div>
    )
    expect(container.querySelector('.scenario--p15')).toBeTruthy()
    expect(container.querySelector('.scenario--p50')).toBeTruthy()
    expect(container.querySelector('.scenario--p85')).toBeTruthy()
  })
})
