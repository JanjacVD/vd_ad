<?php

namespace App\Http\Resources;

use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'status' => $this->status,
            'address' => $this->address->formatted_address,
            'rejectionMessage' => $this->rejection_message,
            'deliveryFee' => $this->delivery_fee,
            'items' => OrderItemResource::collection($this->orderItems),
            'customOrder' => $this->customOrder
        ];
    }
}
