<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PhienTinNhan;
use App\Models\NoiDungTinNhan;
use App\Models\User; // Or NguoiDung
use App\Models\NguoiDung;
use App\Models\MemberProfile;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{
    // 1. Get List of Contacts (Sessions)
    // For Member: List assigned PTs (or just the active session)
    // For PT: List Members they are chatting with
    public function getContacts(Request $request)
    {
        $user = $request->user();

        if ($user->role_id == 4) { // Member
            // Find active chats where this user is the member
            $memberProfile = $user->memberProfile;
            if (!$memberProfile) return response()->json(['data' => []]);

            $chats = PhienTinNhan::where('member_id', $memberProfile->member_id)
                ->with(['supportStaff' => function ($q) {
                    $q->select('user_id', 'full_name', 'email');
                }])
                ->orderBy('updated_at', 'desc')
                ->get();

            return response()->json(['success' => true, 'data' => $chats]);
        } elseif ($user->role_id == 3) { // Personal Trainer
            // Find chats where this user is the support staff
            $chats = PhienTinNhan::where('support_staff_id', $user->user_id)
                ->with(['member.user' => function ($q) {
                    $q->select('user_id', 'full_name', 'email'); // Get User info via MemberProfile
                }])
                ->orderBy('updated_at', 'desc')
                ->get();

            return response()->json(['success' => true, 'data' => $chats]);
        }

        return response()->json(['data' => []]);
    }

    // 2. Get Messages for a specific Chat
    // To keep it simple, Members might only have ONE active chat with a PT.
    // Or we pass chat_id. For now let's assume auto-resolve or pass ID.
    public function getMessages(Request $request, $chatId = null)
    {
        $user = $request->user();

        // Security Check: Ensure user belongs to this chat
        $chat = PhienTinNhan::find($chatId);

        // #region agent log
        $debugLogPath = storage_path('logs/debug.log');
        $logPayload = json_encode(['location'=>'ChatController.php:58','message'=>'Chat access authorization check - fixed','data'=>['userId'=>$user?->user_id,'roleId'=>$user?->role_id,'chatId'=>$chatId,'chatMemberId'=>$chat?->member_id,'chatSupportStaffId'=>$chat?->support_staff_id,'userMemberProfileId'=>$user?->memberProfile?->member_id],'timestamp'=>round(microtime(true)*1000),'sessionId'=>'debug-session','hypothesisId'=>'E','runId'=>'post-fix']);file_put_contents($debugLogPath,$logPayload."\n",FILE_APPEND);
        // #endregion

        // FIX: Authorization check - verify user belongs to this chat
        if ($chat) {
            $memberProfile = $user->memberProfile;
            $isMember = $memberProfile && $chat->member_id === $memberProfile->member_id;
            $isSupportStaff = $chat->support_staff_id === $user->user_id;
            
            if (!$isMember && !$isSupportStaff) {
                return response()->json(['success' => false, 'message' => 'Unauthorized access to chat'], 403);
            }
        }

        if (!$chat) {
            // Try to find the latest active chat if no ID provided (for simplified Member UI)
            if ($user->role_id == 4 && $user->memberProfile) {
                $chat = PhienTinNhan::where('member_id', $user->memberProfile->member_id)
                    ->orderBy('created_at', 'desc')
                    ->first();
            }
        }

        if (!$chat) {
            return response()->json(['data' => []]); // No chat found
        }

        // Fetch messages
        $messages = NoiDungTinNhan::where('chat_id', $chat->chat_id)
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'chat_id' => $chat->chat_id,
            'messages' => $messages
        ]);
    }

    // 3. Send Message
    public function sendMessage(Request $request)
    {
        // FIX: Add input validation to prevent XSS and empty messages
        $request->validate([
            'content' => 'required|string|max:5000',
            'chat_id' => 'nullable|integer',
            'receiver_id' => 'nullable|integer',
        ]);

        $user = $request->user();
        $content = strip_tags($request->input('content')); // FIX: Sanitize HTML tags
        $chatId = $request->input('chat_id'); // Optional if new
        $receiverId = $request->input('receiver_id'); // If creating new chat

        // #region agent log
        $debugLogPath = storage_path('logs/debug.log');
        $logPayload = json_encode(['location'=>'ChatController.php:91','message'=>'Chat message input validation - sanitized','data'=>['content'=>$content,'contentLength'=>strlen($content??''),'containsScript'=>str_contains($content??'','<script'),'chatId'=>$chatId],'timestamp'=>round(microtime(true)*1000),'sessionId'=>'debug-session','hypothesisId'=>'C','runId'=>'post-fix']);file_put_contents($debugLogPath,$logPayload."\n",FILE_APPEND);
        // #endregion

        // Auto-create chat logic for Member -> PT if not exists
        if (!$chatId && $user->role_id == 4) {
            // Check if active chat exists
            $memberProfile = $user->memberProfile;
            if (!$memberProfile) return response()->json(['message' => 'Profile required'], 400);

            $existingChat = PhienTinNhan::where('member_id', $memberProfile->member_id)
                ->where('status', 'open')
                ->first();

            if ($existingChat) {
                $chatId = $existingChat->chat_id;
            } else {
                // Create new chat with a random PT or selected PT
                // For demo: Pick the first available PT (role_id 3)
                $pt = NguoiDung::where('role_id', 3)->first();
                if (!$pt) return response()->json(['message' => 'No PT available'], 404);

                $newChat = PhienTinNhan::create([
                    'member_id' => $memberProfile->member_id,
                    'support_staff_id' => $pt->user_id,
                    'status' => 'open',
                    'started_at' => now()
                ]);
                $chatId = $newChat->chat_id;
            }
        }

        if (!$chatId) return response()->json(['message' => 'Chat ID required'], 400);

        // Save Message
        $msg = NoiDungTinNhan::create([
            'chat_id' => $chatId,
            'sender_id' => $user->user_id,
            'sender_role' => $user->role_id == 4 ? 'member' : 'pt',
            'content' => $content
        ]);

        // Touch parent to update updated_at
        $chat = PhienTinNhan::find($chatId);
        $chat->touch();

        return response()->json(['success' => true, 'data' => $msg]);
    }
}
