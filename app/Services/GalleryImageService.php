<?php

namespace App\Services;

use App\Models\GalleryImage;
use App\Services\Contracts\GalleryImageService as GalleryImageServiceContract;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

class GalleryImageService implements GalleryImageServiceContract
{
    public function all(): Collection
    {
        return GalleryImage::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
    }

    public function create(array $data): GalleryImage
    {
        return GalleryImage::create($this->resolveImage($data));
    }

    public function update(GalleryImage $galleryImage, array $data): GalleryImage
    {
        $galleryImage->update($this->resolveImage($data, $galleryImage));

        return $galleryImage->fresh();
    }

    public function delete(GalleryImage $galleryImage): void
    {
        $this->deleteImage($galleryImage);

        $galleryImage->delete();
    }

    /**
     * When an image file was uploaded, store it on the public disk under the
     * gallery folder, remove the previously stored image (on updates), and
     * replace the upload in the data array with its stored path. When no file
     * is present the existing value is left untouched, so updates that do not
     * resend the image keep the current one.
     *
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private function resolveImage(array $data, ?GalleryImage $galleryImage = null): array
    {
        $image = $data['image'] ?? null;

        if (! $image instanceof UploadedFile) {
            return $data;
        }

        if ($galleryImage?->image) {
            $this->deleteImageFile($galleryImage->image);
        }

        $data['image'] = $image->store('gallery', 'public');

        return $data;
    }

    private function deleteImage(GalleryImage $galleryImage): void
    {
        if ($galleryImage->image) {
            $this->deleteImageFile($galleryImage->image);
        }
    }

    private function deleteImageFile(string $path): void
    {
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}
