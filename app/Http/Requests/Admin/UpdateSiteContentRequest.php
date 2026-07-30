<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSiteContentRequest extends FormRequest
{
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
            'hero_headline' => ['nullable', 'string', 'max:255'],
            'hero_subheadline' => ['nullable', 'string'],
            'hero_cta_text' => ['nullable', 'string', 'max:120'],
            'hero_image' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp', 'max:2048'],
            'about_tag' => ['nullable', 'string', 'max:255'],
            'about_title' => ['nullable', 'string', 'max:255'],
            'about_description' => ['nullable', 'string'],
            'about_feature_1_icon' => ['nullable', 'string', 'max:50'],
            'about_feature_1_title' => ['nullable', 'string', 'max:120'],
            'about_feature_1_description' => ['nullable', 'string', 'max:255'],
            'about_feature_2_icon' => ['nullable', 'string', 'max:50'],
            'about_feature_2_title' => ['nullable', 'string', 'max:120'],
            'about_feature_2_description' => ['nullable', 'string', 'max:255'],
            'about_image_1' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp', 'max:2048'],
            'about_image_2' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp', 'max:2048'],
            'benefits_title' => ['nullable', 'string', 'max:255'],
            'benefits_description' => ['nullable', 'string'],
            'benefits_card_1_icon' => ['nullable', 'string', 'max:50'],
            'benefits_card_1_title' => ['nullable', 'string', 'max:120'],
            'benefits_card_1_description' => ['nullable', 'string'],
            'benefits_card_2_icon' => ['nullable', 'string', 'max:50'],
            'benefits_card_2_title' => ['nullable', 'string', 'max:120'],
            'benefits_card_2_description' => ['nullable', 'string'],
            'benefits_card_3_icon' => ['nullable', 'string', 'max:50'],
            'benefits_card_3_title' => ['nullable', 'string', 'max:120'],
            'benefits_card_3_description' => ['nullable', 'string'],
            'whatsapp' => ['nullable', 'string', 'max:50'],
            'operating_hours' => ['nullable', 'string', 'max:120'],
            'instagram' => ['nullable', 'string', 'max:120'],
            'email' => ['nullable', 'string', 'email', 'max:255'],
            'address' => ['nullable', 'string'],
        ];
    }
}
