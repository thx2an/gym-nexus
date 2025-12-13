<?php

namespace Database\Seeders;

use App\Models\AuditLogs;
use App\Models\NguoiDung;
use Illuminate\Database\Seeder;

class AuditLogsSeeder extends Seeder
{
    public function run(): void
    {
        $users = NguoiDung::inRandomOrder()->limit(5)->get();

        if ($users->isEmpty()) {
            return;
        }

        $actions = [
            ['action' => 'Đăng nhập', 'entity' => 'Người dùng', 'details' => 'Người dùng đăng nhập vào hệ thống'],
            ['action' => 'Cập nhật', 'entity' => 'Hồ sơ thành viên', 'details' => 'Cập nhật thông tin sức khỏe'],
            ['action' => 'Thêm mới', 'entity' => 'Thiết bị', 'details' => 'Nhập mới lô hàng máy chạy bộ'],
            ['action' => 'Xóa', 'entity' => 'Lớp học', 'details' => 'Hủy lớp Yoga sáng do vắng khách'],
            ['action' => 'Đăng xuất', 'entity' => 'Người dùng', 'details' => 'Người dùng đăng xuất khỏi hệ thống'],
            ['action' => 'Thanh toán', 'entity' => 'Hóa đơn', 'details' => 'Thanh toán gói tập 6 tháng'],
        ];

        for ($i = 0; $i < 20; $i++) {
            $randomAction = $actions[array_rand($actions)];

            AuditLogs::create([
                'entity_type' => $randomAction['entity'],
                'entity_id' => rand(1, 100), // Random ID
                'action' => $randomAction['action'],
                'performed_by' => $users->random()->user_id,
                'performed_at' => now()->subMinutes(rand(1, 10000)),
                'details' => $randomAction['details'],
            ]);
        }
    }
}
