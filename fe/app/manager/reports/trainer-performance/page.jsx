"use client";

import { useState } from "react";
import ReportFilterBar from "../ReportFilterBar";
import ReportChart from "../ReportChart";

export default function TrainerPerformanceReportPage() {
  const [filters, setFilters] = useState({ from: "", to: "" });

  const mockData = [
    { label: "PT A", value: 150 },
    { label: "PT B", value: 100 },
    { label: "PT C", value: 130 },
  ];

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Trainer Performance
        </h1>
        <p className="text-sm text-gray-400">
          Performance metrics of personal trainers
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
