"use client";

import Link from "next/link";
import { useState } from "react";
import ExitModal from "@/components/common/ExitModal";
import Toast from "@/components/common/Toast";


export default function LoginPage() {
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // ⭐ NEW STATE

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const [exitOpen, setExitOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  const handleExitConfirm = () => {
    setExitOpen(false);
    setToast({ show: true, message: "Exited to home page." });

    setTimeout(() => {
      window.location.href = "/";
    }, 700);
  };



  // -----------------------------
  // VALIDATION
  // -----------------------------
  const validate = () => {
    const newErrors = {};

    if (!form.identifier.trim()) {
      newErrors.identifier = "Email or phone number is required.";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phonePattern = /^[0-9]{8,15}$/;
      const isEmail = emailPattern.test(form.identifier);
      const isPhone = phonePattern.test(form.identifier);

      if (!isEmail && !isPhone) {
        newErrors.identifier = "Enter a valid email or phone number.";
      }
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // -----------------------------
  // SUBMIT HANDLER WITH LOADING
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true); // 🚀 Start loading

    try {
      // Simulate backend call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Login submitted:", form);

      // TODO: integrate backend login
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // SEPARATE ROLE 
  const redirectByRole = (role) => {
    switch (role) {
      case "manager":
        window.location.href = "/manager/dashboard";
        break;
      case "support":
        window.location.href = "/support/dashboard";
        break;
      case "trainer":
        window.location.href = "/personal-trainer/dashboard";
        break;
      default:
        window.location.href = "/member/dashboard";
    }
  };


  return (
    <div className="bg-accent w-full max-w-md p-8 rounded-xl shadow-[0_2px_8px_rgba(0,10,8,0.15)] border border-borderColor-light">

      <h1 className="text-3xl font-semibold text-bg-base text-center mb-6">
        Login
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Email or Phone */}
        <div>
          <input
            type="text"
            placeholder="Email or Phone Number"
            value={form.identifier}
            onChange={(e) => updateField("identifier", e.target.value)}
            disabled={loading}
            className={`w-full p-3 border rounded-lg bg-form-bg text-form-text focus:ring-2 focus:ring-form-focus 
              ${errors.identifier ? "border-notify-errorText" : "border-form-border"}
              ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          />
          {errors.identifier && (
            <p className="text-notify-errorText text-sm mt-1">{errors.identifier}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
            disabled={loading}
            className={`w-full p-3 border rounded-lg bg-form-bg text-form-text focus:ring-2 focus:ring-form-focus 
              ${errors.password ? "border-notify-errorText" : "border-form-border"}
              ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          />
          {errors.password && (
            <p className="text-notify-errorText text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-btnPrimary-text transition 
            bg-btnPrimary hover:bg-btnPrimary-hover
            flex items-center justify-center gap-2
            ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {loading && (
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
          )}
          {loading ? "Processing..." : "Login"}
        </button>
      </form>



      {/* Forgot Password */}
      <div className="text-center mt-4">
        <Link href="/auth/forgot-password" className="text-bg-base hover:text-bg-secondarySurface underline">
          Forgot password?
        </Link>
      </div>

      {/* Register */}
      <p className="text-center mt-4 text-text-medium">
        Don’t have an account?{" "}
        <Link href="/auth/register" className="text-bg-base hover:text-bg-secondarySurface font-semibold">
          Register
        </Link>
      </p>

      {/* Back to Home */}
      <p
        onClick={() => setExitOpen(true)}
        className="text-center mt-3 text-bg-base hover:text-bg-secondarySurface underline cursor-pointer"
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
