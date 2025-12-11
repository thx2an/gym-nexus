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
    <div>
      <h1 className="text-3xl font-bold mb-8 text-text-strong">Manager Dashboard</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="bg-bg-subtle border border-borderColor-light rounded-lg p-6 shadow-sm"
            >
              <Icon className="w-10 h-10 text-accent mb-3" />
              <p className="text-text-medium text-sm">{item.label}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
