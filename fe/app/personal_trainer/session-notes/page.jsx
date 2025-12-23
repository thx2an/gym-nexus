"use client"

import { useState, useEffect } from "react"
import { bookingApi } from "@/lib/api/bookingApi"
import { FileText, Plus, Check } from "lucide-react"

export default function SessionNotesPage() {
    const [sessions, setSessions] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedSession, setSelectedSession] = useState(null)
    const [noteContent, setNoteContent] = useState("")

    useEffect(() => {
        loadSessions()
    }, [])

    const loadSessions = async () => {
        try {
            setLoading(true)
            // Get all bookings. Ideally filter for 'completed' or 'confirmed' ones in past.
            // Assuming 'index' returns all, we filter client side for Demo or update backend logic.
            // A better backend query would be nice, but re-using index avoids new PHP.
            const res = await bookingApi.getSessions({ status: 'confirmed' })
            // Also maybe 'completed' if we have that status flow.
            if (res.success) {
                // Filter for past sessions that need notes
                // Simplification: Showing all confirmed sessions
                setSessions(res.data)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmitNote = async (e) => {
        e.preventDefault()
        if (!selectedSession) return

        try {
            const res = await bookingApi.createNote({
                session_id: selectedSession.session_id,
                notes: noteContent
            })
            if (res.success) {
                alert("Note added successfully!")
                setSelectedSession(null)
                setNoteContent("")
            }
        } catch (err) {
            console.error(err)
            alert("Failed to save note")
        }
    }

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">Session Notes</h1>
                <p className="text-[#a0a0a0]">Provide feedback for your clients</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* List */}
                <div className="md:col-span-1 space-y-4">
                    <h2 className="font-bold text-[#f0f0f0] border-b border-[#404040] pb-2">Select Session</h2>
                    {sessions.map(sess => (
                        <div
                            key={sess.session_id}
                            onClick={() => setSelectedSession(sess)}
                            className={`p-4 rounded cursor-pointer border transition-colors ${selectedSession?.session_id === sess.session_id
                                    ? "bg-[#282828] border-[#f0f0f0]"
                                    : "bg-[#1E1E1E] border-[#282828] hover:border-[#404040]"
                                }`}
                        >
                            <p className="font-bold text-[#f0f0f0]">{sess.member?.full_name}</p>
                            <p className="text-sm text-[#a0a0a0]">{new Date(sess.start_time).toLocaleDateString()}</p>
                            <span className="text-xs text-[#606060]">
                                {new Date(sess.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Editor */}
                <div className="md:col-span-2">
                    {selectedSession ? (
                        <div className="bg-[#282828] p-6 rounded-lg border border-[#404040]">
                            <h3 className="text-xl font-bold text-[#f0f0f0] mb-4">
                                Feedback for {selectedSession.member?.full_name}
                            </h3>

                            <form onSubmit={handleSubmitNote}>
                                <textarea
                                    value={noteContent}
                                    onChange={e => setNoteContent(e.target.value)}
                                    className="w-full h-48 bg-[#141414] border border-[#404040] text-[#f0f0f0] p-4 rounded resize-none mb-4 focus:outline-none focus:border-[#f0f0f0]"
                                    placeholder="Write your session feedback, exercises performed, tips, etc..."
                                    required
                                />
                                <button className="px-6 py-2 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] font-bold rounded flex items-center gap-2">
                                    <FileText size={18} /> Save Note
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-[#606060] bg-[#1E1E1E] rounded-lg border border-[#282828] p-12">
                            <FileText size={48} className="mb-4 opacity-50" />
                            <p>Select a session to add notes</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
