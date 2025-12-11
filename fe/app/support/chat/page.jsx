"use client";

export default function StaffLiveChatConsolePage() {
  const chats = [
    { id: 1, member: "David", last: "I need help booking a PT" },
    { id: 2, member: "Emily", last: "Refund issue" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Live Chat Console</h1>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Chat List */}
        <div className="bg-white border p-4 rounded-lg shadow-sm">
          <h2 className="font-semibold mb-3">Active Chats</h2>

          <ul className="space-y-3">
            {chats.map((c) => (
              <li key={c.id} className="p-3 border rounded-lg hover:border-accent cursor-pointer">
                <p className="font-semibold">{c.member}</p>
                <p className="text-sm text-text-medium">{c.last}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Window */}
        <div className="md:col-span-2 bg-white border p-4 rounded-lg shadow-sm flex flex-col">
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            <div className="bg-bg-subtle p-3 rounded-lg">
              <p className="font-semibold">Member</p>
              <p>Hello, I need help booking a session.</p>
            </div>

            <div className="bg-accent/20 p-3 rounded-lg">
              <p className="font-semibold">Support</p>
              <p>Sure! What time would you prefer?</p>
            </div>
          </div>

          <div className="mt-3 flex gap-3">
            <input
              type="text"
              className="flex-1 p-3 border rounded-lg"
              placeholder="Type a message..."
            />
            <button className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-btnPrimary-hover">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
