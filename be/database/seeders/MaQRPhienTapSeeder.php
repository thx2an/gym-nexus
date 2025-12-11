<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MaQRPhienTap;
use App\Models\BuoiTap;
use Illuminate\Support\Str;
use Carbon\Carbon;

class MaQRPhienTapSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all sessions
        $sessions = BuoiTap::all();

        if ($sessions->isEmpty()) {
            $this->command->info('Không tìm thấy buổi tập nào để tạo mã QR.');
            return;
        }

        foreach ($sessions as $session) {
            // Check if QR already exists
            if (MaQRPhienTap::where('session_id', $session->session_id)->exists()) {
                continue;
            }

            // Generate logic
            // Token is usually a unique random string
            $token = Str::random(32);

            // Times relative to session start time
            // Assuming BuoiTap has start_time cast to Carbon, but if not, need to parse
            // BuoiTap model defaults don't usually cast standard datetime columns unless specified in $casts or standard timestamps
            // But strict DB values are strings. Carbon::parse() is safe.
            $startTime = Carbon::parse($session->start_time);

            $generatedAt = $startTime->copy()->subHours(24); // QR available 24h before
            $expiresAt = $startTime->copy()->addHours(2); // Valid until 2 hours after start

            // Is Used?
            $isUsed = false;
            if ($session->status === 'completed' || $session->status === 'confirmed') {
                // If completed, definitely used. If confirmed and in past, maybe used.
                // Let's simplified: if completed, it's used.
                if ($session->status === 'completed') {
                    $isUsed = true;
                }
            }

            MaQRPhienTap::create([
                'session_id' => $session->session_id,
                'token' => $token,
                'generated_at' => $generatedAt,
                'expires_at' => $expiresAt,
                'is_used' => $isUsed,
            ]);
        }
    }
}
