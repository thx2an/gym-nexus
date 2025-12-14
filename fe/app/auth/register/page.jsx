"use client";

import Link from "next/link";
import { useState } from "react";
import ExitModal from "@/components/common/ExitModal";
import Toast from "@/components/common/Toast";

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
  const [exitOpen, setExitOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleExitConfirm = () => {
    setExitOpen(false);
    setToast({ show: true, message: "Exited to home page." });
    setTimeout(() => (window.location.href = "/"), 700);
  };

  // ---------------- VALIDATION ----------------
  const validate = () => {
    const newErrors = {};

    if (!form.full_name.trim()) {
      newErrors.full_name = "Full name is required.";
    } else if (form.full_name.length < 3) {
      newErrors.full_name = "Name must be at least 3 characters.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    const phonePattern = /^[0-9]{8,15}$/;
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!phonePattern.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number (8–15 digits).";
    }

    if (!form.gender) {
      newErrors.gender = "Gender is required.";
    }

    if (!form.date_of_birth) {
      newErrors.date_of_birth = "Date of birth is required.";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    } else {
      const hasLetter = /[A-Za-z]/.test(form.password);
      const hasNumber = /[0-9]/.test(form.password);
      if (!hasLetter || !hasNumber) {
        newErrors.password = "Password must include letters and numbers.";
      }
    }

    if (!form.confirm_password.trim()) {
      newErrors.confirm_password = "Please confirm your password.";
    } else if (form.confirm_password !== form.password) {
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
    <div
      className="w-full max-w-4xl p-6 rounded-2xl border relative"
      style={{
        backgroundColor: "rgba(20,20,20,0.85)",
        borderColor: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
        color: "#f0f0f0",
        fontFamily: "'Obised', sans-serif",
      }}
    >
      <h1 className="text-5xl font-black text-center mb-4 tracking-tight">
        CREATE ACCOUNT
      </h1>

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        {/* Full Name */}
        <Field
          placeholder="Full Name"
          value={form.full_name}
          error={errors.full_name}
          onChange={(v) => updateField("full_name", v)}
        />

        {/* Phone */}
        <Field
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          error={errors.phone}
          onChange={(v) => updateField("phone", v)}
        />

        {/* Email - FULL WIDTH */}
        <div className="md:col-span-2">
          <Field
            type="email"
            placeholder="Email Address"
            value={form.email}
            error={errors.email}
            onChange={(v) => updateField("email", v)}
          />
        </div>

        {/* Gender */}
        <div>
          <select
            value={form.gender}
            onChange={(e) => updateField("gender", e.target.value)}
            className="w-full p-3 rounded-lg outline-none"
            style={{
              backgroundColor: "#282828",
              borderColor: errors.gender ? "#ff4444" : "#282828",
              color: "#f0f0f0",
            }}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-400 text-xs mt-1">{errors.gender}</p>
          )}
        </div>

        {/* Date of Birth (đã đổi vị trí) */}
        <Field
          type="date"
          value={form.date_of_birth}
          error={errors.date_of_birth}
          onChange={(v) => updateField("date_of_birth", v)}
        />

        {/* Password */}
        <div className="md:col-span-2">
          <Field
            type="password"
            placeholder="Password"
            value={form.password}
            error={errors.password}
            onChange={(v) => updateField("password", v)}
          />
        </div>

        {/* Confirm Password */}
        <div className="md:col-span-2">
          <Field
            type="password"
            placeholder="Confirm Password"
            value={form.confirm_password}
            error={errors.confirm_password}
            onChange={(v) => updateField("confirm_password", v)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="md:col-span-2 w-full py-3 rounded-lg font-bold tracking-widest transition transform hover:scale-105"
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
        onClick={() => setExitOpen(true)}
        className="text-center mt-2 underline cursor-pointer opacity-70 text-sm"
      >
        ← Back to Home
      </p>

      <ExitModal
        open={exitOpen}
        onClose={() => setExitOpen(false)}
        onConfirm={handleExitConfirm}
      />

      <Toast
        show={toast.show}
        message={toast.message}
        onClose={() => setToast({ show: false, message: "" })}
      />
    </div>
  );
}

/* ============ Reusable Field ============ */
function Field({ type = "text", placeholder, value, onChange, error }) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 rounded-lg outline-none"
        style={{
          backgroundColor: "#282828",
          borderColor: error ? "#ff4444" : "#282828",
          color: "#f0f0f0",
        }}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
