<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\RestaurantResource;
use App\Models\Category;
use App\Models\Restaurant;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($restaurantId)
    {
        $restaurant = Restaurant::with('categories')->findOrFail($restaurantId);
        Gate::authorize('view', arguments: $restaurant);
        return Inertia::render('Menu/Categories/Index', ['restaurant' => new RestaurantResource($restaurant)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($restaurantId)
    {
        $restaurant = Restaurant::findOrFail($restaurantId);
        Gate::authorize('update', arguments: $restaurant);

        return Inertia::render('Menu/Categories/Create', ['restaurantId' => $restaurantId]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request, $restaurantId)
    {
        $validated = $request->validated();
        $restaurant = Restaurant::with('categories')->findOrFail($restaurantId);
        Gate::authorize('update', arguments: $restaurant);
        $order = $restaurant->categories()->count();
        if ($request->hasFile('img')) {
            $path = str_replace('public/images/', '', $request->file('img')->store('public/images'));
            $validated['img'] = $path;
        }
        $restaurant->categories()->create([...$validated, 'name' => json_encode($validated['name']), 'order' => $order]);
        return redirect()->route("categories.index", ["restaurant" => $restaurantId]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $categories)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($restaurant, $categoryId)
    {
        $category = Category::with('restaurant')->findOrFail($categoryId);
        Gate::authorize('update', arguments: $category);

        return Inertia::render('Menu/Categories/Create', ['restaurantId' => $restaurant, 'category' => new CategoryResource($category)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreCategoryRequest $request, $restaurantId)
    {
        $validated = $request->validated();
        $category = Category::with('restaurant')->findOrFail($request->id);
        Gate::authorize('update', arguments: $category);
        if ($request->hasFile('img')) {
            // Delete the old image if it exists
            if ($category->img) {
                Storage::delete('public/images/' . $category->img);
            }
            $path = str_replace('public/images/', '', $request->file('img')->store('public/images'));
            $validated['img'] = $path;
        } else {
            $validated['img'] = $category->img;
        }
        $category->update([
            ...$validated,
            'name' => json_encode($validated['name']),
        ]);
        return redirect(route('categories.index', ['restaurant' => new RestaurantResource($category->restaurant)]));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id, $catId)
    {
        $category = Category::with('restaurant')->findOrFail($catId);
        Gate::authorize('delete', arguments: $category);
        $category->delete();
    }
}
