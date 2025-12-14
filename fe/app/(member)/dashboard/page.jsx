"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Package, CreditCard, Calendar, QrCode, TrendingUp, Brain, AlertCircle } from "lucide-react"
import { membershipApi } from "@/lib/api/membershipApi"

export default function DashboardPage() {
  const [membership, setMembership] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMembershipStatus()
  }, [])

  const loadMembershipStatus = async () => {
    try {
      const response = await membershipApi.getStatus()
      if (response.success) {
        setMembership(response.data)
      }
    } catch (err) {
      console.error("Failed to load membership status", err)
    } finally {
      setLoading(false)
    }
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

  const quickLinks = [
    {
      title: "View Packages",
      description: "Browse membership options",
      href: "/memberships",
      icon: Package,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Payment History",
      description: "View transactions & invoices",
      href: "/memberships/history",
      icon: CreditCard,
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Book Training",
      description: "Schedule a trainer session",
      href: "/booking/schedule",
      icon: Calendar,
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "QR Check-in",
      description: "Check in to the gym",
      href: "/checkin/qr",
      icon: QrCode,
      color: "bg-orange-500/10 text-orange-500",
    },
    {
      title: "Track Progress",
      description: "Monitor your fitness journey",
      href: "/progress",
      icon: TrendingUp,
      color: "bg-pink-500/10 text-pink-500",
    },
    {
      title: "AI Tools",
      description: "Get personalized plans",
      href: "/ai/workout",
      icon: Brain,
      color: "bg-cyan-500/10 text-cyan-500",
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#282828] border-t-[#f0f0f0] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#a0a0a0]">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">Dashboard Overview</h1>
        <p className="text-[#a0a0a0]">Welcome back! Here's your fitness journey at a glance.</p>
      </div>

      {/* Membership Status Card */}
      <div className="bg-[#282828] border border-[#282828] rounded-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#f0f0f0]">Membership Status</h2>
          {membership && (
            <span className={`px-4 py-2 rounded-lg border font-semibold text-sm ${getStatusColor(membership.status)}`}>
              {membership.status}
            </span>
          )}
        </div>

        {membership?.status === "Active" ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#141414] rounded-lg border border-[#282828] p-4">
                <p className="text-xs text-[#606060] mb-2">Package</p>
                <p className="text-base font-semibold text-[#f0f0f0]">{membership.packageName}</p>
              </div>
              <div className="bg-[#141414] rounded-lg border border-[#282828] p-4">
                <p className="text-xs text-[#606060] mb-2">Days Remaining</p>
                <p className="text-base font-semibold text-[#f0f0f0]">{membership.daysRemaining} days</p>
              </div>
              <div className="bg-[#141414] rounded-lg border border-[#282828] p-4">
                <p className="text-xs text-[#606060] mb-2">Start Date</p>
                <p className="text-base font-semibold text-[#f0f0f0]">
                  {new Date(membership.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              </div>
              <div className="bg-[#141414] rounded-lg border border-[#282828] p-4">
                <p className="text-xs text-[#606060] mb-2">End Date</p>
                <p className="text-base font-semibold text-[#f0f0f0]">
                  {new Date(membership.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              </div>
            </div>

            {membership.daysRemaining < 7 && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-yellow-500 mb-1">Membership Expiring Soon!</p>
                  <p className="text-sm text-[#a0a0a0] mb-3">Renew now to continue enjoying all benefits.</p>
                  <Link
                    href="/memberships"
                    className="inline-block px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-[#141414] text-sm rounded-lg font-medium transition-colors"
                  >
                    Renew Now
                  </Link>
                </div>
              </div>
            )}
          </>
        ) : membership?.status === "Expired" ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-lg font-semibold text-red-500 mb-1">Your membership has expired</p>
              <p className="text-[#a0a0a0] mb-4">Purchase a plan to regain access to all features.</p>
              <Link
                href="/memberships"
                className="inline-block px-6 py-2.5 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg font-medium transition-colors"
              >
                Purchase a Plan
              </Link>
            </div>
          </div>
        ) : membership?.status === "Pending Verification" ? (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
            <p className="font-semibold text-yellow-500 mb-1">Verification Pending</p>
            <p className="text-[#a0a0a0]">Your membership is under verification. We'll notify you once complete.</p>
          </div>
        ) : (
          <div className="bg-[#141414] border border-[#282828] rounded-lg p-6 text-center">
            <Package className="h-12 w-12 text-[#606060] mx-auto mb-4" />
            <p className="text-lg font-semibold text-[#f0f0f0] mb-1">No Active Membership</p>
            <p className="text-[#a0a0a0] mb-4">Get started with a membership plan today</p>
            <Link
              href="/memberships"
              className="inline-block px-6 py-2.5 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg font-medium transition-colors"
            >
              View Packages
            </Link>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-xl font-semibold text-[#f0f0f0] mb-4">Quick Access</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className="bg-[#282828] border border-[#282828] rounded-lg p-6 hover:bg-[#1E1E1E] transition-all group"
              >
                <div className={`w-12 h-12 ${link.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-[#f0f0f0] mb-1 group-hover:text-white transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-[#a0a0a0]">{link.description}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
