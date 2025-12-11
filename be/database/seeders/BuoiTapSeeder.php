<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BuoiTap;
use App\Models\ProfilePT;
use App\Models\NguoiDung;
use App\Models\ChiNhanhNguoiDung;
use App\Models\VaiTro;
use Carbon\Carbon;

class BuoiTapSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Get List of PTs
        $trainers = ProfilePT::all();

        // 2. Get List of Members (Users who are NOT PTs is better, but simplified: assume anyone not a PT is a potential member)
        // Or finding users with 'MEMBER' role if strictly enforced.
        // Let's grab users who do NOT have a PT profile to be safe.
        $ptUserIds = $trainers->pluck('user_id')->toArray();
        $members = NguoiDung::whereNotIn('user_id', $ptUserIds)->get();

        if ($trainers->isEmpty() || $members->isEmpty()) {
            $this->command->info('Không đủ dữ liệu (PT hoặc Hội viên) để tạo buổi tập.');
            return;
        }

        foreach ($members as $member) {
            // Random: 30% members book a session
            if (rand(0, 10) > 7) {
                // Book 1-3 sessions
                $numSessions = rand(1, 3);

                for ($i = 0; $i < $numSessions; $i++) {
                    $trainer = $trainers->random();

                    // Logic: Get trainer's branch
                    $trainerBranch = ChiNhanhNguoiDung::where('user_id', $trainer->user_id)->first();
                    $branchId = $trainerBranch ? $trainerBranch->branch_id : 1; // Default to branch 1 if assignment missing

                    // Random status
                    $statuses = ['pending', 'confirmed', 'completed', 'canceled'];
                    $status = $statuses[array_rand($statuses)];

                    // Random time
                    $startTime = Carbon::now()->addDays(rand(-5, 5))->setTime(rand(8, 20), 0, 0);
                    $endTime = $startTime->copy()->addHour();

                    // Adjust status based on time
                    if ($status === 'completed' && $endTime->isFuture()) {
                        $status = 'confirmed';
                    }
                    if (($status === 'confirmed' || $status === 'pending') && $endTime->isPast()) {
                        // could remain pending/confirmed if they forgot to update, or auto-complete? 
                        // Let's leave it natural or force cancel/complete. 
                        // For simulation, let's make it completed if past.
                        $status = 'completed';
                    }

                    BuoiTap::create([
                        'member_id' => $member->user_id,
                        'trainer_id' => $trainer->trainer_id,
                        'branch_id' => $branchId,
                        'start_time' => $startTime,
                        'end_time' => $endTime,
                        'status' => $status,
                        'notes' => 'Tập luyện cơ bản',
                    ]);
                }
            }
        }
    }
}
