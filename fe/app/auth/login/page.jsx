"use client";

import { useState } from "react";
import authApi from "@/lib/api/authApi";

export default function LoginPage() {
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.identifier.trim()) {
      newErrors.identifier = "Email or phone number is required.";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const redirectByRole = (roleId) => {
    // 1: Manager, 2: Staff, 3: PT, 4: Member
    switch (Number(roleId)) {
      case 1: // Manager
        window.location.href = "/manager/dashboard";
        break;
      case 2: // Staff (Support)
        window.location.href = "/support/dashboard";
        break;
      case 3: // PT
        window.location.href = "/personal_trainer/dashboard";
        break;
      case 4: // Member
        window.location.href = "/dashboard";
        break;
      default:
        window.location.href = "/dashboard";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({}); // Clear previous errors

    try {
      const res = await authApi.login({
        email: form.identifier,
        password: form.password
      });

      // Assuming BE returns { status: true, token: "...", user: {...} } or similar
      // Adjust based on actual BE response structure. Usually: res.token or res.data.token

      const token = res.token || res.access_token;
      const user = res.user;

      if (token) {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify(user));

        // Redirect based on role
        if (user && user.idChucVu) {
          redirectByRole(user.idChucVu);
        } else {
          // Fallback
          window.location.href = "/dashboard";
        }
      } else {
        setErrors({ form: "Login failed: No token received." });
      }

    } catch (error) {
      console.error("Login error:", error);
      const msg = error.response?.data?.message || "Login failed. Please check your credentials.";
      setErrors({ form: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg flex items-center justify-center px-6 font-['Obised'] text-[#f0f0f0] relative">

      {/* Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full bg-white/10 blur-[120px]" />
        <div className="absolute bottom-0 -right-40 w-[420px] h-[420px] rounded-full bg-white/10 blur-[120px]" />
      </div>

      {/* Login Card */}
      <div
        className="w-full max-w-2xl p-10 rounded-2xl border relative z-10"
        style={{
          backgroundColor: "rgba(20,20,20,0.85)",
          borderColor: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Left */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 mb-6 rounded-xl overflow-hidden bg-white shadow-lg">
              <img
                src="/uploads/gymlogo.png"
                alt="Gym Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-5xl font-black mb-4 tracking-tight">
              LOGIN
            </h1>
            <p className="text-lg opacity-70">
              Welcome back to your fitness journey
            </p>
          </div>

          {/* Right */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {errors.form && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm text-center">
                {errors.form}
              </div>
            )}

            <div>
              <input
                type="text"
                placeholder="Email or Phone Number"
                value={form.identifier}
                onChange={(e) => updateField("identifier", e.target.value)}
                disabled={loading}
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

            <div>
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                disabled={loading}
                className="w-full p-4 rounded-lg outline-none focus:ring-2"
                style={{
                  backgroundColor: "#282828",
                  borderColor: errors.password ? "#ff4444" : "#282828",
                  color: "#f0f0f0",
                }}
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-lg font-bold tracking-widest transition hover:scale-105"
              style={{
                backgroundColor: "#f0f0f0",
                color: "#000014",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "PROCESSING..." : "LOGIN"}
            </button>

            <div className="text-center opacity-80">
              <a href="/auth/forgot-password">Forgot password?</a>
            </div>

            <p className="text-center opacity-80">
              Don&apos;t have an account?{" "}
              <a href="/auth/register" className="font-bold">
                Register
              </a>
            </p>

            {/* Back to Home */}
            <p
              className="text-center mt-5 underline cursor-pointer opacity-80 hover:opacity-100"
              onClick={() => setShowExitDialog(true)}
            >
              ← Back to Home
            </p>
          </form>
        </div>
      </div>

      {/* EXIT CONFIRM DIALOG */}
      {showExitDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowExitDialog(false)}
          />

          {/* Dialog */}
          <div
            className="relative z-10 w-full max-w-sm rounded-xl p-6 border"
            style={{
              backgroundColor: "#141414",
              borderColor: "rgba(255,255,255,0.12)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
            }}
          >
            <h3 className="text-lg font-bold mb-3 text-[#f0f0f0]">
              Exit confirmation
            </h3>

            <p className="text-sm opacity-80 mb-6">
              Do you want to exit and return to Home page?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowExitDialog(false)}
                className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="px-5 py-2 rounded-lg font-bold transition"
                style={{
                  backgroundColor: "#f0f0f0",
                  color: "#000014",
                }}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
