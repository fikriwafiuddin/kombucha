<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreGalleryRequest;
use App\Http\Requests\Admin\UpdateGalleryRequest;
use App\Models\GalleryImage;
use App\Services\Contracts\GalleryImageService as GalleryImageServiceContract;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function __construct(
        private GalleryImageServiceContract $gallery,
    ) {}

    /**
     * Render the admin gallery management page.
     */
    public function index(): Response
    {
        return Inertia::render('admin/gallery', [
            'galleryImages' => $this->gallery->all(),
        ]);
    }

    /**
     * Store a newly created gallery image.
     */
    public function store(StoreGalleryRequest $request): RedirectResponse
    {
        $this->gallery->create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Foto galeri berhasil ditambahkan.']);

        return to_route('admin.gallery');
    }

    /**
     * Update the given gallery image.
     */
    public function update(UpdateGalleryRequest $request, GalleryImage $galleryImage): RedirectResponse
    {
        $this->gallery->update($galleryImage, $request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Foto galeri berhasil diperbarui.']);

        return to_route('admin.gallery');
    }

    /**
     * Delete the given gallery image.
     */
    public function destroy(GalleryImage $galleryImage): RedirectResponse
    {
        $this->gallery->delete($galleryImage);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Foto galeri berhasil dihapus.']);

        return to_route('admin.gallery');
    }
}
