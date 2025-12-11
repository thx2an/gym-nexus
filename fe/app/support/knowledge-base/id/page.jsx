"use client";

import { useParams } from "next/navigation";

export default function KnowledgeBaseArticlePage() {
  const { id } = useParams();

  const article = {
    title: "How to reset your password",
    content:
      "To reset your password, go to the login page and click 'Forgot password'. Follow the instructions sent to your email.",
  };

  return (
    <div className="max-w-3xl bg-white p-6 border rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-text-medium whitespace-pre-line">{article.content}</p>
    </div>
  );
}
