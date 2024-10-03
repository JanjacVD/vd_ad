<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LoginResponseResource extends JsonResource
{
    /**
     * @resourceModel
     * @attributes {
     *   "token": "string",
     *   "user": "\App\Http\Resources\UserResource",
     * }
     */
    public function toArray(Request $request): array
    {
        return [
            'user' => new UserResource($this->resource),
            'token' => $this->resource->createToken($request->header('User-Agent'))->plainTextToken
        ];
    }
}
