<?php

namespace Database\Seeders;

use App\Models\PhanTichRuiRo;
use App\Models\ProfileMember;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PhanTichRuiRoSeeder extends Seeder
{
    public function run(): void
    {
        $members = ProfileMember::all();

        if ($members->isEmpty()) {
            return;
        }

        foreach ($members as $member) {
            // Create 1-3 analysis records per member
            for ($i = 0; $i < rand(1, 3); $i++) {
                $riskLevel = $this->randomRiskLevel();

                PhanTichRuiRo::create([
                    'member_id' => $member->member_id,
                    'analyzed_at' => now()->subDays(rand(0, 30))->subHours(rand(0, 24)),
                    'risk_level' => $riskLevel,
                    'score' => $this->getScoreForRisk($riskLevel),
                    'factors_json' => $this->generateVietnameseFactors($riskLevel),
                    'recommendations' => $this->generateVietnameseRecommendations($riskLevel),
                ]);
            }
        }
    }

    private function randomRiskLevel()
    {
        $levels = ['low', 'medium', 'high'];
        return $levels[array_rand($levels)];
    }

    private function getScoreForRisk($level)
    {
        return match ($level) {
            'low' => rand(0, 30) / 100, // 0.0 - 0.3
            'medium' => rand(31, 70) / 100, // 0.31 - 0.7
            'high' => rand(71, 100) / 100, // 0.71 - 1.0
        };
    }

    private function generateVietnameseFactors($level)
    {
        $factors = [];

        if ($level === 'high') {
            $factors = [
                'sai_tu_the' => 'Lưng cong quá mức khi squat',
                'trung_tam_trong_luc' => 'Mất cân bằng nghiêm trọng',
                'toc_do' => 'Thực hiện động tác quá nhanh',
                'tien_su' => 'Có tiền sử đau khớp gối'
            ];
        } elseif ($level === 'medium') {
            $factors = [
                'sai_tu_the' => 'Đầu gối hơi chụm vào trong',
                'trung_tam_trong_luc' => 'Hơi lệch sang phải',
                'nhip_tho' => 'Thở không đều'
            ];
        } else {
            $factors = [
                'tu_the' => 'Tương đối chuẩn',
                'suc_ben' => 'Cần cải thiện thêm',
            ];
        }

        return $factors; // Model casts this to array/json automatically
    }

    private function generateVietnameseRecommendations($level)
    {
        if ($level === 'high') {
            return "CẢNH BÁO: Nguy cơ chấn thương cao. Bạn cần dừng tập ngay lập tức và tham khảo ý kiến huấn luyện viên. Hãy tập trung vào việc sửa tư thế lưng và giảm tạ. Không nên tiếp tục với cường độ hiện tại.";
        } elseif ($level === 'medium') {
            return "Lưu ý: Bạn đang có một số lỗi kỹ thuật nhỏ. Hãy chú ý giữ thẳng lưng và mở rộng đầu gối khi xuống tạ. Nên giảm trọng lượng tạ một chút để hoàn thiện kỹ thuật.";
        } else {
            return "Tuyệt vời: Tư thế của bạn khá tốt. Hãy duy trì phong độ này và tập trung vào việc kiểm soát hơi thở đều đặn. Có thể tăng nhẹ mức tạ nếu cảm thấy thoải mái.";
        }
    }
}
