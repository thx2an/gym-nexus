<?php

use App\Http\Controllers\NguoiDungController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/check-token', [NguoiDungController::class, 'checkToken']);

Route::post('/dang-nhap', [NguoiDungController::class, 'dangNhap']); // Login
Route::post('/dang-ky', [NguoiDungController::class, 'dangKy']);
Route::post('/kich-hoat', [NguoiDungController::class, 'kichHoat']);
