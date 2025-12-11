<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProfilePT;
use App\Models\NguoiDung;
use App\Models\VaiTro;
use Illuminate\Support\Facades\DB;

class ProfilePTSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Find the PT role
        $ptRole = VaiTro::where('code', 'PT')->first();

        if (!$ptRole) {
            $this->command->error('Không tìm thấy vai trò PT (Huấn luyện viên). Vui lòng chạy VaiTroSeeder trước.');
            return;
        }

        // Find users who have the PT role
        // Assuming NguoiDung and VaiTro are connected via VaiTroNguoiDung pivot table
        // We need to query users who have this role.
        // Let's assume NguoiDung has a relationship or we query the pivot manually.
        // Since we didn't check NguoiDung model for roles relationship, let's try to infer or use DB query for pivot.
        // Or better, checking VaiTroNguoiDung model if exists? Yes it exists.

        $ptUserIds = DB::table('vai_tro_nguoi_dungs')
            ->where('role_id', $ptRole->role_id)
            ->pluck('user_id');

        if ($ptUserIds->isEmpty()) {
            $this->command->info('Không tìm thấy người dùng nào có vai trò PT.');
            return;
        }

        $specializations = [
            'Tăng cơ',
            'Giảm mỡ',
            'Yoga',
            'Cardio',
            'Kickboxing',
            'Phục hồi chấn thương',
            'Calisthenics',
            'Bodybuilding'
        ];

        $bios = [
            'Huấn luyện viên nhiệt tình, có 5 năm kinh nghiệm.',
            'Chuyên gia về giảm cân và dinh dưỡng.',
            'Đam mê thể hình, giúp bạn đạt được mục tiêu nhanh nhất.',
            'Kiên nhẫn, tận tâm, có chứng chỉ quốc tế.',
            'Phong cách huấn luyện nghiêm khắc nhưng hiệu quả.',
        ];

        foreach ($ptUserIds as $userId) {
            // Check if profile already exists
            if (ProfilePT::where('user_id', $userId)->exists()) {
                continue;
            }

            ProfilePT::create([
                'user_id' => $userId,
                'specialization' => $specializations[array_rand($specializations)],
                'bio' => $bios[array_rand($bios)],
                'experience_years' => rand(1, 10),
            ]);
        }
    }
}
