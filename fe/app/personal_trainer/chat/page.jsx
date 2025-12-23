"use client"

import PTChatWidget from "@/components/common/PTChatWidget"

export default function PTChatPage() {
    return (
        <div className="max-w-4xl mx-auto h-full">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#f0f0f0]">Client Messages</h1>
                <p className="text-[#a0a0a0]">Manage conversations with your clients</p>
            </div>
            <PTChatWidget userRole="pt" isInline={true} />
        </div>
    )
}
