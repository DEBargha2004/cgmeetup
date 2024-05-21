import { create } from 'zustand'

type State = {
  sidebarState: boolean
}

type Actions = {
  setSidebarState: (state: State['sidebarState']) => void
}

export const useGlobalAppStore = create<State & Actions>(set => ({
  sidebarState: false,
  setSidebarState (state) {
    set({ sidebarState: state })
  }
}))
