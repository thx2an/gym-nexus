"use client";

import axiosClient from "./axiosClient";

const authApi = {
  login: (payload) => axiosClient.post("/dang-nhap", payload),
  register: (payload) => axiosClient.post("/dang-ky", payload),
  forgotPassword: (payload) => axiosClient.post("/quen-mat-khau", payload),
  verifyEmail: (token) => axiosClient.get(`/auth/verify-email/${token}`),

  getProfile: () => axiosClient.get("/user"),
  checkToken: (token) => axiosClient.get("/check-token", {
    headers: { Authorization: "Bearer " + token }
  }),
  // Update Profile
  updateProfile: (data) => axiosClient.post("/user/update", data),
  createMemberProfile: (data) => axiosClient.post("/member/profile", data),
  createPTProfile: (data) => axiosClient.post("/pt/profile", data),

  mockLogin: async (credentials) => {
    // ... (keep if needed, or remove)
  },
};

export default authApi;

