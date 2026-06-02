import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScenarioCard } from '@/components/ScenarioCard'

const meta: Meta<typeof ScenarioCard> = { title: 'Components/Scenarios', component: ScenarioCard }
export default meta

export const MonteCarloGrid: StoryObj = {
  name: 'Monte Carlo (3 cartes)',
  render: () => (
    <div className="scenarios">
      <ScenarioCard name="Pessimiste" percentile="P15" value={16} sub="<b>16</b> tickets minimum" description="Dans le pire des cas raisonnable." variant="p15" />
      <ScenarioCard name="Réaliste" percentile="P50" value={22} sub="<b>22</b> tickets — scénario le plus probable" description="1 chance sur 2 de livrer au moins ce volume." variant="p50" />
      <ScenarioCard name="Optimiste" percentile="P85" value={28} sub="<b>28</b> tickets dans le meilleur des cas" description="Si tout se passe bien." variant="p85" />
    </div>
  ),
}
