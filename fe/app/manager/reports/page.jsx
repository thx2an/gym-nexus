"use client";

import Link from "next/link";

export default function ReportsDashboardPage() {
  const reports = [
    { title: "Revenue Report", href: "/manager/reports/revenue" },
    { title: "Trainer Performance", href: "/manager/reports/trainer-performance" },
    { title: "Member Activity Report", href: "/manager/reports/member-activity" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-strong mb-8">Reports Center</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((r, i) => (
          <Link
            key={i}
            href={r.href}
            className="bg-white p-6 rounded-lg border border-borderColor-light shadow-sm hover:border-accent transition block"
          >
            <h2 className="text-xl font-semibold">{r.title}</h2>
            <p className="text-text-medium mt-1">View report →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
