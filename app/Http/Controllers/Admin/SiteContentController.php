<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateSiteContentRequest;
use App\Services\Contracts\SiteContentService as SiteContentServiceContract;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class SiteContentController extends Controller
{
    public function __construct(
        private SiteContentServiceContract $siteContent,
    ) {}

    /**
     * Update the singleton site content (Hero banner & Contact info).
     */
    public function update(UpdateSiteContentRequest $request): RedirectResponse
    {
        $this->siteContent->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Pengaturan konten berhasil disimpan.']);

        return back();
    }
}
