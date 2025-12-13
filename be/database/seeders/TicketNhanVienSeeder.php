<?php

namespace Database\Seeders;

use App\Models\NguoiDung;
use App\Models\ProfileMember;
use App\Models\TicketNhanVien;
use Illuminate\Database\Seeder;

class TicketNhanVienSeeder extends Seeder
{
    public function run(): void
    {
        $members = ProfileMember::all();
        $staff = NguoiDung::inRandomOrder()->limit(5)->get(); // Get some staff users

        if ($members->isEmpty() || $staff->isEmpty()) {
            return;
        }

        $subjects = [
            'Máy chạy bộ số 3 bị hỏng băng chuyền',
            'Thắc mắc về việc gia hạn gói tập',
            'Không đăng nhập được vào ứng dụng',
            'Hệ thống điều hòa ở khu tạ yếu',
            'Yêu cầu thay đổi huấn luyện viên cá nhân',
            'Phản ánh thái độ nhân viên lễ tân',
            'Vòi sen trong phòng tắm nam bị rò rỉ',
            'Đề nghị mở thêm lớp Yoga buổi tối',
            'Cần tư vấn chế độ dinh dưỡng',
            'Thẻ thành viên không quẹt được'
        ];

        $categories = [
            'Cơ sở vật chất',
            'Dịch vụ khách hàng',
            'Kỹ thuật / Ứng dụng',
            'Đào tạo / HLV',
            'Tài chính / Gói tập'
        ];

        foreach ($members as $member) {
            // Create 0-2 tickets per member
            if (rand(0, 10) > 7) { // 30% chane to have tickets
                $numTickets = rand(1, 2);
                for ($i = 0; $i < $numTickets; $i++) {
                    TicketNhanVien::create([
                        'member_id' => $member->member_id,
                        'subject' => $subjects[array_rand($subjects)],
                        'category' => $categories[array_rand($categories)],
                        'status' => $this->randomStatus(),
                        'priority' => $this->randomPriority(),
                        'assigned_to' => $staff->random()->user_id,
                        'created_at' => now()->subDays(rand(0, 30)),
                        'updated_at' => now(),
                    ]);
                }
            }
        }
    }

    private function randomStatus()
    {
        $statuses = ['open', 'in_progress', 'waiting', 'resolved', 'closed'];
        return $statuses[array_rand($statuses)];
    }

    private function randomPriority()
    {
        $priorities = ['low', 'medium', 'high'];
        return $priorities[array_rand($priorities)];
    }
}
