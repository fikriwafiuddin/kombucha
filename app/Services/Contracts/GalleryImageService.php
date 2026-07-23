<?php

namespace App\Services\Contracts;

use App\Models\GalleryImage;
use Illuminate\Support\Collection;

interface GalleryImageService
{
    /**
     * @return Collection<int, GalleryImage>
     */
    public function all(): Collection;

    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data): GalleryImage;

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(GalleryImage $galleryImage, array $data): GalleryImage;

    public function delete(GalleryImage $galleryImage): void;
}
