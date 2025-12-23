"use client"

import PTChatWidget from "@/components/common/PTChatWidget"

export default function MemberChatPage() {
    return (
        <div className="max-w-4xl mx-auto h-full">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#f0f0f0]">Chat with Trainer</h1>
                <p className="text-[#a0a0a0]">Real-time support from your personal trainer</p>
            </div>
            <PTChatWidget userRole="member" isInline={true} />
        </div>
    )
}
