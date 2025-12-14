"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPackagePage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    code: "",
    name: "",
    description: "",
    duration_days: "",
    price: "",
    benefits: "",
    is_active: true,
  });

  // ================= LOAD PACKAGE DATA =================
  useEffect(() => {
    // TODO: replace with real API: GET /packages/{id}
    const mockPackage = {
      code: "BASIC_30",
      name: "Basic 30 Days",
      description: "Standard gym access package",
      duration_days: 30,
      price: 500000,
      benefits: "• Gym access\n• Free locker\n• 1 PT session",
      is_active: true,
    };

    setForm(mockPackage);
    setLoading(false);
  }, [id]);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: call backend API PUT /packages/{id}
    console.log("Update package:", id, form);

    // after success
    // router.push("/manager/packages");
  };

  if (loading) {
    return (
      <div className="text-sm text-gray-400">
        Loading package data...
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Edit Package
        </h1>
        <p className="text-sm text-gray-400">
          Update membership package information
        </p>
      </div>

      {/* ================= FORM CARD ================= */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#1A1F26] rounded-2xl p-6 space-y-6 border border-[#2A2F38] shadow-xl"
      >
        <Input
          label="Package Code"
          value={form.code}
          onChange={(v) => updateField("code", v)}
          placeholder="BASIC_30"
        />

        <Input
          label="Package Name"
          value={form.name}
          onChange={(v) => updateField("name", v)}
          placeholder="Basic 30 Days"
        />

        <Textarea
          label="Description"
          value={form.description}
          onChange={(v) => updateField("description", v)}
          placeholder="Describe this package..."
        />

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Duration (days)"
            type="number"
            value={form.duration_days}
            onChange={(v) => updateField("duration_days", v)}
            placeholder="30"
          />

          <Input
            label="Price"
            type="number"
            value={form.price}
            onChange={(v) => updateField("price", v)}
            placeholder="500000"
          />
        </div>

        <Textarea
          label="Benefits"
          value={form.benefits}
          onChange={(v) => updateField("benefits", v)}
          placeholder="• Gym access
• Free locker
• 1 PT session"
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
            Active package
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

function Input({ label, value, onChange, type = "text", placeholder }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-400">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg px-3 py-2.5 bg-[#0F141B] border border-[#2A2F38] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#3B82F6]"
      />
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-400">
        {label}
      </label>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg px-3 py-2.5 bg-[#0F141B] border border-[#2A2F38] text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:border-[#3B82F6]"
      />
    </div>
  );
}
