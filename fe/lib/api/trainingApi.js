// TODO: Replace mock data with actual API endpoints

export const trainingApi = {
  // Get available trainers
  async getTrainers() {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      success: true,
      data: [
        { id: 1, name: "John Doe", specialty: "Strength Training", image: "/placeholder-user.jpg" },
        { id: 2, name: "Jane Smith", specialty: "Yoga & Flexibility", image: "/placeholder-user.jpg" },
        { id: 3, name: "Mike Johnson", specialty: "HIIT & Cardio", image: "/placeholder-user.jpg" },
      ],
    }
  },

  // Get trainer schedule
  async getTrainerSchedule(trainerId, date) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    // Mock weekly schedule
    return {
      success: true,
      data: {
        trainerId,
        slots: [
          { id: 1, time: "09:00 AM", status: "Available", date: "2024-01-15" },
          { id: 2, time: "10:00 AM", status: "Booked", date: "2024-01-15" },
          { id: 3, time: "11:00 AM", status: "Available", date: "2024-01-15" },
          { id: 4, time: "02:00 PM", status: "Unavailable", date: "2024-01-15" },
          { id: 5, time: "03:00 PM", status: "Available", date: "2024-01-15" },
        ],
      },
    }
  },

  // Book a session
  async bookSession(data) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return {
      success: true,
      data: {
        bookingId: "BOOK" + Date.now(),
        trainerId: data.trainerId,
        slotId: data.slotId,
        date: data.date,
        time: data.time,
        notes: data.notes,
        status: "Confirmed",
      },
    }
  },

  // Get user's sessions
  async getMySessions() {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      success: true,
      data: [
        {
          id: 1,
          trainer: "John Doe",
          date: "2024-01-12",
          time: "10:00 AM",
          status: "Confirmed",
          notes: "Focus on upper body",
        },
        {
          id: 2,
          trainer: "Jane Smith",
          date: "2024-01-08",
          time: "03:00 PM",
          status: "Completed",
          notes: "Yoga session",
        },
      ],
    }
  },

  // Cancel a session
  async cancelSession(sessionId) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { success: true, message: "Session cancelled successfully" }
  },

  // Reschedule a session
  async rescheduleSession(sessionId, newSlotId, newDate, newTime) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { success: true, message: "Session rescheduled successfully" }
  },
}
