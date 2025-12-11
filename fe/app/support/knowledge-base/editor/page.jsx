"use client";

import { useState } from "react";

export default function KnowledgeBaseEditorPage() {
  const [form, setForm] = useState({ title: "", content: "" });

  const updateField = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="max-w-3xl bg-white p-6 border rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold mb-4">Create Article</h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Article Title"
          className="w-full p-3 border rounded-lg"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
        />

        <textarea
          placeholder="Write your article here..."
          className="w-full p-4 border rounded-lg h-64"
          value={form.content}
          onChange={(e) => updateField("content", e.target.value)}
        />

        <button className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-btnPrimary-hover">
          Publish Article
        </button>
      </div>
    </div>
  );
}
