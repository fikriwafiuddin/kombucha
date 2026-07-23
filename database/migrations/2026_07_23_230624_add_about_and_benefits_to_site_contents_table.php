<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('site_contents', function (Blueprint $table) {
            // About section
            $table->string('about_tag')->nullable()->after('hero_image');
            $table->string('about_title')->nullable()->after('about_tag');
            $table->text('about_description')->nullable()->after('about_title');
            $table->string('about_feature_1_icon', 50)->nullable()->after('about_description');
            $table->string('about_feature_1_title', 120)->nullable()->after('about_feature_1_icon');
            $table->string('about_feature_1_description', 255)->nullable()->after('about_feature_1_title');
            $table->string('about_feature_2_icon', 50)->nullable()->after('about_feature_1_description');
            $table->string('about_feature_2_title', 120)->nullable()->after('about_feature_2_icon');
            $table->string('about_feature_2_description', 255)->nullable()->after('about_feature_2_title');
            $table->string('about_image_1', 1000)->nullable()->after('about_feature_2_description');
            $table->string('about_image_2', 1000)->nullable()->after('about_image_1');

            // Benefits section
            $table->string('benefits_title')->nullable()->after('about_image_2');
            $table->text('benefits_description')->nullable()->after('benefits_title');
            $table->string('benefits_card_1_icon', 50)->nullable()->after('benefits_description');
            $table->string('benefits_card_1_title', 120)->nullable()->after('benefits_card_1_icon');
            $table->text('benefits_card_1_description')->nullable()->after('benefits_card_1_title');
            $table->string('benefits_card_2_icon', 50)->nullable()->after('benefits_card_1_description');
            $table->string('benefits_card_2_title', 120)->nullable()->after('benefits_card_2_icon');
            $table->text('benefits_card_2_description')->nullable()->after('benefits_card_2_title');
            $table->string('benefits_card_3_icon', 50)->nullable()->after('benefits_card_2_description');
            $table->string('benefits_card_3_title', 120)->nullable()->after('benefits_card_3_icon');
            $table->text('benefits_card_3_description')->nullable()->after('benefits_card_3_title');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('site_contents', function (Blueprint $table) {
            $table->dropColumn([
                'about_tag',
                'about_title',
                'about_description',
                'about_feature_1_icon',
                'about_feature_1_title',
                'about_feature_1_description',
                'about_feature_2_icon',
                'about_feature_2_title',
                'about_feature_2_description',
                'about_image_1',
                'about_image_2',
                'benefits_title',
                'benefits_description',
                'benefits_card_1_icon',
                'benefits_card_1_title',
                'benefits_card_1_description',
                'benefits_card_2_icon',
                'benefits_card_2_title',
                'benefits_card_2_description',
                'benefits_card_3_icon',
                'benefits_card_3_title',
                'benefits_card_3_description',
            ]);
        });
    }
};
