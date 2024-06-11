<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Worktime extends Model
{
    protected $fillable = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
    use HasFactory;
}
