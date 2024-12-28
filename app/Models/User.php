<?php

namespace App\Models;

use App\IMustVerifyMobile;
use App\MustVerifyMobile;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notification;

class User extends Authenticatable implements MustVerifyEmail, IMustVerifyMobile
{
    use HasFactory, Notifiable, HasRoles, HasApiTokens, MustVerifyMobile, CanResetPassword;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $appends = ['roles'];

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'isSuperAdmin',
        'isLoyalty',
        'isDelivery',
        'email_verify_code'
    ];
    public function routeNotificationForVonage(Notification $notification): string
    {
        return $this->phone;
    }
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */

    public function getRolesAttribute()
    {
        return $this->roles();
    }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'phone_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function restaurants()
    {
        return $this->hasMany(Restaurant::class)
            ->orWhereIn('id', $this->employments->pluck('restaurant_id'));
    }


    public function address()
    {
        return $this->hasMany(Address::class);
    }

    public function employments()
    {
        return $this->belongstoMany(Restaurant::class, 'restaurant_user')->withPivot('adminRights');
    }

    public function employedAtRestaurant(int $restaurantId): bool
    {
        return $this->employments()
            ->where('restaurant_id', $restaurantId)
            ->wherePivot('adminRights', true)
            ->exists();
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function delivering()
    {
        return $this->hasMany(Order::class, 'delivery_user_id');

    }

    public function expoTokens()
    {
        return $this->hasMany(ExpoToken::class);
    }
}
