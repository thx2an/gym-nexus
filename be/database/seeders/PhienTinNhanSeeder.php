<?php

namespace Database\Seeders;

use App\Models\NguoiDung;
use App\Models\PhienTinNhan;
use App\Models\ProfileMember;
use Illuminate\Database\Seeder;

class PhienTinNhanSeeder extends Seeder
{
    public function run(): void
    {
        $members = ProfileMember::all();
        $staff = NguoiDung::inRandomOrder()->limit(5)->get();

        if ($members->isEmpty() || $staff->isEmpty()) {
            return;
        }

        foreach ($members as $member) {
            // Create 0-2 chat sessions per member
            if (rand(0, 100) > 60) { // 40% chance
                $status = $this->randomStatus();
                $startedAt = now()->subDays(rand(0, 30))->subHours(rand(0, 24));
                $endedAt = ($status === 'closed' || $status === 'member_left')
                    ? (clone $startedAt)->addMinutes(rand(10, 120))
                    : null;

                PhienTinNhan::create([
                    'member_id' => $member->member_id,
                    'support_staff_id' => $staff->random()->user_id,
                    'status' => $status,
                    'started_at' => $startedAt,
                    'ended_at' => $endedAt,
                ]);
            }
        }
    }

    private function randomStatus()
    {
        $statuses = ['open', 'closed', 'member_left'];
        return $statuses[array_rand($statuses)];
    }
}
