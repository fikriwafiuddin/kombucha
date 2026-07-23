<?php

namespace Database\Seeders;

use App\Models\GalleryImage;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $images = [
            'gallery/sgDORfRisnQEitFvNw2cekd9CXjan3TwgOEOm9VQ.jpg',
            'gallery/QvYccevD2vSa27wvuu3CsQSoxwps5iGqDqGib9AE.jpg',
            'gallery/f3TRicCyjnz9zeAs8toMHiGn3Q6AcnipX3AJvlqE.jpg',
            'gallery/JaoFW3b9X13IeYiu92uWxyGf3NDXGSwS6i9dFF3w.jpg',
        ];

        foreach ($images as $index => $image) {
            GalleryImage::updateOrCreate(
                ['image' => $image],
                ['sort_order' => $index],
            );
        }
    }
}
