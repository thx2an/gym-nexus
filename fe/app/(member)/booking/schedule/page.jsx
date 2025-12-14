"use client"

import { useState, useEffect } from "react"
import { Calendar, User, ChevronLeft, ChevronRight } from "lucide-react"
import { trainingApi } from "@/lib/api/trainingApi"
import { useRouter } from "next/navigation"

export default function TrainerSchedulePage() {
  const router = useRouter()
  const [trainers, setTrainers] = useState([])
  const [selectedTrainer, setSelectedTrainer] = useState(null)
  const [schedule, setSchedule] = useState(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [loading, setLoading] = useState(true)
  const [loadingSchedule, setLoadingSchedule] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadTrainers()
  }, [])

  useEffect(() => {
    if (selectedTrainer) {
      loadSchedule()
    }
  }, [selectedTrainer, currentDate])

  const loadTrainers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await trainingApi.getTrainers()
      if (response.success) {
        setTrainers(response.data)
        if (response.data.length > 0) {
          setSelectedTrainer(response.data[0])
        }
      } else {
        setError("Failed to load trainers")
      }
    } catch (err) {
      setError("An error occurred while loading trainers")
    } finally {
      setLoading(false)
    }
  }

  const loadSchedule = async () => {
    try {
      setLoadingSchedule(true)
      const response = await trainingApi.getTrainerSchedule(selectedTrainer.id, currentDate)
      if (response.success) {
        setSchedule(response.data)
      }
    } catch (err) {
      console.error("Failed to load schedule", err)
    } finally {
      setLoadingSchedule(false)
    }
  }

  const handleSlotClick = (slot) => {
    if (slot.status === "Available") {
      router.push(
        `/booking/trainers?trainerId=${selectedTrainer.id}&slotId=${slot.id}&date=${slot.date}&time=${slot.time}`,
      )
    }
  }

  const getSlotColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20 cursor-pointer"
      case "Booked":
        return "bg-[#282828] text-[#606060] border-[#282828] cursor-not-allowed"
      case "Unavailable":
        return "bg-red-500/10 text-red-500 border-red-500/20 cursor-not-allowed"
      default:
        return "bg-[#282828] text-[#a0a0a0] border-[#282828]"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#282828] border-t-[#f0f0f0] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#a0a0a0]">Loading trainers...</p>
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
          <h3 className="text-xl font-semibold text-[#f0f0f0] mb-2">Failed to Load Trainers</h3>
          <p className="text-[#a0a0a0] mb-6">{error}</p>
          <button
            onClick={loadTrainers}
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">Trainer Schedule</h1>
        <p className="text-[#a0a0a0]">Book a session with your preferred trainer</p>
      </div>

      {/* Trainer Selection */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-[#a0a0a0] uppercase tracking-wider mb-3">Select Trainer</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {trainers.map((trainer) => (
            <button
              key={trainer.id}
              onClick={() => setSelectedTrainer(trainer)}
              className={`p-4 rounded-lg border text-left transition-all ${
                selectedTrainer?.id === trainer.id
                  ? "border-[#f0f0f0] bg-[#1E1E1E]"
                  : "border-[#282828] bg-[#282828] hover:bg-[#1E1E1E]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#141414] rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-[#f0f0f0]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#f0f0f0]">{trainer.name}</h4>
                  <p className="text-sm text-[#a0a0a0]">{trainer.specialty}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Schedule */}
      {selectedTrainer && (
        <div className="bg-[#282828] border border-[#282828] rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#f0f0f0]">
              {currentDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)))}
                className="p-2 hover:bg-[#1E1E1E] rounded-lg transition-colors text-[#f0f0f0]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-4 py-2 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] text-sm rounded-lg font-medium transition-colors"
              >
                Today
              </button>
              <button
                onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)))}
                className="p-2 hover:bg-[#1E1E1E] rounded-lg transition-colors text-[#f0f0f0]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {loadingSchedule ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-[#282828] border-t-[#f0f0f0] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[#a0a0a0]">Loading schedule...</p>
            </div>
          ) : schedule ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
              {schedule.slots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => handleSlotClick(slot)}
                  disabled={slot.status !== "Available"}
                  className={`p-4 rounded-lg border text-center transition-all ${getSlotColor(slot.status)}`}
                >
                  <div className="text-lg font-semibold mb-1">{slot.time}</div>
                  <div className="text-xs">{slot.status}</div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-[#a0a0a0]">No schedule available</div>
          )}
        </div>
      )}
    </div>
  )
}
