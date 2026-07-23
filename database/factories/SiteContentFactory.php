<?php

namespace Database\Factories;

use App\Models\SiteContent;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SiteContent>
 */
class SiteContentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'hero_headline' => $this->faker->sentence(4),
            'hero_subheadline' => $this->faker->sentence(12),
            'hero_cta_text' => 'Pesan Sekarang',
            'hero_cta_link' => 'https://wa.me/628123456789',
            'hero_image' => $this->faker->optional()->imageUrl(1920, 1080),
            'whatsapp' => $this->faker->numerify('8##-####-####'),
            'operating_hours' => 'Senin - Sabtu (08:00 - 18:00)',
            'instagram' => '@kombucha.co.id',
            'address' => $this->faker->streetAddress(),
        ];
    }
}
