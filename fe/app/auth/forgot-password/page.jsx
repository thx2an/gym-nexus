"use client";

import Link from "next/link";
import { useState } from "react";
import ExitModal from "@/components/common/ExitModal";
import Toast from "@/components/common/Toast";

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [exitOpen, setExitOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  const validate = () => {
    const newErrors = {};

    if (!identifier.trim()) {
      newErrors.identifier = "Email or phone number is required.";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phonePattern = /^[0-9]{8,15}$/;

      if (!emailPattern.test(identifier) && !phonePattern.test(identifier)) {
        newErrors.identifier = "Enter a valid email or phone number.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Forgot password for:", identifier);
    setSubmitted(true);
  };

  const handleExitConfirm = () => {
    setExitOpen(false);
    setToast({ show: true, message: "Exited to home page." });

    setTimeout(() => {
      window.location.href = "/";
    }, 700);
  };

  return (
    <div
      className="w-full max-w-md p-8 rounded-2xl border relative"
      style={{
        backgroundColor: "rgba(20,20,20,0.85)",
        borderColor: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
        color: "#f0f0f0",
        fontFamily: "'Obised', sans-serif",
      }}
    >
      <h1 className="text-3xl font-black text-center mb-4 tracking-tight">
        RESET PASSWORD
      </h1>

      <p className="text-center text-sm opacity-70 mb-6">
        Enter your email or phone number and we’ll send you reset instructions.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
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
            className="w-full p-4 rounded-lg outline-none focus:ring-2"
            style={{
              backgroundColor: "#282828",
              borderColor: errors.identifier ? "#ff4444" : "#282828",
              color: "#f0f0f0",
            }}
          />

          {errors.identifier && (
            <p className="text-red-400 text-sm mt-2">
              {errors.identifier}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-lg font-bold tracking-widest transition transform hover:scale-105"
          style={{
            backgroundColor: "#f0f0f0",
            color: "#000014",
          }}
        >
          SEND RESET LINK
        </button>
      </form>

      {submitted && !errors.identifier && (
        <div
          className="mt-5 p-4 rounded-lg text-sm"
          style={{
            backgroundColor: "#1f1f1f",
            color: "#f0f0f0",
            opacity: 0.9,
          }}
        >
          If an account exists for that email or phone number, you’ll receive
          reset instructions shortly.
        </div>
      )}

      <p className="text-center mt-6 opacity-80">
        <Link href="/auth/login" className="underline">
          ← Back to Login
        </Link>
      </p>

      <p
        onClick={() => setExitOpen(true)}
        className="text-center mt-3 underline cursor-pointer opacity-70"
      >
        ← Back to Home
      </p>

      {/* Exit Modal */}
      <ExitModal
        open={exitOpen}
        onClose={() => setExitOpen(false)}
        onConfirm={handleExitConfirm}
      />

      {/* Toast */}
      <Toast
        show={toast.show}
        message={toast.message}
        onClose={() => setToast({ show: false, message: "" })}
      />
    </div>
  );
}
