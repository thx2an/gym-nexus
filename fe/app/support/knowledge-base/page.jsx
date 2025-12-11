"use client";

import Link from "next/link";

export default function KnowledgeBasePage() {
  const articles = [
    { id: 1, title: "How to reset your password" },
    { id: 2, title: "How to book a training session" },
    { id: 3, title: "Payment troubleshooting tips" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Knowledge Base</h1>

        <Link
          href="/support/knowledge-base/editor"
          className="bg-accent text-white px-5 py-2 rounded-lg hover:bg-btnPrimary-hover"
        >
          + New Article
        </Link>
      </div>

      <div className="space-y-4">
        {articles.map((a) => (
          <Link
            key={a.id}
            href={`/support/knowledge-base/${a.id}`}
            className="block bg-white p-4 border rounded-lg hover:border-accent"
          >
            <h2 className="font-semibold">{a.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
