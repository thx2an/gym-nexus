import axiosClient from "./axiosClient"

const mockChatHistory = [
  { id: 1, sender: "Support", message: "Hi! How can I help you today?", timestamp: "2024-01-10T10:00:00Z" },
  { id: 2, sender: "You", message: "I have a question about my membership.", timestamp: "2024-01-10T10:01:00Z" },
  {
    id: 3,
    sender: "Support",
    message: "Sure, I'd be happy to help. What would you like to know?",
    timestamp: "2024-01-10T10:02:00Z",
  },
]

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const supportApi = {
  // Member tickets
  getTickets() {
    return axiosClient.get("/support/tickets")
  },

  getTicketDetail(ticketId) {
    return axiosClient.get(`/support/tickets/${ticketId}`)
  },

  createTicket(data) {
    return axiosClient.post("/support/tickets", data)
  },

  replyMemberTicket(ticketId, payload) {
    return axiosClient.post(`/support/tickets/${ticketId}/reply`, payload)
  },

  closeMemberTicket(ticketId) {
    return axiosClient.post(`/support/tickets/${ticketId}/close`)
  },

  // Staff tickets
  getStaffTickets() {
    return axiosClient.get("/support/staff/tickets")
  },

  getStaffTicketDetail(ticketId) {
    return axiosClient.get(`/support/staff/tickets/${ticketId}`)
  },

  replyStaffTicket(ticketId, payload) {
    return axiosClient.post(`/support/staff/tickets/${ticketId}/reply`, payload)
  },

  closeStaffTicket(ticketId) {
    return axiosClient.post(`/support/staff/tickets/${ticketId}/close`)
  },

  // Chat (mock)
  async getChatHistory() {
    await delay(500)
    return { success: true, data: mockChatHistory }
  },

  async getChatMessages() {
    return this.getChatHistory()
  },

  async sendChatMessage(message) {
    await delay(500)
    return {
      success: true,
      data: {
        id: Date.now(),
        sender: "You",
        message,
        timestamp: new Date().toISOString(),
      },
    }
  },
}
