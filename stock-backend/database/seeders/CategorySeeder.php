<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Appetizers'],
            ['name' => 'Main Course'],
            ['name' => 'Desserts'],
            ['name' => 'Beverages'],
            ['name' => 'Specials'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
