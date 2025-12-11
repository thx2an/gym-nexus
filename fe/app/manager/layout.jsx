"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, Package, LogOut } from "lucide-react";

export default function ManagerLayout({ children }) {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/manager/dashboard" },
    { name: "Branches", icon: Building2, href: "/manager/branches" },
    { name: "Packages", icon: Package, href: "/manager/packages" },
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
          <h2 className="text-xl font-bold text-primarySurface">Manager</h2>
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

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
