"use client"

import { useState, useEffect } from "react"
import { User, Camera, Save, Phone, CheckCircle } from "lucide-react"
import Image from "next/image"
import authApi from "@/lib/api/authApi"
import { useRouter } from "next/navigation"

export default function PTEditProfilePage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        full_name: "",
        phone: "",
        gender: "",
        date_of_birth: "",
    })
    const [profileImage, setProfileImage] = useState("/abstract-profile.png")
    const [saving, setSaving] = useState(false)
    const [loading, setLoading] = useState(true)
    const [successMessage, setSuccessMessage] = useState("")

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        try {
            const res = await authApi.getProfile()
            setFormData({
                full_name: res.full_name || "",
                phone: res.phone || "",
                gender: res.gender || "",
                date_of_birth: res.date_of_birth || "",
            })
            setLoading(false)
        } catch (error) {
            console.error("Failed to load profile", error)
            setLoading(false)
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfileImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    /* ================= INPUT NORMALIZATION ================= */
    const handleInputChange = (field, value) => {
        let newValue = value;

        if (field === 'full_name') {
            newValue = value.replace(/\s+/g, ' ');
        } else if (field === 'phone') {
            newValue = value.replace(/[^0-9+]/g, '');
        }

        setFormData(prev => ({ ...prev, [field]: newValue }));
    };

    /* ================= VALIDATION ================= */
    const validate = () => {
        // 1. Full Name
        const nameRegex = /^(?=.{2,50}$)[\p{L}]+(?:[ '-][\p{L}]+)*$/u;
        if (!formData.full_name) {
            alert("Full name is required.");
            return false;
        } else if (!nameRegex.test(formData.full_name.trim())) {
            alert("Validation failed:\nName must be 2-50 chars, no numbers or special symbols.");
            return false;
        }

        // 2. Phone
        const phoneRegex = /^(?:0\d{9}|\+84\d{9})$/;
        if (!formData.phone) {
            alert("Phone is required.");
            return false;
        } else if (!phoneRegex.test(formData.phone)) {
            alert("Validation failed:\nPhone must be 10 digits (0xxxxxxxxx) or +84xxxxxxxxx.");
            return false;
        }

        // 3. Gender
        if (!formData.gender) {
            alert("Gender is required.");
            return false;
        }

        // 4. Date of Birth
        if (!formData.date_of_birth) {
            alert("Date of birth is required.");
            return false;
        } else {
            const dob = new Date(formData.date_of_birth);
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            const m = today.getMonth() - dob.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
                age--; // not birthday yet
            }

            if (dob >= today) {
                alert("Validation failed:\nDate of birth must be in the past.");
                return false;
            } else if (age < 12) {
                alert("Validation failed:\nYou must be at least 12 years old.");
                return false;
            } else if (age > 90) {
                alert("Validation failed:\nDate of birth is invalid.");
                return false;
            }
        }

        return true;
    };

    const handleSave = async () => {
        if (!validate()) return;

        setSaving(true)
        setSuccessMessage("")
        try {
            await authApi.updateProfile(formData)
            setSuccessMessage("Profile updated successfully! Redirecting...")

            // Auto navigate after 1.5 seconds
            setTimeout(() => {
                router.push("/personal_trainer/profile")
            }, 1500)
        } catch (error) {
            console.error("Update failed", error)
            if (error.response && error.response.data && error.response.data.errors) {
                const messages = Object.values(error.response.data.errors).flat().join("\n");
                alert("Validation failed:\n" + messages);
            } else if (error.response && error.response.data && error.response.data.message) {
                alert("Error: " + error.response.data.message);
            } else {
                alert("Failed to update profile. Please check inputs.")
            }
            setSaving(false)
        }
    }

    if (loading) return <div className="p-12 text-[#f0f0f0]">Loading...</div>

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#f0f0f0] mb-2">Edit Profile</h1>
                <p className="text-[#a0a0a0]">Update your personal information</p>
            </div>

            <div className="bg-[#282828] border border-[#282828] rounded-lg p-8">
                {/* Profile Picture */}
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-[#000000]">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-[#141414] border-2 border-[#282828]">
                            <Image
                                src={profileImage || "/placeholder.svg"}
                                alt="Profile"
                                width={96}
                                height={96}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <label
                            htmlFor="profile-image"
                            className="absolute bottom-0 right-0 w-8 h-8 bg-[#f0f0f0] hover:bg-[#e0e0e0] rounded-full flex items-center justify-center cursor-pointer transition-colors"
                        >
                            <Camera className="h-4 w-4 text-[#141414]" />
                        </label>
                        <input type="file" id="profile-image" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-[#f0f0f0] mb-1">Profile Picture</h3>
                        <p className="text-sm text-[#a0a0a0] mb-2">JPG, PNG or GIF (max 5MB)</p>
                        <label
                            htmlFor="profile-image"
                            className="text-sm text-[#f0f0f0] hover:text-white cursor-pointer font-medium"
                        >
                            Change Photo
                        </label>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-[#f0f0f0] mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#606060]" />
                            <input
                                type="text"
                                value={formData.full_name}
                                onChange={(e) => handleInputChange("full_name", e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-[#141414] border border-[#282828] rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#f0f0f0] transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-[#f0f0f0] mb-2">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#606060]" />
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-[#141414] border border-[#282828] rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#f0f0f0] transition-colors"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-[#f0f0f0] mb-2">Gender</label>
                            <select
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                className="w-full px-4 py-3 bg-[#141414] border border-[#282828] rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#f0f0f0] transition-colors appearance-none"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[#f0f0f0] mb-2">Date of Birth</label>
                            <input
                                type="date"
                                value={formData.date_of_birth}
                                onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                                className="w-full px-4 py-3 bg-[#141414] border border-[#282828] rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#f0f0f0] transition-colors"
                            />
                        </div>
                    </div>

                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3 text-green-500 animate-in fade-in slide-in-from-top-2">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">{successMessage}</span>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-4 mt-8 pt-8 border-t border-[#000000]">
                    <button
                        onClick={() => window.history.back()}
                        className="flex-1 px-6 py-3 bg-[#282828] hover:bg-[#333333] text-[#f0f0f0] rounded-lg font-medium border border-[#282828] transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving || successMessage}
                        className="flex-1 px-6 py-3 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        <Save className="h-5 w-5" />
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    )
}
