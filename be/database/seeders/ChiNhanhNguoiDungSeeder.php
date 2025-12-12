<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ChiNhanh;
use App\Models\NguoiDung;
use App\Models\ChiNhanhNguoiDung;
use Illuminate\Support\Facades\DB;

class ChiNhanhNguoiDungSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = NguoiDung::all();
        $branches = ChiNhanh::all();

        if ($users->isEmpty() || $branches->isEmpty()) {
            $this->command->info('Không tìm thấy người dùng hoặc chi nhánh để tạo dữ liệu.');
            return;
        }

        foreach ($users as $user) {
            // Mỗi người dùng thuộc ít nhất 1 chi nhánh
            // Random số lượng chi nhánh (1-2)
            $numberOfBranches = rand(1, 2);
            // Lấy ngẫu nhiên branches
            $randomBranches = $branches->random(min($numberOfBranches, $branches->count()));

            $isFirst = true;
            foreach ($randomBranches as $branch) {
                ChiNhanhNguoiDung::firstOrCreate(
                    [
                        'user_id' => $user->user_id,
                        'branch_id' => $branch->branch_id,
                    ],
                    [
                        'primary_flag' => $isFirst ? 1 : 0,
                    ]
                );
                $isFirst = false;
            }
        }
    }
}
