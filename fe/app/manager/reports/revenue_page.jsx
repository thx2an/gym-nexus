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
    <div>
      <h1 className="text-3xl font-bold mb-6 text-text-strong">Revenue Report</h1>

      <ReportFilterBar filters={filters} setFilters={setFilters} />
      <ReportChart data={mockData} />
    </div>
  );
}
