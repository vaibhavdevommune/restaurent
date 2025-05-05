<?php

namespace Database\Seeders;

use App\Models\Stock; // Assuming you have a Stock model
use Illuminate\Database\Seeder;

class StockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Stock::create([
            'product_name' => 'Product 1',
            'quantity' => 100,
            'price' => 50,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        \App\Models\Stock::create([
            'product_name' => 'Product 2',
            'quantity' => 200,
            'price' => 60,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Add more stock items here...
    }
}
