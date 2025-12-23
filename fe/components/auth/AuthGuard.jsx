"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children, allowedRoles = [] }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // 1. Get user from localStorage
        const userStr = localStorage.getItem("auth_user");
        const token = localStorage.getItem("auth_token");

        if (!token || !userStr) {
            router.replace("/auth/login");
            return;
        }

        try {
            const user = JSON.parse(userStr);
            const userRole = Number(user.idChucVu);

            // 2. Check Role
            // allowedRoles example: [4] for Member, [3] for PT, [1, 2] for Manager/Staff
            if (allowedRoles.includes(userRole)) {
                setAuthorized(true);
            } else {
                // Unauthorized role -> Redirect to Login (or 403 page)
                // User requested: "return to login immediately"
                router.replace("/auth/login");
            }
        } catch (error) {
            console.error("AuthGuard Error:", error);
            router.replace("/auth/login");
        }
    }, [router, allowedRoles]);

    if (!authorized) {
        return null; // Or a loading spinner
    }

    return <>{children}</>;
}
