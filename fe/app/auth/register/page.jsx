"use client";

import Link from "next/link";
import { useState } from "react";

import { useRouter } from "next/navigation";
import authApi from "@/lib/api/authApi";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    gender: "",
    date_of_birth: "",
    password: "",
    confirm_password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showExitDialog, setShowExitDialog] = useState(false);

  const updateField = (field, value) => {
    let newValue = value;

    // Quick Guard / Normalization
    if (field === 'full_name') {
      newValue = value.replace(/\s+/g, ' ');
    } else if (field === 'phone') {
      newValue = value.replace(/[^0-9+]/g, '');
    } else if (field === 'email') {
      newValue = value.trim();
    }

    setForm((prev) => ({ ...prev, [field]: newValue }));
  };

  /* ================= VALIDATION ================= */
  const validate = () => {
    const newErrors = {};

    // 1. Full Name
    const nameRegex = /^(?=.{2,50}$)[\p{L}]+(?:[ '-][\p{L}]+)*$/u;
    if (!form.full_name) {
      newErrors.full_name = "Full name is required.";
    } else if (!nameRegex.test(form.full_name.trim())) {
      newErrors.full_name = "Name must be 2-50 chars, no numbers or special symbols.";
    }

    // 2. Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format.";
    } else if (form.email.length > 254) {
      newErrors.email = "Email is too long.";
    }

    // 3. Phone
    const phoneRegex = /^(?:0\d{9}|\+84\d{9})$/;
    if (!form.phone) newErrors.phone = "Phone is required.";
    else if (!phoneRegex.test(form.phone)) {
      newErrors.phone = "Phone must be 10 digits (0xxxxxxxxx) or +84xxxxxxxxx.";
    }

    // 4. Gender
    if (!form.gender) newErrors.gender = "Gender is required.";

    // 5. Date of Birth
    if (!form.date_of_birth) {
      newErrors.date_of_birth = "Date of birth is required.";
    } else {
      const dob = new Date(form.date_of_birth);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }

      if (dob >= today) {
        newErrors.date_of_birth = "Date of birth must be in the past.";
      } else if (age < 12) {
        newErrors.date_of_birth = "You must be at least 12 years old.";
      } else if (age > 90) {
        newErrors.date_of_birth = "Date of birth is invalid.";
      }
    }

    // 6. Password
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 8 || form.password.length > 64) {
      newErrors.password = "Password must be 8-64 characters.";
    } else if (form.password !== form.password.trim()) {
      newErrors.password = "Password cannot contain leading or trailing spaces.";
    }

    if (form.confirm_password !== form.password) {
      newErrors.confirm_password = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) return;

    setSubmitting(true);
    try {
      // Ensure date format is YYYY-MM-DD
      const payload = { ...form };

      const res = await authApi.register(payload);
      // Assuming authApi.register throws on error or returns response
      // If using previous convention:
      alert("Registration successful! Please login.");
      router.push("/auth/login");
    } catch (error) {
      console.error("Register Error:", error);
      const responseData = error?.response?.data || error;
      const serverErrors = responseData?.errors;

      // Map backend validation errors to fields if possible
      if (serverErrors) {
        const normalizedErrors = Object.fromEntries(
          Object.entries(serverErrors).map(([key, value]) => [
            key,
            Array.isArray(value) ? value[0] : value,
          ])
        );
        setErrors(normalizedErrors);
      } else {
        const msg = responseData?.message || "Registration failed. Please try again.";
        alert(msg);
      }
    } finally {
      setSubmitting(false);
    }
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
            <Field type="email" placeholder="Email Address" value={form.email} error={errors.email} onChange={(v) => updateField("email", v)} />
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
