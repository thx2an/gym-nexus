"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, FileText, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function SessionNotesPage() {
    const [notes, setNotes] = useState([
        {
            id: 1,
            client: "John Smith",
            avatar: "/placeholder.svg?height=40&width=40",
            date: "2024-01-15",
            session: "Upper Body Strength",
            note: "Great progress on bench press. Increased weight by 10lbs. Client reported feeling strong.",
        },
        {
            id: 2,
            client: "Sarah Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
            date: "2024-01-14",
            session: "HIIT Training",
            note: "Completed full circuit with minimal rest. Cardio endurance improving significantly.",
        },
    ])

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#f0f0f0]">Session Notes</h1>
                    <p className="text-muted-foreground">Document your training sessions</p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                            <Plus className="h-4 w-4" />
                            New Note
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#141414] border-[#282828] text-[#f0f0f0]">
                        <DialogHeader>
                            <DialogTitle className="text-[#f0f0f0]">Add Session Note</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block text-[#a0a0a0]">Client</label>
                                <select className="w-full bg-[#141414] border border-[#282828] rounded-md px-3 py-2 text-[#f0f0f0]">
                                    <option>Select client</option>
                                    <option>John Smith</option>
                                    <option>Sarah Johnson</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block text-[#a0a0a0]">Session Type</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#141414] border border-[#282828] rounded-md px-3 py-2 text-[#f0f0f0]"
                                    placeholder="e.g., Upper Body Strength"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block text-[#a0a0a0]">Notes</label>
                                <Textarea
                                    className="min-h-[120px] bg-[#141414] border-[#282828] text-[#f0f0f0]"
                                    placeholder="Add session notes, progress, observations..."
                                />
                            </div>
                            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Save Note</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="space-y-4">
                {notes.map((note) => (
                    <Card key={note.id} className="bg-card border-border p-6 text-[#f0f0f0]">
                        <div className="flex items-start gap-4">
                            <Avatar>
                                <AvatarImage src={note.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-[#141414]">{note.client[0]}</AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold">{note.client}</h3>
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span>{note.date}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mb-3">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium text-muted-foreground">{note.session}</span>
                                </div>

                                <p className="text-[#f0f0f0]">{note.note}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
