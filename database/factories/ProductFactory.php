<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'Kombucha '.$this->faker->unique()->words(2, true),
            'description' => $this->faker->sentence(6),
            'price' => $this->faker->numberBetween(35000, 60000),
            'image' => fake()->imageUrl(400, 500, 'food'),
        ];
    }

    /**
     * Indicate that the product is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => []);
    }
}
