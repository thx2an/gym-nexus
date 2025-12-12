import React from 'react';
import { Card, CardHeader } from '../ui/Card';
import { Icons } from './DashboardIcons';

const NotificationCenter = () => {
    const notifications = [
        {
            id: 1,
            title: "Booking Confirmed",
            message: "Session with PT Nguyen Van A has been confirmed.",
            type: "success",
            time: "2 hours ago"
        },
        {
            id: 2,
            title: "Package Expiry Soon",
            message: "Your membership will expire in 5 days.",
            type: "warning",
            time: "1 day ago"
        }
    ];

    return (
        <Card className="h-full">
            <CardHeader
                title="Notifications"
                action={<div className="relative"><Icons.Notification className="text-text-medium" size={20} /><span className="absolute -top-1 -right-1 w-2 h-2 bg-accent-error rounded-full"></span></div>}
            />

            <div className="space-y-4">
                {notifications.map((notif) => (
                    <div key={notif.id} className="flex gap-3 items-start p-3 hover:bg-bg-subtle rounded-lg transition-colors cursor-pointer border-b border-borderColor-light last:border-0 border-dashed">
                        <div className={`mt-0.5 min-w-[8px] h-2 rounded-full 
              ${notif.type === 'success' ? 'bg-accent-success' : 'bg-accent-warning'}
            `}></div>
                        <div>
                            <h5 className="text-sm font-semibold text-text-strong leading-none mb-1">{notif.title}</h5>
                            <p className="text-xs text-text-medium line-clamp-2">{notif.message}</p>
                            <span className="text-[10px] text-text-subtle mt-1 block">{notif.time}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 pt-2 border-t border-borderColor-light text-center">
                <button className="text-xs text-accent-DEFAULT font-medium hover:text-accent-hover">
                    View All
                </button>
            </div>
        </Card>
    );
};

export default NotificationCenter;
