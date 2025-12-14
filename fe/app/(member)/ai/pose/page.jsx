"use client"

import { useState } from "react"
import { Camera, Brain, Play, Square, AlertCircle, CheckCircle, Info } from "lucide-react"
import { aiApi } from "@/lib/api/aiApi"

export default function PosePage() {
  const [exercise, setExercise] = useState("squat")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [cameraReady, setCameraReady] = useState(false)

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true)
    setFeedback(null)

    // Mock camera permission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setCameraReady(true)

      // Simulate analysis
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const response = await aiApi.analyzePose(exercise)

      if (response.success) {
        setFeedback(response.data)
      }
    } catch (err) {
      console.error("Analysis failed", err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleStopAnalysis = () => {
    setIsAnalyzing(false)
    setCameraReady(false)
  }

  const getFeedbackIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Info className="h-5 w-5 text-[#606060]" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">AI Pose Analysis</h1>
        <p className="text-[#a0a0a0]">Get real-time feedback on your exercise form</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1">
          <div className="bg-[#282828] border border-[#282828] rounded-lg p-6 sticky top-24">
            <div className="w-12 h-12 bg-[#141414] rounded-full flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-[#f0f0f0]" />
            </div>
            <h3 className="text-lg font-semibold text-[#f0f0f0] mb-6">Analysis Settings</h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#a0a0a0] mb-2">Exercise</label>
              <select
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                disabled={isAnalyzing}
                className="w-full px-4 py-2.5 bg-[#141414] border border-[#282828] rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#f0f0f0] transition-colors disabled:opacity-50"
              >
                <option value="squat">Squat</option>
                <option value="deadlift">Deadlift</option>
                <option value="bench_press">Bench Press</option>
                <option value="overhead_press">Overhead Press</option>
                <option value="plank">Plank</option>
              </select>
            </div>

            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#a0a0a0]">
                  Camera permission required. Position yourself in frame and start the analysis.
                </p>
              </div>
            </div>

            {!isAnalyzing ? (
              <button
                onClick={handleStartAnalysis}
                className="w-full px-6 py-3 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Play className="h-5 w-5" />
                Start Analysis
              </button>
            ) : (
              <button
                onClick={handleStopAnalysis}
                className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Square className="h-5 w-5" />
                Stop Analysis
              </button>
            )}
          </div>
        </div>

        {/* Camera/Feedback Display */}
        <div className="lg:col-span-2 space-y-6">
          {/* Camera View */}
          <div className="bg-[#282828] border border-[#282828] rounded-lg overflow-hidden aspect-video">
            <div className="w-full h-full flex items-center justify-center bg-[#141414]">
              {!cameraReady ? (
                <div className="text-center">
                  <Camera className="h-16 w-16 text-[#606060] mx-auto mb-4" />
                  <p className="text-[#a0a0a0]">Camera feed will appear here</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-[#f0f0f0] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-[#f0f0f0] font-semibold mb-2">Analyzing your form...</p>
                  <p className="text-[#a0a0a0] text-sm">Performing {exercise}</p>
                </div>
              )}
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="bg-[#282828] border border-[#282828] rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#f0f0f0]">Form Analysis</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#a0a0a0]">Score:</span>
                  <span className="text-2xl font-bold text-[#f0f0f0]">{feedback.score}/10</span>
                </div>
              </div>

              <div className="space-y-3">
                {feedback.feedback.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border flex items-start gap-3 ${
                      item.type === "success"
                        ? "bg-green-500/10 border-green-500/20"
                        : item.type === "warning"
                          ? "bg-yellow-500/10 border-yellow-500/20"
                          : "bg-blue-500/10 border-blue-500/20"
                    }`}
                  >
                    {getFeedbackIcon(item.type)}
                    <div className="flex-1">
                      <p className="text-[#f0f0f0]">{item.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
