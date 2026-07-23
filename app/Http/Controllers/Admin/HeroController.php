<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Contracts\SiteContentService as SiteContentServiceContract;
use Inertia\Inertia;
use Inertia\Response;

class HeroController extends Controller
{
    public function __construct(
        private SiteContentServiceContract $siteContent,
    ) {}

    /**
     * Render the admin hero management page.
     */
    public function index(): Response
    {
        $siteContent = $this->siteContent->get();

        return Inertia::render('admin/hero', [
            'siteContent' => $siteContent,
        ]);
    }

    /**
     * Resolve the stored hero image path to a publicly accessible URL.
     * Legacy external URLs (already absolute) are returned as-is.
     */
    private function resolveHeroImageUrl(?string $heroImage): ?string
    {
        if (! $heroImage) {
            return null;
        }

        if (str_starts_with($heroImage, 'http://') || str_starts_with($heroImage, 'https://')) {
            return $heroImage;
        }

        return Storage::disk('public')->url($heroImage);
    }
}
