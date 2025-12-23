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
    duration: 60,
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
      console.error(err)
      // Display detailed error if available
      const msg = err.message || (err.errors ? Object.values(err.errors).flat().join(", ") : "An error occurred while calculating risk")
      setError(msg)
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
                <div className="flex items-center justify-center mb-6">
                  <div className="text-center w-full bg-gray-800 p-4 rounded-lg">
                    <label className="text-sm font-medium text-[#a0a0a0] block mb-2">Session Duration (Minutes)</label>
                    <input
                      type="number"
                      min="1"
                      max="300"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: Number.parseInt(e.target.value) || 0 })}
                      className="text-3xl font-bold bg-transparent text-center w-full focus:outline-none text-[#f0f0f0]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-[#a0a0a0]">Training Load (RPE)</label>
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
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm break-words">
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

                {/* Advanced Metrics */}
                {result.metrics && (
                  <div className="grid grid-cols-2 gap-4 mt-6 border-t border-gray-700 pt-6">
                    <div className="bg-[#141414] p-3 rounded">
                      <span className="text-xs text-[#888] block text-center uppercase tracking-wide">Session Load</span>
                      <span className="text-xl font-bold text-white block text-center">{result.metrics.session_load}</span>
                      <span className="text-[10px] text-[#666] block text-center">(Min × RPE)</span>
                    </div>
                    <div className="bg-[#141414] p-3 rounded relative">
                      <span className="text-xs text-[#888] block text-center uppercase tracking-wide">Est. ACWR</span>
                      <span className={`text-xl font-bold block text-center ${result.metrics.acwr > result.metrics.threshold ? 'text-red-500' : 'text-green-500'}`}>
                        {result.metrics.acwr}
                      </span>
                      {result.metrics.acwr <= 1 && <span className="text-[10px] text-[#555] block text-center absolute bottom-1 w-full left-0">*No history</span>}
                    </div>
                  </div>
                )}
              </div>

              {/* WARNING DISCLAIMER */}
              <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-lg flex gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <p className="text-xs text-orange-200/80 leading-relaxed">
                  <strong>DISCLAIMER:</strong> All calculations (ACWR, Session Load) are for reference only (tham khảo).
                  Algorithms are based on general sports science rules and may not reflect your specific condition.
                  Please consult a doctor or physiotherapy professional if you experience persistent pain or symptoms.
                </p>
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

      {/* Guide Section */}
      <div className="mt-8 bg-[#282828] border border-[#282828] rounded-lg p-6">
        <h3 className="text-xl font-bold text-[#f0f0f0] mb-4">📖 User Guide & Metrics Explanation</h3>

        {/* ADDED WARNING HERE */}
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-200/80 text-sm">
          ⚠️ <strong>Important Note:</strong> The metrics below (ACWR, Session Load) are hypothetical indicators based on your input.
          They are NOT medical advice. If you feel sharp pain or symptoms, please visit a doctor immediately.
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Soreness Scale */}
          <div>
            <h4 className="text-lg font-semibold text-[#f0f0f0] mb-3 border-b border-gray-700 pb-2">Muscle Soreness Scale (1-10)</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="bg-green-500/20 text-green-500 font-bold px-2 py-1 rounded min-w-[50px] text-center">1 - 3</span>
                <div className="text-[#a0a0a0]">
                  <span className="text-[#f0f0f0] font-semibold block">Mild / Normal</span>
                  Light stiffness, goes away after warmup. Expected after normal training.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="bg-yellow-500/20 text-yellow-500 font-bold px-2 py-1 rounded min-w-[50px] text-center">4 - 6</span>
                <div className="text-[#a0a0a0]">
                  <span className="text-[#f0f0f0] font-semibold block">Moderate / Heavy</span>
                  Notable pain when moving, limited range of motion. Recovery needed.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="bg-red-500/20 text-red-500 font-bold px-2 py-1 rounded min-w-[50px] text-center">7 - 10</span>
                <div className="text-[#a0a0a0]">
                  <span className="text-[#f0f0f0] font-semibold block">Severe / Injury Risk</span>
                  Sharp pain, constant ache even at rest. STOP training and consult a doctor.
                </div>
              </li>
            </ul>
          </div>

          {/* Formula Explanation */}
          <div>
            <h4 className="text-lg font-semibold text-[#f0f0f0] mb-3 border-b border-gray-700 pb-2">How we calculate?</h4>
            <p className="text-[#a0a0a0] mb-3 text-sm">
              Our AI Algorithm combines 3 key factors to estimate your injury risk:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-[#d0d0d0] ml-2">
              <li><strong className="text-white">Training Load (60%)</strong>: Intensity × Frequency. Overtraining heavily impacts the score.</li>
              <li><strong className="text-white">Soreness (25%)</strong>: Your body's feedback signal. High soreness = High risk.</li>
              <li><strong className="text-white">Sleep (15%)</strong>: Poor sleep reduces recovery capability, adding a penalty score.</li>
            </ul>
            <div className="mt-4 p-3 bg-[#141414] rounded text-sm text-[#888]">
              💡 <em>Tip: Aim for a "Low Risk" score by balancing hard training with adequate rest and 8+ hours of sleep.</em>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
