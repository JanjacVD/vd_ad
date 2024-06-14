<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    protected $fillable = [
        'name',
        'img',
        'is_open',
        'user_id',
        'confirmed',
        'is_accepting_deliveries',
        'delivery_fee',
        'work_days',
        'address_id'
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


    use HasFactory;
}
