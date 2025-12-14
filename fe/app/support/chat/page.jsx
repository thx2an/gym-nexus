"use client";

export default function StaffLiveChatConsolePage() {
  const chats = [
    { id: 1, member: "David", last: "I need help booking a PT" },
    { id: 2, member: "Emily", last: "Refund issue" },
  ];

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Live Chat
        </h1>
        <p className="text-sm text-gray-400">
          Respond to members in real time
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* ================= CHAT LIST ================= */}
        <div className="bg-[#1A1F26] border border-[#2A2F38] rounded-2xl p-4">
          <h2 className="text-sm font-semibold text-gray-300 mb-4">
            Active Chats
          </h2>

          <ul className="space-y-2">
            {chats.map((c) => (
              <li
                key={c.id}
                className="p-3 rounded-lg cursor-pointer transition
                  hover:bg-[#0F141B]"
              >
                <p className="font-medium text-white">
                  {c.member}
                </p>
                <p className="text-sm text-gray-400 truncate">
                  {c.last}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* ================= CHAT WINDOW ================= */}
        <div className="md:col-span-2 bg-[#1A1F26] border border-[#2A2F38] rounded-2xl p-4 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {/* Member message */}
            <div className="max-w-md">
              <div className="p-3 rounded-lg bg-[#0F141B]">
                <p className="text-xs font-semibold text-gray-400 mb-1">
                  Member
                </p>
                <p className="text-sm text-white">
                  Hello, I need help booking a session.
                </p>
              </div>
            </div>

            {/* Support message */}
            <div className="max-w-md ml-auto">
              <div className="p-3 rounded-lg bg-[#6C8AE4] text-black">
                <p className="text-xs font-semibold mb-1">
                  Support
                </p>
                <p className="text-sm">
                  Sure! What time would you prefer?
                </p>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="mt-4 flex gap-3 border-t border-[#2A2F38] pt-4">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 rounded-lg px-3 py-2.5 text-sm
                bg-[#0F141B] border border-[#2A2F38] text-white
                focus:outline-none focus:border-[#6C8AE4]"
            />
            <button
              className="px-6 py-2.5 rounded-lg text-sm font-semibold
                bg-[#FACC15] text-black hover:opacity-90 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
