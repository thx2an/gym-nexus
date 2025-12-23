"use client";

import { Users, Package, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import managerApi from "@/lib/api/managerApi";

export default function ManagerDashboardPage() {
  const [statsData, setStatsData] = useState({
    active_members: 0,
    membership_count: 0,
    monthly_revenue: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await managerApi.getStats();
      if (res) {
        setStatsData(res);
      }
    } catch (error) {
      console.error("Failed to fetch stats", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: "Active Members", value: statsData.active_members, icon: Users },
    { label: "Membership Packages", value: statsData.membership_count, icon: Package },
    { label: "Monthly Revenue", value: `$${Number(statsData.monthly_revenue).toLocaleString()}`, icon: DollarSign },
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
      <div className="grid gap-6 md:grid-cols-3">
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
                {loading ? "..." : item.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
