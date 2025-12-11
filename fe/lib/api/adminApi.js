"use client";

import axiosClient from "./axiosClient";

const adminApi = {
  // ---------------- BRANCHES ----------------
  getBranches: () => axiosClient.get("/admin/branches"),
  getBranchById: (id) => axiosClient.get(`/admin/branches/${id}`),
  createBranch: (payload) => axiosClient.post("/admin/branches", payload),
  updateBranch: (id, payload) => axiosClient.put(`/admin/branches/${id}`, payload),
  deleteBranch: (id) => axiosClient.delete(`/admin/branches/${id}`),

  // ---------------- PACKAGES ----------------
  getPackages: () => axiosClient.get("/admin/packages"),
  createPackage: (payload) => axiosClient.post("/admin/packages", payload),
  updatePackage: (id, payload) => axiosClient.put(`/admin/packages/${id}`, payload),
  deletePackage: (id) => axiosClient.delete(`/admin/packages/${id}`),

  // ---------------- STAFF -------------------
  getStaff: () => axiosClient.get("/admin/staff"),
  createStaff: (payload) => axiosClient.post("/admin/staff", payload),
  updateStaff: (id, payload) => axiosClient.put(`/admin/staff/${id}`, payload),
  deleteStaff: (id) => axiosClient.delete(`/admin/staff/${id}`),
};

export default adminApi;
