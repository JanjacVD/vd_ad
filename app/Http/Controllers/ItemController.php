<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreItemRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ItemResource;
use App\Models\Category;
use App\Models\Item;
use App\Models\Items;
use Illuminate\Http\Request;
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
        if ($category->restaurant->user_id != auth()->user()->id)
            abort(403);
        return Inertia::render('Menu/Items/Index', ['category' => new CategoryResource($category)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($categoryId)
    {

        $category = Category::with('restaurant')->findOrFail($categoryId);
        if ($category->restaurant->user_id != auth()->user()->id)
            abort(403);
        return Inertia::render('Menu/Items/Create', ['categoryId' => $category->id]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreItemRequest $request, $categoryId)
    {
        $validated = $request->validated();
        $category = Category::with('restaurant')->findOrFail($categoryId);
        if ($category->restaurant->user_id != auth()->user()->id)
            abort(403);
        if ($request->hasFile('img')) {
            $path = str_replace('public/images/', '', $request->file('img')->store('public/images'));
            $validated['img'] = $path;

        }
        $category->items()->create([...$validated, 'name' => json_encode($validated['name']), 'description' => json_encode($validated['description'])]);
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
        if ($item->category->restaurant->user_id != auth()->user()->id)
            abort(403);
        return Inertia::render('Menu/Items/Create', ['categoryId' => $item->category->id, 'item' => new ItemResource($item)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreItemRequest $request, $item)
    {
        $item = Item::with(['category', 'category.restaurant'])->findOrFail($item);
        if ($item->category->restaurant->user_id != auth()->user()->id)
            abort(403);
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
        if (!auth()->user()->id === $item->category->restaurant->user_id) {
            abort(403);
        }
        $item->delete();
    }
}
