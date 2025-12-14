"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditBranchPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    is_active: true,
  });

  useEffect(() => {
    const mockBranch = {
      name: "Downtown Branch",
      address: "123 Main Street",
      phone: "0902-123-456",
      is_active: true,
    };

    setForm(mockBranch);
    setLoading(false);
  }, [id]);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Update branch:", id, form);
  };

  if (loading) {
    return (
      <div className="text-sm text-gray-400">
        Loading branch data...
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Edit Branch
        </h1>
        <p className="text-sm text-gray-400">
          Update branch information
        </p>
      </div>

      {/* ================= FORM CARD ================= */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#1A1F26] rounded-2xl p-6 space-y-6 shadow-xl border border-[#2A2F38]"
      >
        <Input
          label="Branch Name"
          value={form.name}
          onChange={(v) => updateField("name", v)}
        />

        <Textarea
          label="Address"
          value={form.address}
          onChange={(v) => updateField("address", v)}
        />

        <Input
          label="Phone Number"
          value={form.phone}
          onChange={(v) => updateField("phone", v)}
        />

        {/* ACTIVE STATUS */}
        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => updateField("is_active", e.target.checked)}
            className="w-4 h-4 accent-[#22C55E]"
          />
          <span className="text-sm text-gray-300">
            Active branch
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg font-semibold bg-[#FACC15] text-black hover:opacity-90 transition"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 rounded-lg border border-[#2A2F38] text-gray-300 hover:bg-[#2A2F38] transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function Input({ label, value, onChange }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-400">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg px-3 py-2.5 bg-[#0F141B] border border-[#2A2F38] text-sm text-white focus:outline-none focus:border-[#3B82F6]"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-400">
        {label}
      </label>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg px-3 py-2.5 bg-[#0F141B] border border-[#2A2F38] text-sm text-white focus:outline-none focus:border-[#3B82F6]"
      />
    </div>
  );
}
