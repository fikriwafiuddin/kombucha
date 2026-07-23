<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Wild Berry',
                'price' => 35000,
                'image' => 'products/hcgFe6LCJhOz4xK8qzgLZwRMH5XWoDvOmC4e3oTS.jpg',
                'description' => 'Campuran segar stroberi hutan dan bluberi organik.',
            ],
            [
                'name' => 'Ginger Lemon',
                'price' => 35000,
                'image' => 'products/lNh4I2hbLl60SjJhJFM3vOTFPSRwgB57C6w2BxBr.jpg',
                'description' => 'Jahe emprit pedas dengan perasan lemon segar.',
            ],
            [
                'name' => 'Hibiscus Rose',
                'price' => 65000,
                'image' => 'products/cZuAAssVoDZEBlIEtxM7nmEbhBwsBaCiZWNRt3Sg.jpg',
                'description' => 'Sentuhan bunga mawar dengan kesegaran kembang sepatu.',
            ],
            [
                'name' => 'Pure Green Tea',
                'price' => 30000,
                'image' => 'products/xkdLYVhJF5PxTsKTYXw0ff1RMKmGKLf2rzad5UuD.jpg',
                'description' => 'Teh hijau pilihan dengan fermentasi sempurna.',
            ],
            [
                'name' => 'Lavender Dream',
                'price' => 38000,
                'image' => 'products/mKu4Pl2iUntY8TUjESw99FpfXh24Tr8ItqDHOXDZ.jpg',
                'description' => 'Menenangkan pikiran dengan aroma lavender asli.',
            ],
            [
                'name' => 'Tropical Passion',
                'price' => 40000,
                'image' => 'products/AR4dcBMpW7hDtTmzRATRtCfl8bzZPRTGwBKTvsmO.jpg',
                'description' => 'Ledakan rasa markisa segar dalam setiap tegukan.',
            ],
            [
                'name' => 'Classic Black',
                'price' => 30000,
                'image' => 'products/xjR708CUP59ZOHvv286jm7ntxSb1FGHx5SvghtS5.jpg',
                'description' => 'Rasa otentik fermentasi teh hitam berkualitas tinggi.',
            ],
            [
                'name' => 'Apple Cinnamon',
                'price' => 68000,
                'image' => 'products/PQgRj9c66VMAgCH4mylRNbHXFSRxhlfTYX3YJEB2.jpg',
                'description' => 'Perpaduan klasik apel manis dan aroma kayu manis.',
            ],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(
                ['name' => $product['name']],
                $product,
            );
        }
    }
}
