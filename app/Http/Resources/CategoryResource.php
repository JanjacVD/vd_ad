<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "img" => $this->img,
            'name' => json_decode($this->name),
            'order' => $this->order,
            'items' => $this->whenLoaded('items', ItemResource::collection($this->items))
        ];
    }
}
