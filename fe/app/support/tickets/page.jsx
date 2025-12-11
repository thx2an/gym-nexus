"use client";

import Link from "next/link";
import TicketStatusBadge from "./TicketStatusBadge";

export default function TicketListStaff() {
  const tickets = [
    { id: 1, subject: "Payment not processed", status: "open", member: "Alice" },
    { id: 2, subject: "Cannot book session", status: "in_progress", member: "David" },
    { id: 3, subject: "Refund request delayed", status: "waiting", member: "Sara" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Support Tickets</h1>

      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-secondary text-text-strong">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Subject</th>
              <th className="p-3 border">Member</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((t, i) => (
              <tr key={t.id} className={i % 2 === 0 ? "bg-white" : "bg-bg-subtle"}>
                <td className="p-3 border">{t.id}</td>
                <td className="p-3 border">{t.subject}</td>
                <td className="p-3 border">{t.member}</td>
                <td className="p-3 border">
                  <TicketStatusBadge status={t.status} />
                </td>
                <td className="p-3 border">
                  <Link
                    href={`/support/tickets/${t.id}`}
                    className="text-accent font-semibold"
                  >
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
