"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp } from "lucide-react"

export default function FeedbackPage() {
    const feedback = [
        {
            id: 1,
            client: "John Smith",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 5,
            comment: "Excellent trainer! Really helped me achieve my fitness goals.",
            date: "2024-01-15",
            helpful: 12,
        },
        {
            id: 2,
            client: "Sarah Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 5,
            comment: "Very knowledgeable and patient. Highly recommend!",
            date: "2024-01-10",
            helpful: 8,
        },
        {
            id: 3,
            client: "Mike Wilson",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 4,
            comment: "Great sessions, saw improvement quickly.",
            date: "2024-01-05",
            helpful: 5,
        },
    ]

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[#f0f0f0]">Client Feedback</h1>
                <p className="text-muted-foreground">Reviews and ratings from your clients</p>
            </div>

            <div className="grid gap-4">
                {feedback.map((item) => (
                    <Card key={item.id} className="bg-[#141414] border-[#282828] p-6 text-[#f0f0f0]">
                        <div className="flex items-start gap-4">
                            <Avatar>
                                <AvatarImage src={item.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-[#141414]">{item.client[0]}</AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h3 className="font-semibold">{item.client}</h3>
                                        <p className="text-sm text-muted-foreground">{item.date}</p>
                                    </div>
                                    <div className="flex gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < item.rating ? "fill-primary text-primary" : "text-[#282828]"}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <p className="text-[#f0f0f0] mb-3">{item.comment}</p>

                                <Button variant="ghost" size="sm" className="gap-2 hover:bg-[#282828] text-[#f0f0f0]">
                                    <ThumbsUp className="h-4 w-4" />
                                    <span className="text-sm">{item.helpful} found helpful</span>
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
