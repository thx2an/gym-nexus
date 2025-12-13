<?php

namespace Database\Seeders;

use App\Models\KnowledgeBaseArticles;
use App\Models\NguoiDung;
use Illuminate\Database\Seeder;

class KnowledgeBaseArticlesSeeder extends Seeder
{
    public function run(): void
    {
        // No role column in nguoi_dungs, so pick random users as staff/authors
        $staff = NguoiDung::inRandomOrder()->limit(3)->get();

        if ($staff->isEmpty()) {
            return;
        }

        $articles = [
            [
                'title' => 'Lợi ích của việc tập luyện cardio hàng ngày',
                'category' => 'Tập luyện',
                'content' => "Cardio không chỉ giúp đốt cháy calo mà còn cải thiện sức khỏe tim mạch. Hãy bắt đầu với 30 phút đi bộ nhanh hoặc chạy bộ mỗi ngày để cảm nhận sự khác biệt...",
                'status' => 'published',
            ],
            [
                'title' => 'Chế độ ăn cho người muốn tăng cơ giảm mỡ',
                'category' => 'Dinh dưỡng',
                'content' => "Protein là yếu tố then chốt. Hãy bổ sung ức gà, cá, trứng và các loại đậu vào thực đơn hàng ngày. Đồng thời, hạn chế tinh bột xấu và đường...",
                'status' => 'published',
            ],
            [
                'title' => 'Hướng dẫn sử dụng máy chạy bộ đúng cách',
                'category' => 'Hướng dẫn thiết bị',
                'content' => "Bước 1: Đứng hai chân lên thành máy. Bước 2: Kẹp khóa an toàn vào áo. Bước 3: Bấm nút Start và chờ băng chuyền khởi động. Bước 4: Bước vào thảm chạy...",
                'status' => 'published',
            ],
            [
                'title' => 'Nội quy phòng tập Gym Nexus',
                'category' => 'Quy định',
                'content' => "1. Mang khăn tập riêng. 2. Sắp xếp tạ về vị trí cũ sau khi tập. 3. Không chiếm dụng máy quá lâu khi có người chờ. 4. Giữ vệ sinh chung...",
                'status' => 'published',
            ],
            [
                'title' => 'Cách phòng tránh chấn thương khi tập tạ',
                'category' => 'An toàn',
                'content' => "Luôn khởi động kỹ trước khi tập. Chọn mức tạ phù hợp. Nhờ người đỡ khi tập nặng. Lắng nghe cơ thể và dừng lại ngay khi cảm thấy đau bất thường...",
                'status' => 'draft',
            ],
        ];

        foreach ($articles as $article) {
            KnowledgeBaseArticles::create([
                'title' => $article['title'],
                'category' => $article['category'],
                'content' => $article['content'],
                'status' => $article['status'],
                'created_by' => $staff->random()->user_id,
            ]);
        }
    }
}
