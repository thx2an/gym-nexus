"use client";

import axiosClient from "./axiosClient";

const notificationApi = {
  /**
   * Get all notifications for the logged-in user
   */
  getNotifications: () => axiosClient.get("/notifications"),

  /**
   * Get unread notifications only
   */
  getUnread: () => axiosClient.get("/notifications/unread"),

  /**
   * Mark a notification as read
   * @param {number} id 
   */
  markAsRead: (id) => axiosClient.put(`/notifications/${id}/read`),

  /**
   * Mark ALL notifications as read
   */
  markAllAsRead: () => axiosClient.put("/notifications/mark-all-read"),

  /**
   * Delete a notification
   * @param {number} id 
   */
  deleteNotification: (id) => axiosClient.delete(`/notifications/${id}`),

  /**
   * OPTIONAL — Create notification (admin/system only)
   * Useful for: booking confirmed, payment success, etc.
   */
  create: (payload) => axiosClient.post("/notifications", payload),
};

export default notificationApi;
