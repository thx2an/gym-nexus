<?php

namespace Database\Seeders;

use App\Models\NoiDungTinNhan;
use App\Models\PhienTinNhan;
use Illuminate\Database\Seeder;

class NoiDungTinNhanSeeder extends Seeder
{
    public function run(): void
    {
        $chats = PhienTinNhan::with(['member', 'supportStaff'])->get();

        if ($chats->isEmpty()) {
            return;
        }

        foreach ($chats as $chat) {
            $memberUserId = $chat->member->user_id;
            $staffUserId = $chat->support_staff_id;

            // 1. Initial message from Member
            NoiDungTinNhan::create([
                'chat_id' => $chat->chat_id,
                'sender_id' => $memberUserId,
                'sender_role' => 'member',
                'content' => $this->getRandomInitialMessage(),
                'created_at' => $chat->started_at,
            ]);

            // 2. Staff reply (if chat has duration > 5 mins or is closed)
            $replyTime = (clone $chat->started_at)->addMinutes(rand(1, 5));
            if ($chat->ended_at && $replyTime < $chat->ended_at) {
                NoiDungTinNhan::create([
                    'chat_id' => $chat->chat_id,
                    'sender_id' => $staffUserId,
                    'sender_role' => 'staff',
                    'content' => "Chào bạn, mình có thể giúp gì cho bạn ạ?",
                    'created_at' => $replyTime,
                ]);

                // 3. Member followup
                $followupTime = (clone $replyTime)->addMinutes(rand(1, 3));
                if ($followupTime < $chat->ended_at) {
                    NoiDungTinNhan::create([
                        'chat_id' => $chat->chat_id,
                        'sender_id' => $memberUserId,
                        'sender_role' => 'member',
                        'content' => "Mình muốn hỏi kỹ hơn về chế độ ăn uống cho người mới tập.",
                        'created_at' => $followupTime,
                    ]);
                }
            }
        }
    }

    private function getRandomInitialMessage()
    {
        $messages = [
            "Xin chào, có ai trực tuyến không?",
            "Cho mình hỏi về lịch tập hôm nay.",
            "Mình cần tư vấn về gói PT.",
            "Phòng tập hôm nay mở cửa đến mấy giờ?",
            "Huấn luyện viên của mình chưa đến.",
        ];
        return $messages[array_rand($messages)];
    }
}
