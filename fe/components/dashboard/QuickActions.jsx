import React from 'react';
import { Card } from '../ui/Card';
import { Icons } from './DashboardIcons';

const actions = [
    { id: 1, title: "Book Session", icon: Icons.Booking, color: "bg-blue-100 text-blue-600" },
    { id: 2, title: "Check-in QR", icon: Icons.CheckIn, color: "bg-purple-100 text-purple-600" },
    { id: 3, title: "AI Workout", icon: Icons.Workout, color: "bg-orange-100 text-orange-600" },
    { id: 4, title: "Nutrition", icon: Icons.Nutrition, color: "bg-green-100 text-green-600" },
    { id: 5, title: "Membership", icon: Icons.Membership, color: "bg-indigo-100 text-indigo-600" },
    { id: 6, title: "Support", icon: Icons.Support, color: "bg-red-100 text-red-600" }
];

const QuickActions = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {actions.map((action) => (
                <Card key={action.id} className="w-full aspect-square flex-shrink-0 cursor-pointer hover:border-accent-DEFAULT transition-all hover:shadow-md group flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center text-center">
                        <div className={`p-4 rounded-full mb-3 ${action.color} group-hover:scale-110 transition-transform`}>
                            <action.icon size={28} />
                        </div>
                        <h4 className="font-medium text-text-strong text-sm">{action.title}</h4>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default QuickActions;
