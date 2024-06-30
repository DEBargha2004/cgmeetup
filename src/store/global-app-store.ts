import { create } from 'zustand'

type State = {
  sidebarState: boolean
  authDialogState: boolean
  postDialogState: boolean
}

type Actions = {
  setSidebarState: (state: State['sidebarState']) => void
  setAuthDialogState: (state: State['authDialogState']) => void
  setPostDialogState: (state: State['postDialogState']) => void
}

export const useGlobalAppStore = create<State & Actions>(set => ({
  sidebarState: false,
  authDialogState: false,
  postDialogState: false,
  setSidebarState (state) {
    set({ sidebarState: state })
  },
  setAuthDialogState (state) {
    set({ authDialogState: state })
  },
  setPostDialogState (state) {
    set({ postDialogState: state })
  }
}))
