"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Users, BookOpen, Clock, CheckCircle, XCircle, TrendingUp } from "lucide-react"
import {
  getTrainerDashboard,
  updateBookingStatus,
} from "@/lib/api/trainerApi"
import { useToast } from "@/hooks/use-toast"

export default function PTDashboard() {
  const { toast } = useToast()
  const [stats, setStats] = useState(null)
  const [todaySessions, setTodaySessions] = useState([])
  const [pendingBookings, setPendingBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadDashboard = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getTrainerDashboard()
      setStats(data.stats)
      setTodaySessions(data.todaySessions)
      setPendingBookings(data.pendingBookings)
    } catch (err) {
      setError("Failed to load dashboard data")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  const handleApprove = async (bookingId) => {
    try {
      await updateBookingStatus(bookingId, "confirmed")
      toast({ title: "Booking approved" })
      loadDashboard()
    } catch (err) {
      toast({ title: "Failed to approve booking", variant: "destructive" })
    }
  }

  const handleDecline = async (bookingId) => {
    try {
      await updateBookingStatus(bookingId, "canceled")
      toast({ title: "Booking declined" })
      loadDashboard()
    } catch (err) {
      toast({ title: "Failed to decline booking", variant: "destructive" })
    }
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <p className="text-destructive">{error}</p>
        <Button onClick={loadDashboard}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#f0f0f0]">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">{"Here's your fitness journey at a glance."}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-4 rounded-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <>
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Today's Sessions</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#f0f0f0]">{stats?.todaySessions}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +2 from yesterday
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Bookings</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#f0f0f0]">{stats?.pendingBookings}</div>
                <p className="text-xs text-muted-foreground mt-1">Awaiting your response</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Clients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#f0f0f0]">{stats?.activeClients}</div>
                <p className="text-xs text-muted-foreground mt-1">Currently training</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#f0f0f0]">{stats?.totalHoursThisWeek}</div>
                <p className="text-xs text-muted-foreground mt-1">This week</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-[#f0f0f0]">{"Today's Schedule"}</CardTitle>
            <CardDescription>Your sessions for today</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-10 w-16" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-5 w-20" />
                  </div>
                ))}
              </div>
            ) : todaySessions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No sessions scheduled for today</p>
            ) : (
              <div className="space-y-4">
                {todaySessions.map((session) => (
                  <div key={session.id} className="flex items-center gap-4 pb-4 border-b border-[#282828] last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 min-w-[80px]">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-sm text-[#f0f0f0]">{session.time}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#f0f0f0]">{session.clientName}</p>
                      <p className="text-sm text-muted-foreground">{session.service}</p>
                    </div>
                    <Badge
                      variant={
                        session.status === "confirmed"
                          ? "default"
                          : session.status === "pending"
                            ? "secondary"
                            : "outline"
                      }
                      className="bg-primary text-primary-foreground"
                    >
                      {session.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-[#f0f0f0]">Pending Approvals</CardTitle>
            <CardDescription>Booking requests awaiting your response</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="space-y-3 pb-4 border-b last:border-0">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                    <div className="flex gap-2">
                      <Skeleton className="h-9 w-24" />
                      <Skeleton className="h-9 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : pendingBookings.length === 0 ? (
              <p className="text-sm text-muted-foreground">No pending booking requests</p>
            ) : (
              <div className="space-y-4">
                {pendingBookings.map((booking) => (
                  <div key={booking.id} className="space-y-3 pb-4 border-b border-[#282828] last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium text-[#f0f0f0]">{booking.clientName}</p>
                      <p className="text-sm text-muted-foreground">{booking.service}</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.requestedDate} at {booking.requestedTime}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(booking.id)}
                        className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDecline(booking.id)}
                        className="flex items-center gap-1 border-border hover:bg-accent text-[#f0f0f0]"
                      >
                        <XCircle className="h-4 w-4" />
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}