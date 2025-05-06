<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    // Get all categories
    public function index()
    {
        return Category::all();
    }

    // Create a new category
    public function store(Request $request)
    {
        // Validate the input
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // Create and store the category
        $category = Category::create([
            'name' => $validated['name'],
        ]);

        return response()->json($category, 201);
    }

    // Show a specific category
    public function show($id)
    {
        $category = Category::findOrFail($id);
        return response()->json($category);
    }

    // Update a specific category
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // Update the category
        $category->update([
            'name' => $validated['name'],
        ]);

        return response()->json($category);
    }

    // Delete a category
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json(['message' => 'Category deleted successfully.']);
    }
}
