"use client";

import ReportChart from "../../manager/reports/ReportChart";

export default function SupportAnalyticsPage() {
  const data = [
    { label: "Open Tickets", value: 150 },
    { label: "Resolved", value: 300 },
    { label: "Chats Answered", value: 120 },
  ];

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Support Analytics
        </h1>
        <p className="text-sm text-gray-400">
          Overview of support team performance
        </p>
      </div>

      {/* ================= CHART CARD ================= */}
      <div className="bg-[#1A1F26] rounded-2xl p-6 border border-[#2A2F38] shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-4">
          Activity Overview
        </h2>

        <ReportChart data={data} />
      </div>
    </div>
  );
}
