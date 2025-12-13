<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\NguoiDungController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // route có sẵn của Laravel (giữ cũng được)
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

Route::get('/dang-nhap/getdata', [NguoiDungController::class, 'getData']);
