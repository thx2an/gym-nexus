"use client"

import { useState, useEffect } from "react"
import { bookingApi } from "@/lib/api/bookingApi"
import { Calendar, Plus, Trash2 } from "lucide-react"

export default function PtSchedulePage() {
    const [sessions, setSessions] = useState([])
    const [availability, setAvailability] = useState([])
    const [loading, setLoading] = useState(true)

    // Availability Form State
    const [formOpen, setFormOpen] = useState(false)
    const [isRecurring, setIsRecurring] = useState(false)
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedDay, setSelectedDay] = useState("1") // 1 = Monday
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            setLoading(true)
            const [sessRes, availRes] = await Promise.all([
                bookingApi.getSessions({ status: 'confirmed' }),
                bookingApi.getAvailability()
            ])

            if (sessRes.success) setSessions(sessRes.data)
            if (availRes.success) setAvailability(availRes.data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleAddAvailability = async (e) => {
        e.preventDefault()
        try {
            const data = {
                branch_id: 1, // Default or fetch
                start_time: startTime,
                end_time: endTime,
                is_recurring: isRecurring,
                day_of_week: isRecurring ? parseInt(selectedDay) : null,
                date: !isRecurring ? selectedDate : null
            }

            const res = await bookingApi.setAvailability(data)
            if (res.success) {
                setAvailability([...availability, res.data])
                setFormOpen(false)
                alert("Availability added!")
            }
        } catch (err) {
            console.error(err)
            alert("Failed to add availability")
        }
    }

    const handleDeleteAvailability = async (id) => {
        if (!confirm("Delete this slot?")) return
        try {
            await bookingApi.deleteAvailability(id)
            setAvailability(availability.filter(a => a.availability_id !== id))
        } catch (err) {
            alert("Failed to delete")
        }
    }

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">My Schedule</h1>
                    <p className="text-[#a0a0a0]">Manage sessions and availability</p>
                </div>
                <button
                    onClick={() => setFormOpen(!formOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#f0f0f0] text-[#141414] font-bold rounded hover:bg-[#e0e0e0]"
                >
                    <Plus size={18} /> Add Free Slot
                </button>
            </div>

            {/* Add Availability Form */}
            {formOpen && (
                <div className="bg-[#282828] p-6 rounded-lg mb-8 border border-[#404040]">
                    <h3 className="font-bold text-[#f0f0f0] mb-4">Set Availability for Auto-Accept</h3>
                    <form onSubmit={handleAddAvailability} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-[#f0f0f0]">
                            <input
                                type="checkbox"
                                checked={isRecurring}
                                onChange={(e) => setIsRecurring(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <label>Recurring Weekly?</label>
                        </div>

                        {isRecurring ? (
                            <select
                                value={selectedDay}
                                onChange={e => setSelectedDay(e.target.value)}
                                className="bg-[#141414] border border-[#404040] text-[#f0f0f0] p-2 rounded"
                            >
                                {days.map((d, i) => <option key={i} value={i}>{d}</option>)}
                            </select>
                        ) : (
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={e => setSelectedDate(e.target.value)}
                                className="bg-[#141414] border border-[#404040] text-[#f0f0f0] p-2 rounded"
                                required
                            />
                        )}

                        <input
                            type="time"
                            value={startTime}
                            onChange={e => setStartTime(e.target.value)}
                            className="bg-[#141414] border border-[#404040] text-[#f0f0f0] p-2 rounded"
                            required
                        />
                        <input
                            type="time"
                            value={endTime}
                            onChange={e => setEndTime(e.target.value)}
                            className="bg-[#141414] border border-[#404040] text-[#f0f0f0] p-2 rounded"
                            required
                        />

                        <button type="submit" className="md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-bold">
                            Save Slot
                        </button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Confirmed Sessions List */}
                <div>
                    <h2 className="text-xl font-bold text-[#f0f0f0] mb-4 border-b border-[#404040] pb-2">Upcoming Sessions</h2>
                    {sessions.length === 0 ? (
                        <p className="text-[#a0a0a0]">No upcoming sessions.</p>
                    ) : (
                        <div className="space-y-4">
                            {sessions.map(sess => (
                                <div key={sess.session_id} className="bg-[#1E1E1E] p-4 rounded border border-[#282828]">
                                    <p className="text-[#f0f0f0] font-bold">{sess.member?.full_name}</p>
                                    <p className="text-[#a0a0a0] text-sm">
                                        {new Date(sess.start_time).toLocaleString()}
                                    </p>
                                    <span className="inline-block px-2 py-0.5 mt-2 text-xs bg-green-500/20 text-green-500 rounded">
                                        Confirmed
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Availability List */}
                <div>
                    <h2 className="text-xl font-bold text-[#f0f0f0] mb-4 border-b border-[#404040] pb-2">My Availability (Auto-Accept)</h2>
                    {availability.length === 0 ? (
                        <p className="text-[#a0a0a0]">No availability set.</p>
                    ) : (
                        <div className="space-y-4">
                            {availability.map(slot => (
                                <div key={slot.availability_id} className="bg-[#1E1E1E] p-4 rounded border border-[#282828] flex justify-between items-center">
                                    <div>
                                        <p className="text-[#f0f0f0] font-medium">
                                            {slot.is_recurring
                                                ? `${days[slot.day_of_week]}s (Recurring)`
                                                : new Date(slot.date).toLocaleDateString()
                                            }
                                        </p>
                                        <p className="text-[#a0a0a0] text-sm">
                                            {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteAvailability(slot.availability_id)}
                                        className="text-red-500 hover:text-red-400 p-2"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
