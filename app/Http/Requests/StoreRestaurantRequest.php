<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRestaurantRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'address' => 'nullable|array',
            'work_days' => 'required|array',
            'img' => 'nullable|file|image|max:2048',
            'contact' => 'required|string|max:20',
            'tags' => 'required|array',
            'tags.*' => 'integer|exists:tags,id',
        ];
    }
}
