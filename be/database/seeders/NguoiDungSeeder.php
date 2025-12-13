<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\NguoiDung;
use App\NguoiDung as AppNguoiDung;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class NguoiDungSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('vi_VN');

        // Create 10 dummy users
        for ($i = 0; $i < 10; $i++) {
            $isMale = $faker->boolean;
            NguoiDung::create([
                'full_name' => $isMale ? $faker->name('male') : $faker->name('female'),
                'email' => $faker->unique()->safeEmail,
                'phone' => $faker->unique()->phoneNumber,
                'password_hash' => '123456', // Will be hashed by mutator
                'gender' => $isMale ? 'Nam' : 'Nữ',
                'date_of_birth' => $faker->date('Y-m-d', '2005-01-01'),
                'status' => $faker->randomElement(['active', 'inactive', 'locked']),
                'hash_active' => null,
            ]);
        }
    }
}
