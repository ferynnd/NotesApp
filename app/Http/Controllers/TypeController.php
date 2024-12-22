<?php

namespace App\Http\Controllers;

use App\Models\Type;
use App\Models\Note; // Assuming you have a Note model
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TypeController extends Controller
{

    public function store(Request $request)
    {
        // Set validation
        $request->validate([
            'type_name' => 'required|string|max:50', // Adjusted to match migration
        ]);
    
        // Create a new type using the authenticated user's ID
        Type::create([
            'type_name' => $request->type_name,
            'user_id' => Auth::id(), // Get the authenticated user's ID
        ]);

        return to_route('dashboard');
    }

    public function destroy($id)
    {
        // Find the type by ID
        $type = Type::findOrFail($id);

        // Delete the type
        $type->delete();

        // Redirect back with a success message
        return to_route('dashboard');
    }
}