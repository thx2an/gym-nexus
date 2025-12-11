<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CheckinBuoiTap;
use App\Models\BuoiTap;
use Carbon\Carbon;

class CheckinBuoiTapSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get sessions that are completed
        $sessions = BuoiTap::where('status', 'completed')->get();

        if ($sessions->isEmpty()) {
            $this->command->info('Không tìm thấy buổi tập đã hoàn thành để tạo check-in.');
            return;
        }

        foreach ($sessions as $session) {
            // Avoid duplicates
            if (CheckinBuoiTap::where('session_id', $session->session_id)->exists()) {
                continue;
            }

            // Scanned at roughly the start time of the session (+/- 10 mins)
            $startTime = Carbon::parse($session->start_time);
            $scannedAt = $startTime->copy()->addMinutes(rand(-10, 10));

            CheckinBuoiTap::create([
                'session_id' => $session->session_id,
                'member_id' => $session->member_id,
                'scanned_at' => $scannedAt,
                'is_valid' => true,
            ]);
        }
    }
}
