"use client"

import { useState } from "react"
import { Brain, AlertTriangle, Shield, Zap } from "lucide-react"
import { aiApi } from "@/lib/api/aiApi"

export default function InjuryRiskPage() {
  const [formData, setFormData] = useState({
    trainingLoad: 5,
    frequency: 4,
    soreness: 3,
    sleep: 7,
  })
  const [result, setResult] = useState(null)
  const [calculating, setCalculating] = useState(false)
  const [error, setError] = useState(null)

  const handleCalculate = async () => {
    try {
      setCalculating(true)
      setError(null)
      const response = await aiApi.calculateInjuryRisk(formData)
      if (response.success) {
        setResult(response.data)
      } else {
        setError("Failed to calculate injury risk")
      }
    } catch (err) {
      setError("An error occurred while calculating risk")
    } finally {
      setCalculating(false)
    }
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case "Low":
        return { bg: "bg-green-500/10", border: "border-green-500/20", text: "text-green-500", icon: Shield }
      case "Medium":
        return { bg: "bg-yellow-500/10", border: "border-yellow-500/20", text: "text-yellow-500", icon: AlertTriangle }
      case "High":
        return { bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-500", icon: AlertTriangle }
      default:
        return { bg: "bg-[#282828]", border: "border-[#282828]", text: "text-[#a0a0a0]", icon: Shield }
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">Injury Risk Assessment</h1>
        <p className="text-[#a0a0a0]">Analyze your training load and get personalized recommendations</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1">
          <div className="bg-[#282828] border border-[#282828] rounded-lg p-6 sticky top-24">
            <div className="w-12 h-12 bg-[#141414] rounded-full flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-[#f0f0f0]" />
            </div>
            <h3 className="text-lg font-semibold text-[#f0f0f0] mb-6">Your Metrics</h3>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-[#a0a0a0]">Training Load</label>
                  <span className="text-[#f0f0f0] font-semibold">{formData.trainingLoad}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.trainingLoad}
                  onChange={(e) => setFormData({ ...formData, trainingLoad: Number.parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-[#a0a0a0]">Training Frequency</label>
                  <span className="text-[#f0f0f0] font-semibold">{formData.frequency} days/week</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: Number.parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-[#a0a0a0]">Muscle Soreness</label>
                  <span className="text-[#f0f0f0] font-semibold">{formData.soreness}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.soreness}
                  onChange={(e) => setFormData({ ...formData, soreness: Number.parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-[#a0a0a0]">Sleep Quality</label>
                  <span className="text-[#f0f0f0] font-semibold">{formData.sleep} hrs/night</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="10"
                  value={formData.sleep}
                  onChange={(e) => setFormData({ ...formData, sleep: Number.parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleCalculate}
              disabled={calculating}
              className="w-full mt-6 px-6 py-3 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Zap className="h-5 w-5" />
              {calculating ? "Calculating..." : "Calculate Risk"}
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2">
          {!result ? (
            <div className="bg-[#282828] border border-[#282828] rounded-lg p-12 text-center">
              <AlertTriangle className="h-12 w-12 text-[#606060] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#f0f0f0] mb-2">No assessment yet</h3>
              <p className="text-[#a0a0a0]">Fill out your metrics and click Calculate Risk to get started</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Risk Score */}
              <div
                className={`${getRiskColor(result.risk).bg} border ${getRiskColor(result.risk).border} rounded-lg p-8 text-center`}
              >
                <div
                  className={`w-24 h-24 ${getRiskColor(result.risk).bg} rounded-full flex items-center justify-center mx-auto mb-4 border-4 ${getRiskColor(result.risk).border}`}
                >
                  {(() => {
                    const Icon = getRiskColor(result.risk).icon
                    return <Icon className={`h-12 w-12 ${getRiskColor(result.risk).text}`} />
                  })()}
                </div>
                <h2 className={`text-3xl font-bold mb-2 ${getRiskColor(result.risk).text}`}>{result.risk} Risk</h2>
                <div className="text-6xl font-bold text-[#f0f0f0] mb-2">{result.score}%</div>
                <p className="text-[#a0a0a0]">Injury Risk Score</p>
              </div>

              {/* Recommendations */}
              <div className="bg-[#282828] border border-[#282828] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#f0f0f0] mb-4">Recommendations</h3>
                <div className="space-y-3">
                  {result.recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-[#141414] rounded-lg border border-[#282828]"
                    >
                      <div className="w-6 h-6 bg-[#282828] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-[#f0f0f0]">{index + 1}</span>
                      </div>
                      <p className="text-[#f0f0f0]">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
