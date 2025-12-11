<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\VaiTro;

class VaiTroSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['code' => 'ADMIN', 'name' => 'Quản trị viên'],
            ['code' => 'STAFF', 'name' => 'Nhân viên'],
            ['code' => 'PT', 'name' => 'Huấn luyện viên'],
            ['code' => 'MEMBER', 'name' => 'Hội viên'],
        ];

        foreach ($roles as $role) {
            VaiTro::create($role);
        }
    }
}
