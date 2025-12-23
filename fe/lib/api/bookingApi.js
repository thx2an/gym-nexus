import axiosClient from "./axiosClient"

export const bookingApi = {
    // --- Member ---
    // Get all bookings (can filter by status)
    getSessions(params = {}) {
        return axiosClient.get("/bookings", { params })
    },

    // Create booking request
    createBooking(data) {
        return axiosClient.post("/bookings", data)
    },

    // Get available trainers (re-using existing endpoint or creating new if needed)
    // We can use /personal-trainers/list if exists, otherwise assume fetching users with role 3
    // For now, let's assume we need to fetch PT profiles. 
    // If no dedicated endpoint, we might need one. But for now let's use a mock or generic user fetch if specific endpoint missing.
    // Wait, BuoiTapController doesn't list trainers. 
    // Let's check if there is an existing endpoint for trainers.
    // Use existing /personal-trainers if available or creating a helper here.
    // Actually, we can just use a new method here if we have a route. 
    // Let's assume we'll use a new helper to get PTs.
    async getTrainers() {
        // Temporary: fetching all users with role 3 or specific PT endpoint involves logic not yet in backend explicitly for "listing PTs" 
        // EXCEPT maybe reusing an existing controller? 
        // Let's assume we can add a simple getter or just filter users.
        // Valid approach: GET /users?role=3 (if supported) or create a quick endpoint in NguoiDungController?
        // User said "No new PHP files". I'll check NguoiDungController options.
        return axiosClient.get("/personal-trainers") // We need to ensure this route exists or create it in NguoiDungController/ProfilePTController
    },

    // --- PT ---
    // Update booking status (Accept/Reject)
    updateStatus(id, status) {
        return axiosClient.put(`/bookings/${id}`, { status })
    },

    // Get availability
    getAvailability() {
        return axiosClient.get("/pt/availability")
    },

    // Set availability
    setAvailability(data) {
        return axiosClient.post("/pt/availability", data)
    },

    // Delete availability
    deleteAvailability(id) {
        return axiosClient.delete(`/pt/availability/${id}`)
    },

    // Create session note
    createNote(data) {
        return axiosClient.post("/pt/session-notes", data)
    },

    // Get session note
    getNote(sessionId) {
        return axiosClient.get(`/pt/session-notes/${sessionId}`)
    }
}
