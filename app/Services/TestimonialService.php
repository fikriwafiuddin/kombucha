<?php

namespace App\Services;

use App\Models\Testimonial;
use App\Services\Contracts\TestimonialService as TestimonialServiceContract;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

class TestimonialService implements TestimonialServiceContract
{
    public function all(): Collection
    {
        return Testimonial::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
    }

    public function create(array $data): Testimonial
    {
        return Testimonial::create($this->resolveAvatar($data));
    }

    public function update(Testimonial $testimonial, array $data): Testimonial
    {
        $testimonial->update($this->resolveAvatar($data, $testimonial));

        return $testimonial->fresh();
    }

    public function delete(Testimonial $testimonial): void
    {
        $this->deleteAvatar($testimonial);

        $testimonial->delete();
    }

    /**
     * When an avatar file was uploaded, store it on the public disk under the
     * avatars folder, remove the previously stored avatar (on updates), and
     * replace the upload in the data array with its stored path. When no file
     * is present the existing value is left untouched, so updates that do not
     * resend the avatar keep the current one.
     *
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private function resolveAvatar(array $data, ?Testimonial $testimonial = null): array
    {
        $avatar = $data['avatar'] ?? null;

        if (! $avatar instanceof UploadedFile) {
            return $data;
        }

        if ($testimonial?->avatar) {
            $this->deleteAvatarFile($testimonial->avatar);
        }

        $data['avatar'] = $avatar->store('avatars', 'public');

        return $data;
    }

    private function deleteAvatar(Testimonial $testimonial): void
    {
        if ($testimonial->avatar) {
            $this->deleteAvatarFile($testimonial->avatar);
        }
    }

    private function deleteAvatarFile(string $path): void
    {
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}
