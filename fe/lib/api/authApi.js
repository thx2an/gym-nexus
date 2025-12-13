"use client";

import axiosClient from "./axiosClient";

const authApi = {
  login: (payload) => axiosClient.post("/auth/login", payload),
  register: (payload) => axiosClient.post("/auth/register", payload),
  forgotPassword: (payload) => axiosClient.post("/auth/forgot-password", payload),
  verifyEmail: (token) => axiosClient.get(`/auth/verify-email/${token}`),

  getProfile: () => axiosClient.get("/auth/profile"),
  checkToken: (token) => axiosClient.get("/check-token", {
    headers: { Authorization: "Bearer " + token }
  }),
};

export default authApi;
