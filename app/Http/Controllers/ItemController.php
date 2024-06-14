<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Models\Items;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
    public function store(Request $request, $categoryId)
    {
        $category = Category::with('restaurant')->findOrFail($categoryId);
        if ($category->restaurant->user_id != auth()->user()->id)
            abort(403);
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
    public function edit(Item $items)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Item $items)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $items)
    {
        //
    }
}
