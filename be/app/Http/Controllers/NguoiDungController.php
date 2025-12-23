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

        // Check profile completeness based on role
        $hasProfile = false;
        if ($idChucVu == 3) { // PT
            $pt = \App\Models\ProfilePT::where('user_id', $user->user_id)->first();
            // User requested check for: specialization, bio, experience_years
            $hasProfile = $pt && !empty($pt->specialization) && !empty($pt->bio) && !is_null($pt->experience_years);
        } else { // Member (Default check)
            $mem = $user->memberProfile;
            // User requested check for: current_height, current_weight, fitness_goal
            $hasProfile = $mem && !empty($mem->current_height) && !empty($mem->current_weight) && !empty($mem->fitness_goal);
        }

        return response()->json([
            'status' => true,
            'user' => [
                'user_id' => $user->user_id,
                'full_name' => $user->full_name,
                'idChucVu' => $idChucVu,
                'email' => $user->email,
                'phone' => $user->phone,
                'has_profile' => $hasProfile,
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

        // Check profile completeness
        $hasProfile = false;
        if ($idChucVu == 3) {
            $pt = \App\Models\ProfilePT::where('user_id', $user->user_id)->first();
            $hasProfile = $pt && !empty($pt->specialization) && !empty($pt->bio) && !is_null($pt->experience_years);
        } else {
            $mem = $user->memberProfile()->first();
            $hasProfile = $mem && !empty($mem->current_height) && !empty($mem->current_weight) && !empty($mem->fitness_goal);
        }

        return response()->json([
            'status' => true,
            'message' => 'Login successfully',
            'token' => $token,
            'user' => [
                'user_id' => $user->user_id,
                'full_name' => $user->full_name,
                'idChucVu' => $idChucVu,
                'email' => $user->email,
                'phone' => $user->phone,
                'has_profile' => $hasProfile,
            ]
        ]);
    }

    // Đăng ký người dùng
    public function dangKy(Request $request)
    {
        $request->validate([
            'full_name' => [
                'required',
                'string',
                'min:2',
                'max:50',
                'regex:/^(?=.{2,50}$)[\p{L}]+(?:[ \'-][\p{L}]+)*$/u'
            ],
            'email' => 'required|email|max:254|unique:nguoi_dungs,email',
            'password' => 'required|string|min:8|max:64',
            'phone' => [
                'required',
                'string',
                'unique:nguoi_dungs,phone',
                'regex:/^(?:0\d{9}|\+84\d{9})$/'
            ],
            'date_of_birth' => 'required|date|before:today|after:-90 years|before:-12 years',
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
            'status' => 'active', // Auto-active
            'hash_active'   => null, // No activation needed
        ]);

        // Assign default role (Member = 4)
        $user->vaiTros()->attach(4);

        /* 
        // Disabled Email Verification for Auto-Active
        $tieu_de = "Activate account - GymNexus";
        $view = "kichHoatTK";
        $noi_dung['full_name'] = $user->full_name;
        $noi_dung['link'] = "http://localhost:5173/kich-hoat/" . $key;
        try {
            Mail::to($request->email)->send(new MasterMail($tieu_de, $view, $noi_dung));
        } catch (\Throwable $e) {
            // ...
        } 
        */

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

    public function updateProfile(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['status' => false, 'message' => 'Unauthorized'], 401);
        }

        $data = $request->validate([
            'full_name' => [
                'required',
                'string',
                'min:2',
                'max:50',
                'regex:/^(?=.{2,50}$)[\p{L}]+(?:[ \'-][\p{L}]+)*$/u'
            ],
            'phone' => [
                'required',
                'string',
                'max:20',
                'unique:nguoi_dungs,phone,' . $user->user_id . ',user_id',
                'regex:/^(?:0\d{9}|\+84\d{9})$/'
            ],
            'gender' => 'nullable|string|in:Male,Female,Other',
            'date_of_birth' => 'nullable|date|before:today|after:-90 years|before:-12 years',
        ]);

        $user->update([
            'full_name' => $data['full_name'],
            'phone' => $data['phone'],
            'gender' => $data['gender'],
            'date_of_birth' => $data['date_of_birth'],
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);
    }
    public function createMemberProfile(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['status' => false, 'message' => 'Unauthorized'], 401);
        }

        // Validate
        $data = $request->validate([
            'current_height' => 'required|numeric|min:100|max:250',
            'current_weight' => 'required|numeric|min:30|max:300',
            'fitness_goal' => 'required|string|max:255',
            'medical_history' => 'nullable|string',
        ]);

        // Check if exists
        if ($user->memberProfile()->exists()) {
            return response()->json(['status' => false, 'message' => 'Profile already exists']);
        }

        // Create
        $profile = \App\Models\MemberProfile::create([
            'user_id' => $user->user_id,
            'current_height' => $data['current_height'],
            'current_weight' => $data['current_weight'],
            'fitness_goal' => $data['fitness_goal'],
            'medical_history' => $data['medical_history'] ?? null,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Member profile created successfully',
            'data' => $profile
        ]);
    }
    public function me(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user->load('vaiTros');
        $idChucVu = $user->vaiTros->first()?->role_id;

        // Check profile completeness
        $hasProfile = false;
        if ($idChucVu == 3) { // PT
            $pt = \App\Models\ProfilePT::where('user_id', $user->user_id)->first();
            // Strict check: non-empty specialization, bio, and non-null experience
            $hasProfile = $pt && !empty($pt->specialization) && !empty($pt->bio) && !is_null($pt->experience_years);
        } else { // Member
            $mem = $user->memberProfile()->first();
            // Strict check: non-empty height, weight, goal
            $hasProfile = $mem && !empty($mem->current_height) && !empty($mem->current_weight) && !empty($mem->fitness_goal);
        }

        // Append has_profile to user object
        $user->has_profile = $hasProfile;
        $user->idChucVu = $idChucVu; // Ensure role is available if needed

        return $user;
    }
}
