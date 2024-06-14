<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Extras extends Model
{
    protected $fillable = ['title'];

    use HasFactory;
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_extras');
    }

    public function items()
    {
        return $this->belongsToMany(Item::class, 'item_extras');
    }
}
