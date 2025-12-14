"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PackageForm() {
  const params = useSearchParams();
  const isEdit = params.get("id") !== null;

  const [form, setForm] = useState({
    name: "",
    description: "",
    duration_days: "",
    price: "",
  });

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl bg-[#1A1F26] rounded-2xl p-6 border border-[#2A2F38] shadow-xl space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-semibold text-white">
          {isEdit ? "Edit Package" : "Add New Package"}
        </h1>
        <p className="text-sm text-gray-400">
          {isEdit
            ? "Update package information"
            : "Create a new membership package"}
        </p>
      </div>

      {/* FORM */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Package Name"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="w-full rounded-lg px-3 py-2.5 bg-[#0F141B] border border-[#2A2F38] text-sm text-white focus:outline-none focus:border-[#3B82F6]"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={4}
          className="w-full rounded-lg px-3 py-2.5 bg-[#0F141B] border border-[#2A2F38] text-sm text-white resize-none focus:outline-none focus:border-[#3B82F6]"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Duration (days)"
            value={form.duration_days}
            onChange={(e) => updateField("duration_days", e.target.value)}
            className="w-full rounded-lg px-3 py-2.5 bg-[#0F141B] border border-[#2A2F38] text-sm text-white focus:outline-none focus:border-[#3B82F6]"
          />

          <input
            type="number"
            placeholder="Price (₫)"
            value={form.price}
            onChange={(e) => updateField("price", e.target.value)}
            className="w-full rounded-lg px-3 py-2.5 bg-[#0F141B] border border-[#2A2F38] text-sm text-white focus:outline-none focus:border-[#3B82F6]"
          />
        </div>

        <button
          className="w-full py-2.5 rounded-lg font-semibold bg-[#FACC15] text-black hover:opacity-90 transition"
        >
          {isEdit ? "Update Package" : "Create Package"}
        </button>
      </div>
    </div>
  );
}
