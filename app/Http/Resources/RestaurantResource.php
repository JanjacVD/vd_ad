<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RestaurantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "confirmed" => $this->confirmed,
            "delivery_fee" => $this->delivery_fee,
            "id" => $this->id,
            "img" => $this->img,
            "is_accepting_deliveries" => $this->is_accepting_deliveries,
            "is_open" => $this->is_open,
            "name" => $this->name,
            'work_days' => json_decode($this->work_days),
            'tags' => $this->whenLoaded('tags', TagResource::collection($this->tags)),
            'address' => $this->whenLoaded('address', $this->address),
        ];
    }
}
