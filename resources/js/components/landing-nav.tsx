import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { landing, login } from '@/routes';
import { products as adminProducts } from '@/routes/admin';

type NavItem = {
    label: string;
    /** In-page anchor target such as '#about'. */
    anchor: string;
};

/** Shared navigation items for the public marketing pages. */
const NAV_ITEMS: NavItem[] = [
    { label: 'Tentang', anchor: '#about' },
    { label: 'Manfaat', anchor: '#benefits' },
    { label: 'Produk', anchor: '#products' },
    { label: 'Pertanyaan', anchor: '#faq' },
    { label: 'Kontak', anchor: '#contact' },
];

export function LandingNav() {
    const { auth } = usePage().props;
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const isAdmin = auth.user !== null;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                'fixed top-0 z-50 w-full bg-surface/80 backdrop-blur-md transition-all duration-300',
                scrolled ? 'py-2 shadow-md' : 'py-4 shadow-sm',
            )}
        >
            <div className="mx-auto flex max-w-[1280px] items-center justify-between px-[24px]">
                <Link
                    href={landing()}
                    className="font-serif text-2xl font-semibold text-primary"
                >
                    Kombucha Co.
                </Link>

                {/* Desktop navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    {NAV_ITEMS.map((item) => (
                        <a
                            key={item.label}
                            href={item.anchor}
                            className="text-sm font-semibold text-on-surface-variant transition-colors duration-300 hover:text-primary"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    {isAdmin ? (
                        <Link
                            href={adminProducts()}
                            className="hidden rounded-full bg-primary px-6 py-2 text-sm font-semibold text-on-primary shadow-md transition-all hover:bg-primary-container active:scale-95 md:block"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            href={login()}
                            className="hidden rounded-full bg-primary px-6 py-2 text-sm font-semibold text-on-primary shadow-md transition-all hover:bg-primary-container active:scale-95 md:block"
                        >
                            Login
                        </Link>
                    )}

                    {/* Mobile hamburger menu */}
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <button
                                type="button"
                                aria-label="Buka menu navigasi"
                                className="p-2 text-primary md:hidden"
                            >
                                <span className="material-symbols-outlined">
                                    menu
                                </span>
                            </button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-3/4 sm:max-w-sm"
                        >
                            <SheetTitle className="sr-only">
                                Menu navigasi
                            </SheetTitle>
                            <SheetHeader>
                                <span className="font-serif text-xl font-semibold text-primary">
                                    Kombucha Co.
                                </span>
                            </SheetHeader>
                            <div className="flex flex-col gap-2 px-4">
                                {NAV_ITEMS.map((item) => (
                                    <SheetClose asChild key={item.label}>
                                        <a
                                            href={item.anchor}
                                            className="rounded-full px-5 py-3 text-base font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
                                        >
                                            {item.label}
                                        </a>
                                    </SheetClose>
                                ))}
                                <SheetClose asChild>
                                    {isAdmin ? (
                                        <Link
                                            href={adminProducts()}
                                            className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-on-primary shadow-md transition-all hover:bg-primary-container active:scale-95"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <Link
                                            href={login()}
                                            className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-on-primary shadow-md transition-all hover:bg-primary-container active:scale-95"
                                        >
                                            Login
                                        </Link>
                                    )}
                                </SheetClose>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
