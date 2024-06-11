<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = [
        'place_id',
        'formatted_address',
        'lat',
        'lng',
        'is_primary',
        'name'
    ];
    use HasFactory;
}
