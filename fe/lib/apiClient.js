import axios from "axios";

const base = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

const apiClient = axios.create({
    baseURL: `${base}/api`,
    headers: { Accept: "application/json" },
    withCredentials: false, // ✅ QUAN TRỌNG
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("gn_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default apiClient;
