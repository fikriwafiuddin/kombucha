<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Contracts\SiteContentService as SiteContentServiceContract;
use Inertia\Inertia;
use Inertia\Response;

class BenefitsController extends Controller
{
    public function __construct(
        private SiteContentServiceContract $siteContent,
    ) {}

    /**
     * Render the admin benefits section management page.
     */
    public function index(): Response
    {
        return Inertia::render('admin/benefits', [
            'siteContent' => $this->siteContent->get(),
        ]);
    }
}
