"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, User, X } from "lucide-react"
import { trainingApi } from "@/lib/api/trainingApi"

export default function MySessionsPage() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cancellingId, setCancellingId] = useState(null)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [selectedSession, setSelectedSession] = useState(null)

  useEffect(() => {
    loadSessions()
  }, [])

  const loadSessions = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await trainingApi.getMySessions()
      if (response.success) {
        setSessions(response.data)
      } else {
        setError("Failed to load sessions")
      }
    } catch (err) {
      setError("An error occurred while loading sessions")
    } finally {
      setLoading(false)
    }
  }

  const handleCancelClick = (session) => {
    const sessionDate = new Date(session.date + " " + session.time)
    const hoursUntilSession = (sessionDate - new Date()) / (1000 * 60 * 60)

    if (hoursUntilSession < 24) {
      alert("Cannot cancel sessions within 24 hours of start time")
      return
    }

    setSelectedSession(session)
    setShowCancelModal(true)
  }

  const handleCancelConfirm = async () => {
    if (!selectedSession) return

    try {
      setCancellingId(selectedSession.id)
      await trainingApi.cancelSession(selectedSession.id)
      setSessions(sessions.filter((s) => s.id !== selectedSession.id))
      setShowCancelModal(false)
      setSelectedSession(null)
    } catch (err) {
      alert("Failed to cancel session")
    } finally {
      setCancellingId(null)
    }
  }

  const getStatusBadge = (status) => {
    const styles = {
      Confirmed: "bg-green-500/10 text-green-500 border-green-500/20",
      Completed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      Cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
    }
    return (
      <span className={`px-3 py-1 rounded-lg border text-xs font-semibold ${styles[status] || styles.Confirmed}`}>
        {status}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#282828] border-t-[#f0f0f0] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#a0a0a0]">Loading sessions...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-[#282828] rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-[#606060]" />
          </div>
          <h3 className="text-xl font-semibold text-[#f0f0f0] mb-2">Failed to Load Sessions</h3>
          <p className="text-[#a0a0a0] mb-6">{error}</p>
          <button
            onClick={loadSessions}
            className="px-6 py-2.5 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">My Training Sessions</h1>
          <p className="text-[#a0a0a0]">View and manage your booked sessions</p>
        </div>

        {sessions.length === 0 ? (
          <div className="bg-[#282828] border border-[#282828] rounded-lg p-12 text-center">
            <Calendar className="h-12 w-12 text-[#606060] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#f0f0f0] mb-2">No sessions booked</h3>
            <p className="text-[#a0a0a0] mb-6">Book a session with a trainer to get started</p>
            <a
              href="/dashboard/training/schedule"
              className="inline-block px-6 py-3 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg font-medium transition-colors"
            >
              Book a Session
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <div key={session.id} className="bg-[#282828] border border-[#282828] rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#141414] rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-[#f0f0f0]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#f0f0f0]">{session.trainer}</h3>
                      {getStatusBadge(session.status)}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-3 text-[#a0a0a0]">
                    <Calendar className="h-5 w-5 text-[#606060]" />
                    <span>
                      {new Date(session.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[#a0a0a0]">
                    <Clock className="h-5 w-5 text-[#606060]" />
                    <span>{session.time}</span>
                  </div>
                </div>

                {session.notes && (
                  <div className="mb-4 p-3 bg-[#141414] rounded-lg border border-[#282828]">
                    <div className="text-xs text-[#606060] mb-1">Notes</div>
                    <div className="text-[#a0a0a0] text-sm">{session.notes}</div>
                  </div>
                )}

                {session.status === "Confirmed" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleCancelClick(session)}
                      disabled={cancellingId === session.id}
                      className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowCancelModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#282828] border border-[#282828] rounded-lg p-6 z-50">
            <h3 className="text-xl font-bold text-[#f0f0f0] mb-2">Cancel Session?</h3>
            <p className="text-[#a0a0a0] mb-6">
              Are you sure you want to cancel your session with {selectedSession?.trainer}?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-6 py-3 bg-[#141414] hover:bg-[#1E1E1E] text-[#f0f0f0] rounded-lg font-medium transition-colors"
              >
                Keep Session
              </button>
              <button
                onClick={handleCancelConfirm}
                disabled={cancellingId === selectedSession?.id}
                className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {cancellingId === selectedSession?.id ? "Cancelling..." : "Cancel Session"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
