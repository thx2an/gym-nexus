"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Calendar, Clock, User, CheckCircle } from "lucide-react"
import { trainingApi } from "@/lib/api/trainingApi"

export default function BookSessionPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [trainers, setTrainers] = useState([])
  const [notes, setNotes] = useState("")
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const trainerId = searchParams.get("trainerId")
  const slotId = searchParams.get("slotId")
  const date = searchParams.get("date")
  const time = searchParams.get("time")

  useEffect(() => {
    loadTrainers()
  }, [])

  const loadTrainers = async () => {
    try {
      const response = await trainingApi.getTrainers()
      if (response.success) {
        setTrainers(response.data)
      }
    } catch (err) {
      console.error("Failed to load trainers", err)
    }
  }

  const trainer = trainers.find((t) => t.id === Number.parseInt(trainerId))

  const handleBook = async () => {
    try {
      setProcessing(true)
      setError(null)

      const response = await trainingApi.bookSession({
        trainerId: Number.parseInt(trainerId),
        slotId: Number.parseInt(slotId),
        date,
        time,
        notes,
      })

      if (response.success) {
        setSuccess(true)
      } else {
        setError("Booking failed. Please try again.")
      }
    } catch (err) {
      setError("An error occurred during booking")
    } finally {
      setProcessing(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#282828] border border-[#282828] rounded-lg p-12 text-center">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-[#f0f0f0] mb-2">Booking Confirmed!</h2>
          <p className="text-[#a0a0a0] mb-6">Your training session has been successfully booked.</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push("/booking/session/my-sessions")}
              className="px-6 py-3 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg font-medium transition-colors"
            >
              View My Sessions
            </button>
            <button
              onClick={() => router.push("/booking/schedule")}
              className="px-6 py-3 bg-[#282828] hover:bg-[#333333] text-[#f0f0f0] rounded-lg font-medium border border-[#282828] transition-colors"
            >
              Book Another
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">Book Training Session</h1>
        <p className="text-[#a0a0a0]">Confirm your booking details</p>
      </div>

      <div className="bg-[#282828] border border-[#282828] rounded-lg p-8">
        <h3 className="text-lg font-semibold text-[#f0f0f0] mb-6">Booking Details</h3>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4 p-4 bg-[#141414] rounded-lg border border-[#282828]">
            <User className="h-6 w-6 text-[#606060]" />
            <div>
              <div className="text-sm text-[#606060] mb-1">Trainer</div>
              <div className="text-[#f0f0f0] font-semibold">{trainer?.name || "Loading..."}</div>
              {trainer && <div className="text-sm text-[#a0a0a0]">{trainer.specialty}</div>}
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-[#141414] rounded-lg border border-[#282828]">
            <Calendar className="h-6 w-6 text-[#606060]" />
            <div>
              <div className="text-sm text-[#606060] mb-1">Date</div>
              <div className="text-[#f0f0f0] font-semibold">
                {date
                  ? new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Not selected"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-[#141414] rounded-lg border border-[#282828]">
            <Clock className="h-6 w-6 text-[#606060]" />
            <div>
              <div className="text-sm text-[#606060] mb-1">Time</div>
              <div className="text-[#f0f0f0] font-semibold">{time || "Not selected"}</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-[#f0f0f0] mb-2">Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any specific goals or areas you'd like to focus on?"
            rows={4}
            className="w-full px-4 py-3 bg-[#141414] border border-[#282828] rounded-lg text-[#f0f0f0] placeholder-[#606060] focus:outline-none focus:border-[#f0f0f0] transition-colors resize-none"
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">{error}</div>
        )}

        <div className="flex gap-4">
          <button
            onClick={() => router.back()}
            className="flex-1 px-6 py-3 bg-[#282828] hover:bg-[#333333] text-[#f0f0f0] rounded-lg font-medium border border-[#282828] transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleBook}
            disabled={processing || !trainerId || !slotId || !date || !time}
            className="flex-1 px-6 py-3 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  )
}
