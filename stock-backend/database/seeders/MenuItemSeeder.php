<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MenuItem;
use App\Models\Category;

class MenuItemSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all();

        if ($categories->count() == 0) {
            $this->command->info('No categories found, skipping menu item seeding.');
            return;
        }

        MenuItem::create([
            'name' => 'Margherita Pizza',
            'description' => 'Classic cheese pizza with tomato sauce and basil.',
            'price' => 299.00,
            'category_id' => $categories->random()->id,
        ]);

        MenuItem::create([
            'name' => 'Veg Burger',
            'description' => 'Grilled veggie patty with lettuce and tomato.',
            'price' => 149.00,
            'category_id' => $categories->random()->id,
        ]);

        MenuItem::create([
            'name' => 'Butter Chicken',
            'description' => 'Creamy chicken curry served with naan.',
            'price' => 349.00,
            'category_id' => $categories->random()->id,
        ]);

        MenuItem::create([
            'name' => 'Cold Coffee',
            'description' => 'Chilled coffee with cream and ice.',
            'price' => 99.00,
            'category_id' => $categories->random()->id,
        ]);

        MenuItem::create([
            'name' => 'French Fries',
            'description' => 'Crispy golden potato fries.',
            'price' => 89.00,
            'category_id' => $categories->random()->id,
        ]);
    }
}
