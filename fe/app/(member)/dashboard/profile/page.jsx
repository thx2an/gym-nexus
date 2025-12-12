'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Camera, Edit2, ArrowLeft } from 'lucide-react';
import EditProfileModal from '@/components/dashboard/profile/EditProfileModal';

export default function ProfilePage() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [user, setUser] = useState({
        firstName: "Member",
        lastName: "Name",
        email: "member@example.com",
        phone: "+84 901 234 567"
    });

    const handleSaveProfile = (newData) => {
        setUser(newData);
    };

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
                            <span className="text-4xl font-bold">{user.firstName[0]}</span>
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
                            <h2 className="text-2xl font-bold text-text-strong">{user.firstName} {user.lastName}</h2>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2 text-text-medium text-sm">
                                <span className="font-medium text-accent-DEFAULT">3-Month Membership Member</span>
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
                        <p className="text-xs text-text-subtle uppercase font-semibold mb-1">First Name</p>
                        <p className="text-base font-medium text-text-strong">{user.firstName}</p>
                    </div>
                    <div>
                        <p className="text-xs text-text-subtle uppercase font-semibold mb-1">Last Name</p>
                        <p className="text-base font-medium text-text-strong">{user.lastName}</p>
                    </div>
                    <div>
                        <p className="text-xs text-text-subtle uppercase font-semibold mb-1">Email address</p>
                        <p className="text-base font-medium text-text-strong">{user.email}</p>
                    </div>
                    <div>
                        <p className="text-xs text-text-subtle uppercase font-semibold mb-1">Phone</p>
                        <p className="text-base font-medium text-text-strong">{user.phone}</p>
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
