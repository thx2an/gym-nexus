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
    <div>
      <h1 className="text-3xl font-bold mb-6 text-text-strong">Trainer Performance</h1>

      <ReportFilterBar filters={filters} setFilters={setFilters} />
      <ReportChart data={mockData} />
    </div>
  );
}
