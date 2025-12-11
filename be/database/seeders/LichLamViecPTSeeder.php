<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\LichLamViecPT;
use App\Models\ProfilePT;
use App\Models\ChiNhanhNguoiDung;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class LichLamViecPTSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all PT profiles
        $trainers = ProfilePT::all();

        if ($trainers->isEmpty()) {
            $this->command->info('Không tìm thấy hồ sơ huấn luyện viên nào để tạo lịch làm việc.');
            return;
        }

        foreach ($trainers as $trainer) {
            // Find branch of this trainer (user)
            // Assuming first branch is the one they work at for now
            $userBranch = ChiNhanhNguoiDung::where('user_id', $trainer->user_id)->first();

            if (!$userBranch) {
                // If user not assigned to any branch, skip
                continue;
            }

            // Create recurring schedule for this trainer
            // e.g., Work Mon, Wed, Fri
            $days = [1, 3, 5]; // Mon, Wed, Fri
            foreach ($days as $day) {
                LichLamViecPT::create([
                    'trainer_id' => $trainer->trainer_id,
                    'branch_id' => $userBranch->branch_id,
                    'date' => null, // Recurring
                    'start_time' => '09:00:00',
                    'end_time' => '17:00:00',
                    'is_recurring' => true,
                    'day_of_week' => $day,
                    'is_blocked' => false,
                ]);
            }

            // Create some specific blocked dates (e.g., day off next week)
            $randomDate = Carbon::now()->addDays(rand(1, 14));
            LichLamViecPT::create([
                'trainer_id' => $trainer->trainer_id,
                'branch_id' => $userBranch->branch_id,
                'date' => $randomDate->toDateString(),
                'start_time' => '00:00:00',
                'end_time' => '23:59:59',
                'is_recurring' => false,
                'day_of_week' => null,
                'is_blocked' => true, // Bận/Nghỉ phép
            ]);
        }
    }
}
