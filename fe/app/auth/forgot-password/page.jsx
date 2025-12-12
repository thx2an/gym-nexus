"use client";

import Link from "next/link";
import { useState } from "react";
import ExitModal from "@/components/common/ExitModal";
import Toast from "@/components/common/Toast";

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState(""); // email or phone
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!identifier.trim()) {
      newErrors.identifier = "Email or phone number is required.";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phonePattern = /^[0-9]{8,15}$/;

      const isEmail = emailPattern.test(identifier);
      const isPhone = phonePattern.test(identifier);

      if (!isEmail && !isPhone) {
        newErrors.identifier = "Enter a valid email or phone number.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // TODO: call backend API: POST /auth/forgot-password
    console.log("Forgot password for:", identifier);
    setSubmitted(true);
  };

  // Add the EXIT modal state and handler HERE
  const [exitOpen, setExitOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  const handleExitConfirm = () => {
    setExitOpen(false);
    setToast({ show: true, message: "Exited to home page." });

    setTimeout(() => {
      window.location.href = "/";
    }, 700);
  };

  return (
    <div className="bg-accent w-full max-w-md p-8 rounded-xl shadow-[0_2px_8px_rgba(0,10,8,0.15)] border border-borderColor-light">

      <h1 className="text-2xl font-semibold text-bg-base text-center mb-4">
        Reset Password
      </h1>

      <p className="text-text-medium text-center mb-6">
        Enter your email or phone number and we’ll send you a reset link or code.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email or Phone */}
        <div>
          <input
            type="text"
            placeholder="Email or Phone Number"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              if (errors.identifier) {
                setErrors((prev) => ({ ...prev, identifier: undefined }));
              }
            }}
            className={`w-full p-3 border rounded-lg bg-form-bg text-form-text focus:ring-2 focus:ring-form-focus
              ${errors.identifier ? "border-notify-errorText" : "border-form-border"}`}
          />
          {errors.identifier && (
            <p className="text-notify-errorText text-sm mt-1">
              {errors.identifier}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-btnPrimary text-btnPrimary-text hover:bg-btnPrimary-hover transition"
        >
          Send Reset Instructions
        </button>
      </form>

      {submitted && !errors.identifier && (
        <div className="mt-4 p-3 rounded-lg bg-notify-infoBg text-notify-infoText text-sm">
          If an account exists for that email or phone number, you’ll receive reset instructions shortly.
        </div>
      )}

      <p className="text-center mt-4">
        <Link href="/auth/login" className="text-bg-base hover:text-bg-secondarySurface underline">
          Back to Login
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
