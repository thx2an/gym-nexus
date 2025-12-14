"use client";

import { useParams } from "next/navigation";

export default function KnowledgeBaseArticlePage() {
  const { id } = useParams();

  // Mock content – giữ nguyên logic
  const article = {
    title: "How to reset your password",
    content: `
To reset your password, go to the login page and click "Forgot password".

You will receive an email with a reset link. Follow the instructions in the email to create a new password.

If you do not receive the email within a few minutes, please check your spam folder or contact support.
    `,
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-white leading-tight">
          {article.title}
        </h1>
        <p className="text-sm text-gray-400">
          Knowledge Base Article
        </p>
      </div>

      {/* ================= ARTICLE CARD ================= */}
      <div className="bg-[#1A1F26] border border-[#2A2F38] rounded-2xl p-6">
        <div
          className="text-sm text-gray-200 leading-relaxed whitespace-pre-line"
        >
          {article.content}
        </div>
      </div>
    </div>
  );
}
