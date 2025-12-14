"use client"

import { useState } from "react"
import { Brain, Dumbbell, Zap } from "lucide-react"
import { aiApi } from "@/lib/api/aiApi"

export default function WorkoutPlanPage() {
  const [formData, setFormData] = useState({
    goal: "muscle_gain",
    level: "intermediate",
    frequency: "4",
    equipment: "full_gym",
  })
  const [plan, setPlan] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState(null)

  const handleGenerate = async () => {
    try {
      setGenerating(true)
      setError(null)
      const response = await aiApi.generateWorkoutPlan(formData)
      if (response.success) {
        setPlan(response.data.plan)
      } else {
        setError("Failed to generate workout plan")
      }
    } catch (err) {
      setError("An error occurred while generating plan")
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">AI Workout Plan</h1>
        <p className="text-[#a0a0a0]">Get a personalized workout plan powered by AI</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1">
          <div className="bg-[#282828] border border-[#282828] rounded-lg p-6 sticky top-24">
            <div className="w-12 h-12 bg-[#141414] rounded-full flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-[#f0f0f0]" />
            </div>
            <h3 className="text-lg font-semibold text-[#f0f0f0] mb-6">Your Goals</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#a0a0a0] mb-2">Fitness Goal</label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#141414] border border-[#282828] rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#f0f0f0] transition-colors"
                >
                  <option value="muscle_gain">Muscle Gain</option>
                  <option value="fat_loss">Fat Loss</option>
                  <option value="strength">Strength</option>
                  <option value="endurance">Endurance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#a0a0a0] mb-2">Experience Level</label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#141414] border border-[#282828] rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#f0f0f0] transition-colors"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#a0a0a0] mb-2">Days per Week</label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#141414] border border-[#282828] rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#f0f0f0] transition-colors"
                >
                  <option value="3">3 days</option>
                  <option value="4">4 days</option>
                  <option value="5">5 days</option>
                  <option value="6">6 days</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#a0a0a0] mb-2">Equipment Access</label>
                <select
                  value={formData.equipment}
                  onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#141414] border border-[#282828] rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#f0f0f0] transition-colors"
                >
                  <option value="full_gym">Full Gym</option>
                  <option value="home_basic">Home (Basic)</option>
                  <option value="bodyweight">Bodyweight Only</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full mt-6 px-6 py-3 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Zap className="h-5 w-5" />
              {generating ? "Generating..." : "Generate Plan"}
            </button>
          </div>
        </div>

        {/* Plan Display */}
        <div className="lg:col-span-2">
          {!plan ? (
            <div className="bg-[#282828] border border-[#282828] rounded-lg p-12 text-center">
              <Dumbbell className="h-12 w-12 text-[#606060] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#f0f0f0] mb-2">No plan generated yet</h3>
              <p className="text-[#a0a0a0]">Fill out the form and click Generate Plan to get started</p>
            </div>
          ) : (
            <div className="space-y-6">
              {plan.map((day, index) => (
                <div key={index} className="bg-[#282828] border border-[#282828] rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#f0f0f0]">{day.day}</h3>
                    <span className="px-3 py-1 bg-[#141414] border border-[#282828] rounded-lg text-sm font-medium text-[#a0a0a0]">
                      {day.focus}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {day.exercises.map((exercise, exIndex) => (
                      <div key={exIndex} className="p-4 bg-[#141414] rounded-lg border border-[#282828]">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-[#f0f0f0]">{exercise.name}</h4>
                          <Dumbbell className="h-4 w-4 text-[#606060]" />
                        </div>
                        <div className="flex gap-6 text-sm text-[#a0a0a0]">
                          <span>Sets: {exercise.sets}</span>
                          <span>Reps: {exercise.reps}</span>
                          <span>Rest: {exercise.rest}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <button className="w-full px-6 py-3 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg font-medium transition-colors">
                Save to Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
