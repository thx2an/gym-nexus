"use client";

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
    <html lang="en" className={`${obised.variable}`}>
      <body className="bg-base-primaryBg text-text-strong font-obised">
        {children}
      </body>
    </html>
  );
}
