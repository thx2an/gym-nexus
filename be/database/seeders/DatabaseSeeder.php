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
            GoiHangNguoiDungSeeder::class,
            GoiHangSeeder::class,
            ChiNhanhNguoiDungSeeder::class,
            ProfilePTSeeder::class,
            LichLamViecPTSeeder::class,
            BuoiTapSeeder::class,
            NoteBuoiTapSeeder::class,
            MaQRPhienTapSeeder::class,
            CheckinBuoiTapSeeder::class,
            ProfileMemberSeeder::class,
        ]);
    }
}
