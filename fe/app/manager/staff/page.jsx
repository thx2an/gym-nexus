"use client";

import Link from "next/link";
import StaffList from "./StaffList";

export default function StaffManagementPage() {
  const staff = [
    {
      id: 1,
      name: "John Doe",
      role: "Personal Trainer",
      phone: "0902-111-222",
    },
    {
      id: 2,
      name: "Sarah Lee",
      role: "Support Staff",
      phone: "0903-222-333",
    },
    {
      id: 3,
      name: "Michael Chan",
      role: "Manager",
      phone: "0904-333-444",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Staff Management
          </h1>
          <p className="text-sm text-gray-400">
            Manage staff roles and contact information
          </p>
        </div>

        <Link
          href="/manager/staff/form"
          className="px-5 py-2.5 rounded-lg font-semibold bg-[#FACC15] text-black hover:opacity-90 transition"
        >
          + Add Staff
        </Link>
      </div>

      {/* ================= TABLE CARD ================= */}
      <div className="bg-[#1A1F26] rounded-2xl p-6 border border-[#2A2F38] shadow-xl">
        <StaffList staff={staff} />
      </div>
    </div>
  );
}
