"use client"

import { useState, useEffect } from "react"
import { bookingApi } from "@/lib/api/bookingApi"
import { Search, MapPin, Star, Calendar, Clock, X } from "lucide-react"

export default function BookingPage() {
  const [trainers, setTrainers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTrainer, setSelectedTrainer] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [bookingDate, setBookingDate] = useState("")
  const [bookingTime, setBookingTime] = useState("")
  const [note, setNote] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTrainers()
  }, [])

  const fetchTrainers = async () => {
    try {
      setLoading(true)
      const res = await bookingApi.getTrainers()
      if (res.success) {
        setTrainers(res.data)
      }
    } catch (err) {
      console.error("Failed to fetch trainers", err)
    } finally {
      setLoading(false)
    }
  }

  const handleBookClick = (trainer) => {
    setSelectedTrainer(trainer)
    setModalOpen(true)
    setError(null)
  }

  const handleSubmitBooking = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    // Validate time (simple check, backend does robust check)
    // format: YYYY-MM-DD HH:mm:ss
    const startDateTime = `${bookingDate} ${bookingTime}:00`

    // Check local logic for 8PM - 4AM if desired, but backend handles it too
    // Hour check: 
    const hour = parseInt(bookingTime.split(':')[0])
    if (hour >= 20 || hour < 4) {
      setError("Booking not allowed between 8 PM and 4 AM.")
      setSubmitting(false)
      return
    }

    try {
      const res = await bookingApi.createBooking({
        trainer_id: selectedTrainer.trainer_id,
        branch_id: 1, // Default branch for now, or fetch from logic
        start_time: startDateTime,
        notes: note
      })

      if (res.success) {
        alert(res.message) // "Request sent" or "Confirmed"
        setModalOpen(false)
        setNote("")
        setBookingDate("")
        setBookingTime("")
      }
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || "Booking failed")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">Book a Personal Trainer</h1>
        <p className="text-[#a0a0a0]">Find expert trainers and schedule your session</p>
      </div>

      {loading ? (
        <div className="text-[#f0f0f0]">Loading trainers...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((trainer) => (
            <div key={trainer.trainer_id} className="bg-[#282828] p-6 rounded-lg border border-[#282828] hover:border-[#404040] transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-[#404040] rounded-full overflow-hidden">
                  {trainer.user?.avatar_url ? (
                    <img src={trainer.user.avatar_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#a0a0a0] text-xl font-bold">
                      {trainer.user?.full_name?.charAt(0) || "T"}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#f0f0f0]">{trainer.user?.full_name}</h3>
                  <p className="text-[#a0a0a0] text-sm">{trainer.specialization || "General Fitness"}</p>
                </div>
              </div>

              <p className="text-[#d0d0d0] text-sm mb-4 line-clamp-3 min-h-[60px]">
                {trainer.bio || "No bio available."}
              </p>

              <button
                onClick={() => handleBookClick(trainer)}
                className="w-full py-2 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] font-medium rounded transition-colors"
              >
                Book Session
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {modalOpen && selectedTrainer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#141414] border border-[#282828] w-full max-w-md rounded-lg p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-[#a0a0a0] hover:text-[#f0f0f0]"
            >
              <X size={24} />
            </button>

            <h2 className="text-xl font-bold text-[#f0f0f0] mb-6">Book Session with {selectedTrainer.user?.full_name}</h2>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div>
                <label className="block text-[#a0a0a0] text-sm mb-1">Date</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-[#282828] border border-[#404040] text-[#f0f0f0] rounded p-2 focus:outline-none focus:border-[#f0f0f0]"
                />
              </div>

              <div>
                <label className="block text-[#a0a0a0] text-sm mb-1">Time</label>
                {/* Simple time select or input. Using time input. */}
                <input
                  type="time"
                  required
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full bg-[#282828] border border-[#404040] text-[#f0f0f0] rounded p-2 focus:outline-none focus:border-[#f0f0f0]"
                />
                <p className="text-xs text-[#606060] mt-1">Available: 04:00 - 20:00</p>
              </div>

              <div>
                <label className="block text-[#a0a0a0] text-sm mb-1">Note (Optional)</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Goals, injuries, etc."
                  className="w-full bg-[#282828] border border-[#404040] text-[#f0f0f0] rounded p-2 h-20 resize-none focus:outline-none focus:border-[#f0f0f0]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] font-bold rounded transition-colors disabled:opacity-50"
              >
                {submitting ? "Booking..." : "Confirm Booking"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
