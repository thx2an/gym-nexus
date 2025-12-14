"use client";

import { useParams } from "next/navigation";
import TicketStatusBadge from "../TicketStatusBadge";

export default function TicketDetailsStaffPage() {
  const { id } = useParams();

  // mock data
  const ticket = {
    id,
    subject: "Payment not processed",
    member: "Alice",
    status: "open",
    messages: [
      { sender: "Member", content: "My payment is stuck.", time: "10:05 AM" },
      {
        sender: "Support",
        content: "We are checking it now.",
        time: "10:10 AM",
      },
    ],
  };

  return (
    <div className="max-w-5xl space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Ticket #{id}
        </h1>
        <p className="text-sm text-gray-400">
          View and respond to support ticket
        </p>
      </div>

      {/* ================= TICKET INFO ================= */}
      <div className="bg-[#1A1F26] border border-[#2A2F38] rounded-2xl p-6">
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-gray-400 mb-1">Subject</p>
            <p className="text-white font-semibold text-base">
              {ticket.subject}
            </p>
          </div>

          <div>
            <p className="text-gray-400 mb-1">Member</p>
            <p className="text-white font-medium">
              {ticket.member}
            </p>
          </div>

          <div>
            <p className="text-gray-400 mb-1">Status</p>
            <TicketStatusBadge status={ticket.status} />
          </div>
        </div>
      </div>

      {/* ================= CONVERSATION ================= */}
      <div className="bg-[#1A1F26] border border-[#2A2F38] rounded-2xl p-6 flex flex-col">
        <h2 className="text-base font-semibold text-white mb-4">
          Conversation
        </h2>

        {/* MESSAGES */}
        <div className="space-y-4 mb-6">
          {ticket.messages.map((m, i) => {
            const isSupport = m.sender === "Support";

            return (
              <div
                key={i}
                className={`max-w-xl ${
                  isSupport ? "ml-auto text-right" : "mr-auto"
                }`}
              >
                <div
                  className={`rounded-xl px-4 py-3 text-sm
                    ${
                      isSupport
                        ? "bg-[#6C8AE4] text-black"
                        : "bg-[#0F141B] text-white"
                    }`}
                >
                  <p className="font-semibold mb-1">
                    {m.sender}
                  </p>
                  <p className="leading-relaxed">
                    {m.content}
                  </p>
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  {m.time}
                </p>
              </div>
            );
          })}
        </div>

        {/* ================= REPLY BOX ================= */}
        <div className="border-t border-[#2A2F38] pt-4">
          <textarea
            placeholder="Type your reply..."
            rows={3}
            className="w-full rounded-lg px-4 py-3 text-sm
              bg-[#0F141B] border border-[#2A2F38]
              text-white resize-none
              focus:outline-none focus:border-[#6C8AE4]"
          />

          <div className="flex justify-end mt-4">
            <button
              className="px-6 py-2.5 rounded-lg font-semibold
                bg-[#6C8AE4] text-black
                hover:opacity-90 transition"
            >
              Send Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
