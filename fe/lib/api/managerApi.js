"use client";

import axiosClient from "./axiosClient";

const managerApi = {
    getStats: () => axiosClient.get("/manager/stats"),
    getPackages: () => axiosClient.get("/manager/packages"),
    createPackage: (data) => axiosClient.post("/manager/packages", data),
};

export default managerApi;
