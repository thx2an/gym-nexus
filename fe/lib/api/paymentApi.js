import axiosClient from "./axiosClient"

export const paymentApi = {
  // Get payment history
  async getHistory() {
    return axiosClient.get("/user/payment/history")
  },

  // Get invoice details for printing
  async getInvoice(id) {
    return axiosClient.get(`/user/invoice/${id}`)
  },
}
