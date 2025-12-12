import React from 'react';
import { Card, CardHeader } from '../ui/Card';
import { Icons } from './DashboardIcons';

const UpcomingActivities = () => {
    const activities = [
        {
            id: 1,
            trainer: "Nguyen Van A",
            type: "Personal Training",
            date: "Today",
            time: "17:00 - 18:00",
            status: "Confirmed"
        },
        {
            id: 2,
            trainer: "Tran Thi B",
            type: "Yoga Class",
            date: "Tomorrow",
            time: "09:00 - 10:00",
            status: "Pending"
        }
    ];

    return (
        <Card className="h-full">
            <CardHeader title="Upcoming Activity" />
            <div className="space-y-4">
                {activities.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-bg-base rounded-lg border border-borderColor-light">
                        <div className="flex items-center gap-3">
                            <div className="bg-bg-subtle p-2 rounded-lg text-accent-DEFAULT">
                                <Icons.Booking size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-text-strong text-sm">{item.trainer}</h4>
                                <p className="text-xs text-text-medium">{item.type} • {item.date}</p>
                                <div className="flex items-center gap-1 mt-1 text-xs font-medium text-text-strong">
                                    <Icons.Pending size={12} />
                                    {item.time}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide
                ${item.status === 'Confirmed' ? 'bg-accent-success/20 text-accent-success' : 'bg-accent-warning/20 text-accent-warning'}
              `}>
                                {item.status}
                            </span>
                            <button className="text-xs text-text-subtle hover:text-accent-error">
                                Cancel/Reschedule
                            </button>
                        </div>
                    </div>
                ))}
                {activities.length === 0 && (
                    <div className="text-center py-8 text-text-subtle">
                        <p>No upcoming activities</p>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default UpcomingActivities;
