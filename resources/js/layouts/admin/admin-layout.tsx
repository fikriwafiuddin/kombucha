import { Link, usePage } from '@inertiajs/react';
import {
    products as adminProducts,
    hero as adminHero,
    testimonials as adminTestimonials,
    faqs as adminFaqs,
    gallery as adminGallery,
    contactSettings as adminContactSettings,
} from '@/routes/admin';

type NavItem = {
    label: string;
    icon: string;
    href: string;
    active: boolean;
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { url } = usePage();
    const productsUrl = adminProducts().url;
    const heroUrl = adminHero().url;
    const testimonialsUrl = adminTestimonials().url;
    const faqsUrl = adminFaqs().url;
    const galleryUrl = adminGallery().url;
    const contactSettingsUrl = adminContactSettings().url;

    const navItems: NavItem[] = [
        {
            label: 'Kelola Produk',
            icon: 'inventory_2',
            href: productsUrl,
            active: url.startsWith(productsUrl),
        },
        {
            label: 'Hero Banner',
            icon: 'view_carousel',
            href: heroUrl,
            active: url.startsWith(heroUrl),
        },
        {
            label: 'Testimonials',
            icon: 'reviews',
            href: testimonialsUrl,
            active: url.startsWith(testimonialsUrl),
        },
        {
            label: 'FAQ List',
            icon: 'quiz',
            href: faqsUrl,
            active: url.startsWith(faqsUrl),
        },
        {
            label: 'Gallery Grid',
            icon: 'gallery_thumbnail',
            href: galleryUrl,
            active: url.startsWith(galleryUrl),
        },
        {
            label: 'Contact & Settings',
            icon: 'contact_phone',
            href: contactSettingsUrl,
            active: url.startsWith(contactSettingsUrl),
        },
    ];

    return (
        <div className="custom-scrollbar flex min-h-screen bg-surface font-sans text-on-surface">
            {/* Sidebar */}
            <aside className="custom-scrollbar fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-outline-variant/30 bg-surface-container md:flex">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold tracking-tight text-primary">
                        Kombucha Co.
                    </h1>
                    <p className="mt-1 text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
                        Admin Dashboard
                    </p>
                </div>

                <nav className="custom-scrollbar mt-4 flex-1 space-y-2 overflow-y-auto px-4">
                    <div className="px-4 pt-4 pb-2 text-[10px] font-bold tracking-widest text-on-surface-variant/60 uppercase">
                        Manajemen
                    </div>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                                item.active
                                    ? 'bg-primary-container font-bold text-on-primary-container shadow-sm'
                                    : 'text-on-surface-variant hover:bg-surface-variant/50'
                            }`}
                        >
                            <span
                                className={`material-symbols-outlined ${item.active ? 'fill-1' : ''}`}
                            >
                                {item.icon}
                            </span>
                            <span className="text-sm font-semibold tracking-wide">
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </nav>

                <div className="border-t border-outline-variant/30 p-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-container text-secondary">
                            <span className="material-symbols-outlined">
                                person
                            </span>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="truncate text-sm font-bold text-on-surface">
                                Admin Utama
                            </p>
                            <p className="truncate text-xs text-on-surface-variant">
                                admin@kombucha.co
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content — each page renders its own topbar + body + footer */}
            <main className="min-h-screen flex-1 md:ml-64">{children}</main>
        </div>
    );
}
