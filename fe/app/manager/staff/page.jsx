"use client";

import Link from "next/link";

export default function StaffManagementPage() {
  const staff = [
    { id: 1, name: "John Doe", role: "Personal Trainer", phone: "0902-111-222" },
    { id: 2, name: "Sarah Lee", role: "Support Staff", phone: "0903-222-333" },
    { id: 3, name: "Michael Chan", role: "Manager", phone: "0904-333-444" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-text-strong">Staff Management</h1>

        <Link
          href="/manager/staff/form"
          className="bg-accent text-white px-5 py-2 rounded-lg hover:bg-btnPrimary-hover"
        >
          + Add Staff
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg border border-borderColor-light shadow-sm">
        <StaffList staff={staff} />
      </div>
    </div>
  );
}
