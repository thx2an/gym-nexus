"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
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

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-accent">Home</Link>
          <Link href="/auth/login" className="hover:text-accent">Login</Link>
        </div>

        {/* Mobile Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col px-4 pb-3 gap-3 bg-primarySurface border-t border-borderColor-light">
          <Link href="/" className="hover:text-accent">Home</Link>
          <Link href="/auth/login" className="hover:text-accent">Login</Link>
        </div>
      )}
    </nav>
  );
}
