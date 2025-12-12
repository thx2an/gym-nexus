<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PhienPhanTichTuThe;
use App\Models\ProfileMember;
use Faker\Factory as Faker;
use Carbon\Carbon;

class PhienPhanTichTuTheSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('vi_VN');

        $profiles = ProfileMember::all();

        if ($profiles->isEmpty()) {
            return;
        }

        $exercises = ['Squat', 'Deadlift', 'Bench Press', 'Plank', 'Lunges', 'Shoulder Press'];
        $summaries = [
            'Lưng hơi gù khi xuống thấp, cần giữ thẳng lưng hơn.',
            'Đầu gối hướng vào trong, hãy mở rộng đầu gối theo hướng mũi chân.',
            'Tư thế tốt, giữ vững phong độ.',
            'Hạ tạ quá nhanh, cần kiểm soát chuyển động tốt hơn.',
            'Cổ chưa thẳng hàng với cột sống, chú ý nhìn thẳng.',
            'Cơ bụng chưa được siết chặt trong quá trình thực hiện.'
        ];

        foreach ($profiles as $profile) {
            // Generate 0-3 sessions per member
            $numSessions = rand(0, 3);

            for ($i = 0; $i < $numSessions; $i++) {
                $startedAt = Carbon::now()->subDays(rand(1, 60))->subMinutes(rand(0, 1000));
                $endedAt = $startedAt->copy()->addMinutes(rand(5, 45));
                $duration = $endedAt->diffInSeconds($startedAt);

                PhienPhanTichTuThe::create([
                    'member_id' => $profile->member_id,
                    'exercise_name' => $exercises[array_rand($exercises)],
                    'started_at' => $startedAt,
                    'ended_at' => $endedAt,
                    'result_summary' => $summaries[array_rand($summaries)],
                    'raw_data_ref' => 's3://gym-nexus/pose-analysis/' . $profile->member_id . '/' . $startedAt->timestamp . '.json',
                ]);
            }
        }
    }
}
