"use client";

import { Building2, Users, Package, DollarSign } from "lucide-react";

export default function ManagerDashboardPage() {
  const stats = [
    { label: "Total Branches", value: 4, icon: Building2 },
    { label: "Active Members", value: 320, icon: Users },
    { label: "Membership Packages", value: 12, icon: Package },
    { label: "Monthly Revenue", value: "$24,500", icon: DollarSign },
  ];

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Manager Dashboard
        </h1>
        <p className="text-sm text-gray-400">
          Overview of system performance
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className="bg-[#1A1F26] rounded-2xl p-5 border border-[#2A2F38] shadow-lg hover:shadow-xl transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-[#0F141B] border border-[#2A2F38]">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-1">
                {item.label}
              </p>
              <p className="text-2xl font-semibold text-white">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
