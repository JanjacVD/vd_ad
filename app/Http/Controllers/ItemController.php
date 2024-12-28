<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreItemRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ItemResource;
use App\Models\Category;
use App\Models\Item;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Storage;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($categoryId)
    {

        $category = Category::with('restaurant', 'items')->findOrFail($categoryId);
        Gate::authorize('view', $category);
        return Inertia::render('Menu/Items/Index', ['category' => new CategoryResource($category)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($categoryId)
    {

        $category = Category::with('restaurant')->findOrFail($categoryId);
        Gate::authorize('create', $category->restaurant);
        return Inertia::render('Menu/Items/Create', ['categoryId' => $category->id]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreItemRequest $request, $categoryId)
    {
        $validated = $request->validated();
        $category = Category::with('restaurant')->findOrFail($categoryId);
        Gate::authorize('create', $category->restaurant);
        if ($request->hasFile('img')) {
            $path = str_replace('public/images/', '', $request->file('img')->store('public/images'));
            $validated['img'] = $path;

        }
        $description = null;
        if (isset($validated['description']['en']) && isset($validated['description']['hr'])) {
            $description =
                json_encode($validated['description']);
        }
        $category->items()->create([...$validated, 'name' => json_encode($validated['name']), 'description' => $description]);
        return Inertia::render('Menu/Items/Index', ['category' => new CategoryResource($category)]);

    }

    /**
     * Display the specified resource.
     */
    public function show(Item $items)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($category, $item)
    {

        $item = Item::with(['category', 'category.restaurant'])->findOrFail($item);
        Gate::authorize('update', $item);
        return Inertia::render('Menu/Items/Create', ['categoryId' => $item->category->id, 'item' => new ItemResource($item)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreItemRequest $request, $item)
    {
        $item = Item::with(['category', 'category.restaurant'])->findOrFail($item);
        Gate::authorize('update', $item);
        $validated = $request->validated();
        if ($request->hasFile('img')) {
            // Delete the old image if it exists
            if ($item->img) {
                Storage::delete('public/images/' . $item->img);
            }
            $path = str_replace('public/images/', '', $request->file('img')->store('public/images'));
            $validated['img'] = $path;
        } else {
            $validated['img'] = $item->img;
        }
        $item->update([...$validated, 'name' => json_encode($validated['name']), 'description' => json_encode($validated['description'])]);
        return Inertia::render('Menu/Items/Index', ['category' => new CategoryResource($item->category)]);



    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($itemId)
    {
        $item = Item::with(['category', 'category.restaurant'])->findOrFail($itemId);
        Gate::authorize('delete', $item);

        $item->delete();
    }
}
