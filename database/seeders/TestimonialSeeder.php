<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $testimonials = [
            [
                'name' => 'Amelia S.',
                'role' => 'Verified Buyer',
                'avatar' => 'avatars/EsxbrSo4oD8QCaNlz1BIhHMlykieaPqMApVCpdcw.jpg',
                'review' => 'Rasanya sangat segar dan membantu pencernaan saya menjadi jauh lebih baik setelah rutin mengonsumsinya.',
                'rating' => 5,
                'status' => 'published',
                'sort_order' => 0,
            ],
            [
                'name' => 'Budi H.',
                'role' => 'Verified Buyer',
                'avatar' => null,
                'review' => 'Wild Ginger Roots favorit saya, pedasnya pas dan terasa benar-benar alami. Worth the price!',
                'rating' => 4,
                'status' => 'published',
                'sort_order' => 1,
            ],
            [
                'name' => 'Clara D.',
                'role' => 'New Customer',
                'avatar' => null,
                'review' => 'Pengiriman cepat dan packaging aman. Masih mencoba beberapa rasa lain.',
                'rating' => 5,
                'status' => 'published',
                'sort_order' => 2,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::updateOrCreate(
                ['name' => $testimonial['name']],
                $testimonial,
            );
        }
    }
}
