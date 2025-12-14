"use client";

import {
  LifeBuoy,
  MessageCircle,
  BookOpen,
  FileText,
} from "lucide-react";

export default function SupportDashboardPage() {
  const stats = [
    { label: "Open Tickets", value: 18, icon: LifeBuoy },
    { label: "Live Chats Active", value: 5, icon: MessageCircle },
    { label: "Articles Published", value: 22, icon: BookOpen },
    { label: "Reports Generated", value: 40, icon: FileText },
  ];

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Support Dashboard
        </h1>
        <p className="text-sm text-gray-400">
          Overview of support operations
        </p>
      </div>

      {/* ================= STATS GRID ================= */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = s.icon;

          return (
            <div
              key={i}
              className="bg-[#1A1F26] border border-[#2A2F38] rounded-2xl p-6 shadow-xl"
            >
              {/* ICON */}
              <div className="mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#0F141B] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gray-300" />
                </div>
              </div>

              {/* LABEL */}
              <p className="text-sm text-gray-400 mb-1">
                {s.label}
              </p>

              {/* VALUE */}
              <p className="text-3xl font-semibold text-white">
                {s.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
