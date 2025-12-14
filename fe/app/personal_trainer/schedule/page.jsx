"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus, Clock } from "lucide-react"
import { getTrainerSchedule, createAvailability } from "@/lib/api/trainerApi"
import { useToast } from "@/hooks/use-toast"

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const TIME_SLOTS = Array.from({ length: 14 }, (_, i) => `${8 + i}:00`)

export default function SchedulePage() {
    const [schedule, setSchedule] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [formData, setFormData] = useState({
        date: "",
        startTime: "",
        endTime: "",
        notes: "",
    })
    const { toast } = useToast()

    const loadSchedule = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await getTrainerSchedule("2025-01-13", "2025-01-19")
            setSchedule(data)
        } catch (err) {
            setError("Failed to load schedule")
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadSchedule()
    }, [])

    const handleAddAvailability = async () => {
        if (!formData.date || !formData.startTime || !formData.endTime) {
            toast({ title: "Please fill in all required fields", variant: "destructive" })
            return
        }

        try {
            await createAvailability(formData)
            toast({ title: "Availability added" })
            setDialogOpen(false)
            setFormData({ date: "", startTime: "", endTime: "", notes: "" })
            loadSchedule()
        } catch (err) {
            toast({ title: "Failed to add availability", variant: "destructive" })
        }
    }

    const handleSlotClick = (slot) => {
        setSelectedSlot(slot)
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-96 gap-4">
                <p className="text-destructive">{error}</p>
                <Button onClick={loadSchedule}>Retry</Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#f0f0f0]">Schedule</h1>
                    <p className="text-muted-foreground">Manage your availability and bookings</p>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Availability
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#141414] border-[#282828] text-[#f0f0f0]">
                        <DialogHeader>
                            <DialogTitle className="text-[#f0f0f0]">Add Availability</DialogTitle>
                            <DialogDescription>Create a new available time slot for bookings</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="date" className="text-[#a0a0a0]">Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    className="bg-[#141414] border-[#282828] text-[#f0f0f0]"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="startTime" className="text-[#a0a0a0]">Start Time</Label>
                                    <Input
                                        id="startTime"
                                        type="time"
                                        className="bg-[#141414] border-[#282828] text-[#f0f0f0]"
                                        value={formData.startTime}
                                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="endTime" className="text-[#a0a0a0]">End Time</Label>
                                    <Input
                                        id="endTime"
                                        type="time"
                                        className="bg-[#141414] border-[#282828] text-[#f0f0f0]"
                                        value={formData.endTime}
                                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notes" className="text-[#a0a0a0]">Notes (Optional)</Label>
                                <Textarea
                                    id="notes"
                                    className="bg-[#141414] border-[#282828] text-[#f0f0f0]"
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    placeholder="Add any notes about this availability..."
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setDialogOpen(false)} className="border-[#282828] text-[#f0f0f0] hover:bg-[#282828]">
                                Cancel
                            </Button>
                            <Button onClick={handleAddAvailability}>Add Availability</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="bg-[#141414] border-[#282828] text-[#f0f0f0]">
                <CardHeader>
                    <CardTitle>Week View</CardTitle>
                    <CardDescription>Jan 13 - Jan 19, 2025</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} className="h-20 w-full" />
                            ))}
                        </div>
                    ) : schedule.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-muted-foreground">No schedule items for this week</p>
                            <Button className="mt-4" onClick={() => setDialogOpen(true)}>
                                Add Availability
                            </Button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <div className="min-w-[600px] space-y-2">
                                {TIME_SLOTS.map((time) => (
                                    <div key={time} className="flex gap-2">
                                        <div className="w-20 flex items-center justify-end pr-2 text-sm text-muted-foreground">{time}</div>
                                        <div className="flex-1 grid grid-cols-7 gap-2">
                                            {DAYS_OF_WEEK.map((day, idx) => {
                                                const slot = schedule.find((s) => s.startTime === time && new Date(s.date).getDay() === idx + 1)
                                                return (
                                                    <button
                                                        key={day}
                                                        onClick={() => slot && handleSlotClick(slot)}
                                                        className={`h-16 rounded border text-xs p-1 transition-colors ${slot
                                                                ? slot.type === "booked"
                                                                    ? "bg-primary text-primary-foreground border-primary"
                                                                    : slot.type === "available"
                                                                        ? "bg-[#282828] text-[#f0f0f0] border-[#3E3E3E]"
                                                                        : "bg-muted text-muted-foreground border-muted"
                                                                : "bg-[#141414] border-[#282828] hover:bg-[#1E1E1E]"
                                                            }`}
                                                    >
                                                        {slot && (
                                                            <div className="text-left overflow-hidden">
                                                                <div className="font-medium truncate">
                                                                    {slot.type === "booked" ? slot.clientName : "Available"}
                                                                </div>
                                                                {slot.service && <div className="text-[10px] truncate">{slot.service}</div>}
                                                            </div>
                                                        )}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Slot Detail Dialog */}
            <Dialog open={!!selectedSlot} onOpenChange={() => setSelectedSlot(null)}>
                <DialogContent className="bg-[#141414] border-[#282828] text-[#f0f0f0]">
                    <DialogHeader>
                        <DialogTitle className="text-[#f0f0f0]">Session Details</DialogTitle>
                    </DialogHeader>
                    {selectedSlot && (
                        <div className="space-y-4 py-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Date & Time</p>
                                <p className="font-medium">
                                    {selectedSlot.date} at {selectedSlot.startTime} - {selectedSlot.endTime}
                                </p>
                            </div>
                            {selectedSlot.type === "booked" && (
                                <>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Client</p>
                                        <p className="font-medium">{selectedSlot.clientName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Service</p>
                                        <p className="font-medium">{selectedSlot.service}</p>
                                    </div>
                                </>
                            )}
                            {selectedSlot.notes && (
                                <div>
                                    <p className="text-sm text-muted-foreground">Notes</p>
                                    <p className="text-sm">{selectedSlot.notes}</p>
                                </div>
                            )}
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={() => setSelectedSlot(null)} className="border-[#282828] text-[#f0f0f0] hover:bg-[#282828]">Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
