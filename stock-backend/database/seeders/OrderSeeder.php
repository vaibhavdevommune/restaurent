<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\MenuItem;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        // Create 5 dummy orders
        for ($i = 1; $i <= 5; $i++) {
            $order = Order::create([
                'customer_name' => 'Customer ' . $i,
                'table_number' => 'T' . rand(1, 10),
                'status' => 'pending',
                'total_amount' => 0,
            ]);

            $total = 0;

            // Add 2 random menu items per order
            $items = MenuItem::inRandomOrder()->take(2)->get();

            foreach ($items as $item) {
                $qty = rand(1, 3);
                $price = $item->price;

                OrderItem::create([
                    'order_id' => $order->id,
                    'menu_item_id' => $item->id,
                    'quantity' => $qty,
                    'price' => $price,
                ]);

                $total += $price * $qty;
            }

            // Update total
            $order->update(['total_amount' => $total]);
        }
    }
}
