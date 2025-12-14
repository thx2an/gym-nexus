"use client";

import React from "react";
import { TrendingUp } from "lucide-react";

export default function MemberProgressPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
            <div className="bg-[#282828] p-6 rounded-full mb-6">
                <TrendingUp className="w-12 h-12 text-[#f0f0f0]" />
            </div>
            <h1 className="text-3xl font-bold text-[#f0f0f0] mb-3">Member Progress</h1>
            <p className="text-[#a0a0a0] max-w-md">
                Tracking member progress is coming soon.
            </p>
        </div>
    );
}
