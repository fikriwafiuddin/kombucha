<?php

namespace App\Services;

use App\Models\Product;
use App\Services\Contracts\ProductService as ProductServiceContract;
use Illuminate\Support\Collection;

class ProductService implements ProductServiceContract
{
    public function all(): Collection
    {
        return Product::all();
    }

    public function create(array $data): Product
    {
        if (isset($data['image']) && $data['image'] instanceof \Illuminate\Http\UploadedFile) {
            $data['image'] = $data['image']->store('products', 'public');
        }

        return Product::create($data);
    }

    public function update(Product $product, array $data): Product
    {
        if (isset($data['image']) && $data['image'] instanceof \Illuminate\Http\UploadedFile) {
            if ($product->image) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($product->image);
            }
            $data['image'] = $data['image']->store('products', 'public');
        } else {
            unset($data['image']);
        }

        $product->update($data);

        return $product->fresh();
    }

    public function delete(Product $product): void
    {
        if ($product->image) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($product->image);
        }

        $product->delete();
    }
}
