import { create } from 'zustand'

type State = {
  sidebarState: boolean
  authDialogState: boolean
}

type Actions = {
  setSidebarState: (state: State['sidebarState']) => void
  setAuthDialogState: (state: State['authDialogState']) => void
}

export const useGlobalAppStore = create<State & Actions>(set => ({
  sidebarState: false,
  authDialogState: false,
  setSidebarState (state) {
    set({ sidebarState: state })
  },
  setAuthDialogState (state) {
    set({ authDialogState: state })
  }
}))
