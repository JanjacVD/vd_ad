<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomOrderItem extends Model
{
    use HasFactory;

    protected $fillable = ['location', 'budget', 'item', 'order_id'];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
