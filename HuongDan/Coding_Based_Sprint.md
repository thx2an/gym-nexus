# Coding Based Sprint Plan - GymNexus

This document maps the Project Schedule to specific source code files, designed for parallel development between Backend (3 Devs) and Frontend.

**Tech Stack**: Frontend (ReactJS/Vite + Tailwind), Backend (NodeJS/Express), Database (SQL Server 2022).

---

## 2. Development Phase

### 2.1 Sprint 1: Foundation & Admin Setup (17/09 - 05/10)
**Goal**: Core system setup, Branch/Package management, Staff accounts, and User Authentication.

#### Database (SQL Scripts)
- `database/schema.sql` (Tables: `users`, `roles`, `branches`, `membership_packages`, `user_roles`)
- `database/seeders/initial_data.sql` (Default Roles)

#### Backend (Parallel Work)
*Devs can mock other modules while working.*

- **BE Dev 1 (Auth & User Profile)**
  - `src/config/db.js`
  - `src/middleware/authMiddleware.js`
  - `src/controllers/authController.js`
  - `src/routes/authRoutes.js`
  - `src/services/authService.js`
  - `src/controllers/userController.js`
  - `src/routes/userRoutes.js`

- **BE Dev 2 (Admin Core - Branches & Packages)**
  - `src/controllers/branchController.js`
  - `src/controllers/packageController.js`
  - `src/routes/adminRoutes.js`

- **BE Dev 3 (Staff & Notifications)**
  - `src/controllers/staffController.js`
  - `src/controllers/notificationController.js`
  - `src/models/Notification.js`

#### Frontend (Parallel Implementation)
- **Setup**: `src/App.jsx`, `src/context/AuthContext.jsx`, `src/api/axiosClient.js`
- **Auth/User**: `src/pages/auth/LoginPage.jsx`, `src/pages/auth/RegisterPage.jsx`, `src/pages/user/UserProfile.jsx`
- **Admin Pages**: `src/pages/admin/BranchManagement.jsx`, `src/pages/admin/PackageManagement.jsx`, `src/pages/admin/StaffManagement.jsx`
- **Components**: `src/components/common/Sidebar.jsx`, `src/components/common/Navbar.jsx`, `src/pages/Notifications.jsx`

---

### 2.2 Sprint 2: Sales & Payments (06/10 - 26/10)
**Goal**: Membership Purchasing, Payment Gateway Integration, Invoicing.

#### Database
- Tables: `memberships`, `payments`, `invoices`, `refund_requests`

#### Backend (Parallel Work)

- **BE Dev 1 (Membership Logic)**
  - `src/controllers/membershipController.js` (purchase, renew, getStatus)
  - `src/routes/membershipRoutes.js`

- **BE Dev 2 (Payment Gateway)**
  - `src/controllers/paymentController.js` (PayOS/Offline/Refund)
  - `src/services/payOSService.js`
  - `src/routes/paymentRoutes.js`

- **BE Dev 3 (Invoices & History)**
  - `src/controllers/invoiceController.js`
  - `src/utils/pdfGenerator.js`

#### Frontend (Parallel Implementation)
- **Member Pages**: `src/pages/member/PackagesList.jsx`, `src/pages/member/MyMembership.jsx`
- **Payment Pages**: `src/pages/payment/CheckoutPage.jsx`, `src/pages/payment/PaymentSuccess.jsx`, `src/pages/payment/InvoiceView.jsx`
- **Components**: `src/components/membership/PackageCard.jsx`, `src/components/payment/TransactionHistoryTable.jsx`

---

### 2.3 Sprint 3: PT Booking & Operations (27/10 - 16/11)
**Goal**: PT Scheduling, Booking, QR Check-in, Training Progress.

#### Database
- Tables: `trainer_profiles`, `trainer_availability`, `training_sessions`, `session_qr_tokens`, `checkins`, `session_notes`, `progress_records`

#### Backend (Parallel Work)

- **BE Dev 1 (Trainer Management)**
  - `src/controllers/trainerController.js` (Availability/Schedule)

- **BE Dev 2 (Booking System)**
  - `src/controllers/bookingController.js` (Book/Cancel/Approve)
  - `src/routes/bookingRoutes.js`

- **BE Dev 3 (Session Operations)**
  - `src/controllers/sessionController.js` (QR Generate/Scan)
  - `src/controllers/progressController.js` (Metrics)

#### Frontend (Parallel Implementation)
- **Booking Pages**: `src/pages/member/TrainerList.jsx`, `src/pages/member/BookingCalendar.jsx`
- **PT Pages**: `src/pages/pt/PTSchedule.jsx`, `src/pages/pt/SessionManagement.jsx`
- **Member Page**: `src/pages/member/MyProgress.jsx`
- **Components**: `src/components/session/QRCodeGenerator.jsx`, `src/components/session/QRScanner.jsx`

---

### 2.4 Sprint 4: AI, Support & Reports (17/11 - 08/12)
**Goal**: AI Integration, Support System, and Manager Reports.

#### Database
- Tables: `ai_plans`, `support_tickets`, `chat_messages`, `reports`

#### Backend (Parallel Work)

- **BE Dev 1 (AI Services)**
  - `src/services/geminiService.js`
  - `src/controllers/aiController.js`

- **BE Dev 2 (Support System)**
  - `src/controllers/ticketController.js`
  - `src/controllers/chatController.js`
  - `src/routes/supportRoutes.js`

- **BE Dev 3 (Reports)**
  - `src/controllers/reportController.js` (Original 3 Reports)

#### Frontend (Parallel Implementation)
- **AI Pages**: `src/pages/ai/AIWorkoutGenerator.jsx`, `src/pages/ai/PoseAnalyzer.jsx`
- **Support Pages**: `src/pages/support/TicketList.jsx`, `src/pages/support/LiveChat.jsx`
- **Admin Page**: `src/pages/admin/ReportsDashboard.jsx`

---

## 3. Final Testing & Stabilization (09/12 - 15/12)
- **Integration Tests**: `tests/integration/`
- UAT & Deployment.
