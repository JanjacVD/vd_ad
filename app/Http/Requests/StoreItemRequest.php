<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreItemRequest extends FormRequest
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
        return [
            'img' => 'nullable|file|image|max:2048',
            'name' => 'required|array',
            'name.*' => 'string|max:255',
            'description' => 'array',
            'description.*' => 'nullable|string|min:0|max:255',
            'price' => 'required|integer|min:0',
        ];
    }
}
