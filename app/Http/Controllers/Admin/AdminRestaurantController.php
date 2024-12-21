<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminRestaurantController extends Controller
{
    public function index()
    {
        $restaurants = RestaurantResource::collection(Restaurant::all());
        return Inertia::render('Admin/Restaurant/Index', ['restaurants' => $restaurants]);
    }

    public function update(Request $request, $restaurantId)
    {
        $validated = $request->validate([
            'delivery_fee' => 'sometimes|boolean',
            'confirmed' => 'sometimes|boolean',
        ]);
        Restaurant::findOrFail($restaurantId)->update($validated);
        return redirect()->back();
    }

    public function destroy($id)
    {
        $res = Restaurant::findOrFail($id);
        $res->delete();
    }
}
