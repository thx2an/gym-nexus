<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProfilePT;

class ProfilePTController extends Controller
{
    public function index()
    {
        // 1. Fetch Request: Get all Users who have Role ID 3 (PT)
        // Adjust the query based on Many-to-Many relationship
        $usersWithRolePT = \App\Models\NguoiDung::whereHas('vaiTros', function ($q) {
            $q->where('vai_tros.role_id', 3);
        })->get();

        // 2. Sync Logic: Ensure each of these users has a ProfilePT
        foreach ($usersWithRolePT as $user) {
            \App\Models\ProfilePT::firstOrCreate(
                ['user_id' => $user->user_id],
                [
                    'specialization' => 'General Fitness', // Default
                    'bio' => 'Welcome to my training sessions!', // Default
                    'experience_years' => 1
                ]
            );
        }

        // 3. Return Logic: Get all PT profiles with user info (now includes the newly created ones)
        $trainers = ProfilePT::with('user:user_id,full_name,email,phone')->get();

        return response()->json([
            'success' => true,
            'data' => $trainers
        ]);
    }
    public function store(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'specialization' => 'required|string|max:200',
            'bio' => 'required|string',
            'experience_years' => 'required|integer|min:0',
        ]);

        $profile = ProfilePT::updateOrCreate(
            ['user_id' => $user->user_id],
            [
                'specialization' => $data['specialization'],
                'bio' => $data['bio'],
                'experience_years' => $data['experience_years']
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'data' => $profile
        ]);
    }
}
