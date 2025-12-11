<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\GoiHang;
use App\Models\NguoiDung;
use App\Models\GoiHangNguoiDung;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class GoiHangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = NguoiDung::all();
        $packages = GoiHangNguoiDung::all();

        if ($users->isEmpty() || $packages->isEmpty()) {
            $this->command->info('Không tìm thấy người dùng hoặc gói tập để tạo dữ liệu mẫu cho Gói Hàng.');
            return;
        }

        foreach ($users as $user) {
            // Random: 50% người dùng sẽ có gói tập
            if (rand(0, 1)) {
                $package = $packages->random();

                $statuses = ['active', 'expired', 'pending', 'canceled'];
                $status = $statuses[array_rand($statuses)];

                $startDate = Carbon::now()->subDays(rand(0, 60));
                $endDate = $startDate->copy()->addDays((int)$package->duration_days);

                if ($status === 'active' && $endDate->isPast()) {
                    $status = 'expired';
                }
                if ($status === 'expired' && $endDate->isFuture()) {
                    $status = 'active';
                }

                GoiHang::create([
                    'member_id' => $user->user_id,
                    'package_id' => $package->package_id,
                    'start_date' => $startDate,
                    'end_date' => $endDate,
                    'status' => $status,
                ]);
            }
        }
    }
}
