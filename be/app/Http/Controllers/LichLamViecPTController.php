<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LichLamViecPT;
use App\Models\ProfilePT;

class LichLamViecPTController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $trainerProfile = ProfilePT::where('user_id', $user->user_id)->first();

        if (!$trainerProfile) {
            return response()->json(['success' => false, 'message' => 'Trainer profile not found'], 404);
        }

        $schedule = LichLamViecPT::where('trainer_id', $trainerProfile->trainer_id)->get();

        return response()->json([
            'success' => true,
            'data' => $schedule
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $trainerProfile = ProfilePT::where('user_id', $user->user_id)->first();

        if (!$trainerProfile) {
            return response()->json(['success' => false, 'message' => 'Trainer profile not found'], 404);
        }

        $request->validate([
            'start_time' => 'required',
            'end_time' => 'required',
            'branch_id' => 'required|exists:chi_nhanhs,branch_id',
            'is_recurring' => 'boolean',
            'day_of_week' => 'required_if:is_recurring,true',
            'date' => 'required_if:is_recurring,false',
        ]);

        $availability = LichLamViecPT::create([
            'trainer_id' => $trainerProfile->trainer_id,
            'branch_id' => $request->branch_id,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'is_recurring' => $request->boolean('is_recurring'),
            'day_of_week' => $request->day_of_week,
            'date' => $request->date,
            'is_blocked' => false
        ]);

        return response()->json([
            'success' => true,
            'data' => $availability
        ]);
    }

    // Allow deleting availability
    public function destroy(Request $request, $id)
    {
        // #region agent log
        $debugLogPath = storage_path('logs/debug.log');
        $user = $request->user();
        $slot = LichLamViecPT::find($id);
        $logPayload = json_encode(['location'=>'LichLamViecPTController.php:65','message'=>'Delete availability IDOR check','data'=>['userId'=>$user?->user_id,'slotId'=>$id,'slotTrainerId'=>$slot?->trainer_id,'userTrainerProfile'=>\App\Models\ProfilePT::where('user_id',$user?->user_id)->first()?->trainer_id],'timestamp'=>round(microtime(true)*1000),'sessionId'=>'debug-session','hypothesisId'=>'B','runId'=>'post-fix']);file_put_contents($debugLogPath,$logPayload."\n",FILE_APPEND);
        // #endregion

        if (!$slot) {
            return response()->json(['success' => false, 'message' => 'Slot not found'], 404);
        }

        // FIX: IDOR - Check ownership before deleting
        $trainerProfile = ProfilePT::where('user_id', $user->user_id)->first();
        if (!$trainerProfile || $slot->trainer_id !== $trainerProfile->trainer_id) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        $slot->delete();
        return response()->json(['success' => true]);
    }
}
