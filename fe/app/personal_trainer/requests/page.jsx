"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, Check, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function RequestsPage() {
    const { toast } = useToast()
    const [requests, setRequests] = useState([
        {
            id: 1,
            client: "Mike Davis",
            avatar: "/placeholder.svg?height=40&width=40",
            type: "New Client",
            date: "2024-01-20",
            time: "10:00 AM",
            message: "Looking to build muscle and improve overall fitness",
            status: "pending",
        },
        {
            id: 2,
            client: "Emma Wilson",
            avatar: "/placeholder.svg?height=40&width=40",
            type: "Reschedule",
            date: "2024-01-18",
            time: "2:00 PM",
            message: "Can we move my session to Friday afternoon?",
            status: "pending",
        },
    ])

    const handleApprove = (id) => {
        setRequests(requests.filter((r) => r.id !== id))
        toast({ title: "Request approved" })
    }

    const handleDecline = (id) => {
        setRequests(requests.filter((r) => r.id !== id))
        toast({ title: "Request declined", variant: "destructive" })
    }

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[#f0f0f0]">Client Requests</h1>
                <p className="text-muted-foreground">Manage booking and schedule requests</p>
            </div>

            {requests.length === 0 ? (
                <Card className="bg-[#141414] border-[#282828] p-12 text-center text-[#f0f0f0]">
                    <p className="text-muted-foreground">No pending requests</p>
                </Card>
            ) : (
                <div className="space-y-4">
                    {requests.map((request) => (
                        <Card key={request.id} className="bg-[#141414] border-[#282828] p-6 text-[#f0f0f0]">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <Avatar>
                                        <AvatarImage src={request.avatar || "/placeholder.svg"} />
                                        <AvatarFallback className="text-[#141414]">{request.client[0]}</AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold">{request.client}</h3>
                                            <Badge variant="secondary" className="bg-[#282828] text-[#f0f0f0]">{request.type}</Badge>
                                        </div>

                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>{request.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                <span>{request.time}</span>
                                            </div>
                                        </div>

                                        <p className="text-[#f0f0f0]">{request.message}</p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="gap-2 bg-transparent border-[#282828] hover:bg-[#282828] text-[#f0f0f0]"
                                        onClick={() => handleApprove(request.id)}
                                    >
                                        <Check className="h-4 w-4" />
                                        Approve
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="gap-2 bg-transparent border-[#282828] hover:bg-[#282828] text-[#f0f0f0]"
                                        onClick={() => handleDecline(request.id)}
                                    >
                                        <X className="h-4 w-4" />
                                        Decline
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
