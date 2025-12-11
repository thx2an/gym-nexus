"use client";

import Link from "next/link";

export default function BranchManagementPage() {
  const branches = [
    { id: 1, name: "Downtown Branch", address: "123 Main Street", phone: "0902-123-456" },
    { id: 2, name: "West End Branch", address: "456 West Ave", phone: "0903-987-654" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text-strong">Branches</h1>

        <Link
          href="/manager/branches/form"
          className="bg-accent text-white px-5 py-2 rounded-lg hover:bg-btnPrimary-hover"
        >
          + Add Branch
        </Link>
      </div>

      {/* Branch List */}
      <div className="space-y-4">
        {branches.map((b) => (
          <div
            key={b.id}
            className="bg-white p-5 rounded-lg border border-borderColor-light shadow-sm"
          >
            <h2 className="text-xl font-semibold">{b.name}</h2>
            <p className="text-text-medium">{b.address}</p>
            <p className="text-text-medium">{b.phone}</p>

            <Link
              href={`/manager/branches/form?id=${b.id}`}
              className="text-accent font-semibold mt-3 inline-block"
            >
              Edit →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
