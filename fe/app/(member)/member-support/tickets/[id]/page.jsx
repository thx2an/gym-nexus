"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Send } from "lucide-react"
import { supportApi } from "@/lib/api/supportApi"

export default function MemberTicketDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [ticket, setTicket] = useState(null)
  const [reply, setReply] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const [sendError, setSendError] = useState(null)
  const [closeError, setCloseError] = useState(null)

  useEffect(() => {
    if (!id) return
    loadTicket()
  }, [id])

  const normalizeStatus = (status) => {
    if (!status) return "open"
    return status.toString().trim().toLowerCase().replace(/\s+/g, "_")
  }

  const getStatusLabel = (status) => {
    const normalized = normalizeStatus(status)
    const labels = {
      open: "Open",
      in_progress: "In Progress",
      waiting: "Waiting",
      waiting_for_member: "Waiting for Member",
      resolved: "Resolved",
      closed: "Closed",
    }
    return labels[normalized] || "Open"
  }

  const getStatusBadge = (status) => {
    const styles = {
      open: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      in_progress: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      waiting: "bg-[#282828] text-[#a0a0a0] border-[#282828]",
      waiting_for_member: "bg-[#282828] text-[#a0a0a0] border-[#282828]",
      resolved: "bg-green-500/10 text-green-500 border-green-500/20",
      closed: "bg-[#282828] text-[#606060] border-[#282828]",
    }
    const normalized = normalizeStatus(status)
    return (
      <span className={`px-3 py-1 rounded-lg border text-xs font-semibold ${styles[normalized] || styles.open}`}>
        {getStatusLabel(status)}
      </span>
    )
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return ""
    const date = new Date(timestamp)
    if (Number.isNaN(date.getTime())) return ""
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })
  }

  const loadTicket = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await supportApi.getTicketDetail(id)
      if (response.success) {
        setTicket(response.data)
      } else {
        setError("Failed to load ticket")
      }
    } catch (err) {
      setError(err?.message || "Failed to load ticket")
    } finally {
      setLoading(false)
    }
  }

  const handleSend = async () => {
    if (!reply.trim()) return

    try {
      setSending(true)
      setSendError(null)
      const response = await supportApi.replyMemberTicket(id, { content: reply.trim() })
      if (!response.success) {
        setSendError("Failed to send reply")
        return
      }

      setTicket((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          status: response.data?.status || prev.status,
          messages: [
            ...(prev.messages || []),
            {
              id: `local-${Date.now()}`,
              sender: "Member",
              sender_role: "member",
              content: reply.trim(),
              timestamp: new Date().toISOString(),
            },
          ],
        }
      })
      setReply("")
    } catch (err) {
      setSendError(err?.message || "Failed to send reply")
    } finally {
      setSending(false)
    }
  }

  const handleClose = async () => {
    try {
      setCloseError(null)
      const response = await supportApi.closeMemberTicket(id)
      if (!response.success) {
        setCloseError("Failed to close ticket")
        return
      }
      setTicket((prev) => {
        if (!prev) return prev
        return { ...prev, status: response.data?.status || "resolved" }
      })
    } catch (err) {
      setCloseError(err?.message || "Failed to close ticket")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#282828] border-t-[#f0f0f0] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#a0a0a0]">Loading ticket...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <h3 className="text-xl font-semibold text-[#f0f0f0] mb-2">Failed to Load Ticket</h3>
          <p className="text-[#a0a0a0] mb-6">{error}</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={loadTicket}
              className="px-6 py-2.5 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg font-medium transition-colors"
            >
              Retry
            </button>
            <button
              onClick={() => router.back()}
              className="px-6 py-2.5 bg-[#282828] hover:bg-[#333333] text-[#f0f0f0] rounded-lg font-medium transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  const isResolved = ["resolved", "closed"].includes(normalizeStatus(ticket?.status))

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-[#282828] transition-colors text-[#f0f0f0]"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-[#f0f0f0]">Ticket #{ticket?.id}</h1>
            <p className="text-[#a0a0a0]">View and respond to support ticket</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleClose}
          disabled={isResolved}
          className="px-5 py-2.5 rounded-lg font-medium border border-[#282828] text-[#f0f0f0]
            hover:bg-[#1E1E1E] transition disabled:opacity-60"
        >
          {isResolved ? "Closed" : "Close Ticket"}
        </button>
      </div>

      <div className="bg-[#282828] border border-[#282828] rounded-lg p-6">
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-[#606060] mb-1">Subject</p>
            <p className="text-[#f0f0f0] font-semibold text-base">
              {ticket?.subject || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-[#606060] mb-1">Category</p>
            <p className="text-[#f0f0f0] font-medium capitalize">
              {ticket?.category || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-[#606060] mb-1">Status</p>
            {getStatusBadge(ticket?.status)}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#606060]">
          <span>
            Created{" "}
            {ticket?.createdAt
              ? new Date(ticket.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "N/A"}
          </span>
          <span>|</span>
          <span className="capitalize">{ticket?.priority || "normal"} Priority</span>
        </div>
      </div>

      <div className="bg-[#282828] border border-[#282828] rounded-lg p-6 flex flex-col">
        <h2 className="text-base font-semibold text-[#f0f0f0] mb-4">Conversation</h2>

        <div className="space-y-4 mb-6">
          {(ticket?.messages || []).map((message, index) => {
            const senderRole = message.sender_role || ""
            const sender = message.sender || (senderRole === "staff" ? "Support" : "Member")
            const isMember = senderRole === "member" || sender === "Member"

            return (
              <div
                key={index}
                className={`max-w-xl ${isMember ? "ml-auto text-right" : "mr-auto"}`}
              >
                <div
                  className={`rounded-xl px-4 py-3 text-sm ${
                    isMember ? "bg-[#f0f0f0] text-[#141414]" : "bg-[#1E1E1E] text-[#f0f0f0]"
                  }`}
                >
                  <p className="font-semibold mb-1">{sender}</p>
                  <p className="leading-relaxed">{message.content}</p>
                </div>
                <p className="text-xs text-[#606060] mt-1">{formatTime(message.timestamp)}</p>
              </div>
            )
          })}
        </div>

        <div className="border-t border-[#000000] pt-4">
          <textarea
            placeholder="Type your reply..."
            rows={3}
            value={reply}
            onChange={(event) => setReply(event.target.value)}
            disabled={sending || isResolved}
            className="w-full rounded-lg px-4 py-3 text-sm
              bg-[#141414] border border-[#282828]
              text-[#f0f0f0] resize-none
              focus:outline-none focus:border-[#f0f0f0]"
          />

          {closeError && (
            <p className="mt-3 text-sm text-red-400">
              {closeError}
            </p>
          )}

          {sendError && (
            <p className="mt-3 text-sm text-red-400">
              {sendError}
            </p>
          )}

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleSend}
              disabled={sending || isResolved || !reply.trim()}
              className="px-6 py-2.5 rounded-lg font-medium
                bg-[#f0f0f0] text-[#141414]
                hover:bg-[#e0e0e0] transition disabled:opacity-60"
            >
              <span className="inline-flex items-center gap-2">
                <Send className="h-4 w-4" />
                {sending ? "Sending..." : "Send Reply"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
