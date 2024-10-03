<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * @resourceModel
     * @attributes {
     *   "id": "number",
     *   "name": "string",
     *   "verified": "boolean",
     *   "isSuperAdmin": "boolean",
     *   "isDelivery": "boolean",
     *   "isLoyalty": "boolean",
     *   "addresses": "\App\Http\Resources\AddressResource[]"
     * }
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            "name" => $this->name,
            "email" => $this->email,
            "phone" => $this->phone,
            "isEmailVerified" => (bool) $this->email_verified_at,
            "isPhoneVerified" => (bool) $this->phone_verified_at,
            "isSuperAdmin" => $this->isSuperAdmin,
            "isDelivery" => $this->isDelivery,
            "isLoyalty" => $this->isLoyalty,
            'addresses' => $this->whenLoaded('address', AddressResource::collection($this->address))
        ];
    }
}
