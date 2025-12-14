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
    { name: "Cardio Equipment", icon: "🏃", desc: "Treadmills, ellipticals, rowing machines" },
    { name: "Weight Training", icon: "🏋️", desc: "Dumbbells, barbells, squat racks" },
    { name: "Strength Machines", icon: "⚙️", desc: "Chest press, leg press, cable machines" },
    { name: "Flexibility & Core", icon: "🧘", desc: "Yoga mats, foam rollers, TRX systems" },
  ];

  const features = [
    { icon: "👥", title: "Expert Trainers", desc: "Professional PTs to guide your journey" },
    { icon: "⏱️", title: "Flexible Training", desc: "Book sessions anytime" },
    { icon: "⚡", title: "AI Fitness", desc: "Virtual trainer & risk analysis" },
    { icon: "🏆", title: "High Quality", desc: "Premium facilities & programs" },
  ];

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Obised', sans-serif", backgroundColor: "#000014", color: "#f0f0f0" }}>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: "rgba(0, 0, 20, 0.95)", borderColor: "#282828" }}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
          {/* LOGO */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden transition transform hover:scale-110" style={{ backgroundColor: "#f0f0f0", boxShadow: "0 0 20px rgba(240, 240, 240, 0.4)" }}>
              <img src="/uploads/gymlogo.png" alt="Gym Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-3xl font-black" style={{ color: "#f0f0f0", letterSpacing: "0.05em", textShadow: "0 0 20px rgba(240, 240, 240, 0.3)" }}>
              GYM FITNESS
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-10 text-lg">
            <a href="#home" className="transition hover:opacity-70" style={{ color: "#f0f0f0" }}>Home</a>
            <a href="#equipment" className="transition hover:opacity-70" style={{ color: "#f0f0f0" }}>Equipment</a>
            <a href="#features" className="transition hover:opacity-70" style={{ color: "#f0f0f0" }}>Features</a>
            <a href="#contact" className="transition hover:opacity-70" style={{ color: "#f0f0f0" }}>Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden text-2xl transition"
            style={{ color: "#f0f0f0" }}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t" style={{ backgroundColor: "#141414", borderColor: "#282828" }}>
            <div className="px-6 py-6 space-y-4 text-lg">
              <a href="#home" className="block transition hover:opacity-70" style={{ color: "#f0f0f0" }}>Home</a>
              <a href="#equipment" className="block transition hover:opacity-70" style={{ color: "#f0f0f0" }}>Equipment</a>
              <a href="#features" className="block transition hover:opacity-70" style={{ color: "#f0f0f0" }}>Features</a>
              <a href="#contact" className="block transition hover:opacity-70" style={{ color: "#f0f0f0" }}>Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -left-40 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: "#f0f0f0" }}></div>
          <div className="absolute bottom-20 -right-40 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: "#f0f0f0" }}></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight" style={{ color: "#f0f0f0", letterSpacing: "-0.02em" }}>
            ELEVATE YOUR <span style={{ color: "#f0f0f0", textShadow: "0 0 30px rgba(240, 240, 240, 0.5)" }}>FITNESS</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 leading-relaxed" style={{ color: "#f0f0f0", opacity: 0.9 }}>
            Transform your body and mind with cutting-edge equipment, expert coaching, and AI-powered fitness analytics.
          </p>

          <a
            href="/auth/login"
            className="inline-block px-12 py-5 rounded-xl font-bold text-lg transition transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: "#f0f0f0", color: "#000014", letterSpacing: "0.05em" }}
          >
            LOGIN NOW
          </a>
        </div>
      </section>

      {/* EQUIPMENT SECTION */}
      <section id="equipment" className="py-24 px-6" style={{ backgroundColor: "#141414" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-4" style={{ color: "#f0f0f0", letterSpacing: "-0.02em" }}>
              PREMIUM EQUIPMENT
            </h2>
            <p className="text-lg" style={{ color: "#f0f0f0", opacity: 0.8 }}>
              State-of-the-art facilities designed for every fitness level
            </p>
          </div>

          <div className="space-y-12">
            {equipment.map((item, i) => {
              const images = [
                "/images/cardioequipment.jpg",
                "/images/weighttraining.jpg",
                "/images/strengthmachines.jpg",
                "/images/flexibilitycore.jpg"
              ];
              const isEven = i % 2 === 0;
              
              return (
                <div 
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
                >
                  {isEven ? (
                    <>
                      {/* Image on left */}
                      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#282828" }}>
                        <img 
                          src={images[i]} 
                          alt={item.name}
                          className="w-full h-80 object-cover"
                        />
                      </div>
                      {/* Content on right */}
                      <div className="p-8">
                        <h3 className="text-3xl md:text-4xl font-black mb-4" style={{ color: "#f0f0f0", letterSpacing: "-0.01em" }}>{item.name}</h3>
                        <p className="text-lg" style={{ color: "#f0f0f0", opacity: 0.8 }}>{item.desc}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Content on left */}
                      <div className="p-8 order-2 md:order-1">
                        <h3 className="text-3xl md:text-4xl font-black mb-4" style={{ color: "#f0f0f0", letterSpacing: "-0.01em" }}>{item.name}</h3>
                        <p className="text-lg" style={{ color: "#f0f0f0", opacity: 0.8 }}>{item.desc}</p>
                      </div>
                      {/* Image on right */}
                      <div className="rounded-2xl overflow-hidden order-1 md:order-2" style={{ backgroundColor: "#282828" }}>
                        <img 
                          src={images[i]} 
                          alt={item.name}
                          className="w-full h-80 object-cover"
                        />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 px-6" style={{ backgroundColor: "#000014" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-4" style={{ color: "#f0f0f0", letterSpacing: "-0.02em" }}>
              WHY CHOOSE US
            </h2>
            <p className="text-lg" style={{ color: "#f0f0f0", opacity: 0.8 }}>
              Everything you need to achieve your fitness goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="p-8 rounded-xl border transition transform hover:scale-105"
                style={{ backgroundColor: "#141414", borderColor: "#282828" }}
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: "#f0f0f0", letterSpacing: "0.02em" }}>{feature.title}</h3>
                <p className="text-sm" style={{ color: "#f0f0f0", opacity: 0.7 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: "#282828" }}></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 opacity-5 blur-3xl rounded-full" style={{ backgroundColor: "#f0f0f0" }}></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 opacity-5 blur-3xl rounded-full" style={{ backgroundColor: "#f0f0f0" }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8" style={{ color: "#f0f0f0", letterSpacing: "-0.02em" }}>
            READY TO TRANSFORM?
          </h2>
          <p className="text-lg mb-10" style={{ color: "#f0f0f0", opacity: 0.9 }}>
            Join thousands of members already achieving their fitness goals
          </p>

          <a
            href="/auth/register"
            className="inline-flex items-center gap-3 px-12 py-5 rounded-xl font-bold text-lg transition transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: "#f0f0f0", color: "#000014", letterSpacing: "0.05em" }}
          >
            SIGN UP NOW →
          </a>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 px-6" style={{ backgroundColor: "#141414" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-16" style={{ color: "#f0f0f0", letterSpacing: "-0.02em" }}>
            GET IN TOUCH
          </h2>

          <div className="space-y-6 max-w-md mx-auto">
            {/* PHONE */}
            <div className="flex items-center justify-center gap-4 p-4 rounded-lg" style={{ backgroundColor: "#282828" }}>
              <span className="text-2xl">📞</span>
              <span className="text-lg" style={{ color: "#f0f0f0" }}>(+84) 0902-123-456</span>
            </div>

            {/* EMAIL */}
            <div className="flex items-center justify-center gap-4 p-4 rounded-lg" style={{ backgroundColor: "#282828" }}>
              <span className="text-2xl">✉️</span>
              <span className="text-lg" style={{ color: "#f0f0f0" }}>support@gymfitness.com</span>
            </div>

            {/* LOCATION */}
            <div className="flex items-center justify-center gap-4 p-4 rounded-lg" style={{ backgroundColor: "#282828" }}>
              <span className="text-2xl">📍</span>
              <span className="text-lg" style={{ color: "#f0f0f0" }}>123 Fitness St, City</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t" style={{ backgroundColor: "#000014", borderColor: "#282828" }}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-lg overflow-hidden" style={{ backgroundColor: "#141414" }}>
              <img src="/uploads/gymlogo.png" alt="Gym Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          <p className="text-sm" style={{ color: "#f0f0f0", opacity: 0.6 }}>
            &copy; 2025 GYM FITNESS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 