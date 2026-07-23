<?php

namespace Tests\Feature\Admin;

use App\Models\Faq;
use App\Models\GalleryImage;
use App\Models\Testimonial;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ContentCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_store_creates_a_testimonial(): void
    {
        $response = $this->post(route('admin.testimonials.store'), [
            'name' => 'Dewi L.',
            'role' => 'Verified Buyer',
            'review' => 'Sangat enak!',
            'rating' => 5,
            'status' => 'published',
        ]);

        $response->assertRedirect(route('admin.testimonials'));
        $this->assertDatabaseHas('testimonials', [
            'name' => 'Dewi L.',
            'rating' => 5,
            'status' => 'published',
        ]);
    }

    public function test_store_testimonial_validates_rating_range(): void
    {
        $response = $this->post(route('admin.testimonials.store'), [
            'name' => 'X',
            'review' => 'review',
            'rating' => 9,
            'status' => 'published',
        ]);

        $response->assertSessionHasErrors(['rating']);
    }

    public function test_update_testimonial(): void
    {
        $testimonial = Testimonial::factory()->create(['status' => 'draft']);

        $response = $this->patch(route('admin.testimonials.update', $testimonial), [
            'name' => $testimonial->name,
            'review' => 'Updated review text',
            'rating' => 4,
            'status' => 'published',
        ]);

        $response->assertRedirect(route('admin.testimonials'));
        $this->assertDatabaseHas('testimonials', [
            'id' => $testimonial->id,
            'status' => 'published',
            'rating' => 4,
        ]);
    }

    public function test_destroy_testimonial(): void
    {
        $testimonial = Testimonial::factory()->create();

        $this->delete(route('admin.testimonials.destroy', $testimonial));

        $this->assertDatabaseMissing('testimonials', ['id' => $testimonial->id]);
    }

    public function test_store_testimonial_accepts_missing_avatar(): void
    {
        $response = $this->post(route('admin.testimonials.store'), [
            'name' => 'No Avatar',
            'review' => 'Enak sekali',
            'rating' => 4,
            'status' => 'published',
        ]);

        $response->assertRedirect(route('admin.testimonials'));
        $this->assertDatabaseHas('testimonials', [
            'name' => 'No Avatar',
            'avatar' => null,
        ]);
    }

    public function test_store_testimonial_uploads_avatar(): void
    {
        Storage::fake('public');

        $response = $this->post(route('admin.testimonials.store'), [
            'name' => 'With Avatar',
            'role' => 'Verified Buyer',
            'avatar' => UploadedFile::fake()->image('avatar.jpg', 200, 200),
            'review' => 'Sangat enak!',
            'rating' => 5,
            'status' => 'published',
        ]);

        $response->assertRedirect(route('admin.testimonials'));

        $testimonial = Testimonial::first();
        $this->assertNotNull($testimonial?->avatar);
        $this->assertStringStartsWith('avatars/', (string) $testimonial->avatar);
        Storage::disk('public')->assertExists($testimonial->avatar);
    }

    public function test_store_testimonial_rejects_non_image_avatar(): void
    {
        Storage::fake('public');

        $response = $this->post(route('admin.testimonials.store'), [
            'name' => 'X',
            'review' => 'review',
            'avatar' => UploadedFile::fake()->create('doc.pdf', 100, 'application/pdf'),
            'rating' => 5,
            'status' => 'published',
        ]);

        $response->assertSessionHasErrors(['avatar']);
    }

    public function test_update_testimonial_replaces_avatar(): void
    {
        Storage::fake('public');

        $this->post(route('admin.testimonials.store'), [
            'name' => 'Avatar User',
            'review' => 'review',
            'avatar' => UploadedFile::fake()->image('first.jpg'),
            'rating' => 5,
            'status' => 'published',
        ]);
        $testimonial = Testimonial::first();
        $previous = $testimonial->avatar;
        Storage::disk('public')->assertExists($previous);

        $this->patch(route('admin.testimonials.update', $testimonial), [
            'name' => $testimonial->name,
            'review' => 'updated review',
            'avatar' => UploadedFile::fake()->image('second.jpg'),
            'rating' => 4,
            'status' => 'published',
        ]);

        Storage::disk('public')->assertMissing($previous);
        Storage::disk('public')->assertExists(Testimonial::first()->avatar);
    }

    public function test_update_testimonial_keeps_avatar_when_none_uploaded(): void
    {
        Storage::fake('public');

        $this->post(route('admin.testimonials.store'), [
            'name' => 'Keep Avatar',
            'review' => 'review',
            'avatar' => UploadedFile::fake()->image('avatar.jpg'),
            'rating' => 5,
            'status' => 'published',
        ]);
        $testimonial = Testimonial::first();
        $stored = $testimonial->avatar;

        $this->patch(route('admin.testimonials.update', $testimonial), [
            'name' => $testimonial->name,
            'review' => 'updated text only',
            'rating' => 4,
            'status' => 'draft',
        ]);

        $this->assertSame($stored, Testimonial::first()->avatar);
        Storage::disk('public')->assertExists($stored);
    }

    public function test_destroy_testimonial_deletes_avatar_file(): void
    {
        Storage::fake('public');

        $this->post(route('admin.testimonials.store'), [
            'name' => 'Delete Me',
            'review' => 'review',
            'avatar' => UploadedFile::fake()->image('avatar.jpg'),
            'rating' => 5,
            'status' => 'published',
        ]);
        $testimonial = Testimonial::first();
        Storage::disk('public')->assertExists($testimonial->avatar);

        $this->delete(route('admin.testimonials.destroy', $testimonial));

        Storage::disk('public')->assertMissing($testimonial->avatar);
        $this->assertDatabaseMissing('testimonials', ['id' => $testimonial->id]);
    }

    public function test_store_faq(): void
    {
        $response = $this->post(route('admin.faqs.store'), [
            'question' => 'Apakah vegan?',
            'answer' => 'Ya, seluruh produk kami vegan.',
        ]);

        $response->assertRedirect(route('admin.faqs'));
        $this->assertDatabaseHas('faqs', ['question' => 'Apakah vegan?']);
    }

    public function test_store_faq_validates_required_fields(): void
    {
        $response = $this->post(route('admin.faqs.store'), []);

        $response->assertSessionHasErrors(['question', 'answer']);
    }

    public function test_destroy_faq(): void
    {
        $faq = Faq::factory()->create();

        $this->delete(route('admin.faqs.destroy', $faq));

        $this->assertDatabaseMissing('faqs', ['id' => $faq->id]);
    }

    public function test_store_gallery_uploads_image(): void
    {
        Storage::fake('public');

        $response = $this->post(route('admin.gallery.store'), [
            'image' => UploadedFile::fake()->image('photo.jpg', 800, 800),
        ]);

        $response->assertRedirect(route('admin.gallery'));

        $galleryImage = GalleryImage::first();
        $this->assertNotNull($galleryImage?->image);
        $this->assertStringStartsWith('gallery/', (string) $galleryImage->image);
        Storage::disk('public')->assertExists($galleryImage->image);
    }

    public function test_store_gallery_requires_image(): void
    {
        $response = $this->post(route('admin.gallery.store'), []);

        $response->assertSessionHasErrors(['image']);
    }

    public function test_store_gallery_rejects_non_image(): void
    {
        Storage::fake('public');

        $response = $this->post(route('admin.gallery.store'), [
            'image' => UploadedFile::fake()->create('doc.pdf', 100, 'application/pdf'),
        ]);

        $response->assertSessionHasErrors(['image']);
    }

    public function test_update_gallery_replaces_image(): void
    {
        Storage::fake('public');

        $this->post(route('admin.gallery.store'), [
            'image' => UploadedFile::fake()->image('first.jpg'),
        ]);
        $galleryImage = GalleryImage::first();
        $previous = $galleryImage->image;
        Storage::disk('public')->assertExists($previous);

        $this->patch(route('admin.gallery.update', $galleryImage), [
            'image' => UploadedFile::fake()->image('second.jpg'),
        ]);

        Storage::disk('public')->assertMissing($previous);
        Storage::disk('public')->assertExists(GalleryImage::first()->image);
    }

    public function test_update_gallery_keeps_image_when_none_uploaded(): void
    {
        Storage::fake('public');

        $this->post(route('admin.gallery.store'), [
            'image' => UploadedFile::fake()->image('photo.jpg'),
        ]);
        $galleryImage = GalleryImage::first();
        $stored = $galleryImage->image;

        $this->patch(route('admin.gallery.update', $galleryImage), [
            'sort_order' => 5,
        ]);

        $this->assertSame($stored, GalleryImage::first()->image);
        Storage::disk('public')->assertExists($stored);
    }

    public function test_destroy_gallery_image(): void
    {
        $image = GalleryImage::factory()->create();

        $this->delete(route('admin.gallery.destroy', $image));

        $this->assertDatabaseMissing('gallery_images', ['id' => $image->id]);
    }

    public function test_destroy_gallery_deletes_image_file(): void
    {
        Storage::fake('public');

        $this->post(route('admin.gallery.store'), [
            'image' => UploadedFile::fake()->image('photo.jpg'),
        ]);
        $galleryImage = GalleryImage::first();
        Storage::disk('public')->assertExists($galleryImage->image);

        $this->delete(route('admin.gallery.destroy', $galleryImage));

        Storage::disk('public')->assertMissing($galleryImage->image);
        $this->assertDatabaseMissing('gallery_images', ['id' => $galleryImage->id]);
    }
}
