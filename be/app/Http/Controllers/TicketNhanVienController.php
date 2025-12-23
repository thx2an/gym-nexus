<?php

namespace App\Http\Controllers;

use App\Models\TicketNhanVien;
use App\Models\TinNhanTicket;
use App\Models\VaiTro;
use App\Models\VaiTroNguoiDung;
use Illuminate\Http\Request;

class TicketNhanVienController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $memberProfile = $user?->memberProfile;

        if (!$memberProfile) {
            return response()->json(['success' => true, 'data' => []]);
        }

        $tickets = TicketNhanVien::with(['member.user', 'messages'])
            ->where('member_id', $memberProfile->member_id)
            ->orderBy('created_at', 'desc')
            ->get();

        $data = $tickets->map(function ($ticket) {
            return $this->formatMemberTicket($ticket);
        });

        return response()->json(['success' => true, 'data' => $data]);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $memberProfile = $user?->memberProfile;

        if (!$memberProfile) {
            return response()->json(['success' => false, 'message' => 'Member profile not found.'], 400);
        }

        $data = $request->validate([
            'subject' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'priority' => 'nullable|string|max:20',
            'description' => 'required|string',
        ]);

        $assignedTo = $this->pickSupportStaffId();
        if (!$assignedTo) {
            return response()->json(['success' => false, 'message' => 'No support staff available.'], 422);
        }

        $ticket = TicketNhanVien::create([
            'member_id' => $memberProfile->member_id,
            'subject' => $data['subject'],
            'category' => $data['category'],
            'status' => 'open',
            'priority' => $data['priority'] ?? 'medium',
            'assigned_to' => $assignedTo,
        ]);

        TinNhanTicket::create([
            'ticket_id' => $ticket->ticket_id,
            'sender_id' => $user->user_id,
            'sender_role' => 'member',
            'content' => $data['description'],
            'created_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'data' => [
                'ticket_id' => $ticket->ticket_id,
                'status' => $ticket->status,
            ],
        ]);
    }

    public function show(Request $request, $id)
    {
        $user = $request->user();
        $memberProfile = $user?->memberProfile;

        if (!$memberProfile) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        $ticket = TicketNhanVien::with(['member.user', 'messages'])
            ->where('ticket_id', $id)
            ->first();

        if (!$ticket || (int) $ticket->member_id !== (int) $memberProfile->member_id) {
            return response()->json(['success' => false, 'message' => 'Ticket not found'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $this->formatTicketDetail($ticket),
        ]);
    }

    public function memberReply(Request $request, $id)
    {
        $user = $request->user();
        $memberProfile = $user?->memberProfile;

        if (!$memberProfile) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        $data = $request->validate([
            'content' => 'required|string',
        ]);

        $ticket = TicketNhanVien::where('ticket_id', $id)->first();
        if (!$ticket || (int) $ticket->member_id !== (int) $memberProfile->member_id) {
            return response()->json(['success' => false, 'message' => 'Ticket not found'], 404);
        }

        TinNhanTicket::create([
            'ticket_id' => $ticket->ticket_id,
            'sender_id' => $user->user_id,
            'sender_role' => 'member',
            'content' => $data['content'],
            'created_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'data' => [
                'ticket_id' => $ticket->ticket_id,
                'status' => $ticket->status,
            ],
        ]);
    }

    public function staffIndex(Request $request)
    {
        $user = $request->user();
        if (!$this->isSupportStaff($user)) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        $tickets = TicketNhanVien::with(['member.user', 'messages'])
            ->where('assigned_to', $user->user_id)
            ->orderBy('created_at', 'desc')
            ->get();

        $data = $tickets->map(function ($ticket) {
            return $this->formatStaffTicket($ticket);
        });

        return response()->json(['success' => true, 'data' => $data]);
    }

    public function staffShow(Request $request, $id)
    {
        $user = $request->user();
        if (!$this->isSupportStaff($user)) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        $ticket = TicketNhanVien::with(['member.user', 'messages'])
            ->where('ticket_id', $id)
            ->first();

        if (!$ticket || (int) $ticket->assigned_to !== (int) $user->user_id) {
            return response()->json(['success' => false, 'message' => 'Ticket not found'], 404);
        }

        if (strtolower((string) $ticket->status) === 'open') {
            $ticket->status = 'in_progress';
            $ticket->save();
        }

        return response()->json([
            'success' => true,
            'data' => $this->formatTicketDetail($ticket),
        ]);
    }

    public function staffReply(Request $request, $id)
    {
        $user = $request->user();
        if (!$this->isSupportStaff($user)) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        $data = $request->validate([
            'content' => 'required|string',
            'status' => 'nullable|string|max:20',
        ]);

        $ticket = TicketNhanVien::where('ticket_id', $id)->first();
        if (!$ticket || (int) $ticket->assigned_to !== (int) $user->user_id) {
            return response()->json(['success' => false, 'message' => 'Ticket not found'], 404);
        }

        TinNhanTicket::create([
            'ticket_id' => $ticket->ticket_id,
            'sender_id' => $user->user_id,
            'sender_role' => 'staff',
            'content' => $data['content'],
            'created_at' => now(),
        ]);

        if (!empty($data['status'])) {
            $ticket->status = $data['status'];
            $ticket->save();
        }

        return response()->json([
            'success' => true,
            'data' => [
                'ticket_id' => $ticket->ticket_id,
                'status' => $ticket->status,
            ],
        ]);
    }

    public function memberClose(Request $request, $id)
    {
        $user = $request->user();
        $memberProfile = $user?->memberProfile;

        if (!$memberProfile) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        $ticket = TicketNhanVien::where('ticket_id', $id)->first();
        if (!$ticket || (int) $ticket->member_id !== (int) $memberProfile->member_id) {
            return response()->json(['success' => false, 'message' => 'Ticket not found'], 404);
        }

        $ticket->status = 'resolved';
        $ticket->save();

        return response()->json([
            'success' => true,
            'data' => [
                'ticket_id' => $ticket->ticket_id,
                'status' => $ticket->status,
            ],
        ]);
    }

    public function staffClose(Request $request, $id)
    {
        $user = $request->user();
        if (!$this->isSupportStaff($user)) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        $ticket = TicketNhanVien::where('ticket_id', $id)->first();
        if (!$ticket || (int) $ticket->assigned_to !== (int) $user->user_id) {
            return response()->json(['success' => false, 'message' => 'Ticket not found'], 404);
        }

        $ticket->status = 'resolved';
        $ticket->save();

        return response()->json([
            'success' => true,
            'data' => [
                'ticket_id' => $ticket->ticket_id,
                'status' => $ticket->status,
            ],
        ]);
    }

    private function isSupportStaff($user)
    {
        if (!$user) {
            return false;
        }

        $user->loadMissing('vaiTros');
        $allowed = ['staff', 'support', 'support staff'];

        foreach ($user->vaiTros as $role) {
            if (in_array(strtolower((string) $role->code), $allowed, true)) {
                return true;
            }
        }

        return false;
    }

    private function pickSupportStaffId()
    {
        $roleIds = VaiTro::whereIn('code', ['Staff', 'STAFF', 'Support', 'SUPPORT', 'Support Staff', 'SUPPORT STAFF'])
            ->pluck('role_id');

        if ($roleIds->isEmpty()) {
            return null;
        }

        $staffIds = VaiTroNguoiDung::whereIn('role_id', $roleIds)->pluck('user_id');
        if ($staffIds->isEmpty()) {
            return null;
        }

        return $staffIds->first();
    }

    private function resolveSenderRole($message, TicketNhanVien $ticket, $memberUserId)
    {
        $role = strtolower((string) ($message->sender_role ?? ''));
        if ($role) {
            if (str_contains($role, 'staff') || str_contains($role, 'support')) {
                return 'staff';
            }
            if (str_contains($role, 'member')) {
                return 'member';
            }
        }

        if ($memberUserId && (int) $message->sender_id === (int) $memberUserId) {
            return 'member';
        }

        if ((int) $message->sender_id === (int) $ticket->assigned_to) {
            return 'staff';
        }

        return 'member';
    }

    private function formatMemberTicket(TicketNhanVien $ticket)
    {
        $messages = $ticket->messages?->sortBy('created_at') ?? collect();
        $memberUserId = $ticket->member?->user?->user_id;
        $firstMessage = $messages->first();
        $lastStaffMessage = $messages->filter(function ($message) use ($ticket, $memberUserId) {
            return $this->resolveSenderRole($message, $ticket, $memberUserId) === 'staff';
        })->last();

        return [
            'id' => $ticket->ticket_id,
            'subject' => $ticket->subject,
            'category' => $ticket->category,
            'status' => $ticket->status,
            'priority' => $ticket->priority,
            'description' => $firstMessage?->content,
            'createdAt' => $ticket->created_at?->toIso8601String(),
            'lastReply' => $lastStaffMessage ? [
                'message' => $lastStaffMessage->content,
                'by' => 'Support',
                'timestamp' => $lastStaffMessage->created_at?->toIso8601String(),
            ] : null,
        ];
    }

    private function formatStaffTicket(TicketNhanVien $ticket)
    {
        $messages = $ticket->messages?->sortBy('created_at') ?? collect();
        $lastMessage = $messages->last();

        return [
            'id' => $ticket->ticket_id,
            'subject' => $ticket->subject,
            'category' => $ticket->category,
            'status' => $ticket->status,
            'priority' => $ticket->priority,
            'member' => $ticket->member?->user?->full_name ?? 'Member',
            'createdAt' => $ticket->created_at?->toIso8601String(),
            'lastUpdate' => $lastMessage?->created_at?->toIso8601String() ?? $ticket->updated_at?->toIso8601String(),
        ];
    }

    private function formatTicketDetail(TicketNhanVien $ticket)
    {
        $messages = $ticket->messages?->sortBy('created_at') ?? collect();
        $memberUserId = $ticket->member?->user?->user_id;

        return [
            'id' => $ticket->ticket_id,
            'subject' => $ticket->subject,
            'category' => $ticket->category,
            'status' => $ticket->status,
            'priority' => $ticket->priority,
            'createdAt' => $ticket->created_at?->toIso8601String(),
            'member' => $ticket->member?->user?->full_name ?? 'Member',
            'messages' => $messages->map(function ($message) use ($ticket, $memberUserId) {
                $role = $this->resolveSenderRole($message, $ticket, $memberUserId);
                return [
                    'id' => $message->msg_id,
                    'sender' => $role === 'staff' ? 'Support' : 'Member',
                    'sender_role' => $role,
                    'content' => $message->content,
                    'timestamp' => $message->created_at?->toIso8601String(),
                ];
            })->values(),
        ];
    }
}
