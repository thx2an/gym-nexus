import "./globals.css";
import Providers from "./providers";
import ProtectedRoute from "@/components/common/ProtectedRoute";

export const metadata = {
  title: "Gym Nexus",
  description: "Gym Management System with AI-powered tools"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-base-primarySurface text-text-strong">
        <Providers>
          <ProtectedRoute>
            {children}
          </ProtectedRoute>
        </Providers>
      </body>
    </html>
  );
}
