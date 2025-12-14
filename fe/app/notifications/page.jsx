"use client";

export default function NotificationsPage() {
  const notifications = [
    { id: 1, message: "New ticket: Payment issue", time: "2 minutes ago" },
    { id: 2, message: "Live chat started", time: "10 minutes ago" },
  ];

  return (
    <div
      className="min-h-screen flex justify-center px-6 py-16"
      style={{ backgroundColor: "#000014" }}
    >
      <div className="w-full max-w-3xl space-y-8">
        {/* Header */}
        <h1
          className="text-3xl font-black tracking-tight"
          style={{
            color: "#f0f0f0",
            textShadow: "0 0 20px rgba(240,240,240,0.25)",
          }}
        >
          NOTIFICATIONS
        </h1>

        {/* Notification List */}
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="p-6 rounded-2xl border transition hover:scale-[1.01]"
              style={{
                backgroundColor: "rgba(20,20,20,0.9)",
                borderColor: "rgba(255,255,255,0.08)",
                boxShadow: "0 30px 60px rgba(0,0,0,0.65)",
                color: "#f0f0f0",
              }}
            >
              <p className="font-bold text-lg mb-1">
                {n.message}
              </p>
              <p className="text-sm opacity-70">
                {n.time}
              </p>
            </div>
          ))}
        </div>

        {/* Empty state (future-proof) */}
        {notifications.length === 0 && (
          <div
            className="p-12 rounded-2xl border text-center"
            style={{
              backgroundColor: "rgba(20,20,20,0.7)",
              borderColor: "rgba(255,255,255,0.08)",
              color: "#f0f0f0",
              opacity: 0.7,
            }}
          >
            No notifications yet.
          </div>
        )}
      </div>
    </div>
  );
}
