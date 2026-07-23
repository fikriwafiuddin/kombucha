import { Form, Head, usePage } from '@inertiajs/react';
import SiteContentController from '@/actions/App/Http/Controllers/Admin/SiteContentController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { contactSettings as adminContactSettings } from '@/routes/admin';
// import type { BreadcrumbItem } from '@/types';

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

export default function AdminContactSettings() {
    const { siteContent } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Kelola Contact & Settings" />

            <header className="sticky top-0 z-10 flex h-20 items-center justify-between gap-4 border-outline-variant/30 bg-surface/80 px-6 backdrop-blur-md md:px-8">
                <div className="flex min-w-0 items-center gap-4">
                    <h2 className="truncate text-lg font-semibold text-on-surface sm:text-2xl">
                        Manajemen Contact Info & Settings
                    </h2>
                </div>
            </header>

            <div className="space-y-8 p-6 md:space-y-12 md:p-8">
                <section id="contact" className="scroll-mt-24 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container text-on-primary-container shadow-sm">
                            <span className="material-symbols-outlined">
                                contact_phone
                            </span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold">
                                Contact Info &amp; Settings
                            </h3>
                            <p className="text-xs text-on-surface-variant">
                                Informasi operasional dan kontak WhatsApp
                            </p>
                        </div>
                    </div>
                    <Form
                        {...SiteContentController.update.form()}
                        options={{ preserveScroll: true }}
                        className="rounded-4xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <label
                                            className={labelClasses}
                                            htmlFor="whatsapp"
                                        >
                                            WhatsApp Number
                                        </label>
                                        <div className="relative">
                                            <span className="absolute top-1/2 left-4 -translate-y-1/2 text-on-surface-variant">
                                                +62
                                            </span>
                                            <input
                                                id="whatsapp"
                                                className={`${inputClasses} pl-12`}
                                                type="text"
                                                name="whatsapp"
                                                defaultValue={
                                                    siteContent.whatsapp ?? ''
                                                }
                                            />
                                        </div>
                                        <InputError message={errors.whatsapp} />
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            className={labelClasses}
                                            htmlFor="operating_hours"
                                        >
                                            Jam Operasional
                                        </label>
                                        <input
                                            id="operating_hours"
                                            className={inputClasses}
                                            type="text"
                                            name="operating_hours"
                                            defaultValue={
                                                siteContent.operating_hours ??
                                                ''
                                            }
                                        />
                                        <InputError
                                            message={errors.operating_hours}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            className={labelClasses}
                                            htmlFor="instagram"
                                        >
                                            Instagram @Handle
                                        </label>
                                        <input
                                            id="instagram"
                                            className={inputClasses}
                                            type="text"
                                            name="instagram"
                                            defaultValue={
                                                siteContent.instagram ?? ''
                                            }
                                        />
                                        <InputError
                                            message={errors.instagram}
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-3">
                                        <label
                                            className={labelClasses}
                                            htmlFor="address"
                                        >
                                            Alamat Fermentation Studio
                                        </label>
                                        <textarea
                                            id="address"
                                            className={inputClasses}
                                            rows={2}
                                            name="address"
                                            defaultValue={
                                                siteContent.address ?? ''
                                            }
                                        />
                                        <InputError message={errors.address} />
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <Button type="submit" disabled={processing}>
                                        Simpan Pengaturan Kontak
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

AdminContactSettings.layout = {
    breadcrumbs: [
        {
            title: 'Contact & Settings',
            href: adminContactSettings(),
        },
    ],
};
