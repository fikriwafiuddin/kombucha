<?php

namespace Database\Seeders;

use App\Models\SiteContent;
use Illuminate\Database\Seeder;

class SiteContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // The site content is a singleton with a fixed primary key (1). Because
        // `id` is not mass-assignable, assign it explicitly before saving.
        $siteContent = SiteContent::findOrNew(1);
        $siteContent->id = 1;

        $siteContent->fill([
            'hero_headline' => 'Hidup Sehat Mulai Dari Gut Health Anda',
            'hero_subheadline' => 'Kombucha artisan berkualitas tinggi yang difermentasi dengan cinta dan bahan alam terbaik untuk keseimbangan tubuh Anda setiap harinya.',
            'hero_cta_text' => 'Pesan Sekarang',
            'hero_image' => 'hero/P6WLSR8dy4QKFjAk2KK39qYn6ZXL5Bzus1lIj9ee.jpg',
            'whatsapp' => '812-3456-7890',
            'operating_hours' => 'Senin - Sabtu (08:00 - 18:00)',
            'instagram' => '@kombucha.co.id',
            'address' => 'Jl. Kemang Timur No. 42, Jakarta Selatan, DKI Jakarta 12730',
        ],
        )->save();
    }
}
