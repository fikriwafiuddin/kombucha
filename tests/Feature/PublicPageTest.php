<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\Testimonial;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PublicPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_products_page_loads_and_lists_all_products(): void
    {
        Product::factory()->count(3)->create();

        $response = $this->get(route('products'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('products')
            ->has('siteContent')
            ->has('products', 3)
            ->has('products.0', fn (Assert $product) => $product
                ->has('id')
                ->has('name')
                ->has('description')
                ->has('price')
                ->has('image')
                ->etc()));
    }

    public function test_testimonials_page_loads_and_lists_all_testimonials(): void
    {
        Testimonial::factory()->count(3)->create();

        $response = $this->get(route('testimonials'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('testimonials')
            ->has('siteContent')
            ->has('testimonials', 3)
            ->has('testimonials.0', fn (Assert $testimonial) => $testimonial
                ->has('id')
                ->has('name')
                ->has('role')
                ->has('avatar')
                ->has('review')
                ->has('rating')
                ->etc()));
    }

    public function test_public_collection_pages_are_accessible_without_auth(): void
    {
        $this->get(route('products'))->assertOk();
        $this->get(route('testimonials'))->assertOk();
    }
}
