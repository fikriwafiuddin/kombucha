import { Link, usePage } from '@inertiajs/react';
import { login } from '@/routes';
import { products as adminProducts } from '@/routes/admin';
import type { SiteContent } from '@/types';

export function LandingFooter({ siteContent }: { siteContent: SiteContent }) {
    const { auth } = usePage().props;

    return (
        <footer className="bg-surface-container-low py-16">
            <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between px-[24px] md:flex-row">
                <div className="mb-12 space-y-4 md:mb-0">
                    <span className="text-2xl font-semibold text-primary">
                        Kombucha Co.
                    </span>
                    <p className="max-w-xs text-sm text-on-surface-variant">
                        Fermentasi artisan untuk pencernaan yang lebih baik.
                        Melayani pengiriman ke seluruh Indonesia dengan kemasan
                        ramah lingkungan.
                    </p>
                </div>
            </div>
            <div className="mx-auto mt-4 flex max-w-[1280px] flex-col justify-between border-t border-surface-variant px-[24px] pt-8 text-xs text-on-surface-variant md:flex-row">
                <Link
                    href={auth.user ? adminProducts() : login()}
                    className="transition-colors hover:text-primary"
                    aria-label={auth.user ? 'Dasbor admin' : 'Admin login'}
                >
                    © 2024 Kombucha Co. Artisan Fermentation.
                </Link>
                <div className="mt-4 flex gap-4 md:mt-0">
                    <a
                        className="transition-colors hover:text-primary"
                        href={`https://instagram.com/${(siteContent.instagram ?? '').replace(/^@/, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Instagram
                    </a>
                    <a
                        className="transition-colors hover:text-primary"
                        href={`https://wa.me/${(siteContent.whatsapp ?? '').replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        WhatsApp
                    </a>
                </div>
            </div>
        </footer>
    );
}
