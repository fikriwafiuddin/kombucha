<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTestimonialRequest;
use App\Http\Requests\Admin\UpdateTestimonialRequest;
use App\Models\Testimonial;
use App\Services\Contracts\TestimonialService as TestimonialServiceContract;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function __construct(
        private TestimonialServiceContract $testimonials,
    ) {}

    /**
     * Render the admin testimonials management page.
     */
    public function index(): Response
    {
        $testimonials = $this->testimonials->all();
        
        return Inertia::render('admin/testimonials', [
            'testimonials' => $testimonials,
        ]);
    }

    /**
     * Store a newly created testimonial.
     */
    public function store(StoreTestimonialRequest $request): RedirectResponse
    {
        $this->testimonials->create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Testimonial berhasil ditambahkan.']);

        return to_route('admin.testimonials');
    }

    /**
     * Update the given testimonial.
     */
    public function update(UpdateTestimonialRequest $request, Testimonial $testimonial): RedirectResponse
    {
        $this->testimonials->update($testimonial, $request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Testimonial berhasil diperbarui.']);

        return to_route('admin.testimonials');
    }

    /**
     * Delete the given testimonial.
     */
    public function destroy(Testimonial $testimonial): RedirectResponse
    {
        $this->testimonials->delete($testimonial);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Testimonial berhasil dihapus.']);

        return to_route('admin.testimonials');
    }
}
