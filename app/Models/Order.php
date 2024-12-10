<?php

namespace App\Models;

use App\DeliveryStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['status', 'delivery_user_id', 'user_id', 'address_id', 'rejection_message', 'delivery_fee'];

    public function deliveryUser()
    {
        return $this->belongsTo(User::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function setStatus(DeliveryStatus $status): self
    {
        $this->update(['status' => $status->value]);
        return $this;
    }

    public function setDeliveryUser(User $user): self
    {
        $this->update(['delivery_user_id' => $user->id]);
        return $this;
    }


    public function setRejectionMessage($msg): self
    {
        $this->update(['rejection_message' => $msg]);
        return $this;
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function customOrder()
    {
        return $this->hasOne(CustomOrderItem::class);
    }
}
