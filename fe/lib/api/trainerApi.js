// Mock API for Personal Trainer operations
// Frontend-only implementation with realistic data shapes

// Mock data generators
const generateMockStats = () => ({
    todaySessions: 5,
    pendingBookings: 3,
    activeClients: 24,
    unreadMessages: 7,
});

const generateTodaySessions = () => [
    {
        id: "1",
        time: "09:00",
        clientName: "John Smith",
        service: "Personal Training",
        status: "confirmed",
    },
    {
        id: "2",
        time: "11:00",
        clientName: "Sarah Johnson",
        service: "Nutrition Consultation",
        status: "pending",
    },
    {
        id: "3",
        time: "14:00",
        clientName: "Mike Williams",
        service: "Group Session",
        status: "confirmed",
    },
];

const generatePendingBookings = () => [
    {
        id: "1",
        clientName: "Emily Davis",
        service: "Personal Training",
        requestedTime: "10:00",
        requestedDate: "2025-01-15",
    },
    {
        id: "2",
        clientName: "James Brown",
        service: "Fitness Assessment",
        requestedTime: "15:00",
        requestedDate: "2025-01-16",
    },
];

// API Functions
export const getTrainerDashboard = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
        stats: generateMockStats(),
        todaySessions: generateTodaySessions(),
        pendingBookings: generatePendingBookings(),
    };
};

export const getTrainerSchedule = async (startDate, endDate) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const schedule = [
        {
            id: "1",
            date: "2025-01-14",
            startTime: "09:00",
            endTime: "10:00",
            type: "booked",
            clientName: "John Smith",
            service: "Personal Training",
        },
        {
            id: "2",
            date: "2025-01-14",
            startTime: "11:00",
            endTime: "12:00",
            type: "available",
        },
        {
            id: "3",
            date: "2025-01-15",
            startTime: "10:00",
            endTime: "11:00",
            type: "available",
        },
    ];
    return schedule;
};

export const createAvailability = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, id: Date.now().toString() };
};

export const getBookings = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const bookings = [
        {
            id: "1",
            dateTime: "2025-01-15 10:00",
            clientName: "Emily Davis",
            service: "Personal Training",
            status: "pending",
        },
        {
            id: "2",
            dateTime: "2025-01-14 09:00",
            clientName: "John Smith",
            service: "Personal Training",
            status: "confirmed",
        },
        {
            id: "3",
            dateTime: "2025-01-13 14:00",
            clientName: "Sarah Johnson",
            service: "Nutrition Consultation",
            status: "confirmed",
        },
    ];
    return bookings;
};

export const updateBookingStatus = async (bookingId, status) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true };
};

export const getClients = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const clients = [
        {
            id: "1",
            name: "John Smith",
            email: "john@example.com",
            phone: "555-0101",
            joinDate: "2024-09-01",
            status: "active",
            sessionsCompleted: 24,
        },
        {
            id: "2",
            name: "Sarah Johnson",
            email: "sarah@example.com",
            phone: "555-0102",
            joinDate: "2024-10-15",
            status: "active",
            sessionsCompleted: 18,
        },
        {
            id: "3",
            name: "Mike Williams",
            email: "mike@example.com",
            phone: "555-0103",
            joinDate: "2024-11-01",
            status: "active",
            sessionsCompleted: 12,
        },
    ];
    return clients;
};

export const getClientDetail = async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const client = {
        id,
        name: "John Smith",
        email: "john@example.com",
        phone: "555-0101",
        joinDate: "2024-09-01",
        status: "active",
        sessionsCompleted: 24,
        age: 32,
        goals: ["Build muscle", "Improve endurance", "Lose 10 lbs"],
        medicalNotes: "No known conditions. Previous knee injury (2020) - fully recovered.",
        emergencyContact: "Jane Smith - 555-0199",
        progressMetrics: [
            {
                date: "2024-09-01",
                weight: 180,
                bodyFat: 22,
            },
            {
                date: "2024-10-01",
                weight: 177,
                bodyFat: 20,
            },
            {
                date: "2024-11-01",
                weight: 174,
                bodyFat: 18,
            },
            {
                date: "2024-12-01",
                weight: 172,
                bodyFat: 17,
            },
        ],
        sessionHistory: [
            {
                id: "1",
                date: "2024-12-10",
                service: "Personal Training",
                duration: 60,
                notes: "Great progress on squats. Increased weight.",
                status: "completed",
            },
            {
                id: "2",
                date: "2024-12-07",
                service: "Personal Training",
                duration: 60,
                notes: "Cardio focus day. Good endurance improvement.",
                status: "completed",
            },
        ],
        notes: "Highly motivated client. Responds well to challenging workouts.",
    };
    return client;
};

export const saveClientNotes = async (clientId, notes) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true };
};

export const getMessages = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const messages = [
        {
            id: "1",
            clientId: "1",
            clientName: "John Smith",
            lastMessage: "Thanks for the workout tips!",
            timestamp: "2025-01-14 15:30",
            unread: 0,
        },
        {
            id: "2",
            clientId: "2",
            clientName: "Sarah Johnson",
            lastMessage: "Can we reschedule tomorrow?",
            timestamp: "2025-01-14 14:15",
            unread: 2,
        },
    ];
    return messages;
};

export const getMessageThread = async (clientId) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const thread = [
        {
            id: "1",
            text: "Hi! I need to reschedule my session.",
            sender: "client",
            timestamp: "2025-01-14 14:00",
        },
        {
            id: "2",
            text: "Sure, what time works for you?",
            sender: "trainer",
            timestamp: "2025-01-14 14:05",
        },
        {
            id: "3",
            text: "Can we do 3pm instead of 2pm?",
            sender: "client",
            timestamp: "2025-01-14 14:15",
        },
    ];
    return thread;
};

export const sendMessage = async (clientId, message) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, id: Date.now().toString() };
};

export const getTrainerNotifications = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const notifications = [
        {
            id: "1",
            title: "New Booking Request",
            summary: "Emily Davis requested a session on Jan 15 at 10:00 AM",
            timestamp: "2025-01-14 16:00",
            read: false,
            linkUrl: "/personal_trainer/bookings",
        },
        {
            id: "2",
            title: "Session Completed",
            summary: "Your session with John Smith has been marked complete",
            timestamp: "2025-01-14 15:00",
            read: true,
        },
        {
            id: "3",
            title: "New Message",
            summary: "Sarah Johnson sent you a message",
            timestamp: "2025-01-14 14:15",
            read: false,
            linkUrl: "/personal_trainer/messages",
        },
    ];
    return notifications;
};

export const markAllTrainerRead = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true };
};
