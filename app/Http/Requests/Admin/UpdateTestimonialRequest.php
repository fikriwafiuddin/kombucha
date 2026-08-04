<?php

namespace App\Http\Requests\Admin;

use App\Concerns\HasIndonesianMessages;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTestimonialRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:120'],
            'role' => ['nullable', 'string', 'max:120'],
            'avatar' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp', 'max:2048'],
            'review' => ['required', 'string'],
            'rating' => ['required', 'integer', 'between:1,5'],
            'status' => ['required', 'in:published,draft'],
            'sort_order' => ['integer'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'name' => 'nama pelanggan',
            'role' => 'peran',
            'avatar' => 'avatar',
            'review' => 'isi ulasan',
            'rating' => 'rating',
            'status' => 'status',
            'sort_order' => 'urutan',
        ];
    }
}
