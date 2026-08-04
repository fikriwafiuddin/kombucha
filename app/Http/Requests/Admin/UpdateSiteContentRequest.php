<?php

namespace App\Http\Requests\Admin;

use App\Concerns\HasIndonesianMessages;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSiteContentRequest extends FormRequest
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
            'hero_headline' => ['nullable', 'string', 'max:255'],
            'hero_subheadline' => ['nullable', 'string'],
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

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'hero_headline' => 'judul utama',
            'hero_subheadline' => 'sub-judul',
            'hero_image' => 'gambar hero',
            'about_tag' => 'label',
            'about_title' => 'judul tentang',
            'about_description' => 'deskripsi tentang',
            'about_feature_1_icon' => 'ikon fitur 1',
            'about_feature_1_title' => 'judul fitur 1',
            'about_feature_1_description' => 'deskripsi fitur 1',
            'about_feature_2_icon' => 'ikon fitur 2',
            'about_feature_2_title' => 'judul fitur 2',
            'about_feature_2_description' => 'deskripsi fitur 2',
            'about_image_1' => 'gambar tentang 1',
            'about_image_2' => 'gambar tentang 2',
            'benefits_title' => 'judul manfaat',
            'benefits_description' => 'deskripsi manfaat',
            'benefits_card_1_icon' => 'ikon manfaat 1',
            'benefits_card_1_title' => 'judul manfaat 1',
            'benefits_card_1_description' => 'deskripsi manfaat 1',
            'benefits_card_2_icon' => 'ikon manfaat 2',
            'benefits_card_2_title' => 'judul manfaat 2',
            'benefits_card_2_description' => 'deskripsi manfaat 2',
            'benefits_card_3_icon' => 'ikon manfaat 3',
            'benefits_card_3_title' => 'judul manfaat 3',
            'benefits_card_3_description' => 'deskripsi manfaat 3',
            'whatsapp' => 'nomor WhatsApp',
            'operating_hours' => 'jam operasional',
            'instagram' => 'akun Instagram',
            'email' => 'email',
            'address' => 'alamat',
        ];
    }
}
