"use client";

import { create } from "zustand";
import notificationApi from "@/lib/api/notificationApi";

const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,

  // Load notifications
  loadNotifications: async () => {
    set({ loading: true });
    try {
      const data = await notificationApi.getNotifications();
      const unread = data.filter((n) => !n.is_read).length;

      set({
        notifications: data,
        unreadCount: unread,
        loading: false,
      });
    } catch (err) {
      console.error("Notification load error:", err);
      set({ loading: false });
    }
  },

  // Mark a single notification as read
  markAsRead: async (id) => {
    try {
      await notificationApi.markAsRead(id);
      const updated = get().notifications.map((n) =>
        n.notification_id === id ? { ...n, is_read: true } : n
      );

      set({
        notifications: updated,
        unreadCount: updated.filter((n) => !n.is_read).length,
      });
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  },

  // Mark ALL notifications as read
  markAllRead: async () => {
    try {
      await notificationApi.markAllAsRead();
      const updated = get().notifications.map((n) => ({
        ...n,
        is_read: true,
      }));

      set({ notifications: updated, unreadCount: 0 });
    } catch (err) {
      console.error("Error marking all read:", err);
    }
  },

  // Delete notification
  deleteNotification: async (id) => {
    try {
      await notificationApi.deleteNotification(id);
      const updated = get().notifications.filter(
        (n) => n.notification_id !== id
      );

      set({
        notifications: updated,
        unreadCount: updated.filter((n) => !n.is_read).length,
      });
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  },

  // Real-time push for WebSocket
  addNotification: (notif) => {
    const current = get().notifications;
    set({
      notifications: [notif, ...current],
      unreadCount: get().unreadCount + 1,
    });
  },
}));

export default useNotificationStore;
