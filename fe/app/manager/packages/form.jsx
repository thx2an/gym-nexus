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
    <div className="max-w-xl bg-white border border-borderColor-light p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-4 text-text-strong">
        {isEdit ? "Edit Package" : "Add New Package"}
      </h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Package Name"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          className="w-full h-28 border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Duration (days)"
          value={form.duration_days}
          onChange={(e) => updateField("duration_days", e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Price (₫)"
          value={form.price}
          onChange={(e) => updateField("price", e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <button className="w-full bg-accent text-white py-3 rounded-lg hover:bg-btnPrimary-hover">
          {isEdit ? "Update Package" : "Create Package"}
        </button>
      </div>
    </div>
  );
}
