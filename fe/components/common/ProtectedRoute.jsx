"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import authApi from "@/lib/api/authApi";
import LoadingSpinner from "./LoadingSpinner";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Define public paths that don't need auth
      const publicPaths = ["/auth/login", "/auth/register", "/auth/forgot-password", "/", "/_next"];

      // If current path is public, skip check
      if (publicPaths.some(p => pathname.startsWith(p)) && pathname !== "/dashboard") {
        setLoading(false);
        setIsAuthenticated(true);
        return;
      }

      const token = localStorage.getItem("auth_token") || localStorage.getItem("token");

      if (!token) {
        router.push("/auth/login");
        return;
      }

      try {
        const res = await authApi.checkToken(token);

        if (res.data.status) {
          const role = res.data.user.id_chuc_vu;
          const path = pathname;

          // Checking Database Seeder: 1=Admin, 2=Staff, 3=PT, 4=Member
          const isAdmin = role === 1;
          const isStaff = role === 2;
          const isPT = role === 3;
          const isMember = role === 4;

          if (isAdmin) {
            if (path.startsWith("/manager")) {
              setIsAuthenticated(true);
            } else {
              router.push("/manager/dashboard");
            }
          } else if (isStaff) {
            if (path.startsWith("/support")) {
              setIsAuthenticated(true);
            } else {
              router.push("/support/dashboard");
            }
          } else if (isPT) {
            if (path.startsWith("/personal_trainer")) {
              setIsAuthenticated(true);
            } else {
              router.push("/personal-trainer/dashboard");
            }
          } else if (isMember) {
            if (!path.startsWith("/manager") && !path.startsWith("/support") && !path.startsWith("/personal_trainer")) {
              setIsAuthenticated(true);
            } else {
              router.push("/dashboard");
            }
          } else {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("auth_user");
            router.push("/auth/login");
          }
        } else {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
          router.push("/auth/login");
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-base-primarySurface">
        <p className="text-text-strong animate-pulse">Checking authentication...</p>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}
