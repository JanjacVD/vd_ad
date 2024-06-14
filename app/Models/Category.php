<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'img', 'restaurant_id', 'order'];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function extras()
    {
        return $this->belongsToMany(Extras::class, 'category_extras');
    }
}
