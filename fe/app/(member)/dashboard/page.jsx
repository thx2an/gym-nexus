"use client";

import React from 'react';
import MembershipStatusCard from '@/components/dashboard/MembershipStatusCard';
import QuickActions from '@/components/dashboard/QuickActions';
import UpcomingActivities from '@/components/dashboard/UpcomingActivities';
import ProgressOverview from '@/components/dashboard/ProgressOverview';
import NotificationCenter from '@/components/dashboard/NotificationCenter';

export default function MemberDashboardPage() {
    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-text-strong">Hello, Member! 👋</h1>
                    <p className="text-text-medium mt-1">Wishing you an energetic training day.</p>
                </div>
                <div className="mt-4 md:mt-0 text-sm font-medium text-text-subtle bg-bg-subtle px-4 py-2 rounded-full border border-borderColor-light">
                    Thursday, December 12, 2025
                </div>
            </div>

            {/* Top Row: Membership & Quick Stats/Notifs if needed, but per design we put Membership first */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Status Card - Takes 2 columns */}
                <div className="lg:col-span-2">
                    <MembershipStatusCard />
                </div>

                {/* Notification Center - Takes 1 column */}
                <div className="lg:col-span-1 h-full">
                    <NotificationCenter />
                </div>
            </div>

            {/* Quick Actions Section */}
            <div>
                <h3 className="text-lg font-semibold text-text-strong mb-4">Features</h3>
                <QuickActions />
            </div>

            {/* Bottom Row: Upcoming & Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upcoming Activities - Takes 1.5/3 or 1/2 roughly */}
                <div className="lg:col-span-1">
                    <UpcomingActivities />
                </div>

                {/* Progress Overview - Takes 1.5/3 or 1/2 */}
                <div className="lg:col-span-2">
                    <ProgressOverview />
                </div>
            </div>
        </div>
    );
}
