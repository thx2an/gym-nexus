"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TicketStatusBadge from "./TicketStatusBadge";
import { supportApi } from "@/lib/api/supportApi";

export default function TicketListStaff() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTickets();
  }, []);

  const normalizeStatus = (status) => {
    if (!status) return "open";
    const normalized = status.toString().trim().toLowerCase().replace(/\s+/g, "_");
    if (normalized.includes("waiting")) return "waiting";
    return normalized;
  };

  const loadTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await supportApi.getStaffTickets();
      if (response.success) {
        setTickets(response.data);
      } else {
        setError("Failed to load tickets");
      }
    } catch (err) {
      setError(err?.message || "Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Support Tickets
        </h1>
        <p className="text-sm text-gray-400">
          Manage and respond to member support requests
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-[#2A2F38] bg-[#1A1F26] px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {loading && (
        <div className="rounded-xl border border-[#2A2F38] bg-[#1A1F26] px-4 py-3 text-sm text-gray-300">
          Loading tickets...
        </div>
      )}

      {/* ================= TABLE CARD ================= */}
      <div className="bg-[#1A1F26] border border-[#2A2F38] rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#0F141B]">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-gray-400">
                ID
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-400">
                Subject
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-400">
                Member
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-400">
                Status
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((t, i) => (
              <tr
                key={t.id}
                className="border-t border-[#2A2F38] hover:bg-[#0F141B] transition"
              >
                <td className="px-6 py-4 text-sm text-white">
                  #{t.id}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-white">
                  {t.subject}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {t.member}
                </td>
                <td className="px-6 py-4">
                  <TicketStatusBadge status={normalizeStatus(t.status)} />
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/support/tickets/${t.id}`}
                    className="text-sm font-medium text-[#6C8AE4] hover:underline"
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
