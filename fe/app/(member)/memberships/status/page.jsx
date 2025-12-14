"use client"

import { useState, useEffect } from "react"
import { Package, Calendar, Clock, AlertCircle, CheckCircle } from "lucide-react"
import { membershipApi } from "@/lib/api/membershipApi"
import Link from "next/link"

export default function MembershipStatusPage() {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadStatus()
  }, [])

  const loadStatus = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await membershipApi.getStatus()
      if (response.success) {
        setStatus(response.data)
      } else {
        setError("Failed to load membership status")
      }
    } catch (err) {
      setError("An error occurred while loading status")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#282828] border-t-[#f0f0f0] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#a0a0a0]">Loading status...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-[#282828] rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-[#606060]" />
          </div>
          <h3 className="text-xl font-semibold text-[#f0f0f0] mb-2">Failed to Load Status</h3>
          <p className="text-[#a0a0a0] mb-6">{error}</p>
          <button
            onClick={loadStatus}
            className="px-6 py-2.5 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!status || status.status === "None") {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">Membership Status</h1>
          <p className="text-[#a0a0a0]">View your current membership details</p>
        </div>

        <div className="bg-[#282828] border border-[#282828] rounded-lg p-12 text-center">
          <Package className="h-16 w-16 text-[#606060] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#f0f0f0] mb-2">No Active Membership</h3>
          <p className="text-[#a0a0a0] mb-6">You don't have an active membership yet</p>
          <Link
            href="/memberships"
            className="inline-block px-6 py-3 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg font-medium transition-colors"
          >
            Purchase a Plan
          </Link>
        </div>
      </div>
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "Expired":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "Pending Verification":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      default:
        return "bg-[#282828] text-[#a0a0a0] border-[#282828]"
    }
  }

  const shouldShowRenewal = status.status === "Active" && status.daysRemaining < 7

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">Membership Status</h1>
        <p className="text-[#a0a0a0]">View your current membership details</p>
      </div>

      {shouldShowRenewal && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-yellow-500 mb-1">Membership Expiring Soon</h4>
            <p className="text-[#a0a0a0] text-sm mb-3">
              Your membership will expire in {status.daysRemaining} days. Renew now to avoid interruption.
            </p>
            <Link
              href="/memberships"
              className="inline-block px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-[#141414] text-sm rounded-lg font-medium transition-colors"
            >
              Renew Now
            </Link>
          </div>
        </div>
      )}

      <div className="bg-[#282828] border border-[#282828] rounded-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#f0f0f0]">{status.packageName}</h2>
          <span className={`px-4 py-2 rounded-lg border font-semibold text-sm ${getStatusColor(status.status)}`}>
            {status.status}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#141414] p-6 rounded-lg border border-[#282828]">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="h-5 w-5 text-[#606060]" />
              <h3 className="font-semibold text-[#f0f0f0]">Start Date</h3>
            </div>
            <p className="text-2xl font-bold text-[#f0f0f0]">
              {new Date(status.startDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="bg-[#141414] p-6 rounded-lg border border-[#282828]">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="h-5 w-5 text-[#606060]" />
              <h3 className="font-semibold text-[#f0f0f0]">End Date</h3>
            </div>
            <p className="text-2xl font-bold text-[#f0f0f0]">
              {new Date(status.endDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="bg-[#141414] p-6 rounded-lg border border-[#282828]">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="h-5 w-5 text-[#606060]" />
              <h3 className="font-semibold text-[#f0f0f0]">Days Remaining</h3>
            </div>
            <p className="text-2xl font-bold text-[#f0f0f0]">{status.daysRemaining} days</p>
          </div>

          <div className="bg-[#141414] p-6 rounded-lg border border-[#282828]">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="h-5 w-5 text-[#606060]" />
              <h3 className="font-semibold text-[#f0f0f0]">Auto Renewal</h3>
            </div>
            <p className="text-2xl font-bold text-[#f0f0f0]">{status.autoRenew ? "Enabled" : "Disabled"}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            href="/memberships"
            className="flex-1 px-6 py-3 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] text-center rounded-lg font-medium transition-colors"
          >
            View All Packages
          </Link>
          <Link
            href="/memberships/history"
            className="flex-1 px-6 py-3 bg-[#282828] hover:bg-[#333333] text-[#f0f0f0] text-center rounded-lg font-medium border border-[#282828] transition-colors"
          >
            Payment History
          </Link>
        </div>
      </div>
    </div>
  )
}
