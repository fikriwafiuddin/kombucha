import { Link } from '@inertiajs/react';
import AdminLogo from '@/components/admin-logo';
// import { NavFooter } from '@/components/nav-footer';
import { NavMainCustom } from '@/components/nav-main-custom';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from '@/components/ui/sidebar';
import {
    products as adminProducts,
    hero as adminHero,
    about as adminAbout,
    benefits as adminBenefits,
    testimonials as adminTestimonials,
    faqs as adminFaqs,
    gallery as adminGallery,
    contactSettings as adminContactSettings,
} from '@/routes/admin';
import type { NavItemWithIcon } from '@/types';

const mainNavItems: NavItemWithIcon[] = [
    {
        title: 'Kelola Produk',
        href: adminProducts(),
        icon: 'inventory_2',
    },
    {
        title: 'Hero Baner',
        href: adminHero(),
        icon: 'view_carousel',
    },
    {
        title: 'Tentang',
        href: adminAbout(),
        icon: 'info',
    },
    {
        title: 'Manfaat',
        href: adminBenefits(),
        icon: 'spa',
    },
    {
        title: 'Testimoni',
        href: adminTestimonials(),
        icon: 'reviews',
    },
    {
        title: 'Tanya Jawab',
        href: adminFaqs(),
        icon: 'quiz',
    },
    {
        title: 'Galeri',
        href: adminGallery(),
        icon: 'gallery_thumbnail',
    },
    {
        title: 'Kontak & Pengaturan',
        href: adminContactSettings(),
        icon: 'contact_phone',
    },
];

// const footerNavItems: NavItemWithIcon[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: 'folder',
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: 'book',
//     },
// ];

export function AdminSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <Link
                    href={adminProducts()}
                    prefetch
                    className="flex items-center gap-3 px-2 py-2"
                >
                    <AdminLogo />
                </Link>
            </SidebarHeader>

            <SidebarContent>
                <NavMainCustom items={mainNavItems} label="Manajemen" />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
