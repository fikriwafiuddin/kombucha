<?php

namespace App\Providers;

use App\Services\Contracts\FaqService as FaqServiceContract;
use App\Services\Contracts\GalleryImageService as GalleryImageServiceContract;
use App\Services\Contracts\ProductService as ProductServiceContract;
use App\Services\Contracts\SiteContentService as SiteContentServiceContract;
use App\Services\Contracts\TestimonialService as TestimonialServiceContract;
use App\Services\FaqService;
use App\Services\GalleryImageService;
use App\Services\ProductService;
use App\Services\SiteContentService;
use App\Services\TestimonialService;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(ProductServiceContract::class, ProductService::class);
        $this->app->bind(TestimonialServiceContract::class, TestimonialService::class);
        $this->app->bind(FaqServiceContract::class, FaqService::class);
        $this->app->bind(GalleryImageServiceContract::class, GalleryImageService::class);
        $this->app->bind(SiteContentServiceContract::class, SiteContentService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }
}
