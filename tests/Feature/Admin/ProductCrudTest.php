<?php

namespace Tests\Feature\Admin;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_store_creates_a_product(): void
    {
        $response = $this->post(route('admin.products.store'), [
            'name' => 'Mango Twist',
            'price' => 50000,
        ]);

        $response->assertRedirect(route('admin.products'));
        $this->assertDatabaseHas('products', [
            'name' => 'Mango Twist',
            'price' => 50000,
        ]);
    }

    public function test_store_validates_required_fields(): void
    {
        $response = $this->post(route('admin.products.store'), []);

        $response->assertSessionHasErrors(['name', 'price']);
    }

    public function test_store_rejects_invalid_price(): void
    {
        $response = $this->post(route('admin.products.store'), [
            'name' => 'Bad Price',
            'price' => 'not-a-number',
        ]);

        $response->assertSessionHasErrors(['price']);
    }

    public function test_update_modifies_a_product(): void
    {
        $product = Product::factory()->create([
            'name' => 'Old Name',
            'price' => 10000,
        ]);

        $response = $this->patch(route('admin.products.update', $product), [
            'name' => 'New Name',
            'price' => 99999,
        ]);

        $response->assertRedirect(route('admin.products'));
        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'name' => 'New Name',
            'price' => 99999,
        ]);
    }

    public function test_store_persists_description(): void
    {
        $response = $this->post(route('admin.products.store'), [
            'name' => 'Ginger Brew',
            'description' => 'Fermentasi jahe emprit dengan lemon segar.',
            'price' => 42000,
        ]);

        $response->assertRedirect(route('admin.products'));
        $this->assertDatabaseHas('products', [
            'name' => 'Ginger Brew',
            'description' => 'Fermentasi jahe emprit dengan lemon segar.',
            'price' => 42000,
        ]);
    }

    public function test_update_persists_description(): void
    {
        $product = Product::factory()->create(['description' => 'Old description']);

        $this->patch(route('admin.products.update', $product), [
            'name' => $product->name,
            'description' => 'New description',
            'price' => $product->price,
        ]);

        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'description' => 'New description',
        ]);
    }

    public function test_destroy_deletes_a_product(): void
    {
        $product = Product::factory()->create();

        $this->delete(route('admin.products.destroy', $product));

        $this->assertDatabaseMissing('products', ['id' => $product->id]);
    }
}
