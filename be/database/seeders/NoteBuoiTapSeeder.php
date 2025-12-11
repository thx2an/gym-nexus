<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\NoteBuoiTap;
use App\Models\BuoiTap;

class NoteBuoiTapSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get sessions that are completed or confirmed
        // Notes are usually for completed sessions, but let's include confirmed just in case.
        $sessions = BuoiTap::whereIn('status', ['completed', 'confirmed'])->get();

        if ($sessions->isEmpty()) {
            $this->command->info('Không tìm thấy buổi tập nào (status: completed/confirmed) để tạo ghi chú.');
            return;
        }

        foreach ($sessions as $session) {
            // Randomly decide if a session has a note (80% chance)
            if (rand(0, 100) > 20) {
                // Check if note already exists for this session
                if (NoteBuoiTap::where('session_id', $session->session_id)->exists()) {
                    continue;
                }

                $metrics = [
                    'weight' => rand(40, 100) . 'kg',
                    'reps' => rand(8, 12),
                    'sets' => rand(3, 5),
                    'exercise' => 'Squat', // Simplified
                    'calories_burned' => rand(200, 500)
                ];

                NoteBuoiTap::create([
                    'session_id' => $session->session_id,
                    'trainer_id' => $session->trainer_id,
                    'member_id' => $session->member_id,
                    'notes' => 'Học viên tập luyện rất tốt, cần cải thiện form ở hiệp cuối.',
                    'metrics_json' => $metrics, // Will be cast to JSON/Array automatically if cast is set
                ]);
            }
        }
    }
}
