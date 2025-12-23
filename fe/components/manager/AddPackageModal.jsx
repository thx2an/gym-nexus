"use client";

import { useState } from "react";
import { X, Save } from "lucide-react";
import managerApi from "@/lib/api/managerApi";

export default function AddPackageModal({ onClose, onSuccess }) {
    const [form, setForm] = useState({
        code: "",
        name: "",
        price: "",
        duration_days: "",
        description: "",
        benefits: "",
        is_active: true,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await managerApi.createPackage({
                ...form,
                price: Number(form.price),
                duration_days: Number(form.duration_days),
            });
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            setError("Failed to create package. Code might be duplicate.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-lg bg-[#1A1F26] border border-[#2A2F38] rounded-2xl shadow-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Add New Package</h2>
                    <button onClick={onClose} className="p-2 hover:bg-[#2A2F38] rounded-lg text-gray-400 hover:text-white transition">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Package Code</label>
                            <input
                                required
                                type="text"
                                placeholder="e.g. BASIC_1M"
                                value={form.code}
                                onChange={(e) => setForm({ ...form, code: e.target.value })}
                                className="w-full bg-[#0F141B] border border-[#2A2F38] rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Name</label>
                            <input
                                required
                                type="text"
                                placeholder="basic Monthly"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full bg-[#0F141B] border border-[#2A2F38] rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Price (VND)</label>
                            <input
                                required
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.price}
                                onChange={(e) => setForm({ ...form, price: e.target.value })}
                                className="w-full bg-[#0F141B] border border-[#2A2F38] rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Duration (Days)</label>
                            <input
                                required
                                type="number"
                                min="1"
                                value={form.duration_days}
                                onChange={(e) => setForm({ ...form, duration_days: e.target.value })}
                                className="w-full bg-[#0F141B] border border-[#2A2F38] rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Benefits</label>
                        <textarea
                            placeholder="List benefits..."
                            value={form.benefits}
                            onChange={(e) => setForm({ ...form, benefits: e.target.value })}
                            className="w-full bg-[#0F141B] border border-[#2A2F38] rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none h-20 resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
                        <textarea
                            placeholder="Short description..."
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full bg-[#0F141B] border border-[#2A2F38] rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none h-20 resize-none"
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-2"
                        >
                            {loading ? "Saving..." : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Create Package
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
