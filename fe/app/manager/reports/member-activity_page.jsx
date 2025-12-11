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
    <div>
      <h1 className="text-3xl font-bold mb-6 text-text-strong">Member Activity</h1>

      <ReportFilterBar filters={filters} setFilters={setFilters} />
      <ReportChart data={mockData} />
    </div>
  );
}
