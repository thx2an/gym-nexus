"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear tokens or auth state here
    localStorage.clear();
    sessionStorage.removeItem("chat_history"); // Clear chat session
    router.push("/auth/login");
  }, [router]);

  return (
    <div className="text-center text-text-strong">
      Logging out...
    </div>
  );
}
