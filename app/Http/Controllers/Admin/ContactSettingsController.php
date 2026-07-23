<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Contracts\SiteContentService as SiteContentServiceContract;
use Inertia\Inertia;
use Inertia\Response;

class ContactSettingsController extends Controller
{
    public function __construct(
        private SiteContentServiceContract $siteContent,
    ) {}

    /**
     * Render the admin contact settings management page.
     */
    public function index(): Response
    {
        return Inertia::render('admin/contact-settings', [
            'siteContent' => $this->siteContent->get(),
        ]);
    }
}
