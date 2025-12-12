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

        // Create explicit map or logic
        $memberRole = VaiTro::where('code', 'MEMBER')->first();
        $ptRole = VaiTro::where('code', 'PT')->first();
        $adminRole = VaiTro::where('code', 'ADMIN')->first();

        foreach ($users as $index => $user) {
            // Logic: 
            // First 2 users -> ADMIN (or random valid role if admin not found)
            // Next 3 users -> PT
            // Rest -> MEMBER

            $roleId = null;

            if ($index < 1 && $adminRole) {
                $roleId = $adminRole->role_id;
            } elseif ($index < 4 && $ptRole) { // Users 1, 2, 3 -> PT
                $roleId = $ptRole->role_id;
            } elseif ($memberRole) {
                $roleId = $memberRole->role_id;
            } else {
                $roleId = $roles->random()->role_id;
            }

            VaiTroNguoiDung::firstOrCreate([
                'user_id' => $user->user_id,
                'role_id' => $roleId,
            ]);
        }
    }
}
