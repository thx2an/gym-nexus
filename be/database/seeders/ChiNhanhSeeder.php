<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ChiNhanh;
use Faker\Factory as Faker;

class ChiNhanhSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('vi_VN');

        $gymNames = [
            'Gym Nexus Quận Thanh Khê',
            'Gym Nexus Quận Hòa Xuân',
            'Gym Nexus Quận Cẩm Lệ',
            'Gym Nexus Quận Sơn Trà',
            'Gym Nexus Quận Hải Châu',
        ];

        foreach ($gymNames as $index => $name) {
            ChiNhanh::firstOrCreate(
                ['name' => $name],
                [
                    'address' => $faker->address,
                    'phone' => $faker->phoneNumber,
                    'is_active' => true,
                ]
            );
        }
    }
}
