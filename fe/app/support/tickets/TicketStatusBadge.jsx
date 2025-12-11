"use client";

export default function TicketStatusBadge({ status }) {
  const colors = {
    open: "bg-notify-errorBg text-notify-errorText",
    in_progress: "bg-warning/20 text-warning",
    waiting: "bg-secondary text-text-strong",
    resolved: "bg-success/20 text-success",
    closed: "bg-borderColor-dark text-white",
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${colors[status]}`}>
      {status.replace("_", " ").toUpperCase()}
    </span>
  );
}
