"use client"

import { useState } from "react"
import { User, Camera, Save } from "lucide-react"
import Image from "next/image"

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345",
  })
  const [profileImage, setProfileImage] = useState("/abstract-profile.png")
  const [saving, setSaving] = useState(false)

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

  const handleSave = async () => {
    setSaving(true)
    // Mock save
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaving(false)
    alert("Profile updated successfully!")
  }

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
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-[#141414] border border-[#282828] rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#f0f0f0] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#f0f0f0] mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-[#141414] border border-[#282828] rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#f0f0f0] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#f0f0f0] mb-2">Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-[#141414] border border-[#282828] rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#f0f0f0] transition-colors resize-none"
            />
          </div>
        </div>

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
            disabled={saving}
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
