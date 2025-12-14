<<<<<<< HEAD
"use client";
=======
import "./globals.css";
import Providers from "./providers";
import ProtectedRoute from "@/components/common/ProtectedRoute";
>>>>>>> origin/main

import React from 'react';
import Navbar from '@/components/common/Navbar';
import localFont from 'next/font/local';
import './globals.css';

const obised = localFont({
  src: '../public/fonts/Obised.ttf',
  display: 'swap',
  variable: '--font-obised',
});

export default function MemberLayout({ children }) {
  return (
<<<<<<< HEAD
    <html lang="en" className={`${obised.variable}`}>
      <body className="bg-base-primaryBg text-text-strong font-obised">
        {children}
=======
    <html lang="en">
      <body className="bg-base-primarySurface text-text-strong">
        <Providers>
          <ProtectedRoute>
            {children}
          </ProtectedRoute>
        </Providers>
>>>>>>> origin/main
      </body>
    </html>
  );
}
