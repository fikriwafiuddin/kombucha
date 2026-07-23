<?php

use App\Http\Controllers\Admin\ContactSettingsController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\HeroController;
use App\Http\Controllers\Admin\LandingPageController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\SiteContentController;
use App\Http\Controllers\Admin\TestimonialController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LandingPageController::class, 'index'])->name('landing');

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('products', [ProductController::class, 'index'])->name('products');
    Route::post('products', [ProductController::class, 'store'])->name('products.store');
    Route::patch('products/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

    Route::get('hero', [HeroController::class, 'index'])->name('hero');
    Route::get('contact-settings', [ContactSettingsController::class, 'index'])->name('contact-settings');
    Route::patch('content/settings', [SiteContentController::class, 'update'])->name('content.settings.update');

    Route::get('testimonials', [TestimonialController::class, 'index'])->name('testimonials');

    Route::post('testimonials', [TestimonialController::class, 'store'])->name('testimonials.store');
    Route::patch('testimonials/{testimonial}', [TestimonialController::class, 'update'])->name('testimonials.update');
    Route::delete('testimonials/{testimonial}', [TestimonialController::class, 'destroy'])->name('testimonials.destroy');

    Route::get('faqs', [FaqController::class, 'index'])->name('faqs');
    Route::post('faqs', [FaqController::class, 'store'])->name('faqs.store');
    Route::patch('faqs/{faq}', [FaqController::class, 'update'])->name('faqs.update');
    Route::delete('faqs/{faq}', [FaqController::class, 'destroy'])->name('faqs.destroy');

    Route::get('gallery', [GalleryController::class, 'index'])->name('gallery');
    Route::post('gallery', [GalleryController::class, 'store'])->name('gallery.store');
    Route::patch('gallery/{galleryImage}', [GalleryController::class, 'update'])->name('gallery.update');
    Route::delete('gallery/{galleryImage}', [GalleryController::class, 'destroy'])->name('gallery.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
