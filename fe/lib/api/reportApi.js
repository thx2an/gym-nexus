"use client";

import axiosClient from "./axiosClient";

const reportApi = {
  // FINANCIAL
  revenue: (params) => axiosClient.get("/reports/revenue", { params }),

  // TRAINER PERFORMANCE
  trainerPerformance: (params) =>
    axiosClient.get("/reports/trainer-performance", { params }),

  // MEMBER ACTIVITY
  memberActivity: (params) =>
    axiosClient.get("/reports/member-activity", { params }),

  // EXPORT PDF / CSV (if backend supports)
  exportReport: (type, params) =>
    axiosClient.get(`/reports/export/${type}`, {
      params,
      responseType: "blob",
    }),
};

export default reportApi;
