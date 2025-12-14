"use client";

import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div
      className="w-full max-w-md p-8 rounded-2xl border relative text-center"
      style={{
        backgroundColor: "rgba(20,20,20,0.85)",
        borderColor: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
        color: "#f0f0f0",
        fontFamily: "'Obised', sans-serif",
      }}
    >
      {/* Icon */}
      <div className="text-5xl mb-4">📧</div>

      <h1 className="text-3xl font-black mb-4 tracking-tight">
        VERIFY YOUR EMAIL
      </h1>

      <p className="text-sm opacity-75 mb-6 leading-relaxed">
        We have sent a verification link to your email address.
        <br />
        Please check your inbox and follow the instructions to activate
        your account.
      </p>

      <div className="mt-6">
        <Link
          href="/auth/login"
          className="inline-block px-8 py-3 rounded-lg font-bold tracking-widest transition transform hover:scale-105"
          style={{ backgroundColor: "#f0f0f0", color: "#000014" }}
        >
          RETURN TO LOGIN
        </Link>
      </div>

      <p className="text-xs opacity-60 mt-6">
        Didn’t receive the email? Check your spam folder.
      </p>
    </div>
  );
}
