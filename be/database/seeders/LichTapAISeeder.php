<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\LichTapAI;
use App\Models\ProfileMember;
use App\Models\VaiTro;
use App\Models\VaiTroNguoiDung;
use Faker\Factory as Faker;
use Carbon\Carbon;

class LichTapAISeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('vi_VN');

        $profiles = ProfileMember::all();

        // Find System/Admin/PT users to be creators
        $staffRoles = VaiTro::whereIn('code', ['ADMIN', 'STAFF', 'PT'])->pluck('role_id');
        $creators = VaiTroNguoiDung::whereIn('role_id', $staffRoles)->pluck('user_id');

        if ($profiles->isEmpty()) {
            return;
        }

        $goals = ['Tăng cơ', 'Giảm mỡ', 'Sức bền', 'Cải thiện tim mạch', 'Yoga cơ bản', 'Bodybuilding'];
        $durations = [4, 8, 12]; // weeks

        foreach ($profiles as $profile) {
            // Generate 1-2 plans per member
            if (rand(0, 100) < 70) { // 70% chance to have a plan
                $goal = $goals[array_rand($goals)];
                $duration = $durations[array_rand($durations)];
                $source = (rand(0, 10) > 2) ? 'ai' : 'pt'; // Mostly AI

                $creator = $creators->isNotEmpty() ? $creators->random() : $profile->user_id;

                // Generate Dummy JSON Plan
                $planData = [
                    'goal' => $goal,
                    'level' => 'Intermediate',
                    'schedule' => [
                        'Thứ 2' => ['Ngực', 'Tay sau'],
                        'Thứ 3' => ['Chân', 'Bụng'],
                        'Thứ 4' => ['Nghỉ'],
                        'Thứ 5' => ['Lưng', 'Tay trước'],
                        'Thứ 6' => ['Vai', 'Bụng'],
                        'Thứ 7' => ['Cardio nhẹ'],
                        'Chủ nhật' => ['Nghỉ']
                    ],
                    'exercises' => [
                        ['name' => 'Đẩy tạ nằm (Bench Press)', 'sets' => 4, 'reps' => '8-12'],
                        ['name' => 'Gánh tạ (Squat)', 'sets' => 4, 'reps' => '10-15'],
                        ['name' => 'Kéo xà (Pull up)', 'sets' => 3, 'reps' => 'Failure'],
                        ['name' => 'Chạy bộ máy', 'duration' => '30 mins'],
                    ]
                ];

                LichTapAI::create([
                    'member_id' => $profile->member_id,
                    'goal' => $goal,
                    'duration_weeks' => $duration,
                    'plan_json' => json_encode($planData, JSON_UNESCAPED_UNICODE),
                    'source' => $source,
                    'created_by' => $creator,
                ]);
            }
        }
    }
}
