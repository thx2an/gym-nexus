"use client"

import { useState } from "react"
import { Award, FileText, Clock, CheckCircle } from "lucide-react"
import authApi from "@/lib/api/authApi"

export default function PTCompleteProfileModal({ onComplete }) {
    const [formData, setFormData] = useState({
        specialization: "",
        bio: "",
        experience_years: "",
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            await authApi.createPTProfile(formData)
            if (onComplete) onComplete()
        } catch (err) {
            console.error(err)
            setError("Failed to save profile. Please check inputs.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-[#141414] border border-[#282828] rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-6 border-b border-[#282828] bg-[#1a1a1a]">
                    <h2 className="text-2xl font-bold text-[#f0f0f0]">Trainer Profile Setup</h2>
                    <p className="text-[#a0a0a0] mt-1">Complete your professional profile to start accepting clients.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {error && (
                        <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-[#f0f0f0] mb-2">Specialization</label>
                        <div className="relative">
                            <Award className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#606060]" />
                            <input
                                type="text"
                                required
                                placeholder="e.g. Weight Loss, Bodybuilding, Yoga"
                                value={formData.specialization}
                                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                className="w-full pl-10 pr-4 py-2.5 bg-[#1F1F1F] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#f0f0f0]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#f0f0f0] mb-2">Experience (Years)</label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#606060]" />
                            <input
                                type="number"
                                required
                                min="0"
                                max="50"
                                placeholder="e.g. 5"
                                value={formData.experience_years}
                                onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                                className="w-full pl-10 pr-4 py-2.5 bg-[#1F1F1F] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#f0f0f0]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#f0f0f0] mb-2">Bio / Introduction</label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-3 h-4 w-4 text-[#606060]" />
                            <textarea
                                rows="4"
                                required
                                placeholder="Tell clients about your training style and philosophy..."
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                className="w-full pl-10 pr-4 py-2.5 bg-[#1F1F1F] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#f0f0f0] resize-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] font-bold rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                        {loading ? "Saving..." : "Complete Setup"}
                        {!loading && <CheckCircle className="h-5 w-5" />}
                    </button>
                </form>
            </div>
        </div>
    )
}
