import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const meta: Meta = { title: 'Components/Cards' }
export default meta

export const ShadcnCard: StoryObj = {
  render: () => (
    <div className="max-w-sm">
      <Card>
        <CardHeader><CardTitle>Titre de la carte</CardTitle></CardHeader>
        <CardContent><p className="text-sm text-ink-3">Contenu de la carte avec des informations.</p></CardContent>
        <CardFooter><Button variant="ghost" size="sm">Action</Button></CardFooter>
      </Card>
    </div>
  ),
}

export const MultipleCards: StoryObj = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Card><CardHeader><CardTitle>Import CSV</CardTitle></CardHeader><CardContent><p className="dek">Glissez vos fichiers ici</p></CardContent></Card>
      <Card><CardHeader><CardTitle>Sprint</CardTitle></CardHeader><CardContent><p className="dek">Sélectionner le sprint</p></CardContent></Card>
      <Card><CardHeader><CardTitle>Équipes</CardTitle></CardHeader><CardContent><p className="dek">Filtrer par équipe</p></CardContent></Card>
    </div>
  ),
}
