<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\YeuCauHoanTien;
use App\Models\ThanhToan;
use App\Models\VaiTro;
use App\Models\VaiTroNguoiDung;
use Faker\Factory as Faker;
use Carbon\Carbon;

class YeuCauHoanTienSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('vi_VN');

        // Reasons in Vietnamese
        $reasons = [
            'Tôi muốn hủy gói tập vì chuyển nhà đi xa.',
            'Không hài lòng với chất lượng dịch vụ.',
            'Huấn luyện viên cá nhân không nhiệt tình.',
            'Gói tập quá nặng so với sức khỏe của tôi.',
            'Tôi bị chấn thương, không thể tiếp tục tập luyện.',
            'Đã thanh toán nhầm gói.',
            'Lịch làm việc thay đổi, không sắp xếp được thời gian.',
        ];

        $statuses = ['pending', 'approved', 'rejected', 'processed'];

        // Get successful payments
        $payments = ThanhToan::where('status', 'success')->get();

        if ($payments->isEmpty()) {
            $this->command->info('Không tìm thấy thanh toán thành công để tạo yêu cầu hoàn tiền.');
            return;
        }

        // Find an Admin or Staff to process requests
        // Check roles 'ADMIN' or 'STAFF'
        $adminRole = VaiTro::whereIn('code', ['ADMIN', 'STAFF'])->pluck('role_id');
        $admins = VaiTroNguoiDung::whereIn('role_id', $adminRole)->pluck('user_id');

        foreach ($payments as $payment) {
            // 20% chance to request refund
            if (rand(0, 100) < 20) {
                // Check if already requested
                if (YeuCauHoanTien::where('payment_id', $payment->payment_id)->exists()) {
                    continue;
                }

                $status = $statuses[array_rand($statuses)];
                $requestedAt = Carbon::parse($payment->created_at)->addDays(rand(1, 10));

                $processedBy = null;
                $processedAt = null;

                // If not pending, it must have been processed
                if ($status !== 'pending') {
                    if ($admins->isNotEmpty()) {
                        $processedBy = $admins->random();
                        $processedAt = $requestedAt->copy()->addDays(rand(1, 3));
                    } else {
                        // If no admin, force status to pending to be safe or leave processed_by null logic specific to user constraints?
                        // Schema allows null processed_by/at? NO. Schema said processed_by FK False (Not Null)??
                        // Let's re-read schema.
                        // Schema: processed_by FK False. <-- NOT NULL in schema text. 
                        // Migration code: $table->unsignedBigInteger('processed_by')->nullable(); <-- I made it Nullable in migration.
                        // So I can use null. Good.
                    }
                }

                // Important: payment->member_id refers to *ProfileMember->member_id* (as per ThanhToan model logic).
                // YeuCauHoanTien also links member_id to member_profiles.member_id. 
                // So we can directly use $payment->member_id.
                // WAIT. ThanhToan member_id FK -> member_profiles.member_id.
                // But earlier I removed the cascade on it? No, I kept FK but removed on delete.
                // So $payment->member_id IS the valid profile id.
                // Ensure it is not null (ThanhToan member_id is nullable?). 
                // ThanhToan migration: unsignedBigInteger('member_id')->nullable();
                // If payment member_id is null, we can't create a refund request linked to a member easily.

                if (!$payment->member_id) {
                    continue; // Skip anonymous payments if any
                }

                YeuCauHoanTien::create([
                    'payment_id' => $payment->payment_id,
                    'member_id' => $payment->member_id,
                    'reason' => $reasons[array_rand($reasons)],
                    'status' => $status,
                    'requested_at' => $requestedAt,
                    'processed_by' => $processedBy,
                    'processed_at' => $processedAt,
                ]);
            }
        }
    }
}
