<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreFaqRequest;
use App\Http\Requests\Admin\UpdateFaqRequest;
use App\Models\Faq;
use App\Services\Contracts\FaqService as FaqServiceContract;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    public function __construct(
        private FaqServiceContract $faqs,
    ) {}

    /**
     * Render the admin FAQs management page.
     */
    public function index(): Response
    {
        return Inertia::render('admin/faqs', [
            'faqs' => $this->faqs->all(),
        ]);
    }

    /**
     * Store a newly created FAQ.
     */
    public function store(StoreFaqRequest $request): RedirectResponse
    {
        $this->faqs->create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'FAQ berhasil ditambahkan.']);

        return to_route('admin.faqs');
    }

    /**
     * Update the given FAQ.
     */
    public function update(UpdateFaqRequest $request, Faq $faq): RedirectResponse
    {
        $this->faqs->update($faq, $request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'FAQ berhasil diperbarui.']);

        return to_route('admin.faqs');
    }

    /**
     * Delete the given FAQ.
     */
    public function destroy(Faq $faq): RedirectResponse
    {
        $this->faqs->delete($faq);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'FAQ berhasil dihapus.']);

        return to_route('admin.faqs');
    }
}
