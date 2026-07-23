<?php

namespace App\Services\Contracts;

use App\Models\Faq;
use Illuminate\Support\Collection;

interface FaqService
{
    /**
     * @return Collection<int, Faq>
     */
    public function all(): Collection;

    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data): Faq;

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(Faq $faq, array $data): Faq;

    public function delete(Faq $faq): void;
}
