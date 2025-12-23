"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TicketStatusBadge from "../TicketStatusBadge";
import { supportApi } from "@/lib/api/supportApi";

export default function TicketDetailsStaffPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [sendError, setSendError] = useState(null);
  const [closeError, setCloseError] = useState(null);

  useEffect(() => {
    if (!id) return;
    loadTicket();
  }, [id]);

  const normalizeStatus = (status) => {
    if (!status) return "open";
    const normalized = status.toString().trim().toLowerCase().replace(/\s+/g, "_");
    if (normalized.includes("waiting")) return "waiting";
    return normalized;
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const loadTicket = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await supportApi.getStaffTicketDetail(id);
      if (response.success) {
        setTicket(response.data);
      } else {
        setError("Failed to load ticket details");
      }
    } catch (err) {
      setError(err?.message || "Failed to load ticket details");
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!reply.trim()) return;

    try {
      setSending(true);
      setSendError(null);
      const response = await supportApi.replyStaffTicket(id, { content: reply.trim() });
      if (!response.success) {
        setSendError("Failed to send reply");
        return;
      }

      setTicket((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          status: response.data?.status || prev.status,
          messages: [
            ...(prev.messages || []),
            {
              id: `local-${Date.now()}`,
              sender: "Support",
              sender_role: "staff",
              content: reply.trim(),
              timestamp: new Date().toISOString(),
            },
          ],
        };
      });
      setReply("");
    } catch (err) {
      setSendError(err?.message || "Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  const handleClose = async () => {
    try {
      setCloseError(null);
      const response = await supportApi.closeStaffTicket(id);
      if (!response.success) {
        setCloseError("Failed to close ticket");
        return;
      }
      setTicket((prev) => {
        if (!prev) return prev;
        return { ...prev, status: response.data?.status || "resolved" };
      });
    } catch (err) {
      setCloseError(err?.message || "Failed to close ticket");
    }
  };

  const isResolved = ["resolved", "closed"].includes(normalizeStatus(ticket?.status));

  return (
    <div className="max-w-5xl space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/support/tickets"
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tickets
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Ticket #{id}
            </h1>
            <p className="text-sm text-gray-400">
              View and respond to support ticket
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleClose}
          disabled={isResolved}
          className="px-5 py-2.5 rounded-lg font-semibold border border-[#2A2F38] text-white
            hover:bg-[#0F141B] transition disabled:opacity-60"
        >
          {isResolved ? "Closed" : "Close Ticket"}
        </button>
      </div>

      {loading && (
        <div className="rounded-xl border border-[#2A2F38] bg-[#1A1F26] px-4 py-3 text-sm text-gray-300">
          Loading ticket...
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-[#2A2F38] bg-[#1A1F26] px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* ================= TICKET INFO ================= */}
      <div className="bg-[#1A1F26] border border-[#2A2F38] rounded-2xl p-6">
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-gray-400 mb-1">Subject</p>
            <p className="text-white font-semibold text-base">
              {ticket?.subject || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-gray-400 mb-1">Member</p>
            <p className="text-white font-medium">
              {ticket?.member || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-gray-400 mb-1">Status</p>
            <TicketStatusBadge status={normalizeStatus(ticket?.status)} />
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
          {(ticket?.messages || []).map((m, i) => {
            const senderRole = m.sender_role || "";
            const sender = m.sender || (senderRole === "staff" ? "Support" : "Member");
            const isSupport = senderRole === "staff" || sender === "Support";

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
                    {sender}
                  </p>
                  <p className="leading-relaxed">
                    {m.content}
                  </p>
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  {formatTime(m.timestamp)}
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
            value={reply}
            onChange={(event) => setReply(event.target.value)}
            disabled={sending || isResolved}
            className="w-full rounded-lg px-4 py-3 text-sm
              bg-[#0F141B] border border-[#2A2F38]
              text-white resize-none
              focus:outline-none focus:border-[#6C8AE4]"
          />

          {closeError && (
            <p className="mt-3 text-sm text-red-300">
              {closeError}
            </p>
          )}

          {sendError && (
            <p className="mt-3 text-sm text-red-300">
              {sendError}
            </p>
          )}

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleSend}
              disabled={sending || isResolved || !reply.trim()}
              className="px-6 py-2.5 rounded-lg font-semibold
                bg-[#6C8AE4] text-black
                hover:opacity-90 transition disabled:opacity-60"
            >
              {sending ? "Sending..." : "Send Reply"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
