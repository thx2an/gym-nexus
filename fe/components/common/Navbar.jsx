"use client";

import Link from "next/link";
import Image from "next/image";
import { User, LogOut } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-primarySurface text-text-strong border-b border-borderColor-light shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/uploads/gymlogo.png"
            width={45}
            height={45}
            alt="logo"
            className="rounded-md"
          />
          <span className="text-xl font-bold">Gym Fitness</span>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 hover:bg-bg-subtle p-2 rounded-lg transition-colors border border-transparent hover:border-borderColor-light"
          >
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-text-strong leading-none">Member Name</p>
              <p className="text-xs text-text-medium mt-1">3-Month Membership</p>
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border border-borderColor-light">
              <User size={20} className="text-gray-500" />
            </div>
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-bg-base border border-borderColor-light rounded-xl shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2">
              <Link href="/dashboard/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-strong hover:bg-bg-subtle transition-colors">
                <User size={16} />
                Edit Profile
              </Link>
              <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-accent-error hover:bg-accent-error/10 transition-colors text-left">
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu - Hidden */}
      {/* {open && (
        <div className="md:hidden flex flex-col px-4 pb-3 gap-3 bg-primarySurface border-t border-borderColor-light">
          <Link href="/" className="hover:text-accent">Home</Link>
          <Link href="/auth/login" className="hover:text-accent">Login</Link>
        </div>
      )} */}
    </nav>
  );
}
