'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function EditProfileModal({ isOpen, onClose, initialData, onSave }) {
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-bg-base w-full max-w-lg rounded-xl shadow-2xl border border-borderColor-light m-4 p-6 animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-6 border-b border-borderColor-light pb-4">
                    <h3 className="text-xl font-bold text-text-strong">Edit Personal Information</h3>
                    <button onClick={onClose} className="text-text-subtle hover:text-text-strong transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-text-subtle uppercase">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full p-2 rounded-lg border border-borderColor-light bg-bg-subtle text-text-strong focus:outline-none focus:border-accent-DEFAULT"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-text-subtle uppercase">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full p-2 rounded-lg border border-borderColor-light bg-bg-subtle text-text-strong focus:outline-none focus:border-accent-DEFAULT"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-text-subtle uppercase">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 rounded-lg border border-borderColor-light bg-bg-subtle text-text-strong focus:outline-none focus:border-accent-DEFAULT"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-text-subtle uppercase">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 rounded-lg border border-borderColor-light bg-bg-subtle text-text-strong focus:outline-none focus:border-accent-DEFAULT"
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-borderColor-light">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-text-medium hover:bg-bg-subtle rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-bold text-white bg-accent-DEFAULT hover:bg-accent-hover rounded-lg shadow-lg hover:shadow-xl transition-all"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
