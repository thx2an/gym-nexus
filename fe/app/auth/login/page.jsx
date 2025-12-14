"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

import Toast from "@/components/common/Toast";

export default function LoginPage() {
  const router = useRouter(); // Initialize router
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // -----------------------------
  // 1. TOKEN CHECK ON MOUNT
  // -----------------------------
  useEffect(() => {
    // Check for timeout query param
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("reason") === "timeout") {
      setToast({ show: true, message: "Session expired due to inactivity.", type: "error" });
      // Clean up URL
      router.replace("/auth/login");
    }
  }, []);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // -----------------------------
  // 2. MAIN LOGIN HANDLER
  // -----------------------------
  const handleLogin = async (e) => {
    if (e) e.preventDefault(); // Handle form submit or button click

    if (!form.email || !form.password) {
      showToast("Please enter both email and password.", "error");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/dang-nhap", form);

      if (!res.data.status) {
        showToast("Login failed. Please check your credentials.", "error");
        return;
      }

      // Success
      localStorage.setItem("auth_token", res.data.token);
      showToast("Login successful!", "success");

      const role = res.data.user.idChucVu;

      setTimeout(() => {
        redirectByRole(role);
      }, 500);

    } catch (err) {
      console.error("Login Error:", err);
      const errorMsg = err.message || "Unknown error occurred";
      showToast(`Error: ${errorMsg}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const redirectByRole = (role) => {
    const roleId = parseInt(role);
    if (roleId === 1) router.push("/manager/dashboard");
    else if (roleId === 2) router.push("/support/dashboard");
    else if (roleId === 3) router.push("/personal_trainer/dashboard");
    else router.push("/dashboard");
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  return (
    <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-[0_2px_8px_rgba(0,10,8,0.15)] border border-borderColor-light">

      <h1 className="text-3xl font-semibold text-text-strong text-center mb-6">
        Login
      </h1>

      <form onSubmit={handleLogin} className="space-y-4">

        {/* Email */}
        <div>
          <input
            type="text"
            placeholder="Email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            disabled={loading}
            className={`w-full p-3 border rounded-lg bg-form-bg text-form-text focus:ring-2 focus:ring-form-focus border-form-border
              ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            style={{ borderRadius: "90px" }}
          />
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            disabled={loading}
            className={`w-full p-3 border rounded-lg bg-form-bg text-form-text focus:ring-2 focus:ring-form-focus border-form-border pr-10
              ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            style={{ borderRadius: "90px" }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-btnPrimary-text transition 
            bg-btnPrimary hover:bg-btnPrimary-hover
            flex items-center justify-center gap-2
            ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
          style={{ backgroundColor: "#8d9cbcff", borderRadius: "100px", color: "#ffffff" }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#5c76ab")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3b5998")}
        >
          {loading && (
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
          )}
          {loading ? "Processing..." : "Login"}
        </button>
      </form>

      {/* Forgot Password */}
      <div className="text-center mt-4">
        <Link href="/auth/forgot-password" className="text-accent underline">
          Forgot password?
        </Link>
      </div>

      {/* Register */}
      <p className="text-center mt-4 text-text-medium">
        Don’t have an account?{" "}
        <Link href="/auth/register" className="text-accent font-semibold">
          Register
        </Link>
      </p>

      {/* Back to Home */}
      <div className="text-center mt-3">
        <Link href="/" className="text-accent underline cursor-pointer">
          ← Back to Home
        </Link>
      </div>

      <Toast
        show={toast.show}
        message={toast.message}
        onClose={() => setToast({ show: false, message: "" })}
      />
    </div >
  );
}
