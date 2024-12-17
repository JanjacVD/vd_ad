<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTagRequest;
use App\Http\Resources\TagResource;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tags = TagResource::collection(Tag::all());
        return Inertia::render('Tags/Index', ['tags' => $tags]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Tags/Create');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTagRequest $request)
    {
        $validated = $request->validated();
        if ($request->hasFile('img')) {
            $path = str_replace('public/images/', '', $request->file('img')->store('public/images'));
            $validated['img'] = $path;
        }
        Tag::create([
            ...$validated,
            'name' => json_encode($validated['name'])
        ]);
        return redirect()->route("tags.index");

    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $tag)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($tagId)
    {
        $tag = new TagResource(Tag::findOrFail($tagId));
        return Inertia::render('Tags/Create', ['tag' => $tag]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreTagRequest $request)
    {
        $validated = $request->validated();
        $tag = Tag::findOrFail($request->id);
        if ($request->hasFile('img')) {
            // Delete the old image if it exists
            if ($tag->img) {
                Storage::delete('public/images/' . $tag->img);
            }
            $path = str_replace('public/images/', '', $request->file('img')->store('public/images'));
            $validated['img'] = $path;
        } else {
            $validated['img'] = $tag->img;
        }
        $tag->update([
            ...$validated,
            'name' => json_encode($validated['name']),
        ]);
        return redirect(route('tags.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $tag = Tag::findOrFail($id);
        $tag->delete();
    }
}
