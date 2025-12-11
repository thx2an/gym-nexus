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
    { icon: Users, title: "Expert Trainers", desc: "Professional PTs to guide your journey" },
    { icon: Clock, title: "Flexible Training", desc: "Book sessions anytime" },
    { icon: Zap, title: "AI Fitness", desc: "Virtual trainer & risk analysis" },
    { icon: Award, title: "High Quality", desc: "Premium facilities & programs" },
  ];

  return (
    <div className="min-h-screen bg-base-inverted text-text-strong">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-base-inverted/90 border-b border-borderColor-dark backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">

          {/* LOGO (BIGGER) */}
          <div className="flex items-center gap-3">
            <Image
              src="/uploads/gymlogo.png"
              width={70}
              height={70}
              alt="Gym Logo"
              className="rounded-lg"
            />
            <span className="text-3xl font-bold text-primarySurface">
              Gym Fitness
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-primarySurface">
            <a href="#home" className="hover:text-accent transition">Home</a>
            <a href="#equipment" className="hover:text-accent transition">Equipment</a>
            <a href="#features" className="hover:text-accent transition">Features</a>
            <a href="#contact" className="hover:text-accent transition">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden text-primarySurface"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-base-inverted border-t border-borderColor-dark px-4 py-4 space-y-3 text-primarySurface">
            <a href="#home" className="block hover:text-accent">Home</a>
            <a href="#equipment" className="block hover:text-accent">Equipment</a>
            <a href="#features" className="block hover:text-accent">Features</a>
            <a href="#contact" className="block hover:text-accent">Contact</a>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-[85vh] flex items-center justify-center px-6 bg-base-inverted">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-primarySurface">
            Welcome to <span className="text-accent">Gym Fitness</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-medium mb-8">
            Smarter training with expert PTs, AI fitness analytics, and powerful tools.
          </p>

          {/* Replace with Login Now button */}
          <Link
            href="/auth/login"
            className="bg-accent hover:bg-btnPrimary-hover text-white px-10 py-4 rounded-lg font-bold text-lg transition inline-block transform hover:scale-105"
          >
            Login now
          </Link>
        </div>
      </section>

      {/* EQUIPMENT */}
      <section id="equipment" className="py-20 px-4 bg-primarySurface">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4 text-text-strong">Equipment</h2>
          <p className="text-text-medium mb-12 max-w-2xl mx-auto">
            Modern, high-quality equipment to support every training style.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipment.map((item, i) => (
              <div key={i} className="bg-bg-subtle border border-borderColor-light hover:border-accent p-6 rounded-lg transition">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-text-strong">{item.name}</h3>
                <p className="text-text-medium text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-4 bg-base-inverted">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-4 text-primarySurface">Why Choose Us</h2>
          <p className="text-text-medium text-center mb-12 max-w-2xl mx-auto">
            Premium facility, AI tools, expert coaching, and flexible training.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="bg-primarySurface border border-borderColor-light hover:border-accent p-6 rounded-lg transition">
                  <Icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-xl font-bold text-text-strong mb-2">{feature.title}</h3>
                  <p className="text-text-medium">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-4 bg-secondary border-y border-borderColor-light">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-text-strong">
            Ready to Begin?
          </h2>
          <p className="text-text-medium mb-8">
            Start your fitness journey with personalized workout tools & PT support.
          </p>

          <Link
            href="/auth/register"
            className="bg-accent hover:bg-btnPrimary-hover text-white px-10 py-4 rounded-lg font-bold text-lg transition inline-flex items-center justify-center gap-2 transform hover:scale-105"
          >
            Sign Up Now <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* CONTACT SECTION with icons */}
      <section id="contact" className="bg-primarySurface py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-text-strong mb-6">Contact Us</h2>
          <p className="text-text-medium mb-8">
            We're always ready to assist you.
          </p>

          <div className="space-y-4 text-lg text-text-strong max-w-md mx-auto">

            {/* PHONE */}
            <p className="flex justify-center items-center gap-3">
              <Image src="/icons/phoneicon.png" width={28} height={28} alt="Phone"/>
              <span>(+84) 0902-123-456</span>
            </p>

            {/* ZALO */}
            <p className="flex justify-center items-center gap-3">
              <Image src="/icons/zaloicon.png" width={28} height={28} alt="Zalo"/>
              <span>0902-123-456</span>
            </p>

            {/* FACEBOOK */}
            <p className="flex justify-center items-center gap-3">
              <Image src="/icons/facebookicon.png" width={28} height={28} alt="Facebook"/>
              <a href="#" className="text-accent underline">facebook.com/GymFitness</a>
            </p>

            {/* EMAIL */}
            <p className="flex justify-center items-center gap-3">
              <Image src="/icons/emailicon.png" width={28} height={28} alt="Email"/>
              <span>support@gymfitness.com</span>
            </p>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-base-inverted py-12 border-t border-borderColor-dark">
        <div className="max-w-6xl mx-auto text-center text-text-medium">

          <div className="flex justify-center mb-4">
            <Image 
              src="/uploads/gymlogo.png"
              width={80}
              height={80}
              alt="Gym Logo"
              className="rounded-lg"
            />
          </div>

          <p className="text-sm">&copy; 2025 Gym Fitness. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
