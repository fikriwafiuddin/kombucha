<?php

namespace App\Http\Requests\Admin;

use App\Concerns\HasIndonesianMessages;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateGalleryRequest extends FormRequest
{
    use HasIndonesianMessages;

    /**
     * Admin content routes are intentionally public for this project.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'image' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp', 'max:2048'],
            'sort_order' => ['integer'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'image' => 'foto galeri',
            'sort_order' => 'urutan',
        ];
    }
}
