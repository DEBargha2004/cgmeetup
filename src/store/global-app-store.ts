import { create } from 'zustand'

type State = {
  sidebarState: boolean
  authDialogState: boolean
  postDialogState: boolean
  jobDialogState: boolean
  dashboardSidebarState: boolean
}

type Actions = {
  setSidebarState: (state: State['sidebarState']) => void
  setAuthDialogState: (state: State['authDialogState']) => void
  setPostDialogState: (state: State['postDialogState']) => void
  setJobDialogState: (state: State['jobDialogState']) => void
  setDashboardSidebarState: (state: State['dashboardSidebarState']) => void
}

export const useGlobalAppStore = create<State & Actions>(set => ({
  sidebarState: false,
  authDialogState: false,
  postDialogState: false,
  jobDialogState: false,
  dashboardSidebarState: false,
  setSidebarState (state) {
    set({ sidebarState: state })
  },
  setAuthDialogState (state) {
    set({ authDialogState: state })
  },
  setPostDialogState (state) {
    set({ postDialogState: state })
  },
  setJobDialogState (state) {
    set({ jobDialogState: state })
  },
  setDashboardSidebarState (state) {
    set({ dashboardSidebarState: state })
  }
}))
