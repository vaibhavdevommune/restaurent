<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    // Get all customers
    public function index()
    {
        return response()->json(Customer::all());
    }

    // Store a new customer
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|unique:customers,email',
            'address' => 'nullable|string|max:500',
        ]);

        $customer = Customer::create($validated);

        return response()->json($customer, 201);
    }

    // Show a single customer
    public function show($id)
    {
        $customer = Customer::findOrFail($id);
        return response()->json($customer);
    }

    // Update customer
    public function update(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|unique:customers,email,' . $customer->id,
            'address' => 'nullable|string|max:500',
        ]);

        $customer->update($validated);

        return response()->json($customer);
    }

    // Delete customer
    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();

        return response()->json(['message' => 'Customer deleted successfully']);
    }
}