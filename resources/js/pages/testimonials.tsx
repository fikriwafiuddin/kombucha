import { Head, Link } from '@inertiajs/react';
import { LandingFooter } from '@/components/landing-footer';
import { LandingNav } from '@/components/landing-nav';
import { WhatsAppFab } from '@/components/whatsapp-fab';
import { landing } from '@/routes';
import type { SiteContent, Testimonial } from '@/types';

interface TestimonialsProps {
    siteContent: SiteContent;
    testimonials: Testimonial[];
}

export default function Testimonials({
    siteContent,
    testimonials,
}: TestimonialsProps) {
    return (
        <>
            <Head title="Apa Kata Mereka" />

            <div className="scroll-smooth bg-background font-sans text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
                <LandingNav />

                {/* Page Header */}
                <section className="mx-auto max-w-[1280px] px-[24px] pt-32 pb-12">
                    <div className="space-y-4 text-center">
                        <h1 className="text-4xl font-semibold text-primary md:text-5xl">
                            Apa Kata Mereka?
                        </h1>
                        <p className="mx-auto max-w-2xl text-on-surface-variant">
                            Cerita nyata dari mereka yang telah merasakan
                            manfaat kombucha kami.
                        </p>
                    </div>
                </section>

                {/* Testimonials Grid */}
                <section className="mx-auto max-w-[1280px] px-[24px] pb-24">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="rounded-3xl border border-surface-variant bg-surface-container-low p-8 italic"
                            >
                                <div className="mb-4 flex text-primary">
                                    {[...Array(testimonial.rating)].map(
                                        (_, i) => (
                                            <span
                                                key={i}
                                                className="material-symbols-outlined fill-1 text-sm"
                                            >
                                                star
                                            </span>
                                        ),
                                    )}
                                </div>
                                <p className="mb-6 text-on-surface-variant">
                                    "{testimonial.review}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-secondary-container">
                                        {testimonial.avatar && (
                                            <img
                                                className="h-full w-full rounded-full object-cover"
                                                src={`/storage/${testimonial.avatar}`}
                                                alt={testimonial.name}
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <span className="block text-sm font-bold text-on-surface">
                                            {testimonial.name}
                                        </span>
                                        <span className="block text-xs text-on-surface-variant">
                                            {testimonial.role}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {testimonials.length === 0 && (
                        <p className="py-16 text-center text-on-surface-variant">
                            Belum ada testimoni yang tersedia.
                        </p>
                    )}

                    <div className="mt-16 text-center">
                        <Link
                            href={landing()}
                            className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-8 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-on-primary active:scale-95"
                        >
                            <span className="material-symbols-outlined">
                                arrow_back
                            </span>
                            Kembali ke Beranda
                        </Link>
                    </div>
                </section>

                <LandingFooter siteContent={siteContent} />
                <WhatsAppFab siteContent={siteContent} />
            </div>
        </>
    );
}

Testimonials.layout = {
    breadcrumbs: [],
    hideSidebar: true,
    hideHeader: true,
};
