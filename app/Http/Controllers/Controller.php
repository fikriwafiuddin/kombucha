<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;

abstract class Controller
{
    /**
     * Resolve a value stored on the public disk into a publicly accessible
     * URL. Legacy absolute URLs (already starting with http) are returned
     * unchanged, and null/empty values stay null.
     */
    protected function resolvePublicUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        return Storage::disk('public')->url($path);
    }
}
