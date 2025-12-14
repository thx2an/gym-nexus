"use client";

import Link from "next/link";

export default function MembershipPackageAdminPage() {
  const packages = [
    {
      id: 1,
      code: "BASIC_30",
      name: "Basic 30 Days",
      duration_days: 30,
      price: 500000,
      is_active: true,
    },
    {
      id: 2,
      code: "PRO_90",
      name: "Pro 90 Days",
      duration_days: 90,
      price: 1200000,
      is_active: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Membership Packages
          </h1>
          <p className="text-sm text-gray-400">
            Manage membership plans and pricing
          </p>
        </div>

        <Link
          href="/manager/packages/new"
          className="px-5 py-2.5 rounded-lg font-semibold bg-[#FACC15] text-black hover:opacity-90 transition"
        >
          + Add Package
        </Link>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((p) => (
          <div
            key={p.id}
            className="bg-[#1A1F26] rounded-2xl p-5 border border-[#2A2F38] shadow-lg hover:shadow-xl transition"
          >
            {/* TITLE + STATUS */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {p.name}
                </h2>
                <p className="text-xs text-gray-400">
                  Code: {p.code}
                </p>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  p.is_active
                    ? "bg-green-500/15 text-green-400"
                    : "bg-gray-500/15 text-gray-400"
                }`}
              >
                {p.is_active ? "Active" : "Inactive"}
              </span>
            </div>

            {/* INFO */}
            <div className="space-y-1 text-sm text-gray-300 mb-4">
              <p>Duration: {p.duration_days} days</p>
              <p>
                Price:{" "}
                <span className="font-semibold">
                  {p.price.toLocaleString()}₫
                </span>
              </p>
            </div>

            {/* ACTION */}
            <Link
              href={`/manager/packages/edit/${p.id}`}
              className="text-sm font-medium text-blue-400 hover:underline"
            >
              Edit →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
