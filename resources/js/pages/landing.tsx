import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { LandingNav } from '@/components/landing-nav';

type Product = {
    id: number;
    name: string;
    price: string;
    description: string;
    image: string;
};

interface LandingProps {
    siteContent: {
        hero_headline: string;
        hero_subheadline: string;
        hero_image: string;
        hero_cta_link: string;
        hero_cta_text: string;
    };
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
    const [showAll, setShowAll] = useState(false);
    const visibleProducts = showAll ? products : products.slice(0, 4);
    console.log(siteContent);

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
                            <p className="max-w-lg text-lg leading-[28px] text-on-surface-variant">
                                {siteContent.hero_subheadline}
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <a
                                    className="rounded-full bg-primary px-8 py-4 text-center text-sm font-semibold text-on-primary shadow-lg transition-all hover:bg-primary-container active:scale-95"
                                    href={`https://wa.me/${siteContent.hero_cta_link}`}
                                >
                                    Pesan via WhatsApp
                                </a>
                                <a
                                    className="rounded-full border-2 border-secondary px-8 py-4 text-center text-sm font-semibold text-secondary transition-all hover:bg-secondary hover:text-on-secondary active:scale-95"
                                    href="#products"
                                >
                                    {siteContent.hero_cta_text}
                                </a>
                            </div>
                        </div>
                        <div className="group relative">
                            <div className="absolute inset-0 scale-95 rotate-3 rounded-[40px] bg-primary-fixed opacity-20 transition-transform duration-700 group-hover:rotate-6"></div>
                            <img
                                className="relative z-10 aspect-square w-full rounded-[40px] object-cover shadow-2xl transition-transform duration-700 group-hover:-translate-y-4"
                                alt="A premium glass bottle of golden kombucha standing elegantly on a minimalist stone coaster"
                                src={`/storage/${siteContent.hero_image}`}
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
                                className="aspect-[4/5] w-full rounded-2xl object-cover shadow-lg"
                                alt="Close-up detail of bubbling fermentation in a glass jar"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0KOIEWKWqkCY9kutozxMKxhnesX_OhQ7NHBYETonzCiUCXZFcCgaFJhptaMD7302vaeeQ9IL9RLYTwQDfNSIhSWPp_VjP-Z2K-l9InaaAfgtGAjR435XgH14yhaj_IXkhv0DtvmiM2TQC7_vuI92e5kmfvNXpexc8nVpDdg2xem18WEfEc4W9dp99acI6ytDDvkNgzrjGxbSylQG3oqGmQBD2oGiR22dU-F3-M4Rg5OfdwneNqJ7jgZqbqZ2Gnul2HGX0jSYY-BY"
                            />
                            <img
                                className="mt-8 aspect-[4/5] w-full rounded-2xl object-cover shadow-lg"
                                alt="Artisanal glass bottles of various colored kombuchas"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzH8HL2I8U2TfMTF8djTyPsTVa3hZVpQR3vilc1BsagCGeKfjl82uZMpj9TMATXq1jIfQM1LRdUriCrpSH-t7BA6R219XuCh-6jjNcYbux7_HcirCR04iRIf53KYoOhkkse3VvmPDwBHFuGMU6to3wD-fUIXmiaFsBRMaiYVbgCFNs3IWMPQ4F_QkFsvKdBRi3ydbXf-eWC3watksKOPETbNUZOQRH_FVSfr_iOx09G3tH-JVMDA5BE-Lfboqa84YZqv-hBl7cuOA"
                            />
                        </div>
                        <div className="order-1 space-y-8 md:order-2">
                            <span className="text-sm font-semibold tracking-widest text-primary uppercase">
                                Filosofi
                            </span>
                            <h2 className="text-3xl font-semibold text-secondary">
                                Apa itu Kombucha?
                            </h2>
                            <p className="text-base leading-[24px] leading-relaxed text-on-surface-variant">
                                Kombucha adalah teh fermentasi yang telah
                                dikonsumsi selama ribuan tahun. Di Kombucha Co.,
                                kami menjaga tradisi ini dengan menggunakan
                                bahan-bahan organik pilihan dan proses
                                fermentasi lambat selama 14 hari untuk
                                menghasilkan profil rasa yang seimbang.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
                                        <span className="material-symbols-outlined">
                                            eco
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-on-surface">
                                            100% Organik
                                        </h4>
                                        <p className="text-sm text-on-surface-variant">
                                            Hanya menggunakan teh dan gula
                                            organik premium.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
                                        <span className="material-symbols-outlined">
                                            health_and_safety
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-on-surface">
                                            Tanpa Pengawet
                                        </h4>
                                        <p className="text-sm text-on-surface-variant">
                                            Murni hasil fermentasi alami tanpa
                                            bahan kimia.
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
                            Kebaikan di Setiap Tetes
                        </h2>
                        <p className="mx-auto max-w-2xl text-on-surface-variant">
                            Sangat kaya akan probiotik, antioksidan, dan asam
                            organik yang mendukung kesejahteraan tubuh Anda.
                        </p>
                    </div>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="group rounded-3xl border border-surface-variant bg-white p-8 shadow-[0_24px_24px_-4px_rgba(27,43,30,0.05)] transition-all duration-300 hover:shadow-xl">
                            <span className="material-symbols-outlined mb-6 block text-4xl text-primary transition-transform group-hover:scale-110">
                                desk
                            </span>
                            <h3 className="mb-3 text-xl font-semibold text-secondary">
                                Pencernaan Sehat
                            </h3>
                            <p className="leading-relaxed text-on-surface-variant">
                                Membantu menyeimbangkan mikrobioma usus dan
                                memperlancar metabolisme tubuh setiap hari.
                            </p>
                        </div>
                        <div className="group rounded-3xl border border-surface-variant bg-white p-8 shadow-[0_24px_24px_-4px_rgba(27,43,30,0.05)] transition-all duration-300 hover:shadow-xl">
                            <span className="material-symbols-outlined mb-6 block text-4xl text-primary transition-transform group-hover:scale-110">
                                shield_with_heart
                            </span>
                            <h3 className="mb-3 text-xl font-semibold text-secondary">
                                Imunitas Kuat
                            </h3>
                            <p className="leading-relaxed text-on-surface-variant">
                                Kandungan antioksidan tinggi membantu menangkal
                                radikal bebas dan memperkuat daya tahan.
                            </p>
                        </div>
                        <div className="group rounded-3xl border border-surface-variant bg-white p-8 shadow-[0_24px_24px_-4px_rgba(27,43,30,0.05)] transition-all duration-300 hover:shadow-xl">
                            <span className="material-symbols-outlined mb-6 block text-4xl text-primary transition-transform group-hover:scale-110">
                                bolt
                            </span>
                            <h3 className="mb-3 text-xl font-semibold text-secondary">
                                Energi Alami
                            </h3>
                            <p className="leading-relaxed text-on-surface-variant">
                                Alternatif kafein yang lebih ringan tanpa
                                "crash", memberikan kesegaran instan secara
                                alami.
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
                                    <div className="relative aspect-[4/5] overflow-hidden">
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
                                            {product.price}
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
                        <h2 className="mb-4 text-5xl font-bold">
                            Proses Pembuatan
                        </h2>
                        <p className="text-surface-variant">
                            Melihat lebih dekat bagaimana kami menciptakan
                            setiap botol kebaikan.
                        </p>
                    </div>
                    <div className="no-scrollbar flex snap-x gap-4 overflow-x-auto px-[24px] pb-8">
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
                            <div className="rounded-3xl border border-surface-variant bg-surface-container-low p-8 italic">
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
                                        +62 812-3456-7890
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined rounded-full bg-primary-fixed p-3 text-primary">
                                        mail
                                    </span>
                                    <span className="text-on-surface">
                                        hello@kombuchaco.com
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined rounded-full bg-primary-fixed p-3 text-primary">
                                        share
                                    </span>
                                    <span className="text-on-surface">
                                        @kombuchaco.id
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="relative h-full min-h-100 overflow-hidden rounded-3xl shadow-2xl">
                                <div className="pointer-events-none absolute inset-0 bg-secondary/10"></div>
                                <div className="flex h-full w-full items-center justify-center bg-surface-container text-secondary">
                                    <div className="p-8 text-center">
                                        <span className="material-symbols-outlined mb-4 text-6xl">
                                            location_on
                                        </span>
                                        <p className="text-xl">Workshop Kami</p>
                                        <p className="text-sm opacity-70">
                                            Jakarta Selatan, Indonesia
                                        </p>
                                    </div>
                                </div>
                            </div>
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
                        <div className="space-y-4">
                            <h4 className="font-bold text-primary">
                                Legalitas
                            </h4>
                            <ul className="space-y-2 text-on-surface-variant">
                                <li>
                                    <a className="hover:text-primary" href="#">
                                        Kebijakan Privasi
                                    </a>
                                </li>
                                <li>
                                    <a className="hover:text-primary" href="#">
                                        Syarat & Ketentuan
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mx-auto mt-4 flex max-w-[1280px] flex-col justify-between border-t border-surface-variant px-[24px] pt-8 text-xs text-on-surface-variant md:flex-row">
                        <p>© 2024 Kombucha Co. Artisan Fermentation.</p>
                        <div className="mt-4 flex gap-4 md:mt-0">
                            <span>Instagram</span>
                            <span>Facebook</span>
                            <span>WhatsApp</span>
                        </div>
                    </div>
                </footer>

                {/* WhatsApp FAB */}
                <a
                    className="group fixed right-8 bottom-8 z-[60] flex w-auto items-center gap-2 rounded-full bg-secondary px-6 py-3 text-on-secondary shadow-[0_24px_24px_-4px_rgba(27,43,30,0.08)] transition-all hover:scale-105 active:scale-95"
                    href="https://wa.me/yournumber"
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
