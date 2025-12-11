"use client";

import { create } from "zustand";
import authApi from "@/lib/api/authApi";

const useAuthStore = create((set) => ({
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  loading: true,

  // Load user profile on app start
  loadUser: async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      set({ loading: false });
      return;
    }

    try {
      const res = await authApi.getProfile();
      set({ user: res.user, loading: false });
    } catch (err) {
      console.error("Profile load failed:", err);
      localStorage.removeItem("token");
      set({ user: null, token: null, loading: false });
    }
  },

  // Login function
  login: async (payload) => {
    const res = await authApi.login(payload);

    if (res.token) {
      localStorage.setItem("token", res.token);
      set({ token: res.token, user: res.user });
    }
    return res;
  },

  // Logout function
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
    if (typeof window !== "undefined") window.location.href = "/auth/login";
  },

  // Helpers
  isLoggedIn: () => !!useAuthStore.getState().user,
  role: () => useAuthStore.getState().user?.role,
}));

export default useAuthStore;
