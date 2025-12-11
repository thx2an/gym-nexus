"use client";

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-lg font-bold text-text-strong">{title}</h2>
        <p className="text-text-medium mt-2">{message}</p>

        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onCancel} className="px-4 py-2 rounded bg-bg-subtle">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 rounded bg-accent text-white">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
