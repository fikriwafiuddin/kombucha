<?php

namespace App\Services;

use App\Models\SiteContent;
use App\Services\Contracts\SiteContentService as SiteContentServiceContract;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class SiteContentService implements SiteContentServiceContract
{
    /**
     * Resolve the singleton site content row (id = 1). When it does not yet
     * exist, an unsaved in-memory model with default values and the fixed
     * primary key is returned, so the first render and the first update both
     * work without special cases.
     *
     * The id is assigned explicitly (not via mass assignment) because the
     * singleton must keep a stable identity regardless of the auto-increment
     * counter.
     */
    public function get(): SiteContent
    {
        if ($siteContent = SiteContent::find(1)) {
            return $siteContent;
        }

        return tap(new SiteContent(SiteContent::defaults()), function (SiteContent $siteContent): void {
            $siteContent->id = 1;
        });
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(array $data): SiteContent
    {
        return tap($this->get(), function (SiteContent $siteContent) use (&$data): void {
            foreach (['hero_image' => 'hero', 'about_image_1' => 'about', 'about_image_2' => 'about'] as $field => $directory) {
                $data = $this->resolveImageField($siteContent, $data, $field, $directory);
            }

            $siteContent
                ->fill($data)
                ->save();
        });
    }

    /**
     * When an image file was uploaded for the given field, store it on the
     * public disk under the provided directory, remove the previously stored
     * image, and replace the upload in the data array with its stored path.
     * Non-upload values (including legacy external URLs already persisted) are
     * left untouched.
     *
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private function resolveImageField(SiteContent $siteContent, array $data, string $field, string $directory): array
    {
        $image = $data[$field] ?? null;

        if (! $image instanceof UploadedFile) {
            return $data;
        }

        $previous = $siteContent->{$field};

        $data[$field] = $image->store($directory, 'public');

        if ($previous && Storage::disk('public')->exists($previous)) {
            Storage::disk('public')->delete($previous);
        }

        return $data;
    }
}
