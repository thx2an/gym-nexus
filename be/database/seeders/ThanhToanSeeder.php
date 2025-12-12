<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ThanhToan;
use App\Models\GoiHang;
use App\Models\BuoiTap;
use App\Models\ProfileMember;
use Faker\Factory as Faker;
use Carbon\Carbon;

class ThanhToanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('vi_VN'); // Use Vietnamese locale
        $goiHangs = GoiHang::all();
        $buoiTaps = BuoiTap::all();

        if ($goiHangs->isEmpty() || $buoiTaps->isEmpty()) {
            $this->command->info('Cần có dữ liệu cả Gói Hàng và Buổi Tập để tạo thanh toán (do ràng buộc khóa ngoại không được null).');
            return;
        }

        $methods = ['Chuyển khoản Ngân hàng', 'Tiền mặt', 'Ví Momo', 'Thẻ tín dụng', 'Quét mã QR'];
        $gateways = ['VNPAY', 'Momo', 'Tại quầy', 'MBBank App', 'ZaloPay'];
        $statuses = ['success', 'pending', 'failed', 'refunded'];

        // Scenario 1: Payment for Memberships
        // To satisfy session_id NOT NULL, we pick a random session (logically 'dummy' or related).
        foreach ($goiHangs as $goiHang) {
            if (rand(0, 100) < 60) { // 60% chance
                $status = ($goiHang->status == 'active') ? 'success' : $statuses[array_rand($statuses)];

                ThanhToan::create([
                    'member_id' => $goiHang->member_id,
                    'amount' => $faker->randomFloat(2, 1000000, 10000000), // 1M - 10M
                    'currency' => 'VND',
                    'status' => $status,
                    'method' => $methods[array_rand($methods)],
                    'gateway' => $gateways[array_rand($gateways)],
                    'gateway_transaction_id' => strtoupper($faker->bothify('TXN-PKG-####????')),
                    'membership_id' => $goiHang->membership_id,
                    'session_id' => $buoiTaps->random()->session_id, // Constraint requirement
                    'created_at' => $faker->dateTimeBetween('-6 months', 'now'),
                ]);
            }
        }

        // Scenario 2: Payment for Sessions
        // To satisfy membership_id NOT NULL, we pick a random membership.
        foreach ($buoiTaps as $buoiTap) {
            // Find profile for this user
            $profile = ProfileMember::where('user_id', $buoiTap->member_id)->first();

            if ($profile && rand(0, 100) < 40) { // 40% chance and profile must exist
                ThanhToan::create([
                    'member_id' => $profile->member_id, // Correctly use profile ID
                    'amount' => $faker->randomFloat(2, 200000, 500000), // 200k - 500k
                    'currency' => 'VND',
                    'status' => $statuses[array_rand($statuses)],
                    'method' => $methods[array_rand($methods)],
                    'gateway' => $gateways[array_rand($gateways)],
                    'gateway_transaction_id' => strtoupper($faker->bothify('TXN-SES-####????')),
                    'membership_id' => $goiHangs->random()->membership_id, // Constraint requirement
                    'session_id' => $buoiTap->session_id,
                    'created_at' => $buoiTap->start_time, // Pay at time of session
                ]);
            }
        }
    }
}
