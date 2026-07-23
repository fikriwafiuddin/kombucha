<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Contracts\SiteContentService as SiteContentServiceContract;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function __construct(
        private SiteContentServiceContract $siteContent,
    ) {}

    /**
     * Render the admin about section management page.
     */
    public function index(): Response
    {
        return Inertia::render('admin/about', [
            'siteContent' => $this->siteContent->get(),
        ]);
    }
}
