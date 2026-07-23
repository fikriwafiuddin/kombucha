<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faqs = [
            [
                'question' => 'Apa itu Kombucha?',
                'answer' => 'Teh fermentasi yang kaya akan probiotik, antioksidan, dan asam organik yang baik untuk kesehatan pencernaan.',
                'sort_order' => 0,
            ],
            [
                'question' => 'Daya simpan produk?',
                'answer' => 'Produk kami tahan hingga 3 bulan di dalam kulkas pada suhu 2-4 derajat Celsius.',
                'sort_order' => 1,
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::create($faq);
        }
    }
}
