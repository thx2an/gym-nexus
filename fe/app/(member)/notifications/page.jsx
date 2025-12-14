"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Bell, CheckCheck } from "lucide-react"
import { notificationApi } from "@/lib/api/notificationApi"

export default function NotificationsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await notificationApi.getNotifications()
      if (response.success) {
        setNotifications(response.data)
      } else {
        setError("Failed to load notifications")
      }
    } catch (err) {
      setError("An error occurred while loading notifications")
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAllRead = async () => {
    try {
      await notificationApi.markAllAsRead()
      setNotifications(notifications.map((n) => ({ ...n, read: true })))
    } catch (err) {
      console.error("Failed to mark all as read", err)
    }
  }

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      await notificationApi.markAsRead(notification.id)
      setNotifications(notifications.map((n) => (n.id === notification.id ? { ...n, read: true } : n)))
    }
    if (notification.linkUrl) {
      router.push(notification.linkUrl)
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#282828] border-t-[#f0f0f0] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#a0a0a0]">Loading notifications...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-[#282828] rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="h-8 w-8 text-[#606060]" />
          </div>
          <h3 className="text-xl font-semibold text-[#f0f0f0] mb-2">Failed to Load Notifications</h3>
          <p className="text-[#a0a0a0] mb-6">{error}</p>
          <button
            onClick={loadNotifications}
            className="px-6 py-2.5 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">Notifications</h1>
          <p className="text-[#a0a0a0]">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-2 px-4 py-2 bg-[#282828] hover:bg-[#333333] text-[#f0f0f0] rounded-lg font-medium transition-colors"
          >
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-[#282828] border border-[#282828] rounded-lg p-12 text-center">
          <Bell className="h-12 w-12 text-[#606060] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#f0f0f0] mb-2">No notifications</h3>
          <p className="text-[#a0a0a0]">You're all caught up!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <button
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                notification.read
                  ? "bg-[#282828] border-[#282828] hover:bg-[#1E1E1E]"
                  : "bg-[#1E1E1E] border-[#f0f0f0] hover:bg-[#252525]"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notification.read ? "bg-[#606060]" : "bg-[#f0f0f0]"}`}
                />
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold mb-1 ${notification.read ? "text-[#a0a0a0]" : "text-[#f0f0f0]"}`}>
                    {notification.title}
                  </h3>
                  <p className="text-[#606060] text-sm mb-2">{notification.summary}</p>
                  <p className="text-[#606060] text-xs">
                    {new Date(notification.timestamp).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
