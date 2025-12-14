"use client"

import { useState } from "react"
import { Brain, Apple, Zap } from "lucide-react"
import { aiApi } from "@/lib/api/aiApi"

export default function NutritionPage() {
  const [formData, setFormData] = useState({
    dietaryPrefs: "balanced",
    allergies: "",
    calories: "2200",
    goal: "maintain",
  })
  const [plan, setPlan] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState(null)

  const handleGenerate = async () => {
    try {
      setGenerating(true)
      setError(null)
      const response = await aiApi.generateNutritionPlan(formData)
      if (response.success) {
        setPlan(response.data)
      } else {
        setError("Failed to generate nutrition plan")
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
        <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">AI Nutrition Plan</h1>
        <p className="text-[#a0a0a0]">Get a personalized meal plan powered by AI</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1">
          <div className="bg-[#282828] border border-[#282828] rounded-lg p-6 sticky top-24">
            <div className="w-12 h-12 bg-[#141414] rounded-full flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-[#f0f0f0]" />
            </div>
            <h3 className="text-lg font-semibold text-[#f0f0f0] mb-6">Your Preferences</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#a0a0a0] mb-2">Dietary Preference</label>
                <select
                  value={formData.dietaryPrefs}
                  onChange={(e) => setFormData({ ...formData, dietaryPrefs: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#141414] border border-[#282828] rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#f0f0f0] transition-colors"
                >
                  <option value="balanced">Balanced</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="keto">Keto</option>
                  <option value="paleo">Paleo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#a0a0a0] mb-2">Allergies</label>
                <input
                  type="text"
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                  placeholder="e.g., peanuts, dairy"
                  className="w-full px-4 py-2.5 bg-[#141414] border border-[#282828] rounded-lg text-[#f0f0f0] placeholder-[#606060] focus:outline-none focus:border-[#f0f0f0] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#a0a0a0] mb-2">Daily Calories</label>
                <input
                  type="number"
                  value={formData.calories}
                  onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#141414] border border-[#282828] rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#f0f0f0] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#a0a0a0] mb-2">Goal</label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#141414] border border-[#282828] rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#f0f0f0] transition-colors"
                >
                  <option value="maintain">Maintain Weight</option>
                  <option value="lose">Lose Weight</option>
                  <option value="gain">Gain Weight</option>
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
              <Apple className="h-12 w-12 text-[#606060] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#f0f0f0] mb-2">No plan generated yet</h3>
              <p className="text-[#a0a0a0]">Fill out the form and click Generate Plan to get started</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Macros Summary */}
              <div className="bg-[#282828] border border-[#282828] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#f0f0f0] mb-4">Daily Targets</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#f0f0f0]">{plan.dailyCalories}</div>
                    <div className="text-sm text-[#a0a0a0]">Calories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#f0f0f0]">{plan.macros.protein}g</div>
                    <div className="text-sm text-[#a0a0a0]">Protein</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#f0f0f0]">{plan.macros.carbs}g</div>
                    <div className="text-sm text-[#a0a0a0]">Carbs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#f0f0f0]">{plan.macros.fats}g</div>
                    <div className="text-sm text-[#a0a0a0]">Fats</div>
                  </div>
                </div>
              </div>

              {/* Meals */}
              {plan.meals.map((meal, index) => (
                <div key={index} className="bg-[#282828] border border-[#282828] rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#f0f0f0]">{meal.meal}</h3>
                      <p className="text-sm text-[#a0a0a0]">{meal.time}</p>
                    </div>
                    <span className="px-3 py-1 bg-[#141414] border border-[#282828] rounded-lg text-sm font-medium text-[#a0a0a0]">
                      {meal.calories} cal
                    </span>
                  </div>

                  <div className="space-y-2">
                    {meal.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2 text-[#f0f0f0]">
                        <Apple className="h-4 w-4 text-[#606060]" />
                        <span>{item}</span>
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
