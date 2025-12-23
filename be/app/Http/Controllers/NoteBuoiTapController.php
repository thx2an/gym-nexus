<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NoteBuoiTap;
use App\Models\BuoiTap;

class NoteBuoiTapController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'session_id' => 'required|exists:buoi_taps,session_id',
            'notes' => 'required|string'
        ]);

        $session = BuoiTap::find($request->session_id);

        $note = NoteBuoiTap::create([
            'session_id' => $request->session_id,
            'member_id' => $session->member_id,
            'trainer_id' => $session->trainer_id,
            'notes' => $request->notes,
            // 'metrics_json' => json_encode(...) // Can be extended
        ]);

        // Optionally mark session as completed if not already
        if ($session->status !== 'completed') {
            $session->status = 'completed';
            $session->save();
        }

        return response()->json([
            'success' => true,
            'data' => $note
        ]);
    }

    public function show(Request $request, $sessionId)
    {
        // #region agent log
        $debugLogPath = storage_path('logs/debug.log');
        $note = NoteBuoiTap::where('session_id', $sessionId)->first();
        $user = $request->user();
        $logPayload = json_encode(['location'=>'NoteBuoiTapController.php:42','message'=>'Session note access - auth check added','data'=>['sessionId'=>$sessionId,'noteExists'=>$note?true:false,'noteMemberId'=>$note?->member_id,'noteTrainerId'=>$note?->trainer_id,'userId'=>$user?->user_id],'timestamp'=>round(microtime(true)*1000),'sessionId'=>'debug-session','hypothesisId'=>'B','runId'=>'post-fix']);file_put_contents($debugLogPath,$logPayload."\n",FILE_APPEND);
        // #endregion

        if (!$note) {
            return response()->json(['success' => false, 'message' => 'Note not found'], 404);
        }

        // FIX: IDOR - Check if user is the member or trainer of this session
        $trainerProfile = \App\Models\ProfilePT::where('user_id', $user->user_id)->first();
        $isTrainer = $trainerProfile && $note->trainer_id === $trainerProfile->trainer_id;
        $isMember = $note->member_id === $user->user_id;

        if (!$isTrainer && !$isMember) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $note
        ]);
    }
}
