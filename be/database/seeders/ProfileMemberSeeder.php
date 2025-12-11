<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProfileMember;
use App\Models\VaiTro;
use Illuminate\Support\Facades\DB;

class ProfileMemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Find the MEMBER role
        $memberRole = VaiTro::where('code', 'MEMBER')->first();

        if (!$memberRole) {
            $this->command->error('Không tìm thấy vai trò MEMBER (Hội viên). Vui lòng chạy VaiTroSeeder trước.');
            return;
        }

        // Find users who have the MEMBER role
        $memberUserIds = DB::table('vai_tro_nguoi_dungs')
            ->where('role_id', $memberRole->role_id)
            ->pluck('user_id');

        if ($memberUserIds->isEmpty()) {
            $this->command->info('Không tìm thấy người dùng nào có vai trò Hội viên.');
            return;
        }

        $goals = [
            'Giảm cân',
            'Tăng cơ',
            'Duy trì sức khỏe',
            'Cải thiện sức bền',
            'Giảm mỡ bụng',
            'Tăng cân',
            'Chuẩn bị thi đấu',
            'Phục hồi sau chấn thương',
            'Cải thiện vóc dáng',
        ];

        $medicalHistories = [
            'Không có tiền sử bệnh lý.',
            'Từng bị chấn thương đầu gối.',
            'Huyết áp thấp.',
            'Dị ứng phấn hoa.',
            'Đau lưng mãn tính.',
            'Từng phẫu thuật dây chằng.',
            'Hen suyễn nhẹ.',
            'Không có vấn đề sức khỏe đáng kể.',
            null, // Một số người không có thông tin
            null,
        ];

        foreach ($memberUserIds as $userId) {
            // Check if profile already exists
            if (ProfileMember::where('user_id', $userId)->exists()) {
                continue;
            }

            ProfileMember::create([
                'user_id' => $userId,
                'current_height' => rand(150, 190), // cm
                'current_weight' => rand(45, 100), // kg
                'fitness_goal' => $goals[array_rand($goals)],
                'medical_history' => $medicalHistories[array_rand($medicalHistories)],
            ]);
        }
    }
}
