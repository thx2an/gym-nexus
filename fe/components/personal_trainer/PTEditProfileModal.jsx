"use client";

import React, { useState, useEffect } from "react";
import { X, User, Phone, MapPin, Camera, Save } from "lucide-react";
import Image from "next/image";

export default function PTEditProfileModal({ isOpen, onClose, initialData, onSave }) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        ...initialData,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(prev => ({ ...prev, ...initialData }));
        }
    }, [initialData]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simmons async save
        await new Promise(resolve => setTimeout(resolve, 800));
        onSave(formData);
        setLoading(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#141414] w-full max-w-lg rounded-xl border border-[#282828] shadow-2xl m-4 animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-[#282828]">
                    <h3 className="text-xl font-bold text-[#f0f0f0]">Edit Profile</h3>
                    <button
                        onClick={onClose}
                        className="text-[#a0a0a0] hover:text-[#f0f0f0] transition-colors p-1 rounded-md hover:bg-[#282828]"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-6">

                        {/* Avatar Placeholder */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#282828] bg-[#1E1E1E]">
                                <Image
                                    src="/abstract-profile.png"
                                    alt="Profile"
                                    width={96}
                                    height={96}
                                    className="object-cover w-full h-full"
                                    onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Coach&background=282828&color=f0f0f0" }}
                                />
                            </div>
                            <button type="button" className="text-xs text-[#f0f0f0] bg-[#282828] hover:bg-[#333333] px-3 py-1.5 rounded-full transition-colors font-medium">
                                Change Photo
                            </button>
                        </div>

                        {/* Fields */}
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[#a0a0a0] uppercase tracking-wider">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#606060]" />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full pl-9 pr-4 py-2.5 bg-[#1E1E1E] border border-[#282828] rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#f0f0f0] transition-colors placeholder-[#404040]"
                                        placeholder="Enter full name"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[#a0a0a0] uppercase tracking-wider">Phone</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#606060]" />
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full pl-9 pr-4 py-2.5 bg-[#1E1E1E] border border-[#282828] rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#f0f0f0] transition-colors placeholder-[#404040]"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[#a0a0a0] uppercase tracking-wider">Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-[#606060]" />
                                    <textarea
                                        rows={2}
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className="w-full pl-9 pr-4 py-2.5 bg-[#1E1E1E] border border-[#282828] rounded-lg text-[#f0f0f0] focus:outline-none focus:border-[#f0f0f0] transition-colors placeholder-[#404040] resize-none"
                                        placeholder="Enter your address"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-[#282828] flex justify-end gap-3 bg-[#141414] rounded-b-xl">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-[#a0a0a0] hover:text-[#f0f0f0] hover:bg-[#282828] rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 text-sm font-bold text-[#141414] bg-[#f0f0f0] hover:bg-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70"
                        >
                            {loading ? (
                                <span>Saving...</span>
                            ) : (
                                <>
                                    <Save size={16} />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
