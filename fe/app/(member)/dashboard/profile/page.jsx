'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Camera, Edit2, ArrowLeft } from 'lucide-react';
import EditProfileModal from '@/components/dashboard/profile/EditProfileModal';
import authApi from '@/lib/api/authApi';

export default function ProfilePage() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        full_name: "Member Name",
        email: "member@example.com",
        phone: "+84 ...",
        gender: "Other",
        date_of_birth: "",
        user_id: null
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await authApi.getProfile();
            // Assuming response is: { user_id: 1, full_name: "...", email: "...", ... }
            // Or if wrapped: res.user?
            // Checking common Laravel Resource response wrapper or Controller return
            // Controller returns: $request->user(). So it is the user object directly usually.
            // But verify NguoiDungController. 
            // `return $request->user();` -> Returns JSON of the model.

            setUser(res);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch profile:", error);
            setLoading(false);
        }
    };

    const handleSaveProfile = async (newData) => {
        try {
            // Call API update
            const res = await authApi.updateProfile({
                full_name: newData.full_name,
                phone: newData.phone,
                gender: newData.gender,
                date_of_birth: newData.date_of_birth,
            });
            if (res.status && res.user) {
                setUser(res.user);
                setIsEditModalOpen(false);
            } else {
                // Fallback if structure different
                fetchProfile();
                setIsEditModalOpen(false);
            }
        } catch (error) {
            console.error("Update failed:", error);
            alert("Failed to update profile. Please check your inputs.");
        }
    };

    if (loading) return <div className="p-10 text-center text-[#f0f0f0]">Loading profile...</div>;

    const initials = user.full_name ? user.full_name.charAt(0).toUpperCase() : "M";

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-10">
            <div className="flex items-center gap-4">
                <Link href="/dashboard" className="p-2 hover:bg-bg-subtle rounded-full transition-colors text-text-medium hover:text-text-strong">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold text-text-strong">Profile</h1>
            </div>

            {/* Header Card */}
            <Card className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 relative">
                <div className="relative group">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-bg-subtle shadow-md">
                        {/* Avatar Placeholder */}
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                            <span className="text-4xl font-bold">{initials}</span>
                        </div>
                    </div>
                    {/* Edit Avatar Button */}
                    <button className="absolute bottom-0 right-0 p-2 bg-accent-DEFAULT text-white rounded-full shadow-lg hover:bg-accent-hover transition-colors" title="Change Avatar">
                        <Camera size={16} />
                    </button>
                </div>

                <div className="flex-1 text-center md:text-left pt-2">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-text-strong">{user.full_name}</h2>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2 text-text-medium text-sm">
                                <span className="font-medium text-accent-DEFAULT">Member</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 border border-borderColor-light rounded-lg hover:bg-bg-subtle transition-colors text-sm font-medium text-text-strong"
                        >
                            <Edit2 size={16} />
                            Edit
                        </button>
                    </div>
                </div>
            </Card>

            {/* Personal Information */}
            <Card className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-text-strong">Personal Information</h3>
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 border border-borderColor-light rounded-lg hover:bg-bg-subtle transition-colors text-sm font-medium text-text-strong"
                    >
                        <Edit2 size={16} />
                        Edit
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                    <div>
                        <p className="text-xs text-text-subtle uppercase font-semibold mb-1">Full Name</p>
                        <p className="text-base font-medium text-text-strong">{user.full_name}</p>
                    </div>
                    <div>
                        <p className="text-xs text-text-subtle uppercase font-semibold mb-1">Email address</p>
                        <p className="text-base font-medium text-text-strong">{user.email}</p>
                    </div>
                    <div>
                        <p className="text-xs text-text-subtle uppercase font-semibold mb-1">Phone</p>
                        <p className="text-base font-medium text-text-strong">{user.phone}</p>
                    </div>
                    <div>
                        <p className="text-xs text-text-subtle uppercase font-semibold mb-1">Gender</p>
                        <p className="text-base font-medium text-text-strong">{user.gender || 'Not set'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-text-subtle uppercase font-semibold mb-1">Date of Birth</p>
                        <p className="text-base font-medium text-text-strong">{user.date_of_birth || 'Not set'}</p>
                    </div>
                </div>
            </Card>

            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                initialData={user}
                onSave={handleSaveProfile}
            />
        </div>
    );
}
