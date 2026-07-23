import { Form, Head, usePage } from '@inertiajs/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import SiteContentController from '@/actions/App/Http/Controllers/Admin/SiteContentController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';

type SiteContent = {
    id: number;
    hero_headline: string | null;
    hero_subheadline: string | null;
    hero_cta_text: string | null;
    hero_cta_link: string | null;
    hero_image: string | null;
    whatsapp: string | null;
    operating_hours: string | null;
    instagram: string | null;
    address: string | null;
};

type PageProps = {
    siteContent: SiteContent;
};

const inputClasses =
    'w-full rounded-2xl border border-outline-variant/50 bg-surface-container-lowest px-4 py-3 text-on-surface transition-all focus:border-primary focus:ring-2 focus:ring-primary/20';

const labelClasses =
    'text-sm font-semibold tracking-wide text-on-surface-variant';

export default function AdminHero() {
    const { siteContent } = usePage<PageProps>().props;

    const [imagePreview, setImagePreview] = useState<string | null>(
        siteContent.hero_image ? `/storage/${siteContent.hero_image}` : null,
    );

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <Head title="Kelola Hero Banner" />

            <header className="sticky top-0 z-10 flex h-20 items-center justify-between gap-4 border-b border-outline-variant/30 bg-surface/80 px-6 backdrop-blur-md md:px-8">
                <div className="flex min-w-0 items-center gap-4">
                    <h2 className="truncate text-lg font-semibold text-on-surface sm:text-2xl">
                        Manajemen Hero Banner
                    </h2>
                </div>
            </header>

            <div className="mx-auto max-w-350 space-y-8 p-6 md:space-y-12 md:p-8">
                <section id="hero" className="scroll-mt-24 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container text-on-primary-container shadow-sm">
                            <span className="material-symbols-outlined">
                                view_carousel
                            </span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold">
                                Hero Banner
                            </h3>
                            <p className="text-xs text-on-surface-variant">
                                Update section utama yang dilihat pengunjung
                                pertama kali
                            </p>
                        </div>
                    </div>

                    <Form
                        {...SiteContentController.update.form()}
                        options={{ preserveScroll: true }}
                        className="grid grid-cols-1 gap-6 rounded-4xl border border-outline-variant/20 bg-surface-container-lowest p-6 md:gap-8 md:p-8 lg:grid-cols-2"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label
                                            className={labelClasses}
                                            htmlFor="hero_headline"
                                        >
                                            Judul Utama (Headline)
                                        </label>
                                        <input
                                            id="hero_headline"
                                            className={`${inputClasses} text-lg text-primary`}
                                            type="text"
                                            name="hero_headline"
                                            defaultValue={
                                                siteContent.hero_headline ?? ''
                                            }
                                        />
                                        <InputError
                                            message={errors.hero_headline}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            className={labelClasses}
                                            htmlFor="hero_subheadline"
                                        >
                                            Sub-headline (Deskripsi)
                                        </label>
                                        <textarea
                                            id="hero_subheadline"
                                            className={inputClasses}
                                            rows={4}
                                            name="hero_subheadline"
                                            defaultValue={
                                                siteContent.hero_subheadline ??
                                                ''
                                            }
                                        />
                                        <InputError
                                            message={errors.hero_subheadline}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <label
                                                className={labelClasses}
                                                htmlFor="hero_cta_text"
                                            >
                                                Teks Tombol (CTA)
                                            </label>
                                            <input
                                                id="hero_cta_text"
                                                className={inputClasses}
                                                type="text"
                                                name="hero_cta_text"
                                                defaultValue={
                                                    siteContent.hero_cta_text ??
                                                    ''
                                                }
                                            />
                                            <InputError
                                                message={errors.hero_cta_text}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label
                                                className={labelClasses}
                                                htmlFor="hero_cta_link"
                                            >
                                                Link Tombol (WA/Catalog)
                                            </label>
                                            <input
                                                id="hero_cta_link"
                                                className={inputClasses}
                                                type="url"
                                                name="hero_cta_link"
                                                defaultValue={
                                                    siteContent.hero_cta_link ??
                                                    ''
                                                }
                                            />
                                            <InputError
                                                message={errors.hero_cta_link}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label
                                        className={labelClasses}
                                        htmlFor="hero_image"
                                    >
                                        Gambar Hero
                                    </label>
                                    <div className="group relative flex aspect-video cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-outline-variant bg-surface-container-high/50 transition-colors hover:border-primary">
                                        <input
                                            id="hero_image"
                                            className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
                                            type="file"
                                            name="hero_image"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                        {imagePreview ? (
                                            <img
                                                className="absolute inset-0 h-full w-full object-cover opacity-60"
                                                alt="Hero preview"
                                                src={imagePreview}
                                            />
                                        ) : (
                                            <span className="material-symbols-outlined mb-2 text-[48px] text-primary">
                                                add_photo_alternate
                                            </span>
                                        )}
                                        <p className="pointer-events-none relative z-10 text-sm font-bold text-on-surface">
                                            {imagePreview
                                                ? 'Klik untuk mengganti gambar'
                                                : 'Klik untuk memilih gambar'}
                                        </p>
                                        <p className="pointer-events-none relative z-10 text-[11px] text-on-surface-variant">
                                            JPG, PNG, atau WebP · Maks 2MB ·
                                            Rekomendasi 1920x1080px
                                        </p>
                                    </div>
                                    <InputError message={errors.hero_image} />
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full"
                                    >
                                        Simpan Pengaturan Hero
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                </section>
            </div>
        </>
    );
}
