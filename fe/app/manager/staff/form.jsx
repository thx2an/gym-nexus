"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function StaffForm() {
  const params = useSearchParams();
  const isEdit = params.get("id") !== null;

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    role: "",
  });

  const updateField = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="max-w-2xl bg-[#1A1F26] rounded-2xl p-6 border border-[#2A2F38] shadow-xl space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          {isEdit ? "Edit Staff" : "Add New Staff"}
        </h1>
        <p className="text-sm text-gray-400">
          Manage staff information and role
        </p>
      </div>

      {/* FORM */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={form.full_name}
          onChange={(e) => updateField("full_name", e.target.value)}
          className="w-full rounded-lg px-3 py-2.5 bg-[#0F141B] border border-[#2A2F38] text-sm text-white focus:outline-none focus:border-[#3B82F6]"
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          className="w-full rounded-lg px-3 py-2.5 bg-[#0F141B] border border-[#2A2F38] text-sm text-white focus:outline-none focus:border-[#3B82F6]"
        />

        <input
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className="w-full rounded-lg px-3 py-2.5 bg-[#0F141B] border border-[#2A2F38] text-sm text-white focus:outline-none focus:border-[#3B82F6]"
        />

        <select
          value={form.role}
          onChange={(e) => updateField("role", e.target.value)}
          className="w-full rounded-lg px-3 py-2.5 bg-[#0F141B] border border-[#2A2F38] text-sm text-white focus:outline-none focus:border-[#3B82F6]"
        >
          <option value="">Select Role</option>
          <option value="Manager">Manager</option>
          <option value="Personal Trainer">Personal Trainer</option>
          <option value="Support Staff">Support Staff</option>
        </select>

        <button className="w-full py-2.5 rounded-lg font-semibold bg-[#FACC15] text-black hover:opacity-90 transition">
          {isEdit ? "Update Staff" : "Create Staff"}
        </button>
      </div>
    </div>
  );
}
