<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Customer;

class CustomerSeeder extends Seeder
{
    public function run(): void
    {
        Customer::insert([
            [
                'name' => 'Rahul Sharma',
                'phone' => '9876543210',
                'email' => 'rahul@example.com',
            ],
            [
                'name' => 'Priya Mehta',
                'phone' => '9123456780',
                'email' => 'priya@example.com',
            ],
            [
                'name' => 'Amit Verma',
                'phone' => '9988776655',
                'email' => 'amit@example.com',
            ],
            [
                'name' => 'Sneha Rao',
                'phone' => '9012345678',
                'email' => 'sneha@example.com',
            ],
            [
                'name' => 'Karan Singh',
                'phone' => '9345678901',
                'email' => 'karan@example.com',
            ],
        ]);
    }
}
