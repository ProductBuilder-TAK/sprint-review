import { create } from 'zustand'

interface ManualInput {
  teamName: string
  sprintName: string
  storyPointsCommitted: number | null
  storyPointsDelivered: number | null
  storyPoints?: Array<{ committed: number | null; delivered: number | null }>
}

interface AppState {
  // Données CSV — format identique au vanilla : { tickets, teams, timeInStatus, summary }
  csvData: Record<string, unknown> | null
  csvLoaded: boolean

  // Métriques calculées
  sprintMetrics: Record<string, unknown> | null

  // Sprint / équipes sélectionnés (sprint = number comme dans le vanilla)
  selectedSprint: number | null
  selectedTeams: string[]
  availableSprints: Array<{ sprint: number; label: string }>
  availableTeams: string[]

  // Saisie manuelle
  manualInput: ManualInput

  // UI
  currentSection: string
  isLoading: boolean

  // Secrets
  unlockedSecrets: Set<string>

  // Tweaks
  theme: 'light' | 'dark'
  palette: 'earth' | 'rose' | 'ink'
  density: 'compact' | 'normal' | 'cozy'
  typo: 'editorial' | 'sans' | 'mono'

  // Notifications
  notifications: Array<{ id: string; type: 'success' | 'error' | 'warning' | 'info'; message: string }>
}

interface AppActions {
  // Data — stocker les données CSV unifiées (même format que le vanilla)
  setCsvData: (data: Record<string, unknown> | null) => void
  mergeTimeInStatus: (timeInStatus: unknown) => void
  setCsvLoaded: (loaded: boolean) => void
  setSprintMetrics: (metrics: Record<string, unknown> | null) => void

  // Selection
  setSelectedSprint: (sprint: number | null) => void
  setSelectedTeams: (teams: string[]) => void
  setAvailableSprints: (sprints: Array<{ sprint: number; label: string }>) => void
  setAvailableTeams: (teams: string[]) => void

  // Manual input
  setManualInput: (input: Partial<ManualInput>) => void

  // UI
  setCurrentSection: (section: string) => void
  setLoading: (loading: boolean) => void

  // Secrets
  unlockSecret: (code: string) => void
  hideSecrets: () => void

  // Tweaks
  setTheme: (theme: AppState['theme']) => void
  setPalette: (palette: AppState['palette']) => void
  setDensity: (density: AppState['density']) => void
  setTypo: (typo: AppState['typo']) => void

  // Notifications
  addNotification: (type: AppState['notifications'][0]['type'], message: string) => void
  removeNotification: (id: string) => void

  // Reset
  reset: () => void
}

const initialState: AppState = {
  csvData: null,
  csvLoaded: false,
  sprintMetrics: null,
  selectedSprint: null,
  selectedTeams: [],
  availableSprints: [],
  availableTeams: [],
  manualInput: {
    teamName: 'Data Tribe TF1',
    sprintName: 'Sprint 1',
    storyPointsCommitted: null,
    storyPointsDelivered: null,
  },
  currentSection: 'admin',
  isLoading: false,
  unlockedSecrets: new Set<string>(),
  theme: 'light',
  palette: 'earth',
  density: 'normal',
  typo: 'editorial',
  notifications: [],
}

export const useAppStore = create<AppState & AppActions>()((set) => ({
  ...initialState,

  // Stocker l'objet csvData au format vanilla : { tickets, teams, summary, timeInStatus }
  setCsvData: (data) => set({ csvData: data }),

  // Ajouter timeInStatus aux données existantes
  mergeTimeInStatus: (timeInStatus) =>
    set((state) => ({
      csvData: state.csvData ? { ...state.csvData, timeInStatus } : null,
    })),

  setCsvLoaded: (loaded) => set({ csvLoaded: loaded }),

  setSprintMetrics: (metrics) => set({ sprintMetrics: metrics }),

  setSelectedSprint: (sprint) => set({ selectedSprint: sprint }),
  setSelectedTeams: (teams) => set({ selectedTeams: teams }),
  setAvailableSprints: (sprints) => set({ availableSprints: sprints }),
  setAvailableTeams: (teams) => set({ availableTeams: teams }),

  setManualInput: (input) =>
    set((state) => ({
      manualInput: { ...state.manualInput, ...input },
    })),

  setCurrentSection: (section) => set({ currentSection: section }),
  setLoading: (loading) => set({ isLoading: loading }),

  unlockSecret: (code) =>
    set((state) => {
      const next = new Set(state.unlockedSecrets)
      next.add(code)
      return { unlockedSecrets: next }
    }),

  hideSecrets: () => set({ unlockedSecrets: new Set() }),

  setTheme: (theme) => set({ theme }),
  setPalette: (palette) => set({ palette }),
  setDensity: (density) => set({ density }),
  setTypo: (typo) => set({ typo }),

  addNotification: (type, message) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: crypto.randomUUID(), type, message },
      ],
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  reset: () => set(initialState),
}))
