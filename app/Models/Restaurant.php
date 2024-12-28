<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Restaurant extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'img',
        'is_open',
        'user_id',
        'confirmed',
        'is_accepting_deliveries',
        'delivery_fee',
        'work_days',
        'address_id',
        'contact'
    ];

    public function tags()
    {
        return $this->belongsToMany(Tag::class, );
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function employees()
    {
        return $this->belongsToMany(User::class, 'restaurant_user')->withPivot('adminRights');
    }


    public function invites()
    {
        return $this->hasMany(RestaurantInvite::class);
    }

    public function authorizeEdit(User $user)
    {
        return $this->user_id === $user->id || $this->userIsEmployed($user);
    }

    public function userIsEmployed(User $user)
    {
        return $this->employees()
            ->where('user_id', $user->id)
            ->wherePivot('adminRights', true)
            ->exists();
    }

    public function canOrder()
    {
        return $this->is_open && $this->is_accepting_deliveries && $this->confirmed && $this->isWithinOperatingHours();
    }


    public function isWithinOperatingHours()
    {
        $schedule = json_decode($this->work_days);
        $currentTime = Carbon::now('Europe/Zagreb');
        $currentDay = strtolower($currentTime->format('D')); // Get the current day (e.g., 'mon', 'tue')
        $currentTimeString = $currentTime->format('H:i'); // Get current time as a string (e.g., '14:30')
        // Check if the current day is null or not set

        if (!isset($schedule->$currentDay) || $schedule->$currentDay === null) {
            return false; // If no schedule or null, consider the day as non-working
        }

        $from = $schedule->$currentDay->from;
        $to = $schedule->$currentDay->to;

        // Handle the case where 'to' is smaller than 'from' (spanning to the next day)
        if ($to < $from) {
            // Determine if the time falls into the current or next day slot
            $isInCurrentDaySlot = $currentTimeString >= $from;
            $isInNextDaySlot = $currentTimeString <= $to;

            return $isInCurrentDaySlot || $isInNextDaySlot;
        }

        // Regular case where 'from' <= 'to'
        return $currentTimeString >= $from && $currentTimeString <= $to;
    }
}

