// TODO: Replace mock data with actual API endpoints

export const aiApi = {
  // Generate workout plan
  async generateWorkoutPlan(data) {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return {
      success: true,
      data: {
        plan: [
          {
            day: "Monday",
            focus: "Upper Body",
            exercises: [
              { name: "Bench Press", sets: 4, reps: "8-10", rest: "90s" },
              { name: "Dumbbell Rows", sets: 4, reps: "10-12", rest: "60s" },
              { name: "Shoulder Press", sets: 3, reps: "10-12", rest: "60s" },
            ],
          },
          {
            day: "Wednesday",
            focus: "Lower Body",
            exercises: [
              { name: "Squats", sets: 4, reps: "8-10", rest: "120s" },
              { name: "Leg Press", sets: 3, reps: "12-15", rest: "90s" },
              { name: "Lunges", sets: 3, reps: "10-12", rest: "60s" },
            ],
          },
          {
            day: "Friday",
            focus: "Full Body",
            exercises: [
              { name: "Deadlifts", sets: 4, reps: "6-8", rest: "120s" },
              { name: "Pull-ups", sets: 3, reps: "8-10", rest: "90s" },
              { name: "Planks", sets: 3, reps: "60s hold", rest: "45s" },
            ],
          },
        ],
      },
    }
  },

  // Generate nutrition plan
  async generateNutritionPlan(data) {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return {
      success: true,
      data: {
        dailyCalories: 2200,
        macros: { protein: 165, carbs: 220, fats: 73 },
        meals: [
          {
            meal: "Breakfast",
            time: "7:00 AM",
            items: ["Oatmeal with berries", "2 eggs", "Green tea"],
            calories: 450,
          },
          {
            meal: "Lunch",
            time: "12:30 PM",
            items: ["Grilled chicken breast", "Brown rice", "Mixed vegetables"],
            calories: 650,
          },
          {
            meal: "Dinner",
            time: "7:00 PM",
            items: ["Salmon", "Sweet potato", "Broccoli"],
            calories: 700,
          },
        ],
      },
    }
  },

  // Analyze pose (mock)
  async analyzePose(exercise) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return {
      success: true,
      data: {
        exercise,
        feedback: [
          { type: "warning", message: "Keep your back straight" },
          { type: "success", message: "Good knee alignment" },
          { type: "info", message: "Try to lower your hips more" },
        ],
        score: 7.5,
      },
    }
  },

  // Calculate injury risk
  async calculateInjuryRisk(data) {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    let risk = "Low"
    let score = 25

    if (data.trainingLoad > 8 || data.soreness > 7) {
      risk = "High"
      score = 75
    } else if (data.trainingLoad > 6 || data.soreness > 5) {
      risk = "Medium"
      score = 50
    }

    return {
      success: true,
      data: {
        risk,
        score,
        recommendations: [
          "Consider taking a rest day",
          "Focus on recovery and stretching",
          "Reduce training intensity by 20%",
          "Stay hydrated and get adequate sleep",
        ],
      },
    }
  },
}
