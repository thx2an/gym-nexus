"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Menu,
  X,
  Users,
  Zap,
  Clock,
  Award,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const equipment = [
    {
      name: "Cardio Equipment",
      icon: "🏃",
      desc: "Treadmills, ellipticals, rowing machines",
    },
    {
      name: "Weight Training",
      icon: "🏋️",
      desc: "Dumbbells, barbells, squat racks",
    },
    {
      name: "Strength Machines",
      icon: "⚙️",
      desc: "Chest press, leg press, cable machines",
    },
    {
      name: "Flexibility & Core",
      icon: "🧘",
      desc: "Yoga mats, foam rollers, TRX systems",
    },
  ];

  const features = [
    {
      icon: "👥",
      title: "Expert Trainers",
      desc: "Professional PTs to guide your journey",
    },
    {
      icon: "⏱️",
      title: "Flexible Training",
      desc: "Book sessions anytime",
    },
    {
      icon: "⚡",
      title: "AI Fitness",
      desc: "Virtual trainer & risk analysis",
    },
    {
      icon: "🏆",
      title: "High Quality",
      desc: "Premium facilities & programs",
    },
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
      {/* NAVBAR */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{
          backgroundColor: "rgba(0, 0, 20, 0.95)",
          borderColor: "#282828",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-xl overflow-hidden transition transform hover:scale-110"
              style={{
                backgroundColor: "#f0f0f0",
                boxShadow: "0 0 20px rgba(240, 240, 240, 0.4)",
              }}
            >
              <img
                src="/uploads/gymlogo.png"
                alt="Gym Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <span
              className="text-3xl font-black"
              style={{
                letterSpacing: "0.05em",
                textShadow: "0 0 20px rgba(240, 240, 240, 0.3)",
              }}
            >
              GYM FITNESS
            </span>
          </div>

          <div className="hidden md:flex gap-10 text-lg">
            <a href="#home" className="hover:opacity-70">Home</a>
            <a href="#equipment" className="hover:opacity-70">Equipment</a>
            <a href="#features" className="hover:opacity-70">Features</a>
            <a href="#contact" className="hover:opacity-70">Contact</a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-2xl"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {isMenuOpen && (
          <div
            className="md:hidden border-t"
            style={{ backgroundColor: "#141414", borderColor: "#282828" }}
          >
            <div className="px-6 py-6 space-y-4 text-lg">
              <a href="#home" className="block hover:opacity-70">Home</a>
              <a href="#equipment" className="block hover:opacity-70">Equipment</a>
              <a href="#features" className="block hover:opacity-70">Features</a>
              <a href="#contact" className="block hover:opacity-70">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -left-40 w-80 h-80 rounded-full opacity-10 blur-3xl bg-white" />
          <div className="absolute bottom-20 -right-40 w-80 h-80 rounded-full opacity-10 blur-3xl bg-white" />
        </div>

        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-black mb-8">
            ELEVATE YOUR{" "}
            <span className="drop-shadow-[0_0_30px_rgba(240,240,240,0.5)]">
              FITNESS
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-10 opacity-90">
            Transform your body and mind with cutting-edge equipment, expert
            coaching, and AI-powered fitness analytics.
          </p>

          <a
            href="/auth/login"
            className="inline-block px-12 py-5 rounded-xl font-bold text-lg bg-white text-[#000014]"
          >
            LOGIN NOW
          </a>
        </div>
      </section>

      {/* EQUIPMENT */}
      <section id="equipment" className="py-24 px-6 bg-[#141414]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              PREMIUM EQUIPMENT
            </h2>
            <p className="opacity-80">
              State-of-the-art facilities designed for every fitness level
            </p>
          </div>

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
                        alt={item.name}
                        className="rounded-2xl h-80 w-full object-cover"
                      />
                      <div className="p-8">
                        <h3 className="text-3xl font-black mb-4">
                          {item.name}
                        </h3>
                        <p className="opacity-80">{item.desc}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-8 order-2 md:order-1">
                        <h3 className="text-3xl font-black mb-4">
                          {item.name}
                        </h3>
                        <p className="opacity-80">{item.desc}</p>
                      </div>
                      <img
                        src={images[i]}
                        alt={item.name}
                        className="rounded-2xl h-80 w-full object-cover order-1 md:order-2"
                      />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-16">
            WHY CHOOSE US
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-xl border bg-[#141414] border-[#282828]"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="font-bold mb-3">{feature.title}</h3>
                <p className="text-sm opacity-70">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#282828] text-center">
        <h2 className="text-5xl font-black mb-8">READY TO TRANSFORM?</h2>
        <p className="mb-10 opacity-90">
          Join thousands of members already achieving their fitness goals
        </p>
        <a
          href="/auth/register"
          className="inline-flex items-center gap-3 px-12 py-5 rounded-xl font-bold bg-white text-[#000014]"
        >
          SIGN UP NOW →
        </a>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 bg-[#141414] text-center">
        <h2 className="text-5xl font-black mb-16">GET IN TOUCH</h2>

        <div className="space-y-6 max-w-md mx-auto">
          <div className="flex justify-center gap-4 p-4 bg-[#282828] rounded-lg">
            📞 (+84) 0902-123-456
          </div>
          <div className="flex justify-center gap-4 p-4 bg-[#282828] rounded-lg">
            ✉️ support@gymfitness.com
          </div>
          <div className="flex justify-center gap-4 p-4 bg-[#282828] rounded-lg">
            📍 123 Fitness St, City
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-[#282828] text-center">
        <img
          src="/uploads/gymlogo.png"
          className="w-16 h-16 mx-auto mb-6"
        />
        <p className="text-sm opacity-60">
          © 2025 GYM FITNESS. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
