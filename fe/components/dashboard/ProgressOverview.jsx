import React from 'react';
import { Card, CardHeader } from '../ui/Card';
import { Icons } from './DashboardIcons';

const ProgressOverview = () => {
    // Mock Data
    const weight = 72.5;
    const weightTrend = -1.2; // kg since last month
    const bmi = 22.4;

    const weeklyActivity = [
        { day: "Mon", active: true, label: "T2" },
        { day: "Tue", active: false, label: "T3" },
        { day: "Wed", active: true, label: "T4" },
        { day: "Thu", active: true, label: "T5" },
        { day: "Fri", active: false, label: "T6" },
        { day: "Sat", active: true, label: "T7" },
        { day: "Sun", active: false, label: "CN" },
    ];

    return (
        <Card className="h-full">
            <CardHeader title="Training Progress" />

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-bg-subtle p-3 rounded-xl border border-borderColor-light">
                    <div className="flex items-center gap-2 mb-1">
                        <Icons.Activity size={16} className="text-accent-DEFAULT" />
                        <span className="text-xs text-text-medium">Weight</span>
                    </div>
                    <p className="text-xl font-bold text-text-strong">{weight} <span className="text-sm font-normal">kg</span></p>
                    <div className="flex items-center text-xs font-medium text-accent-success mt-1">
                        <Icons.Trend size={12} className="mr-1 transform rotate-180" />
                        <span>{Math.abs(weightTrend)} kg</span>
                    </div>
                </div>

                <div className="bg-bg-subtle p-3 rounded-xl border border-borderColor-light">
                    <div className="flex items-center gap-2 mb-1">
                        <Icons.Success size={16} className="text-accent-warning" />
                        <span className="text-xs text-text-medium">BMI</span>
                    </div>
                    <p className="text-xl font-bold text-text-strong">{bmi}</p>
                    <p className="text-xs text-text-success mt-1">Normal</p>
                </div>
            </div>

            <div>
                <h4 className="text-xs font-semibold text-text-medium mb-3">Weekly Frequency</h4>
                <div className="flex justify-between items-end h-24 pb-2">
                    {weeklyActivity.map((day, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                            <div
                                className={`w-2 rounded-t-lg transition-all duration-500
                ${day.active ? 'bg-accent-DEFAULT h-16' : 'bg-borderColor-light h-4'}`}
                            ></div>
                            <span className="text-[10px] text-text-subtle font-medium">{day.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default ProgressOverview;
