<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PlanDinhDuongAI;
use App\Models\ProfileMember;
use App\Models\VaiTro;
use App\Models\VaiTroNguoiDung;
use Faker\Factory as Faker;
use Carbon\Carbon;

class PlanDinhDuongAISeeder extends Seeder
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

        foreach ($profiles as $profile) {
            // Generate 1-2 plans per member
            if (rand(0, 100) < 60) { // 60% chance to have a nutrition plan
                $calories = rand(1500, 3000); // Daily Calories

                // Random Macro Split
                $protein = rand(25, 40);
                $fat = rand(20, 35);
                $carbs = 100 - $protein - $fat;

                $macroJson = [
                    'protein' => $protein . '%',
                    'fats' => $fat . '%',
                    'carbs' => $carbs . '%',
                    'calories' => $calories
                ];

                $creator = $creators->isNotEmpty() ? $creators->random() : $profile->user_id;

                // Generate Dummy JSON Meal Plan with Vietnamese Food
                $planJson = [
                    'Sáng' => ['Phở bò', '1 ly sữa không đường'],
                    'Trưa' => ['Cơm gạo lứt', 'Ức gà nướng', 'Rau luộc'],
                    'Chiều' => ['1 quả chuối', 'Sữa chua Hy Lạp'],
                    'Tối' => ['Cá hồi áp chảo', 'Salad trộn dầu giấm'],
                    'Ghi chú' => 'Uống đủ 2-3 lít nước mỗi ngày.'
                ];

                PlanDinhDuongAI::create([
                    'member_id' => $profile->member_id,
                    'daily_calories' => $calories,
                    'macro_json' => json_encode($macroJson),
                    'plan_json' => json_encode($planJson, JSON_UNESCAPED_UNICODE),
                    'created_by' => $creator,
                ]);
            }
        }
    }
}
