<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\NguoiDung;
use App\Models\VaiTro;
use App\Models\VaiTroNguoiDung;

class VaiTroNguoiDungSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = NguoiDung::all();
        $roles = VaiTro::all();

        if ($users->isEmpty() || $roles->isEmpty()) {
            return;
        }

        // Assign a random role to each user
        foreach ($users as $user) {
            VaiTroNguoiDung::create([
                'user_id' => $user->user_id,
                'role_id' => $roles->random()->role_id,
            ]);
        }
    }
}
