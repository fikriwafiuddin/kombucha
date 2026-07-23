<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\FaqService;
use App\Services\GalleryImageService;
use App\Services\ProductService;
use App\Services\SiteContentService;
use App\Services\TestimonialService;
use Inertia\Inertia;
use Inertia\Response;

class LandingPageController extends Controller {
    private SiteContentService $siteContentService;
    private ProductService $productService;
    private GalleryImageService $galleryImageService;
    private TestimonialService $testimonialService;
    private FaqService $faqService;

    public function __construct(
        SiteContentService $siteContentService,
        ProductService $productService,
        GalleryImageService $galleryImageService,
        TestimonialService $testimonialService,
        FaqService $faqService
    ) {
        $this->siteContentService = $siteContentService;
        $this->productService = $productService;
        $this->galleryImageService = $galleryImageService;
        $this->testimonialService = $testimonialService;
        $this->faqService = $faqService;
    }

    public function index(): Response {
        return Inertia::render('landing', [
            'siteContent' => $this->siteContentService->get(),
            'products' => $this->productService->all(),
            'galleryImages' => $this->galleryImageService->all(),
            'testimonials' => $this->testimonialService->all(),
            'faqs' => $this->faqService->all(),
        ]);
    }
}