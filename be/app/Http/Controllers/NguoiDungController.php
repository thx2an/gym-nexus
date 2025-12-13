<?php

namespace App\Http\Controllers;

use App\Models\NguoiDung;
use Illuminate\Http\Request;

class NguoiDungController extends Controller
{
    public function checkToken(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Token không hợp lệ hoặc phiên đăng nhập đã hết hạn',
            ], 401);
        }

        // Eager load roles to get access
        $user->load('vaiTros');

        // Get the first role ID (assuming single role per user priority or just first one)
        // If user has no role, id_chuc_vu will be null
        $idChucVu = $user->vaiTros->first()?->role_id;

        return response()->json([
            'status' => true,
            'user' => [
                'id' => $user->user_id,
                'ho_ten' => $user->full_name,
                'id_chuc_vu' => $idChucVu,
                'email' => $user->email,
                // Add other fields if needed for localStorage
            ]
        ]);
    }
}
