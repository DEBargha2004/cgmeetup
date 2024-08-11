import { create } from "zustand";
import { produce } from "immer";

type State = {
  sidebarState: boolean;
  authDialogState: boolean;
  postDialogState: boolean;
  jobDialogState: boolean;
  dashboardSidebarState: boolean;
  cart: string[];
};

type Actions = {
  setSidebarState: (state: State["sidebarState"]) => void;
  setAuthDialogState: (state: State["authDialogState"]) => void;
  setPostDialogState: (state: State["postDialogState"]) => void;
  setJobDialogState: (state: State["jobDialogState"]) => void;
  setDashboardSidebarState: (state: State["dashboardSidebarState"]) => void;
  setCart: (state: State["cart"]) => void;
  addToCart: (state: State["cart"][number]) => void;
  removeFromCart: (state: State["cart"][number]) => void;
  clearCart: () => void;
};

export const useGlobalAppStore = create<State & Actions>((set) => ({
  sidebarState: false,
  authDialogState: false,
  postDialogState: false,
  jobDialogState: false,
  dashboardSidebarState: false,
  cart: [],
  setSidebarState(state) {
    set({ sidebarState: state });
  },
  setAuthDialogState(state) {
    set({ authDialogState: state });
  },
  setPostDialogState(state) {
    set({ postDialogState: state });
  },
  setJobDialogState(state) {
    set({ jobDialogState: state });
  },
  setDashboardSidebarState(state) {
    set({ dashboardSidebarState: state });
  },
  setCart(state) {
    set({ cart: state });
  },
  clearCart() {
    set({ cart: [] });
  },
  addToCart(state) {
    set(
      produce((prev: State) => {
        prev.cart.includes(state) ? null : prev.cart.push(state);
      }),
    );
  },
  removeFromCart(state) {
    set(
      produce((prev: State) => {
        prev.cart = prev.cart.filter((item) => item !== state);
      }),
    );
  },
}));
