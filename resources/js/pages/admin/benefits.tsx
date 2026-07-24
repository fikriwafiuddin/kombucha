import { Form, Head, usePage } from '@inertiajs/react';
import SiteContentController from '@/actions/App/Http/Controllers/Admin/SiteContentController';
import { IconReferenceLink } from '@/components/icon-reference-link';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { benefits as adminBenefits } from '@/routes/admin';
import type { SiteContent } from '@/types';

type PageProps = {
    siteContent: SiteContent;
};

const inputClasses =
    'w-full rounded-2xl border border-outline-variant/50 bg-surface-container-lowest px-4 py-3 text-on-surface transition-all focus:border-primary focus:ring-2 focus:ring-primary/20';

const labelClasses =
    'text-sm font-semibold tracking-wide text-on-surface-variant';

export default function AdminBenefits() {
    const { siteContent } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Kelola Benefits Section" />

            <header className="sticky top-0 z-10 flex h-20 items-center justify-between gap-4 border-outline-variant/30 bg-surface/80 px-6 backdrop-blur-md md:px-8">
                <div className="flex min-w-0 items-center gap-4">
                    <h2 className="truncate text-lg font-semibold text-on-surface sm:text-2xl">
                        Manajemen Benefits Section
                    </h2>
                </div>
            </header>

            <div className="space-y-8 p-6 md:space-y-12 md:p-8">
                <section id="benefits" className="scroll-mt-24 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container text-on-primary-container shadow-sm">
                            <span className="material-symbols-outlined">
                                spa
                            </span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold">
                                Benefits Section
                            </h3>
                            <p className="text-xs text-on-surface-variant">
                                Konten teks pada section &quot;Kebaikan di
                                Setiap Tetes&quot;
                            </p>
                        </div>
                    </div>

                    <Form
                        {...SiteContentController.update.form()}
                        options={{ preserveScroll: true }}
                        className="space-y-8 rounded-4xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label
                                            className={labelClasses}
                                            htmlFor="benefits_title"
                                        >
                                            Judul Section
                                        </label>
                                        <input
                                            id="benefits_title"
                                            className={inputClasses}
                                            type="text"
                                            name="benefits_title"
                                            defaultValue={
                                                siteContent.benefits_title ?? ''
                                            }
                                            placeholder="Kebaikan di Setiap Tetes"
                                        />
                                        <InputError
                                            message={errors.benefits_title}
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label
                                            className={labelClasses}
                                            htmlFor="benefits_description"
                                        >
                                            Deskripsi Section
                                        </label>
                                        <textarea
                                            id="benefits_description"
                                            className={inputClasses}
                                            rows={2}
                                            name="benefits_description"
                                            defaultValue={
                                                siteContent.benefits_description ??
                                                ''
                                            }
                                        />
                                        <InputError
                                            message={errors.benefits_description}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {[1, 2, 3].map((n) => (
                                        <div
                                            key={n}
                                            className="space-y-4 rounded-2xl border border-outline-variant/40 p-4"
                                        >
                                            <p className="text-xs font-bold tracking-widest text-on-surface-variant uppercase">
                                                Benefit Card {n}
                                            </p>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between gap-2">
                                                    <label
                                                        className={labelClasses}
                                                        htmlFor={`benefits_card_${n}_icon`}
                                                    >
                                                        Ikon (Material Symbol)
                                                    </label>
                                                    <IconReferenceLink />
                                                </div>
                                                <input
                                                    id={`benefits_card_${n}_icon`}
                                                    className={inputClasses}
                                                    type="text"
                                                    name={`benefits_card_${n}_icon`}
                                                    defaultValue={
                                                        siteContent[
                                                            `benefits_card_${n}_icon` as keyof SiteContent
                                                        ] ?? ''
                                                    }
                                                    placeholder="desk"
                                                />
                                                <InputError
                                                    message={
                                                        errors[
                                                            `benefits_card_${n}_icon`
                                                        ]
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label
                                                    className={labelClasses}
                                                    htmlFor={`benefits_card_${n}_title`}
                                                >
                                                    Judul
                                                </label>
                                                <input
                                                    id={`benefits_card_${n}_title`}
                                                    className={inputClasses}
                                                    type="text"
                                                    name={`benefits_card_${n}_title`}
                                                    defaultValue={
                                                        siteContent[
                                                            `benefits_card_${n}_title` as keyof SiteContent
                                                        ] ?? ''
                                                    }
                                                    placeholder="Pencernaan Sehat"
                                                />
                                                <InputError
                                                    message={
                                                        errors[
                                                            `benefits_card_${n}_title`
                                                        ]
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label
                                                    className={labelClasses}
                                                    htmlFor={`benefits_card_${n}_description`}
                                                >
                                                    Deskripsi
                                                </label>
                                                <textarea
                                                    id={`benefits_card_${n}_description`}
                                                    className={inputClasses}
                                                    rows={3}
                                                    name={`benefits_card_${n}_description`}
                                                    defaultValue={
                                                        siteContent[
                                                            `benefits_card_${n}_description` as keyof SiteContent
                                                        ] ?? ''
                                                    }
                                                />
                                                <InputError
                                                    message={
                                                        errors[
                                                            `benefits_card_${n}_description`
                                                        ]
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full md:w-auto"
                                >
                                    Simpan Pengaturan Benefits
                                </Button>
                            </>
                        )}
                    </Form>
                </section>
            </div>
        </>
    );
}

AdminBenefits.layout = {
    breadcrumbs: [
        {
            title: 'Benefits Section',
            href: adminBenefits(),
        },
    ],
};
