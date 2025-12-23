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
    if (!form.identifier.trim()) newErrors.identifier = "Email or phone number is required.";
    if (!form.password.trim()) newErrors.password = "Password is required.";
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
    <div className="min-h-screen flex items-center justify-center px-6 text-[#f0f0f0] relative">
      {/* glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-white/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 -right-40 w-[420px] h-[420px] bg-white/10 blur-[120px] rounded-full" />
      </div>

      {/* CARD */}
      <div
        className="relative z-10 w-full max-w-2xl rounded-2xl border p-10"
        style={{
          backgroundColor: "rgba(20,20,20,0.85)",
          borderColor: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* ================= LEFT ================= */}
          <div className="pt-2 pl-8">
            {/* LOGO */}
            <img
              src="/uploads/logogym.png"
              alt="Gym Nexus"
              className="w-32 mb-2 opacity-70"
            />

            {/* LOGIN */}
            <h1
              style={{
                fontFamily: "serif",
                fontSize: "2.1rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                marginBottom: "4px",
              }}
            >
              LOGIN
            </h1>

            {/* SUBTITLE */}
            <p className="text-sm opacity-50 max-w-xs">
              Welcome back to your fitness journey
            </p>
          </div>

<<<<<<< HEAD
  {/* Right */ }
  <form onSubmit={handleSubmit} className="space-y-5">
    {errors.form && (
      <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm text-center">
        {errors.form}
      </div>
    )}

=======
          {/* ================= RIGHT ================= */}
    <form onSubmit={handleSubmit} className="space-y-5 pt-2">
>>>>>>> origin/main
      <div>
        <input
          type="text"
          placeholder="Email or Phone Number"
          value={form.identifier}
          onChange={(e) => updateField("identifier", e.target.value)}
          disabled={loading}
          className="w-full p-4 rounded-lg outline-none"
          style={{
            backgroundColor: "#2a2a2a",
            color: "#f0f0f0",
            border: errors.identifier
              ? "1px solid #ff4444"
              : "1px solid #2a2a2a",
          }}
        />
        {errors.identifier && (
          <p className="text-red-400 text-sm mt-2">{errors.identifier}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => updateField("password", e.target.value)}
          disabled={loading}
          className="w-full p-4 rounded-lg outline-none"
          style={{
            backgroundColor: "#2a2a2a",
            color: "#f0f0f0",
            border: errors.password
              ? "1px solid #ff4444"
              : "1px solid #2a2a2a",
          }}
        />
        {errors.password && (
          <p className="text-red-400 text-sm mt-2">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-lg font-bold tracking-widest transition"
        style={{
          backgroundColor: "#ffffff",
          color: "#000014",
          opacity: loading ? 0.7 : 1,
        }}
      >
        LOGIN
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

      <p
        className="text-center mt-4 underline cursor-pointer opacity-80"
        onClick={() => setShowExitDialog(true)}
      >
        ← Back to Home
      </p>
    </form>
  </div>
      </div >

    {/* EXIT DIALOG */ }
  {
    showExitDialog && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60" onClick={() => setShowExitDialog(false)} />
        <div className="relative z-10 w-full max-w-sm rounded-xl p-6 bg-[#141414] border border-white/20">
          <h3 className="text-lg font-bold mb-3">Exit confirmation</h3>
          <p className="text-sm opacity-80 mb-6">
            Do you want to exit and return to Home page?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowExitDialog(false)}
              className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="px-5 py-2 rounded-lg font-bold bg-white text-[#000014]"
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    )
  }
    </div >
  );
}
