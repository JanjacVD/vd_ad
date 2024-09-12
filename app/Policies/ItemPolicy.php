<?php

namespace App\Policies;

use App\Models\Category;
use App\Models\User;
use App\Models\Item;

class ItemPolicy
{
    public function view(User $user, Item $item)
    {
        return $item->category->restaurant->authorizeEdit($user);
    }

    public function create(User $user, Category $category)
    {
        return $category->restaurant->authorizeEdit($user);
    }

    public function update(User $user, Item $item)
    {
        return $item->category->restaurant->authorizeEdit($user);
    }

    public function delete(User $user, Item $item)
    {
        return $item->category->restaurant->authorizeEdit($user);
    }
}
