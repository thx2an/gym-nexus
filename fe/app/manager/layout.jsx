"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  Building2,
  Package,
  BarChart3,
  Bell,
  ChevronDown,
  User,
} from "lucide-react";

export default function ManagerLayout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname === "/manager/dashboard";

  const [reportsOpen, setReportsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Auto open Reports submenu
  useEffect(() => {
    if (pathname.startsWith("/manager/reports")) {
      setReportsOpen(true);
    }
  }, [pathname]);

  // Close user dropdown when click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target)
      ) {
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
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
            Manager
          </span>
        </div>

        {/* MENU */}
        <nav className="flex-1 space-y-1">
          <NavLink
            href="/manager/dashboard"
            label="Dashboard"
            icon={LayoutDashboard}
            active={pathname.startsWith("/manager/dashboard")}
          />

          <NavLink
            href="/manager/branches"
            label="Branches"
            icon={Building2}
            active={pathname.startsWith("/manager/branches")}
          />

          <NavLink
            href="/manager/packages"
            label="Packages"
            icon={Package}
            active={pathname.startsWith("/manager/packages")}
          />

          {/* REPORTS */}
          <div>
            <button
              onClick={() => setReportsOpen(!reportsOpen)}
              className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition
                ${
                  pathname.startsWith("/manager/reports")
                    ? "bg-[#1A1F26] text-white"
                    : "text-gray-300 hover:bg-[#1A1F26]"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5" />
                <span>Reports</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition ${
                  reportsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {reportsOpen && (
              <div className="ml-6 mt-1 space-y-1">
                <SubLink
                  href="/manager/reports/revenue"
                  label="Revenue"
                  active={pathname === "/manager/reports/revenue"}
                />
                <SubLink
                  href="/manager/reports/member-activity"
                  label="Member Activity"
                  active={
                    pathname === "/manager/reports/member-activity"
                  }
                />
                <SubLink
                  href="/manager/reports/trainer-performance"
                  label="Trainer Performance"
                  active={
                    pathname ===
                    "/manager/reports/trainer-performance"
                  }
                />
              </div>
            )}
          </div>

          <NavLink
            href="/manager/notifications"
            label="Notifications"
            icon={Bell}
            active={pathname.startsWith("/manager/notifications")}
          />
        </nav>
      </aside>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 flex flex-col">
        {/* ===== TOP BAR (CHỈ DASHBOARD) ===== */}
        {isDashboard && (
          <header className="h-16 px-8 flex items-center justify-end border-b border-[#2A2F38] bg-[#0F141B]">
            <div
              className="flex items-center gap-6 relative"
              ref={userMenuRef}
            >
              {/* NOTIFICATION */}
              <Link
                href="/manager/notifications"
                className="relative text-gray-300 hover:text-white transition"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                  2
                </span>
              </Link>

              {/* USER MENU */}
              <button
                onClick={() => setUserOpen(!userOpen)}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              >
                <User className="w-5 h-5" />
                <ChevronDown className="w-4 h-4" />
              </button>

              {userOpen && (
                <div className="absolute right-0 top-10 w-40 bg-[#1A1F26] border border-[#2A2F38] rounded-lg shadow-xl overflow-hidden z-50">
                  <Link
                    href="/auth/logout"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#0F141B] hover:text-white transition"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </header>
        )}

        {/* ===== PAGE CONTENT ===== */}
        <main className="flex-1 p-10">{children}</main>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function NavLink({ href, label, icon: Icon, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
        ${
          active
            ? "bg-[#1A1F26] text-white"
            : "text-gray-300 hover:bg-[#1A1F26]"
        }
      `}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  );
}

function SubLink({ href, label, active }) {
  return (
    <Link
      href={href}
      className={`block px-4 py-1.5 rounded-md text-sm transition
        ${
          active
            ? "bg-[#1A1F26] text-white font-medium"
            : "text-gray-400 hover:bg-[#1A1F26]"
        }
      `}
    >
      {label}
    </Link>
  );
}
