// TODO: Replace mock data with actual API endpoints

export const progressApi = {
  // Get progress metrics
  async getMetrics(metric, startDate, endDate) {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const mockData = {
      weight: [
        { date: "2024-01-01", value: 75.5 },
        { date: "2024-01-05", value: 75.2 },
        { date: "2024-01-10", value: 74.8 },
        { date: "2024-01-15", value: 74.5 },
      ],
      bmi: [
        { date: "2024-01-01", value: 24.5 },
        { date: "2024-01-05", value: 24.4 },
        { date: "2024-01-10", value: 24.2 },
        { date: "2024-01-15", value: 24.1 },
      ],
      bodyFat: [
        { date: "2024-01-01", value: 18.5 },
        { date: "2024-01-05", value: 18.2 },
        { date: "2024-01-10", value: 17.9 },
        { date: "2024-01-15", value: 17.6 },
      ],
    }

    return {
      success: true,
      data: mockData[metric] || mockData.weight,
    }
  },

  // Add new metric entry
  async addEntry(metric, value) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      success: true,
      message: "Metric added successfully",
    }
  },
}
