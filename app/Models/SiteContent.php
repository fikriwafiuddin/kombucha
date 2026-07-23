<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string|null $hero_headline
 * @property string|null $hero_subheadline
 * @property string|null $hero_cta_text
 * @property string|null $hero_cta_link
 * @property string|null $hero_image
 * @property string|null $whatsapp
 * @property string|null $operating_hours
 * @property string|null $instagram
 * @property string|null $address
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['hero_headline', 'hero_subheadline', 'hero_cta_text', 'hero_cta_link', 'hero_image', 'whatsapp', 'operating_hours', 'instagram', 'address'])]
class SiteContent extends Model
{
    /** @use HasFactory<\Database\Factories\SiteContentFactory> */
    use HasFactory;

    /**
     * The site content is a singleton identified by a fixed primary key (1),
     * so we manage the key explicitly rather than relying on auto-increment.
     */
    public $incrementing = false;

    protected $keyType = 'int';

    /**
     * Default values used when the singleton row does not exist yet.
     *
     * @return array<string, mixed>
     */
    public static function defaults(): array
    {
        return [
            'hero_headline' => null,
            'hero_subheadline' => null,
            'hero_cta_text' => null,
            'hero_cta_link' => null,
            'hero_image' => null,
            'whatsapp' => null,
            'operating_hours' => null,
            'instagram' => null,
            'address' => null,
        ];
    }
}
