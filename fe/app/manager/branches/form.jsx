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
    <div className="max-w-xl bg-white border border-borderColor-light p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-4 text-text-strong">
        {isEdit ? "Edit Branch" : "Add New Branch"}
      </h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Branch Name"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) => updateField("address", e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <button className="w-full bg-accent text-white py-3 rounded-lg hover:bg-btnPrimary-hover">
          {isEdit ? "Update Branch" : "Create Branch"}
        </button>
      </div>
    </div>
  );
}
