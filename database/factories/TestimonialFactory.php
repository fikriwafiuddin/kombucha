<?php

namespace Database\Factories;

use App\Models\Testimonial;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Testimonial>
 */
class TestimonialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'role' => $this->faker->randomElement(['Verified Buyer', 'New Customer', 'Returning Customer']),
            'avatar' => $this->faker->optional()->imageUrl(200, 200, 'people'),
            'review' => $this->faker->sentence(12),
            'rating' => $this->faker->numberBetween(1, 5),
            'status' => 'published',
            'sort_order' => $this->faker->randomDigit(),
        ];
    }

    /**
     * Indicate that the testimonial is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes): array => [
            'status' => 'draft',
        ]);
    }

    /**
     * Indicate that the testimonial is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes): array => [
            'status' => 'published',
        ]);
    }
}
