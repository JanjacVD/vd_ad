<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'address' => ['required', 'array'],
            'address.formatted_address' => ['required', 'string'],
            'address.lat' => ['required', 'numeric'],
            'address.lng' => ['required', 'numeric'],
            'address.place_id' => ['required', 'string'],

            'note' => ['nullable', 'string'],
        ];

        if ($this->input('customOrder')) {
            $rules['customOrder'] = ['required', 'array'];
            $rules['customOrder.budget'] = ['required', 'numeric'];
            $rules['customOrder.item'] = ['required', 'string'];
            $rules['customOrder.location'] = ['required', 'string'];
        } else {
            $rules['items'] = ['required', 'array'];
            $rules['items.*.itemId'] = ['required', 'integer', 'exists:items,id'];
            $rules['items.*.count'] = ['required', 'integer', 'min:1'];
            $rules['items.*.note'] = ['nullable', 'string'];
        }

        return $rules;
    }
}
