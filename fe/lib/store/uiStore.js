"use client";

import { create } from "zustand";

const useUIStore = create((set) => ({
  sidebarOpen: true,
  theme: "light",
  globalLoading: false,

  // Sidebar toggle
  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setSidebar: (value) =>
    set({ sidebarOpen: value }),

  // Theme
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),

  // Global loading overlay
  setLoading: (value) =>
    set({ globalLoading: value }),
}));

export default useUIStore;
