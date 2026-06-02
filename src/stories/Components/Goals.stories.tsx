import type { Meta, StoryObj } from '@storybook/react-vite'
import { GoalItem, GoalInput } from '@/components/GoalItem'

const meta: Meta = { title: 'Components/Sprint Goals' }
export default meta

export const GoalsList: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-xl">
      <GoalItem text="Livrer le MVP du dashboard Sprint Review" status="achieved" />
      <GoalItem text="Réduire le cycle time moyen sous 5 jours" status="partial" />
      <GoalItem text="Zéro bug en production pendant le sprint" status="missed" />
      <GoalItem text="Documenter les API existantes" status="pending" />
      <div className="flex gap-2 mt-2">
        <span className="pill pill--ok">2/4</span>
        <span className="pill pill--warn">1 partiel</span>
        <span className="pill pill--bad">1 raté</span>
      </div>
    </div>
  ),
}

export const GoalInputField: StoryObj = {
  name: 'Ajout de Goal',
  render: () => (
    <div className="max-w-md">
      <GoalInput onAdd={(text) => alert('Ajouté: ' + text)} />
    </div>
  ),
}
