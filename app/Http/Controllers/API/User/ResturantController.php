<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\API\ApiController;
use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class ResturantController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $restaurant = Restaurant::with('tags')->where("confirmed", true)->get();
        return $this->_OK(RestaurantResource::collection($restaurant));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $restaurant = Restaurant::with(['tags', 'categories', 'categories.items'])->findOrFail($id);
        return $this->_OK(new RestaurantResource($restaurant));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
