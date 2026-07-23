<?php

namespace App\Services\Contracts;

use App\Models\SiteContent;

interface SiteContentService
{
    /**
     * Resolve the singleton site content row, creating an in-memory default
     * when it does not yet exist.
     */
    public function get(): SiteContent;

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(array $data): SiteContent;
}
