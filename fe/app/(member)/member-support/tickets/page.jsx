"use client"

import { useState, useEffect } from "react"
import { HeadphonesIcon, Plus, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { supportApi } from "@/lib/api/supportApi"
import Link from "next/link"

export default function TicketsPage() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    loadTickets()
  }, [])

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

  const loadTickets = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await supportApi.getTickets()
      if (response.success) {
        setTickets(response.data)
      } else {
        setError("Failed to load tickets")
      }
    } catch (err) {
      setError(err?.message || "An error occurred while loading tickets")
    } finally {
      setLoading(false)
    }
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

  const getStatusIcon = (status) => {
    switch (normalizeStatus(status)) {
      case "resolved":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in_progress":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "open":
        return <AlertCircle className="h-5 w-5 text-blue-500" />
      default:
        return <HeadphonesIcon className="h-5 w-5 text-[#606060]" />
    }
  }

  const filteredTickets = filter === "all" ? tickets : tickets.filter((t) => normalizeStatus(t.status) === filter)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#282828] border-t-[#f0f0f0] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#a0a0a0]">Loading tickets...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-[#282828] rounded-full flex items-center justify-center mx-auto mb-4">
            <HeadphonesIcon className="h-8 w-8 text-[#606060]" />
          </div>
          <h3 className="text-xl font-semibold text-[#f0f0f0] mb-2">Failed to Load Tickets</h3>
          <p className="text-[#a0a0a0] mb-6">{error}</p>
          <button
            onClick={loadTickets}
            className="px-6 py-2.5 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">Support Tickets</h1>
          <p className="text-[#a0a0a0]">View and manage your support requests</p>
        </div>
        <Link
          href="/member-support/tickets/new"
          className="flex items-center gap-2 px-6 py-3 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg font-medium transition-colors"
        >
          <Plus className="h-5 w-5" />
          New Ticket
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="inline-flex bg-[#282828] border border-[#282828] rounded-lg p-1">
          {[
            { value: "all", label: "All" },
            { value: "open", label: "Open" },
            { value: "in_progress", label: "In Progress" },
            { value: "resolved", label: "Resolved" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
                filter === tab.value ? "bg-[#f0f0f0] text-[#141414]" : "text-[#a0a0a0] hover:text-[#f0f0f0]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {filteredTickets.length === 0 ? (
        <div className="bg-[#282828] border border-[#282828] rounded-lg p-12 text-center">
          <HeadphonesIcon className="h-12 w-12 text-[#606060] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#f0f0f0] mb-2">No tickets found</h3>
          <p className="text-[#a0a0a0] mb-6">
            {filter === "all"
              ? "You haven't created any support tickets yet"
              : `No ${filter.replace("_", " ")} tickets`}
          </p>
          <Link
            href="/member-support/tickets/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg font-medium transition-colors"
          >
            <Plus className="h-5 w-5" />
            Create Your First Ticket
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-[#282828] border border-[#282828] rounded-lg p-6 hover:bg-[#1E1E1E] transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">{getStatusIcon(ticket.status)}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#f0f0f0] mb-1">{ticket.subject}</h3>
                    <p className="text-[#a0a0a0] text-sm mb-3">{ticket.description}</p>
                    <div className="flex items-center gap-4 text-xs text-[#606060]">
                      <span>Ticket #{ticket.id}</span>
                      <span>•</span>
                      <span>
                        Created{" "}
                        {new Date(ticket.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span>•</span>
                      <span className="capitalize">{ticket.priority} Priority</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(ticket.status)}
                  <Link
                    href={`/member-support/tickets/${ticket.id}`}
                    className="px-3 py-1 rounded-lg border border-[#000000] text-xs font-semibold text-[#f0f0f0] hover:bg-[#1E1E1E] transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>

              {ticket.lastReply && (
                <div className="mt-4 pt-4 border-t border-[#000000]">
                  <div className="flex items-start gap-3">
                    <div className="text-xs text-[#606060]">Last reply:</div>
                    <div className="flex-1">
                      <p className="text-sm text-[#a0a0a0] mb-1">{ticket.lastReply.message}</p>
                      <p className="text-xs text-[#606060]">
                        by {ticket.lastReply.by} •{" "}
                        {new Date(ticket.lastReply.timestamp).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
