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
      { sender: "Support", content: "We are checking it now.", time: "10:10 AM" },
    ],
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Ticket #{id}</h1>

      <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">

        <p><strong>Subject:</strong> {ticket.subject}</p>
        <p><strong>Member:</strong> {ticket.member}</p>
        <div>
          <strong>Status:</strong> <TicketStatusBadge status={ticket.status} />
        </div>

        <h2 className="mt-6 mb-2 font-semibold text-lg">Messages</h2>

        <div className="space-y-3">
          {ticket.messages.map((m, i) => (
            <div key={i} className="border p-3 rounded-lg bg-bg-subtle">
              <p className="font-semibold">{m.sender}</p>
              <p>{m.content}</p>
              <p className="text-sm text-text-medium">{m.time}</p>
            </div>
          ))}
        </div>

        <textarea
          className="w-full p-3 border rounded-lg mt-4"
          placeholder="Type your reply..."
        />

        <button className="mt-3 bg-accent text-white px-6 py-2 rounded-lg hover:bg-btnPrimary-hover">
          Send Reply
        </button>
      </div>
    </div>
  );
}
