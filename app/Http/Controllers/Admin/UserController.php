<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Users/Index', ['users' => User::whereNot('id', auth()->user()->id)->get()]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'isLoyalty' => 'sometimes|boolean',
            'isDelivery' => 'sometimes|boolean',
            'isSuperAdmin' => 'sometimes|boolean',
        ]);

        User::findOrFail($id)->update($validated);
        return redirect()->back();
    }
}
