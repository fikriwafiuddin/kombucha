<?php

namespace App\Models;

use Database\Factories\SiteContentFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string|null $hero_headline
 * @property string|null $hero_subheadline
 * @property string|null $hero_cta_text
 * @property string|null $hero_image
 * @property string|null $about_tag
 * @property string|null $about_title
 * @property string|null $about_description
 * @property string|null $about_feature_1_icon
 * @property string|null $about_feature_1_title
 * @property string|null $about_feature_1_description
 * @property string|null $about_feature_2_icon
 * @property string|null $about_feature_2_title
 * @property string|null $about_feature_2_description
 * @property string|null $about_image_1
 * @property string|null $about_image_2
 * @property string|null $benefits_title
 * @property string|null $benefits_description
 * @property string|null $benefits_card_1_icon
 * @property string|null $benefits_card_1_title
 * @property string|null $benefits_card_1_description
 * @property string|null $benefits_card_2_icon
 * @property string|null $benefits_card_2_title
 * @property string|null $benefits_card_2_description
 * @property string|null $benefits_card_3_icon
 * @property string|null $benefits_card_3_title
 * @property string|null $benefits_card_3_description
 * @property string|null $whatsapp
 * @property string|null $operating_hours
 * @property string|null $instagram
 * @property string|null $email
 * @property string|null $address
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'hero_headline',
    'hero_subheadline',
    'hero_cta_text',
    'hero_image',
    'about_tag',
    'about_title',
    'about_description',
    'about_feature_1_icon',
    'about_feature_1_title',
    'about_feature_1_description',
    'about_feature_2_icon',
    'about_feature_2_title',
    'about_feature_2_description',
    'about_image_1',
    'about_image_2',
    'benefits_title',
    'benefits_description',
    'benefits_card_1_icon',
    'benefits_card_1_title',
    'benefits_card_1_description',
    'benefits_card_2_icon',
    'benefits_card_2_title',
    'benefits_card_2_description',
    'benefits_card_3_icon',
    'benefits_card_3_title',
    'benefits_card_3_description',
    'whatsapp',
    'operating_hours',
    'instagram',
    'email',
    'address',
])]
class SiteContent extends Model
{
    /** @use HasFactory<SiteContentFactory> */
    use HasFactory;

    /**
     * The site content is a singleton identified by a fixed primary key (1),
     * so we manage the key explicitly rather than relying on auto-increment.
     */
    public $incrementing = false;

    protected $keyType = 'int';

    /**
     * Default values used when the singleton row does not exist yet.
     *
     * @return array<string, mixed>
     */
    public static function defaults(): array
    {
        return [
            'hero_headline' => null,
            'hero_subheadline' => null,
            'hero_cta_text' => null,
            'hero_image' => null,
            'about_tag' => 'Filosofi',
            'about_title' => 'Apa itu Kombucha?',
            'about_description' => 'Kombucha adalah teh fermentasi yang telah dikonsumsi selama ribuan tahun. Di Kombucha Co., kami menjaga tradisi ini dengan menggunakan bahan-bahan organik pilihan dan proses fermentasi lambat selama 14 hari untuk menghasilkan profil rasa yang seimbang.',
            'about_feature_1_icon' => 'eco',
            'about_feature_1_title' => '100% Organik',
            'about_feature_1_description' => 'Hanya menggunakan teh dan gula organik premium.',
            'about_feature_2_icon' => 'health_and_safety',
            'about_feature_2_title' => 'Tanpa Pengawet',
            'about_feature_2_description' => 'Murni hasil fermentasi alami tanpa bahan kimia.',
            'about_image_1' => null,
            'about_image_2' => null,
            'benefits_title' => 'Kebaikan di Setiap Tetes',
            'benefits_description' => 'Sangat kaya akan probiotik, antioksidan, dan asam organik yang mendukung kesejahteraan tubuh Anda.',
            'benefits_card_1_icon' => 'desk',
            'benefits_card_1_title' => 'Pencernaan Sehat',
            'benefits_card_1_description' => 'Membantu menyeimbangkan mikrobioma usus dan memperlancar metabolisme tubuh setiap hari.',
            'benefits_card_2_icon' => 'shield_with_heart',
            'benefits_card_2_title' => 'Imunitas Kuat',
            'benefits_card_2_description' => 'Kandungan antioksidan tinggi membantu menangkal radikal bebas dan memperkuat daya tahan.',
            'benefits_card_3_icon' => 'bolt',
            'benefits_card_3_title' => 'Energi Alami',
            'benefits_card_3_description' => 'Alternatif kafein yang lebih ringan tanpa "crash", memberikan kesegaran instan secara alami.',
            'whatsapp' => null,
            'operating_hours' => null,
            'instagram' => null,
            'email' => 'hello@kombuchaco.com',
            'address' => null,
        ];
    }
}
