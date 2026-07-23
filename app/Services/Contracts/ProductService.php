<?php

namespace App\Services\Contracts;

use App\Models\Product;
use Illuminate\Support\Collection;

interface ProductService
{
    /**
     * @return Collection<int, Product>
     */
    public function all(): Collection;

    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data): Product;

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(Product $product, array $data): Product;

    public function delete(Product $product): void;
}
