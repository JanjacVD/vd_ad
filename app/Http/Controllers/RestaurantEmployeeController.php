<?php

namespace App\Http\Controllers;

use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;
use App\Models\RestaurantInvite;
use App\Models\User;
use App\Notifications\InviteToRestaurant;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;
use Illuminate\Support\Str;

class RestaurantEmployeeController extends Controller
{
    public function index($restaurantId)
    {
        $result = new RestaurantResource(Restaurant::with('employees')->findOrFail($restaurantId));
        return Inertia::render('Employees/Index', ['restaurant' => $result]);
    }

    public function sendInvite(Request $request, $restaurantId)
    {
        $restaurant = Restaurant::findOrFail($restaurantId);
        $validated = $request->validate([
            'email' => 'required|email',
            'adminRights' => 'boolean'
        ]);
        $invite = $restaurant->invites()->create([...$validated, 'hash' => Str::uuid()->toString()]);
        $invite->notify(new InviteToRestaurant($invite));
    }

    public function acceptInvite(Request $request)
    {
        $hash = $request->input('hash');
        $invite = RestaurantInvite::findOrFail($hash);

        if (auth()->user()->email !== $invite->email) {
            abort(403, "Invalid email");
        }

        $restaurant = $invite->restaurant;

        $restaurant->employees()->attach(auth()->user()->id, [
            'adminRights' => $invite->adminRights,
        ]);


        return redirect(route('dashboard'));
    }
    public function update(Request $request, $restaurantId, $employeeId)
    {
        $restaurant = Restaurant::findOrFail($restaurantId);
        $user = User::findOrFail($employeeId);

        $restaurant->employees()->updateExistingPivot($user->id, [
            'adminRights' => $request->input('adminRights'),
        ]);

        return redirect()->back();
    }


    public function destroy(Request $request, $restaurantId, $employeeId)
    {
        $restaurant = Restaurant::findOrFail($restaurantId);
        $restaurant->employees()->detach($employeeId);
        return redirect()->back();
    }
}
