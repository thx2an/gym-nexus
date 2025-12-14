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
            ['code' => 'Manager', 'name' => 'Manager'],
            ['code' => 'Staff', 'name' => 'Staff'],
            ['code' => 'PT', 'name' => 'PT'],
            ['code' => 'Member', 'name' => 'Member'],
        ];

        foreach ($roles as $role) {
            VaiTro::firstOrCreate(['code' => $role['code']], $role);
        }
    }
}
