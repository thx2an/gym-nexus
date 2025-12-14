"use client"

import { useState, useEffect, useRef } from "react"
import { Send, MessageCircle, User, Bot } from "lucide-react"
import { supportApi } from "@/lib/api/supportApi"

export default function LiveChatPage() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    loadChatHistory()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadChatHistory = async () => {
    try {
      setLoading(true)
      const response = await supportApi.getChatHistory()
      if (response.success) {
        setMessages(response.data)
      }
    } catch (err) {
      console.error("Failed to load chat history", err)
    } finally {
      setLoading(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSend = async (e) => {
    e.preventDefault()

    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      sender: "user",
      message: inputMessage,
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, userMessage])
    setInputMessage("")
    setSending(true)

    try {
      // Simulate sending message
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const botMessage = {
        id: Date.now() + 1,
        sender: "support",
        message: "Thank you for your message! A support agent will respond shortly.",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (err) {
      console.error("Failed to send message", err)
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#282828] border-t-[#f0f0f0] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#a0a0a0]">Loading chat...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">Live Chat Support</h1>
        <p className="text-[#a0a0a0]">Get instant help from our support team</p>
      </div>

      <div
        className="bg-[#282828] border border-[#282828] rounded-lg overflow-hidden flex flex-col"
        style={{ height: "600px" }}
      >
        {/* Chat Header */}
        <div className="bg-[#141414] border-b border-[#000000] p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#282828] rounded-full flex items-center justify-center">
            <MessageCircle className="h-5 w-5 text-[#f0f0f0]" />
          </div>
          <div>
            <h3 className="font-semibold text-[#f0f0f0]">Support Team</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-xs text-[#a0a0a0]">Online</p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-[#606060] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#f0f0f0] mb-2">Start a conversation</h3>
              <p className="text-[#a0a0a0]">Send a message to begin chatting with support</p>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.sender === "support" && (
                    <div className="w-8 h-8 bg-[#141414] rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-[#f0f0f0]" />
                    </div>
                  )}

                  <div
                    className={`max-w-md px-4 py-3 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-[#f0f0f0] text-[#141414]"
                        : "bg-[#141414] border border-[#282828] text-[#f0f0f0]"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-2 ${msg.sender === "user" ? "text-[#606060]" : "text-[#606060]"}`}>
                      {new Date(msg.timestamp).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-8 h-8 bg-[#141414] rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-[#f0f0f0]" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="border-t border-[#000000] p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={sending}
              className="flex-1 px-4 py-3 bg-[#141414] border border-[#282828] rounded-lg text-[#f0f0f0] placeholder-[#606060] focus:outline-none focus:border-[#f0f0f0] transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={sending || !inputMessage.trim()}
              className="px-6 py-3 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
