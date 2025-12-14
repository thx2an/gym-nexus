<?php

namespace Database\Seeders;

use App\Models\BaoCao;
use App\Models\NguoiDung;
use Illuminate\Database\Seeder;

class BaoCaoSeeder extends Seeder
{
    public function run(): void
    {
        $staff = NguoiDung::inRandomOrder()->limit(3)->get();

        if ($staff->isEmpty()) {
            return;
        }

        $reports = [
            [
                'type' => 'Báo cáo doanh thu',
                'parameters' => ['start_date' => '2025-01-01', 'end_date' => '2025-01-31', 'branch' => 'Cơ sở chính'],
                'file_path' => '/reports/doanh_thu_thang_1_2025.pdf',
            ],
            [
                'type' => 'Báo cáo thành viên mới',
                'parameters' => ['month' => '12', 'year' => '2024'],
                'file_path' => '/reports/thanh_vien_moi_t12_2024.pdf',
            ],
            [
                'type' => 'Báo cáo sử dụng thiết bị',
                'parameters' => ['category' => 'Cardio', 'period' => 'Q4-2024'],
                'file_path' => '/reports/thiet_bi_cardio_q4_2024.pdf',
            ],
            [
                'type' => 'Báo cáo phản hồi khách hàng',
                'parameters' => ['min_rating' => 4, 'limit' => 50],
                'file_path' => '/reports/phan_hoi_khach_hang_cao_cap.pdf',
            ],
            [
                'type' => 'Thống kê vé tập ngày',
                'parameters' => ['date' => '2025-02-14'],
                'file_path' => '/reports/ve_tap_ngay_14_02_2025.pdf',
            ],
        ];

        foreach ($reports as $report) {
            BaoCao::create([
                'type' => $report['type'],
                'parameters_json' => $report['parameters'], // Model casts this to array/json automatically if cast is set, or we json_encode here. Model has 'array' cast.
                'generated_by' => $staff->random()->user_id,
                'generated_at' => now()->subDays(rand(1, 30)),
                'file_path' => $report['file_path'],
            ]);
        }
    }
}
