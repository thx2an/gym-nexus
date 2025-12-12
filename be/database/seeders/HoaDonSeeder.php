<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HoaDon;
use App\Models\ThanhToan;
use Faker\Factory as Faker;
use Carbon\Carbon;

class HoaDonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('vi_VN');

        // Get successful payments that don't have invoices yet (optional logic, or just all successful ones)
        // For simplicity in seeding, allow duplicates or just pick random successful ones.
        // Better: Pick successful payments.
        $payments = ThanhToan::where('status', 'success')->get();

        if ($payments->isEmpty()) {
            $this->command->info('Không tìm thấy thanh toán thành công để tạo hóa đơn.');
            return;
        }

        foreach ($payments as $payment) {
            // Check if invoice already exists for this payment (1-1 relationship typically)
            if (HoaDon::where('payment_id', $payment->payment_id)->exists()) {
                continue;
            }

            // Create Invoice
            $issueDate = Carbon::parse($payment->created_at)->addMinutes(rand(1, 60));

            HoaDon::create([
                'payment_id' => $payment->payment_id,
                'invoice_number' => 'INV-' . $issueDate->format('Ymd') . '-' . strtoupper($faker->bothify('????')),
                'issued_at' => $issueDate,
                'total_amount' => $payment->amount,
                'file_path' => '/invoices/' . $issueDate->format('Y/m') . '/INV-' . $payment->payment_id . '.pdf',
            ]);
        }
    }
}
