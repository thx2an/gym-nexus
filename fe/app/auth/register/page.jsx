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
    confirm_password: ""
  });

  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Add the modal + toast state HERE
  const [exitOpen, setExitOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  const handleExitConfirm = () => {
    setExitOpen(false);
    setToast({ show: true, message: "Exited to home page." });

    setTimeout(() => {
      window.location.href = "/";
    }, 700);
  };

  // ---------------------------------------------------
  // FRONTEND VALIDATION RULES
  // ---------------------------------------------------
  const validate = () => {
    const newErrors = {};

    // Full Name
    if (!form.full_name.trim()) {
      newErrors.full_name = "Full name is required.";
    } else if (form.full_name.length < 3) {
      newErrors.full_name = "Name must be at least 3 characters.";
    }

    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // Phone
    const phonePattern = /^[0-9]{8,15}$/;
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!phonePattern.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number (8–15 digits).";
    }

    // Gender
    if (!form.gender) {
      newErrors.gender = "Gender is required.";
    }

    // Date of Birth
    if (!form.date_of_birth) {
      newErrors.date_of_birth = "Date of birth is required.";
    }

    // Password
    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    } else {
      const hasLetter = /[A-Za-z]/.test(form.password);
      const hasNumber = /[0-9]/.test(form.password);

      if (!hasLetter || !hasNumber) {
        newErrors.password = "Password must include both letters and numbers.";
      }
    }


    // Confirm Password
    if (!form.confirm_password.trim()) {
      newErrors.confirm_password = "Please confirm your password.";
    } else if (form.confirm_password !== form.password) {
      newErrors.confirm_password = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------------------------------------------
  // SUBMIT HANDLER
  // ---------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    console.log("Form submitted successfully:", form);

    // TODO: connect to backend register API
  };

  return (
    <div className="bg-accent w-full max-w-md p-8 rounded-xl shadow-[0_2px_8px_rgba(0,10,8,0.15)] border border-borderColor-light">

      <h1 className="text-3xl font-semibold text-bg-base text-center mb-6">
        Create Account
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Full Name */}
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={form.full_name}
            onChange={(e) => updateField("full_name", e.target.value)}
            className={`w-full p-3 border rounded-lg bg-form-bg text-form-text focus:ring-2 focus:ring-form-focus 
                ${errors.full_name ? "border-notify-errorText" : "border-form-border"}`}
          />
          {errors.full_name && (
            <p className="text-notify-errorText text-sm mt-1">{errors.full_name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={`w-full p-3 border rounded-lg bg-form-bg text-form-text focus:ring-2 focus:ring-form-focus 
                ${errors.email ? "border-notify-errorText" : "border-form-border"}`}
          />
          {errors.email && (
            <p className="text-notify-errorText text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className={`w-full p-3 border rounded-lg bg-form-bg text-form-text focus:ring-2 focus:ring-form-focus 
                ${errors.phone ? "border-notify-errorText" : "border-form-border"}`}
          />
          {errors.phone && (
            <p className="text-notify-errorText text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Gender Dropdown */}
        <div>
          <select
            value={form.gender}
            onChange={(e) => updateField("gender", e.target.value)}
            className={`w-full p-3 border rounded-lg bg-form-bg text-form-text focus:ring-2 focus:ring-form-focus 
                ${errors.gender ? "border-notify-errorText" : "border-form-border"}`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-notify-errorText text-sm mt-1">{errors.gender}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <input
            type="date"
            value={form.date_of_birth}
            onChange={(e) => updateField("date_of_birth", e.target.value)}
            className={`w-full p-3 border rounded-lg bg-form-bg text-form-text focus:ring-2 focus:ring-form-focus 
                ${errors.date_of_birth ? "border-notify-errorText" : "border-form-border"}`}
          />
          {errors.date_of_birth && (
            <p className="text-notify-errorText text-sm mt-1">{errors.date_of_birth}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
            className={`w-full p-3 border rounded-lg bg-form-bg text-form-text focus:ring-2 focus:ring-form-focus 
                ${errors.password ? "border-notify-errorText" : "border-form-border"}`}
          />
          {errors.password && (
            <p className="text-notify-errorText text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={form.confirm_password}
            onChange={(e) => updateField("confirm_password", e.target.value)}
            className={`w-full p-3 border rounded-lg bg-form-bg text-form-text focus:ring-2 focus:ring-form-focus 
                ${errors.confirm_password ? "border-notify-errorText" : "border-form-border"}`}
          />
          {errors.confirm_password && (
            <p className="text-notify-errorText text-sm mt-1">{errors.confirm_password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-btnPrimary text-btnPrimary-text hover:bg-btnPrimary-hover transition"
        >
          Register
        </button>

      </form>

      <p className="text-center mt-4 text-text-medium">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-bg-base hover:text-bg-secondarySurface font-semibold">Login</Link>
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
