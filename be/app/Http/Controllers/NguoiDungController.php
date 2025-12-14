<?php

namespace App\Http\Controllers;

use App\Mail\MasterMail;
use App\Models\NguoiDung;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class NguoiDungController extends Controller
{
    public function checkToken(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Token is not valid or session has expired.',
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
                'user_id' => $user->user_id,
                'full_name' => $user->full_name,
                'idChucVu' => $idChucVu,
                'email' => $user->email,
                // Add other fields if needed for localStorage
            ]
        ]);
    }

    public function dangNhap(Request $request)
    {
        // 1. Tìm user bằng email
        $user = NguoiDung::where('email', $request->email)->first();

        // 2. Chứa kiểm tra user tồn tại VÀ mật khẩu trùng khớp
        if (!$user || !Hash::check($request->password, $user->password_hash)) {
            return response()->json([
                'status' => false,
                'message' => 'Information is not correct.'
            ], 401);
        }

        // 3. Kiểm tra trạng thái status (string or enum)
        if ($user->status === 'inactive') {
            return response()->json([
                'status' => false,
                'message' => 'Account has not been activated.'
            ], 403);
        }

        if ($user->status === 'locked') {
            return response()->json([
                'status' => false,
                'message' => 'This account has been blocked.'
            ], 403);
        }

        // Trạng thái active -> Tạo token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Lấy Role ID
        $user->load('vaiTros');
        $idChucVu = $user->vaiTros->first()?->role_id;

        return response()->json([
            'status' => true,
            'message' => 'Login successfully',
            'token' => $token,
            'user' => [
                'user_id' => $user->user_id,
                'full_name' => $user->full_name,
                'idChucVu' => $idChucVu,
                'email' => $user->email,
            ]
        ]);
    }

    // Đăng ký người dùng
    public function dangKy(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:nguoi_dungs,email',
            'full_name' => 'required',
            'password' => 'required|min:8',
            'phone' => 'unique:nguoi_dungs,phone',
            'date_of_birth' => 'required',
            'gender' => 'required',
        ]);

        $key = Str::uuid();
        $user = NguoiDung::create([
            'full_name' => $request->full_name,
            'email'    => $request->email,
            'password_hash' => $request->password,
            'phone' => $request->phone,
            'date_of_birth' => $request->date_of_birth,
            'gender' => $request->gender,
            'status' => 'inactive',
            'hash_active'   => $key,
        ]);

        // Assign default role (Member = 4)
        $user->vaiTros()->attach(4);

        $tieu_de = "Activate account - GymNexus";
        $view = "kichHoatTK";
        $noi_dung['full_name'] = $user->full_name;
        $noi_dung['link'] = "http://localhost:5173/kich-hoat/" . $key;
        try {
            Mail::to($request->email)->send(new MasterMail($tieu_de, $view, $noi_dung));
        } catch (\Throwable $e) {
            // Nếu gửi mail thất bại, rollback user để tránh trùng email/phone khi đăng ký lại
            $user->vaiTros()->detach();
            $user->delete();

            return response()->json([
                'status' => false,
                'message' => 'Cant send a verify email. Please try again!',
                'error' => $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'status' => true,
            'message' => 'Register successfully!',
            'data' => $user
        ]);
    }

    // kích hoạt người dùng
    public function kichHoat(Request $request)
    {
        $user = NguoiDung::where('hash_active', $request->hash_active)->update([
            'status' => 'active',
            'hash_active' => null
        ]);
        return response()->json([
            'status'    =>  true,
            'message'   =>  'Activate account successfully!'
        ]);
    }
}
