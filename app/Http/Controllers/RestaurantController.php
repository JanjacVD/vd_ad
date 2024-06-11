<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRestaurantRequest;
use App\Http\Resources\RestaurantResource;
use App\Http\Resources\TagResource;
use App\Models\Address;
use App\Models\Restaurant;
use App\Models\Tag;
use Gate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $restaurants = request()->user()->restaurants;
        $with = ['restaurants' => $restaurants];
        return Inertia::render('Restaurant/Index', $with);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tags = Tag::all();
        $collection = TagResource::collection($tags);
        return Inertia::render('Restaurant/Create', ['tags' => $collection]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRestaurantRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('img')) {
            $path = str_replace('public/images/', '', $request->file('img')->store('public/images'));
            $validated['img'] = $path;

        }
        $address = Address::create([...$validated['address'], 'name' => $validated['name']]);
        $restaurant = Restaurant::create([
            'name' => $validated['name'],
            'address_id' => $address->id,
            'user_id' => auth()->user()->id,
            'work_days' => json_encode($validated['work_days']),
            'img' => $validated['img'] ?? null,
        ]);

        if (isset($validated['tags'])) {
            $restaurant->tags()->sync($validated['tags']);
        }

        return redirect(route('my-restaurants.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Restaurant $restaurant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $restaurant = Restaurant::with(['tags', 'address'])->findOrFail($id);
        $tags = Tag::all();
        $collection = TagResource::collection($tags);
        return Inertia::render('Restaurant/Create', ['tags' => $collection, 'restaurant' => new RestaurantResource($restaurant)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Restaurant $restaurant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $restaurant = Restaurant::findOrFail($id);
        if (
            Gate::allows('delete', $restaurant)
        ) {
            $restaurant->tags()->detach();
            $restaurant->delete();
            $restaurant->address()->delete();
        }
        ;
    }
}
