<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MenuItem;


class MenuItemController extends Controller
{
    public function index()
    {
        return MenuItem::all();
    }

    public function store(Request $request)
    {
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'required',
            'category' => 'required|string|max:255',
        ]);

        $menuItem = MenuItem::create($validated);


        return response()->json($menuItem, 201);
    }

    public function show($id)
    {
        $menuItem = MenuItem::findOrFail($id);
        return response()->json($menuItem);
    }

    public function update(Request $request, $id)
    {
        $menuItem = MenuItem::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'required',
            'category' => 'required|string|max:255',
        ]);

        $menuItem->update($validated);

        return response()->json($menuItem);
    }

    public function destroy($id)
    {
        $menuItem = MenuItem::findOrFail($id);
        $menuItem->delete();

        return response()->json(['message' => 'Menu item deleted successfully.']);
    }

     /**
     * Fetch all unique categories from the menu items.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function getCategories()
    {
        // Fetch distinct categories from the MenuItem model
        $categories = MenuItem::select('category')->distinct()->get();

        return response()->json($categories);
    }
}