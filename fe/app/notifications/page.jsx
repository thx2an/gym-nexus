"use client";

export default function SupportNotificationsPage() {
  const notifications = [
    { id: 1, message: "New ticket: Payment issue", time: "2 minutes ago" },
    { id: 2, message: "Live chat started", time: "10 minutes ago" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>

      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="bg-white p-4 border border-borderColor-light rounded-lg shadow-sm"
          >
            <p className="font-medium">{n.message}</p>
            <p className="text-sm text-text-medium">{n.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
