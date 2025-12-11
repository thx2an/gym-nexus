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
    <div className="max-w-xl bg-white p-6 rounded-lg border border-borderColor-light shadow-sm">
      <h1 className="text-2xl font-bold text-text-strong mb-4">
        {isEdit ? "Edit Staff" : "Add New Staff"}
      </h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg"
          value={form.full_name}
          onChange={(e) => updateField("full_name", e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone"
          className="w-full p-3 border rounded-lg"
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
        />

        <select
          className="w-full p-3 border rounded-lg"
          value={form.role}
          onChange={(e) => updateField("role", e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="Manager">Manager</option>
          <option value="Personal Trainer">Personal Trainer</option>
          <option value="Support Staff">Support Staff</option>
        </select>

        <button className="w-full bg-accent text-white py-3 rounded-lg hover:bg-btnPrimary-hover">
          {isEdit ? "Update Staff" : "Create Staff"}
        </button>
      </div>
    </div>
  );
}
