<?php

namespace App\Policies;

use App\Models\User;
use App\Models\RestaurantInvite;

class RestaurantInvitePolicy
{
    public function accept(User $user, RestaurantInvite $invite)
    {
        return $user->email === $invite->email;
    }
}
