<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HoSoTienDo;
use App\Models\ProfileMember;
use App\Models\VaiTro;
use App\Models\VaiTroNguoiDung;
use Faker\Factory as Faker;
use Carbon\Carbon;

class HoSoTienDoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('vi_VN');

        $profiles = ProfileMember::all();

        // Find PTs and Staff to be creators
        $staffRoles = VaiTro::whereIn('code', ['PT', 'STAFF', 'ADMIN'])->pluck('role_id');
        $creators = VaiTroNguoiDung::whereIn('role_id', $staffRoles)->pluck('user_id');

        if ($profiles->isEmpty()) {
            $this->command->info('Không tìm thấy hồ sơ hội viên để tạo dữ liệu tiến độ.');
            return;
        }

        if ($creators->isEmpty()) {
            // Fallback if no specific staff found, though unlikely with correct seeding
            $this->command->warn('Không tìm thấy PT/Staff. Sẽ dùng user_id bất kỳ làm người tạo.');
            // Logic to get some valid user ids if needed, or return
        }

        $metrics = [
            'Cân nặng' => ['unit' => 'kg', 'min' => 45, 'max' => 100],
            'Tỷ lệ mỡ' => ['unit' => '%', 'min' => 10, 'max' => 35],
            'Vòng eo' => ['unit' => 'cm', 'min' => 60, 'max' => 100],
            'Vòng ngực' => ['unit' => 'cm', 'min' => 80, 'max' => 120],
            'Vòng mông' => ['unit' => 'cm', 'min' => 85, 'max' => 120],
            'Nhịp tim nghỉ ngơi' => ['unit' => 'bpm', 'min' => 60, 'max' => 90],
        ];

        $sources = ['Máy đo InBody', 'PT đo thủ công', 'Tự nhập', 'Khám sức khỏe'];

        foreach ($profiles as $profile) {
            // Create 3-5 progress records for each member
            $numRecords = rand(3, 5);

            for ($i = 0; $i < $numRecords; $i++) {
                // Different dates over last 3 months
                $date = Carbon::now()->subDays(rand(1, 90));

                // Pick a metric
                $metricType = array_rand($metrics);
                $metricData = $metrics[$metricType];

                // Generate realistic value depending on potential trends (random for now)
                $value = $faker->randomFloat(1, $metricData['min'], $metricData['max']);

                $creator = $creators->isNotEmpty() ? $creators->random() : $profile->user_id; // Fallback to self if no staff

                HoSoTienDo::create([
                    'member_id' => $profile->member_id,
                    'record_date' => $date,
                    'metric_type' => $metricType,
                    'value' => $value,
                    'unit' => $metricData['unit'],
                    'source' => $sources[array_rand($sources)],
                    'created_by' => $creator,
                    'created_at' => $date, // Sync created_at with record_date
                ]);
            }
        }
    }
}
