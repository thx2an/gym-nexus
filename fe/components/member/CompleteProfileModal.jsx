"use client"

import { useState } from "react"
import { Ruler, Weight, Target, FileText, CheckCircle } from "lucide-react"
import authApi from "@/lib/api/authApi"

const HEIGHT_MIN_CM = 100
const HEIGHT_MAX_CM = 250
const WEIGHT_MIN_KG = 30
const WEIGHT_MAX_KG = 300

export default function CompleteProfileModal({ onComplete }) {
    const [formData, setFormData] = useState({
        current_height: "",
        current_weight: "",
        fitness_goal: "",
        medical_history: "",
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        setFieldErrors((prev) => {
            if (!prev[field]) return prev
            const next = { ...prev }
            delete next[field]
            return next
        })
    }

    const validate = () => {
        const newErrors = {}
        const height = Number(formData.current_height)
        const weight = Number(formData.current_weight)

        if (formData.current_height === "") {
            newErrors.current_height = "Height is required."
        } else if (Number.isNaN(height)) {
            newErrors.current_height = "Height must be a number."
        } else if (height < HEIGHT_MIN_CM || height > HEIGHT_MAX_CM) {
            newErrors.current_height = `Height must be between ${HEIGHT_MIN_CM} and ${HEIGHT_MAX_CM} cm.`
        }

        if (formData.current_weight === "") {
            newErrors.current_weight = "Weight is required."
        } else if (Number.isNaN(weight)) {
            newErrors.current_weight = "Weight must be a number."
        } else if (weight < WEIGHT_MIN_KG || weight > WEIGHT_MAX_KG) {
            newErrors.current_weight = `Weight must be between ${WEIGHT_MIN_KG} and ${WEIGHT_MAX_KG} kg.`
        }

        if (!formData.fitness_goal) {
            newErrors.fitness_goal = "Fitness goal is required."
        }

        setFieldErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        if (!validate()) return
        setLoading(true)

        try {
            await authApi.createMemberProfile(formData)
            if (onComplete) onComplete()
        } catch (err) {
            console.error(err)
            const serverErrors = err?.errors
            if (serverErrors) {
                const normalizedErrors = Object.fromEntries(
                    Object.entries(serverErrors).map(([key, value]) => [
                        key,
                        Array.isArray(value) ? value[0] : value,
                    ])
                )
                setFieldErrors(normalizedErrors)
                setError("")
            } else {
                setError(err?.message || "Failed to save profile. Please check inputs.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-[#141414] border border-[#282828] rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-6 border-b border-[#282828] bg-[#1a1a1a]">
                    <h2 className="text-2xl font-bold text-[#f0f0f0]">Welcome to Gym Nexus!</h2>
                    <p className="text-[#a0a0a0] mt-1">First, tell us a bit about yourself to get started.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate className="p-6 space-y-5">
                    {error && (
                        <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#f0f0f0] mb-2">Height (cm)</label>
                            <div className="relative">
                                <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#606060]" />
                                <input
                                    type="number"
                                    required
                                    min={HEIGHT_MIN_CM}
                                    max={HEIGHT_MAX_CM}
                                    step="1"
                                    placeholder="175"
                                    value={formData.current_height}
                                    onChange={(e) => updateField("current_height", e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-[#1F1F1F] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#f0f0f0]"
                                />
                            </div>
                            {fieldErrors.current_height && (
                                <p className="text-red-400 text-xs mt-1">{fieldErrors.current_height}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#f0f0f0] mb-2">Weight (kg)</label>
                            <div className="relative">
                                <Weight className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#606060]" />
                                <input
                                    type="number"
                                    required
                                    min={WEIGHT_MIN_KG}
                                    max={WEIGHT_MAX_KG}
                                    step="1"
                                    placeholder="70"
                                    value={formData.current_weight}
                                    onChange={(e) => updateField("current_weight", e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-[#1F1F1F] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#f0f0f0]"
                                />
                            </div>
                            {fieldErrors.current_weight && (
                                <p className="text-red-400 text-xs mt-1">{fieldErrors.current_weight}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#f0f0f0] mb-2">Fitness Goal</label>
                        <div className="relative">
                            <Target className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#606060]" />
                            <select
                                required
                                value={formData.fitness_goal}
                                onChange={(e) => updateField("fitness_goal", e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-[#1F1F1F] border border-[#333] rounded-lg text-white appearance-none focus:outline-none focus:border-[#f0f0f0]"
                            >
                                <option value="">Select a goal...</option>
                                <option value="lose_weight">Lose Weight</option>
                                <option value="gain_muscle">Gain Muscle</option>
                                <option value="improve_endurance">Improve Endurance</option>
                                <option value="maintain">Maintain Fitness</option>
                            </select>
                        </div>
                        {fieldErrors.fitness_goal && (
                            <p className="text-red-400 text-xs mt-1">{fieldErrors.fitness_goal}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#f0f0f0] mb-2">Medical History (Optional)</label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-3 h-4 w-4 text-[#606060]" />
                            <textarea
                                rows="3"
                                placeholder="Any injuries or conditions we should know about?"
                                value={formData.medical_history}
                                onChange={(e) => updateField("medical_history", e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-[#1F1F1F] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#f0f0f0] resize-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] font-bold rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                        {loading ? "Saving..." : "Start My Journey"}
                        {!loading && <CheckCircle className="h-5 w-5" />}
                    </button>
                </form>
            </div>
        </div>
    )
}
