<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_products_page_loads(): void
    {
        $response = $this->get(route('admin.products'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('admin/products')
            ->has('products'));
    }

    public function test_admin_products_page_lists_products_from_database(): void
    {
        Product::factory()->count(2)->create();

        $response = $this->get(route('admin.products'));

        $response->assertInertia(fn (Assert $page) => $page
            ->component('admin/products')
            ->has('products', 2)
            ->has('products.0', fn (Assert $product) => $product
                ->has('id')
                ->has('name')
                ->has('description')
                ->has('price')
                ->has('image')
                ->etc()));
    }

    public function test_admin_hero_page_loads(): void
    {
        $response = $this->get(route('admin.hero'));
        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page->component('admin/hero')->has('siteContent'));
    }

    public function test_admin_testimonials_page_loads(): void
    {
        $response = $this->get(route('admin.testimonials'));
        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page->component('admin/testimonials')->has('testimonials'));
    }

    public function test_admin_faqs_page_loads(): void
    {
        $response = $this->get(route('admin.faqs'));
        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page->component('admin/faqs')->has('faqs'));
    }

    public function test_admin_gallery_page_loads(): void
    {
        $response = $this->get(route('admin.gallery'));
        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page->component('admin/gallery')->has('galleryImages'));
    }

    public function test_admin_contact_settings_page_loads(): void
    {
        $response = $this->get(route('admin.contact-settings'));
        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page->component('admin/contact-settings')->has('siteContent'));
    }
}
