"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Calendar, Clock } from "lucide-react"

export default function AvailabilityPage() {
    const [availability, setAvailability] = useState([
        { day: "Monday", enabled: true, start: "09:00", end: "17:00" },
        { day: "Tuesday", enabled: true, start: "09:00", end: "17:00" },
        { day: "Wednesday", enabled: true, start: "09:00", end: "17:00" },
        { day: "Thursday", enabled: true, start: "09:00", end: "17:00" },
        { day: "Friday", enabled: true, start: "09:00", end: "17:00" },
        { day: "Saturday", enabled: false, start: "10:00", end: "14:00" },
        { day: "Sunday", enabled: false, start: "10:00", end: "14:00" },
    ])

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[#f0f0f0]">Availability</h1>
                <p className="text-muted-foreground">Manage your weekly schedule</p>
            </div>

            <Card className="bg-[#141414] border-[#282828] p-6">
                <div className="space-y-4">
                    {availability.map((slot, index) => (
                        <div key={slot.day} className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-lg border border-[#282828]">
                            <div className="flex items-center gap-4">
                                <Switch
                                    checked={slot.enabled}
                                    onCheckedChange={(checked) => {
                                        const newAvailability = [...availability]
                                        newAvailability[index].enabled = checked
                                        setAvailability(newAvailability)
                                    }}
                                />
                                <Calendar className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium w-24 text-[#f0f0f0]">{slot.day}</span>
                            </div>

                            {slot.enabled && (
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <input
                                            type="time"
                                            value={slot.start}
                                            className="bg-[#141414] border border-[#282828] rounded px-2 py-1 text-sm text-[#f0f0f0]"
                                            onChange={(e) => {
                                                const newAvailability = [...availability]
                                                newAvailability[index].start = e.target.value
                                                setAvailability(newAvailability)
                                            }}
                                        />
                                        <span className="text-muted-foreground">to</span>
                                        <input
                                            type="time"
                                            value={slot.end}
                                            className="bg-[#141414] border border-[#282828] rounded px-2 py-1 text-sm text-[#f0f0f0]"
                                            onChange={(e) => {
                                                const newAvailability = [...availability]
                                                newAvailability[index].end = e.target.value
                                                setAvailability(newAvailability)
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-end">
                    <Button className="bg-primary text-primary-foreground">Save Changes</Button>
                </div>
            </Card>
        </div>
    )
}
