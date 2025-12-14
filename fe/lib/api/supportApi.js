// TODO: Replace mock data with actual API endpoints

export const supportApi = {
  // Get user's tickets
  async getTickets() {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      success: true,
      data: [
        {
          id: 1,
          subject: "Payment issue",
          category: "Billing",
          status: "Open",
          lastUpdate: "2024-01-10T10:00:00Z",
          createdAt: "2024-01-09T14:00:00Z",
        },
        {
          id: 2,
          subject: "Locker problem",
          category: "Facilities",
          status: "In Progress",
          lastUpdate: "2024-01-08T16:00:00Z",
          createdAt: "2024-01-07T10:00:00Z",
        },
        {
          id: 3,
          subject: "Membership renewal question",
          category: "Membership",
          status: "Resolved",
          lastUpdate: "2024-01-05T12:00:00Z",
          createdAt: "2024-01-04T09:00:00Z",
        },
      ],
    }
  },

  // Get ticket detail with thread
  async getTicketDetail(ticketId) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      success: true,
      data: {
        id: ticketId,
        subject: "Payment issue",
        category: "Billing",
        status: "Open",
        createdAt: "2024-01-09T14:00:00Z",
        messages: [
          {
            id: 1,
            sender: "You",
            message: "I was charged twice for my membership this month.",
            timestamp: "2024-01-09T14:00:00Z",
          },
          {
            id: 2,
            sender: "Support Team",
            message:
              "Thank you for reaching out. We're looking into this issue and will get back to you within 24 hours.",
            timestamp: "2024-01-09T15:30:00Z",
          },
        ],
      },
    }
  },

  // Create new ticket
  async createTicket(data) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return {
      success: true,
      data: {
        ticketId: "TICK" + Date.now(),
        subject: data.subject,
        category: data.category,
        status: "Open",
        createdAt: new Date().toISOString(),
      },
    }
  },

  // Get chat messages (mock)
  async getChatMessages() {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      success: true,
      data: [
        { id: 1, sender: "Support", message: "Hi! How can I help you today?", timestamp: "2024-01-10T10:00:00Z" },
        { id: 2, sender: "You", message: "I have a question about my membership.", timestamp: "2024-01-10T10:01:00Z" },
        {
          id: 3,
          sender: "Support",
          message: "Sure, I'd be happy to help. What would you like to know?",
          timestamp: "2024-01-10T10:02:00Z",
        },
      ],
    }
  },

  // Send chat message
  async sendChatMessage(message) {
    await new Promise((resolve) => setTimeout(resolve, 500))
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
