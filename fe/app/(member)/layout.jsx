"use client";

import React from 'react';
import Navbar from '@/components/common/Navbar';


export default function MemberLayout({ children }) {
    return (
        <div className="flex h-screen bg-bg-base overflow-hidden">


            <div className="flex-1 flex flex-col min-w-0">
                <Navbar />

                <main className="flex-1 overflow-y-auto p-4 bg-bg-base">
                    {children}
                </main>
            </div>
        </div>
    );
}
