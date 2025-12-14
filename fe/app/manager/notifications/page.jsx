"use client";

import {
  Bell,
  Building2,
  Package,
  DollarSign,
  UserPlus,
  Clock,
} from "lucide-react";

export default function ManagerNotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "revenue",
      title: "Revenue Report Ready",
      message: "Monthly revenue report has been generated",
      time: "5 minutes ago",
      unread: true,
    },
    {
      id: 2,
      type: "branch",
      title: "New Branch Created",
      message: "West End Branch was added",
      time: "30 minutes ago",
      unread: true,
    },
    {
      id: 3,
      type: "package",
      title: "Package Updated",
      message: "Quarterly Plan price updated",
      time: "2 hours ago",
      unread: false,
    },
    {
      id: 4,
      type: "staff",
      title: "New Staff Added",
      message: "John Doe joined as Personal Trainer",
      time: "Yesterday",
      unread: false,
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "branch":
        return Building2;
      case "package":
        return Package;
      case "revenue":
        return DollarSign;
      case "staff":
        return UserPlus;
      default:
        return Bell;
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Notifications
        </h1>
        <p className="text-sm text-gray-400">
          Recent system updates and alerts
        </p>
      </div>

      {/* ================= LIST CARD ================= */}
      <div className="bg-[#1A1F26] rounded-2xl border border-[#2A2F38] shadow-xl divide-y divide-[#2A2F38]">
        {notifications.map((n) => {
          const Icon = getIcon(n.type);

          return (
            <div
              key={n.id}
              className={`flex items-start gap-4 p-4 transition ${
                n.unread
                  ? "bg-[#0F141B]"
                  : "bg-transparent"
              }`}
            >
              {/* ICON */}
              <div className="p-2.5 rounded-xl bg-[#0F141B] border border-[#2A2F38]">
                <Icon className="w-5 h-5 text-blue-400" />
              </div>

              {/* CONTENT */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {n.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-0.5">
                      {n.message}
                    </p>
                  </div>

                  {n.unread && (
                    <span className="ml-3 w-2 h-2 rounded-full bg-blue-400 mt-1" />
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
