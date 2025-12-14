"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, Calendar } from "lucide-react"
import { progressApi } from "@/lib/api/progressApi"

export default function ProgressPage() {
  const [metric, setMetric] = useState("weight")
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const metrics = [
    { value: "weight", label: "Weight (kg)", color: "bg-blue-500" },
    { value: "bmi", label: "BMI", color: "bg-green-500" },
    { value: "bodyFat", label: "Body Fat %", color: "bg-yellow-500" },
  ]

  useEffect(() => {
    loadData()
  }, [metric])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await progressApi.getMetrics(metric)
      if (response.success) {
        setData(response.data)
      } else {
        setError("Failed to load progress data")
      }
    } catch (err) {
      setError("An error occurred while loading data")
    } finally {
      setLoading(false)
    }
  }

  const calculateChange = () => {
    if (data.length < 2) return null
    const first = data[0].value
    const last = data[data.length - 1].value
    const change = last - first
    const percentage = ((change / first) * 100).toFixed(1)
    return { change: change.toFixed(1), percentage, isPositive: change < 0 }
  }

  const change = calculateChange()
  const maxValue = Math.max(...data.map((d) => d.value))
  const minValue = Math.min(...data.map((d) => d.value))

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#282828] border-t-[#f0f0f0] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#a0a0a0]">Loading progress...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-[#282828] rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-8 w-8 text-[#606060]" />
          </div>
          <h3 className="text-xl font-semibold text-[#f0f0f0] mb-2">Failed to Load Progress</h3>
          <p className="text-[#a0a0a0] mb-6">{error}</p>
          <button
            onClick={loadData}
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
        <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">Progress Tracking</h1>
        <p className="text-[#a0a0a0]">Monitor your fitness journey and track improvements</p>
      </div>

      {/* Metric Selection */}
      <div className="mb-6">
        <div className="inline-flex bg-[#282828] border border-[#282828] rounded-lg p-1">
          {metrics.map((m) => (
            <button
              key={m.value}
              onClick={() => setMetric(m.value)}
              className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
                metric === m.value ? "bg-[#f0f0f0] text-[#141414]" : "text-[#a0a0a0] hover:text-[#f0f0f0]"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      {change && (
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-[#282828] border border-[#282828] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              {change.isPositive ? (
                <TrendingDown className="h-5 w-5 text-green-500" />
              ) : (
                <TrendingUp className="h-5 w-5 text-red-500" />
              )}
              <h3 className="font-semibold text-[#f0f0f0]">Total Change</h3>
            </div>
            <div className="text-3xl font-bold text-[#f0f0f0]">
              {change.isPositive ? "" : "+"}
              {change.change}
            </div>
            <p className="text-sm text-[#a0a0a0] mt-1">
              {change.isPositive ? "" : "+"}
              {change.percentage}% from start
            </p>
          </div>

          <div className="bg-[#282828] border border-[#282828] rounded-lg p-6">
            <h3 className="font-semibold text-[#f0f0f0] mb-2">Current</h3>
            <div className="text-3xl font-bold text-[#f0f0f0]">{data[data.length - 1]?.value.toFixed(1)}</div>
            <p className="text-sm text-[#a0a0a0] mt-1">Latest measurement</p>
          </div>

          <div className="bg-[#282828] border border-[#282828] rounded-lg p-6">
            <h3 className="font-semibold text-[#f0f0f0] mb-2">Starting</h3>
            <div className="text-3xl font-bold text-[#f0f0f0]">{data[0]?.value.toFixed(1)}</div>
            <p className="text-sm text-[#a0a0a0] mt-1">First measurement</p>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="bg-[#282828] border border-[#282828] rounded-lg p-8">
        <h3 className="text-lg font-semibold text-[#f0f0f0] mb-6">Progress Over Time</h3>

        {data.length === 0 ? (
          <div className="text-center py-12">
            <TrendingUp className="h-12 w-12 text-[#606060] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#f0f0f0] mb-2">No data available</h3>
            <p className="text-[#a0a0a0]">Start tracking your progress to see your journey</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((item, index) => {
              const percentage = ((item.value - minValue) / (maxValue - minValue)) * 100
              const currentMetric = metrics.find((m) => m.value === metric)

              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-24 flex items-center gap-2 text-sm text-[#a0a0a0]">
                    <Calendar className="h-4 w-4 text-[#606060]" />
                    {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </div>

                  <div className="flex-1 relative h-10 bg-[#141414] rounded-lg overflow-hidden">
                    <div
                      className={`absolute inset-y-0 left-0 ${currentMetric?.color || "bg-blue-500"} opacity-20 transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                    <div className="absolute inset-0 flex items-center px-4">
                      <span className="text-[#f0f0f0] font-semibold">{item.value.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Data Table */}
      <div className="mt-6 bg-[#282828] border border-[#282828] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#141414] border-b border-[#000000]">
            <tr>
              <th className="text-left px-6 py-4 text-[#a0a0a0] font-semibold text-sm">Date</th>
              <th className="text-left px-6 py-4 text-[#a0a0a0] font-semibold text-sm">Value</th>
              <th className="text-left px-6 py-4 text-[#a0a0a0] font-semibold text-sm">Change</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const prevValue = index > 0 ? data[index - 1].value : null
              const diff = prevValue ? (item.value - prevValue).toFixed(1) : null

              return (
                <tr key={index} className={`${index !== data.length - 1 ? "border-b border-[#282828]" : ""}`}>
                  <td className="px-6 py-4 text-[#f0f0f0]">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-[#f0f0f0] font-semibold">{item.value.toFixed(1)}</td>
                  <td className="px-6 py-4">
                    {diff ? (
                      <span className={`text-sm ${Number.parseFloat(diff) < 0 ? "text-green-500" : "text-red-500"}`}>
                        {Number.parseFloat(diff) > 0 ? "+" : ""}
                        {diff}
                      </span>
                    ) : (
                      <span className="text-[#606060] text-sm">-</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
