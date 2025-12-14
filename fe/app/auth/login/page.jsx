"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

import Toast from "@/components/common/Toast";
import ExitModal from "@/components/common/ExitModal";

export default function LoginPage() {
  const router = useRouter(); // Initialize router
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [exitOpen, setExitOpen] = useState(false);

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

    const checkToken = async () => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        try {
          // Call API check-token
          const res = await axios.get("http://127.0.0.1:8000/api/check-token", {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (res.data.status) {
            // Valid token -> Redirect
            localStorage.setItem("auth_user", JSON.stringify(res.data.user));
            const role = res.data.user.idChucVu;
            redirectByRole(role);
          } else {
            // Invalid -> Clear
            localStorage.removeItem("auth_token");
          }
        } catch (error) {
          console.error("Token invalid:", error);
          localStorage.removeItem("auth_token");
        }
      }
    };
    checkToken();
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

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  const handleExitConfirm = () => {
    setExitOpen(false);
    router.push("/");
  };

  return (
    <div className="bg-accent w-full max-w-md p-8 rounded-xl shadow-[0_2px_8px_rgba(0,10,8,0.15)] border border-borderColor-light">

      <h1 className="text-3xl font-semibold text-bg-base text-center mb-6">
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
    </div >
  );
}
