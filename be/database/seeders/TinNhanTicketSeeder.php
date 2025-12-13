<?php

namespace Database\Seeders;

use App\Models\TicketNhanVien;
use App\Models\TinNhanTicket;
use Illuminate\Database\Seeder;

class TinNhanTicketSeeder extends Seeder
{
    public function run(): void
    {
        $tickets = TicketNhanVien::with(['member', 'assignedStaff'])->get();

        if ($tickets->isEmpty()) {
            return;
        }

        foreach ($tickets as $ticket) {
            $memberUserId = $ticket->member->user_id; // Assumes relationship assumes member->user mapping exists
            $staffUserId = $ticket->assigned_to;

            // 1. Message from Member
            TinNhanTicket::create([
                'ticket_id' => $ticket->ticket_id,
                'sender_id' => $memberUserId,
                'sender_role' => 'member',
                'content' => "Xin chào, tôi có vấn đề về " . strtolower($ticket->subject) . ". Mong được hỗ trợ.",
                'created_at' => $ticket->created_at->addMinutes(rand(1, 60)),
            ]);

            // 2. Message from Staff (if ticket is not open, meaning someone touched it, or just simulate valid flow)
            if ($staffUserId) {
                TinNhanTicket::create([
                    'ticket_id' => $ticket->ticket_id,
                    'sender_id' => $staffUserId,
                    'sender_role' => 'staff',
                    'content' => "Chào bạn, tôi là nhân viên hỗ trợ. Tôi đã nhận được yêu cầu của bạn và đang kiểm tra.",
                    'created_at' => $ticket->created_at->addHours(rand(1, 4)),
                ]);
            }

            // 3. Reply from Member (random chance)
            if (rand(0, 1)) {
                TinNhanTicket::create([
                    'ticket_id' => $ticket->ticket_id,
                    'sender_id' => $memberUserId,
                    'sender_role' => 'member',
                    'content' => "Cảm ơn, tôi chờ phản hồi từ bạn.",
                    'created_at' => $ticket->created_at->addHours(rand(5, 12)),
                ]);
            }
        }
    }
}
