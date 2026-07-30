<?php

namespace Tests\Feature\Admin;

use App\Models\SiteContent;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class SiteContentTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Admin content routes are guarded by the auth middleware, so every test in
     * this class authenticates a user before interacting with them.
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->actingAs(User::factory()->create());
    }

    public function test_content_page_renders_on_first_run_without_singleton_row(): void
    {
        $this->assertDatabaseCount('site_contents', 0);

        $response = $this->get(route('admin.hero'));

        $response->assertOk();
        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->has('siteContent')
            ->where('siteContent.id', 1));
    }

    public function test_update_creates_the_singleton_row_when_missing(): void
    {
        $this->assertDatabaseCount('site_contents', 0);

        $response = $this->from(route('admin.hero'))->patch(route('admin.content.settings.update'), [
            'hero_headline' => 'New Headline',
            'whatsapp' => '812-0000-0000',
        ]);

        $response->assertRedirect(route('admin.hero'));
        $this->assertDatabaseHas('site_contents', [
            'id' => 1,
            'hero_headline' => 'New Headline',
            'whatsapp' => '812-0000-0000',
        ]);
    }

    public function test_update_persists_changes_to_existing_singleton(): void
    {
        $this->patch(route('admin.content.settings.update'), [
            'hero_headline' => 'First',
            'instagram' => '@first',
        ]);

        $this->assertDatabaseHas('site_contents', ['id' => 1, 'hero_headline' => 'First']);

        $this->patch(route('admin.content.settings.update'), [
            'hero_headline' => 'Second',
            'instagram' => '@second',
        ]);

        $this->assertDatabaseHas('site_contents', [
            'id' => 1,
            'hero_headline' => 'Second',
            'instagram' => '@second',
        ]);
        $this->assertDatabaseCount('site_contents', 1);
    }

    public function test_update_rejects_non_image_hero_image(): void
    {
        Storage::fake('public');

        $response = $this->patch(route('admin.content.settings.update'), [
            'hero_image' => UploadedFile::fake()->create('document.pdf', 100, 'application/pdf'),
        ]);

        $response->assertSessionHasErrors(['hero_image']);
    }

    public function test_update_stores_uploaded_hero_image(): void
    {
        Storage::fake('public');

        $response = $this->from(route('admin.hero'))->patch(route('admin.content.settings.update'), [
            'hero_image' => UploadedFile::fake()->image('hero.jpg', 1920, 1080),
        ]);

        $response->assertRedirect(route('admin.hero'));

        $siteContent = SiteContent::find(1);
        $this->assertNotNull($siteContent?->hero_image);
        $this->assertStringStartsWith('hero/', (string) $siteContent->hero_image);
        Storage::disk('public')->assertExists($siteContent->hero_image);
    }

    public function test_update_replaces_previous_hero_image(): void
    {
        Storage::fake('public');

        $this->patch(route('admin.content.settings.update'), [
            'hero_image' => UploadedFile::fake()->image('first.jpg'),
        ]);
        $previous = SiteContent::find(1)->hero_image;
        Storage::disk('public')->assertExists($previous);

        $this->patch(route('admin.content.settings.update'), [
            'hero_image' => UploadedFile::fake()->image('second.jpg'),
        ]);

        Storage::disk('public')->assertMissing($previous);
        Storage::disk('public')->assertExists(SiteContent::find(1)->hero_image);
    }

    public function test_update_keeps_existing_hero_image_when_none_uploaded(): void
    {
        Storage::fake('public');

        $this->patch(route('admin.content.settings.update'), [
            'hero_image' => UploadedFile::fake()->image('hero.jpg'),
        ]);
        $stored = SiteContent::find(1)->hero_image;

        // A text-only update must not wipe the previously stored image.
        $this->patch(route('admin.content.settings.update'), [
            'hero_headline' => 'New Headline',
        ]);

        $this->assertSame($stored, SiteContent::find(1)->hero_image);
        Storage::disk('public')->assertExists($stored);
    }
}
