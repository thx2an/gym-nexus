"use client";

import { useState } from "react";
import ReportFilterBar from "../ReportFilterBar";
import ReportChart from "../ReportChart";

export default function RevenueReportPage() {
  const [filters, setFilters] = useState({ from: "", to: "" });

  const mockData = [
    { label: "Jan", value: 70 },
    { label: "Feb", value: 120 },
    { label: "Mar", value: 90 },
  ];

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Revenue Report
        </h1>
        <p className="text-sm text-gray-400">
          Revenue performance over selected period
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
