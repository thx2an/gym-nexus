"use client";

import Link from "next/link";

export default function ReportsDashboardPage() {
  const reports = [
    { title: "Revenue Report", href: "/manager/reports/revenue" },
    {
      title: "Trainer Performance",
      href: "/manager/reports/trainer-performance",
    },
    {
      title: "Member Activity Report",
      href: "/manager/reports/member-activity",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Reports Center
        </h1>
        <p className="text-sm text-gray-400">
          View and analyze system reports
        </p>
      </div>

      {/* ================= REPORT GRID ================= */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((r, i) => (
          <Link
            key={i}
            href={r.href}
            className="bg-[#1A1F26] rounded-2xl p-5 border border-[#2A2F38] shadow-lg hover:shadow-xl transition group"
          >
            <h2 className="text-lg font-semibold text-white mb-1 group-hover:underline">
              {r.title}
            </h2>
            <p className="text-sm text-gray-400">
              View report →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
