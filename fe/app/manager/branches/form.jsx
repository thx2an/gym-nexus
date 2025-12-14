"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function BranchForm() {
  const params = useSearchParams();
  const isEdit = params.get("id") !== null;

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl bg-[#1A1F26] rounded-2xl p-6 border border-[#2A2F38] shadow-xl">
      <h1 className="text-xl font-semibold text-white mb-6">
        {isEdit ? "Edit Branch" : "Add New Branch"}
      </h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Branch Name"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="w-full rounded-lg px-3 py-2.5 bg-[#0F141B] border border-[#2A2F38] text-sm text-white focus:outline-none focus:border-[#3B82F6]"
        />

        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) => updateField("address", e.target.value)}
          className="w-full rounded-lg px-3 py-2.5 bg-[#0F141B] border border-[#2A2F38] text-sm text-white focus:outline-none focus:border-[#3B82F6]"
        />

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className="w-full rounded-lg px-3 py-2.5 bg-[#0F141B] border border-[#2A2F38] text-sm text-white focus:outline-none focus:border-[#3B82F6]"
        />

        <button
          className="w-full py-2.5 rounded-lg font-semibold bg-[#FACC15] text-black hover:opacity-90 transition"
        >
          {isEdit ? "Update Branch" : "Create Branch"}
        </button>
      </div>
    </div>
  );
}
