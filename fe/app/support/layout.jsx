"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageCircle,
  FileText,
  BookOpen,
  Bell,
  LifeBuoy,
  LogOut
} from "lucide-react";

export default function SupportLayout({ children }) {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/support/dashboard" },
    { name: "Tickets", icon: LifeBuoy, href: "/support/tickets" },
    { name: "Live Chat", icon: MessageCircle, href: "/support/chat" },
    { name: "Knowledge Base", icon: BookOpen, href: "/support/knowledge-base" },
    { name: "Analytics", icon: FileText, href: "/support/analytics" },
    { name: "Notifications", icon: Bell, href: "/support/notifications" },
  ];

  return (
    <div className="flex min-h-screen bg-primarySurface text-text-strong">

      {/* SIDEBAR */}
      <aside className="w-64 bg-base-inverted border-r border-borderColor-dark p-6">
        <div className="flex items-center gap-3 mb-8">
          <Image
            src="/uploads/gymlogo.png"
            width={50}
            height={50}
            alt="Gym Logo"
            className="rounded-md"
          />
          <h2 className="text-xl font-bold text-primarySurface">Support</h2>
        </div>

        <nav className="space-y-2">
          {menu.map((item, i) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);

            return (
              <Link
                key={i}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
                  ${active ? "bg-accent text-white" : "hover:bg-borderColor-dark/40"}
                `}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <Link
          href="/auth/logout"
          className="flex items-center gap-3 px-4 py-2 rounded-lg mt-6 text-text-medium hover:text-accent"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Link>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
