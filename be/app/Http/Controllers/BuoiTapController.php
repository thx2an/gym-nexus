<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BuoiTap;
use App\Models\LichLamViecPT;
use App\Models\ProfilePT;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class BuoiTapController extends Controller
{
    // List sessions (My Schedule or Requests)
    public function index(Request $request)
    {
        $user = $request->user();
        $query = BuoiTap::with(['member', 'profilePT.user', 'chiNhanh']);

        // Check if user has role 3 (PT) by loading relationships or querying pivot
        // NguoiDung has BelongsToMany vaiTros
        $isPT = $user->vaiTros()->where('vai_tros.role_id', 3)->exists();

        if ($isPT) { // PT
            $trainerProfile = ProfilePT::where('user_id', $user->user_id)->first();
            if (!$trainerProfile) return response()->json(['data' => []]);
            $query->where('trainer_id', $trainerProfile->trainer_id);
        } else { // Member
            $query->where('member_id', $user->user_id);
        }

        // #region agent log
        $debugLogPath = storage_path('logs/debug.log');
        $logPayload = json_encode(['location'=>'BuoiTapController.php:32','message'=>'Status filter input','data'=>['status'=>$request->status,'hasStatus'=>$request->has('status'),'rawInput'=>$request->input('status')],'timestamp'=>round(microtime(true)*1000),'sessionId'=>'debug-session','hypothesisId'=>'A','runId'=>'post-fix']);file_put_contents($debugLogPath,$logPayload."\n",FILE_APPEND);
        // #endregion

        // FIX: Validate status input to prevent invalid values
        if ($request->has('status')) {
            $validStatuses = ['pending', 'confirmed', 'canceled', 'completed'];
            if (in_array($request->status, $validStatuses)) {
                $query->where('status', $request->status);
            }
        }

        // Sort by start_time
        $query->orderBy('start_time', 'asc');

        return response()->json([
            'success' => true,
            'data' => $query->get()
        ]);
    }

    // Create Booking Request
    public function store(Request $request)
    {
        $request->validate([
            'trainer_id' => 'required|exists:profile_p_t_s,trainer_id',
            'start_time' => 'required|date|after:now',
            'branch_id' => 'required|exists:chi_nhanhs,branch_id',
            // Default duration 1 hour if not specified
        ]);

        $user = $request->user();
        $startTime = Carbon::parse($request->start_time);
        $endTime = $startTime->copy()->addHour(); // 1 hour session

        // 1. Time Restriction: Not 20:00 (8PM) - 04:00 (4AM)
        $hour = $startTime->hour;
        if ($hour >= 20 || $hour < 4) {
            return response()->json([
                'success' => false,
                'message' => 'Booking not allowed between 8 PM and 4 AM.'
            ], 400);
        }

        // 2. Auto Accept Logic
        $status = 'pending';
        $dayOfWeek = $startTime->dayOfWeek; // 0 (Sunday) - 6 (Saturday)

        // Check availability
        $isAvailable = LichLamViecPT::where('trainer_id', $request->trainer_id)
            ->where('is_blocked', false)
            ->where(function ($q) use ($startTime, $dayOfWeek) {
                // Check specific date
                $q->where(function ($sub) use ($startTime) {
                    $sub->whereDate('date', $startTime->toDateString())
                        ->whereTime('start_time', '<=', $startTime->toTimeString())
                        ->whereTime('end_time', '>=', $startTime->copy()->addHour()->toTimeString());
                })
                    // OR Check recurring
                    ->orWhere(function ($sub) use ($dayOfWeek, $startTime) {
                        $sub->where('is_recurring', true)
                            ->where('day_of_week', $dayOfWeek)
                            ->whereTime('start_time', '<=', $startTime->toTimeString())
                            ->whereTime('end_time', '>=', $startTime->copy()->addHour()->toTimeString());
                    });
            })
            ->exists();

        if ($isAvailable) {
            $status = 'confirmed';
        }

        $buoiTap = BuoiTap::create([
            'member_id' => $user->user_id,
            'trainer_id' => $request->trainer_id,
            'branch_id' => $request->branch_id,
            'start_time' => $startTime,
            'end_time' => $endTime,
            'status' => $status,
            'notes' => $request->notes // User note if any
        ]);

        return response()->json([
            'success' => true,
            'message' => $status === 'confirmed' ? 'Booking confirmed automatically!' : 'Request sent to PT.',
            'data' => $buoiTap
        ]);
    }

    // Accept/Reject Request
    public function update(Request $request, $id)
    {
        $session = BuoiTap::find($id);
        if (!$session) {
            return response()->json(['success' => false, 'message' => 'Session not found'], 404);
        }

        $request->validate([
            'status' => 'required|in:confirmed,canceled,completed'
        ]);

        $session->update([
            'status' => $request->status
        ]);

        return response()->json([
            'success' => true,
            'data' => $session
        ]);
    }
}
