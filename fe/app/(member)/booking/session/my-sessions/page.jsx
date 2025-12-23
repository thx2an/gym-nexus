"use client"

import { useState, useEffect } from "react"
import { bookingApi } from "@/lib/api/bookingApi"
import { Calendar, Clock, MapPin, User, FileText } from "lucide-react"

export default function MySessionsPage() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSession, setSelectedSession] = useState(null)

  useEffect(() => {
    loadSessions()
  }, [])

  const loadSessions = async () => {
    try {
      setLoading(true)
      const res = await bookingApi.getSessions()
      if (res.success) {
        setSessions(res.data)
      }
    } catch (err) {
      console.error("Failed to load sessions", err)
    } finally {
      setLoading(false)
    }
  }

  // Group sessions by status for better visualization
  const upcomingSessions = sessions.filter(s => ['confirmed', 'pending'].includes(s.status) && new Date(s.start_time) > new Date())
  const pastSessions = sessions.filter(s => s.status === 'completed' || s.status === 'canceled' || (s.status === 'confirmed' && new Date(s.start_time) <= new Date()))

  // Function to view note (PT Note)
  const handleViewNote = async (session) => {
    setSelectedSession(session)
    try {
      const res = await bookingApi.getNote(session.session_id)
      if (res.success && res.data) {
        setSelectedSession(prev => ({ ...prev, note: res.data.notes }))
      }
    } catch (err) {
      // console.error(err)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">My Sessions</h1>
        <p className="text-[#a0a0a0]">Track your training schedule and history</p>
      </div>

      {/* Stats/Upcoming Highlight */}
      {upcomingSessions.length > 0 && (
        <div className="bg-gradient-to-r from-[#1E1E1E] to-[#282828] p-6 rounded-lg border border-[#f0f0f0]/10 mb-8">
          <h2 className="text-xl font-bold text-[#f0f0f0] mb-4">Next Session</h2>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-[#f0f0f0] text-[#141414] rounded-lg p-4 text-center min-w-[100px]">
              <span className="block text-2xl font-bold">
                {new Date(upcomingSessions[0].start_time).getDate()}
              </span>
              <span className="text-sm font-medium uppercase">
                {new Date(upcomingSessions[0].start_time).toLocaleDateString('en-US', { month: 'short' })}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#f0f0f0] mb-2">
                {upcomingSessions[0].profile_pt?.user?.full_name || "Personal Trainer"}
              </h3>
              <div className="flex flex-wrap gap-4 text-[#a0a0a0] text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  {new Date(upcomingSessions[0].start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                  {new Date(upcomingSessions[0].end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs ${upcomingSessions[0].status === 'confirmed' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                    {upcomingSessions[0].status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-8">
          {/* Upcoming List */}
          <div>
            <h2 className="text-lg font-bold text-[#f0f0f0] mb-4 flex items-center gap-2">
              <Calendar size={20} /> Upcoming
            </h2>
            {upcomingSessions.length === 0 ? (
              <p className="text-[#606060]">No upcoming sessions found.</p>
            ) : (
              <div className="grid gap-4">
                {upcomingSessions.map(sess => (
                  <div key={sess.session_id} className="bg-[#1E1E1E] p-4 rounded border border-[#282828] hover:border-[#404040] transition-colors flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <div className="bg-[#282828] h-12 w-12 rounded-full flex items-center justify-center text-[#a0a0a0]">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-[#f0f0f0]">
                          {sess.profile_pt?.user?.full_name || "Trainer"}
                        </p>
                        <p className="text-sm text-[#a0a0a0]">
                          {new Date(sess.start_time).toLocaleDateString()} at {new Date(sess.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded text-xs font-bold ${sess.status === 'confirmed' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
                        }`}>
                        {sess.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past/History List */}
          <div>
            <h2 className="text-lg font-bold text-[#f0f0f0] mb-4 flex items-center gap-2 border-t border-[#282828] pt-8">
              <Clock size={20} /> History
            </h2>
            {pastSessions.length === 0 ? (
              <p className="text-[#606060]">No past sessions.</p>
            ) : (
              <div className="grid gap-4">
                {pastSessions.map(sess => (
                  <div key={sess.session_id} className="bg-[#1E1E1E] p-4 rounded border border-[#282828] flex justify-between items-center opacity-75 hover:opacity-100 transition-opacity">
                    <div>
                      <p className="font-bold text-[#f0f0f0]">
                        {sess.profile_pt?.user?.full_name || "Trainer"}
                      </p>
                      <p className="text-sm text-[#a0a0a0]">
                        {new Date(sess.start_time).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-sm ${sess.status === 'completed' ? 'text-blue-500' :
                        sess.status === 'canceled' ? 'text-red-500' : 'text-[#a0a0a0]'
                        }`}>
                        {sess.status}
                      </span>
                      {sess.status === 'completed' && (
                        <button
                          onClick={() => handleViewNote(sess)}
                          className="text-[#f0f0f0] hover:text-white p-2 bg-[#282828] rounded-full"
                          title="View Note"
                        >
                          <FileText size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Note Modal */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#141414] border border-[#282828] w-full max-w-md rounded-lg p-6">
            <h3 className="text-xl font-bold text-[#f0f0f0] mb-4">Session Note</h3>
            <p className="text-[#a0a0a0] text-sm mb-4">
              Trainer: {selectedSession.profile_pt?.user?.full_name} <br />
              Date: {new Date(selectedSession.start_time).toLocaleDateString()}
            </p>

            <div className="bg-[#282828] p-4 rounded text-[#f0f0f0] min-h-[100px] whitespace-pre-wrap">
              {selectedSession.note || "No note available."}
            </div>

            <button
              onClick={() => setSelectedSession(null)}
              className="w-full mt-6 py-2 bg-[#f0f0f0] text-[#141414] font-bold rounded hover:bg-[#e0e0e0]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
