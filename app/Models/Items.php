<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Items extends Model
{
    use HasFactory;

    protected $fillable = ['price', 'name', 'description', 'img'];

    public function category()
    {
        return $this->belongsTo(Categories::class);
    }

    public function extras()
    {
        return $this->belongsToMany(Extras::class, 'item_extras');
    }
}
