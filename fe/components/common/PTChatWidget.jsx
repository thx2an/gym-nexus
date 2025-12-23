"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Minimize2, Trash2, Users } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { chatApi } from "@/lib/api/chatApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PTChatWidget({ userRole = "member", isInline = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [activeChatId, setActiveChatId] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [showContacts, setShowContacts] = useState(false);
    const messagesEndRef = useRef(null);

    // Initial Fetch on Open
    useEffect(() => {
        if (isOpen || isInline) {
            fetchInitialData();
            // Simple polling for new messages every 5 seconds
            const interval = setInterval(fetchMessages, 5000);
            return () => clearInterval(interval);
        }
    }, [isOpen, activeChatId, isInline]);

    const fetchInitialData = async () => {
        setIsLoading(true);
        try {
            // 1. Get List of Contacts (Sessions)
            const contactsRes = await chatApi.getContacts();
            setContacts(contactsRes.data || []);

            // 2. Determine Active Chat
            let chatIdToFetch = activeChatId;
            if (!chatIdToFetch && contactsRes.data && contactsRes.data.length > 0) {
                chatIdToFetch = contactsRes.data[0].chat_id;
                setActiveChatId(chatIdToFetch);
            }

            // 3. Fetch Messages
            if (chatIdToFetch || userRole === 'member') {
                await fetchMessages(chatIdToFetch);
            }

        } catch (error) {
            console.error("Failed to load chat", error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchMessages = async (chatId = activeChatId) => {
        try {
            const res = await chatApi.getMessages(chatId);
            if (res.success) {
                setMessages(res.messages || []);
                if (res.chat_id) setActiveChatId(res.chat_id);
            }
        } catch (error) {
            console.log("Polling error (harmless)", error);
        }
    }

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen, isInline]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const content = input;
        setInput(""); // Optimistic clear

        setIsLoading(true);
        try {
            await chatApi.sendMessage({
                content,
                chat_id: activeChatId,
            });
            await fetchMessages();
        } catch (err) {
            console.error(err);
            alert("Failed to send message");
        } finally {
            setIsLoading(false);
        }
    };

    const handleContactSelect = (chatId) => {
        setActiveChatId(chatId);
        setShowContacts(false);
    }

    // Render Content Helper
    const renderContent = () => (
        <>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#282828] bg-[#141414]">
                <div className="flex items-center gap-2">
                    {userRole === 'pt' && (
                        <button onClick={() => setShowContacts(!showContacts)} className="p-1 hover:bg-[#282828] rounded">
                            <Users className="w-5 h-5 text-[#f0f0f0]" />
                        </button>
                    )}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-500 to-teal-500 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">PT</span>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-[#f0f0f0]">
                            {userRole === 'member' ? 'Your Personal Trainer' : 'Client Chat'}
                        </h3>
                        <p className="text-[10px] text-[#a0a0a0] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            {activeChatId ? 'Connected' : 'Connecting...'}
                        </p>
                    </div>
                </div>
                {!isInline && (
                    <div className="flex items-center gap-1">
                        <button onClick={() => setIsOpen(false)} className="p-2 text-[#a0a0a0] hover:text-[#f0f0f0] rounded-lg hover:bg-[#282828] transition-colors">
                            <Minimize2 size={18} />
                        </button>
                    </div>
                )}
            </div>

            {/* Contact List (Overlay for PT) */}
            {showContacts && (
                <div className="absolute top-14 left-0 w-full h-full bg-[#141414] z-10 p-4 overflow-y-auto">
                    <h4 className="text-[#f0f0f0] font-bold mb-4">Select Client to Chat</h4>
                    {contacts.map(chat => (
                        <div
                            key={chat.chat_id}
                            onClick={() => handleContactSelect(chat.chat_id)}
                            className={`p-3 rounded-lg mb-2 cursor-pointer border ${activeChatId === chat.chat_id ? 'border-green-500 bg-[#1E1E1E]' : 'border-[#282828] hover:bg-[#282828]'}`}
                        >
                            <p className="text-[#f0f0f0] font-medium">
                                Chat #{chat.chat_id}
                                {chat.member?.user?.full_name ? ` - ${chat.member.user.full_name}` : ''}
                                {chat.support_staff?.full_name ? ` - ${chat.support_staff.full_name}` : ''}
                            </p>
                            <span className="text-xs text-[#a0a0a0]">{new Date(chat.updated_at).toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#282828] scrollbar-track-transparent">
                {messages.length === 0 && !isLoading && (
                    <div className="text-center text-[#606060] text-sm mt-10">
                        <p>No messages yet.</p>
                        <p>Say hello to start the conversation!</p>
                    </div>
                )}

                {messages.map((msg, idx) => {
                    const isMe = msg.sender_role === userRole;
                    return (
                        <div key={idx} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isMe
                                    ? "bg-[#f0f0f0] text-[#141414] rounded-br-none"
                                    : "bg-[#282828] text-[#e0e0e0] rounded-bl-none border border-[#333]"
                                    }`}
                            >
                                <div className="prose prose-invert prose-p:my-1 prose-sm max-w-none">
                                    {msg.content}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 border-t border-[#282828] bg-[#141414]">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full pl-4 pr-12 py-3 bg-[#1E1E1E] text-[#f0f0f0] rounded-xl border border-[#282828] focus:outline-none focus:border-[#404040] placeholder-[#505050] text-sm"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#f0f0f0] text-[#141414] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </form>
        </>
    );

    // Main Render Logic
    const containerClasses = isInline
        ? "w-full h-[calc(100vh-140px)] flex flex-col bg-[#141414] border border-[#282828] rounded-2xl shadow-xl overflow-hidden font-sans"
        : "fixed bottom-6 right-6 z-50 w-[380px] h-[600px] max-h-[80vh] flex flex-col bg-[#141414] border border-[#282828] rounded-2xl shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden font-sans";

    if (isInline) {
        return (
            <div className={containerClasses}>
                {renderContent()}
            </div>
        )
    }

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 p-4 bg-[#f0f0f0] text-[#141414] rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                    title="Chat with Trainer"
                >
                    <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                </button>
            )}

            {isOpen && (
                <div className={containerClasses}>
                    {renderContent()}
                </div>
            )}
        </>
    );
}
