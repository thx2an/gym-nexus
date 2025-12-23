"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  MessageCircle,
  FileText,
  BookOpen,
  Bell,
  LifeBuoy,
  User,
  LogOut,
} from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";

export default function SupportLayout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname === "/support/dashboard";
  const [userOpen, setUserOpen] = useState(false);

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/support/dashboard" },
    { name: "Tickets", icon: LifeBuoy, href: "/support/tickets" },
    { name: "Live Chat", icon: MessageCircle, href: "/support/chat" },
    {
      name: "Knowledge Base",
      icon: BookOpen,
      href: "/support/knowledge-base",
    },
    { name: "Analytics", icon: FileText, href: "/support/analytics" },
    { name: "Notifications", icon: Bell, href: "/support/notifications" },
  ];

  return (
    <AuthGuard allowedRoles={[2]}>
      <div className="flex min-h-screen bg-[#000014] text-white">
        {/* ================= SIDEBAR ================= */}
        <aside className="w-64 bg-[#0F141B] border-r border-[#2A2F38] p-6 flex flex-col">
          {/* LOGO */}
          <div className="flex items-center gap-3 mb-10">
            <Image
              src="/uploads/defaultavatar.png"
              width={40}
              height={40}
              alt="Avatar"
              className="rounded-md"
            />
            <span className="font-semibold text-lg tracking-wide">
              Support Staff
            </span>
          </div>

          {/* MENU */}
          <nav className="flex-1 space-y-1">
            {menu.map((item, i) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);

              return (
                <Link
                  key={i}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
                  ${active
                      ? "bg-[#1A1F26] text-white"
                      : "text-gray-300 hover:bg-[#1A1F26]"
                    }
                `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* ================= CONTENT ================= */}
        <main className="flex-1 p-10 relative">
          {/* ===== TOP RIGHT ICONS (ONLY DASHBOARD) ===== */}
          {isDashboard && (
            <div className="absolute top-6 right-8 flex items-center gap-4">
              {/* Bell */}
              <Link
                href="/support/notifications"
                className="w-10 h-10 rounded-full bg-[#1A1F26] border border-[#2A2F38]
                flex items-center justify-center
                hover:bg-[#222836] transition"
              >
                <Bell className="w-5 h-5 text-white" />
              </Link>

              {/* User */}
              <div className="relative">
                <button
                  onClick={() => setUserOpen(!userOpen)}
                  className="w-10 h-10 rounded-full bg-[#1A1F26] border border-[#2A2F38]
                  flex items-center justify-center
                  hover:bg-[#222836] transition"
                >
                  <User className="w-5 h-5 text-white" />
                </button>

                {userOpen && (
                  <div
                    className="absolute right-0 mt-2 w-36 rounded-xl
                    bg-[#0F141B] border border-[#2A2F38]
                    shadow-lg overflow-hidden z-50"
                  >
                    <Link
                      href="/auth/logout"
                      className="flex items-center gap-2 px-4 py-2 text-sm
                      text-gray-300 hover:bg-[#1A1F26]"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
