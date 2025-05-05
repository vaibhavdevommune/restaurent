<?php
// OrderController.php
namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        return response()->json(Order::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'table_number' => 'required|string|max:255',
            'menu_item' => 'required|integer',
            'quantity' => 'required|integer|min:1',
        ]);

        $order = Order::create([
            'customer_name' => $validated['customer_name'],
            'table_number' => $validated['table_number'],
            'total_amount' => 1000, // You can calculate this dynamically based on the menu items selected
            'status' => 'Pending', // Or default status
        ]);

        // Assuming you have a pivot or a separate table for order items
        $order->orderItems()->create([
            'menu_item_id' => $validated['menu_item'],
            'quantity' => $validated['quantity'],
            'price' => 100, // You should calculate the price based on the menu item
        ]);

        return response()->json($order, 201);
    }

    public function show($id)
    {
        $order = Order::findOrFail($id);
        return response()->json($order);
    }

    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $order->update($request->all());

        return response()->json($order);
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json(null, 204);
    }
}
