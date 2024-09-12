<?php

namespace App\Policies;

use App\Models\Category;
use App\Models\Restaurant;
use App\Models\User;

class CategoryPolicy
{
    public function view(User $user, Category $category)
    {
        return $category->restaurant->authorizeEdit($user);
    }

    public function create(User $user, Restaurant $restaurant)
    {
        $restaurant->authorizeEdit($user);
    }

    public function update(User $user, Category $category)
    {
        return $category->restaurant->authorizeEdit($user);
    }

    public function delete(User $user, Category $category)
    {
        return $category->restaurant->authorizeEdit($user);
    }
}