<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stock;

class StockController extends Controller
{
    public function index()
    {
        // Return all stocks
        return response()->json(Stock::all());
    }

    public function store(Request $request)
    {
        // Validate incoming data
        $validated = $request->validate([
            'product_name' => 'required|string',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
        ]);

        // Create a new stock entry
        $stock = Stock::create($validated);
        
        return response()->json($stock, 201);
    }

    public function show($id)
    {
        // Get a single stock by ID
        $stock = Stock::findOrFail($id);
        return response()->json($stock);
    }

    public function update(Request $request, $id)
    {
        // Find the stock and update it
        $stock = Stock::findOrFail($id);
        $stock->update($request->all());

        return response()->json($stock);
    }

    public function destroy($id)
    {
        // Delete the stock
        $stock = Stock::findOrFail($id);
        $stock->delete();

        return response()->json(null, 204);
    }
}
