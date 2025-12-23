<?php

use App\Http\Controllers\NguoiDungController;
use App\Http\Controllers\BuoiTapController;
use App\Http\Controllers\LichLamViecPTController;
use App\Http\Controllers\NoteBuoiTapController;
use App\Http\Controllers\ProfilePTController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', [NguoiDungController::class, 'me'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->post('/user/update', [NguoiDungController::class, 'updateProfile']);
Route::middleware('auth:sanctum')->post('/member/profile', [NguoiDungController::class, 'createMemberProfile']);
Route::middleware('auth:sanctum')->post('/pt/profile', [ProfilePTController::class, 'store']); // New Route

Route::middleware('auth:sanctum')->get('/check-token', [NguoiDungController::class, 'checkToken']);

Route::post('/dang-nhap', [NguoiDungController::class, 'dangNhap']); // Login
Route::post('/dang-ky', [NguoiDungController::class, 'dangKy']);
Route::post('/kich-hoat', [NguoiDungController::class, 'kichHoat']);

use App\Http\Controllers\GoiTapController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\TicketNhanVienController;

Route::get('/goi-tap', [GoiTapController::class, 'index']);
Route::get('/personal-trainers', [ProfilePTController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/membership', [GoiTapController::class, 'currentMembership']);
    Route::post('/payment/confirm', [GoiTapController::class, 'confirmPayment']);

    // Chat Routes
    Route::get('/chat/contacts', [ChatController::class, 'getContacts']);
    Route::get('/chat/messages/{chatId?}', [ChatController::class, 'getMessages']);
    Route::post('/chat/send', [ChatController::class, 'sendMessage']);

    // Payment History & Invoice
    Route::get('/user/payment/history', [PaymentController::class, 'getHistory']);
    Route::get('/user/invoice/{id}', [PaymentController::class, 'getInvoice']);

    // Support Tickets (Member)
    Route::get('/support/tickets', [TicketNhanVienController::class, 'index']);
    Route::post('/support/tickets', [TicketNhanVienController::class, 'store']);
    Route::get('/support/tickets/{id}', [TicketNhanVienController::class, 'show']);
    Route::post('/support/tickets/{id}/reply', [TicketNhanVienController::class, 'memberReply']);
    Route::post('/support/tickets/{id}/close', [TicketNhanVienController::class, 'memberClose']);

    // Support Tickets (Staff)
    Route::get('/support/staff/tickets', [TicketNhanVienController::class, 'staffIndex']);
    Route::get('/support/staff/tickets/{id}', [TicketNhanVienController::class, 'staffShow']);
    Route::post('/support/staff/tickets/{id}/reply', [TicketNhanVienController::class, 'staffReply']);
    Route::post('/support/staff/tickets/{id}/close', [TicketNhanVienController::class, 'staffClose']);

    // Reports
    Route::get('/reports/revenue', [ReportController::class, 'revenue']);

    // Booking & Schedule
    Route::get('/bookings', [BuoiTapController::class, 'index']); // List (Member/PT)
    Route::post('/bookings', [BuoiTapController::class, 'store']); // Create Request
    Route::put('/bookings/{id}', [BuoiTapController::class, 'update']); // Update Status

    Route::get('/pt/availability', [LichLamViecPTController::class, 'index']);
    Route::post('/pt/availability', [LichLamViecPTController::class, 'store']);
    Route::delete('/pt/availability/{id}', [LichLamViecPTController::class, 'destroy']);

    Route::post('/pt/session-notes', [NoteBuoiTapController::class, 'store']);
    Route::get('/pt/session-notes/{sessionId}', [NoteBuoiTapController::class, 'show']);
});

use App\Http\Controllers\PhanTichRuiRoController;

Route::post('/ai/injury-risk', [PhanTichRuiRoController::class, 'calculate']);

use App\Http\Controllers\ManagerController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/manager/stats', [ManagerController::class, 'getStats']);
    Route::get('/manager/packages', [ManagerController::class, 'getPackages']);
    Route::post('/manager/packages', [ManagerController::class, 'storePackage']);
});
