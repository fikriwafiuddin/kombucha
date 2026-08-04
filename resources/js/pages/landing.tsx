import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { LandingNav } from '@/components/landing-nav';
import { login } from '@/routes';
import { products as adminProducts } from '@/routes/admin';
import { assetUrl } from '@/types';
import type { SiteContent } from '@/types';
import { formatCurrency } from '@/utils/fomatter';

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
};

// Fallback images used until an admin uploads About section images.
const ABOUT_IMAGE_1_FALLBACK =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA0KOIEWKWqkCY9kutozxMKxhnesX_OhQ7NHBYETonzCiUCXZFcCgaFJhptaMD7302vaeeQ9IL9RLYTwQDfNSIhSWPp_VjP-Z2K-l9InaaAfgtGAjR435XgH14yhaj_IXkhv0DtvmiM2TQC7_vuI92e5kmfvNXpexc8nVpDdg2xem18WEfEc4W9dp99acI6ytDDvkNgzrjGxbSylQG3oqGmQBD2oGiR22dU-F3-M4Rg5OfdwneNqJ7jgZqbqZ2Gnul2HGX0jSYY-BY';
const ABOUT_IMAGE_2_FALLBACK =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCzH8HL2I8U2TfMTF8djTyPsTVa3hZVpQR3vilc1BsagCGeKfjl82uZMpj9TMATXq1jIfQM1LRdUriCrpSH-t7BA6R219XuCh-6jjNcYbux7_HcirCR04iRIf53KYoOhkkse3VvmPDwBHFuGMU6to3wD-fUIXmiaFsBRMaiYVbgCFNs3IWMPQ4F_QkFsvKdBRi3ydbXf-eWC3watksKOPETbNUZOQRH_FVSfr_iOx09G3tH-JVMDA5BE-Lfboqa84YZqv-hBl7cuOA';

// Fallback map location shown until an admin sets the workshop address.
const DEFAULT_MAP_QUERY =
    'Jl. Wijaya Kusuma No.32, Joho, Sumberejo, Kec. Ngasem, Kabupaten Kediri, Jawa Timur 64182';

interface LandingProps {
    siteContent: SiteContent;
    products: Product[];
    galleryImages: {
        id: number;
        image: string;
    }[];
    testimonials: {
        id: number;
        name: string;
        rating: number;
        review: string;
        role: string;
        avatar: string;
    }[];
    faqs: {
        id: number;
        question: string;
        answer: string;
    }[];
}

export default function Landing({
    siteContent,
    products,
    galleryImages,
    testimonials,
    faqs,
}: LandingProps) {
    const { auth } = usePage().props;
    const [showAll, setShowAll] = useState(false);
    const visibleProducts = showAll ? products : products.slice(0, 4);
    const aboutImage1 =
        assetUrl(siteContent.about_image_1) ?? ABOUT_IMAGE_1_FALLBACK;
    const aboutImage2 =
        assetUrl(siteContent.about_image_2) ?? ABOUT_IMAGE_2_FALLBACK;
    const mapQuery = siteContent.address ?? DEFAULT_MAP_QUERY;

    useEffect(() => {
        // Scroll Animation Observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(
                            'opacity-100',
                            'translate-y-0',
                        );
                        entry.target.classList.remove(
                            'opacity-0',
                            'translate-y-10',
                        );
                    }
                });
            },
            { threshold: 0.1 },
        );

        document.querySelectorAll('section').forEach((section) => {
            section.classList.add(
                'transition-all',
                'duration-1000',
                'opacity-0',
                'translate-y-10',
            );
            observer.observe(section);
        });

        // Initial trigger for nav
        const nav = document.querySelector('nav');

        if (nav) {
            nav.classList.remove('translate-y-10', 'opacity-0');
        }

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Head title="Kombucha Co. | Artisan Fermentation" />

            <div className="scroll-smooth bg-background font-sans text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
                {/* TopNavBar */}
                <LandingNav />

                {/* Hero Section */}
                <section className="mx-auto max-w-[1280px] translate-y-0 overflow-hidden px-[24px] pt-32 pb-16 opacity-100 transition-all duration-1000">
                    <div className="grid items-center gap-12 md:grid-cols-2">
                        <div className="animate-in space-y-8 duration-1000 fade-in slide-in-from-left">
                            <h1 className="text-5xl leading-tight font-bold tracking-tight text-primary md:text-[56px]">
                                {/* Teh Fermentasi Alami untuk{' '}
                                <span className="text-secondary italic">
                                    Hidup Lebih Sehat
                                </span> */}
                                {siteContent.hero_headline}
                            </h1>
                            <p className="max-w-lg text-lg leading-7 text-on-surface-variant">
                                {siteContent.hero_subheadline}
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <a
                                    className="rounded-full bg-primary px-8 py-4 text-center text-sm font-semibold text-on-primary shadow-lg transition-all hover:bg-primary-container active:scale-95"
                                    href={`https://wa.me/${siteContent.whatsapp}`}
                                >
                                    Pesan via WhatsApp
                                </a>
                            </div>
                        </div>
                        <div className="group relative">
                            <div className="absolute inset-0 scale-95 rotate-3 rounded-[40px] bg-primary-fixed opacity-20 transition-transform duration-700 group-hover:rotate-6"></div>
                            <img
                                className="relative z-10 aspect-square w-full rounded-[40px] object-cover shadow-2xl transition-transform duration-700 group-hover:-translate-y-4"
                                alt="A premium glass bottle of golden kombucha standing elegantly on a minimalist stone coaster"
                                src={assetUrl(siteContent.hero_image) ?? ''}
                            />
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section
                    className="translate-y-0 bg-surface-container-low py-16 opacity-100 transition-all duration-1000"
                    id="about"
                >
                    <div className="mx-auto grid max-w-[1280px] items-center gap-16 px-[24px] md:grid-cols-2">
                        <div className="order-2 grid grid-cols-2 gap-4 md:order-1">
                            <img
                                className="aspect-4/5 w-full rounded-2xl object-cover shadow-lg"
                                alt="Close-up detail of bubbling fermentation in a glass jar"
                                src={aboutImage1}
                            />
                            <img
                                className="mt-8 aspect-4/5 w-full rounded-2xl object-cover shadow-lg"
                                alt="Artisanal glass bottles of various colored kombuchas"
                                src={aboutImage2}
                            />
                        </div>
                        <div className="order-1 space-y-8 md:order-2">
                            <span className="text-sm font-semibold tracking-widest text-primary uppercase">
                                {siteContent.about_tag}
                            </span>
                            <h2 className="text-3xl font-semibold text-secondary">
                                {siteContent.about_title}
                            </h2>
                            <p className="text-base leading-relaxed text-on-surface-variant">
                                {siteContent.about_description}
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
                                        <span className="material-symbols-outlined">
                                            {siteContent.about_feature_1_icon}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-on-surface">
                                            {siteContent.about_feature_1_title}
                                        </h4>
                                        <p className="text-sm text-on-surface-variant">
                                            {
                                                siteContent.about_feature_1_description
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
                                        <span className="material-symbols-outlined">
                                            {siteContent.about_feature_2_icon}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-on-surface">
                                            {siteContent.about_feature_2_title}
                                        </h4>
                                        <p className="text-sm text-on-surface-variant">
                                            {
                                                siteContent.about_feature_2_description
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section
                    className="mx-auto max-w-[1280px] translate-y-0 px-[24px] py-16 opacity-100 transition-all duration-1000"
                    id="benefits"
                >
                    <div className="mb-16 space-y-4 text-center">
                        <h2 className="text-3xl font-semibold text-primary">
                            {siteContent.benefits_title}
                        </h2>
                        <p className="mx-auto max-w-2xl text-on-surface-variant">
                            {siteContent.benefits_description}
                        </p>
                    </div>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="group rounded-3xl border border-surface-variant bg-white p-8 shadow-[0_24px_24px_-4px_rgba(27,43,30,0.05)] transition-all duration-300 hover:shadow-xl">
                            <span className="material-symbols-outlined mb-6 block text-4xl text-primary transition-transform group-hover:scale-110">
                                {siteContent.benefits_card_1_icon}
                            </span>
                            <h3 className="mb-3 text-xl font-semibold text-secondary">
                                {siteContent.benefits_card_1_title}
                            </h3>
                            <p className="leading-relaxed text-on-surface-variant">
                                {siteContent.benefits_card_1_description}
                            </p>
                        </div>
                        <div className="group rounded-3xl border border-surface-variant bg-white p-8 shadow-[0_24px_24px_-4px_rgba(27,43,30,0.05)] transition-all duration-300 hover:shadow-xl">
                            <span className="material-symbols-outlined mb-6 block text-4xl text-primary transition-transform group-hover:scale-110">
                                {siteContent.benefits_card_2_icon}
                            </span>
                            <h3 className="mb-3 text-xl font-semibold text-secondary">
                                {siteContent.benefits_card_2_title}
                            </h3>
                            <p className="leading-relaxed text-on-surface-variant">
                                {siteContent.benefits_card_2_description}
                            </p>
                        </div>
                        <div className="group rounded-3xl border border-surface-variant bg-white p-8 shadow-[0_24px_24px_-4px_rgba(27,43,30,0.05)] transition-all duration-300 hover:shadow-xl">
                            <span className="material-symbols-outlined mb-6 block text-4xl text-primary transition-transform group-hover:scale-110">
                                {siteContent.benefits_card_3_icon}
                            </span>
                            <h3 className="mb-3 text-xl font-semibold text-secondary">
                                {siteContent.benefits_card_3_title}
                            </h3>
                            <p className="leading-relaxed text-on-surface-variant">
                                {siteContent.benefits_card_3_description}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Products Section */}
                <section
                    className="translate-y-0 bg-surface py-16 opacity-100 transition-all duration-1000"
                    id="products"
                >
                    <div className="mx-auto max-w-[1280px] px-[24px]">
                        <div className="mb-12 flex items-end justify-between">
                            <div>
                                <h2 className="text-3xl font-semibold text-primary">
                                    Produk Kami
                                </h2>
                                <p className="mt-2 text-on-surface-variant">
                                    Diseduh dengan buah asli dan rempah segar.
                                </p>
                            </div>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {visibleProducts.map((product) => (
                                <div
                                    className="group overflow-hidden rounded-2xl bg-white shadow-sm"
                                    key={product.id}
                                >
                                    <div className="relative aspect-4/5 overflow-hidden">
                                        <img
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            alt={product.name}
                                            src={`/storage/${product.image}`}
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-on-surface">
                                            {product.name}
                                        </h3>
                                        <p className="mt-1 mb-4 text-sm text-on-surface-variant">
                                            {product.description}
                                        </p>
                                        <span className="font-bold text-primary">
                                            {formatCurrency(product.price)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {products.length > 4 && (
                            <div className="mt-12 text-center">
                                <button
                                    type="button"
                                    onClick={() => setShowAll((show) => !show)}
                                    className="rounded-full border-2 border-primary px-8 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-on-primary active:scale-95"
                                >
                                    {showAll
                                        ? 'Tampilkan Lebih Sedikit'
                                        : 'Lihat Semua Produk'}
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* How to Order Section */}
                <section className="mx-auto max-w-[1280px] translate-y-0 px-[24px] py-16 text-center opacity-100 transition-all duration-1000">
                    <h2 className="mb-16 text-3xl font-semibold text-secondary">
                        Cara Pemesanan
                    </h2>
                    <div className="relative grid gap-8 md:grid-cols-3">
                        {/* Connection Line */}
                        <div className="absolute top-1/2 left-0 -z-10 hidden h-0.5 w-full -translate-y-16 bg-secondary-container md:block"></div>

                        <div className="space-y-6">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-background bg-primary text-on-primary shadow-lg">
                                <span className="text-2xl">01</span>
                            </div>
                            <h3 className="text-xl font-semibold">
                                Pilih Produk
                            </h3>
                            <p className="text-on-surface-variant">
                                Pilih varian rasa favorit Anda dari menu produk
                                kami.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-background bg-primary text-on-primary shadow-lg">
                                <span className="text-2xl">02</span>
                            </div>
                            <h3 className="text-xl font-semibold">
                                Pesan via WA
                            </h3>
                            <p className="text-on-surface-variant">
                                Klik tombol pesan untuk terhubung langsung
                                dengan admin kami.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-background bg-primary text-on-primary shadow-lg">
                                <span className="text-2xl">03</span>
                            </div>
                            <h3 className="text-xl font-semibold">
                                Bayar & Kirim
                            </h3>
                            <p className="text-on-surface-variant">
                                Konfirmasi pembayaran via Bank/E-wallet. Pesanan
                                akan segera dikirim.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Behind the Scenes Gallery */}
                <section className="translate-y-0 overflow-hidden bg-inverse-surface py-36 text-background opacity-100 transition-all duration-1000">
                    <div className="mx-auto mb-12 max-w-[1280px] px-[24px]">
                        <h2 className="mb-4 text-5xl font-bold">Galeri</h2>
                        <p className="text-surface-variant">
                            Potret momen, proses pembuatan, dan keindahan di
                            balik setiap botol kombucha kami.
                        </p>
                    </div>
                    <div className="no-scrollbar mx-auto flex max-w-[1280px] snap-x gap-4 overflow-x-auto px-[24px] pb-8">
                        {galleryImages.map((galleryImage) => (
                            <div
                                key={galleryImage.id}
                                className="h-125 w-80 flex-none snap-center"
                            >
                                <img
                                    className="h-full w-full rounded-3xl object-cover"
                                    alt="Fermentation lab"
                                    src={`/storage/${galleryImage.image}`}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="mx-auto max-w-[1280px] translate-y-0 px-[24px] py-16 opacity-100 transition-all duration-1000">
                    <h2 className="mb-16 text-center text-3xl font-semibold text-primary">
                        Apa Kata Mereka?
                    </h2>
                    <div className="grid gap-8 md:grid-cols-3">
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
                </section>

                {/* FAQ Section */}
                <section
                    className="translate-y-0 bg-surface-container-highest py-16 opacity-100 transition-all duration-1000"
                    id="faq"
                >
                    <div className="mx-auto max-w-3xl px-[24px]">
                        <h2 className="mb-12 text-center text-3xl font-semibold text-primary">
                            Pertanyaan yang Sering Diajukan
                        </h2>
                        <div className="space-y-4">
                            {faqs.map((faq) => (
                                <details
                                    key={faq.id}
                                    className="group cursor-pointer rounded-2xl bg-surface p-6 transition-all duration-300 open:shadow-md"
                                >
                                    <summary className="flex list-none items-center justify-between font-bold text-secondary">
                                        {faq.question}
                                        <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                                            expand_more
                                        </span>
                                    </summary>
                                    <p className="mt-4 leading-relaxed text-on-surface-variant">
                                        {faq.answer}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact & Location */}
                <section
                    className="mx-auto max-w-[1280px] translate-y-0 px-[24px] py-16 opacity-100 transition-all duration-1000"
                    id="contact"
                >
                    <div className="grid gap-16 md:grid-cols-2">
                        <div className="space-y-8">
                            <h2 className="text-5xl font-bold text-primary">
                                Hubungi Kami
                            </h2>
                            <p className="text-lg text-on-surface-variant">
                                Ada pertanyaan atau ingin kerja sama reseller?
                                Kami siap membantu.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined rounded-full bg-primary-fixed p-3 text-primary">
                                        call
                                    </span>
                                    <span className="text-on-surface">
                                        {siteContent.whatsapp}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined rounded-full bg-primary-fixed p-3 text-primary">
                                        mail
                                    </span>
                                    <span className="text-on-surface">
                                        {siteContent.email}
                                    </span>
                                </div>
                                {/* <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined rounded-full bg-primary-fixed p-3 text-primary">
                                        share
                                    </span>
                                    <span className="text-on-surface">
                                        {siteContent.instagram}
                                    </span>
                                </div> */}
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined rounded-full bg-primary-fixed p-3 text-primary">
                                        schedule
                                    </span>
                                    <span className="text-on-surface">
                                        {siteContent.operating_hours}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="relative h-full min-h-100 overflow-hidden rounded-3xl shadow-2xl">
                                <iframe
                                    title="Lokasi Workshop Kombucha Co."
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed&z=15`}
                                    className="h-full min-h-100 w-full border-0"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    allowFullScreen
                                />
                            </div>
                            {siteContent.address && (
                                <p className="text-center text-sm text-on-surface-variant">
                                    {siteContent.address}
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-surface-container-low py-16">
                    <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between px-[24px] md:flex-row">
                        <div className="mb-12 space-y-4 md:mb-0">
                            <span className="text-2xl font-semibold text-primary">
                                Kombucha Co.
                            </span>
                            <p className="max-w-xs text-sm text-on-surface-variant">
                                Fermentasi artisan untuk pencernaan yang lebih
                                baik. Melayani pengiriman ke seluruh Indonesia
                                dengan kemasan ramah lingkungan.
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto mt-4 flex max-w-[1280px] flex-col justify-between border-t border-surface-variant px-[24px] pt-8 text-xs text-on-surface-variant md:flex-row">
                        <Link
                            href={auth.user ? adminProducts() : login()}
                            className="transition-colors hover:text-primary"
                            aria-label={
                                auth.user ? 'Dasbor admin' : 'Admin login'
                            }
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

                {/* WhatsApp FAB */}
                <a
                    className="group fixed right-8 bottom-8 z-60 flex w-auto items-center gap-2 rounded-full bg-secondary px-6 py-3 text-on-secondary shadow-[0_24px_24px_-4px_rgba(27,43,30,0.08)] transition-all hover:scale-105 active:scale-95"
                    href={`https://wa.me/${(siteContent.whatsapp ?? '').replace(/\D/g, '')}`}
                >
                    <span className="material-symbols-outlined fill-1">
                        chat
                    </span>
                    <span className="text-sm font-semibold">WhatsApp</span>
                </a>
            </div>
        </>
    );
}

Landing.layout = {
    breadcrumbs: [],
    hideSidebar: true,
    hideHeader: true,
};
