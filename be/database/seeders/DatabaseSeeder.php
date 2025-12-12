<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            VaiTroSeeder::class,
            NguoiDungSeeder::class,
            VaiTroNguoiDungSeeder::class,
            ChiNhanhSeeder::class,
            ChiNhanhNguoiDungSeeder::class,
            ProfileMemberSeeder::class,
            GoiHangNguoiDungSeeder::class,
            GoiHangSeeder::class,
            ProfilePTSeeder::class,
            LichLamViecPTSeeder::class,
            BuoiTapSeeder::class,
            CheckinBuoiTapSeeder::class,
            NoteBuoiTapSeeder::class,
            MaQRPhienTapSeeder::class,
            ThanhToanSeeder::class,
        ]);
    }
}
