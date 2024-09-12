<?php
namespace App\Policies;

use App\Models\User;
use App\Models\Restaurant;

class RestaurantPolicy
{
    public function view(User $user, Restaurant $restaurant)
    {
        return $restaurant->authorizeEdit($user);
    }

    public function create(User $user)
    {
        return true;
    }

    public function update(User $user, Restaurant $restaurant)
    {
        return $restaurant->authorizeEdit($user);
    }

    public function delete(User $user, Restaurant $restaurant)
    {
        return $user->id === $restaurant->user_id;
    }
}