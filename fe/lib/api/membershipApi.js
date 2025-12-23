// TODO: Replace mock data with actual API endpoints

import axiosClient from "./axiosClient"; // Ensure import

export const membershipApi = {
  // Get all available membership packages
  async getPackages() {
    return axiosClient.get("/goi-tap");
  },

  // Get current user's membership status
  async getStatus() {
    return axiosClient.get("/user/membership");
  },

  // Confirm payment and create membership
  async confirmPayment(packageId) {
    return axiosClient.post("/payment/confirm", { package_id: packageId });
  },
}
