"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    gender: "",
    date_of_birth: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});
  const [showExitDialog, setShowExitDialog] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  /* ================= VALIDATION ================= */
  const validate = () => {
    const newErrors = {};

    if (!form.full_name.trim()) newErrors.full_name = "Full name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    if (!form.phone.trim()) newErrors.phone = "Phone is required.";
    if (!form.gender) newErrors.gender = "Gender is required.";
    if (!form.date_of_birth) newErrors.date_of_birth = "Date of birth is required.";

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (form.confirm_password !== form.password) {
      newErrors.confirm_password = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Register submitted:", form);
  };

  return (
    <div className="auth-bg flex items-center justify-center px-6 font-['Obised'] text-[#f0f0f0] relative">

      {/* REGISTER CARD */}
      <div
        className="w-full max-w-4xl p-8 rounded-2xl border relative z-10"
        style={{
          backgroundColor: "rgba(20,20,20,0.85)",
          borderColor: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
        }}
      >
        <h1 className="text-3xl font-black text-center mb-6">
          CREATE ACCOUNT
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Field placeholder="Full Name" value={form.full_name} error={errors.full_name} onChange={(v) => updateField("full_name", v)} />
          <Field placeholder="Phone Number" value={form.phone} error={errors.phone} onChange={(v) => updateField("phone", v)} />

          <div className="md:col-span-2">
            <Field placeholder="Email Address" value={form.email} error={errors.email} onChange={(v) => updateField("email", v)} />
          </div>

          <select
            value={form.gender}
            onChange={(e) => updateField("gender", e.target.value)}
            className="w-full p-3 rounded-lg bg-[#282828] outline-none text-white"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <Field type="date" value={form.date_of_birth} error={errors.date_of_birth} onChange={(v) => updateField("date_of_birth", v)} />

          <div className="md:col-span-2">
            <Field type="password" placeholder="Password" value={form.password} error={errors.password} onChange={(v) => updateField("password", v)} />
          </div>

          <div className="md:col-span-2">
            <Field type="password" placeholder="Confirm Password" value={form.confirm_password} error={errors.confirm_password} onChange={(v) => updateField("confirm_password", v)} />
          </div>

          <button
            type="submit"
            className="md:col-span-2 w-full py-3 rounded-lg font-bold tracking-widest hover:scale-105 transition"
            style={{ backgroundColor: "#f0f0f0", color: "#000014" }}
          >
            REGISTER
          </button>
        </form>

        <p className="text-center mt-4 opacity-80 text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline font-bold">
            Login
          </Link>
        </p>

        <p
          className="text-center mt-2 underline cursor-pointer opacity-80 hover:opacity-100"
          onClick={() => setShowExitDialog(true)}
        >
          ← Back to Home
        </p>
      </div>

      {/* EXIT CONFIRM DIALOG */}
      {showExitDialog && <ExitDialog onClose={() => setShowExitDialog(false)} />}
    </div>
  );
}

/* ================= EXIT DIALOG ================= */
function ExitDialog({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        className="relative z-10 w-full max-w-sm rounded-xl p-6 border"
        style={{
          backgroundColor: "#141414",
          borderColor: "rgba(255,255,255,0.12)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
        }}
      >
        <h3 className="text-lg font-bold mb-3">Exit confirmation</h3>
        <p className="text-sm opacity-80 mb-6">
          Do you want to exit and return to Home page?
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10">
            Cancel
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-5 py-2 rounded-lg font-bold"
            style={{ backgroundColor: "#f0f0f0", color: "#000014" }}
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= FIELD ================= */
function Field({ type = "text", placeholder, value, onChange, error }) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 rounded-lg outline-none bg-[#282828] text-white"
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
