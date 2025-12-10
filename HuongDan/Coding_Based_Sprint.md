# Coding Based Sprint Plan - GymNexus

This document maps the Project Schedule and PBIs to specific source code files and database tables.
**Tech Stack**: Frontend (ReactJS/Vite + Tailwind), Backend (NodeJS/Express), Database (SQL Server 2022).

---

## 2. Development Phase

### 2.1 Sprint 1: Foundation & Admin Setup (17/09 - 05/10)
**Goal**: Core system setup, Branch/Package management, Staff accounts, and User Authentication.

#### Database (SQL Scripts)
- `database/schema.sql` (Initial Schema Creation - Tables: `users`, `roles`, `branches`, `membership_packages`, `user_roles`)
- `database/seeders/initial_data.sql` (Default Roles: Admin, Manager, PT, Member)

#### Backend (NodeJS/Express)
- **Config**: 
  - `src/config/db.js` (SQL Server connection)
  - `src/middleware/authMiddleware.js` (JWT Verification)
- **Auth Module** (`[PBI-01]`, `[PBI-02]`):
  - `src/controllers/authController.js` (register, login, logout)
  - `src/routes/authRoutes.js`
  - `src/services/authService.js` (Business logic)
- **User/Profile Module** (`[PBI-03]`, `[PBI-37]`):
  - `src/controllers/userController.js` (updateProfile)
  - `src/controllers/staffController.js` (createStaff)
  - `src/routes/userRoutes.js`
- **Branch & Package Module** (`[PBI-31]`, `[PBI-32]`):
  - `src/controllers/branchController.js`
  - `src/controllers/packageController.js`
  - `src/routes/adminRoutes.js`
- **Notification** (`[PBI-04]`):
  - `src/controllers/notificationController.js`
  - `src/models/Notification.js` (if using ORM or DB helper)

#### Frontend (ReactJS + Tailwind)
- **Setup**:
  - `src/App.jsx` (Routing setup)
  - `src/context/AuthContext.jsx` (Global Auth State)
  - `src/api/axiosClient.js` (API configuration)
- **Pages**:
  - `src/pages/auth/LoginPage.jsx`
  - `src/pages/auth/RegisterPage.jsx`
  - `src/pages/admin/BranchManagement.jsx`
  - `src/pages/admin/PackageManagement.jsx`
  - `src/pages/admin/StaffManagement.jsx`
  - `src/pages/user/UserProfile.jsx`
  - `src/pages/Notifications.jsx`
- **Components**:
  - `src/components/common/Sidebar.jsx`
  - `src/components/common/Navbar.jsx`
  - `src/components/auth/LoginForm.jsx`
  - `src/components/admin/BranchTable.jsx`

---

### 2.2 Sprint 2: Sales & Payments (06/10 - 26/10)
**Goal**: Membership Purchasing, Payment Gateway Integration, Invoicing.

#### Database
- Tables: `memberships`, `payments`, `invoices`, `refund_requests`

#### Backend
- **Membership Module** (`[PBI-05]`, `[PBI-06]`, `[PBI-07]`):
  - `src/controllers/membershipController.js` (purchase, renew, getStatus)
  - `src/routes/membershipRoutes.js`
- **Payment Module** (`[PBI-43]`, `[PBI-44]`, `[PBI-08]`, `[PBI-33]`):
  - `src/controllers/paymentController.js` (processPayOS, confirmOffline, refund)
  - `src/services/payOSService.js` (3rd party integration)
  - `src/routes/paymentRoutes.js`
- **Invoice Module** (`[PBI-09]`):
  - `src/controllers/invoiceController.js` (generatePDF)
  - `src/utils/pdfGenerator.js`

#### Frontend
- **Pages**:
  - `src/pages/member/PackagesList.jsx`
  - `src/pages/member/MyMembership.jsx` (Status & History)
  - `src/pages/payment/CheckoutPage.jsx`
  - `src/pages/payment/PaymentSuccess.jsx`
  - `src/pages/payment/InvoiceView.jsx`
- **Components**:
  - `src/components/membership/PackageCard.jsx`
  - `src/components/payment/TransactionHistoryTable.jsx`
  - `src/components/payment/RefundModal.jsx`

---

### 2.3 Sprint 3: PT Booking & Operations (27/10 - 16/11)
**Goal**: PT Scheduling, Booking, QR Check-in, Training Progress.

#### Database
- Tables: `trainer_profiles`, `trainer_availability`, `training_sessions`, `session_qr_tokens`, `checkins`, `session_notes`, `progress_records`

#### Backend
- **PT Module** (`[PBI-24]`, `[PBI-25]`):
  - `src/controllers/trainerController.js` (setAvailability, getSchedule)
- **Booking Module** (`[PBI-10]`, `[PBI-11]`, `[PBI-12]`, `[PBI-13]`, `[PBI-26]`):
  - `src/controllers/bookingController.js` (bookSession, cancel, reschedule, approve)
  - `src/routes/bookingRoutes.js`
- **Session Operations** (`[PBI-14]`, `[PBI-15]`, `[PBI-27]`, `[PBI-28]`):
  - `src/controllers/sessionController.js` (generateQR, validateQR, addNotes)
  - `src/controllers/progressController.js` (logMetrics)

#### Frontend
- **Pages**:
  - `src/pages/member/TrainerList.jsx`
  - `src/pages/member/BookingCalendar.jsx`
  - `src/pages/pt/PTSchedule.jsx` (Manage Availability)
  - `src/pages/pt/SessionManagement.jsx` (QR Scan & Notes)
  - `src/pages/member/MyProgress.jsx`
- **Components**:
  - `src/components/booking/TimeSlotPicker.jsx`
  - `src/components/session/QRCodeGenerator.jsx`
  - `src/components/session/QRScanner.jsx`
  - `src/components/charts/ProgressChart.jsx` (Chart.js/Recharts)

---

### 2.4 Sprint 4: AI, Support & Reports (17/11 - 08/12)
**Goal**: AI Integration (Gemini), Support System (Tickets/Chat), and Manager Reports.

#### Database
- Tables: `ai_workout_plans`, `ai_nutrition_plans`, `pose_sessions`, `injury_risk_analyses`, `support_tickets`, `ticket_messages`, `chat_sessions`, `chat_messages`, `reports`

#### Backend
- **AI Service** (`[PBI-17]`, `[PBI-18]`, `[PBI-19]`, `[PBI-20]`):
  - `src/services/geminiService.js` (Prompt engineering & API calls)
  - `src/controllers/aiController.js` (generateWorkout, analyzePose)
- **Support Module** (`[PBI-21]` to `[PBI-23]`, `[PBI-38]` to `[PBI-42]`):
  - `src/controllers/ticketController.js`
  - `src/controllers/chatController.js` (Socket.io handlers for real-time)
  - `src/routes/supportRoutes.js`
- **Report Module** (`[PBI-34]`, `[PBI-35]`, `[PBI-36]`):
  - `src/controllers/reportController.js` (Aggregated SQL queries)

#### Frontend
- **Pages**:
  - `src/pages/ai/AIWorkoutGenerator.jsx`
  - `src/pages/ai/PoseAnalyzer.jsx` (Camera integration)
  - `src/pages/support/TicketList.jsx`
  - `src/pages/support/LiveChat.jsx`
  - `src/pages/admin/ReportsDashboard.jsx`
- **Components**:
  - `src/components/ai/PoseOverlay.jsx` (Canvas for skeleton drawing)
  - `src/components/support/ChatWindow.jsx`
  - `src/components/admin/RevenueChart.jsx`

---

## 3. Final Testing & Stabilization (09/12 - 15/12)
- **Integration Tests**: `tests/integration/`
- **UAT**: Deployment scripts for Production.
