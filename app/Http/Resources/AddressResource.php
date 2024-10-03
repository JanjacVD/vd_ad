<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
{
    /**
     * @resourceModel
     * @attributes {
     *   "place_id": "string",
     *   "formatted_address": "string",
     *   "lat": "number",
     *   "lng": "number",
     *   "is_primary": "boolean",
     *   "name": "string"
     * }
     */
    public function toArray(Request $request): array
    {
        return [
            'place_id' => $request->place_id,
            'formatted_address' => $request->formatted_address,
            'lat' => $request->lat,
            'lng' => $request->lng,
            'is_primary' => $request->is_primary,
            'name' => $request->name
        ];
    }
}
