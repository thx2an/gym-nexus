"use client";

import { Bell, Ticket, MessageCircle, Clock } from "lucide-react";

export default function SupportNotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "ticket",
      title: "New Ticket Created",
      message: "Payment not processed",
      time: "2 minutes ago",
      unread: true,
    },
    {
      id: 2,
      type: "chat",
      title: "New Live Chat",
      message: "Member David started a chat",
      time: "10 minutes ago",
      unread: true,
    },
    {
      id: 3,
      type: "ticket",
      title: "Ticket Waiting Too Long",
      message: "Refund request delayed",
      time: "1 hour ago",
      unread: false,
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "ticket":
        return Ticket;
      case "chat":
        return MessageCircle;
      default:
        return Bell;
    }
  };

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Notifications
        </h1>
        <p className="text-sm text-gray-400">
          Recent updates and alerts for support staff
        </p>
      </div>

      {/* ================= NOTIFICATION LIST ================= */}
      <div className="bg-[#1A1F26] border border-[#2A2F38] rounded-2xl p-4 space-y-3">
        {notifications.map((n) => {
          const Icon = getIcon(n.type);

          return (
            <div
              key={n.id}
              className={`flex items-start gap-4 p-4 rounded-xl transition
                ${
                  n.unread
                    ? "bg-[#0F141B]"
                    : "hover:bg-[#0F141B]"
                }`}
            >
              {/* ICON */}
              <div
                className={`p-2.5 rounded-lg flex-shrink-0
                  ${
                    n.unread
                      ? "bg-[#6C8AE4] text-black"
                      : "bg-[#0F141B] text-gray-300"
                  }`}
              >
                <Icon className="w-4.5 h-4.5" />
              </div>

              {/* CONTENT */}
              <div className="flex-1">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {n.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-0.5">
                      {n.message}
                    </p>
                  </div>

                  {n.unread && (
                    <span className="w-2 h-2 rounded-full bg-[#6C8AE4] mt-1" />
                  )}
                </div>

                <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  {n.time}
                </div>
              </div>
            </div>
          );
        })}

        {notifications.length === 0 && (
          <p className="text-center text-sm text-gray-500 py-10">
            No notifications
          </p>
        )}
      </div>
    </div>
  );
}
