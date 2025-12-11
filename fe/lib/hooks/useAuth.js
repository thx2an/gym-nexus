"use client";

import { useState, useEffect } from "react";
import authApi from "@/lib/api/authApi";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on mount
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      setLoading(false);
      return;
    }

    authApi
      .getProfile()
      .then((res) => {
        setUser(res.user);
      })
      .catch(() => {
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  // Login handler
  const login = async (payload) => {
    const res = await authApi.login(payload);
    if (res.token) {
      localStorage.setItem("token", res.token);
      setUser(res.user);
    }
    return res;
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    isLoggedIn: !!user,
    role: user?.role,
  };
}
