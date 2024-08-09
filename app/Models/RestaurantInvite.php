<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class RestaurantInvite extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = ['hash', 'restaurant_id', 'email', 'adminRights'];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'email', 'email');
    }

}
