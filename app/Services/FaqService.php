<?php

namespace App\Services;

use App\Models\Faq;
use App\Services\Contracts\FaqService as FaqServiceContract;
use Illuminate\Support\Collection;

class FaqService implements FaqServiceContract
{
    public function all(): Collection
    {
        return Faq::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
    }

    public function create(array $data): Faq
    {
        return Faq::create($data);
    }

    public function update(Faq $faq, array $data): Faq
    {
        $faq->update($data);

        return $faq->fresh();
    }

    public function delete(Faq $faq): void
    {
        $faq->delete();
    }
}
