import React from 'react';
import localFont from 'next/font/local';
import './globals.css';
import Providers from './providers';

const obised = localFont({
  src: '../public/fonts/Obised.ttf',
  display: 'swap',
  variable: '--font-obised',
});

export const metadata = {
  title: 'Gym Nexus',
  description: 'Premium Gym Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${obised.variable}`}>
      <body className="bg-base-primaryBg text-text-strong font-obised">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
