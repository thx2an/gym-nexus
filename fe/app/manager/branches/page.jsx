"use client";

import Link from "next/link";

export default function BranchManagementPage() {
  const branches = [
    {
      branch_id: 1,
      name: "Downtown Branch",
      address: "123 Main Street",
      phone: "0902-123-456",
      is_active: true,
      created_at: "2024-01-10",
    },
    {
      branch_id: 2,
      name: "West End Branch",
      address: "456 West Ave",
      phone: "0903-987-654",
      is_active: false,
      created_at: "2024-02-05",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Branches
          </h1>
          <p className="text-sm text-gray-400">
            Manage all gym branches
          </p>
        </div>

        <Link
          href="/manager/branches/new"
          className="px-5 py-2.5 rounded-lg font-semibold bg-[#FACC15] text-black hover:opacity-90 transition"
        >
          + Add Branch
        </Link>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {branches.map((b) => (
          <div
            key={b.branch_id}
            className="bg-[#1A1F26] rounded-2xl p-5 border border-[#2A2F38] shadow-lg hover:shadow-xl transition"
          >
            {/* TITLE + STATUS */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {b.name}
                </h2>
                <p className="text-xs text-gray-400">
                  Created: {new Date(b.created_at).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  b.is_active
                    ? "bg-green-500/15 text-green-400"
                    : "bg-gray-500/15 text-gray-400"
                }`}
              >
                {b.is_active ? "Active" : "Inactive"}
              </span>
            </div>

            {/* INFO */}
            <div className="space-y-1 text-sm text-gray-300 mb-4">
              <p>📍 {b.address}</p>
              <p>📞 {b.phone}</p>
            </div>

            {/* ACTION */}
            <Link
              href={`/manager/branches/id/edit`}
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
