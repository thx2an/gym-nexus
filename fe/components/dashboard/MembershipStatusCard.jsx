import React from 'react';
import { Card } from '../ui/Card';

const MembershipStatusCard = () => {
    // Mock Data
    const membership = {
        packageName: "3-Month Gym Package",
        status: "Active", // Active, Warning, Expired
        expiryDate: "15/03/2026",
        daysRemaining: 45
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-accent-success text-white';
            case 'Warning': return 'bg-accent-warning text-white';
            case 'Expired': return 'bg-accent-error text-white';
            default: return 'bg-gray-400 text-white';
        }
    };

    return (
        <div className="bg-gradient-to-r from-base-primaryBg to-[#0F1A18] rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
            {/* Decorative Circle */}
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-accent opacity-10 rounded-full blur-2xl"></div>

            <div className="flex justify-between items-start relative z-10">
                <div>
                    <p className="text-gray-400 text-sm mb-1">Current Package</p>
                    <h2 className="text-2xl font-bold mb-2 text-accent-DEFAULT">{membership.packageName}</h2>
                    <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(membership.status)}`}>
                        {membership.status === 'Active' ? 'Active' : 'Expiring Soon'}
                    </div>
                </div>

                <div className="text-right">
                    <p className="text-3xl font-bold">{membership.daysRemaining}</p>
                    <p className="text-xs text-gray-400">Days Left</p>
                </div>
            </div>

            <div className="mt-6 flex justify-between items-end relative z-10">
                <div>
                    <p className="text-xs text-gray-400">Expires on</p>
                    <p className="font-medium">{membership.expiryDate}</p>
                </div>
                <button className="bg-white hover:bg-gray-100 text-base-primaryBg font-bold py-2 px-4 rounded-lg transition-colors text-sm shadow-md">
                    Renew Now
                </button>
            </div>
        </div>
    );
};

export default MembershipStatusCard;
