"use client";

import ReportChart from "../../(manager)/reports/ReportChart";

export default function SupportAnalyticsPage() {
  const data = [
    { label: "Open Tickets", value: 150 },
    { label: "Resolved", value: 300 },
    { label: "Chats Answered", value: 120 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Support Analytics</h1>

      <ReportChart data={data} />
    </div>
  );
}
