<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $fillable = ['price', 'name', 'description', 'img'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function extras()
    {
        return $this->belongsToMany(Extras::class, 'item_extras');
    }
}
