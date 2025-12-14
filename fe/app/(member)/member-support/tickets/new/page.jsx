"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { HeadphonesIcon, Send, AlertCircle } from "lucide-react"
import { supportApi } from "@/lib/api/supportApi"

export default function NewTicketPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    subject: "",
    category: "general",
    priority: "medium",
    description: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.subject.trim() || !formData.description.trim()) {
      setError("Please fill in all required fields")
      return
    }

    try {
      setSubmitting(true)
      setError(null)

      const response = await supportApi.createTicket(formData)

      if (response.success) {
        router.push("/support/tickets")
      } else {
        setError("Failed to create ticket. Please try again.")
      }
    } catch (err) {
      setError("An error occurred while creating the ticket")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">Create Support Ticket</h1>
        <p className="text-[#a0a0a0]">Tell us how we can help you</p>
      </div>

      <div className="bg-[#282828] border border-[#282828] rounded-lg p-8">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#000000]">
          <div className="w-12 h-12 bg-[#141414] rounded-full flex items-center justify-center">
            <HeadphonesIcon className="h-6 w-6 text-[#f0f0f0]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#f0f0f0]">Need Help?</h3>
            <p className="text-sm text-[#a0a0a0]">We'll get back to you as soon as possible</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#f0f0f0] mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Brief description of your issue"
              className="w-full px-4 py-3 bg-[#141414] border border-[#282828] rounded-lg text-[#f0f0f0] placeholder-[#606060] focus:outline-none focus:border-[#f0f0f0] transition-colors"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[#f0f0f0] mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-[#141414] border border-[#282828] rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#f0f0f0] transition-colors"
              >
                <option value="general">General Inquiry</option>
                <option value="membership">Membership</option>
                <option value="billing">Billing</option>
                <option value="technical">Technical Issue</option>
                <option value="training">Training</option>
                <option value="facility">Facility</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#f0f0f0] mb-2">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-3 bg-[#141414] border border-[#282828] rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#f0f0f0] transition-colors"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#f0f0f0] mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Please provide as much detail as possible..."
              rows={8}
              className="w-full px-4 py-3 bg-[#141414] border border-[#282828] rounded-lg text-[#f0f0f0] placeholder-[#606060] focus:outline-none focus:border-[#f0f0f0] transition-colors resize-none"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-4 pt-6 border-t border-[#000000]">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 bg-[#282828] hover:bg-[#333333] text-[#f0f0f0] rounded-lg font-medium border border-[#282828] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-6 py-3 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
              {submitting ? "Submitting..." : "Submit Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
