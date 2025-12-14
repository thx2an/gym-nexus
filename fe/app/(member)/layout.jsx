"use client"

import {
  Bell,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  CreditCard,
  Package,
  Calendar,
  QrCode,
  TrendingUp,
  Brain,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function MemberLayout({ children }) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const unreadCount = 3

  const navGroups = [
    {
      title: "Overview",
      items: [{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }],
    },
    {
      title: "Memberships",
      items: [
        { href: "/memberships", label: "Packages", icon: Package },
        { href: "/memberships/status", label: "My Status", icon: Package },
        { href: "/memberships/history", label: "Payment History", icon: CreditCard },
      ],
    },
    {
      title: "Training",
      items: [
        { href: "/booking/trainers", label: "Trainers", icon: Calendar },
        { href: "/booking/schedule", label: "Schedule", icon: Calendar },
        { href: "/booking/session/my-sessions", label: "My Sessions", icon: Calendar },
      ],
    },
    {
      title: "Track Progress",
      items: [
        { href: "/checkin/qr", label: "QR Check-in", icon: QrCode },
        { href: "/progress", label: "Progress Charts", icon: TrendingUp },
      ],
    },
    {
      title: "AI Tools",
      items: [
        { href: "/ai/workout", label: "Workout Plan", icon: Brain },
        { href: "/ai/nutrition", label: "Nutrition", icon: Brain },
        { href: "/ai/pose", label: "Pose Analysis", icon: Brain },
        { href: "/ai/injury", label: "Injury Risk", icon: Brain },
      ],
    },
  ]

  return (
    <div className="flex min-h-screen bg-[#141414]">
      <aside
        className={`border-r border-[#282828] bg-[#141414] transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"} overflow-y-auto`}
      >
        <div className="p-6 border-b border-[#282828] flex items-center justify-between sticky top-0 bg-[#141414] z-10">
          {!isCollapsed && <h1 className="text-xl font-semibold text-[#f0f0f0]">Gym Nexus</h1>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-[#282828] transition-colors text-[#f0f0f0]"
          >
            {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </button>
        </div>

        <nav className="p-4 space-y-6">
          {navGroups.map((group) => (
            <div key={group.title}>
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-[#606060] uppercase tracking-wider mb-2 px-4">
                  {group.title}
                </h3>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${isActive
                          ? "bg-[#f0f0f0] text-[#141414]"
                          : "text-[#a0a0a0] hover:bg-[#282828] hover:text-[#f0f0f0]"
                        }`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="border-b border-[#282828] bg-[#141414] px-8 py-4 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium text-[#f0f0f0]">Welcome back</h2>

            <div className="flex items-center gap-4">
              {/* Notification Bell */}
              <Link
                href="/notifications"
                className="relative p-2 rounded-lg hover:bg-[#282828] transition-colors text-[#f0f0f0]"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#f0f0f0] text-xs font-semibold text-[#141414]">
                    {unreadCount}
                  </span>
                )}
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#282828] transition-colors text-[#f0f0f0]"
                >
                  <User className="h-5 w-5" />
                  <ChevronDown className={`h-4 w-4 transition-transform ${showProfileMenu ? "rotate-180" : ""}`} />
                </button>

                {showProfileMenu && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setShowProfileMenu(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-[#282828] border border-[#282828] rounded-lg shadow-lg z-40 overflow-hidden">
                      <Link
                        href="/profile/edit"
                        className="flex items-center gap-3 px-4 py-3 border-b border-[#000000] text-[#f0f0f0] hover:bg-[#1E1E1E] transition-colors text-sm"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <User className="h-4 w-4" />
                        Edit Profile
                      </Link>
                      <Link
                        href="/auth/logout"
                        className="w-full flex items-center gap-3 px-4 py-3 text-[#f0f0f0] hover:bg-[#1E1E1E] transition-colors text-sm"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <LogOut className="h-4 w-4" />
                        Log Out
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 bg-[#141414]">{children}</main>
      </div>
    </div>
  )
}
