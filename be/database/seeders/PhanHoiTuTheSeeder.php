<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PhanHoiTuThe;
use App\Models\PhienPhanTichTuThe;
use Faker\Factory as Faker;

class PhanHoiTuTheSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('vi_VN'); // Use Vietnamese locale

        // Get existing pose sessions to attach feedback to
        $pSessions = PhienPhanTichTuThe::all();

        if ($pSessions->count() === 0) {
            $this->command->info('Không tìm thấy phiên phân tích tư thế nào. Bỏ qua seed Phản Hồi Tư Thế.');
            return;
        }

        foreach ($pSessions as $session) {
            // Create 1-3 feedbacks for each session
            $numFeedbacks = rand(1, 3);
            for ($i = 0; $i < $numFeedbacks; $i++) {
                $type = $faker->randomElement(['warning', 'correction', 'praise']);

                $message = '';
                switch ($type) {
                    case 'warning':
                        $message = $faker->randomElement([
                            'Cẩn thận, lưng bạn đang bị cong.',
                            'Đầu gối vượt quá mũi chân, hãy điều chỉnh lại.',
                            'Hít thở không đều, hãy tập trung vào nhịp thở.',
                            'Vai đang bị gồng, hãy thả lỏng vai.'
                        ]);
                        break;
                    case 'correction':
                        $message = $faker->randomElement([
                            'Hãy giữ lưng thẳng hơn.',
                            'Hạ thấp trọng tâm thêm một chút.',
                            'Đẩy hông ra sau nhiều hơn.',
                            'Gồng cơ bụng để bảo vệ cột sống.'
                        ]);
                        break;
                    case 'praise':
                        $message = $faker->randomElement([
                            'Tốt lắm! Form chuẩn.',
                            'Giữ vững tư thế này nhé.',
                            'Tuyệt vời, bạn đang làm rất tốt.',
                            'Cải thiện rõ rệt so với lần trước.'
                        ]);
                        break;
                }

                PhanHoiTuThe::create([
                    'pose_id' => $session->pose_id,
                    'timestamp' => $faker->randomFloat(2, 0, 60), // Random timestamp within 60s
                    'feedback_type' => $type,
                    'message' => $message
                ]);
            }
        }
    }
}
