"use client";

import { LifeBuoy, MessageCircle, BookOpen, FileText } from "lucide-react";

export default function SupportDashboardPage() {
  const stats = [
    { label: "Open Tickets", value: 18, icon: LifeBuoy },
    { label: "Live Chats Active", value: 5, icon: MessageCircle },
    { label: "Articles Published", value: 22, icon: BookOpen },
    { label: "Reports Generated", value: 40, icon: FileText },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Support Dashboard</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="bg-white border border-borderColor-light p-6 rounded-lg shadow-sm"
            >
              <Icon className="w-10 h-10 text-accent mb-3" />
              <p className="text-text-medium">{s.label}</p>
              <p className="text-2xl font-bold">{s.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
