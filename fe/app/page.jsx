"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const equipment = [
    { name: "Cardio Equipment", desc: "Treadmills, ellipticals, rowing machines" },
    { name: "Weight Training", desc: "Dumbbells, barbells, squat racks" },
    { name: "Strength Machines", desc: "Chest press, leg press, cable machines" },
    { name: "Flexibility & Core", desc: "Yoga mats, foam rollers, TRX systems" },
  ];

  const features = [
    { icon: "👥", title: "Expert Trainers", desc: "Professional PTs to guide your journey" },
    { icon: "⏱️", title: "Flexible Training", desc: "Book sessions anytime" },
    { icon: "⚡", title: "AI Fitness", desc: "Virtual trainer & risk analysis" },
    { icon: "🏆", title: "High Quality", desc: "Premium facilities & programs" },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "'Obised', sans-serif",
        backgroundColor: "#000014",
        color: "#f0f0f0",
      }}
    >
      {/* ================= NAVBAR ================= */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{ backgroundColor: "rgba(0,0,20,0.95)", borderColor: "#282828" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
          
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <img
              src="/uploads/logogym.png"
              alt="Gym Nexus Logo"
              className="w-20 h-20 object-contain opacity-80"
            />
            <span className="text-sm font-black tracking-widest">
              GYM NEXUS
            </span>
          </div>

          {/* MENU */}
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#home" className="hover:opacity-70">Home</a>
            <a href="#equipment" className="hover:opacity-70">Equipment</a>
            <a href="#features" className="hover:opacity-70">Features</a>
            <a href="#contact" className="hover:opacity-70">Contact</a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-xl"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-[#141414] border-[#282828] px-6 py-4 space-y-3 text-sm">
            <a href="#home" className="block">Home</a>
            <a href="#equipment" className="block">Equipment</a>
            <a href="#features" className="block">Features</a>
            <a href="#contact" className="block">Contact</a>
          </div>
        )}
      </nav>

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="relative min-h-[85vh] flex items-center justify-center px-6 text-center overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/images/gymbackground.jpg"
            alt="Gym background"
            className="w-full h-full object-cover blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-[#000014]/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            ELEVATE YOUR FITNESS
          </h1>
          <p className="text-sm md:text-base opacity-80 mb-8">
            Smarter training with expert coaches and AI-powered fitness analytics.
          </p>
          <Link
            href="/auth/login"
            className="inline-block px-8 py-3 rounded-lg font-bold bg-white text-[#000014] text-sm hover:scale-105 transition"
          >
            LOGIN NOW
          </Link>
        </div>
      </section>

      {/* ================= EQUIPMENT ================= */}
      <section id="equipment" className="py-16 px-6 bg-[#141414]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12">EQUIPMENT</h2>

          <div className="space-y-12">
            {equipment.map((item, i) => {
              const images = [
                "/images/cardioequipment.jpg",
                "/images/weighttraining.jpg",
                "/images/strengthmachines.jpg",
                "/images/flexibilitycore.jpg",
              ];

              const isEven = i % 2 === 0;

              return (
                <div
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
                >
                  {isEven ? (
                    <>
                      <img
                        src={images[i]}
                        className="rounded-xl h-56 w-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                        <p className="text-sm opacity-70">{item.desc}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="order-2 md:order-1">
                        <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                        <p className="text-sm opacity-70">{item.desc}</p>
                      </div>
                      <img
                        src={images[i]}
                        className="rounded-xl h-56 w-full object-cover order-1 md:order-2"
                      />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-10">WHY CHOOSE US</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-[#141414] border border-[#282828]"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-sm mb-1">{f.title}</h3>
                <p className="text-xs opacity-70">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="py-16 px-6 bg-[#141414] text-center">
        <h2 className="text-3xl font-black mb-10">CONTACT</h2>

        <div className="space-y-4 max-w-md mx-auto text-sm">
          <div className="bg-[#282828] p-3 rounded-lg">
            📞 (+84) 0902-123-456
          </div>

          <div className="bg-[#282828] p-3 rounded-lg">
            ✉️ support@gymnexus.com
          </div>

          <div className="bg-[#282828] p-3 rounded-lg">
            📍 123 Fitness St, City
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-10 text-center border-t border-[#282828]">
        <img
          src="/uploads/logogym.png"
          className="w-20 h-20 mx-auto mb-4 opacity-50"
        />
        <p className="text-xs opacity-60">
          © 2025 GYM NEXUS. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
