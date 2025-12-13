"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
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

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error when typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[field];
        return newErrs;
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.full_name.trim()) {
      newErrors.full_name = "Full name is required.";
    } else if (form.full_name.length < 2) {
      newErrors.full_name = "Name must be at least 2 characters.";
    } else if (!/^[\p{L}\s]+$/u.test(form.full_name)) {
      newErrors.full_name = "Full name cannot contain special characters.";
    }

    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email format.";

    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required.";
    } else if (!/^[0-9]{10,11}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be 10-11 digits.";
    }

    if (!form.gender) newErrors.gender = "Gender is required.";
    if (!form.date_of_birth) newErrors.date_of_birth = "Date of birth is required.";

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else {
      let passIssues = [];
      if (form.password.length < 8) passIssues.push("at least 8 chars");
      if (!/[A-Z]/.test(form.password)) passIssues.push("1 uppercase letter");
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) passIssues.push("1 special character");

      if (passIssues.length > 0) {
        newErrors.password = "Note: Password must include " + passIssues.join(", ") + ".";
      }
    }

    if (form.confirm_password !== form.password) newErrors.confirm_password = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      // Map form to match backend expectations if needed, but here keys match
      const payload = {
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        gender: form.gender,
        date_of_birth: form.date_of_birth,
        password: form.password
      };

      const res = await axios.post("http://127.0.0.1:8000/api/dang-ky", payload);

      if (res.data.status) {
        showToast(res.data.message || "Registration successful! Please check your email.", "success");
        // Optional: Redirect or clear form
        setForm({
          full_name: "",
          email: "",
          phone: "",
          gender: "",
          date_of_birth: "",
          password: "",
          confirm_password: ""
        });
      } else {
        showToast(res.data.message || "Registration failed.", "error");
      }

    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 422 && err.response.data.errors) {
        const backendErrors = err.response.data.errors;
        const newErrors = {};
        Object.keys(backendErrors).forEach((key) => {
          newErrors[key] = backendErrors[key][0];
        });
        setErrors(newErrors);
        showToast("Please fix the errors details.", "error");
      } else {
        const msg = err.response?.data?.message || err.message || "An error occurred.";
        showToast(msg, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  return (
    <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-[0_2px_8px_rgba(0,10,8,0.15)] border border-borderColor-light my-8">

      <h1 className="text-3xl font-semibold text-text-strong text-center mb-6">
        Register Account
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Full Name */}
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={form.full_name}
            onChange={(e) => updateField("full_name", e.target.value)}
            disabled={loading}
            className={`w-full p-3 border rounded-lg bg-form-bg text-form-text focus:ring-2 focus:ring-form-focus border-form-border
                ${errors.full_name ? "border-notify-errorText" : ""} ${loading ? "opacity-70" : ""}`}
            style={{ borderRadius: "90px" }}
          />
          {errors.full_name && <p className="text-notify-errorText text-xs mt-1 ml-2">{errors.full_name}</p>}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            disabled={loading}
            className={`w-full p-3 border rounded-lg bg-form-bg text-form-text focus:ring-2 focus:ring-form-focus border-form-border
                ${errors.email ? "border-notify-errorText" : ""} ${loading ? "opacity-70" : ""}`}
            style={{ borderRadius: "90px" }}
          />
          {errors.email && <p className="text-notify-errorText text-xs mt-1 ml-2">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            disabled={loading}
            className={`w-full p-3 border rounded-lg bg-form-bg text-form-text focus:ring-2 focus:ring-form-focus border-form-border
                ${errors.phone ? "border-notify-errorText" : ""} ${loading ? "opacity-70" : ""}`}
            style={{ borderRadius: "90px" }}
          />
          {errors.phone && <p className="text-notify-errorText text-xs mt-1 ml-2">{errors.phone}</p>}
        </div>

        {/* Gender & DOB Row */}
        <div className="flex gap-3">
          <div className="w-1/2">
            <select
              value={form.gender}
              onChange={(e) => updateField("gender", e.target.value)}
              disabled={loading}
              className={`w-full p-3 border rounded-lg bg-form-bg text-form-text focus:ring-2 focus:ring-form-focus border-form-border
                        ${errors.gender ? "border-notify-errorText" : ""} ${loading ? "opacity-70" : ""}`}
              style={{ borderRadius: "90px", appearance: "none" }} // appearance-none to look like text input style if needed, but select needs arrow
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-notify-errorText text-xs mt-1 ml-2">{errors.gender}</p>}
          </div>
          <div className="w-1/2">
            <input
              type="date"
              value={form.date_of_birth}
              onChange={(e) => updateField("date_of_birth", e.target.value)}
              disabled={loading}
              className={`w-full p-3 border rounded-lg bg-form-bg text-form-text focus:ring-2 focus:ring-form-focus border-form-border
                        ${errors.date_of_birth ? "border-notify-errorText" : ""} ${loading ? "opacity-70" : ""}`}
              style={{ borderRadius: "90px" }}
            />
            {errors.date_of_birth && <p className="text-notify-errorText text-xs mt-1 ml-2">{errors.date_of_birth}</p>}
          </div>
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
            disabled={loading}
            className={`w-full p-3 border rounded-lg bg-form-bg text-form-text focus:ring-2 focus:ring-form-focus border-form-border pr-10
                ${errors.password ? "border-notify-errorText" : ""} ${loading ? "opacity-70" : ""}`}
            style={{ borderRadius: "90px" }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && <p className="text-notify-errorText text-xs mt-1 ml-2">{errors.password}</p>}

        {/* Confirm Password */}
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={form.confirm_password}
            onChange={(e) => updateField("confirm_password", e.target.value)}
            disabled={loading}
            className={`w-full p-3 border rounded-lg bg-form-bg text-form-text focus:ring-2 focus:ring-form-focus border-form-border
                ${errors.confirm_password ? "border-notify-errorText" : ""} ${loading ? "opacity-70" : ""}`}
            style={{ borderRadius: "90px" }}
          />
          {errors.confirm_password && <p className="text-notify-errorText text-xs mt-1 ml-2">{errors.confirm_password}</p>}
        </div>

        {/* Register Button */}
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
          {loading ? "Processing..." : "Register"}
        </button>

      </form>

      {/* Login Link */}
      <p className="text-center mt-4 text-text-medium">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-accent font-semibold">
          Login
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
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />

    </div>
  );
}
