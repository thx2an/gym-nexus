"use client"

import { useState, useEffect } from "react"
import { bookingApi } from "@/lib/api/bookingApi"
import { Check, X, Calendar } from "lucide-react"

export default function PtRequestsPage() {
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadRequests()
    }, [])

    const loadRequests = async () => {
        try {
            setLoading(true)
            const res = await bookingApi.getSessions({ status: 'pending' })
            if (res.success) {
                setRequests(res.data)
            }
        } catch (err) {
            console.error("Failed to load requests", err)
        } finally {
            setLoading(false)
        }
    }

    const handleAction = async (id, status) => {
        try {
            if (!confirm(`Are you sure you want to ${status} this request?`)) return

            const res = await bookingApi.updateStatus(id, status)
            if (res.success) {
                setRequests(prev => prev.filter(r => r.session_id !== id))
                alert(`Request ${status} successfully`)
            }
        } catch (err) {
            console.error(err)
            alert("Failed to update status")
        }
    }

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">Booking Requests</h1>
                <p className="text-[#a0a0a0]">Manage incoming session requests from members</p>
            </div>

            {loading ? (
                <div className="text-[#f0f0f0]">Loading requests...</div>
            ) : requests.length === 0 ? (
                <div className="text-center py-12 bg-[#282828] rounded-lg">
                    <Calendar className="h-12 w-12 text-[#606060] mx-auto mb-4" />
                    <p className="text-[#a0a0a0]">No pending requests</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {requests.map((req) => (
                        <div key={req.session_id} className="bg-[#282828] p-6 rounded-lg border border-[#282828] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-[#f0f0f0]">{req.member?.full_name || "Unknown Member"}</h3>
                                <div className="text-[#a0a0a0] text-sm mt-1">
                                    <p>Date: {new Date(req.start_time).toLocaleDateString()}</p>
                                    <p>Time: {new Date(req.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(req.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                                {req.notes && (
                                    <p className="text-[#d0d0d0] text-sm mt-2 italic">"{req.notes}"</p>
                                )}
                            </div>

                            <div className="flex gap-3 w-full md:w-auto">
                                <button
                                    onClick={() => handleAction(req.session_id, 'confirmed')}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                                >
                                    <Check size={18} /> Accept
                                </button>
                                <button
                                    onClick={() => handleAction(req.session_id, 'canceled')}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                                >
                                    <X size={18} /> Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
