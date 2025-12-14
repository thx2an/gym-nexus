"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Minimize2, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // 1. Load session from storage on mount
    useEffect(() => {
        const saved = sessionStorage.getItem("chat_history");
        if (saved) {
            try {
                setMessages(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse chat history", e);
            }
        } else {
            // Initial welcome message
            const welcomeMsg = { role: "assistant", content: "Hello! I'm NexusBot. How can I help you with your fitness journey today?" };
            setMessages([welcomeMsg]);
            sessionStorage.setItem("chat_history", JSON.stringify([welcomeMsg]));
        }
    }, []);

    // 2. Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    // 3. Save to storage on change
    useEffect(() => {
        if (messages.length > 0) {
            sessionStorage.setItem("chat_history", JSON.stringify(messages));
        }
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = { role: "user", content: input };
        const newHistory = [...messages, userMsg];
        setMessages(newHistory);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: newHistory }),
            });

            if (!res.ok) throw new Error("API Error");

            const data = await res.json();
            const botMsg = { role: "assistant", content: data.reply };

            setMessages((prev) => [...prev, botMsg]);
        } catch (err) {
            console.error(err);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Sorry, I'm having trouble connecting to the server. Please try again later." }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        const welcomeMsg = { role: "assistant", content: "Chat cleared. How can I help you?" };
        setMessages([welcomeMsg]);
        sessionStorage.setItem("chat_history", JSON.stringify([welcomeMsg]));
    };

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 p-4 bg-white text-black rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                    title="Open AI Assistant"
                >
                    <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] max-h-[80vh] flex flex-col bg-[#141414] border border-[#282828] rounded-2xl shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden">

                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[#282828] bg-[#141414]">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
                                <span className="text-xs font-bold text-white">AI</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-[#f0f0f0]">NexusBot</h3>
                                <p className="text-[10px] text-[#a0a0a0] flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button onClick={clearChat} className="p-2 text-[#a0a0a0] hover:text-red-400 rounded-lg hover:bg-[#282828] transition-colors" title="Clear History">
                                <Trash2 size={16} />
                            </button>
                            <button onClick={() => setIsOpen(false)} className="p-2 text-[#a0a0a0] hover:text-[#f0f0f0] rounded-lg hover:bg-[#282828] transition-colors">
                                <Minimize2 size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#282828] scrollbar-track-transparent">
                        {messages.map((msg, idx) => {
                            const isUser = msg.role === "user";
                            return (
                                <div key={idx} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                                    <div
                                        className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isUser
                                            ? "bg-[#f0f0f0] text-[#141414] rounded-br-none"
                                            : "bg-[#282828] text-[#e0e0e0] rounded-bl-none border border-[#333]"
                                            }`}
                                    >
                                        <div className="prose prose-invert prose-p:my-1 prose-sm max-w-none">
                                            <ReactMarkdown>
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-[#282828] px-4 py-3 rounded-2xl rounded-bl-none border border-[#333] flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-[#606060] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1.5 h-1.5 bg-[#606060] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1.5 h-1.5 bg-[#606060] rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="p-4 border-t border-[#282828] bg-[#141414]">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about workouts..."
                                className="w-full pl-4 pr-12 py-3 bg-[#1E1E1E] text-[#f0f0f0] rounded-xl border border-[#282828] focus:outline-none focus:border-[#404040] placeholder-[#505050] text-sm"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#f0f0f0] text-[#141414] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
                            >
                                <Send size={16} className={isLoading ? "opacity-0" : "opacity-100"} />
                            </button>
                        </div>
                        <div className="mt-2 text-center">
                            <p className="text-[10px] text-[#404040]">
                                Powered by Mistral AI
                            </p>
                        </div>
                    </form>

                </div>
            )}
        </>
    );
}
