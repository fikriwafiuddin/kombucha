<?php

namespace App\Services\Contracts;

use App\Models\Testimonial;
use Illuminate\Support\Collection;

interface TestimonialService
{
    /**
     * @return Collection<int, Testimonial>
     */
    public function all(): Collection;

    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data): Testimonial;

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(Testimonial $testimonial, array $data): Testimonial;

    public function delete(Testimonial $testimonial): void;
}
