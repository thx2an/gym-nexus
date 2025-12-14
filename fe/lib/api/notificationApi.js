// TODO: Replace mock data with actual API endpoints

export const notificationApi = {
  // Get all notifications
  async getNotifications() {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      success: true,
      data: [
        {
          id: 1,
          title: "Membership Expiring Soon",
          summary: "Your Premium Monthly membership will expire in 5 days",
          timestamp: "2024-01-10T10:00:00Z",
          read: false,
          linkUrl: "/dashboard/memberships/purchase",
        },
        {
          id: 2,
          title: "Payment Successful",
          summary: "Your payment of $49.99 was processed successfully",
          timestamp: "2024-01-08T14:30:00Z",
          read: false,
          linkUrl: "/dashboard/payments",
        },
        {
          id: 3,
          title: "New Group Class Available",
          summary: "Yoga class added to schedule on Fridays at 6 PM",
          timestamp: "2024-01-05T09:00:00Z",
          read: false,
          linkUrl: "/dashboard/training/schedule",
        },
        {
          id: 4,
          title: "Trainer Session Confirmed",
          summary: "Your session with John Doe on Jan 12 is confirmed",
          timestamp: "2024-01-03T16:00:00Z",
          read: true,
          linkUrl: "/dashboard/training/my-sessions",
        },
      ],
    }
  },

  // Mark notification as read
  async markAsRead(notificationId) {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return { success: true }
  },

  // Mark all notifications as read
  async markAllAsRead() {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return { success: true }
  },
}
