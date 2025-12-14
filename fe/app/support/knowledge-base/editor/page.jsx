"use client";

import { useState } from "react";

export default function KnowledgeBaseEditorPage() {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const updateField = (k, v) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="max-w-4xl space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Create Article
        </h1>
        <p className="text-sm text-gray-400">
          Write and publish a knowledge base article
        </p>
      </div>

      {/* ================= EDITOR CARD ================= */}
      <div
        className="bg-[#1A1F26] border border-[#2A2F38]
        rounded-2xl p-6 space-y-6"
      >
        {/* TITLE INPUT */}
        <div className="space-y-1">
          <label className="text-xs text-gray-400">
            Article Title
          </label>
          <input
            type="text"
            placeholder="Enter article title..."
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            className="w-full rounded-lg px-3 py-2.5
              bg-[#0F141B] border border-[#2A2F38]
              text-sm text-white
              focus:outline-none focus:border-[#FACC15]"
          />
        </div>

        {/* CONTENT */}
        <div className="space-y-1">
          <label className="text-xs text-gray-400">
            Content
          </label>
          <textarea
            placeholder="Write your article here..."
            value={form.content}
            onChange={(e) => updateField("content", e.target.value)}
            rows={14}
            className="w-full rounded-lg px-3 py-3
              bg-[#0F141B] border border-[#2A2F38]
              text-sm text-white resize-none
              focus:outline-none focus:border-[#FACC15]"
          />
        </div>

        {/* ACTION */}
        <div className="pt-2">
          <button
            className="px-6 py-2.5 rounded-lg font-semibold
              bg-[#FACC15] text-black
              hover:opacity-90 transition"
          >
            Publish Article
          </button>
        </div>
      </div>
    </div>
  );
}
