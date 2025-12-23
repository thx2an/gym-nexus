"use client"

import { useState, useEffect } from "react"
import { User, Phone, Calendar, Mail, Edit2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import authApi from "@/lib/api/authApi"

export default function PTProfilePage() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        try {
            const res = await authApi.getProfile()
            setUser(res)
        } catch (error) {
            console.error("Failed to load profile", error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <div className="p-12 text-[#f0f0f0]">Loading...</div>
    if (!user) return <div className="p-12 text-[#f0f0f0]">Failed to load profile.</div>

    const initials = user.full_name ? user.full_name.charAt(0).toUpperCase() : "T"

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8 flex items-center gap-4">
                <Link href="/personal_trainer/dashboard" className="p-2 hover:bg-[#282828] rounded-full transition-colors text-[#a0a0a0] hover:text-[#f0f0f0]">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">My Profile</h1>
                    <p className="text-[#a0a0a0]">View your personal information</p>
                </div>
            </div>

            <div className="bg-[#1E1E1E] border border-[#282828] rounded-lg overflow-hidden">
                {/* Header / Avatar */}
                <div className="p-8 border-b border-[#282828] flex flex-col items-center md:flex-row md:items-start md:gap-8">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#282828] bg-[#141414] flex items-center justify-center">
                        <span className="text-4xl font-bold text-[#f0f0f0]">{initials}</span>
                    </div>
                    <div className="mt-4 md:mt-2 text-center md:text-left flex-1">
                        <h2 className="text-2xl font-bold text-[#f0f0f0]">{user.full_name}</h2>
                        <p className="text-[#a0a0a0]">{user.email}</p>
                        <div className="mt-4">
                            <span className="inline-block px-3 py-1 bg-[#282828] text-[#f0f0f0] text-sm rounded-full font-medium">
                                Personal Trainer
                            </span>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-[#a0a0a0] mb-1 uppercase tracking-wider">
                            <User size={14} /> Full Name
                        </label>
                        <p className="text-lg text-[#f0f0f0]">{user.full_name}</p>
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-[#a0a0a0] mb-1 uppercase tracking-wider">
                            <Mail size={14} /> Email
                        </label>
                        <p className="text-lg text-[#f0f0f0]">{user.email}</p>
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-[#a0a0a0] mb-1 uppercase tracking-wider">
                            <Phone size={14} /> Phone
                        </label>
                        <p className="text-lg text-[#f0f0f0]">{user.phone}</p>
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-[#a0a0a0] mb-1 uppercase tracking-wider">
                            <User size={14} /> Gender
                        </label>
                        <p className="text-lg text-[#f0f0f0]">{user.gender || 'Not set'}</p>
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-[#a0a0a0] mb-1 uppercase tracking-wider">
                            <Calendar size={14} /> Date of Birth
                        </label>
                        <p className="text-lg text-[#f0f0f0]">{user.date_of_birth || 'Not set'}</p>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="p-8 border-t border-[#282828] flex justify-end">
                    <Link
                        href="/personal_trainer/profile/edit"
                        className="flex items-center gap-2 px-6 py-3 bg-[#f0f0f0] hover:bg-white text-[#141414] rounded-lg font-bold transition-all shadow-lg hover:shadow-xl"
                    >
                        <Edit2 size={18} />
                        Edit Profile
                    </Link>
                </div>

            </div>
        </div>
    )
}
