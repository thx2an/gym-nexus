"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!identifier.trim()) {
      newErrors.identifier = "Email or phone number is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Forgot password:", identifier);
    setSubmitted(true);
  };

  return (
    <div className="auth-bg flex items-center justify-center px-6 font-['Obised'] text-[#f0f0f0] relative">
      <div
        className="w-full max-w-md p-8 rounded-2xl border relative z-10"
        style={{
          backgroundColor: "rgba(20,20,20,0.85)",
          borderColor: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
        }}
      >
        <h1 className="text-2xl font-bold text-center mb-2">
          Reset Password
        </h1>

        <p className="text-sm opacity-70 text-center mb-6">
          Enter your email or phone number to receive reset instructions.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Email or Phone Number"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#282828] outline-none text-white"
          />
          {errors.identifier && (
            <p className="text-red-400 text-xs">{errors.identifier}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-bold"
            style={{ backgroundColor: "#f0f0f0", color: "#000014" }}
          >
            Send Reset Instructions
          </button>
        </form>

        {submitted && (
          <div className="mt-4 text-sm opacity-80">
            If an account exists, reset instructions will be sent.
          </div>
        )}

        <div className="mt-6 space-y-3 text-center">
          <Link href="/auth/login" className="underline">
            Back to Login
          </Link>

          <p
            className="underline cursor-pointer opacity-80 hover:opacity-100"
            onClick={() => setShowExitDialog(true)}
          >
            ← Back to Home
          </p>
        </div>
      </div>

      {showExitDialog && <ExitDialog onClose={() => setShowExitDialog(false)} />}
    </div>
  );
}

/* ========== EXIT DIALOG ========== */
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
