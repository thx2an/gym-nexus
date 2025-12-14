import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Gym Nexus",
  description: "Gym Management System with AI-powered tools",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="
          min-h-screen
          text-[#f0f0f0]
          bg-gradient-to-br
          from-[#0f0c29]
          via-[#1a1a2e]
          to-[#16213e]
        "
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
