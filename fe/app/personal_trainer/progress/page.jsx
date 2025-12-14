"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TrendingUp, TrendingDown } from "lucide-react"

export default function ProgressPage() {
    const clients = [
        {
            id: 1,
            name: "John Smith",
            avatar: "/placeholder.svg?height=40&width=40",
            progress: {
                weight: { current: 180, previous: 190, change: -10, trend: "down" },
                strength: { current: 225, previous: 200, change: 25, trend: "up" },
                sessions: { current: 12, target: 16, completion: 75 },
            },
        },
        {
            id: 2,
            name: "Sarah Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
            progress: {
                weight: { current: 145, previous: 155, change: -10, trend: "down" },
                strength: { current: 135, previous: 115, change: 20, trend: "up" },
                sessions: { current: 14, target: 16, completion: 87 },
            },
        },
    ]

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[#f0f0f0]">Client Progress</h1>
                <p className="text-muted-foreground">Track your clients' fitness journey</p>
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList className="bg-[#282828] text-[#a0a0a0]">
                    <TabsTrigger value="all" className="data-[state=active]:bg-[#141414] data-[state=active]:text-[#f0f0f0]">All Clients</TabsTrigger>
                    <TabsTrigger value="active" className="data-[state=active]:bg-[#141414] data-[state=active]:text-[#f0f0f0]">Active</TabsTrigger>
                    <TabsTrigger value="goals" className="data-[state=active]:bg-[#141414] data-[state=active]:text-[#f0f0f0]">Goals Met</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6 space-y-4">
                    {clients.map((client) => (
                        <Card key={client.id} className="bg-[#141414] border-[#282828] p-6 text-[#f0f0f0]">
                            <div className="flex items-center gap-4 mb-6">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={client.avatar || "/placeholder.svg"} />
                                    <AvatarFallback className="text-[#141414]">{client.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold text-lg">{client.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {client.progress.sessions.current}/{client.progress.sessions.target} sessions
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-[#1E1E1E] rounded-lg p-4">
                                    <p className="text-sm text-muted-foreground mb-1">Weight (lbs)</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold">{client.progress.weight.current}</span>
                                        <div className="flex items-center text-green-500 text-sm">
                                            <TrendingDown className="h-4 w-4" />
                                            <span>{Math.abs(client.progress.weight.change)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#1E1E1E] rounded-lg p-4">
                                    <p className="text-sm text-muted-foreground mb-1">Strength (lbs)</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold">{client.progress.strength.current}</span>
                                        <div className="flex items-center text-green-500 text-sm">
                                            <TrendingUp className="h-4 w-4" />
                                            <span>+{client.progress.strength.change}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#1E1E1E] rounded-lg p-4">
                                    <p className="text-sm text-muted-foreground mb-1">Completion</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold">{client.progress.sessions.completion}%</span>
                                    </div>
                                    <div className="w-full bg-[#282828] rounded-full h-2 mt-2">
                                        <div
                                            className="bg-primary h-2 rounded-full"
                                            style={{ width: `${client.progress.sessions.completion}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    )
}
