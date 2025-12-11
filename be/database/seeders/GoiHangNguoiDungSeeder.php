<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\GoiHangNguoiDung;

class GoiHangNguoiDungSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $packages = [
            [
                'code' => 'BASIC_1M',
                'name' => 'Gói Cơ Bản 1 Tháng',
                'description' => 'Gói tập cơ bản trong vòng 1 tháng.',
                'duration_days' => 30,
                'price' => 500000,
                'benefits' => "- Sử dụng thiết bị gym cơ bản\n- Tủ đồ miễn phí",
                'is_active' => true,
            ],
            [
                'code' => 'STANDARD_3M',
                'name' => 'Gói Tiêu Chuẩn 3 Tháng',
                'description' => 'Gói tập tiêu chuẩn trong vòng 3 tháng với ưu đãi.',
                'duration_days' => 90,
                'price' => 1200000,
                'benefits' => "- Sử dụng toàn bộ thiết bị gym\n- Tủ đồ miễn phí\n- 1 buổi PT miễn phí",
                'is_active' => true,
            ],
            [
                'code' => 'PREMIUM_6M',
                'name' => 'Gói Cao Cấp 6 Tháng',
                'description' => 'Gói tập cao cấp 6 tháng với nhiều đặc quyền.',
                'duration_days' => 180,
                'price' => 2200000,
                'benefits' => "- Full thiết bị gym & cardio\n- Tủ đồ & Khăn tập\n- 3 buổi PT miễn phí\n- Nước uống miễn phí",
                'is_active' => true,
            ],
            [
                'code' => 'VIP_1Y',
                'name' => 'Gói VIP 1 Năm',
                'description' => 'Trải nghiệm VIP trọn gói 1 năm.',
                'duration_days' => 365,
                'price' => 4000000,
                'benefits' => "- Full dịch vụ 5 sao\n- PT kèm 1-1 (10 buổi)\n- Xông hơi không giới hạn\n- Đồ ăn nhẹ miễn phí",
                'is_active' => true,
            ],
        ];

        foreach ($packages as $package) {
            GoiHangNguoiDung::create($package);
        }
    }
}
