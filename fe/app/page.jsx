"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Updated Features with specific images and text
  const features = [
    {
      title: "Expert Trainers",
      desc: "Work with certified personal trainers who tailor workouts to your goals and fitness level. Get proper guidance on technique, progression, and motivation every session.",
      image: "/images/gym-staff.jpg",
      filename: "gym-staff"
    },
    {
      title: "Staff",
      desc: "Our friendly staff is always ready to support you—from check-in to equipment guidance. We keep the space clean, organized, and help you feel comfortable every time you train.",
      image: "/images/gym-pt.jpg",
      filename: "gym-pt"
    },
    {
      title: "AI Fitness",
      desc: "Use our AI-powered tools to help you build your best body—smarter training plans, form feedback, and personalized guidance. Track your progress, spot risks early, and improve safely with data-driven insights.",
      image: "/images/gym-pose.jpg",
      filename: "gym-pose"
    },
    {
      title: "High Qualify",
      desc: "Enjoy premium equipment, clean facilities, and well-designed programs for all levels. Train in a professional environment built for consistent results.",
      image: "/images/gym-equipment.jpg",
      filename: "gym-equipment"
    },
  ];

  return (
    <div className="min-h-screen bg-base-primaryBg text-text-strong font-obised">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-base-secondarySurface/90 border-b border-borderColor-dark backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">

          {/* LOGO (BIGGER) */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-new.png"
              width={60}
              height={60}
              alt="Gym Logo"
              className="rounded-lg"
            />
            <span className="text-2xl font-bold text-text-strong font-obised">
              GYM NEXUS
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-text-strong font-medium">
            <a href="#home" className="hover:text-text-medium transition">Home</a>
            <a href="#features" className="hover:text-text-medium transition">Why Choose Us</a>
            <a href="#contact" className="hover:text-text-medium transition">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-text-strong"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-base-secondarySurface border-t border-borderColor-dark px-4 py-4 space-y-3 text-text-strong">
            <a href="#home" className="block hover:text-text-medium">Home</a>
            <a href="#features" className="block hover:text-text-medium">Why Choose Us</a>
            <a href="#contact" className="block hover:text-text-medium">Contact</a>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gym-background.jpg"
            alt="Gym Background"
            fill
            className="object-cover opacity-40" // Adjust opacity for readability
            priority
          />
          <div className="absolute inset-0 bg-base-primaryBg/50 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight text-text-strong tracking-wide drop-shadow-lg">
            Welcome to <span className="text-text-strong">GYM NEXUS</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-strong/90 mb-10 max-w-2xl mx-auto drop-shadow-md">
            Smarter training with expert PTs, AI fitness analytics, and powerful tools.
          </p>

          <Link
            href="/auth/login"
            className="bg-text-strong text-base-primaryBg px-10 py-4 rounded-none font-bold text-lg hover:bg-text-medium transition inline-block uppercase tracking-widest"
          >
            Login now
          </Link>
        </div>
      </section>

      {/* FEATURES / WHY CHOOSE US - 4 CARDS */}
      <section id="features" className="py-24 px-4 bg-base-primaryBg">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-text-strong uppercase tracking-wide">Why Choose Us</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-base-primarySurface border border-borderColor-light hover:border-text-strong/50 transition duration-300 flex flex-col">
                {/* Image on Top */}
                <div className="h-64 relative w-full overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Text on Bottom */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-text-strong mb-4 uppercase">{feature.title}</h3>
                  <p className="text-text-medium text-sm leading-relaxed mb-4 flex-1">
                    {feature.desc}
                  </p>
                  <p className="text-xs text-text-subtle mt-auto font-mono">
                    {feature.filename}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-4 bg-base-primarySurface border-y border-borderColor-light">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-text-strong uppercase">
            Ready to Begin?
          </h2>
          <p className="text-text-medium mb-10 text-lg">
            Start your fitness journey with personalized workout tools & PT support.
          </p>

          <Link
            href="/auth/register"
            className="bg-text-strong text-base-primaryBg px-12 py-5 rounded-none font-bold text-xl hover:bg-text-medium transition inline-flex items-center justify-center gap-2 uppercase tracking-widest"
          >
            Sign Up Now <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="bg-base-primaryBg py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-text-strong mb-8 uppercase">Contact Us</h2>
          <p className="text-text-medium mb-10">
            We&apos;re always ready to assist you.
          </p>

          <div className="space-y-6 text-lg text-text-strong max-w-md mx-auto">

            {/* PHONE */}
            <p className="flex justify-center items-center gap-4 border-b border-borderColor-light pb-4">
              <span className="font-bold text-text-medium">PHONE</span>
              <span>(+84) 0902-123-456</span>
            </p>

            {/* ZALO */}
            <p className="flex justify-center items-center gap-4 border-b border-borderColor-light pb-4">
              <span className="font-bold text-text-medium">ZALO</span>
              <span>0902-123-456</span>
            </p>

            {/* FACEBOOK */}
            <p className="flex justify-center items-center gap-4 border-b border-borderColor-light pb-4">
              <span className="font-bold text-text-medium">FB</span>
              <a href="#" className="hover:text-white underline">facebook.com/GymNexus</a>
            </p>

            {/* EMAIL */}
            <p className="flex justify-center items-center gap-4 pb-4">
              <span className="font-bold text-text-medium">EMAIL</span>
              <span>support@gymnexus.com</span>
            </p>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-base-secondarySurface py-12 border-t border-borderColor-dark">
        <div className="max-w-6xl mx-auto text-center text-text-medium">

          <div className="flex justify-center mb-6">
            <Image
              src="/images/logo-new.png"
              width={80}
              height={80}
              alt="Gym Logo"
              className="rounded-lg opacity-80"
            />
          </div>

          <p className="text-sm tracking-wider">&copy; 2025 GYM NEXUS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
