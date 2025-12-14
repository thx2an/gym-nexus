"use client";

import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ➜ Attach Authorization token
axiosClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ➜ Handle responses + errors
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Unauthorized redirect
      if (error.response.status === 401) {
        console.warn("Unauthorized → redirecting to login (DISABLED FOR DEV)");
        // if (typeof window !== "undefined") {
        //   localStorage.removeItem("auth_token");
        //   window.location.href = "/auth/login";
        // }
      }
      return Promise.reject(error.response.data || error.message);
    }
    return Promise.reject({ message: "Network error" });
  }
);

export default axiosClient;
