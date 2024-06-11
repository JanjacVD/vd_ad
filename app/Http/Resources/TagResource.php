<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TagResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = null;
    public function toArray($request): array
    {
        $locale = app()->getLocale();
        return [
            'id' => $this->id,
            'name' => $this->getTranslation('name', $locale),
            'img' => $this->img
        ];
    }
}
