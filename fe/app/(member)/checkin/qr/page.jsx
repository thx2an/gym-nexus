"use client"

import { useState, useEffect } from "react"
import { QrCode, CheckCircle, XCircle, History } from "lucide-react"
import { checkinApi } from "@/lib/api/checkinApi"

export default function CheckinPage() {
  const [qrCode, setQrCode] = useState("")
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      const response = await checkinApi.getHistory()
      if (response.success) {
        setHistory(response.data)
      }
    } catch (err) {
      console.error("Failed to load history", err)
    }
  }

  const handleCheckin = async () => {
    if (!qrCode.trim()) {
      setResult({ success: false, message: "Please enter a QR code" })
      return
    }

    try {
      setProcessing(true)
      setResult(null)
      const response = await checkinApi.checkin(qrCode)
      setResult(response)

      if (response.success) {
        setQrCode("")
        loadHistory()
      }
    } catch (err) {
      setResult({ success: false, message: "An error occurred during check-in" })
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">QR Check-in</h1>
        <p className="text-[#a0a0a0]">Check in to the gym using your QR code</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Check-in Form */}
        <div className="bg-[#282828] border border-[#282828] rounded-lg p-8">
          <div className="w-24 h-24 bg-[#141414] rounded-full flex items-center justify-center mx-auto mb-6">
            <QrCode className="h-12 w-12 text-[#f0f0f0]" />
          </div>

          <h3 className="text-lg font-semibold text-[#f0f0f0] mb-4 text-center">Scan or Enter QR Code</h3>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[#a0a0a0] mb-2">QR Code</label>
            <input
              type="text"
              value={qrCode}
              onChange={(e) => setQrCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCheckin()}
              placeholder="Enter QR code or scan"
              className="w-full px-4 py-3 bg-[#141414] border border-[#282828] rounded-lg text-[#f0f0f0] placeholder-[#606060] focus:outline-none focus:border-[#f0f0f0] transition-colors font-mono"
            />
            <p className="text-xs text-[#606060] mt-2">Paste your QR code string here as a fallback</p>
          </div>

          {result && (
            <div
              className={`mb-6 p-4 rounded-lg border flex items-start gap-3 ${
                result.success ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"
              }`}
            >
              {result.success ? (
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <div className={`font-semibold mb-1 ${result.success ? "text-green-500" : "text-red-500"}`}>
                  {result.success ? "Check-in Successful!" : "Check-in Failed"}
                </div>
                <div className="text-sm text-[#a0a0a0]">{result.message}</div>
                {result.data && (
                  <div className="text-xs text-[#606060] mt-2">
                    Location: {result.data.location} | {new Date(result.data.timestamp).toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>
          )}

          <button
            onClick={handleCheckin}
            disabled={processing || !qrCode.trim()}
            className="w-full px-6 py-3 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? "Processing..." : "Check In"}
          </button>
        </div>

        {/* Check-in History */}
        <div className="bg-[#282828] border border-[#282828] rounded-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#f0f0f0]">Recent Check-ins</h3>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-sm text-[#a0a0a0] hover:text-[#f0f0f0] transition-colors flex items-center gap-2"
            >
              <History className="h-4 w-4" />
              {showHistory ? "Hide" : "Show"} All
            </button>
          </div>

          {history.length === 0 ? (
            <div className="text-center py-12">
              <History className="h-10 w-10 text-[#606060] mx-auto mb-3" />
              <p className="text-[#a0a0a0] text-sm">No check-in history yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {(showHistory ? history : history.slice(0, 5)).map((item) => (
                <div key={item.id} className="p-4 bg-[#141414] rounded-lg border border-[#282828]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[#f0f0f0]">{item.location}</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#606060]">
                    <span>{new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
