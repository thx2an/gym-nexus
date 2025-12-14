"use client";

import { useState } from "react";
import ReportFilterBar from "../ReportFilterBar";
import ReportChart from "../ReportChart";

export default function MemberActivityReportPage() {
  const [filters, setFilters] = useState({ from: "", to: "" });

  const mockData = [
    { label: "Visits", value: 80 },
    { label: "Bookings", value: 140 },
    { label: "Cancellations", value: 30 },
  ];

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Member Activity
        </h1>
        <p className="text-sm text-gray-400">
          Overview of member engagement and actions
        </p>
      </div>

      <ReportFilterBar
        filters={filters}
        setFilters={setFilters}
      />

      <ReportChart data={mockData} />
    </div>
  );
}
