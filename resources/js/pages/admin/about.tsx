import { Form, Head, usePage } from '@inertiajs/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import SiteContentController from '@/actions/App/Http/Controllers/Admin/SiteContentController';
import { IconReferenceLink } from '@/components/icon-reference-link';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { about as adminAbout } from '@/routes/admin';
import { assetUrl, type SiteContent } from '@/types';

type PageProps = {
    siteContent: SiteContent;
};

const inputClasses =
    'w-full rounded-2xl border border-outline-variant/50 bg-surface-container-lowest px-4 py-3 text-on-surface transition-all focus:border-primary focus:ring-2 focus:ring-primary/20';

const labelClasses =
    'text-sm font-semibold tracking-wide text-on-surface-variant';

function ImageDropzone({
    id,
    label,
    preview,
    onChange,
    error,
    recommendation,
}: {
    id: string;
    label: string;
    preview: string | null;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    recommendation?: string;
}) {
    return (
        <div className="space-y-2">
            <label className={labelClasses} htmlFor={id}>
                {label}
            </label>
            <div className="group relative flex aspect-video cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-outline-variant bg-surface-container-high/50 transition-colors hover:border-primary">
                <input
                    id={id}
                    className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
                    type="file"
                    name={id}
                    accept="image/*"
                    onChange={onChange}
                />
                {preview ? (
                    <img
                        className="absolute inset-0 h-full w-full object-cover opacity-60"
                        alt={`${label} preview`}
                        src={preview}
                    />
                ) : (
                    <span className="material-symbols-outlined mb-2 text-[48px] text-primary">
                        add_photo_alternate
                    </span>
                )}
                <p className="pointer-events-none relative z-10 text-sm font-bold text-on-surface">
                    {preview
                        ? 'Klik untuk mengganti gambar'
                        : 'Klik untuk memilih gambar'}
                </p>
                <p className="pointer-events-none relative z-10 text-[11px] text-on-surface-variant">
                    {recommendation ?? 'JPG, PNG, atau WebP · Maks 2MB'}
                </p>
            </div>
            <InputError message={error} />
        </div>
    );
}

export default function AdminAbout() {
    const { siteContent } = usePage<PageProps>().props;

    const [image1Preview, setImage1Preview] = useState<string | null>(
        assetUrl(siteContent.about_image_1),
    );
    const [image2Preview, setImage2Preview] = useState<string | null>(
        assetUrl(siteContent.about_image_2),
    );

    const handleImage1Change = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage1Preview(URL.createObjectURL(file));
        }
    };

    const handleImage2Change = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage2Preview(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <Head title="Kelola About Section" />

            <header className="sticky top-0 z-10 flex h-20 items-center justify-between gap-4 border-outline-variant/30 bg-surface/80 px-6 backdrop-blur-md md:px-8">
                <div className="flex min-w-0 items-center gap-4">
                    <h2 className="truncate text-lg font-semibold text-on-surface sm:text-2xl">
                        Manajemen About Section
                    </h2>
                </div>
            </header>

            <div className="space-y-8 p-6 md:space-y-12 md:p-8">
                <section id="about" className="scroll-mt-24 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container text-on-primary-container shadow-sm">
                            <span className="material-symbols-outlined">
                                info
                            </span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold">
                                About Section
                            </h3>
                            <p className="text-xs text-on-surface-variant">
                                Konten teks dan gambar pada section &quot;Apa
                                itu Kombucha?&quot;
                            </p>
                        </div>
                    </div>

                    <Form
                        {...SiteContentController.update.form()}
                        options={{ preserveScroll: true }}
                        className="grid grid-cols-1 gap-6 rounded-4xl border border-outline-variant/30 bg-surface-container-low p-6 md:gap-8 md:p-8 lg:grid-cols-2"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label
                                            className={labelClasses}
                                            htmlFor="about_tag"
                                        >
                                            Label Tag
                                        </label>
                                        <input
                                            id="about_tag"
                                            className={inputClasses}
                                            type="text"
                                            name="about_tag"
                                            defaultValue={
                                                siteContent.about_tag ?? ''
                                            }
                                            placeholder="Filosofi"
                                        />
                                        <InputError message={errors.about_tag} />
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            className={labelClasses}
                                            htmlFor="about_title"
                                        >
                                            Judul Section
                                        </label>
                                        <input
                                            id="about_title"
                                            className={inputClasses}
                                            type="text"
                                            name="about_title"
                                            defaultValue={
                                                siteContent.about_title ?? ''
                                            }
                                            placeholder="Apa itu Kombucha?"
                                        />
                                        <InputError
                                            message={errors.about_title}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            className={labelClasses}
                                            htmlFor="about_description"
                                        >
                                            Deskripsi
                                        </label>
                                        <textarea
                                            id="about_description"
                                            className={inputClasses}
                                            rows={4}
                                            name="about_description"
                                            defaultValue={
                                                siteContent.about_description ??
                                                ''
                                            }
                                        />
                                        <InputError
                                            message={errors.about_description}
                                        />
                                    </div>

                                    {[1, 2].map((n) => (
                                        <div
                                            key={n}
                                            className="space-y-4 rounded-2xl border border-outline-variant/40 p-4"
                                        >
                                            <p className="text-xs font-bold tracking-widest text-on-surface-variant uppercase">
                                                Fitur {n}
                                            </p>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between gap-2">
                                                    <label
                                                        className={labelClasses}
                                                        htmlFor={`about_feature_${n}_icon`}
                                                    >
                                                        Ikon (Material Symbol)
                                                    </label>
                                                    <IconReferenceLink />
                                                </div>
                                                <input
                                                    id={`about_feature_${n}_icon`}
                                                    className={inputClasses}
                                                    type="text"
                                                    name={`about_feature_${n}_icon`}
                                                    defaultValue={
                                                        siteContent[
                                                            `about_feature_${n}_icon` as keyof SiteContent
                                                        ] ?? ''
                                                    }
                                                    placeholder="eco"
                                                />
                                                <InputError
                                                    message={
                                                        errors[
                                                            `about_feature_${n}_icon`
                                                        ]
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label
                                                    className={labelClasses}
                                                    htmlFor={`about_feature_${n}_title`}
                                                >
                                                    Judul Fitur
                                                </label>
                                                <input
                                                    id={`about_feature_${n}_title`}
                                                    className={inputClasses}
                                                    type="text"
                                                    name={`about_feature_${n}_title`}
                                                    defaultValue={
                                                        siteContent[
                                                            `about_feature_${n}_title` as keyof SiteContent
                                                        ] ?? ''
                                                    }
                                                    placeholder="100% Organik"
                                                />
                                                <InputError
                                                    message={
                                                        errors[
                                                            `about_feature_${n}_title`
                                                        ]
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label
                                                    className={labelClasses}
                                                    htmlFor={`about_feature_${n}_description`}
                                                >
                                                    Deskripsi Fitur
                                                </label>
                                                <input
                                                    id={`about_feature_${n}_description`}
                                                    className={inputClasses}
                                                    type="text"
                                                    name={`about_feature_${n}_description`}
                                                    defaultValue={
                                                        siteContent[
                                                            `about_feature_${n}_description` as keyof SiteContent
                                                        ] ?? ''
                                                    }
                                                    placeholder="Hanya menggunakan teh dan gula organik premium."
                                                />
                                                <InputError
                                                    message={
                                                        errors[
                                                            `about_feature_${n}_description`
                                                        ]
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6">
                                    <ImageDropzone
                                        id="about_image_1"
                                        label="Gambar About 1"
                                        preview={image1Preview}
                                        onChange={handleImage1Change}
                                        error={errors.about_image_1}
                                        recommendation="JPG, PNG, atau WebP · Maks 2MB · Rekomendasi 800x1000px"
                                    />
                                    <ImageDropzone
                                        id="about_image_2"
                                        label="Gambar About 2"
                                        preview={image2Preview}
                                        onChange={handleImage2Change}
                                        error={errors.about_image_2}
                                        recommendation="JPG, PNG, atau WebP · Maks 2MB · Rekomendasi 800x1000px"
                                    />
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full"
                                    >
                                        Simpan Pengaturan About
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

AdminAbout.layout = {
    breadcrumbs: [
        {
            title: 'About Section',
            href: adminAbout(),
        },
    ],
};
