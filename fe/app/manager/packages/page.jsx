"use client";

import Link from "next/link";

export default function MembershipPackageAdminPage() {
  const packages = [
    { id: 1, name: "Monthly Plan", price: 500000 },
    { id: 2, name: "Quarterly Plan", price: 1200000 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text-strong">Membership Packages</h1>

        <Link
          href="/manager/packages/form"
          className="bg-accent text-white px-5 py-2 rounded-lg hover:bg-btnPrimary-hover"
        >
          + Add Package
        </Link>
      </div>

      <div className="space-y-4">
        {packages.map((p) => (
          <div
            key={p.id}
            className="bg-white p-5 rounded-lg border border-borderColor-light shadow-sm"
          >
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-text-medium">Price: {p.price.toLocaleString()}₫</p>

            <Link
              href={`/manager/packages/form?id=${p.id}`}
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
