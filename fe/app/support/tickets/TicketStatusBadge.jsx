"use client";

export default function TicketStatusBadge({ status }) {
  const styles = {
    open: "bg-red-500/15 text-red-400",
    in_progress: "bg-amber-500/15 text-amber-400",
    waiting: "bg-gray-500/15 text-gray-300",
    resolved: "bg-emerald-500/15 text-emerald-400",
    closed: "bg-gray-700 text-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
        ${styles[status] || "bg-gray-500/15 text-gray-300"}
      `}
    >
      {status.replace("_", " ")}
    </span>
  );
}
