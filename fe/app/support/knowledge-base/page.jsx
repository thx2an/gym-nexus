"use client";

import Link from "next/link";

export default function KnowledgeBasePage() {
  const articles = [
    { id: 1, title: "How to reset your password" },
    { id: 2, title: "How to book a training session" },
    { id: 3, title: "Payment troubleshooting tips" },
  ];

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Knowledge Base
          </h1>
          <p className="text-sm text-gray-400">
            Manage help articles and guides
          </p>
        </div>

        <Link
          href="/support/knowledge-base/editor"
          className="px-5 py-2.5 rounded-lg font-semibold
            bg-[#FACC15] text-black hover:opacity-90 transition"
        >
          + New Article
        </Link>
      </div>

      {/* ================= ARTICLE LIST ================= */}
      <div className="max-w-4xl space-y-3">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/support/knowledge-base/${article.id}`}
            className="block bg-[#1A1F26] border border-[#2A2F38]
              rounded-xl p-5 transition hover:bg-[#0F141B]"
          >
            <p className="text-sm font-medium text-white">
              {article.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
