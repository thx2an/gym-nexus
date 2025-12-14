// TODO: Replace mock data with actual API endpoints

export const checkinApi = {
  // Submit QR code check-in
  async checkin(qrCode) {
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Mock validation
    if (!qrCode || qrCode.length < 5) {
      return { success: false, message: "Invalid QR code" }
    }

    return {
      success: true,
      message: "Check-in successful! Welcome to the gym.",
      data: {
        checkinId: "CHK" + Date.now(),
        timestamp: new Date().toISOString(),
        location: "Main Gym Floor",
      },
    }
  },

  // Get check-in history
  async getHistory() {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      success: true,
      data: [
        { id: 1, date: "2024-01-10", time: "06:30 AM", location: "Main Gym Floor" },
        { id: 2, date: "2024-01-08", time: "07:00 AM", location: "Main Gym Floor" },
        { id: 3, date: "2024-01-06", time: "05:45 PM", location: "Cardio Zone" },
      ],
    }
  },
}
